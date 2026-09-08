import { useEffect, useState } from "react";
import type { Answers } from "./data/witmeQuestions";
import { trackFunnelEvent } from "./lib/funnel";
import { fireServyPostback, getClickId } from "./lib/postback";
import { supabase } from "./lib/supabase";
import type { BreakdownItem } from "./lib/types";
import { submitWitmeApplication } from "./lib/witme";
import { Header } from "./components/Header";
import { Landing } from "./components/Landing";
import { SolicitudWidget } from "./components/SolicitudWidget";

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
      <Landing
        widget={
          <SolicitudWidget
            stage={stage}
            scoreData={scoreData}
            clickId={clickId}
            applicationSubmitted={applicationSubmitted}
            onComplete={handleFormComplete}
          />
        }
      />
    </>
  );
}
