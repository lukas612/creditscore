import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";

interface Props {
  quizSessionId: string;
  score: number;
  scoreBand: string;
  zipCode: string;
  onUnlock: () => void;
}

export function ResultGate({ quizSessionId, score, scoreBand, zipCode, onUnlock }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Debes aceptar la política de privacidad para continuar.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from("leads").insert({
      quiz_session_id: quizSessionId,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      zip_code: zipCode,
      consent_privacy: consent,
      score,
      score_band: scoreBand,
    });

    setSubmitting(false);

    if (insertError) {
      setError("No hemos podido guardar tus datos. Inténtalo de nuevo.");
      return;
    }

    onUnlock();
  };

  return (
    <div className="result-card">
      <div className="score-teaser">
        <span className="score-teaser-value">{score}</span>
        <span className="score-teaser-blur">/ 850</span>
      </div>
      <h2>Tu puntuación ya está calculada</h2>
      <p className="result-sub">
        Déjanos tus datos para desbloquear tu informe completo y ver qué opciones de
        financiación encajan con tu perfil.
      </p>
      <form className="lead-form" onSubmit={handleSubmit}>
        <div className="lead-form-row">
          <input
            type="text"
            placeholder="Nombre"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellidos"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          type="email"
          placeholder="Correo electrónico"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Teléfono"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label className="consent-row">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>
            Acepto la política de privacidad y que me contacten con ofertas de financiación
            adaptadas a mi perfil.
          </span>
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="btn-primary btn-large" type="submit" disabled={submitting}>
          {submitting ? "Enviando…" : "Ver mi informe completo"}
        </button>
        <p className="reassurance-line">
          🔒 Conexión cifrada · Tus datos nunca se venden a terceros
        </p>
      </form>
    </div>
  );
}
