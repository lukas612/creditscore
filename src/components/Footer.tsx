export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        Creditio Credit Score ofrece un test orientativo de puntuación crediticia con
        fines informativos y de comparación de financiación. No constituye una oferta de
        crédito ni una decisión de concesión, y no consulta ningún buró de crédito real.
      </p>
      <p className="site-footer-links">
        <span>Política de privacidad</span>
        <span aria-hidden="true">·</span>
        <span>Aviso legal</span>
        <span aria-hidden="true">·</span>
        <span>© {new Date().getFullYear()} Creditio</span>
      </p>
    </footer>
  );
}
