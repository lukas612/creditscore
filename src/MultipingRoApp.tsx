import { useEffect, useState } from "react";
import type { Answers } from "./data/witmeQuestionsRo";
import { trackFunnelEvent } from "./lib/funnel";
import { getClickId } from "./lib/postback";
import { supabase } from "./lib/supabase";
import type { BreakdownItem } from "./lib/types";
import { requestWitmeLenderOfferRo, witmeOfferIdRo, MAX_WITME_ATTEMPTS_RO, type LenderOffer } from "./lib/witmeRo";
import { Header } from "./components/Header";
import { LandingRo } from "./components/LandingRo";
import { MultipingRoWidget } from "./components/MultipingRoWidget";
import type { GateContact } from "./components/WitmeGate";

type Stage = "quiz" | "loading" | "gate" | "extra" | "submitting" | "result" | "error";

interface ScoreData {
  quizSessionId: string;
  score: number;
  scoreBand: string;
  breakdown: BreakdownItem[];
  capacidadMensual: number;
  capacidadMaxima: number;
  approvalProbability: number | null;
}

// Multiping RO: mismo concepto que "solicitud completa" en España (varias
// llamadas en cascada a la API de Witme, servy_id 259), llamado "multiping"
// porque hace varias llamadas. Sin el ping en background de aval-coche /
// reunificación (no existe ese producto en RO todavía) ni el bloqueo por
// falta de cuenta bancaria (Rumanía no pide ese dato).
export default function MultipingRoApp() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [answers, setAnswers] = useState<Answers>({});
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [witmeOffers, setWitmeOffers] = useState<LenderOffer[]>([]);
  const [fetchingMoreOffers, setFetchingMoreOffers] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [clickId] = useState<string | null>(() => getClickId());

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");

  useEffect(() => {
    trackFunnelEvent("page_view", undefined, "multiping_ro");
  }, []);

  const handleQuizComplete = async (quizAnswers: Answers) => {
    setStage("loading");
    setAnswers(quizAnswers);

    const { data: quizSessionId, error: sessionError } = await supabase.rpc("create_quiz_session", {
      p_answers: quizAnswers,
      p_utm_source: utmSource,
      p_click_id: clickId,
      p_source: "multiping_ro",
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

    trackFunnelEvent("question_reached", "application_completed", "multiping_ro");
    setStage("submitting");

    const sessionId = scoreData.quizSessionId;

    // Misma cascada que España: el primer intento se espera entero antes de
    // lanzar el segundo; a partir del segundo, carrera de 8s.
    const RACE_TIMEOUT_MS = 8000;
    const offersByAttempt: Record<number, LenderOffer> = {};
    let stopped = false;
    let active = 0;
    let resultShown = false;

    const applyOffers = () => {
      const ordered = Object.keys(offersByAttempt)
        .map(Number)
        .sort((a, b) => a - b)
        .map((attempt) => offersByAttempt[attempt]);
      setWitmeOffers(ordered);
    };

    const launch = (attempt: number) => {
      if (attempt > MAX_WITME_ATTEMPTS_RO || stopped) return;
      active++;
      let nextLaunched = false;
      const launchNext = () => {
        if (!nextLaunched && !stopped) {
          nextLaunched = true;
          launch(attempt + 1);
        }
      };
      const raceTimer = attempt > 1 ? setTimeout(launchNext, RACE_TIMEOUT_MS) : undefined;

      requestWitmeLenderOfferRo(fullAnswers, clickId, utmSource, "creditio-multiping-ro-v1", sessionId, witmeOfferIdRo(attempt)).then((result) => {
        clearTimeout(raceTimer);
        active--;
        if (result.offer) {
          offersByAttempt[attempt] = result.offer;
          applyOffers();
          launchNext();
        } else {
          stopped = true;
        }
        if (!resultShown && (attempt === 1 || !result.offer)) {
          resultShown = true;
          setApplicationSubmitted(result.succeeded);
          setStage("result");
        }
        if (active === 0) setFetchingMoreOffers(false);
      });
    };

    setFetchingMoreOffers(true);
    launch(1);
  };

  return (
    <>
      <Header />
      <LandingRo
        widget={
          <MultipingRoWidget
            stage={stage}
            answers={answers}
            scoreData={scoreData}
            witmeOffers={witmeOffers}
            fetchingMoreOffers={fetchingMoreOffers}
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

