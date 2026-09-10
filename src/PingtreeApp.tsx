import { useEffect, useState } from "react";
import type { Answers } from "./data/witmeQuestions";
import { trackFunnelEvent } from "./lib/funnel";
import { getClickId } from "./lib/postback";
import { submitPingtreeLead } from "./lib/pingtree";
import { supabase } from "./lib/supabase";
import type { BreakdownItem } from "./lib/types";
import { Header } from "./components/Header";
import { Landing } from "./components/Landing";
import { PingtreeWidget } from "./components/PingtreeWidget";
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

// Versión independiente de la solicitud completa: en vez de mostrar
// ofertas propias (API de lenders normales + aval coche/reunificación en
// background), usa SOLO la API servy-form-wait con los tres servy_id del
// pingtree juntos (Creditio Pingtree / reunificación / aval coche) y
// redirige directamente a la URL que devuelva Witme. Prueba pequeña e
// independiente del flujo de /solicitud.html - mismas preguntas, stats
// propias (source "pingtree").
export default function PingtreeApp() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [answers, setAnswers] = useState<Answers>({});
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [clickId] = useState<string | null>(() => getClickId());

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");

  useEffect(() => {
    trackFunnelEvent("page_view", undefined, "pingtree");
  }, []);

  const handleQuizComplete = async (quizAnswers: Answers) => {
    setStage("loading");
    setAnswers(quizAnswers);

    const { data: quizSessionId, error: sessionError } = await supabase.rpc("create_quiz_session", {
      p_answers: quizAnswers,
      p_utm_source: utmSource,
      p_click_id: clickId,
      p_source: "pingtree",
    });

    if (sessionError || !quizSessionId) {
      setStage("error");
      return;
    }

    const { data: scored, error: scoreError } = await supabase
      .rpc("calculate_score_solicitud", { p_answers: quizAnswers })
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

    const { data: approvalProbability } = await supabase.rpc("calculate_approval_probability", {
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

    trackFunnelEvent("question_reached", "application_completed", "pingtree");
    setStage("submitting");

    const contact = {
      name: String(fullAnswers.name ?? ""),
      lastName: String(fullAnswers.lastName ?? ""),
      email: String(fullAnswers.email ?? ""),
      phoneNumber: String(fullAnswers.phoneNumber ?? ""),
    };
    const result = await submitPingtreeLead(fullAnswers, contact, clickId, utmSource, scoreData.quizSessionId);

    if (result.redirectUrl) {
      setStage("redirecting");
      window.location.href = result.redirectUrl;
      return;
    }

    // Witme no aceptó (sin redirectUrl): en vez de un mensaje sin más,
    // caemos al mismo resultado de siempre (score + las 4 ofertas
    // estáticas), como en /solicitud.html.
    setApplicationSubmitted(result.succeeded);
    setStage("result");
  };

  return (
    <>
      <Header />
      <Landing
        widget={
          <PingtreeWidget
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
