import { AUTH_STORAGE_KEYS } from "@/lib/constants";
import { clearOnboardingResume } from "@/lib/onboarding-resume";
import { toast } from "sonner";

export const SESSION_EXPIRED_MESSAGE = "Session expired, login again";

/** Time to show the toast on the current page before full navigation to sign-in. */
const SESSION_EXPIRED_REDIRECT_MS = 1600;

export class SessionExpiredError extends Error {
  constructor() {
    super(SESSION_EXPIRED_MESSAGE);
    this.name = "SessionExpiredError";
  }
}

export function clearClientAuthSession(): void {
  if (typeof window === "undefined") return;
  try {
    const token = window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    clearOnboardingResume(token);
    window.localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    window.localStorage.removeItem(AUTH_STORAGE_KEYS.ONBOARDING_COMPLETED);
  } catch {
    // ignore
  }
}

let sessionExpiredFlowStarted = false;

/**
 * For protected API calls: if the server returns 401 Unauthorized, clears stored auth,
 * shows a toast on the current page, then redirects to sign-in (no query params).
 * No-op on the server. After scheduling redirect, throws so callers do not parse the error body.
 */
export function redirectIfUnauthorizedForAuthApi(res: Response): void {
  if (res.status !== 401) return;
  if (typeof window === "undefined") return;
  clearClientAuthSession();
  const pathname = window.location.pathname ?? "";
  const isAuthRoute = pathname.startsWith("/auth/");
  const redirectTo = isAuthRoute ? "/auth/signupemail" : "/auth/signin";
  if (!sessionExpiredFlowStarted) {
    sessionExpiredFlowStarted = true;
    toast.warning(SESSION_EXPIRED_MESSAGE);
    window.setTimeout(() => {
      sessionExpiredFlowStarted = false;
      window.location.replace(
        `${window.location.origin}${redirectTo}`,
      );
    }, SESSION_EXPIRED_REDIRECT_MS);
  }
  throw new SessionExpiredError();
}
