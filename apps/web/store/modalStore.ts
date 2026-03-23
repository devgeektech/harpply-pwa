import { create } from "zustand";

type ModalType = "deleteAccount" | null;

interface ModalState {
  modal: ModalType;
  open: boolean;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modal: null,
  open: false,
  openModal: (modal) => set({ modal, open: true }),
  closeModal: () => set({ modal: null, open: false }),
}));