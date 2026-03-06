import { create } from "zustand";

interface OtpState {
  otp: string[];
  setOtpDigit: (index: number, value: string) => void;
  clearOtp: () => void;
}

export const useOtpStore = create<OtpState>((set) => ({
  otp: ["", "", "", "", "", ""],

  setOtpDigit: (index, value) =>
    set((state) => {
      const newOtp = [...state.otp];
      newOtp[index] = value;
      return { otp: newOtp };
    }),

  clearOtp: () => set({ otp: ["", "", "", "", "", ""] }),
}));
