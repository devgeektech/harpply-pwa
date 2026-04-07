"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  CardContent,
  Progress,
} from "@repo/ui";
import { BIBICAL_PREFERENCE_QUESTIONS } from "@/data/biblicalPreferenceQuestions";
import {
  AUTH_STORAGE_KEYS,
  getOnboardingData,
  saveBiblicalPreferences,
  type OnboardingData,
} from "@/lib/api/auth";


export default function BiblicalPreferencesPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [hydrating, setHydrating] = useState(true);

  const unlockedIndex = useMemo(() => {
    const idx = BIBICAL_PREFERENCE_QUESTIONS.findIndex((q) => !answers[q.id]);
    return idx === -1 ? BIBICAL_PREFERENCE_QUESTIONS.length - 1 : idx;
  }, [answers]);

  const answeredCount = useMemo(() => {
    return BIBICAL_PREFERENCE_QUESTIONS.reduce((acc, q) => (answers[q.id] ? acc + 1 : acc), 0);
  }, [answers]);

  const [openItem, setOpenItem] = useState<string>(BIBICAL_PREFERENCE_QUESTIONS[0].id);

  useEffect(() => {
    let cancelled = false;
    const hydrateSavedAnswers = async () => {
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
          : null;
      if (!token) {
        if (!cancelled) setHydrating(false);
        return;
      }
      try {
        const res = await getOnboardingData(token);
        if (cancelled) return;
        const raw = (res?.data as OnboardingData | undefined)?.biblicalPreferences;
        if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
          setHydrating(false);
          return;
        }

        const normalized: Record<string, string> = {};
        for (const question of BIBICAL_PREFERENCE_QUESTIONS) {
          const selected = (raw as Record<string, unknown>)[question.id];
          if (
            typeof selected === "string" &&
            question.options.includes(selected)
          ) {
            normalized[question.id] = selected;
          }
        }

        setAnswers(normalized);
        const firstUnanswered = BIBICAL_PREFERENCE_QUESTIONS.find(
          (q) => !normalized[q.id]
        );
        setOpenItem(firstUnanswered?.id ?? BIBICAL_PREFERENCE_QUESTIONS[0].id);
      } catch {
        // silent fail; page can still be used with empty local state
      } finally {
        if (!cancelled) setHydrating(false);
      }
    };
    void hydrateSavedAnswers();
    return () => {
      cancelled = true;
    };
  }, []);

  const progressValue = Math.round((answeredCount / BIBICAL_PREFERENCE_QUESTIONS.length) * 100);
  const canContinue = answeredCount === BIBICAL_PREFERENCE_QUESTIONS.length;

  const selectAnswer = (questionIndex: number, option: string) => {
    const q = BIBICAL_PREFERENCE_QUESTIONS[questionIndex];
    if (!q) return;
    if (questionIndex > unlockedIndex) return;

    setAnswers((prev) => ({ ...prev, [q.id]: option }));

    const next = BIBICAL_PREFERENCE_QUESTIONS[questionIndex + 1];
    if (next) setOpenItem(next.id);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
          : null;

      if (!token) {
        throw new Error("Missing access token");
      }

      const preferences = BIBICAL_PREFERENCE_QUESTIONS.reduce<Record<string, string>>(
        (acc, question) => {
          const selected = answers[question.id];
          if (selected) acc[question.id] = selected;
          return acc;
        },
        {}
      );

      await saveBiblicalPreferences(preferences, token);
      router.push("/dashboard/quiz/review");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex sm:items-center items-start justify-center px-3 sm:px-4 pb-[50px] md:py-[50px] sm:py-4 w-full">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">

        <CardContent className="flex items-center flex-col gap-2 p-0 sm:p-10 sm:px-6 text-left">
          <div className="text-left text-white w-full">
            <Link href="/dashboard/quiz/introduction">
              <ChevronLeft size={24} />
            </Link>
          </div>

          <div className="mb-6 w-full">
            <p className="text-sm text-gray-300 mb-2">
              Question {Math.min(unlockedIndex + 1, BIBICAL_PREFERENCE_QUESTIONS.length)} of {BIBICAL_PREFERENCE_QUESTIONS.length}
            </p>
            <Progress value={progressValue} />
          </div>

          <h1 className="text-[24px] font-light font-serif text-white mb-1 w-full">
            Biblical preferences
          </h1>
          <p className="text-white/80 text-sm font-light w-full mb-2">
            All answers are right. This is just about you.
          </p>

          <div className="w-full rounded-xl bg-gradient-to-b from-[#1a0f2e] via-[#150828] to-[#0f061c] shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-0 border border-[#C8A851]/12">
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={(v) => {
                setOpenItem(v);
              }}
            >
              {BIBICAL_PREFERENCE_QUESTIONS.map((q, idx) => {
                const isUnlocked = idx <= unlockedIndex;
                const selected = answers[q.id] ?? "";

                return (
                  <AccordionItem
                    key={q.id}
                    value={q.id}
                    className="border-b border-black/10 last:border-b-0 border-b border-[#C8A851]/12"
                  >
                    <AccordionTrigger className="px-3 py-3 hover:no-underline">
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex w-full items-center justify-between gap-3">
                          <span className="text-[#ffffff] text-base font-medium">
                            {idx + 1}. {q.title}
                          </span>
                          {!!selected && (
                            <span className="mr-3 inline-flex items-center justify-center shrink-0 w-5 h-5 rounded-full border border-[#C8A851] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)]">
                              <Check className="w-3 h-3 text-[#913C01]" />
                            </span>
                          )}
                        </div>
                        {!isUnlocked && (
                          <span className="text-xs text-[#ffffff]/60">
                            Answer the previous question to enable selection.
                          </span>
                        )}
                        {!!selected && (
                          <span className="text-sm text-[#ffffff]/70 line-clamp-1">
                            {selected}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-3 pb-3">
                      <div className="space-y-3">
                        {q.options.map((opt) => {
                          const active = selected === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => selectAnswer(idx, opt)}
                              disabled={!isUnlocked}
                              className={`cursor-pointer relative w-full text-base font-normal flex items-center justify-between gap-3 px-4 py-4 rounded-xl transition border ${active
                                  ? "border-[#C8A851] border-[1px] bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] text-white"
                                  : "border-white/10 border-[1px] bg-white/[0.04] shadow-[inset_0_1px_0_rgba(200,168,81,0.12)] text-white"
                                } ${!isUnlocked ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                className="absolute opacity-0"
                                checked={active}
                                readOnly
                                aria-hidden
                              />
                              <span className="text-white/80 text-left">{opt}</span>

                              <div
                                className={`flex items-center justify-center min-w-[20px] min-h-[20px] rounded-full border ${active
                                    ? "bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] border-[#C8A851]"
                                    : "border-gray-400"
                                  }`}
                              >
                                {active && <Check className="w-3 h-3 text-[#913C01]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          <Button
            type="button"
            disabled={!canContinue || loading || hydrating}
            onClick={handleSubmit}
            className="cursor-pointer mt-4 w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Continue"}
          </Button>

          <p className="text-white max-w-[360px] text-center mx-auto text-sm font-light w-full mt-3">
            Your answers are reflective of your current spiritual journey.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

