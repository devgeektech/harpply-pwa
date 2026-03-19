import { create } from "zustand";

interface FaithState {
  myValues: string[];
  partnerValues: string[];
  setMyValues: (values: string[]) => void;
  setPartnerValues: (values: string[]) => void;
  toggleMyValue: (value: string) => void;
  togglePartnerValue: (value: string) => void;
}

export const useFaithStore = create<FaithState>((set) => ({
  myValues: [],
  partnerValues: [],

  setMyValues: (values) => set({ myValues: values }),
  setPartnerValues: (values) => set({ partnerValues: values }),

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