import { create } from "zustand";

export interface IdentityState {
  /** Profile image URLs for swiper (can be placeholders) */
  profileImages: string[];
  /** Active swiper slide index */
  activeSlideIndex: number;

  setActiveSlideIndex: (index: number) => void;
}

/** Faith & Lifestyle and lifestyle pills: use profileStore (from profile API) on identity page. */

export const useIdentityStore = create<IdentityState>((set) => ({
  profileImages: [
    "/images/slider/slide.jpg",
    "/images/slider/slide.jpg",
    "/images/slider/slide.jpg",
  ],
  activeSlideIndex: 0,

  setActiveSlideIndex: (index) => set({ activeSlideIndex: index }),
}));
