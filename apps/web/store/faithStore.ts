import { create } from "zustand";

interface FaithState {
  myValues: string[];
  partnerValues: string[];
  toggleMyValue: (value: string) => void;
  togglePartnerValue: (value: string) => void;
}

export const useFaithStore = create<FaithState>((set) => ({
  myValues: [],
  partnerValues: [],

  toggleMyValue: (value) =>
    set((state) => ({
      myValues: state.myValues.includes(value)
        ? state.myValues.filter((v) => v !== value)
        : [...state.myValues, value],
    })),

  togglePartnerValue: (value) =>
    set((state) => ({
      partnerValues: state.partnerValues.includes(value)
        ? state.partnerValues.filter((v) => v !== value)
        : [...state.partnerValues, value],
    })),
}));