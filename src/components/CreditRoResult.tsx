import type { CreditOffer } from "../data/offers";
import type { LenderOffer } from "../lib/witmeRo";
import { SolicitudOffers } from "./SolicitudOffers";

interface Props {
  witmeOffers: LenderOffer[];
  fetchingMoreOffers: boolean;
  clickId: string | null;
  quizSessionId: string;
  applicationSubmitted: boolean;
  staticOffers: CreditOffer[];
}

export function CreditRoResult({
  witmeOffers,
  fetchingMoreOffers,
  clickId,
  quizSessionId,
  applicationSubmitted,
  staticOffers,
}: Props) {
  return (
    <div className="result-card credit-step-enter">
      <div className={`application-status ${applicationSubmitted ? "ok" : "warn"}`}>
        {applicationSubmitted
          ? "✅ Am primit cererea ta. Echipa noastră o va analiza și te va contacta în curând."
          : "⚠️ A apărut o problemă la trimiterea cererii tale. Te vom contacta oricum pentru a o finaliza."}
      </div>

      <h2>Cererea ta este pe drum</h2>
      <p className="result-sub">
        Verificăm oferta care se potrivește cel mai bine profilului tău. Îți arătăm mai jos ce am
        găsit până acum.
      </p>

      <SolicitudOffers
        witmeOffers={witmeOffers}
        fetchingMoreOffers={fetchingMoreOffers}
        clickId={clickId}
        quizSessionId={quizSessionId}
        source="credit_ro"
        staticOffers={staticOffers}
        eyebrow="Următorul tău pas"
        title="Oferte pentru tine"
        subText="Aceste instituții s-ar putea potrivi profilului tău. Fiecare are propriile condiții și proces de solicitare independent."
        preapprovedBadge="✓ Preaprobat pentru tine"
        firstOfferName="Împrumutul tău preaprobat"
        otherOfferName="O altă ofertă preaprobată pentru tine"
        offerDesc="Apasă pentru a-ți primi banii."
        ctaLabel="Vezi oferta →"
        loadingText="Căutăm mai multe oferte preaprobate pentru tine…"
      />
    </div>
  );
}
