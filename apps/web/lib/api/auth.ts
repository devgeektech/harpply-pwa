import { getApiBaseUrl } from "./base-url";
import { redirectIfUnauthorizedForAuthApi } from "./session-expired";

/** Auth API base URL: live URL on production, localhost on local. */
const getAuthBaseUrl = () => getApiBaseUrl();

/** URL to start server-side Google OAuth; avoids Firebase handler. */
export function getGoogleLoginRedirectUrl(): string {
  if (typeof window === "undefined") return "";
  const apiBase = getApiBaseUrl();
  const returnTo = `${window.location.origin}/auth/google/done`;
  return `${apiBase}/auth/google/redirect?returnTo=${encodeURIComponent(returnTo)}`;
}

/** One-time exchange after Google redirect (token is not in URL fragment). */
export async function exchangeGoogleSessionCode(exchange: string): Promise<{
  accessToken: string;
  onboardingCompleted: boolean;
}> {
  const res = await fetch(
    `${getApiBaseUrl()}/auth/google/session?exchange=${encodeURIComponent(exchange)}`,
    { method: "GET", credentials: "include" }
  );
  redirectIfUnauthorizedForAuthApi(res);
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Google sign-in session expired.");
    throw new Error(msg);
  }
  const json = (await res.json()) as {
    data?: { accessToken?: string; onboardingCompleted?: boolean };
  };
  const accessToken = json?.data?.accessToken;
  if (!accessToken) throw new Error("Invalid response from server.");
  return {
    accessToken,
    onboardingCompleted: Boolean(json?.data?.onboardingCompleted),
  };
}

const authFetchOptions: RequestInit = { credentials: "include" };

export interface RegisterEmailResponse {
  message: string;
  data: { email: string; requiresPassword?: boolean };
  statusCode?: number;
}

/** Onboarding screen values returned by API (for pre-fill and review). */
export interface OnboardingData {
  fullName?: string | null;
  age?: number | null;
  gender?: string | null;
  profilePhotos?: string[] | null;
  latitude?: number | null;
  longitude?: number | null;
  location?: string | null;
  locationEnabled?: boolean | null;
  bio?: string | null;
  churchInvolvement?: string | null;
  yearsInFaith?: number | null;
  churchAttendance?: string | null;
  myFaithValues?: string[] | null;
  partnerValues?: string[] | null;
  smokingPreference?: string | null;
  alcoholPreference?: string | null;
  dietaryPreference?: string | null;

  relationshipHistory?: string[] | null;
  haveChildren?: string[] | null;
  wantChildren?: string[] | null;
  openToPartnerWithChildren?: string[] | null;
  freeTime?: string[] | null;
  musicTaste?: string[] | null;
  sportsPlayOrFollow?: string[] | null;
  fitnessLifestyle?: string[] | null;
  recharge?: string[] | null;
  communicationStyle?: string[] | null;
  favoriteFood?: string[] | null;
  travelerType?: string[] | null;
  travelStyle?: string[] | null;
  perfectNightIn?: string[] | null;
  showsOrMovies?: string[] | null;
  dayToDay?: string[] | null;
}

export interface SetPasswordResponse {
  message: string;
  data: {
    accessToken: string;
    user: { id: string; email: string; createdAt: string; onboardingCompleted: boolean };
    onboarding?: OnboardingData;
  };
  statusCode?: number;
}

export interface SignInResponse {
  message: string;
  data: {
    accessToken: string;
    user: { id: string; email: string; createdAt: string; onboardingCompleted: boolean };
    onboarding?: OnboardingData;
  };
  statusCode?: number;
}

export { AUTH_STORAGE_KEYS } from "@/lib/constants";

/** Parse error message from API error response (JSON or text). Never returns undefined. */
async function getErrorMessage(
  res: Response,
  fallback: string
): Promise<string> {
  const safeFallback = fallback || "Request failed.";
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const data = await res.json().catch(() => ({}));
    if (data && typeof data === "object") {
      const msg = data.message;
      if (Array.isArray(msg)) return msg.join(", ");
      if (typeof msg === "string" && msg.trim()) return msg;
      if (typeof data.error === "string" && data.error.trim()) return data.error;
    }
  }
  const text = await res.text().catch(() => "");
  if (text.trim()) return text.slice(0, 200);
  return res.statusText || safeFallback;
}

/** Verify email with token from the link; updates DB and returns success + email for create-password. */
export async function verifyEmailByToken(
  token: string
): Promise<{ message: string; data?: { email: string } }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/verify-email/${encodeURIComponent(token)}`, {
    method: "GET",
    ...authFetchOptions,
  });
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Verification failed.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as { message: string; data?: { email: string } };
}

/** Request password reset; sends verification email with link (same process as signup). */
export async function forgotPassword(email: string): Promise<{ message: string; data?: { email: string } }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    ...authFetchOptions,
  });
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to send reset link.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as { message: string; data?: { email: string } };
}

/** Validate reset token from email link; returns email for pre-fill. */
export async function validateResetToken(
  token: string
): Promise<{ message: string; data?: { email: string } }> {
  const res = await fetch(
    `${getAuthBaseUrl()}/auth/validate-reset-token/${encodeURIComponent(token)}`,
    { method: "GET", ...authFetchOptions }
  );
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Invalid or expired link.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as { message: string; data?: { email: string } };
}

/** Reset password using token from email link. */
export async function resetPasswordByToken(
  token: string,
  password: string,
  confirmPassword: string
): Promise<{ message: string }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password, confirmPassword }),
    ...authFetchOptions,
  });
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to reset password.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as { message: string };
}

export async function resendVerificationEmail(email: string): Promise<{ message: string; data?: { email: string; requiresPassword?: boolean } }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/resend-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    ...authFetchOptions,
  });
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to resend verification email.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data;
}

export async function registerEmail(email: string): Promise<RegisterEmailResponse> {
  let res: Response;
  try {
    res = await fetch(`${getAuthBaseUrl()}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      ...authFetchOptions,
    });
  } catch (err) {
    const msg =
      err instanceof Error && err.message === "Failed to fetch"
        ? "Network error. Check your connection and that the API is running."
        : err instanceof Error
          ? err.message
          : "Registration failed.";
    throw new Error(msg);
  }
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Registration failed.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as RegisterEmailResponse;
}

export async function setPassword(
  email: string,
  password: string,
  confirmPassword: string
): Promise<SetPasswordResponse> {
  let res: Response;
  try {
    res = await fetch(`${getAuthBaseUrl()}/auth/set-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirmPassword }),
      ...authFetchOptions,
    });
  } catch (err) {
    const msg =
      err instanceof Error && err.message === "Failed to fetch"
        ? "Network error. Check your connection and that the API is running."
        : err instanceof Error
          ? err.message
          : "Set password failed.";
    throw new Error(msg);
  }
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Set password failed.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as SetPasswordResponse;
}

/** Error with optional code from API (e.g. COMPLETE_SIGNUP when user must set password first). */
export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export async function signIn(email: string, password: string): Promise<SignInResponse> {
  let res: Response;
  try {
    res = await fetch(`${getAuthBaseUrl()}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      ...authFetchOptions,
    });
  } catch (err) {
    const msg =
      err instanceof Error && err.message === "Failed to fetch"
        ? "Network error. Check your connection and that the API is running."
        : err instanceof Error
          ? err.message
          : "Sign in failed.";
    throw new Error(msg);
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const msg =
      data && typeof data === "object" && typeof data.message === "string"
        ? data.message
        : await getErrorMessage(res, "Sign in failed.");
    const code = data && typeof data === "object" && typeof data.code === "string" ? data.code : undefined;
    throw new AuthError(msg, code);
  }
  const data = await res.json().catch(() => ({}));
  return data as SignInResponse;
}

/** Payload for POST /auth/onboarding/faith-lifestyle (matches API FaithLifestyleDto). */
export interface FaithLifestylePayload {
  churchInvolvement: string;
  yearsInFaith: number;
  churchAttendance: string;
  smokingPreference: string; // "Never" | "Socially" | "Regularly"
  alcoholPreference: string;  // "Never" | "Socially" | "Regularly"
  dietaryPreference: string;
}

export async function saveFaithLifestyle(
  payload: FaithLifestylePayload,
  accessToken: string
): Promise<{ message: string }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/onboarding/faith-lifestyle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });
  redirectIfUnauthorizedForAuthApi(res);
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to save faith & lifestyle.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as { message: string };
}

/** Payload for POST /auth/onboarding/location (matches LocationDto). */
export interface LocationPayload {
  latitude: number;
  longitude: number;
  locationEnabled: boolean;
  location?: string;
}

export async function saveLocation(
  payload: LocationPayload,
  accessToken: string
): Promise<{ message: string }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/onboarding/location`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });
  redirectIfUnauthorizedForAuthApi(res);
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to save location.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as { message: string };
}

/** Save onboarding user-attributes for the current user. */
export async function saveMyFaithValues(
  myFaithValues: string[],
  accessToken: string
): Promise<{ message: string }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/onboarding/my-attributes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ attribute: myFaithValues }),
  });
  redirectIfUnauthorizedForAuthApi(res);
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to save attributes.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as { message: string };
}

/** Save onboarding user-attributes for the current user. */
export async function savePartnerValues(
  partnerValues: string[],
  accessToken: string
): Promise<{ message: string }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/onboarding/partner-attributes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ attribute: partnerValues }),
  });
  redirectIfUnauthorizedForAuthApi(res);
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to save partner-attributes.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as { message: string };
}

/** Save or update everyday life profile (question id -> selected option values). */
export async function saveEverydayLife(
  answers: Record<string, string[]>,
  accessToken: string
): Promise<{ message: string }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/onboarding/everyday-life`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(answers),
  });
  redirectIfUnauthorizedForAuthApi(res);
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to save everyday life profile.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as { message: string };
}

/** Mark onboarding complete for the current user. */
export async function completeOnboarding(accessToken: string): Promise<{ message: string }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/onboarding/complete`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    ...authFetchOptions,
  });
  redirectIfUnauthorizedForAuthApi(res);
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to complete onboarding.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as { message: string };
}

/**
 * Get all onboarding screen values (for pre-fill when already authenticated).
 * Use when user has a token but needs to load or reload onboarding data
 * (e.g. re-entering onboarding, editing profile). After login/setPassword
 * use response.data.onboarding instead to avoid an extra request.
 */
export async function getOnboardingData(
  accessToken: string
): Promise<{ message: string; data: OnboardingData }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/onboarding/review`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
    ...authFetchOptions,
  });
  redirectIfUnauthorizedForAuthApi(res);
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to load onboarding data.");
    throw new Error(msg);
  }
  const json = await res.json().catch(() => ({}));
  return json as { message: string; data: OnboardingData };
}

/** Logout current session (clears server-side token + HttpOnly cookie). */
export async function logout(accessToken: string): Promise<{ message: string }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    ...authFetchOptions,
  });
  // If we got a 401, the session is already gone; treat as logged out.
  if (res.status === 401) {
    return { message: "Logged out." };
  }
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Logout failed.");
    throw new Error(msg);
  }
  const json = await res.json().catch(() => ({}));
  return json as { message: string };
}
