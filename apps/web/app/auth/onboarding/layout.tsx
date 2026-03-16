"use client";

import { useEffect, useRef } from "react";
import { AUTH_STORAGE_KEYS, getOnboardingData } from "@/lib/api/auth";
import {
  hydrateOnboardingStores,
  useOnboardingStore,
  useBioStore,
  useFaithStore,
} from "@/store/onboardingStore";

/**
 * When onboarding stores are empty (e.g. after refresh) but user has a token,
 * fetch onboarding data and hydrate so pre-filled values persist across refresh.
 */
function useHydrateOnboardingOnLoad() {
  const hydrated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || hydrated.current) return;

    const token = window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) return;

    const identity = useOnboardingStore.getState();
    const bio = useBioStore.getState();
    const faith = useFaithStore.getState();

    const storesLookEmpty =
      !identity.name &&
      !identity.age &&
      !bio.bio &&
      !faith.churchInvolvement &&
      faith.yearsInFaith === 0;

    if (!storesLookEmpty) return;

    hydrated.current = true;
    getOnboardingData(token)
      .then((res) => {
        if (res?.data) hydrateOnboardingStores(res.data);
      })
      .catch(() => {
        hydrated.current = false;
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
