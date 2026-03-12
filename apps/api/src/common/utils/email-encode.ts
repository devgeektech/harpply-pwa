/**
 * Encode/decode email for storage in DB (base64).
 * Store encoded in DB; decode when returning to client.
 */

export function encodeEmail(email: string): string {
  return Buffer.from(email.trim().toLowerCase(), 'utf8').toString('base64');
}

export function decodeEmail(encoded: string): string {
  return Buffer.from(encoded, 'base64').toString('utf8');
}

/** Decode email for API responses; returns as-is if not valid base64 (e.g. legacy plain emails). */
export function decodeEmailSafe(encoded: string): string {
  try {
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    return decoded.includes('@') ? decoded : encoded;
  } catch {
    return encoded;
  }
}
