import { create } from "zustand";

interface OnboardingState {
  name: string;
  age: string;
  gender: string;
  setName: (name: string) => void;
  setAge: (age: string) => void;
  setGender: (gender: string) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  name: "",
  age: "",
  gender: "Male",

  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
  setGender: (gender) => set({ gender }),
}));
