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
  const iconSize = size === "lg" ? "size-[20px] sm:size-[22px]" : "size-[18px]";

  const box =
    size === "lg"
      ? "h-11 w-11 sm:h-12 sm:w-12"
      : "h-10 w-10 sm:h-11 sm:w-11";
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl border border-[#C8A851]/35 bg-[linear-gradient(145deg,rgba(200,168,81,0.16)_0%,rgba(35,22,58,0.92)_55%,rgba(18,10,38,0.96)_100%)] text-[#d4a84b] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]",
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
    <div className="flex min-h-screen items-start justify-center bg-[url('/images/bg_blue.jpg')] bg-cover bg-center bg-no-repeat px-4 py-6 sm:items-center sm:py-8">
      <Card className="w-full min-w-0 max-w-[620px] rounded-2xl border-0 bg-transparent bg-cover bg-center bg-no-repeat py-0 md:border md:border-white/10 md:bg-[url('/images/bg_auth_center.png')] md:shadow-2xl md:shadow-[0px_4px_4px_0px_#00000014] md:backdrop-blur-xl">
        <CardContent className="flex w-full min-w-0 flex-col gap-4 px-3 text-left sm:gap-6 sm:p-10">
            <div className="flex w-full items-center gap-3 text-white">
              <Link
                href="/profile/faithvalues"
                className="flex size-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10"
                aria-label="Back"
              >
                <ChevronLeft size={22} strokeWidth={2} />
              </Link>
            </div>

            <div>
              <h1 className="font-serif text-[26px] font-normal leading-tight tracking-tight text-white sm:text-[28px]">
                Everyday Life
              </h1>
              <p className="mt-1.5 text-sm leading-relaxed text-[#c4b5dc]/90">
                Tell us how you live day to day — pick what fits you best.
              </p>
            </div>

            <div className="w-full min-w-0 space-y-4">
              {EVERYDAY_QUESTIONS.map((section) => {
                const isOpen = openSectionId === section.id;
                const headerId = `everyday-edit-section-${section.id}`;
                const panelId = `everyday-edit-panel-${section.id}`;
                return (
                  <section
                    key={section.id}
                    className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#C8A851]/22 bg-gradient-to-b from-[#1e1438]/98 via-[#150a28]/98 to-[#0c0518]/98 shadow-[inset_0_1px_0_rgba(200,168,81,0.12)]"
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
                        "flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.04] sm:px-5 sm:py-4",
                        isOpen && "border-b border-[#C8A851]/12"
                      )}
                    >
                      <EverydayIconTile
                        variant="section"
                        sectionId={section.id}
                        size="lg"
                      />
                      <div className="min-w-0 flex-1">
                        <h2 className="text-base font-semibold tracking-tight text-[#c8bddc] sm:text-lg">
                          {section.title}
                        </h2>
                        <p className="mt-0.5 text-xs text-[#a89bc4]/85">
                          {section.questions.length}{" "}
                          {section.questions.length === 1
                            ? "question"
                            : "questions"}
                        </p>
                      </div>
                      <span className="shrink-0">
                        {isOpen ? (
                          <ChevronUp className="size-5 text-[#C8A851]/90" strokeWidth={2} aria-hidden />
                        ) : (
                          <ChevronDown className="size-5 text-[#a89bc4]/90" strokeWidth={2} aria-hidden />
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
                                qIdx > 0 && "mt-1 border-t border-[#C8A851]/12"
                              )}
                            >
                              <div className="flex gap-3">
                                <EverydayIconTile
                                  variant="question"
                                  questionId={question.id}
                                />
                                <div className="min-w-0 flex-1 pb-1">
                                  <p className="text-sm font-medium leading-snug text-[#c8bddc] sm:text-[15px]">
                                    {question.prompt}
                                  </p>
                                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#a89bc4]/75">
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
                                            "rounded-[8px] border px-3 py-2 text-left text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A851]/80 sm:px-3.5 sm:text-xs",
                                            isActive
                                              ? "border-[#C8A851] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] font-semibold text-[#5c2e04] shadow-sm"
                                              : "border-[#a78bda]/40 bg-[linear-gradient(180deg,rgba(167,139,218,0.22)_0%,rgba(55,35,95,0.65)_100%)] font-semibold text-white/80 hover:border-[#C8A851]/45 hover:bg-white/[0.1]",
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

            <div className="w-full bg-gradient-to-t from-[#130F26] to-transparent pt-4">
              <Button
                type="button"
                disabled={submitting}
                onClick={handleContinue}
                className="h-[52px] w-full cursor-pointer rounded-[12px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-base font-semibold text-[#913C01] hover:opacity-90 disabled:opacity-60 md:rounded-[8px]"
              >
                {submitting ? "Saving..." : "Save & next"}
              </Button>
            </div>

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
  );
}

