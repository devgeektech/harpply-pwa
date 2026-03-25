"use client";

import { useEffect, useRef } from "react";
import { AUTH_STORAGE_KEYS, getOnboardingData } from "@/lib/api/auth";
import {
  hydrateOnboardingStores,
  useOnboardingStore,
  useBioStore,
  useFaithStore,
} from "@/store/onboardingStore";
import { useFaithAttributesStore } from "@/store/faithAttributesStore";

/**
 * When onboarding stores are empty (e.g. after refresh) but user has a token,
 * fetch onboarding data and hydrate so pre-filled values persist across refresh.
 */
function useHydrateOnboardingOnLoad() {
  const lastTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) return;

    // If token changed (e.g. new user signs in), always reset + re-hydrate.
    if (lastTokenRef.current === token) return;
    lastTokenRef.current = token;

    // Prevent "previous user" values from flashing before API hydration.
    useOnboardingStore.getState().setName("");
    useOnboardingStore.getState().setAge("");
    useOnboardingStore.getState().setGender("");
    useOnboardingStore.getState().setLatitude(null);
    useOnboardingStore.getState().setLongitude(null);
    useOnboardingStore.getState().setLocation("");
    useOnboardingStore.getState().setLocationEnabled(false);

    useBioStore.getState().setBio("");

    useFaithStore.getState().setChurchInvolvement("");
    useFaithStore.getState().setYearsInFaith(0);
    useFaithStore.getState().setChurchAttendance("");
    useFaithStore.getState().setSmokingSelection("");
    useFaithStore.getState().setAlcoholSelection("");
    useFaithStore.getState().setDietaryPreference("");

    useFaithAttributesStore.getState().setMyFaithValues([]);
    useFaithAttributesStore.getState().setPartnerValues([]);

    getOnboardingData(token)
      .then((res) => {
        if (res?.data) hydrateOnboardingStores(res.data);
      })
      .catch(() => {
        // If hydration fails, keep the cleared state so users don't see
        // stale values from a previous account.
      });
  }, []);
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useHydrateOnboardingOnLoad();
  return <>{children}</>;
}
