import { CREDIT_OFFERS } from "../data/offers";
import { trackFunnelEvent } from "../lib/funnel";
import type { LenderOffer } from "../lib/witme";

interface Props {
  witmeOffers: LenderOffer[];
  fetchingMoreOffers: boolean;
  clickId: string | null;
  quizSessionId: string;
  source?: "solicitud" | "pingtree";
}

export function SolicitudOffers({ witmeOffers, fetchingMoreOffers, clickId, quizSessionId, source = "solicitud" }: Props) {
  return (
    <div className="offers-section">
      <p className="offers-eyebrow">Tu siguiente paso</p>
      <p className="offers-title">Ofertas para ti</p>
      <p className="offers-sub">
        Estas entidades podrían encajar con tu perfil. Cada una tiene sus propias
        condiciones y proceso de solicitud independiente.
      </p>
      <div className="offers-grid">
        {witmeOffers.map((witmeOffer, index) => (
          <div key={witmeOffer.id} className="offer-card offer-card-featured offer-card-enter">
            <div className="offer-card-body">
              <span className="offer-featured-badge">✓ Preaprobado para ti</span>
              <span className="offer-name">
                {index === 0 ? "Tu préstamo preaprobado" : `Otra oferta preaprobada para ti`}
              </span>
              <span className="offer-desc">Haz click para recibir tu dinero.</span>
            </div>
            <a
              className="offer-cta"
              href={witmeOffer.url}
              target="_blank"
              rel="noreferrer sponsored"
              onClick={() => trackFunnelEvent("offer_click", witmeOffer.id, source, quizSessionId)}
            >
              Ver oferta →
            </a>
          </div>
        ))}
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
              onClick={() => trackFunnelEvent("offer_click", offer.id, source, quizSessionId)}
            >
              Ver oferta →
            </a>
          </div>
        ))}
      </div>
      {fetchingMoreOffers && (
        <p className="offers-more-loading">
          <span className="offers-more-spinner" aria-hidden="true" /> Buscando más ofertas preaprobadas para ti…
        </p>
      )}
    </div>
  );
}
