import { CREDIT_OFFERS } from "../data/offers";
import { trackFunnelEvent } from "../lib/funnel";
import type { LenderOffer } from "../lib/witme";

interface Props {
  witmeOffer: LenderOffer | null;
  clickId: string | null;
}

export function SolicitudOffers({ witmeOffer, clickId }: Props) {
  return (
    <div className="offers-section">
      <p className="offers-eyebrow">Tu siguiente paso</p>
      <p className="offers-title">Ofertas para ti</p>
      <p className="offers-sub">
        Estas entidades podrían encajar con tu perfil. Cada una tiene sus propias
        condiciones y proceso de solicitud independiente.
      </p>
      <div className="offers-grid">
        {witmeOffer && (
          <div className="offer-card offer-card-featured">
            <div className="offer-card-body">
              <span className="offer-featured-badge">✓ Preaprobado para ti</span>
              <span className="offer-name">Tu préstamo preaprobado</span>
              <span className="offer-desc">Haz click para recibir tu dinero.</span>
            </div>
            <a
              className="offer-cta"
              href={witmeOffer.url}
              target="_blank"
              rel="noreferrer sponsored"
              onClick={() => trackFunnelEvent("offer_click", "witme_featured", "solicitud")}
            >
              Ver oferta →
            </a>
          </div>
        )}
        {CREDIT_OFFERS.map((offer) => (
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
              onClick={() => trackFunnelEvent("offer_click", offer.id, "solicitud")}
            >
              Ver oferta →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
