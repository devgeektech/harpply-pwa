import { create } from "zustand";

interface AuthState {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
}));
