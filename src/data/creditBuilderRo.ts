import type { BuilderEffort, BuilderTip } from "./creditBuilder";

export const EFFORT_LABEL_RO: Record<BuilderEffort, string> = {
  rapido: "Rapid",
  manos: "Depinde de tine",
  tiempo: "Necesită timp",
  automatico: "Automat",
};

export const CREDIT_BUILDER_TIPS_RO: Record<string, BuilderTip> = {
  asnef: {
    title: "Ieși din restanțele la Biroul de Credit",
    tip: "Contactează instituția care te-a raportat și cere certificatul de plată sau confirmarea radierii imediat ce achiți datoria. Este, de departe, factorul care scade cel mai mult punctajul.",
    effort: "tiempo",
  },
  deudas: {
    title: "Redu-ți datoria raportat la venit",
    tip: "Prioritizează întâi datoriile cu cea mai mare dobândă (carduri de credit, credite rapide). Menținerea datoriei totale sub o treime din venitul tău anual este reperul care îmbunătățește cel mai mult acest factor.",
    effort: "manos",
  },
  ingresos: {
    title: "Declară toate veniturile tale",
    tip: "Plățile extra, o chirie încasată, un al doilea venit sau veniturile ca PFA contează și ele. Refă testul incluzând orice venit pe care nu l-ai declarat prima dată.",
    effort: "rapido",
  },
  empleo: {
    title: "Caută stabilitate profesională",
    tip: "Un contract pe perioadă nedeterminată sau statutul de funcționar public cântăresc mult mai mult decât activitatea de PFA cu venituri neregulate sau statutul de șomer. Dacă ești aproape de un contract mai stabil, punctajul tău va crește imediat ce se confirmă.",
    effort: "tiempo",
  },
  antiguedad: {
    title: "Vechimea în activitatea ta",
    tip: "Acest factor se îmbunătățește doar cu timpul: cu cât ești mai mult timp în postul sau activitatea actuală, cu atât mai bine. Nu depinde de nicio acțiune din partea ta.",
    effort: "automatico",
  },
  vivienda: {
    title: "Locuință în proprietate",
    tip: "A deține o locuință în proprietate adaugă puncte față de a locui cu chirie. Dacă te gândești să cumperi, ține cont că acest factor joacă în favoarea ta.",
    effort: "tiempo",
  },
  edad: {
    title: "Vârstă",
    tip: "Acest factor evoluează automat și nu depinde de nicio acțiune imediată.",
    effort: "automatico",
  },
  dependientes: {
    title: "Persoane în întreținerea ta",
    tip: "Cu cât mai multe persoane depind financiar de tine, cu atât mai mică se presupune marja din venitul tău. Nu este ceva ce \"trebuie\" să schimbi, dar dacă numărul persoanelor în întreținere scade (de exemplu, devin independente), punctajul tău o va reflecta.",
    effort: "automatico",
  },
};

export const GENERIC_BUILDER_TIP_RO: BuilderTip = {
  title: "Continuă să lucrezi la acest factor",
  tip: "Acest factor scade puncte din rezultatul tău.",
  effort: "manos",
};
