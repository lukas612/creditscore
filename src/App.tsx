import { useEffect, useState } from "react";
import type { Answers } from "./data/questions";
import { trackFunnelEvent } from "./lib/funnel";
import { getClickId } from "./lib/postback";
import { supabase } from "./lib/supabase";
import type { BreakdownItem, ScoreResult, Stage } from "./lib/types";
import { Header } from "./components/Header";
import { Landing } from "./components/Landing";
import { ScoreWidget } from "./components/ScoreWidget";

export default function App() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Answers | null>(null);
  const [clickId] = useState<string | null>(() => getClickId());

  useEffect(() => {
    trackFunnelEvent("page_view");
  }, []);

  const handleQuizComplete = async (answers: Answers) => {
    setStage("loading");
    setQuizAnswers(answers);

    const params = new URLSearchParams(window.location.search);

    const { data: quizSessionId, error: sessionError } = await supabase.rpc(
      "create_quiz_session",
      {
        p_answers: answers,
        p_utm_source: params.get("utm_source"),
        p_click_id: clickId,
      },
    );

    if (sessionError || !quizSessionId) {
      setStage("error");
      return;
    }

    const { data: scored, error: scoreError } = await supabase
      .rpc("calculate_score", { p_answers: answers })
      .single<{
        score: number;
        score_band: string;
        breakdown: BreakdownItem[];
        capacidad_mensual: number;
        capacidad_maxima: number;
      }>();

    if (scoreError || !scored) {
      setStage("error");
      return;
    }

    // Métrica interna aparte del score: no es lo mismo pedir un importe
    // acorde a tu capacidad que pedir muy por encima de ella. Best-effort:
    // si falla, no debe bloquear el flujo del quiz.
    const { data: approvalProbability } = await supabase.rpc("calculate_approval_probability", {
      p_score: scored.score,
      p_requested_amount: Number(answers.creditos_cantidad_a_solicitar ?? 0),
      p_capacidad_maxima: scored.capacidad_maxima,
    });

    setResult({
      quizSessionId,
      score: scored.score,
      scoreBand: scored.score_band,
      zipCode: String(answers.codigo_postal ?? ""),
      breakdown: scored.breakdown,
      capacidadMensual: scored.capacidad_mensual,
      capacidadMaxima: scored.capacidad_maxima,
      approvalProbability: approvalProbability ?? null,
    });
    setStage("gate");
  };

  return (
    <>
      <Header />
      <Landing
        widget={
          <ScoreWidget
            stage={stage}
            result={result}
            quizAnswers={quizAnswers}
            clickId={clickId}
            onComplete={handleQuizComplete}
            onUnlock={() => setStage("unlocked")}
          />
        }
      />
    </>
  );
}
