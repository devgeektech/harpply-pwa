import { create } from "zustand";

export type Gender = "Male" | "Female" | "Other";

interface ProfileState {
  name: string;
  age: number;
  location: string;
  church: string;
  bio: string;
  gender: Gender;

  setBio: (bio: string) => void;
  setName: (name: string) => void;
  setAge: (age: number) => void;
  setLocation: (location: string) => void;
  setGender: (gender: Gender) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: "Sarah Jensen",
  age: 28,
  location: "Los Angeles, CA",
  church: "Grace Community Church",
  gender: "Male",
  bio: `Seeking a partner who shares a deep love for scripture and community service. I find peace in morning devotionals and weekend hiking.`,

  setBio: (bio) => set({ bio }),
  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
  setLocation: (location) => set({ location }),
  setGender: (gender) => set({ gender }),
}));
