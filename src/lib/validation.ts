export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Quita un +34/0034/34 inicial si el usuario lo escribe: no tiene sentido
// pedirle el prefijo de país a un usuario español, así que lo aceptamos y lo
// descartamos en vez de rechazarlo.
export function normalizeSpanishPhone(phone: string): string {
  return phone.replace(/[\s-]/g, "").replace(/^(\+34|0034|34)/, "");
}

// Teléfono español: 9 dígitos, empieza por 6/7 (móvil) o 8/9 (fijo).
export function isValidSpanishPhone(phone: string): boolean {
  return /^[6789]\d{8}$/.test(normalizeSpanishPhone(phone));
}

// IBAN español: ES + 2 dígitos de control + 20 dígitos (24 caracteres),
// validado con el checksum mod-97 estándar de IBAN (ISO 7064).
export function isValidSpanishIban(iban: string): boolean {
  const clean = iban.replace(/\s/g, "").toUpperCase();
  if (!/^ES\d{22}$/.test(clean)) return false;

  const rearranged = clean.slice(4) + clean.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (ch) => String(ch.charCodeAt(0) - 55));

  let remainder = 0;
  for (let i = 0; i < numeric.length; i += 7) {
    remainder = Number(String(remainder) + numeric.slice(i, i + 7)) % 97;
  }
  return remainder === 1;
}
