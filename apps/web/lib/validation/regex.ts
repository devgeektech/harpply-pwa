import { MIN_PASSWORD_LENGTH } from "@/lib/constants";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const PASSWORD_RULE_MESSAGE =
  `Password must be at least ${MIN_PASSWORD_LENGTH} characters and include uppercase, lowercase, and a number.`;

export function isStrongPassword(password: string): boolean {
  return PASSWORD_REGEX.test(password);
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
