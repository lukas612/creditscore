import { CREDIT_OFFERS } from "../data/offers";

interface Props {
  clickId: string | null;
}

export function CreditOffers({ clickId }: Props) {
  return (
    <div className="offers-section">
      <p className="breakdown-title">Opciones de crédito para ti</p>
      <p className="offers-sub">
        Estas entidades podrían encajar con tu perfil. Cada una tiene sus propias
        condiciones y proceso de solicitud independiente.
      </p>
      <div className="offers-grid">
        {CREDIT_OFFERS.map((offer) => (
          <a
            key={offer.id}
            className="offer-card"
            href={offer.buildUrl(clickId)}
            target="_blank"
            rel="noreferrer sponsored"
          >
            <span className="offer-name">{offer.name}</span>
            <span className="offer-desc">{offer.description}</span>
            <span className="offer-cta">Ver oferta →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
