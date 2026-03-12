import { create } from "zustand";

interface AttributeState {
  selected: string[];
  toggle: (value: string) => void;
}

export const useAttributesStore = create<AttributeState>((set, get) => ({
  selected: [],

  toggle: (value) => {
    const selected = get().selected;

    if (selected.includes(value)) {
      set({ selected: selected.filter((v) => v !== value) });
      return;
    }

    if (selected.length >= 3) return;

    set({ selected: [...selected, value] });
  },
}));
