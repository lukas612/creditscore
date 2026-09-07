import { IconDocCheck, IconHeadset, IconLock, IconUsers } from "./Icons";

const ITEMS = [
  {
    icon: IconLock,
    title: "Conexión cifrada",
    desc: "Tus respuestas viajan siempre por una conexión segura (HTTPS).",
  },
  {
    icon: IconDocCheck,
    title: "Datos tratados conforme al RGPD",
    desc: "Solo se usan para tu resultado y para contactarte con opciones de financiación.",
  },
  {
    icon: IconUsers,
    title: "Equipo humano detrás",
    desc: "Un asesor real revisa tu perfil, no una máquina que decide sola.",
  },
  {
    icon: IconHeadset,
    title: "Sin coste ni letra pequeña",
    desc: "El test es gratis y no te obliga a contratar nada.",
  },
];

export function TrustSection() {
  return (
    <section className="section trust-section">
      <p className="section-label">Confianza y seguridad</p>
      <div className="trust-grid">
        {ITEMS.map((item) => (
          <div className="trust-card" key={item.title}>
            <item.icon className="trust-card-icon" />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
