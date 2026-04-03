"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, cn, Progress } from "@repo/ui";
import {
  EVERYDAY_QUESTIONS,
  getEverydayQuestionLucideIcon,
  getEverydayQuestionMaxSelections,
  getEverydaySectionLucideIcon,
} from "@/data/everydayLifeQuestions";
import { AUTH_STORAGE_KEYS, saveEverydayLife } from "@/lib/api/auth";
import {
  setQuestionAnswers,
  useEverydayAnswersRecord,
} from "@/store/everydayLifeStore";

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
      router.push("/auth/onboarding/profile");
      return;
    }
    setSubmitting(true);
    try {
      await saveEverydayLife(answers, token);
    } catch {
      // soft-fail, still move forward
    } finally {
      setSubmitting(false);
      router.push("/auth/onboarding/profile");
    }
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex  sm:items-center items-start justify-center px-4 py-[50px] sm:py-4">

      <Card className="w-full min-w-0 max-w-[620px] rounded-2xl border-0 bg-transparent bg-cover bg-center bg-no-repeat py-0 md:border md:border-white/10 md:bg-[url('/images/bg_auth_center.png')] md:shadow-2xl md:shadow-[0px_4px_4px_0px_#00000014] md:backdrop-blur-xl">
        <CardContent className="flex w-full min-w-0 flex-col gap-3 px-3 sm:p-10">

          <div className="text-left text-white w-full ">
            <Link href="/auth/onboarding/partner-attributes">
              <ChevronLeft size={24} />
            </Link>
          </div>

          {/* Progress */}
          <div className="mb-6 w-full">
            <p className="text-xs text-gray-300 mb-2 text-left">Step 7 of 8</p>
            <Progress value={80} className="h-2" />
          </div>

          {/* Title */}
          <h2 className="text-[24px] font-serif text-white justify-start font-normal leading-snug !text-left">
            Everyday Life
          </h2>

          <p className="text-sm text-white mt-0 mb-6 text-left w-full">
            Tell us how you live day to day — pick what fits you best.
          </p>

          <div className="w-full min-w-0 space-y-4">
            {EVERYDAY_QUESTIONS.map((section) => {
              const isOpen = openSectionId === section.id;
              const headerId = `onboarding-everyday-section-${section.id}`;
              const panelId = `onboarding-everyday-panel-${section.id}`;
              return (
                <section
                  key={section.id}
                  className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#C8A851]/22 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.04]"
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
                                <p className="mb-2 text-xs text-[#1A1A1A]/70">
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
            className="mt-1 h-[52px] w-full cursor-pointer bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-base font-semibold text-[#913C01] hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Continue"}
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/auth/onboarding/profile")}
            className="mt-1 h-[52px] w-full cursor-pointer bg-transparent text-base font-semibold text-white/90 transition hover:bg-transparent hover:text-white hover:opacity-90 disabled:opacity-60"
          >
            Skip for now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
