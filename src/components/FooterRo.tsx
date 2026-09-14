export function FooterRo() {
  return (
    <footer className="site-footer">
      <p>
        Creditio Credit Score oferă un test orientativ de scor de credit în scopuri
        informative și de comparare a opțiunilor de finanțare. Nu reprezintă o ofertă de
        credit și nici o decizie de acordare, și nu consultă niciun birou de credit real.
      </p>
      <p className="site-footer-links">
        <span>Politica de confidențialitate</span>
        <span aria-hidden="true">·</span>
        <span>Informații legale</span>
        <span aria-hidden="true">·</span>
        <span>© {new Date().getFullYear()} Creditio</span>
      </p>
    </footer>
  );
}
