import { useState, type FormEvent } from "react";
import { fireServyPostback } from "../lib/postback";
import { supabase } from "../lib/supabase";
import { isValidEmail, isValidSpanishPhone, normalizeSpanishPhone } from "../lib/validation";

export interface GateContact {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface Props {
  quizSessionId: string;
  score: number;
  scoreBand: string;
  zipCode: string;
  approvalProbability: number | null;
  clickId: string | null;
  onUnlock: (contact: GateContact) => void;
}

export function WitmeGate({
  quizSessionId,
  score,
  scoreBand,
  zipCode,
  approvalProbability,
  clickId,
  onUnlock,
}: Props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Revisa el correo electrónico, no parece válido.");
      return;
    }
    if (!isValidSpanishPhone(phoneNumber)) {
      setError("Revisa el teléfono: debe ser un número español de 9 dígitos.");
      return;
    }
    if (!consent) {
      setError("Debes aceptar la política de privacidad para continuar.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const normalizedPhone = normalizeSpanishPhone(phoneNumber);

    const { error: insertError } = await supabase.from("leads").insert({
      quiz_session_id: quizSessionId,
      first_name: name,
      last_name: lastName,
      email,
      phone: normalizedPhone,
      zip_code: zipCode,
      consent_privacy: consent,
      score,
      score_band: scoreBand,
      approval_probability: approvalProbability,
      source: "solicitud",
    });

    setSubmitting(false);

    if (insertError) {
      setError("No hemos podido guardar tus datos. Inténtalo de nuevo.");
      return;
    }

    if (clickId) {
      fireServyPostback(clickId);
    }

    onUnlock({ name, lastName, email, phoneNumber: normalizedPhone });
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
            enterKeyHint="next"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellidos"
            autoComplete="family-name"
            enterKeyHint="next"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          type="email"
          placeholder="Correo electrónico"
          autoComplete="email"
          inputMode="email"
          enterKeyHint="next"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Teléfono (612 345 678)"
          autoComplete="tel-national"
          inputMode="tel"
          enterKeyHint="done"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
