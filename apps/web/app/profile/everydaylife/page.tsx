"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, cn } from "@repo/ui";
import {
  EVERYDAY_QUESTIONS,
  getEverydayQuestionLucideIcon,
  getEverydayQuestionMaxSelections,
  getEverydaySectionLucideIcon,
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

function EverydayIconTile(
  props:
    | { variant: "section"; sectionId: string; size?: "md" | "lg" }
    | { variant: "question"; questionId: string; size?: "md" | "lg" }
) {
  const size = props.size ?? "md";
  const Icon =
    props.variant === "section"
      ? getEverydaySectionLucideIcon(props.sectionId)
      : getEverydayQuestionLucideIcon(props.questionId);
  const box =
    size === "lg"
      ? "h-11 w-11 sm:h-12 sm:w-12"
      : "h-10 w-10 sm:h-11 sm:w-11";
  const iconSize = size === "lg" ? "size-[20px] sm:size-[22px]" : "size-[18px]";
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl border border-[#C8A851]/40 bg-[linear-gradient(145deg,rgba(200,168,81,0.22)_0%,rgba(255,248,235,0.95)_48%,rgba(250,245,230,0.98)_100%)] text-[#7a5210] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
        box
      )}
    >
      <Icon className={cn("shrink-0", iconSize)} strokeWidth={2} aria-hidden />
    </div>
  );
}

export default function EverydayLifePage() {
  const router = useRouter();
  const answers = useEverydayAnswersRecord();
  const [submitting, setSubmitting] = useState(false);
  const [openSectionId, setOpenSectionId] = useState<string | null>(
    EVERYDAY_QUESTIONS[0]?.id ?? null
  );

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
    <div className="relative min-h-screen bg-[url('/images/bg_blue.jpg')] bg-cover bg-center bg-no-repeat">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a0f2e]/88 via-[#150828]/82 to-[#0a0518]/92"
        aria-hidden
      />
      <div className="relative flex min-h-screen items-start justify-center px-3 py-5 sm:items-center sm:px-4 sm:py-6">
        <Card className="w-full max-w-[620px] border-0 bg-transparent py-0 md:border md:border-white/12 md:bg-[url('/images/bg_auth_center.png')] md:bg-cover md:bg-center md:bg-no-repeat md:shadow-2xl md:shadow-black/30 md:backdrop-blur-xl">
          <CardContent className="flex flex-col gap-4 px-3 sm:gap-6 sm:p-10">
            <div className="flex w-full items-center gap-3 text-left text-white">
              <Link
                href="/profile/faithvalues"
                className="flex items-center justify-center size-10 rounded-full text-white/90 hover:bg-white/10 transition-colors"
                aria-label="Back"
              >
                <ChevronLeft size={22} strokeWidth={2} />
              </Link>
            </div>

            <div>
              <h1 className="font-serif text-[26px] font-normal leading-tight tracking-tight text-white sm:text-[28px]">
                Everyday Life
              </h1>
              <p className="mt-1.5 text-sm text-white/65">
                Tell us how you live day to day — pick what fits you best.
              </p>
            </div>

            <div
              className="max-h-[52vh] space-y-4 overflow-y-auto pr-1 scroll-smooth sm:max-h-[55vh] [scrollbar-width:thin] [scrollbar-color:#C8A851_#1A1A1A22] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#1A1A1A22] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,#964400_0%,#F3D35D_50%,#8C4202_100%)] [&::-webkit-scrollbar-thumb:hover]:bg-[linear-gradient(180deg,#8C4202_0%,#F3D35D_50%,#964400_100%)]"
            >
              {EVERYDAY_QUESTIONS.map((section) => {
                const isOpen = openSectionId === section.id;
                const headerId = `everyday-edit-section-${section.id}`;
                const panelId = `everyday-edit-panel-${section.id}`;
                return (
                  <section
                    key={section.id}
                    className="overflow-hidden rounded-2xl border border-[#C8A851]/22 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.04]"
                  >
                    <button
                      type="button"
                      id={headerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenSectionId((prev) =>
                          prev === section.id ? null : section.id
                        )
                      }
                      className={cn(
                        "flex w-full items-center gap-3 bg-gradient-to-r from-[#fffef9] to-white px-4 py-3.5 text-left transition hover:bg-[#fffaf0] sm:px-5 sm:py-4",
                        isOpen && "border-b border-[#C8A851]/12"
                      )}
                    >
                      <EverydayIconTile
                        variant="section"
                        sectionId={section.id}
                        size="lg"
                      />
                      <div className="min-w-0 flex-1">
                        <h2 className="text-base font-semibold tracking-tight text-[#1a1525] sm:text-lg">
                          {section.title}
                        </h2>
                        <p className="mt-0.5 text-xs text-[#5c5668]">
                          {section.questions.length}{" "}
                          {section.questions.length === 1
                            ? "question"
                            : "questions"}
                        </p>
                      </div>
                      <span className="shrink-0 text-[#7a6b8c]">
                        {isOpen ? (
                          <ChevronUp className="size-5" strokeWidth={2} aria-hidden />
                        ) : (
                          <ChevronDown className="size-5" strokeWidth={2} aria-hidden />
                        )}
                      </span>
                    </button>

                    {isOpen ? (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={headerId}
                        className="space-y-0 px-3.5 pb-4 pt-1 sm:px-5"
                      >
                        {section.questions.map((question, qIdx) => {
                          const selected = answers[question.id] ?? [];
                          const max = getEverydayQuestionMaxSelections(question.id);
                          const limitReached = max === 3 && selected.length >= max;
                          return (
                            <div
                              key={question.id}
                              className={cn(
                                "pt-4",
                                qIdx > 0 && "mt-1 border-t border-[#C8A851]/10"
                              )}
                            >
                              <div className="flex gap-3">
                                <EverydayIconTile
                                  variant="question"
                                  questionId={question.id}
                                />
                                <div className="min-w-0 flex-1 pb-1">
                                  <p className="text-sm font-semibold leading-snug text-[#1a1525] sm:text-[15px]">
                                    {question.prompt}
                                  </p>
                                  <p className="text-xs text-[#1A1A1A]/70 mb-2">
                                    {max === 3
                                      ? "Choose up to 3"
                                      : "Choose one"}
                                  </p>
                                  <div className="mt-2.5 flex flex-wrap gap-2">
                                    {question.options.map((option) => {
                                      const isActive = selected.includes(
                                        option.value
                                      );
                                      const isDisabled =
                                        max === 3 && !isActive && limitReached;
                                      return (
                                        <button
                                          key={option.value}
                                          type="button"
                                          onClick={() =>
                                            onToggleAnswer(
                                              question.id,
                                              option.value
                                            )
                                          }
                                          disabled={isDisabled}
                                          className={cn(
                                            "rounded-full border px-3 py-2 text-left text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A851]/80 sm:px-3.5 sm:text-sm",
                                            isActive
                                              ? "border-[#C8A851] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] font-semibold text-[#5c2e04] shadow-sm"
                                              : "border-[#d8d3e0] bg-white text-[#1a1525] hover:border-[#C8A851]/70 hover:bg-[#fffef9]",
                                            isDisabled &&
                                            "cursor-not-allowed opacity-45"
                                          )}
                                        >
                                          {option.label}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </section>
                );
              })}
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
              className="cursor-pointer bg-transparent text-base font-semibold text-white/90 transition hover:bg-transparent hover:text-white hover:opacity-90 disabled:opacity-60"
            >
              Skip for now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

