import type { LenderOffer } from "../lib/witme";

interface Props {
  offers: LenderOffer[];
}

export function WitmeLenderOffers({ offers }: Props) {
  if (offers.length === 0) return null;

  return (
    <div className="offers-section">
      <p className="offers-eyebrow">Tu siguiente paso</p>
      <p className="offers-title">Préstamos preaprobados para ti</p>
      <p className="offers-sub">
        Estas entidades ya han preaprobado tu solicitud con los datos que nos diste.
        Cada una tiene su propio proceso final para recibir el dinero.
      </p>
      <div className="offers-grid">
        {offers.map((offer, i) => (
          <div key={offer.url} className="offer-card">
            <div className="offer-card-body">
              <span className="offer-name">Préstamo preaprobado · Entidad {i + 1}</span>
              <span className="offer-desc">Haz click para recibir tu dinero.</span>
            </div>
            <a className="offer-cta" href={offer.url} target="_blank" rel="noreferrer sponsored">
              Ver oferta →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
