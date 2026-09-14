import type { Answers } from "../data/witmeQuestionsRoCredit";
import { CREDIT_OFFERS_RO } from "../data/offersRo";
import type { LenderOffer } from "../lib/witmeRo";
import { isValidRomanianPhone, normalizeRomanianPhone } from "../lib/validation";
import { CreditRoDetailsForm } from "./CreditRoDetailsForm";
import { CreditRoLoanStep } from "./CreditRoLoanStep";
import { CreditRoResult } from "./CreditRoResult";
import { CreditStepHeader } from "./CreditStepHeader";
import { LoadingSpinner } from "./LoadingSpinner";
import { WitmeGate, type GateContact } from "./WitmeGate";

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

const amountFmt = new Intl.NumberFormat("ro-RO");

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
      {stage === "quiz" && <CreditRoLoanStep onComplete={onQuizComplete} />}

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
          beforeContent={<CreditStepHeader current={2} />}
          postbackParam1="RO_Creditio_score"
          phoneValidator={isValidRomanianPhone}
          phoneNormalizer={normalizeRomanianPhone}
          phoneErrorMessage="Verifică numărul de telefon: trebuie să aibă 9 cifre și să înceapă cu 2, 3 sau 7."
          phonePlaceholder="Telefon (7XX XXX XXX)"
          title="Am găsit oferte pentru tine"
          subText={`Am găsit opțiuni pentru ${amountFmt.format(Number(answers.requestedAmount ?? 0))} LEI — lasă-ne datele tale de contact ca să continuăm cererea.`}
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

      {stage === "extra" && <CreditRoDetailsForm initialAnswers={answers} onComplete={onExtraComplete} />}

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
