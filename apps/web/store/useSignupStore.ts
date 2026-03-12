import { create } from "zustand";

interface SignupState {
  /** Email registered in step 1; used by verify and create-password. */
  email: string;
  loading: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  setLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
  /** Clear email, error (e.g. when leaving flow or after success). */
  reset: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  email: "",
  loading: false,
  error: null,
  setEmail: (email) => set({ email, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ email: "", error: null }),
}));
