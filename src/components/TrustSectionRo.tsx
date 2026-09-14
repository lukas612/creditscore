import { IconDocCheck, IconHeadset, IconLock, IconUsers } from "./Icons";

const ITEMS = [
  {
    icon: IconLock,
    title: "Conexiune criptată",
    desc: "Răspunsurile tale circulă mereu printr-o conexiune securizată (HTTPS).",
  },
  {
    icon: IconDocCheck,
    title: "Date prelucrate conform GDPR",
    desc: "Sunt folosite doar pentru rezultatul tău și pentru a te contacta cu opțiuni de finanțare.",
  },
  {
    icon: IconUsers,
    title: "Echipă umană în spate",
    desc: "Un consultant real îți revizuiește profilul, nu o mașină care decide singură.",
  },
  {
    icon: IconHeadset,
    title: "Fără costuri sau litere mici",
    desc: "Testul este gratuit și nu te obligă să contractezi nimic.",
  },
];

export function TrustSectionRo() {
  return (
    <section className="section trust-section">
      <p className="section-label">Încredere și siguranță</p>
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
