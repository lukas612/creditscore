import { useEffect, useState } from "react";
import type { Answers } from "./data/witmeQuestions";
import { trackFunnelEvent } from "./lib/funnel";
import { fireServyPostback, getClickId } from "./lib/postback";
import { supabase } from "./lib/supabase";
import type { BreakdownItem } from "./lib/types";
import { submitWitmeApplication } from "./lib/witme";
import { Header } from "./components/Header";
import { SolicitudResult } from "./components/SolicitudResult";
import { WitmeForm } from "./components/WitmeForm";

type Stage = "form" | "loading" | "result" | "error";

interface ScoreData {
  score: number;
  scoreBand: string;
  breakdown: BreakdownItem[];
  capacidadMensual: number;
  capacidadMaxima: number;
}

export default function SolicitudApp() {
  const [stage, setStage] = useState<Stage>("form");
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [clickId] = useState<string | null>(() => getClickId());

  useEffect(() => {
    trackFunnelEvent("page_view", undefined, "solicitud");
  }, []);

  const handleFormComplete = async (answers: Answers) => {
    setStage("loading");

    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");

    const { data: quizSessionId, error: sessionError } = await supabase.rpc("create_quiz_session", {
      p_answers: answers,
      p_utm_source: utmSource,
      p_click_id: clickId,
      p_source: "solicitud",
    });

    if (sessionError || !quizSessionId) {
      setStage("error");
      return;
    }

    const { data: scored, error: scoreError } = await supabase
      .rpc("calculate_score_solicitud", { p_answers: answers })
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

    setScoreData({
      score: scored.score,
      scoreBand: scored.score_band,
      breakdown: scored.breakdown,
      capacidadMensual: scored.capacidad_mensual,
      capacidadMaxima: scored.capacidad_maxima,
    });

    const { error: leadError } = await supabase.from("leads").insert({
      quiz_session_id: quizSessionId,
      first_name: String(answers.name ?? ""),
      last_name: String(answers.lastName ?? ""),
      email: String(answers.email ?? ""),
      phone: String(answers.phoneNumber ?? ""),
      zip_code: String(answers.zipCode ?? ""),
      consent_privacy: true,
      score: scored.score,
      score_band: scored.score_band,
      source: "solicitud",
    });

    if (!leadError && clickId) {
      fireServyPostback(clickId);
    }

    try {
      await submitWitmeApplication(answers, clickId, utmSource);
      setApplicationSubmitted(true);
    } catch {
      setApplicationSubmitted(false);
    }

    setStage("result");
  };

  return (
    <>
      <Header />
      <main className="solicitud-page">
        <div className="solicitud-intro">
          <span className="eyebrow">Solicitud completa · Creditio</span>
          <h1>Tu puntuación con todos los detalles</h1>
          <p className="landing-sub">
            Un formulario más completo para tramitar tu solicitud directamente con
            Creditio, además de calcular tu puntuación al instante.
          </p>
        </div>
        <div className="widget" id="widget">
          {stage === "form" && <WitmeForm onComplete={handleFormComplete} />}

          {stage === "loading" && (
            <div className="quiz-card">
              <p className="loading-text">Calculando tu puntuación y enviando tu solicitud…</p>
            </div>
          )}

          {stage === "result" && scoreData && (
            <SolicitudResult
              score={scoreData.score}
              scoreBand={scoreData.scoreBand}
              breakdown={scoreData.breakdown}
              capacidadMensual={scoreData.capacidadMensual}
              capacidadMaxima={scoreData.capacidadMaxima}
              clickId={clickId}
              applicationSubmitted={applicationSubmitted}
            />
          )}

          {stage === "error" && (
            <div className="quiz-card">
              <p className="loading-text">
                Ha ocurrido un error al procesar tu solicitud. Recarga la página e inténtalo
                de nuevo.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
