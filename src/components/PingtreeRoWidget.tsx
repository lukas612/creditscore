import { RO_SCORE_PHASES, RO_EXTRA_PHASES, visibleScoreQuestionsRo, visibleExtraQuestionsRo, type Answers } from "../data/witmeQuestionsRo";
import { CREDIT_OFFERS_RO } from "../data/offersRo";
import type { BreakdownItem } from "../lib/types";
import { isValidRomanianPhone, normalizeRomanianPhone } from "../lib/validation";
import { LoadingSpinner } from "./LoadingSpinner";
import { SolicitudResult } from "./SolicitudResult";
import { WitmeForm } from "./WitmeForm";
import { WitmeGate, type GateContact } from "./WitmeGate";

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

interface Props {
  stage: Stage;
  answers: Answers;
  scoreData: ScoreData | null;
  clickId: string | null;
  applicationSubmitted: boolean;
  onQuizComplete: (answers: Answers) => void;
  onGateUnlock: (contact: GateContact) => void;
  onExtraComplete: (answers: Answers) => void;
}

// Mismo tono de "felicitaciones" para las 4 bandas, sin prometer de más a
// quien tiene un score bajo.
const REDIRECT_COPY: Record<string, string> = {
  excelente: "îți permite să obții cele mai bune condiții de pe piață",
  bueno: "îți permite să obții condiții foarte bune de finanțare",
  regular: "îți permite să accesezi mai multe opțiuni de finanțare",
  bajo: "chiar și așa, avem opțiuni pentru profilul tău",
};

export function PingtreeRoWidget({
  stage,
  answers,
  scoreData,
  clickId,
  applicationSubmitted,
  onQuizComplete,
  onGateUnlock,
  onExtraComplete,
}: Props) {
  return (
    <div className="widget" id="widget">
      {stage === "quiz" && (
        <WitmeForm visibleQuestions={visibleScoreQuestionsRo} phases={RO_SCORE_PHASES} source="pingtree_ro" onComplete={onQuizComplete} />
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
          source="pingtree_ro"
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
          source="pingtree_ro"
          onComplete={onExtraComplete}
        />
      )}

      {stage === "submitting" && scoreData && (
        <div className="quiz-card">
          <div className="score-gauge">
            <div
              className="score-gauge-fill"
              style={{ width: `${Math.round(((scoreData.score - 300) / (850 - 300)) * 100)}%` }}
            />
          </div>
          <span className="score-value">{scoreData.score}</span>
          <span className="score-band">Felicitări!</span>
          <p className="result-sub">
            Scorul tău de {scoreData.score} puncte {REDIRECT_COPY[scoreData.scoreBand] ?? REDIRECT_COPY.regular}.
          </p>
          <LoadingSpinner text="Te redirecționăm către oferta care se potrivește cel mai bine nevoilor tale…" />
        </div>
      )}

      {stage === "redirecting" && (
        <div className="quiz-card">
          <LoadingSpinner text="Te redirecționăm către oferta ta…" />
        </div>
      )}

      {stage === "result" && scoreData && (
        <SolicitudResult
          score={scoreData.score}
          scoreBand={scoreData.scoreBand}
          breakdown={scoreData.breakdown}
          capacidadMensual={scoreData.capacidadMensual}
          capacidadMaxima={scoreData.capacidadMaxima}
          witmeOffers={[]}
          fetchingMoreOffers={false}
          clickId={clickId}
          quizSessionId={scoreData.quizSessionId}
          applicationSubmitted={applicationSubmitted}
          offersSource="pingtree_ro"
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
