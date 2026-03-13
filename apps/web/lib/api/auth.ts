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

export interface SetPasswordResponse {
  message: string;
  data: {
    accessToken: string;
    user: { id: string; email: string; createdAt: string; onboardingCompleted: boolean };
  };
  statusCode?: number;
}

export interface SignInResponse {
  message: string;
  data: {
    accessToken: string;
    user: { id: string; email: string; createdAt: string; onboardingCompleted: boolean };
  };
  statusCode?: number;
}

/** localStorage keys for registration/onboarding status (used for post-login and post-registration redirects). */
export const AUTH_STORAGE_KEYS = {
  ONBOARDING_COMPLETED: "harpply_onboarding_completed",
} as const;

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
