"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, Progress } from "@repo/ui";

const MAX_PER_QUESTION = 3;

type EverydayQuestion = {
  id: string;
  prompt: string;
  options: readonly string[];
};

type EverydaySection = {
  id: string;
  title: string;
  emoji: string;
  questions: readonly EverydayQuestion[];
};

const SECTIONS: readonly EverydaySection[] = [
  {
    id: "relationship-history",
    title: "Relationship History",
    emoji: "💍",
    questions: [
      {
        id: "relationshipHistory",
        prompt: "What is your relationship history?",
        options: ["Never married", "Divorced", "Widowed", "Prefer not to say"],
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    emoji: "👶",
    questions: [
      {
        id: "haveChildren",
        prompt: "Do you have children?",
        options: ["Yes", "No"],
      },
      {
        id: "wantChildren",
        prompt: "Do you want children?",
        options: ["Yes", "Yes — open to adoption", "Maybe", "Not right now", "No"],
      },
      {
        id: "openToPartnerWithChildren",
        prompt: "Open to dating someone with children?",
        options: ["Yes", "Maybe", "Need to discuss it", "No"],
      },
    ],
  },
  {
    id: "hobbies",
    title: "Hobbies",
    emoji: "🎨",
    questions: [
      {
        id: "freeTime",
        prompt: "What do you do in your free time?",
        options: [
          "Reading",
          "Writing",
          "Cooking",
          "Baking",
          "Gardening",
          "Photography",
          "Painting",
          "Drawing",
          "Crafting",
          "DIY projects",
          "Woodworking",
          "Playing an instrument",
          "Singing",
          "Volunteering",
          "Mentoring",
          "Board games",
          "Puzzles",
          "Fishing",
          "Hunting",
          "Hiking",
          "Traveling",
          "Shopping",
          "Attending local events",
          "Going to the gym",
          "Running",
          "Cycling",
          "Swimming",
          "Dancing",
          "Watching sports",
          "Playing sports",
          "Going to concerts",
          "Trying new restaurants",
          "Road trips",
          "Spending time with family",
          "Thrifting",
          "Journaling",
          "Content creation",
          "Gaming",
          "Other",
        ],
      },
    ],
  },
  {
    id: "music",
    title: "Music",
    emoji: "🎵",
    questions: [
      {
        id: "musicTaste",
        prompt: "What kind of music do you love?",
        options: [
          "Contemporary Christian",
          "Gospel",
          "Hymns",
          "Worship and praise",
          "R&B",
          "Soul",
          "Country",
          "Hip-Hop",
          "Classical",
          "Jazz",
          "Blues",
          "Pop",
          "Rock",
          "Indie",
          "Alternative",
          "Latin",
          "Reggae",
          "Folk",
          "Bluegrass",
          "Instrumental",
          "Soundtracks",
          "Oldies and Motown",
          "Electronic",
          "Other",
        ],
      },
    ],
  },
  {
    id: "sports",
    title: "Sports",
    emoji: "🏀",
    questions: [
      {
        id: "sportsPlayOrFollow",
        prompt: "What sports do you play or follow?",
        options: [
          "Football",
          "Basketball",
          "Baseball",
          "Softball",
          "Soccer",
          "Tennis",
          "Golf",
          "Hockey",
          "MMA",
          "Boxing",
          "Kickboxing",
          "Wrestling",
          "Motorsports",
          "Olympics",
          "College sports",
          "Track and field",
          "Gymnastics",
          "Figure skating",
          "Surfing",
          "Skateboarding",
          "Snowboarding",
          "Skiing",
          "Lacrosse",
          "Rugby",
          "Cricket",
          "Volleyball",
          "Pickleball",
          "Swimming",
          "Cycling",
          "Running",
          "Bowling",
          "Billiards",
          "Backyard games",
          "Rock climbing",
          "Martial arts",
          "CrossFit",
          "Rowing",
          "Badminton",
          "Ping pong",
          "Disc golf",
          "Flag football",
          "Sand volleyball",
          "Bodybuilding",
          "Esports",
          "Not really into sports",
          "Other",
        ],
      },
      {
        id: "fitnessLifestyle",
        prompt: "What is your fitness lifestyle?",
        options: [
          "Gym regularly",
          "Running",
          "Hiking",
          "Cycling",
          "Swimming",
          "Home workouts",
          "Team sports",
          "Outdoor adventures",
          "Stretching",
          "Still building a routine",
          "Other",
        ],
      },
    ],
  },
  {
    id: "personality",
    title: "Personality",
    emoji: "🧠",
    questions: [
      {
        id: "recharge",
        prompt: "How do you recharge?",
        options: [
          "Alone time",
          "Friends or family",
          "Nature",
          "Worship and prayer",
          "Napping",
          "Long drive",
          "Reading",
          "A good project",
          "Exercise",
          "Cooking",
          "Other",
        ],
      },
      {
        id: "communicationStyle",
        prompt: "What is your communication style?",
        options: [
          "Direct",
          "Thoughtful",
          "Expressive",
          "Humorous",
          "Good listener",
          "Depends on the moment",
        ],
      },
    ],
  },
  {
    id: "food-drinks",
    title: "Food and Drinks",
    emoji: "🍽️",
    questions: [
      {
        id: "favoriteFood",
        prompt: "What are your favorite types of food?",
        options: [
          "Soul food",
          "Southern cooking",
          "American",
          "Italian",
          "Mexican",
          "Caribbean",
          "African",
          "Asian",
          "Mediterranean",
          "Middle Eastern",
          "Seafood",
          "Barbecue",
          "Comfort food",
          "Breakfast all day",
          "Healthy eating",
          "Plant-based",
          "Other",
        ],
      },
    ],
  },
  {
    id: "travel",
    title: "Travel",
    emoji: "✈️",
    questions: [
      {
        id: "travelerType",
        prompt: "What kind of traveler are you?",
        options: [
          "Beach",
          "Mountains",
          "City exploration",
          "Road trips",
          "International",
          "Cruises",
          "Historical sites",
          "Food travel",
          "Mission trips",
          "Family visits",
          "Staycations",
          "Other",
        ],
      },
      {
        id: "travelStyle",
        prompt: "How do you travel best?",
        options: [
          "Fully planned",
          "Spontaneous",
          "Slow and deep",
          "Flexible balance",
          "Whatever is affordable",
        ],
      },
    ],
  },
  {
    id: "staying-in",
    title: "Staying In",
    emoji: "🏠",
    questions: [
      {
        id: "perfectNightIn",
        prompt: "What does a perfect night in look like?",
        options: [
          "Home-cooked meal",
          "Movie or series",
          "Reading",
          "Board games",
          "Good conversation",
          "Worship music",
          "A creative project",
          "Gaming",
          "Baking",
          "Just resting",
          "Other",
        ],
      },
      {
        id: "showsOrMovies",
        prompt: "What kind of shows or movies do you enjoy?",
        options: [
          "Faith-based films",
          "Documentaries",
          "Family films",
          "Comedies",
          "Dramas",
          "Musicals",
          "Action and adventure",
          "Historical",
          "Animated",
          "Sports docs",
          "True crime",
          "Nature and wildlife",
          "Other",
        ],
      },
    ],
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    emoji: "🌿",
    questions: [
      {
        id: "dayToDay",
        prompt: "How would you describe your day-to-day?",
        options: [
          "Busy and driven",
          "Balanced",
          "Laid back",
          "Routine-oriented",
          "In transition",
          "Building and focused",
        ],
      },
    ],
  },
];

function toggleOption(current: string[], option: string): string[] {
  if (current.includes(option)) {
    return current.filter((value) => value !== option);
  }
  if (current.length >= MAX_PER_QUESTION) {
    return current;
  }
  return [...current, option];
}

export default function EverydayLifePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const questionCount = useMemo(
    () => SECTIONS.reduce((count, section) => count + section.questions.length, 0),
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
    setAnswers((prev) => {
      const current = prev[questionId] ?? [];
      return {
        ...prev,
        [questionId]: toggleOption(current, option),
      };
    });
  };

  return (
    <div className="bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center min-h-screen flex sm:items-center items-start justify-center px-3 sm:px-4 py-5 sm:py-6">
      <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-white/10 rounded-2xl md:shadow-2xl">
        <CardContent className="flex flex-col md:gap-6 gap-3 sm:p-10 px-3">
          <div className="text-left text-white w-full">
            <Link href="/auth/onboarding/partner-attributes">
              <ChevronLeft size={24} />
            </Link>
          </div>

          <div className="mb-2 w-full">
            <p className="text-xs text-gray-300 mb-2 text-left">
              Step 7 of 8
            </p>
            <Progress value={90} className="h-2" />
          </div>

          <h1 className="text-[24px] font-serif text-white font-normal leading-snug text-left">
            Everyday Life
          </h1>

            <div
              className="space-y-4 max-h-[55vh] overflow-y-auto pr-1 scroll-smooth [scrollbar-width:thin] [scrollbar-color:#C8A851_#1A1A1A22] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#1A1A1A22] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,#964400_0%,#F3D35D_50%,#8C4202_100%)] [&::-webkit-scrollbar-thumb:hover]:bg-[linear-gradient(180deg,#8C4202_0%,#F3D35D_50%,#964400_100%)]"
            >
              {SECTIONS.map((section) => (
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
                      const limitReached = selected.length >= MAX_PER_QUESTION;
                      return (
                        <div key={question.id}>
                          <p className="text-sm sm:text-base font-medium text-[#1A1A1A] mb-2">
                            {question.prompt}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {question.options.map((option) => {
                              const isActive = selected.includes(option);
                              const isDisabled = !isActive && limitReached;
                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => onToggleAnswer(question.id, option)}
                                  disabled={isDisabled}
                                  className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm transition ${isActive
                                      ? "border-[#C8A851] bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold"
                                      : "border-black/15 bg-white text-[#1A1A1A]"
                                    } ${isDisabled ? "opacity-45 cursor-not-allowed" : "cursor-pointer hover:border-[#C8A851]"}`}
                                >
                                  {option}
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
            onClick={() => router.push("/auth/onboarding/profile")}
            className="cursor-pointer mt-1 w-full h-[52px] text-base text-[#913C01] font-semibold bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] hover:opacity-90"
          >
            Continue
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/auth/onboarding/profile")}
            className="cursor-pointer text-base bg-transparent hover:bg-transparent text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            Skip for now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

