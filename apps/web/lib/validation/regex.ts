import { MIN_PASSWORD_LENGTH } from "@/lib/constants";

// export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const EMAIL_REGEX = /^(?!\.)(?!.*\.\.)([A-Za-z0-9._%+-]+)@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const PASSWORD_RULE_MESSAGE =
  `Password must be at least ${MIN_PASSWORD_LENGTH} characters and include uppercase, lowercase, special character and a number.`;

export function isStrongPassword(password: string): boolean {
  return PASSWORD_REGEX.test(password);
}

// export function isValidEmail(email: string): boolean {
//   return EMAIL_REGEX.test(email);
// }

export const isValidEmail = (email: string): boolean => {
  if (!EMAIL_REGEX.test(email)) return false;

  // Extra safety checks
  const [localPart] = email.split("@");

  // Should not end with dot
  if (localPart.endsWith(".")) return false;

  return true;
};
