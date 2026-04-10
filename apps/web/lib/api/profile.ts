import { AUTH_STORAGE_KEYS } from "@/lib/constants";
import { getApiBaseUrl } from "./base-url";
import { redirectIfUnauthorizedForAuthApi } from "./session-expired";

const getBaseUrl = () => getApiBaseUrl();

const fetchOptions: RequestInit = { credentials: "include" };

export interface ProfileData {
  id: string;
  email: string;
  googleId: string | null;
  fullName: string | null;
  age: number | null;
  gender: string | null;
  location: string | null;
  bio: string | null;
  denomination: string | null;
  churchInvolvement: string | null;
  yearsInFaith: number | null;
  churchAttendance: string | null;
  /** JSON array of value slugs (or legacy display titles) from API. */
  myFaithValues:  string[] | null;
  partnerValues: string[] | null;
  smokingPreference: string | null;
  alcoholPreference: string | null;
  dietaryPreference: string | null;
  relationshipHistory: string[] | null;
  haveChildren: string[] | null;
  wantChildren: string[] | null;
  openToPartnerWithChildren: string[] | null;
  freeTime: string[] | null;
  musicTaste: string[] | null;
  sportsPlayOrFollow: string[] | null;
  fitnessLifestyle: string[] | null;
  recharge: string[] | null;
  communicationStyle: string[] | null;
  favoriteFood: string[] | null;
  travelerType: string[] | null;
  travelStyle: string[] | null;
  perfectNightIn: string[] | null;
  showsOrMovies: string[] | null;
  dayToDay: string[] | null;
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
  redirectIfUnauthorizedForAuthApi(res);
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

export async function deleteMyAccount(): Promise<{ message: string }> {
  const token = await getAuthToken();
  const res = await fetch(`${getBaseUrl()}/profile/account`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    ...fetchOptions,
  });
  return handleJson<{ message: string }>(res, "Failed to delete account.");
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

export interface ProfilePhotosData {
  photos: string[];
  meetsMinimum: boolean;
  minPhotosRequired: number;
}

async function getErrorMessageFromResponse(
  res: Response,
  fallback: string,
): Promise<string> {
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const data = await res.json().catch(() => null);
    if (data && typeof data === "object") {
      const msg = (data as any).message;
      if (typeof msg === "string" && msg.trim()) return msg;
      if (Array.isArray(msg)) return msg.join(", ");
      const err = (data as any).error;
      if (typeof err === "string" && err.trim()) return err;
    }
  }

  const text = await res.text().catch(() => "");
  if (text.trim()) {
    try {
      const parsed = JSON.parse(text);
      const msg = parsed?.message;
      if (typeof msg === "string" && msg.trim()) return msg;
    } catch {
      // ignore non-json error bodies
    }
    return text.slice(0, 200);
  }

  return res.statusText || fallback;
}

export async function fetchProfilePhotos(): Promise<ProfilePhotosData> {
  const token = await getAuthToken();
  const res = await fetch(`${getBaseUrl()}/profile/photos`, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    ...fetchOptions,
  });

  redirectIfUnauthorizedForAuthApi(res);

  if (!res.ok) {
    const msg = await getErrorMessageFromResponse(res, "Failed to load profile photos.");
    throw new Error(msg);
  }

  const json = (await res.json().catch(() => ({}))) as any;
  return json.data as ProfilePhotosData;
}

export async function addProfilePhoto(
  file: File,
): Promise<{ photos: string[] }> {
  const token = await getAuthToken();
  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch(`${getBaseUrl()}/profile/photos`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
    ...fetchOptions,
  });

  redirectIfUnauthorizedForAuthApi(res);

  if (!res.ok) {
    const msg = await getErrorMessageFromResponse(res, "Upload failed. Please try again.");
    throw new Error(msg);
  }

  const json = (await res.json().catch(() => ({}))) as any;
  return json.data as { photos: string[] };
}

export async function deleteProfilePhoto(
  index: number,
): Promise<{ photos: string[]; meetsMinimum: boolean }> {
  const token = await getAuthToken();
  const res = await fetch(`${getBaseUrl()}/profile/photos/${index}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    ...fetchOptions,
  });

  redirectIfUnauthorizedForAuthApi(res);

  if (!res.ok) {
    const msg = await getErrorMessageFromResponse(res, "Failed to delete photo.");
    throw new Error(msg);
  }

  const json = (await res.json().catch(() => ({}))) as any;
  return json.data as { photos: string[]; meetsMinimum: boolean };
}

