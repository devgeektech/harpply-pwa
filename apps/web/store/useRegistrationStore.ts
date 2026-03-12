import { create } from "zustand";

interface RegistrationState {
  isRegistered: boolean;
  setRegistered: (value: boolean) => void;
}

export const useRegistrationStore = create<RegistrationState>((set) => ({
  isRegistered: true,
  setRegistered: (value) => set({ isRegistered: value }),
}));
