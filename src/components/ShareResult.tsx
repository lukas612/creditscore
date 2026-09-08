import { useState } from "react";
import { IconLink, IconShare } from "./Icons";

interface Props {
  score: number;
  scoreBand: string;
}

const BAND_LABEL: Record<string, string> = {
  excelente: "Excelente",
  bueno: "Bueno",
  regular: "Regular",
  bajo: "Bajo",
};

const SITE_URL = "https://lukas612.github.io/creditscore/";

export function ShareResult({ score, scoreBand }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${SITE_URL}?utm_source=share&utm_campaign=resultado`;
  const shareText = `Mi puntuación en Creditio Credit Score es ${score}/850 (${
    BAND_LABEL[scoreBand] ?? scoreBand
  }). Descubre la tuya gratis en 2 minutos:`;

  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: "Mi Creditio Credit Score",
        text: shareText,
        url: shareUrl,
      });
    } catch {
      // el usuario cerró el selector de compartir, no hacemos nada
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // portapapeles bloqueado por el navegador, no hacemos nada
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText,
  )}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="share-section">
      <p className="breakdown-title">Comparte tu resultado</p>
      <div className="share-buttons">
        {canNativeShare && (
          <button className="share-btn share-btn-primary" onClick={handleNativeShare}>
            <IconShare className="share-icon" /> Compartir
          </button>
        )}
        <a className="share-btn" href={whatsappHref} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a className="share-btn" href={twitterHref} target="_blank" rel="noreferrer">
          X / Twitter
        </a>
        <button className="share-btn" onClick={handleCopy}>
          <IconLink className="share-icon" /> {copied ? "¡Copiado!" : "Copiar enlace"}
        </button>
      </div>
    </div>
  );
}
