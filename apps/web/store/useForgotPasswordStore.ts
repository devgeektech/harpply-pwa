import { create } from "zustand";

interface ForgotPasswordState {
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
  sendResetLink: () => Promise<void>;
}

export const useForgotPasswordStore = create<ForgotPasswordState>(
  (set, get) => ({
    email: "",
    loading: false,

    setEmail: (email) => set({ email }),

    sendResetLink: async () => {
      const { email } = get();

      if (!email) return;

      set({ loading: true });

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        alert("Reset link sent to email");
      } catch (error) {
        console.error(error);
      }

      set({ loading: false });
    },
  })
);
