import { RO_SCORE_PHASES, RO_EXTRA_PHASES, visibleScoreQuestionsRo, visibleExtraQuestionsRo, type Answers } from "../data/witmeQuestionsRo";
import { CREDIT_OFFERS_RO } from "../data/offersRo";
import type { BreakdownItem } from "../lib/types";
import type { LenderOffer } from "../lib/witmeRo";
import { isValidRomanianPhone, normalizeRomanianPhone } from "../lib/validation";
import { LoadingSpinner } from "./LoadingSpinner";
import { SolicitudResult } from "./SolicitudResult";
import { WitmeForm } from "./WitmeForm";
import { WitmeGate, type GateContact } from "./WitmeGate";

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

interface Props {
  stage: Stage;
  answers: Answers;
  scoreData: ScoreData | null;
  witmeOffers: LenderOffer[];
  fetchingMoreOffers: boolean;
  clickId: string | null;
  applicationSubmitted: boolean;
  onQuizComplete: (answers: Answers) => void;
  onGateUnlock: (contact: GateContact) => void;
  onExtraComplete: (answers: Answers) => void;
}

// Multiping RO: mismo concepto que "solicitud completa" en España (varias
// llamadas a la API de Witme), traducido al rumano y con moneda LEI (RON).
export function MultipingRoWidget({
  stage,
  answers,
  scoreData,
  witmeOffers,
  fetchingMoreOffers,
  clickId,
  applicationSubmitted,
  onQuizComplete,
  onGateUnlock,
  onExtraComplete,
}: Props) {
  return (
    <div className="widget" id="widget">
      {stage === "quiz" && (
        <WitmeForm visibleQuestions={visibleScoreQuestionsRo} phases={RO_SCORE_PHASES} source="multiping_ro" onComplete={onQuizComplete} />
      )}

      {stage === "loading" && (
        <div className="quiz-card">
          <LoadingSpinner text="Îți calculăm scorul, așteaptă câteva secunde…" />
        </div>
      )}

      {stage === "gate" && scoreData && (
        <WitmeGate
          quizSessionId={scoreData.quizSessionId}
          score={scoreData.score}
          scoreBand={scoreData.scoreBand}
          zipCode={String(answers.zipCode ?? "")}
          approvalProbability={scoreData.approvalProbability}
          clickId={clickId}
          source="multiping_ro"
          phoneValidator={isValidRomanianPhone}
          phoneNormalizer={normalizeRomanianPhone}
          phoneErrorMessage="Verifică numărul de telefon: trebuie să aibă 9 cifre și să înceapă cu 2, 3 sau 7."
          phonePlaceholder="Telefon (7XX XXX XXX)"
          onUnlock={onGateUnlock}
        />
      )}

      {stage === "extra" && (
        <WitmeForm
          initialAnswers={answers}
          visibleQuestions={visibleExtraQuestionsRo}
          phases={RO_EXTRA_PHASES}
          intro="Avem deja scorul tău. Doar câteva date finale pentru a procesa cererea ta."
          source="multiping_ro"
          onComplete={onExtraComplete}
        />
      )}

      {stage === "submitting" && (
        <div className="quiz-card">
          <LoadingSpinner text="Îți procesăm cererea, așteaptă câteva secunde…" />
        </div>
      )}

      {stage === "result" && scoreData && (
        <SolicitudResult
          score={scoreData.score}
          scoreBand={scoreData.scoreBand}
          breakdown={scoreData.breakdown}
          capacidadMensual={scoreData.capacidadMensual}
          capacidadMaxima={scoreData.capacidadMaxima}
          witmeOffers={witmeOffers}
          fetchingMoreOffers={fetchingMoreOffers}
          clickId={clickId}
          quizSessionId={scoreData.quizSessionId}
          applicationSubmitted={applicationSubmitted}
          offersSource="multiping_ro"
          staticOffers={CREDIT_OFFERS_RO}
          locale="ro-RO"
          currencyCode="RON"
        />
      )}

      {stage === "error" && (
        <div className="quiz-card">
          <p className="loading-text">
            A apărut o eroare la procesarea cererii tale. Reîncarcă pagina și încearcă din nou.
          </p>
        </div>
      )}
    </div>
  );
}
