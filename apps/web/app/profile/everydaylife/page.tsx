"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, Progress } from "@repo/ui";
import {
  EVERYDAY_QUESTIONS,
  getEverydayQuestionMaxSelections,
} from "@/data/everydayLifeQuestions";
import {
  AUTH_STORAGE_KEYS,
  getOnboardingData,
  saveEverydayLife,
} from "@/lib/api/auth";
import {
  setQuestionAnswers,
  useEverydayAnswersRecord,
} from "@/store/everydayLifeStore";
import { hydrateOnboardingStores } from "@/store/onboardingStore";
import { toast } from "sonner";
import { SUCCESS_MESSAGES } from "@/lib/messages/success-messages";

function toggleOption(
  current: string[],
  option: string,
  max: 1 | 3
): string[] {
  if (max === 1) {
    if (current.length === 1 && current[0] === option) {
      return [];
    }
    return [option];
  }
  if (current.includes(option)) {
    return current.filter((value) => value !== option);
  }
  if (current.length >= max) {
    return current;
  }
  return [...current, option];
}

export default function EverydayLifePage() {
  const router = useRouter();
  const answers = useEverydayAnswersRecord();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const hydrateEverydayLifeFromDb = async () => {
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
          : null;
      if (!token) return;

      try {
        const res = await getOnboardingData(token);
        if (!cancelled && res?.data) {
          hydrateOnboardingStores(res.data);
        }
      } catch {
        // Silent fail to avoid blocking profile edit flow.
      }
    };

    void hydrateEverydayLifeFromDb();
    return () => {
      cancelled = true;
    };
  }, []);

  const questionCount = useMemo(
    () => EVERYDAY_QUESTIONS.reduce((count, section) => count + section.questions.length, 0),
    []
  );

  const answeredQuestionCount = useMemo(() => {
    return Object.values(answers).reduce((count, selected) => {
      if (selected.length > 0) return count + 1;
      return count;
    }, 0);
  }, [answers]);

  const progress = Math.min(
    100,
    Math.round((answeredQuestionCount / Math.max(questionCount, 1)) * 100)
  );

  const onToggleAnswer = (questionId: string, option: string) => {
    const max = getEverydayQuestionMaxSelections(questionId);
    const current = answers[questionId] ?? [];
    const next = toggleOption(current, option, max);
    setQuestionAnswers(questionId, next);
  };

  const handleContinue = async () => {
    if (submitting) return;
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
        : null;
    if (!token) {
      router.push("/profile/lifestyle");
      return;
    }
    setSubmitting(true);
    try {
      await saveEverydayLife(answers, token);
    } catch {
      // soft-fail, still move forward
    } finally {
      setSubmitting(false);
      toast.success(SUCCESS_MESSAGES.PROFILE.EVERYDAY_LIFE_UPDATED);
      router.push("/profile/lifestyle");
    }
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-3 sm:px-4 py-5 sm:py-6">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-10 px-3">
          <div className="text-left text-white w-full">
            <Link href="/profile/faithvalues">
              <ChevronLeft size={24} />
            </Link>
          </div>

          <h1 className="text-[24px] font-serif text-white font-normal leading-snug text-left">
            Everyday Life
          </h1>

            <div
              className="space-y-4 max-h-[55vh] overflow-y-auto pr-1 scroll-smooth [scrollbar-width:thin] [scrollbar-color:#C8A851_#1A1A1A22] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#1A1A1A22] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,#964400_0%,#F3D35D_50%,#8C4202_100%)] [&::-webkit-scrollbar-thumb:hover]:bg-[linear-gradient(180deg,#8C4202_0%,#F3D35D_50%,#964400_100%)]"
            >
              {EVERYDAY_QUESTIONS.map((section) => (
                <section
                  key={section.id}
                  className="rounded-xl border border-black/10 bg-white p-3 sm:p-4"
                >
                  <h2 className="text-base sm:text-lg font-semibold text-[#1A1A1A] mb-3">
                    <span className="mr-2" aria-hidden>
                      {section.emoji}
                    </span>
                    {section.title}
                  </h2>

                  <div className="space-y-4">
                    {section.questions.map((question) => {
                      const selected = answers[question.id] ?? [];
                      const max = getEverydayQuestionMaxSelections(question.id);
                      const limitReached = max === 3 && selected.length >= max;
                      return (
                        <div key={question.id}>
                          <p className="text-sm sm:text-base font-medium text-[#1A1A1A] mb-1">
                            {question.prompt}
                          </p>
                          <p className="text-xs text-[#1A1A1A]/70 mb-2">
                            {max === 3
                              ? "Choose up to 3"
                              : "Choose one"}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {question.options.map((option) => {
                              const isActive = selected.includes(option.value);
                              const isDisabled =
                                max === 3 && !isActive && limitReached;
                              return (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => onToggleAnswer(question.id, option.value)}
                                  disabled={isDisabled}
                                  className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm transition ${isActive
                                      ? "border-[#C8A851] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold"
                                      : "border-black/15 bg-white text-[#1A1A1A]"
                                    } ${isDisabled ? "opacity-45 cursor-not-allowed" : "cursor-pointer hover:border-[#C8A851]"}`}
                                >
                                  {option.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

          <Button
            type="button"
            disabled={submitting}
            onClick={handleContinue}
            className="cursor-pointer mt-1 w-full h-[52px] text-base text-[#913C01] font-semibold bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save & next"}
          </Button>

          <Button
            type="button"
            onClick={() => router.push("/profile/lifestyle")}
            className="cursor-pointer text-base bg-transparent hover:bg-transparent text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            Skip for now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

