import { useEffect, useState } from "react";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a href="#widget" className={`sticky-mobile-cta ${visible ? "visible" : ""}`}>
      Calcula tu puntuación gratis →
    </a>
  );
}
