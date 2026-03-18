import { create } from "zustand";

export interface FaithLifestyleItem {
  icon: string;
  title: string;
  value: string;
}

export interface IdentityState {
  /** Profile image URLs for swiper (can be placeholders) */
  profileImages: string[];
  /** Active swiper slide index */
  activeSlideIndex: number;
  /** About me text */
  aboutMe: string;
  /** Faith & Lifestyle list */
  faithLifestyle: FaithLifestyleItem[];
  /** Lifestyle habit pills: smoking, alcohol, diet */
  smoking: string;
  alcohol: string;
  diet: string;

  setActiveSlideIndex: (index: number) => void;
  setAboutMe: (text: string) => void;
}

const defaultFaithLifestyle: FaithLifestyleItem[] = [
  { icon: "church", title: "Church Involvement", value: "Member" },
  { icon: "scroll", title: "Years in Faith", value: "5 years" },
  { icon: "attendance", title: "Church Attendance Frequency", value: "Weekly" },
  { icon: "hands", title: "My Faith Values", value: "Kindness" },
  { icon: "heart", title: "Partner Values", value: "Forgiveness" },
  { icon: "denomination", title: "Denomination", value: "Non-denominational" },
];

export const useIdentityStore = create<IdentityState>((set) => ({
  profileImages: [
    "/images/slider/slide.jpg",
    "/images/slider/slide.jpg",
    "/images/slider/screen_1.jpg",
    "/images/slider/screen_2.jpg",
  ],
  activeSlideIndex: 0,
  aboutMe:
    "Passionate about merging faith with creativity. I spend my weekends at local art galleries, volunteering with the youth ministry, and searching for the city's best sourdough. Looking for someone who values deep conversations and intentional living.",
  faithLifestyle: defaultFaithLifestyle,
  smoking: "Never",
  alcohol: "Socially",
  diet: "No Specific Diet",

  setActiveSlideIndex: (index) => set({ activeSlideIndex: index }),
  setAboutMe: (text) => set({ aboutMe: text }),
}));
