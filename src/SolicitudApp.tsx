import { useEffect, useState } from "react";
import type { Answers } from "./data/witmeQuestions";
import { trackFunnelEvent } from "./lib/funnel";
import { getClickId } from "./lib/postback";
import { supabase } from "./lib/supabase";
import type { BreakdownItem } from "./lib/types";
import { requestWitmeLenderOffer, witmeOfferId, MAX_WITME_ATTEMPTS, type LenderOffer } from "./lib/witme";
import { submitCarCollateralAndDebtConsolidationLead } from "./lib/witmeCar";
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

    // Dos productos nuevos en pruebas (aval coche y reunificación de
    // deudas), en paralelo al envío normal de más abajo - probado con 20
    // leads reales (mitad con coche, mitad sin) y la tasa de aceptación fue
    // la misma (20%) en ambos casos, así que se disparan para todo el
    // mundo. Una sola petición con ambos servy_id juntos (no una por
    // producto). Solo un ping en background para comparar resultados: nunca
    // se muestra ninguna oferta de aquí al usuario.
    const carContact = {
      name: String(fullAnswers.name ?? ""),
      lastName: String(fullAnswers.lastName ?? ""),
      email: String(fullAnswers.email ?? ""),
      phoneNumber: String(fullAnswers.phoneNumber ?? ""),
    };
    void submitCarCollateralAndDebtConsolidationLead(
      fullAnswers,
      carContact,
      clickId,
      utmSource,
      scoreData.quizSessionId,
    );

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

    // Cada llamada aceptada consume una posición de la cascada de
    // prestamistas de Witme para esta misma solicitud; en cuanto una
    // responde sin oferta (rechazo o fallo) asumimos que no quedan más y
    // dejamos de lanzar nuevas. Witme puede tardar bastante en responder
    // (mediana ~4s, hasta 30s+): en vez de esperar cada respuesta antes de
    // pedir la siguiente, si una no ha respondido a los 3s ya lanzamos la
    // siguiente en paralelo (sin esperar más); si responde antes, no se
    // espera ese margen y se actúa al momento. Las que ya estaban en vuelo
    // se dejan terminar aunque otra posterior haya cerrado la cascada.
    const RACE_TIMEOUT_MS = 3000;
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
      if (attempt > MAX_WITME_ATTEMPTS || stopped) return;
      active++;
      let nextLaunched = false;
      const launchNext = () => {
        if (!nextLaunched && !stopped) {
          nextLaunched = true;
          launch(attempt + 1);
        }
      };
      const raceTimer = setTimeout(launchNext, RACE_TIMEOUT_MS);

      requestWitmeLenderOffer(fullAnswers, clickId, utmSource, sessionId, witmeOfferId(attempt)).then((result) => {
        clearTimeout(raceTimer);
        active--;
        if (result.offer) {
          offersByAttempt[attempt] = result.offer;
          applyOffers();
          launchNext();
        } else {
          stopped = true;
        }
        // En cuanto sabemos el resultado del primer intento, o en cuanto
        // cualquier intento (aunque no sea el primero) nos dice que no hay
        // oferta -y por tanto la cascada ya no va a lanzar más- dejamos de
        // mostrar la pantalla de "enviando". Los intentos que ya estaban en
        // vuelo se dejan terminar y, si traen oferta, se añaden después via
        // applyOffers (misma mecánica que "buscando más ofertas").
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
