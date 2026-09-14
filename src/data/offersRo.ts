import type { CreditOffer } from "./offers";

// Ofertas estáticas de respaldo para Rumanía (RO) - se muestran cuando
// Witme no da una oferta destacada, igual que CREDIT_OFFERS para España.
const UTM_SOURCE_RO = "creditioscore-ro";

export const CREDIT_OFFERS_RO: CreditOffer[] = [
  {
    id: "creditio-ro",
    name: "Creditio",
    description: "Împrumut rapid online, comparăm cele mai bune oferte pentru tine.",
    buildUrl: (clickId) => {
      const params = new URLSearchParams({
        form_id: "creditio-pingtree-ro-v5",
        utm_source: UTM_SOURCE_RO,
        h_show_image: "0",
      });
      if (clickId) params.set("servy_click", clickId);
      return `https://creditio.es/ro/home-v3?${params.toString()}`;
    },
  },
  {
    id: "moneya-ro",
    name: "Moneya",
    description: "Împrumut rapid online – bani în cont chiar astăzi.",
    buildUrl: (clickId) => {
      const params = new URLSearchParams({
        form_id: "moneya-pingtree-ro-v2",
        utm_source: UTM_SOURCE_RO,
        h_title: "Împrumut rapid online – bani în cont chiar astăzi",
        h_subtitle: "Formalități minime și decizie rapidă. Alege cea mai bună ofertă pentru tine.",
        h_checks: "Fără adeverințe și documente inutile,Disponibil 24/7 – complet online,Decizie în doar câteva minute",
        b_cta: "Ia un împrumut",
        f_amount: "2500",
        f_months: "6",
        f_cta: "Aplică acum",
        f_sub_cta: "Proces rapid, simplu și securizat",
      });
      if (clickId) params.set("servy_click", clickId);
      return `https://moneya.es/ro/v2?${params.toString()}`;
    },
  },
  {
    id: "safecredit",
    name: "Safecredit",
    description: "Credit rapid online, răspuns imediat.",
    buildUrl: (clickId) => {
      const params = new URLSearchParams({
        utm_source: "witme2",
        utm_medium: "affiliate",
        utm_campaign: "witme2_cps",
        utm_term: "voluum",
      });
      if (clickId) params.set("clickid", clickId);
      return `https://safecredit.ro/?${params.toString()}`;
    },
  },
  {
    id: "acredit",
    name: "Acredit",
    description: "Împrumuturi online rapide și sigure.",
    buildUrl: (clickId) => {
      const params = new URLSearchParams({
        utm_source: "witme",
        utm_medium: "affiliate",
        utm_campaign: "witme_cps",
        utm_term: "voluum",
      });
      if (clickId) params.set("clickid", clickId);
      return `https://acredit.ro/?${params.toString()}`;
    },
  },
  {
    id: "roncredit",
    name: "Ron Credit",
    description: "Credit online rapid, fără birocrație.",
    buildUrl: (clickId) => {
      const params = new URLSearchParams({
        utm_source: "witme",
        utm_medium: "cpa",
        utm_campaign: "own",
        utm_term: "web_ID",
      });
      if (clickId) params.set("click_id", clickId);
      return `http://roncredit.ro/?${params.toString()}`;
    },
  },
  {
    id: "vivacredit",
    name: "Vivacredit",
    description: "Împrumut online rapid și flexibil.",
    buildUrl: (clickId) => {
      const params = new URLSearchParams();
      if (clickId) params.set("action_id", clickId);
      const qs = params.toString();
      return `https://vivacredit.ro/lead/WitMe/${qs ? `?${qs}` : ""}`;
    },
  },
];
