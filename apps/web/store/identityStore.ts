import { create } from "zustand";

export interface IdentityState {
  /** Profile image URLs for swiper */
  profileImages: string[];

  /** Active swiper slide index */
  activeSlideIndex: number;

  setProfileImages: (images: string[]) => void;
  setActiveSlideIndex: (index: number) => void;
}

/** Faith & Lifestyle and lifestyle pills: use profileStore (from profile API) on identity page. */

export const useIdentityStore = create<IdentityState>((set) => ({
  // Start empty so the identity page doesn't show placeholder images
  // while `/profile/photos` is still loading.
  profileImages: [],
  activeSlideIndex: 0,

  setProfileImages: (images: string[]) => set({ profileImages: images }),
  setActiveSlideIndex: (index) => set({ activeSlideIndex: index }),
}));
