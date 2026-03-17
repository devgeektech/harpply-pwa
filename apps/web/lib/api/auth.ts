/**
 * Auth API helpers. Uses NEXT_PUBLIC_API_URL on client for fetch.
 */
const getAuthBaseUrl = () =>
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
    : process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

    const authFetchOptions: RequestInit = { credentials: "include" };

export interface RegisterEmailResponse {
  message: string;
  data: { email: string };
  statusCode?: number;
}

/** Onboarding screen values returned by API (for pre-fill and review). */
export interface OnboardingData {
  fullName?: string | null;
  age?: number | null;
  gender?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  location?: string | null;
  locationEnabled?: boolean | null;
  profilePhoto?: string | null;
  bio?: string | null;
  churchInvolvement?: string | null;
  yearsInFaith?: number | null;
  churchAttendance?: string | null;
  myFaithValues?: unknown;
  partnerValues?: unknown;
  lifestyleSmoking?: boolean | null;
  lifestyleDrinking?: boolean | null;
  lifestylePartying?: boolean | null;
  smokingPreference?: string | null;
  alcoholPreference?: string | null;
  dietaryPreference?: string | null;
  interests?: unknown;
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

/** Parse error message from API error response (JSON or text). */
async function getErrorMessage(
  res: Response,
  fallback: string
): Promise<string> {
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
  return res.statusText || fallback;
}

/** Verify email with token from the link; updates DB and returns success. */
export async function verifyEmailByToken(token: string): Promise<{ message: string }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/verify-email/${encodeURIComponent(token)}`, {
    method: "GET",
    ...authFetchOptions,
  });
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Verification failed.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as { message: string };
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
    const msg = await getErrorMessage(res, "Sign in failed.");
    throw new Error(msg);
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
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to save location.");
    throw new Error(msg);
  }
  const data = await res.json().catch(() => ({}));
  return data as { message: string };
}

/** Save onboarding interests (attributes) for the current user. */
export async function saveInterests(
  interests: string[],
  accessToken: string
): Promise<{ message: string }> {
  const res = await fetch(`${getAuthBaseUrl()}/auth/onboarding/interests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ interests }),
  });
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to save interests.");
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
  if (!res.ok) {
    const msg = await getErrorMessage(res, "Failed to load onboarding data.");
    throw new Error(msg);
  }
  const json = await res.json().catch(() => ({}));
  return json as { message: string; data: OnboardingData };
}
