import { useEffect, useState } from "react";
import type { Answers } from "./data/witmeQuestionsRo";
import { trackFunnelEvent } from "./lib/funnel";
import { getClickId } from "./lib/postback";
import { submitPingtreeLeadRo } from "./lib/pingtreeRo";
import { supabase } from "./lib/supabase";
import type { BreakdownItem } from "./lib/types";
import { Header } from "./components/Header";
import { Landing } from "./components/Landing";
import { PingtreeRoWidget } from "./components/PingtreeRoWidget";
import type { GateContact } from "./components/WitmeGate";

type Stage = "quiz" | "loading" | "gate" | "extra" | "submitting" | "redirecting" | "result" | "error";

interface ScoreData {
  quizSessionId: string;
  score: number;
  scoreBand: string;
  breakdown: BreakdownItem[];
  capacidadMensual: number;
  capacidadMaxima: number;
  approvalProbability: number | null;
}

// Pingtree RO: mismo concepto que Pingtree España (una sola llamada a
// servy-form-wait, redirect directo si hay oferta), con las preguntas y el
// score de Rumanía (servy_id 259).
export default function PingtreeRoApp() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [answers, setAnswers] = useState<Answers>({});
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [clickId] = useState<string | null>(() => getClickId());

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");

  useEffect(() => {
    trackFunnelEvent("page_view", undefined, "pingtree_ro");
  }, []);

  const handleQuizComplete = async (quizAnswers: Answers) => {
    setStage("loading");
    setAnswers(quizAnswers);

    const { data: quizSessionId, error: sessionError } = await supabase.rpc("create_quiz_session", {
      p_answers: quizAnswers,
      p_utm_source: utmSource,
      p_click_id: clickId,
      p_source: "pingtree_ro",
    });

    if (sessionError || !quizSessionId) {
      setStage("error");
      return;
    }

    const { data: scored, error: scoreError } = await supabase
      .rpc("calculate_score_ro", { p_answers: quizAnswers })
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

    const { data: approvalProbability } = await supabase.rpc("calculate_approval_probability_ro", {
      p_score: scored.score,
      p_requested_amount: Number(quizAnswers.requestedAmount ?? 0),
      p_capacidad_maxima: scored.capacidad_maxima,
    });

    setScoreData({
      quizSessionId,
      score: scored.score,
      scoreBand: scored.score_band,
      breakdown: scored.breakdown,
      capacidadMensual: scored.capacidad_mensual,
      capacidadMaxima: scored.capacidad_maxima,
      approvalProbability: approvalProbability ?? null,
    });
    setStage("gate");
  };

  const handleGateUnlock = (contact: GateContact) => {
    setAnswers((prev) => ({ ...prev, ...contact }));
    setStage("extra");
  };

  const handleExtraComplete = async (fullAnswers: Answers) => {
    setAnswers(fullAnswers);

    if (!scoreData) {
      setStage("error");
      return;
    }

    trackFunnelEvent("question_reached", "application_completed", "pingtree_ro");
    setStage("submitting");

    const contact = {
      name: String(fullAnswers.name ?? ""),
      lastName: String(fullAnswers.lastName ?? ""),
      email: String(fullAnswers.email ?? ""),
      phoneNumber: String(fullAnswers.phoneNumber ?? ""),
    };
    const result = await submitPingtreeLeadRo(fullAnswers, contact, clickId, utmSource, scoreData.quizSessionId);

    if (result.redirectUrl) {
      setStage("redirecting");
      window.location.href = result.redirectUrl;
      return;
    }

    setApplicationSubmitted(result.succeeded);
    setStage("result");
  };

  return (
    <>
      <Header />
      <Landing
        widget={
          <PingtreeRoWidget
            stage={stage}
            answers={answers}
            scoreData={scoreData}
            clickId={clickId}
            applicationSubmitted={applicationSubmitted}
            onQuizComplete={handleQuizComplete}
            onGateUnlock={handleGateUnlock}
            onExtraComplete={handleExtraComplete}
          />
        }
      />
    </>
  );
}
