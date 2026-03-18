import { AUTH_STORAGE_KEYS, saveFaithLifestyle, type OnboardingData } from "@/lib/api/auth";
import { create } from "zustand";

interface OnboardingState {
  name: string;
  age: string;
  gender: string;
  setName: (name: string) => void;
  setAge: (age: string) => void;
  setGender: (gender: string) => void;

  submitIdentity: () => Promise<any>;
}

interface BioState {
  bio: string;
  setBio: (bio: string) => void;
  
  submitBio: () => Promise<any>;
}

/** Faith & lifestyle fields for POST /auth/onboarding/faith-lifestyle. UI uses string toggles; submit converts to API booleans. */
interface FaithState {
  churchInvolvement: string;
  yearsInFaith: number;
  churchAttendance: string;
  smokingSelection: string; // "Never" | "Socially" | "Regularly"
  alcoholSelection: string; // "Never" | "Socially" | "Regularly"
  dietaryPreference: string;
  setChurchInvolvement: (v: string) => void;
  setYearsInFaith: (v: number) => void;
  setChurchAttendance: (v: string) => void;
  setSmokingSelection: (v: string) => void;
  setAlcoholSelection: (v: string) => void;
  setDietaryPreference: (v: string) => void;
  submitFaith: () => Promise<{ message: string }>;
} 

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  name: "",
  age: "",
  gender: "",

  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
  setGender: (gender) => set({ gender }),

  submitIdentity: async () => {
    const { name, age, gender } = get();

    const { getApiBaseUrl } = await import("@/lib/api/base-url");
    const baseUrl = getApiBaseUrl();

    const res = await fetch(
      `${baseUrl}/auth/onboarding/identity`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          age: Number(age),
          gender: gender.toLowerCase(),
        }),
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to submit identity");
    }

    return res.json();
  },
}));

export const useBioStore = create<BioState>((set, get) => ({
  bio: "",
  setBio: (bio) => set({ bio }),

  submitBio: async () => {
    const { bio } = get();

    const { getApiBaseUrl } = await import("@/lib/api/base-url");
    const baseUrl = getApiBaseUrl();

    const res = await fetch(
      `${baseUrl}/auth/onboarding/story`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bio: bio,
        }),
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to submit story");
    }

    return res.json();
  },
}));

export const useFaithStore = create<FaithState>((set, get) => ({
  churchInvolvement: "",
  churchAttendance: "",
  yearsInFaith: 0,
  smokingSelection: "",
  alcoholSelection: "",
  dietaryPreference: "",

  setChurchInvolvement: (v) => set({ churchInvolvement: v }),
  setYearsInFaith: (v) => set({ yearsInFaith: v }),
  setChurchAttendance: (v) => set({ churchAttendance: v }),
  setSmokingSelection: (v) => set({ smokingSelection: v }),
  setAlcoholSelection: (v) => set({ alcoholSelection: v }),
  setDietaryPreference: (v) => set({ dietaryPreference: v }),

  submitFaith: async () => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
        : null;
    if (!token) {
      throw new Error("Not authenticated. Please sign in again.");
    }
    const state = get();
    return saveFaithLifestyle(
      {
        churchInvolvement: state.churchInvolvement || "Member",
        yearsInFaith: state.yearsInFaith,
        churchAttendance: state.churchAttendance || "Weekly",
        smokingPreference: state.smokingSelection || "Never",
        alcoholPreference: state.alcoholSelection || "Never",
        dietaryPreference: state.dietaryPreference || "No Restrictions",
      },
      token
    );
  },
}));

/** Normalize API gender (e.g. "male") to UI label ("Male") so selection highlights. */
function normalizeGenderForUI(apiGender: string | null | undefined): string {
  if (!apiGender) return "";
  const lower = apiGender.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/**
 * Pre-fill all onboarding stores from API data (e.g. from login/setPassword response
 * or GET onboarding/review). Call after auth when entering onboarding flow.
 */
export function hydrateOnboardingStores(data: OnboardingData) {
  if (!data) return;
  useOnboardingStore.getState().setName(data.fullName ?? "");
  useOnboardingStore.getState().setAge(data.age != null ? String(data.age) : "");
  useOnboardingStore.getState().setGender(normalizeGenderForUI(data.gender));
  useBioStore.getState().setBio(data.bio ?? "");
  useFaithStore.getState().setChurchInvolvement(data.churchInvolvement ?? "");
  useFaithStore.getState().setYearsInFaith(data.yearsInFaith ?? 0);
  useFaithStore.getState().setChurchAttendance(data.churchAttendance ?? "");
  useFaithStore.getState().setSmokingSelection(data.smokingPreference ?? "");
  useFaithStore.getState().setAlcoholSelection(data.alcoholPreference ?? "");
  useFaithStore.getState().setDietaryPreference(data.dietaryPreference ?? "");
}
