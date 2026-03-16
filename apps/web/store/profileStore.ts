import { create } from "zustand";
import type { ProfileData } from "@/lib/api/profile";

export type Gender = "Male" | "Female" | "Other";

interface ProfileState {
  name: string;
  age: number;
  location: string;
  church: string;
  bio: string;
  gender: Gender;
  loaded: boolean;

  setBio: (bio: string) => void;
  setName: (name: string) => void;
  setAge: (age: number) => void;
  setLocation: (location: string) => void;
  setGender: (gender: Gender) => void;
  hydrateFromApi: (data: ProfileData) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: "",
  age: 0,
  location: "",
  church: "",
  gender: "Male",
  bio: "",
  loaded: false,

  setBio: (bio) => set({ bio }),
  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
  setLocation: (location) => set({ location }),
  setGender: (gender) => set({ gender }),
  hydrateFromApi: (data) =>
    set({
      name: data.fullName ?? "",
      age: data.age ?? 0,
      location: data.location ?? "",
      church: data.churchInvolvement ?? "",
      bio: data.bio ?? "",
      gender:
        (data.gender &&
          (data.gender.charAt(0).toUpperCase() + data.gender.slice(1).toLowerCase())) as Gender,
      loaded: true,
    }),
}));
