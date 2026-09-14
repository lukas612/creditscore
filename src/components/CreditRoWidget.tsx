import { CREDIT_RO_PRE_GATE_PHASES, CREDIT_RO_POST_GATE_PHASES, visiblePreGateQuestions, visiblePostGateQuestions, type Answers } from "../data/witmeQuestionsRoCredit";
import { CREDIT_OFFERS_RO } from "../data/offersRo";
import type { LenderOffer } from "../lib/witmeRo";
import { isValidRomanianPhone, normalizeRomanianPhone } from "../lib/validation";
import { CreditRoResult } from "./CreditRoResult";
import { LoadingSpinner } from "./LoadingSpinner";
import { WitmeForm, type WitmeFormCopy } from "./WitmeForm";
import { WitmeGate, type GateContact } from "./WitmeGate";

const WITME_FORM_COPY_RO: WitmeFormCopy = {
  questionCountText: (current, total) => `Întrebarea ${current} din ${total}`,
  lastQuestionLabel: "Ultima întrebare 🎉",
  almostDoneLabel: "Aproape ai terminat 💪",
  reassuranceLine: "🔒 Răspunsurile tale sunt criptate și protejate.",
  backLabel: "← Înapoi",
  tooltipLabel: "De ce întrebăm asta",
  continueLabel: "Continuă",
  selectPlaceholder: "Selectează…",
  yesLabel: "Da",
  noLabel: "Nu",
  dayLabel: "Zi",
  monthLabel: "Lună",
  yearLabel: "An",
  months: [
    { value: "01", label: "Ianuarie" },
    { value: "02", label: "Februarie" },
    { value: "03", label: "Martie" },
    { value: "04", label: "Aprilie" },
    { value: "05", label: "Mai" },
    { value: "06", label: "Iunie" },
    { value: "07", label: "Iulie" },
    { value: "08", label: "August" },
    { value: "09", label: "Septembrie" },
    { value: "10", label: "Octombrie" },
    { value: "11", label: "Noiembrie" },
    { value: "12", label: "Decembrie" },
  ],
};

type Stage = "quiz" | "loading" | "gate" | "extra" | "submitting" | "result" | "error";

interface Props {
  stage: Stage;
  answers: Answers;
  quizSessionId: string | null;
  witmeOffers: LenderOffer[];
  fetchingMoreOffers: boolean;
  clickId: string | null;
  applicationSubmitted: boolean;
  onQuizComplete: (answers: Answers) => void;
  onGateUnlock: (contact: GateContact) => void;
  onExtraComplete: (answers: Answers) => void;
}

export function CreditRoWidget({
  stage,
  answers,
  quizSessionId,
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
        <WitmeForm
          visibleQuestions={visiblePreGateQuestions}
          phases={CREDIT_RO_PRE_GATE_PHASES}
          source="credit_ro"
          copy={WITME_FORM_COPY_RO}
          onComplete={onQuizComplete}
        />
      )}

      {stage === "loading" && (
        <div className="quiz-card">
          <LoadingSpinner text="Căutăm cea mai bună opțiune pentru tine, așteaptă câteva secunde…" />
        </div>
      )}

      {stage === "gate" && quizSessionId && (
        <WitmeGate
          quizSessionId={quizSessionId}
          score={null}
          scoreBand={null}
          zipCode=""
          approvalProbability={null}
          clickId={clickId}
          source="credit_ro"
          showScoreTeaser={false}
          postbackParam1="RO_Creditio_score"
          phoneValidator={isValidRomanianPhone}
          phoneNormalizer={normalizeRomanianPhone}
          phoneErrorMessage="Verifică numărul de telefon: trebuie să aibă 9 cifre și să înceapă cu 2, 3 sau 7."
          phonePlaceholder="Telefon (7XX XXX XXX)"
          title="Am găsit oferte pentru tine"
          subText="Lasă-ne datele tale de contact ca să continuăm cererea și să-ți arătăm oferta care se potrivește profilului tău."
          namePlaceholder="Prenume"
          lastNamePlaceholder="Nume"
          emailPlaceholder="Adresă de email"
          emailErrorMessage="Verifică adresa de email, nu pare validă."
          consentText="Accept politica de confidențialitate și să fiu contactat cu oferte de finanțare adaptate profilului meu."
          consentErrorMessage="Trebuie să accepți politica de confidențialitate pentru a continua."
          saveErrorMessage="Nu am putut salva datele tale. Încearcă din nou."
          submitLabel="Continuă cererea"
          submittingLabel="Se trimite…"
          reassuranceLine="🔒 Conexiune criptată · Datele tale nu se vând niciodată către terți"
          onUnlock={onGateUnlock}
        />
      )}

      {stage === "extra" && (
        <WitmeForm
          initialAnswers={answers}
          visibleQuestions={visiblePostGateQuestions}
          phases={CREDIT_RO_POST_GATE_PHASES}
          intro="Mai avem nevoie de câteva date pentru a procesa cererea ta."
          source="credit_ro"
          copy={WITME_FORM_COPY_RO}
          onComplete={onExtraComplete}
        />
      )}

      {stage === "submitting" && (
        <div className="quiz-card">
          <LoadingSpinner text="Îți procesăm cererea, așteaptă câteva secunde…" />
        </div>
      )}

      {stage === "result" && quizSessionId && (
        <CreditRoResult
          witmeOffers={witmeOffers}
          fetchingMoreOffers={fetchingMoreOffers}
          clickId={clickId}
          quizSessionId={quizSessionId}
          applicationSubmitted={applicationSubmitted}
          staticOffers={CREDIT_OFFERS_RO}
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
