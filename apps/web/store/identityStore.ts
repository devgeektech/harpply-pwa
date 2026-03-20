import { create } from "zustand";

export interface IdentityState {
  /** Profile image URLs for swiper */
  profileImages: string[];

  /** Active swiper slide index */
  activeSlideIndex: number;

  /** Profile details */
  aboutMe: string;
  faithLifestyle: string;

  /** Lifestyle */
  smoking: string;
  alcohol: string;
  diet: string;

  /** Actions */
  setActiveSlideIndex: (index: number) => void;

  /** Optional setters (good for future forms) */
  setAboutMe: (text: string) => void;
  setLifestyle: (data: {
    smoking?: string;
    alcohol?: string;
    diet?: string;
  }) => void;
}

export const useIdentityStore = create<IdentityState>((set) => ({
  profileImages: [
    "/images/slider/slide.jpg",
    "/images/slider/slide.jpg",
    "/images/slider/slide.jpg",
    "/images/slider/slide.jpg",
  ],

  activeSlideIndex: 0,

  /** ✅ NEW DEFAULT VALUES */
  aboutMe: "Passionate about faith, growth, and meaningful connections.",
  faithLifestyle: "Active",

  smoking: "Never",
  alcohol: "Occasionally",
  diet: "No Preference",

  /** Actions */
  setActiveSlideIndex: (index) => set({ activeSlideIndex: index }),

  setAboutMe: (text) => set({ aboutMe: text }),

  setLifestyle: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));