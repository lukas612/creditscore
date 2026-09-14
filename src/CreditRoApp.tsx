import { useEffect, useState } from "react";
import type { Answers } from "./data/witmeQuestionsRoCredit";
import { trackFunnelEvent } from "./lib/funnel";
import { getClickId } from "./lib/postback";
import { supabase } from "./lib/supabase";
import { requestWitmeLenderOfferRo, witmeOfferIdRo, MAX_WITME_ATTEMPTS_RO, type LenderOffer } from "./lib/witmeRo";
import { Header } from "./components/Header";
import { LandingCreditRo } from "./components/LandingCreditRo";
import { CreditRoWidget } from "./components/CreditRoWidget";
import type { GateContact } from "./components/WitmeGate";

type Stage = "quiz" | "loading" | "gate" | "extra" | "submitting" | "result" | "error";

interface SessionData {
  quizSessionId: string;
}

// Credit RO: landing de crédito (no de score), formato multiping (cascada a
// la API de Witme, servy_id 259), pidiendo solo los campos que la plantilla
// real de Witme exige - sin calcular ninguna puntuación.
export default function CreditRoApp() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [answers, setAnswers] = useState<Answers>({});
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [witmeOffers, setWitmeOffers] = useState<LenderOffer[]>([]);
  const [fetchingMoreOffers, setFetchingMoreOffers] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [clickId] = useState<string | null>(() => getClickId());

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");

  useEffect(() => {
    trackFunnelEvent("page_view", undefined, "credit_ro");
  }, []);

  const handleQuizComplete = async (quizAnswers: Answers) => {
    setStage("loading");
    setAnswers(quizAnswers);

    const { data: quizSessionId, error: sessionError } = await supabase.rpc("create_quiz_session", {
      p_answers: quizAnswers,
      p_utm_source: utmSource,
      p_click_id: clickId,
      p_source: "credit_ro",
    });

    if (sessionError || !quizSessionId) {
      setStage("error");
      return;
    }

    setSessionData({ quizSessionId });
    setStage("gate");
  };

  const handleGateUnlock = (contact: GateContact) => {
    setAnswers((prev) => ({ ...prev, ...contact }));
    setStage("extra");
  };

  const handleExtraComplete = async (fullAnswers: Answers) => {
    setAnswers(fullAnswers);

    if (!sessionData) {
      setStage("error");
      return;
    }

    trackFunnelEvent("question_reached", "application_completed", "credit_ro");
    setStage("submitting");

    const sessionId = sessionData.quizSessionId;

    // Misma cascada que Multiping RO: el primer intento se espera entero
    // antes de lanzar el segundo; a partir del segundo, carrera de 8s.
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

      requestWitmeLenderOfferRo(fullAnswers, clickId, utmSource, sessionId, witmeOfferIdRo(attempt)).then((result) => {
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
      <LandingCreditRo
        widget={
          <CreditRoWidget
            stage={stage}
            answers={answers}
            quizSessionId={sessionData?.quizSessionId ?? null}
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
