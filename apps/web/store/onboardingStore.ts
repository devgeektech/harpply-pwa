import { AUTH_STORAGE_KEYS } from "@/lib/api/auth";
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

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  name: "",
  age: "",
  gender: "",

  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
  setGender: (gender) => set({ gender }),

  submitIdentity: async () => {
    const { name, age, gender } = get();

    const baseUrl = typeof window !== "undefined" ? (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000") : "http://localhost:5000";

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