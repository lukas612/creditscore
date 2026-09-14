import { useEffect, useState, type FormEvent } from "react";
import { trackFunnelEvent } from "../lib/funnel";
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
  source?: string;
  postbackParam1?: string;
  phoneValidator?: (phone: string) => boolean;
  phoneNormalizer?: (phone: string) => string;
  phoneErrorMessage?: string;
  phonePlaceholder?: string;
  title?: string;
  subText?: string;
  namePlaceholder?: string;
  lastNamePlaceholder?: string;
  emailPlaceholder?: string;
  emailErrorMessage?: string;
  consentText?: string;
  consentErrorMessage?: string;
  saveErrorMessage?: string;
  submitLabel?: string;
  submittingLabel?: string;
  reassuranceLine?: string;
  onUnlock: (contact: GateContact) => void;
}

export function WitmeGate({
  quizSessionId,
  score,
  scoreBand,
  zipCode,
  approvalProbability,
  clickId,
  source = "solicitud",
  postbackParam1 = "Creditio_score",
  phoneValidator = isValidSpanishPhone,
  phoneNormalizer = normalizeSpanishPhone,
  phoneErrorMessage = "Revisa el teléfono: debe ser un número español de 9 dígitos.",
  phonePlaceholder = "Teléfono (612 345 678)",
  title = "Tu puntuación ya está calculada",
  subText = "Déjanos tus datos para desbloquear tu informe completo y ver qué opciones de financiación encajan con tu perfil.",
  namePlaceholder = "Nombre",
  lastNamePlaceholder = "Apellidos",
  emailPlaceholder = "Correo electrónico",
  emailErrorMessage = "Revisa el correo electrónico, no parece válido.",
  consentText = "Acepto la política de privacidad y que me contacten con ofertas de financiación adaptadas a mi perfil.",
  consentErrorMessage = "Debes aceptar la política de privacidad para continuar.",
  saveErrorMessage = "No hemos podido guardar tus datos. Inténtalo de nuevo.",
  submitLabel = "Ver mi informe completo",
  submittingLabel = "Enviando…",
  reassuranceLine = "🔒 Conexión cifrada · Tus datos nunca se venden a terceros",
  onUnlock,
}: Props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackFunnelEvent("question_reached", "gate_contact", source);
  }, [source]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError(emailErrorMessage);
      return;
    }
    if (!phoneValidator(phoneNumber)) {
      setError(phoneErrorMessage);
      return;
    }
    if (!consent) {
      setError(consentErrorMessage);
      return;
    }
    setSubmitting(true);
    setError(null);

    const normalizedPhone = phoneNormalizer(phoneNumber);

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
      source,
    });

    setSubmitting(false);

    if (insertError) {
      setError(saveErrorMessage);
      return;
    }

    if (clickId) {
      fireServyPostback(clickId, postbackParam1);
    }

    onUnlock({ name, lastName, email, phoneNumber: normalizedPhone });
  };

  return (
    <div className="result-card">
      <div className="score-teaser">
        <span className="score-teaser-value">{score}</span>
        <span className="score-teaser-blur">/ 850</span>
      </div>
      <h2>{title}</h2>
      <p className="result-sub">{subText}</p>
      <form className="lead-form" onSubmit={handleSubmit}>
        <div className="lead-form-row">
          <input
            type="text"
            placeholder={namePlaceholder}
            autoComplete="given-name"
            enterKeyHint="next"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder={lastNamePlaceholder}
            autoComplete="family-name"
            enterKeyHint="next"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          type="email"
          placeholder={emailPlaceholder}
          autoComplete="email"
          inputMode="email"
          enterKeyHint="next"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder={phonePlaceholder}
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
          <span>{consentText}</span>
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="btn-primary btn-large" type="submit" disabled={submitting}>
          {submitting ? submittingLabel : submitLabel}
        </button>
        <p className="reassurance-line">{reassuranceLine}</p>
      </form>
    </div>
  );
}
