import { RO_SCORE_PHASES, RO_EXTRA_PHASES, visibleScoreQuestionsRo, visibleExtraQuestionsRo, type Answers } from "../data/witmeQuestionsRo";
import { CREDIT_OFFERS_RO } from "../data/offersRo";
import { CREDIT_BUILDER_TIPS_RO, EFFORT_LABEL_RO, GENERIC_BUILDER_TIP_RO } from "../data/creditBuilderRo";
import type { BreakdownItem } from "../lib/types";
import { isValidRomanianPhone, normalizeRomanianPhone } from "../lib/validation";
import { LoadingSpinner } from "./LoadingSpinner";
import { SolicitudResult } from "./SolicitudResult";
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

const BAND_COPY_RO: Record<string, { title: string; tip: string }> = {
  excelente: {
    title: "Excelent!",
    tip: "Profilul tău se potrivește cu cele mai bune condiții de pe piață: dobânzi mici și aprobare rapidă.",
  },
  bueno: {
    title: "Bun",
    tip: "Ai un profil de credit bun. Poți accesa majoritatea împrumuturilor personale fără probleme.",
  },
  regular: {
    title: "Mediu",
    tip: "Există loc de îmbunătățire. Reducerea datoriilor actuale sau creșterea veniturilor declarate ți-ar îmbunătăți punctajul.",
  },
  bajo: {
    title: "Scăzut",
    tip: "S-ar putea să-ți fie mai greu să accesezi finanțare standard, dar avem opțiuni gândite pentru situația ta.",
  },
};

const SHARE_BAND_LABEL_RO: Record<string, string> = {
  excelente: "Excelent",
  bueno: "Bun",
  regular: "Mediu",
  bajo: "Scăzut",
};

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
        <WitmeForm visibleQuestions={visibleScoreQuestionsRo} phases={RO_SCORE_PHASES} source="pingtree_ro" copy={WITME_FORM_COPY_RO} onComplete={onQuizComplete} />
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
          postbackParam1="RO_Creditio_score"
          phoneValidator={isValidRomanianPhone}
          phoneNormalizer={normalizeRomanianPhone}
          phoneErrorMessage="Verifică numărul de telefon: trebuie să aibă 9 cifre și să înceapă cu 2, 3 sau 7."
          phonePlaceholder="Telefon (7XX XXX XXX)"
          title="Punctajul tău a fost deja calculat"
          subText="Lasă-ne datele tale pentru a debloca raportul tău complet și a vedea ce opțiuni de finanțare se potrivesc profilului tău."
          namePlaceholder="Prenume"
          lastNamePlaceholder="Nume"
          emailPlaceholder="Adresă de email"
          emailErrorMessage="Verifică adresa de email, nu pare validă."
          consentText="Accept politica de confidențialitate și să fiu contactat cu oferte de finanțare adaptate profilului meu."
          consentErrorMessage="Trebuie să accepți politica de confidențialitate pentru a continua."
          saveErrorMessage="Nu am putut salva datele tale. Încearcă din nou."
          submitLabel="Vezi raportul meu complet"
          submittingLabel="Se trimite…"
          reassuranceLine="🔒 Conexiune criptată · Datele tale nu se vând niciodată către terți"
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
          copy={WITME_FORM_COPY_RO}
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
          bandCopy={BAND_COPY_RO}
          submittedText="✅ Am primit cererea ta completă. Echipa noastră o va analiza și te va contacta în curând."
          notSubmittedText="⚠️ Ți-am calculat punctajul, dar a apărut o problemă la trimiterea cererii tale complete. Te vom contacta oricum."
          capacityTitle="Capacitatea de credit estimată"
          monthlyLabel="Rata lunară maximă recomandată"
          maxAmountLabel="Suma estimată pe care ai putea-o obține"
          capacityDisclaimer="Estimare orientativă pe baza veniturilor și datoriilor declarate, fără dobânzi aplicate. Nu este o ofertă de credit și nici o aprobare garantată."
          breakdownTitle="Defalcarea punctajului tău"
          offersCopy={{
            eyebrow: "Următorul tău pas",
            title: "Oferte pentru tine",
            subText: "Aceste instituții s-ar putea potrivi profilului tău. Fiecare are propriile condiții și proces de solicitare independent.",
            preapprovedBadge: "✓ Preaprobat pentru tine",
            firstOfferName: "Împrumutul tău preaprobat",
            otherOfferName: "O altă ofertă preaprobată pentru tine",
            offerDesc: "Apasă pentru a-ți primi banii.",
            ctaLabel: "Vezi oferta →",
            loadingText: "Căutăm mai multe oferte preaprobate pentru tine…",
          }}
          shareCopy={{
            title: "Distribuie rezultatul tău",
            bandLabel: SHARE_BAND_LABEL_RO,
            buildShareText: (score, bandText) =>
              `Punctajul meu în Creditio Credit Score este ${score}/850 (${bandText}). Descoperă-l gratuit pe al tău în 2 minute:`,
            nativeShareTitle: "Punctajul meu Creditio Credit Score",
            shareButtonLabel: "Distribuie",
            copyButtonLabel: "Copiază linkul",
            copiedLabel: "Copiat!",
          }}
          builderCopy={{
            title: "Planul tău de îmbunătățire a punctajului",
            emptyText: "🎉 Nu ai niciun factor care să scadă puncte în acest moment. Reia testul dacă se schimbă veniturile, datoriile sau situația ta profesională, ca să-ți menții punctajul la zi.",
            subText: "Ordonat după impact: începe cu primul, este cel care ți-ar aduce înapoi cele mai multe puncte.",
            tips: CREDIT_BUILDER_TIPS_RO,
            effortLabel: EFFORT_LABEL_RO,
            genericTip: GENERIC_BUILDER_TIP_RO,
          }}
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
