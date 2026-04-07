/**
 * Remember which onboarding screen the user last visited (per account), so returning
 * after closing the app can resume there instead of always starting at identity.
 */

const STORAGE_PREFIX = "harpply_onboarding_resume:";

/** Allowed paths only — prevents open redirects if storage is tampered with. */
export const ONBOARDING_STEP_PATHS = [
  "/auth/onboarding/identity",
  "/auth/onboarding/location",
  "/auth/onboarding/bio",
  "/auth/onboarding/faith",
  "/auth/onboarding/attributes",
  "/auth/onboarding/partner-attributes",
  "/auth/onboarding/everyday-life",
  "/auth/onboarding/profile",
] as const;

export type OnboardingStepPath = (typeof ONBOARDING_STEP_PATHS)[number];

const ALLOWED = new Set<string>(ONBOARDING_STEP_PATHS);

const DEFAULT_ONBOARDING_PATH: OnboardingStepPath = "/auth/onboarding/identity";

function decodeJwtSub(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payloadPart = parts[1];
    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = JSON.parse(atob(padded)) as { sub?: unknown };
    return typeof json.sub === "string" && json.sub.length > 0 ? json.sub : null;
  } catch {
    return null;
  }
}

function storageKeyForToken(token: string): string | null {
  const sub = decodeJwtSub(token);
  if (!sub) return null;
  return `${STORAGE_PREFIX}${sub}`;
}

function normalizePath(pathname: string): string {
  const p = pathname.split("?")[0]?.split("#")[0] ?? "";
  if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
  return p;
}

/**
 * Persist the current onboarding URL for this access token's user.
 */
export function rememberOnboardingStep(accessToken: string, pathname: string): void {
  if (typeof window === "undefined") return;
  const key = storageKeyForToken(accessToken);
  if (!key) return;
  const path = normalizePath(pathname);
  if (!ALLOWED.has(path)) return;
  try {
    window.localStorage.setItem(key, path);
  } catch {
    // ignore quota / private mode
  }
}

/**
 * Path to send the user when (re)entering onboarding; falls back to identity.
 */
export function getResumeOnboardingPath(accessToken: string): OnboardingStepPath {
  if (typeof window === "undefined") return DEFAULT_ONBOARDING_PATH;
  const key = storageKeyForToken(accessToken);
  if (!key) return DEFAULT_ONBOARDING_PATH;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return DEFAULT_ONBOARDING_PATH;
    const path = normalizePath(raw);
    if (!ALLOWED.has(path)) return DEFAULT_ONBOARDING_PATH;
    return path as OnboardingStepPath;
  } catch {
    return DEFAULT_ONBOARDING_PATH;
  }
}

/** Call when onboarding completes or auth loses access to this token. */
export function clearOnboardingResume(accessToken: string | null | undefined): void {
  if (typeof window === "undefined") return;
  if (!accessToken) return;
  const key = storageKeyForToken(accessToken);
  if (!key) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
