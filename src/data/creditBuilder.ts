export type BuilderEffort = "rapido" | "manos" | "tiempo" | "automatico";

export interface BuilderTip {
  title: string;
  tip: string;
  effort: BuilderEffort;
}

export const EFFORT_LABEL: Record<BuilderEffort, string> = {
  rapido: "Rápido",
  manos: "En tus manos",
  tiempo: "Requiere tiempo",
  automatico: "Automático",
};

// Contenido alineado con lo que calculate_score realmente pondera (ver
// migraciones de Supabase), para no prometer mejoras que el modelo no
// contempla. Solo se muestran los factores con puntos negativos del usuario.
export const CREDIT_BUILDER_TIPS: Record<string, BuilderTip> = {
  asnef: {
    title: "Sal de Asnef",
    tip: "Contacta con la entidad que te incluyó y pide el certificado de pago o la carta de baja en cuanto liquides la deuda: están obligadas a notificar tu baja en un plazo máximo de 30 días. Es, con diferencia, el factor que más resta.",
    effort: "tiempo",
  },
  deudas: {
    title: "Reduce tu deuda respecto a tus ingresos",
    tip: "Prioriza primero las deudas con el interés más alto (tarjetas revolving, créditos rápidos). Mantener tu deuda total por debajo de un tercio de tus ingresos anuales es la referencia que más mejora este factor.",
    effort: "manos",
  },
  ingresos: {
    title: "Declara todos tus ingresos",
    tip: "Pagas extra, un alquiler que cobres, una segunda nómina o ingresos como autónomo también cuentan. Vuelve a hacer el test incluyendo cualquier ingreso que no declarases la primera vez.",
    effort: "rapido",
  },
  empleo: {
    title: "Busca estabilidad laboral",
    tip: "Un contrato indefinido o una plaza de funcionario pesan mucho más que ser autónomo con ingresos irregulares o estar desempleado. Si estás cerca de conseguir un contrato más estable, tu puntuación subirá en cuanto se confirme.",
    effort: "tiempo",
  },
  antiguedad: {
    title: "Antigüedad en tu empleo",
    tip: "Este factor mejora solo con el tiempo: cuanto más lleves en tu puesto o actividad actual, mejor. No depende de ninguna acción por tu parte.",
    effort: "automatico",
  },
  vivienda: {
    title: "Vivienda en propiedad",
    tip: "Tener una vivienda en propiedad suma puntos frente a vivir de alquiler. Si te estás planteando comprar, ten en cuenta que este factor juega a tu favor.",
    effort: "tiempo",
  },
  edad: {
    title: "Edad",
    tip: "Este factor evoluciona de forma automática y no depende de ninguna acción inmediata.",
    effort: "automatico",
  },
  dependientes: {
    title: "Personas a tu cargo",
    tip: "Cuantas más personas dependen económicamente de ti, menos margen se asume en tus ingresos. No es algo que "
      + "\"debas\" cambiar, pero si tu número de dependientes se reduce (p. ej. se independizan), tu puntuación lo reflejará.",
    effort: "automatico",
  },
};

export const GENERIC_BUILDER_TIP: BuilderTip = {
  title: "Sigue trabajando este factor",
  tip: "Este factor está restando puntos a tu resultado.",
  effort: "manos",
};
