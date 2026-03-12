import { create } from "zustand";

interface ProfileState {
  name: string;
  age: number;
  location: string;
  church: string;
  bio: string;

  setBio: (bio: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: "Sarah Jensen",
  age: 28,
  location: "Los Angeles, CA",
  church: "Grace Community Church",

  bio: `Seeking a partner who shares a deep love for scripture and community service. I find peace in morning devotionals and weekend hiking.`,

  setBio: (bio) => set({ bio }),
}));
