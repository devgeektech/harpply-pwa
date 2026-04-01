export const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)([A-Za-z0-9._%+-]+)@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;

export function isValidEmail(email: string): boolean {
  if (!EMAIL_REGEX.test(email)) return false;
  const [localPart] = email.split('@');
  if (localPart.endsWith('.')) return false;
  return true;
}
