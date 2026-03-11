import { create } from "zustand";

interface AuthState {
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  password: "",
  confirmPassword: "",
  loading: false,
  error: null,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setLoading: (value) => set({ loading: value }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      email: "",
      password: "",
      confirmPassword: "",
      error: null,
    }),
}));
