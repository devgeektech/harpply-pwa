import { AUTH_STORAGE_KEYS } from "@/lib/constants";

const getBaseUrl = () =>
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
    : process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

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

