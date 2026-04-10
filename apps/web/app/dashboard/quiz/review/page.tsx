"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card, CardContent } from "@repo/ui";
import Link from "next/link";
import { ChevronLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AUTH_STORAGE_KEYS,
  getOnboardingData,
  type OnboardingData,
} from "@/lib/api/auth";
import { BIBICAL_PREFERENCE_QUESTIONS } from "@/data/biblicalPreferenceQuestions";

export default function Review() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saved, setSaved] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
          : null;
      if (!token) {
        setFetching(false);
        return;
      }
      try {
        const res = await getOnboardingData(token);
        if (!cancelled) {
          const raw = (res?.data as OnboardingData | undefined)?.biblicalPreferences;
          if (raw && typeof raw === "object" && !Array.isArray(raw)) {
            const normalized: Record<string, string> = {};
            for (const [key, value] of Object.entries(raw)) {
              if (typeof value === "string" && value.trim()) {
                normalized[key] = value;
              }
            }
            setSaved(normalized);
          } else {
            setSaved({});
          }
        }
      } catch {
        if (!cancelled) setSaved({});
      } finally {
        if (!cancelled) setFetching(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const answeredItems = useMemo(
    () =>
      BIBICAL_PREFERENCE_QUESTIONS.map((question) => ({
        id: question.id,
        question: question.title,
        answer: saved[question.id] ?? "",
      })).filter((item) => item.answer),
    [saved]
  );

  const handleSubmit = () => {
    if (loading) return;
    setLoading(true);
    router.push("/dashboard/quiz/discover");
  };

  return (
    <div className="min-h-screen flex sm:items-center items-start justify-center px-3 sm:px-4 pb-[50px] md:py-[50px] sm:py-4 w-full">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col gap-2 sm:p-10 sm:px-6 px-0 text-left">
          <div className="text-left text-white w-full">
            <Link href="/dashboard/quiz/biblical-preferences">
              <ChevronLeft size={24} />
            </Link>
          </div>

          <div className="rounded-xl overflow-hidden mb-4 relative">
            <img
              src="/images/finalstep.jpg"
              alt="review"
              className="w-full h-[185px] object-cover rounded-[12px]"
            />
          </div>

          <p className="text-sm text-white mt-3 mb-6">
            Please review your biblical preferences below. These answers help us
            find the most compatible matches based on your spiritual journey.
          </p>

          <div className="mb-12 rounded-[12px] border border-[#C8A851]/22 bg-gradient-to-b from-[#1e1438]/98 via-[#150a28]/98 to-[#0c0518]/98 p-4 shadow-[inset_0_1px_0_rgba(200,168,81,0.12)]">
            <h4 className="mb-3 flex items-center gap-2 text-base font-medium text-[#c8bddc]">
              <img src="/images/jesusicon.svg" alt="jesusicon" className="h-[20px] w-[20px]" />
              Saved Biblical Preferences
            </h4>

            {fetching ? (
              <p className="text-sm text-[#c4b5dc]/85">Loading your saved answers...</p>
            ) : answeredItems.length > 0 ? (
              <ul className="space-y-3">
                {answeredItems.map((item, idx) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-[#C8A851]/20 bg-white/[0.04] px-3 py-3"
                  >
                    <p className="text-[13px] font-medium text-[#c8bddc]">
                      Q{idx + 1}. {item.question}
                    </p>
                    <div className="mt-1.5 flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C39936]" />
                      <p className="text-sm text-[#efe8ff]">{item.answer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#c4b5dc]/85">
                No saved answers found yet. Please go back and complete the quiz.
              </p>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading || fetching || answeredItems.length === 0}
            className="w-full h-[52px] text-base rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Continuing..." : "Submit"}
          </Button>

          <button
            onClick={() => router.push("/dashboard/quiz/biblical-preferences")}
            className="text-center text-base font-medium text-[#913C01] mt-3 cursor-pointer"
          >
            Edit Answers
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
