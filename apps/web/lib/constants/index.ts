/**
 * Application constants: auth, onboarding (faith/lifestyle), and shared values.
 */

// --- Auth ---

/** localStorage keys for registration/onboarding status and auth token. */
export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: "harpply_access_token",
  ONBOARDING_COMPLETED: "harpply_onboarding_completed",
} as const;

/** Minimum length for user password. */
export const MIN_PASSWORD_LENGTH = 8;

// --- Onboarding: Faith & Lifestyle ---

/** Church Involvement select options (value = label). */
export const CHURCH_INVOLVEMENT_OPTIONS = [
  "Member",
  "Regular Attender",
  "Volunteer",
  "New to Church",
  "Exploring Faith",
] as const;

export type ChurchInvolvementOption = (typeof CHURCH_INVOLVEMENT_OPTIONS)[number];

/** Church attendance frequency (toggle options). */
export const CHURCH_ATTENDANCE_OPTIONS = [
  "Weekly",
  "Daily/Multiple",
  "Bi-Weekly",
  "Occasionally",
] as const;

export type ChurchAttendanceOption = (typeof CHURCH_ATTENDANCE_OPTIONS)[number];

/** Smoking preference (toggle options). */
export const SMOKING_OPTIONS = ["Never", "Socially", "Regularly"] as const;

export type SmokingOption = (typeof SMOKING_OPTIONS)[number];

/** Alcohol preference (toggle options). */
export const ALCOHOL_OPTIONS = ["Never", "Socially", "Regularly"] as const;

export type AlcoholOption = (typeof ALCOHOL_OPTIONS)[number];

/** Dietary preference select: value is API/storage value, label is display (when different). */
export const DIETARY_PREFERENCE_OPTIONS = [
  { value: "No Restrictions", label: "No specific diet" },
  { value: "Vegetarian", label: "Vegetarian" },
  { value: "Vegan", label: "Vegan" },
  { value: "Keto", label: "Keto" },
  { value: "Dairy-Free", label: "Dairy-Free" },
] as const;

export type DietaryPreferenceValue =
  (typeof DIETARY_PREFERENCE_OPTIONS)[number]["value"];

export const MAX_AGE = 100;
export const MIN_AGE = 18;

