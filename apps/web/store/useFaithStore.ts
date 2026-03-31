import { create } from "zustand"

interface FaithState {
  denomination: string
  yearsInFaith: string
  churchInvolvement: string
  attendance: string

  setDenomination: (value: string) => void
  setYearsInFaith: (value: string) => void
  setChurchInvolvement: (value: string) => void
  setAttendance: (value: string) => void
}

export const useFaithStore = create<FaithState>((set) => ({
  denomination: "",
  yearsInFaith: "",
  churchInvolvement: "",
  attendance: "",

  setDenomination: (value) => set({ denomination: value }),
  setYearsInFaith: (value) => set({ yearsInFaith: value }),
  setChurchInvolvement: (value) => set({ churchInvolvement: value }),
  setAttendance: (value) => set({ attendance: value }),
}))