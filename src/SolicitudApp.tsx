import { useEffect, useState } from "react";
import type { Answers } from "./data/witmeQuestions";
import { trackFunnelEvent } from "./lib/funnel";
import { getClickId } from "./lib/postback";
import { supabase } from "./lib/supabase";
import type { BreakdownItem } from "./lib/types";
import { requestWitmeLenderOffer, witmeOfferId, MAX_WITME_ATTEMPTS, type LenderOffer } from "./lib/witme";
import { shouldOfferCarCollateral, submitCarCollateralLead } from "./lib/witmeCar";
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
  approvalProbability: number | null;
}

export default function SolicitudApp() {
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

    // Métrica interna aparte del score: no es lo mismo pedir un importe
    // acorde a tu capacidad que pedir muy por encima de ella. Best-effort:
    // si falla, no debe bloquear el flujo de la solicitud.
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

    // Marca que el usuario ha terminado el formulario completo (llegó al
    // final y le dio a enviar), independientemente de si luego se intenta o
    // no el envío a Witme - es la señal de "completa todo el proceso" que
    // usa el panel admin para medir la caída del embudo.
    trackFunnelEvent("question_reached", "application_completed", "solicitud");

    // Producto nuevo (prestamistas con aval de coche), en paralelo al envío
    // normal de más abajo - solo tiene sentido para quien tiene coche
    // propio, y no bloquea ni afecta al resto del flujo (best-effort).
    if (shouldOfferCarCollateral(fullAnswers)) {
      void submitCarCollateralLead(
        fullAnswers,
        {
          name: String(fullAnswers.name ?? ""),
          lastName: String(fullAnswers.lastName ?? ""),
          email: String(fullAnswers.email ?? ""),
          phoneNumber: String(fullAnswers.phoneNumber ?? ""),
        },
        utmSource,
        scoreData.quizSessionId,
      );
    }

    // Witme exige el número de cuenta bancaria como campo obligatorio y lo
    // rechaza aunque lo mandemos vacío (ver "The data.bank account number
    // field is required." incluso con hasBankAccount=false) - sin cuenta
    // bancaria el envío siempre falla, así que ni lo intentamos.
    if (fullAnswers.hasBankAccount === "no") {
      setApplicationSubmitted(true);
      setWitmeOffers([]);
      setStage("result");
      return;
    }

    setStage("submitting");

    const sessionId = scoreData.quizSessionId;
    const first = await requestWitmeLenderOffer(fullAnswers, clickId, utmSource, sessionId, witmeOfferId(1));
    setApplicationSubmitted(first.succeeded);
    setWitmeOffers(first.offer ? [first.offer] : []);
    setStage("result");

    // Cada llamada aceptada consume una posición de la cascada de
    // prestamistas de Witme para esta misma solicitud; en cuanto una no
    // vuelve con oferta (rechazo o fallo) asumimos que no quedan más y
    // dejamos de insistir. No bloquea la UI: el usuario ya ve el resultado
    // con la primera oferta (si la hay) y las ofertas estáticas de siempre,
    // y cada oferta adicional aceptada se añade a la lista según llega.
    let accepted = first.offer != null;
    if (accepted) setFetchingMoreOffers(true);
    for (let attempt = 2; accepted && attempt <= MAX_WITME_ATTEMPTS; attempt++) {
      const next = await requestWitmeLenderOffer(fullAnswers, clickId, utmSource, sessionId, witmeOfferId(attempt));
      accepted = next.offer != null;
      if (next.offer) {
        const offer = next.offer;
        setWitmeOffers((prev) => [...prev, offer]);
      }
    }
    setFetchingMoreOffers(false);
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
