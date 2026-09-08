import { useEffect, useState } from "react";
import type { Answers } from "./data/witmeQuestions";
import { trackFunnelEvent } from "./lib/funnel";
import { getClickId } from "./lib/postback";
import { supabase } from "./lib/supabase";
import type { BreakdownItem } from "./lib/types";
import { collectWitmeLenderOffers, type LenderOffer } from "./lib/witme";
import { Header } from "./components/Header";
import { Landing } from "./components/Landing";
import { SolicitudWidget } from "./components/SolicitudWidget";
import type { GateContact } from "./components/WitmeGate";

type Stage = "quiz" | "loading" | "gate" | "extra" | "submitting" | "result" | "error";

interface ScoreData {
  quizSessionId: string;
  score: number;
  scoreBand: string;
  breakdown: BreakdownItem[];
  capacidadMensual: number;
  capacidadMaxima: number;
}

export default function SolicitudApp() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [answers, setAnswers] = useState<Answers>({});
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [offers, setOffers] = useState<LenderOffer[]>([]);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [clickId] = useState<string | null>(() => getClickId());

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");

  useEffect(() => {
    trackFunnelEvent("page_view", undefined, "solicitud");
  }, []);

  const handleQuizComplete = async (quizAnswers: Answers) => {
    setStage("loading");
    setAnswers(quizAnswers);

    const { data: quizSessionId, error: sessionError } = await supabase.rpc("create_quiz_session", {
      p_answers: quizAnswers,
      p_utm_source: utmSource,
      p_click_id: clickId,
      p_source: "solicitud",
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

    setScoreData({
      quizSessionId,
      score: scored.score,
      scoreBand: scored.score_band,
      breakdown: scored.breakdown,
      capacidadMensual: scored.capacidad_mensual,
      capacidadMaxima: scored.capacidad_maxima,
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
    setStage("submitting");

    const { offers: lenderOffers, anySucceeded } = await collectWitmeLenderOffers(
      fullAnswers,
      clickId,
      utmSource,
      scoreData.quizSessionId,
    );
    setOffers(lenderOffers);
    setApplicationSubmitted(anySucceeded);
    setStage("result");
  };

  return (
    <>
      <Header />
      <Landing
        widget={
          <SolicitudWidget
            stage={stage}
            answers={answers}
            scoreData={scoreData}
            offers={offers}
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
