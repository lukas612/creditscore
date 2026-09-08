import { CREDIT_OFFERS } from "../data/offers";
import { trackFunnelEvent } from "../lib/funnel";

interface Props {
  clickId: string | null;
  quizSessionId: string;
}

export function CreditOffers({ clickId, quizSessionId }: Props) {
  return (
    <div className="offers-section">
      <p className="offers-eyebrow">Tu siguiente paso</p>
      <p className="offers-title">Opciones de crédito para ti</p>
      <p className="offers-sub">
        Estas entidades podrían encajar con tu perfil. Cada una tiene sus propias
        condiciones y proceso de solicitud independiente.
      </p>
      <div className="offers-grid">
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
              onClick={() => trackFunnelEvent("offer_click", offer.id, "quiz", quizSessionId)}
            >
              Ver oferta →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
