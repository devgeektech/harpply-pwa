import { create } from "zustand";
import type { ProfileData } from "@/lib/api/profile";
import { formatFaithValuesForDisplay } from "@/data/myFaithValues";

export type Gender = "Male" | "Female" | "Other";

interface ProfileState {
  name: string;
  age: number;
  location: string;
  church: string;
  bio: string;
  gender: Gender;
  loaded: boolean;
  denomination: string;
  yearsInFaith: number | null;
  churchAttendance: string;
  myFaithValues: string[];
  partnerValues: string[];
  smokingPreference: string;
  alcoholPreference: string;
  dietaryPreference: string;
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

  setBio: (bio: string) => void;
  setName: (name: string) => void;
  setAge: (age: number) => void;
  setLocation: (location: string) => void;
  setGender: (gender: Gender) => void;
  hydrateFromApi: (data: ProfileData) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: "",
  age: 0,
  location: "",
  church: "",
  gender: "Male",
  bio: "",
  loaded: false,
  denomination: "",
  yearsInFaith: null,
  churchAttendance: "",
  myFaithValues: [],
  partnerValues: [],
  smokingPreference: "",
  alcoholPreference: "",
  dietaryPreference: "",
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

  setBio: (bio) => set({ bio }),
  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
  setLocation: (location) => set({ location }),
  setGender: (gender) => set({ gender }),
  hydrateFromApi: (data) =>
    set({
      name: data.fullName ?? "",
      age: data.age ?? 0,
      location: data.location ?? "",
      church: data.churchInvolvement ?? "",
      bio: data.bio ?? "",
      gender:
        (data.gender &&
          (data.gender.charAt(0).toUpperCase() + data.gender.slice(1).toLowerCase())) as Gender,
      denomination: data.denomination ?? "",
      yearsInFaith: data.yearsInFaith ?? null,
      churchAttendance: data.churchAttendance ?? "",
      myFaithValues: data.myFaithValues ?? [],
      partnerValues: data.partnerValues ?? [],
      // myFaithValues: formatFaithValuesForDisplay(data.myFaithValues),
      // partnerValues: formatFaithValuesForDisplay(data.partnerValues),
      smokingPreference: data.smokingPreference ?? "",
      alcoholPreference: data.alcoholPreference ?? "",
      dietaryPreference: data.dietaryPreference ?? "",
      relationshipHistory: data.relationshipHistory ?? [],
      haveChildren: data.haveChildren ?? [],
      wantChildren: data.wantChildren ?? [],
      openToPartnerWithChildren: data.openToPartnerWithChildren ?? [],
      freeTime: data.freeTime ?? [],
      musicTaste: data.musicTaste ?? [],
      sportsPlayOrFollow: data.sportsPlayOrFollow ?? [],
      fitnessLifestyle: data.fitnessLifestyle ?? [],
      recharge: data.recharge ?? [],
      communicationStyle: data.communicationStyle ?? [],
      favoriteFood: data.favoriteFood ?? [],
      travelerType: data.travelerType ?? [],
      travelStyle: data.travelStyle ?? [],
      perfectNightIn: data.perfectNightIn ?? [],
      showsOrMovies: data.showsOrMovies ?? [],
      dayToDay: data.dayToDay ?? [],
      loaded: true,
    }),
}));
