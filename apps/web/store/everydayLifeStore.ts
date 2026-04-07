import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export interface EverydayLifeState {
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

/** Snapshot of all everyday-life answers as a single record (for API + UI iteration). */
export function selectEverydayAnswersRecord(
  s: EverydayLifeState
): Record<string, string[]> {
  return {
    relationshipHistory: s.relationshipHistory,
    haveChildren: s.haveChildren,
    wantChildren: s.wantChildren,
    openToPartnerWithChildren: s.openToPartnerWithChildren,
    freeTime: s.freeTime,
    musicTaste: s.musicTaste,
    sportsPlayOrFollow: s.sportsPlayOrFollow,
    fitnessLifestyle: s.fitnessLifestyle,
    recharge: s.recharge,
    communicationStyle: s.communicationStyle,
    favoriteFood: s.favoriteFood,
    travelerType: s.travelerType,
    travelStyle: s.travelStyle,
    perfectNightIn: s.perfectNightIn,
    showsOrMovies: s.showsOrMovies,
    dayToDay: s.dayToDay,
  };
}

export function setQuestionAnswers(questionId: string, values: string[]): void {
  const s = useEverydayLifeStore.getState();
  switch (questionId) {
    case "relationshipHistory":
      s.setRelationshipHistory(values);
      break;
    case "haveChildren":
      s.setHaveChildren(values);
      break;
    case "wantChildren":
      s.setWantChildren(values);
      break;
    case "openToPartnerWithChildren":
      s.setOpenToPartnerWithChildren(values);
      break;
    case "freeTime":
      s.setFreeTime(values);
      break;
    case "musicTaste":
      s.setMusicTaste(values);
      break;
    case "sportsPlayOrFollow":
      s.setSportsPlayOrFollow(values);
      break;
    case "fitnessLifestyle":
      s.setFitnessLifestyle(values);
      break;
    case "recharge":
      s.setRecharge(values);
      break;
    case "communicationStyle":
      s.setCommunicationStyle(values);
      break;
    case "favoriteFood":
      s.setFavoriteFood(values);
      break;
    case "travelerType":
      s.setTravelerType(values);
      break;
    case "travelStyle":
      s.setTravelStyle(values);
      break;
    case "perfectNightIn":
      s.setPerfectNightIn(values);
      break;
    case "showsOrMovies":
      s.setShowsOrMovies(values);
      break;
    case "dayToDay":
      s.setDayToDay(values);
      break;
    default:
      break;
  }
}

export const useEverydayLifeStore = create<EverydayLifeState>((set) => ({
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

/** Subscribe to all everyday-life answers as one record (shallow compare). */
export function useEverydayAnswersRecord(): Record<string, string[]> {
  return useEverydayLifeStore(
    useShallow((s) => selectEverydayAnswersRecord(s))
  );
}
