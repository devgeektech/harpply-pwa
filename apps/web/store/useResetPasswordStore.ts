import { create } from "zustand";

type ResetPasswordState = {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;

  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  togglePassword: () => void;
  toggleConfirmPassword: () => void;

  updatePassword: () => void;
};

export const useResetPasswordStore = create<ResetPasswordState>((set, get) => ({
  password: "",
  confirmPassword: "",
  showPassword: false,
  showConfirmPassword: false,

  setPassword: (value) => set({ password: value }),
  setConfirmPassword: (value) => set({ confirmPassword: value }),

  togglePassword: () => set((state) => ({ showPassword: !state.showPassword })),

  toggleConfirmPassword: () =>
    set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),

  updatePassword: () => {
    const { password, confirmPassword } = get();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Password Updated:", password);
  },
}));
