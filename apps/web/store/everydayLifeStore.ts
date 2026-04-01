import { create } from "zustand";

export function normalizeEverydayLifeProfileFromApi(
  raw: unknown
): Record<string, string[]> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, string[]> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!Array.isArray(v)) continue;
    const arr = v.filter((x): x is string => typeof x === "string");
    if (arr.length) out[k] = arr;
  }
  return out;
}

interface EverydayLifeState {
  relationshipHistory: string[];
  haveChildren: string[];
  wantChildren: string[];
  openToPartnerWithChildren: string[];
  freeTime: string[];
  musicTaste: string[];
  sportsPlayOrFollow: string[];
  fitnessLifestyle: string[];
  recharge: string[];
  communicationStyle: string[];
  favoriteFood: string[];
  travelerType: string[];
  travelStyle: string[];
  perfectNightIn: string[];
  showsOrMovies: string[];
  dayToDay: string[];

  setRelationshipHistory: (values: string[]) => void;
  setHaveChildren: (values: string[]) => void;
  setWantChildren: (values: string[]) => void;
  setOpenToPartnerWithChildren: (values: string[]) => void;
  setFreeTime: (values: string[]) => void;
  setMusicTaste: (values: string[]) => void;
  setSportsPlayOrFollow: (values: string[]) => void;
  setFitnessLifestyle: (values: string[]) => void;
  setRecharge: (values: string[]) => void;
  setCommunicationStyle: (values: string[]) => void;
  setFavoriteFood: (values: string[]) => void;
  setTravelerType: (values: string[]) => void;
  setTravelStyle: (values: string[]) => void;
  setPerfectNightIn: (values: string[]) => void;
  setShowsOrMovies: (values: string[]) => void;
  setDayToDay: (values: string[]) => void;

}

export const useEverydayLifeStore = create<EverydayLifeState>((set, get) => ({
  relationshipHistory: [],
  haveChildren: [],
  wantChildren: [],
  openToPartnerWithChildren: [],
  freeTime: [],
  musicTaste: [],
  sportsPlayOrFollow: [],
  fitnessLifestyle: [],
  recharge: [],
  communicationStyle: [],
  favoriteFood: [],
  travelerType: [],
  travelStyle: [],
  perfectNightIn: [],
  showsOrMovies: [],
  dayToDay: [],


  setRelationshipHistory: (values) => set({ relationshipHistory: values }),
  setHaveChildren: (values) => set({ haveChildren: values }),
  setWantChildren: (values) => set({ wantChildren: values }),
  setOpenToPartnerWithChildren: (values) => set({ openToPartnerWithChildren: values }),
  setFreeTime: (values) => set({ freeTime: values }),
  setMusicTaste: (values) => set({ musicTaste: values }),
  setSportsPlayOrFollow: (values) => set({ sportsPlayOrFollow: values }),
  setFitnessLifestyle: (values) => set({ fitnessLifestyle: values }),
  setRecharge: (values) => set({ recharge: values }),
  setCommunicationStyle: (values) => set({ communicationStyle: values }),
  setFavoriteFood: (values) => set({ favoriteFood: values }),
  setTravelerType: (values) => set({ travelerType: values }),
  setTravelStyle: (values) => set({ travelStyle: values }),
  setPerfectNightIn: (values) => set({ perfectNightIn: values }),
  setShowsOrMovies: (values) => set({ showsOrMovies: values }),
  setDayToDay: (values) => set({ dayToDay: values }),

}));
