import { create } from "zustand";

interface OnboardingState {
  churchRole: string;
  yearsInFaith: string;
  attendance: string;
  smoking: string;
  alcohol: string;
  diet: string;

  setField: (field: string, value: string) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  churchRole: "",
  yearsInFaith: "",
  attendance: "",
  smoking: "",
  alcohol: "",
  diet: "",

  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
}));
