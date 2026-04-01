import { create } from "zustand";

export const MAX_ONBOARDING_ATTRIBUTES = 3;

function toggleWithCap(list: string[], value: string, max: number): string[] {
  if (list.includes(value)) {
    return list.filter((v) => v !== value);
  }
  if (list.length >= max) {
    return list;
  }
  return [...list, value];
}

interface FaithAttributesState {
  myFaithValues: string[];
  partnerValues: string[];
  setMyFaithValues: (values: string[]) => void;
  setPartnerValues: (values: string[]) => void;
  toggleMyFaithValue: (value: string) => void;
  togglePartnerValue: (value: string) => void;
}

export const useFaithAttributesStore = create<FaithAttributesState>((set, get) => ({
  myFaithValues: [],
  partnerValues: [],

  setMyFaithValues: (values) => set({ myFaithValues: values }),
  setPartnerValues: (values) => set({ partnerValues: values }),

  toggleMyFaithValue: (value) =>
    set({
      myFaithValues: toggleWithCap(get().myFaithValues, value, MAX_ONBOARDING_ATTRIBUTES),
    }),

  togglePartnerValue: (value) =>
    set({
      partnerValues: toggleWithCap(get().partnerValues, value, MAX_ONBOARDING_ATTRIBUTES),
    }),
}));
