import { CREDIT_OFFERS, type CreditOffer } from "../data/offers";
import { trackFunnelEvent } from "../lib/funnel";
import type { LenderOffer } from "../lib/witme";

interface Props {
  witmeOffers: LenderOffer[];
  fetchingMoreOffers: boolean;
  clickId: string | null;
  quizSessionId: string;
  source?: string;
  staticOffers?: CreditOffer[];
  eyebrow?: string;
  title?: string;
  subText?: string;
  preapprovedBadge?: string;
  firstOfferName?: string;
  otherOfferName?: string;
  offerDesc?: string;
  ctaLabel?: string;
  loadingText?: string;
}

export function SolicitudOffers({
  witmeOffers,
  fetchingMoreOffers,
  clickId,
  quizSessionId,
  source = "solicitud",
  staticOffers = CREDIT_OFFERS,
  eyebrow = "Tu siguiente paso",
  title = "Ofertas para ti",
  subText = "Estas entidades podrían encajar con tu perfil. Cada una tiene sus propias condiciones y proceso de solicitud independiente.",
  preapprovedBadge = "✓ Preaprobado para ti",
  firstOfferName = "Tu préstamo preaprobado",
  otherOfferName = "Otra oferta preaprobada para ti",
  offerDesc = "Haz click para recibir tu dinero.",
  ctaLabel = "Ver oferta →",
  loadingText = "Buscando más ofertas preaprobadas para ti…",
}: Props) {
  // Si Witme ya aceptó al menos una oferta, no diluimos la conversión
  // mostrando también las ofertas estáticas por defecto: esas solo tienen
  // sentido como red de seguridad cuando Witme no asignó ningún prestamista.
  const showStaticOffers = witmeOffers.length === 0;

  return (
    <div className="offers-section">
      <p className="offers-eyebrow">{eyebrow}</p>
      <p className="offers-title">{title}</p>
      <p className="offers-sub">{subText}</p>
      <div className="offers-grid">
        {witmeOffers.map((witmeOffer, index) => (
          <div key={witmeOffer.id} className="offer-card offer-card-featured offer-card-enter">
            <div className="offer-card-body">
              <span className="offer-featured-badge">{preapprovedBadge}</span>
              <span className="offer-name">
                {index === 0 ? firstOfferName : otherOfferName}
              </span>
              <span className="offer-desc">{offerDesc}</span>
            </div>
            <a
              className="offer-cta"
              href={witmeOffer.url}
              target="_blank"
              rel="noreferrer sponsored"
              onClick={() => trackFunnelEvent("offer_click", witmeOffer.id, source, quizSessionId)}
            >
              {ctaLabel}
            </a>
          </div>
        ))}
        {showStaticOffers && staticOffers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <div className="offer-card-body">
              <span className="offer-name">{offer.name}</span>
              <span className="offer-desc">{offer.description}</span>
            </div>
            <a
              className="offer-cta"
              href={offer.buildUrl(clickId)}
              target="_blank"
              rel="noreferrer sponsored"
              onClick={() => trackFunnelEvent("offer_click", offer.id, source, quizSessionId)}
            >
              {ctaLabel}
            </a>
          </div>
        ))}
      </div>
      {fetchingMoreOffers && (
        <p className="offers-more-loading">
          <span className="offers-more-spinner" aria-hidden="true" /> {loadingText}
        </p>
      )}
    </div>
  );
}
