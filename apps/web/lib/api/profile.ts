import { AUTH_STORAGE_KEYS } from "@/lib/constants";
import { getApiBaseUrl } from "./base-url";

const getBaseUrl = () => getApiBaseUrl();

const fetchOptions: RequestInit = { credentials: "include" };

export interface ProfileData {
  id: string;
  email: string;
  fullName: string | null;
  age: number | null;
  gender: string | null;
  profilePhoto: string | null;
  location: string | null;
  bio: string | null;
  denomination: string | null;
  churchInvolvement: string | null;
  yearsInFaith: number | null;
  churchAttendance: string | null;
  /** JSON array of value slugs (or legacy display titles) from API. */
  myFaithValues: unknown;
  partnerValues: unknown;
  interests: string[] | null;
  smokingPreference: string | null;
  alcoholPreference: string | null;
  dietaryPreference: string | null;
}

export interface ProfileResponse {
  message: string;
  data: ProfileData;
}

async function getAuthToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
}

async function handleJson<T>(res: Response, fallbackMsg: string): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const msg = text || fallbackMsg;
    throw new Error(msg);
  }
  return (await res.json().catch(() => ({}))) as T;
}

export async function fetchProfile(): Promise<ProfileResponse> {
  const token = await getAuthToken();
  const res = await fetch(`${getBaseUrl()}/profile`, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    ...fetchOptions,
  });
  return handleJson<ProfileResponse>(res, "Failed to load profile.");
}

export interface UpdateBasicPayload {
  fullName?: string;
  age?: number;
  location?: string;
  gender?: string;
  bio?: string | null;
}

export async function updateBasicProfile(payload: UpdateBasicPayload): Promise<{ message: string }> {
  const token = await getAuthToken();
  const res = await fetch(`${getBaseUrl()}/profile/basic`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
    ...fetchOptions,
  });
  return handleJson<{ message: string }>(res, "Failed to update profile.");
}

export interface UpdateFaithLifestylePayload {
  denomination?: string;
  yearsInFaith?: number;
  churchInvolvement?: string;
  churchAttendance?: string;
}

export async function updateFaithLifestyleProfile(
  payload: UpdateFaithLifestylePayload
): Promise<{ message: string }> {
  const token = await getAuthToken();
  const res = await fetch(`${getBaseUrl()}/profile/faith-lifestyle`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
    ...fetchOptions,
  });
  return handleJson<{ message: string }>(res, "Failed to update faith & lifestyle.");
}

export interface UpdateFaithValuesPayload {
  myFaithValues?: string[];
  partnerValues?: string[];
}

export async function updateFaithValuesProfile(
  payload: UpdateFaithValuesPayload
): Promise<{ message: string }> {
  const token = await getAuthToken();
  const res = await fetch(`${getBaseUrl()}/profile/faith-values`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
    ...fetchOptions,
  });
  return handleJson<{ message: string }>(res, "Failed to update faith values.");
}

export interface UpdateLifestylePayload {
  smokingPreference?: string;
  alcoholPreference?: string;
  dietaryPreference?: string;
}

export async function updateLifestyleProfile(
  payload: UpdateLifestylePayload
): Promise<{ message: string }> {
  const token = await getAuthToken();
  const res = await fetch(`${getBaseUrl()}/profile/lifestyle`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
    ...fetchOptions,
  });
  return handleJson<{ message: string }>(res, "Failed to update lifestyle.");
}

