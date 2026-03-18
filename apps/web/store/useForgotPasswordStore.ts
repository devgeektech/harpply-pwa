import { create } from "zustand";
import { forgotPassword } from "@/lib/api/auth";

interface ForgotPasswordState {
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  sendResetLink: () => Promise<boolean>;
  clearMessage: () => void;
}

export const useForgotPasswordStore = create<ForgotPasswordState>(
  (set, get) => ({
    email: "",
    loading: false,
    error: null,
    successMessage: null,

    setEmail: (email) => set({ email, error: null }),

    clearMessage: () => set({ error: null, successMessage: null }),

    sendResetLink: async () => {
      const { email } = get();
      if (!email?.trim()) return false;

      set({ loading: true, error: null, successMessage: null });

      try {
        const res = await forgotPassword(email.trim());
        set({
          successMessage: res?.message ?? "",
          loading: false,
        });
        return true;
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : "Something went wrong.",
          loading: false,
        });
        return false;
      }
    },
  })
);
