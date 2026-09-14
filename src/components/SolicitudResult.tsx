import type { BuilderEffort, BuilderTip } from "../data/creditBuilder";
import type { CreditOffer } from "../data/offers";
import type { BreakdownItem } from "../lib/types";
import type { LenderOffer } from "../lib/witme";
import { CreditBuilder } from "./CreditBuilder";
import { ScoreBreakdownChart } from "./ScoreBreakdownChart";
import { ShareResult } from "./ShareResult";
import { SolicitudOffers } from "./SolicitudOffers";

interface Props {
  score: number;
  scoreBand: string;
  breakdown: BreakdownItem[];
  capacidadMensual: number;
  capacidadMaxima: number;
  witmeOffers: LenderOffer[];
  fetchingMoreOffers: boolean;
  clickId: string | null;
  quizSessionId: string;
  applicationSubmitted: boolean;
  offersSource?: string;
  staticOffers?: CreditOffer[];
  locale?: string;
  currencyCode?: string;
  bandCopy?: Record<string, { title: string; tip: string }>;
  submittedText?: string;
  notSubmittedText?: string;
  capacityTitle?: string;
  monthlyLabel?: string;
  maxAmountLabel?: string;
  capacityDisclaimer?: string;
  breakdownTitle?: string;
  offersCopy?: {
    eyebrow?: string;
    title?: string;
    subText?: string;
    preapprovedBadge?: string;
    firstOfferName?: string;
    otherOfferName?: string;
    offerDesc?: string;
    ctaLabel?: string;
    loadingText?: string;
  };
  shareCopy?: {
    title?: string;
    bandLabel?: Record<string, string>;
    buildShareText?: (score: number, bandText: string) => string;
    nativeShareTitle?: string;
    shareButtonLabel?: string;
    copyButtonLabel?: string;
    copiedLabel?: string;
  };
  builderCopy?: {
    title?: string;
    emptyText?: string;
    subText?: string;
    tips?: Record<string, BuilderTip>;
    effortLabel?: Record<BuilderEffort, string>;
    genericTip?: BuilderTip;
  };
}

const BAND_COPY: Record<string, { title: string; tip: string }> = {
  excelente: {
    title: "¡Excelente!",
    tip: "Tu perfil encaja con las mejores condiciones del mercado: tipos de interés bajos y aprobación rápida.",
  },
  bueno: {
    title: "Bueno",
    tip: "Tienes un buen perfil crediticio. Puedes optar a la mayoría de préstamos personales sin problema.",
  },
  regular: {
    title: "Regular",
    tip: "Hay margen de mejora. Reducir tu deuda actual o aumentar tus ingresos declarados mejoraría tu puntuación.",
  },
  bajo: {
    title: "Bajo",
    tip: "Puede costarte más acceder a financiación estándar, pero tenemos opciones pensadas para tu situación.",
  },
};

export function SolicitudResult({
  score,
  scoreBand,
  breakdown,
  capacidadMensual,
  capacidadMaxima,
  witmeOffers,
  fetchingMoreOffers,
  clickId,
  quizSessionId,
  applicationSubmitted,
  offersSource = "solicitud",
  staticOffers,
  locale = "es-ES",
  currencyCode = "EUR",
  bandCopy = BAND_COPY,
  submittedText = "✅ Hemos recibido tu solicitud completa. Nuestro equipo la revisará y te contactará en breve.",
  notSubmittedText = "⚠️ Calculamos tu puntuación, pero hubo un problema enviando tu solicitud completa. Nos pondremos en contacto contigo igualmente.",
  capacityTitle = "Capacidad de crédito estimada",
  monthlyLabel = "Cuota mensual máxima recomendada",
  maxAmountLabel = "Importe estimado al que podrías optar",
  capacityDisclaimer = "Estimación orientativa a partir de tus ingresos y deudas declaradas, sin intereses aplicados. No es una oferta de crédito ni una aprobación garantizada.",
  breakdownTitle = "Desglose de tu puntuación",
  offersCopy,
  shareCopy,
  builderCopy,
}: Props) {
  const copy = bandCopy[scoreBand] ?? bandCopy.regular;
  const pct = Math.round(((score - 300) / (850 - 300)) * 100);
  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  });

  return (
    <div className="result-card">
      <div className={`application-status ${applicationSubmitted ? "ok" : "warn"}`}>
        {applicationSubmitted ? submittedText : notSubmittedText}
      </div>

      <div className="score-gauge">
        <div className="score-gauge-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="score-value">{score}</span>
      <span className="score-band">{copy.title}</span>
      <p className="result-sub">{copy.tip}</p>

      <SolicitudOffers
        witmeOffers={witmeOffers}
        fetchingMoreOffers={fetchingMoreOffers}
        clickId={clickId}
        quizSessionId={quizSessionId}
        source={offersSource}
        staticOffers={staticOffers}
        {...offersCopy}
      />

      <ShareResult score={score} scoreBand={scoreBand} {...shareCopy} />

      <div className="capacity-section">
        <p className="breakdown-title">{capacityTitle}</p>
        <div className="capacity-grid">
          <div className="capacity-stat">
            <span className="capacity-value">{currency.format(capacidadMensual)}</span>
            <span className="capacity-label">{monthlyLabel}</span>
          </div>
          <div className="capacity-stat">
            <span className="capacity-value">{currency.format(capacidadMaxima)}</span>
            <span className="capacity-label">{maxAmountLabel}</span>
          </div>
        </div>
        <p className="capacity-disclaimer">{capacityDisclaimer}</p>
      </div>

      <div className="breakdown-section">
        <p className="breakdown-title">{breakdownTitle}</p>
        <ScoreBreakdownChart breakdown={breakdown} />
      </div>

      <CreditBuilder breakdown={breakdown} {...builderCopy} />
    </div>
  );
}
