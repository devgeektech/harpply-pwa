import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Baby,
  CalendarDays,
  CircleHelp,
  Compass,
  Film,
  Heart,
  Home,
  MessageCircle,
  Music,
  Palette,
  Plane,
  Sparkles,
  Trophy,
  UtensilsCrossed,
  UsersRound,
  Zap,
} from "lucide-react";

/** Option shown in UI (`label`); `value` is what you persist (DB/API). */
export type EverydayOption = {
  value: string;
  label: string;
};

type EverydayQuestion = {
  id: string;
  prompt: string;
  options: readonly EverydayOption[];
};

type EverydaySection = {
  id: string;
  title: string;
  emoji: string;
  questions: readonly EverydayQuestion[];
};

const o = (value: string, label: string): EverydayOption => ({ value, label });

/**
 * These questions allow up to 3 selections. All other everyday-life questions allow 1 only.
 * IDs match `EverydayQuestion.id` below.
 */
export const EVERYDAY_MULTI_SELECT_MAX3_QUESTION_IDS = [
  "freeTime",
  "musicTaste",
  "sportsPlayOrFollow",
  "fitnessLifestyle",
  "recharge",
  "communicationStyle",
  "favoriteFood",
  "travelerType",
  "travelStyle",
  "perfectNightIn",
  "showsOrMovies",
  "dayToDay",
] as const;

export type EverydayMultiSelectMax3QuestionId =
  (typeof EVERYDAY_MULTI_SELECT_MAX3_QUESTION_IDS)[number];

const MULTI_SELECT_SET = new Set<string>(EVERYDAY_MULTI_SELECT_MAX3_QUESTION_IDS);

export function getEverydayQuestionMaxSelections(questionId: string): 1 | 3 {
  return MULTI_SELECT_SET.has(questionId) ? 3 : 1;
}

export const EVERYDAY_QUESTIONS: readonly EverydaySection[] = [
  {
    id: "relationship-history",
    title: "Relationship History",
    emoji: "💍",
    questions: [
      {
        id: "relationshipHistory",
        prompt: "What is your relationship history?",
        options: [
          o("never_married", "Never married"),
          o("divorced", "Divorced"),
          o("widowed", "Widowed"),
          o("prefer_not_to_say", "Prefer not to say"),
        ],
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
        options: [o("yes", "Yes"), o("no", "No")],
      },
      {
        id: "wantChildren",
        prompt: "Do you want children?",
        options: [
          o("yes", "Yes"),
          o("yes_open_to_adoption", "Yes — open to adoption"),
          o("maybe", "Maybe"),
          o("not_right_now", "Not right now"),
          o("no", "No"),
        ],
      },
      {
        id: "openToPartnerWithChildren",
        prompt: "Open to dating someone with children?",
        options: [
          o("yes", "Yes"),
          o("maybe", "Maybe"),
          o("need_to_discuss", "Need to discuss it"),
          o("no", "No"),
        ],
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
          o("reading", "Reading"),
          o("writing", "Writing"),
          o("cooking", "Cooking"),
          o("baking", "Baking"),
          o("gardening", "Gardening"),
          o("photography", "Photography"),
          o("painting", "Painting"),
          o("drawing", "Drawing"),
          o("crafting", "Crafting"),
          o("diy_projects", "DIY projects"),
          o("woodworking", "Woodworking"),
          o("playing_an_instrument", "Playing an instrument"),
          o("singing", "Singing"),
          o("volunteering", "Volunteering"),
          o("mentoring", "Mentoring"),
          o("board_games", "Board games"),
          o("puzzles", "Puzzles"),
          o("fishing", "Fishing"),
          o("hunting", "Hunting"),
          o("hiking", "Hiking"),
          o("traveling", "Traveling"),
          o("shopping", "Shopping"),
          o("attending_local_events", "Attending local events"),
          o("going_to_the_gym", "Going to the gym"),
          o("running", "Running"),
          o("cycling", "Cycling"),
          o("swimming", "Swimming"),
          o("dancing", "Dancing"),
          o("watching_sports", "Watching sports"),
          o("playing_sports", "Playing sports"),
          o("going_to_concerts", "Going to concerts"),
          o("trying_new_restaurants", "Trying new restaurants"),
          o("road_trips", "Road trips"),
          o("spending_time_with_family", "Spending time with family"),
          o("thrifting", "Thrifting"),
          o("journaling", "Journaling"),
          o("content_creation", "Content creation"),
          o("gaming", "Gaming"),
          o("other", "Other"),
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
          o("contemporary_christian", "Contemporary Christian"),
          o("gospel", "Gospel"),
          o("hymns", "Hymns"),
          o("worship_and_praise", "Worship and praise"),
          o("r_and_b", "R&B"),
          o("soul", "Soul"),
          o("country", "Country"),
          o("hip_hop", "Hip-Hop"),
          o("classical", "Classical"),
          o("jazz", "Jazz"),
          o("blues", "Blues"),
          o("pop", "Pop"),
          o("rock", "Rock"),
          o("indie", "Indie"),
          o("alternative", "Alternative"),
          o("latin", "Latin"),
          o("reggae", "Reggae"),
          o("folk", "Folk"),
          o("bluegrass", "Bluegrass"),
          o("instrumental", "Instrumental"),
          o("soundtracks", "Soundtracks"),
          o("oldies_and_motown", "Oldies and Motown"),
          o("electronic", "Electronic"),
          o("other", "Other"),
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
          o("football", "Football"),
          o("basketball", "Basketball"),
          o("baseball", "Baseball"),
          o("softball", "Softball"),
          o("soccer", "Soccer"),
          o("tennis", "Tennis"),
          o("golf", "Golf"),
          o("hockey", "Hockey"),
          o("mma", "MMA"),
          o("boxing", "Boxing"),
          o("kickboxing", "Kickboxing"),
          o("wrestling", "Wrestling"),
          o("motorsports", "Motorsports"),
          o("olympics", "Olympics"),
          o("college_sports", "College sports"),
          o("track_and_field", "Track and field"),
          o("gymnastics", "Gymnastics"),
          o("figure_skating", "Figure skating"),
          o("surfing", "Surfing"),
          o("skateboarding", "Skateboarding"),
          o("snowboarding", "Snowboarding"),
          o("skiing", "Skiing"),
          o("lacrosse", "Lacrosse"),
          o("rugby", "Rugby"),
          o("cricket", "Cricket"),
          o("volleyball", "Volleyball"),
          o("pickleball", "Pickleball"),
          o("swimming", "Swimming"),
          o("cycling", "Cycling"),
          o("running", "Running"),
          o("bowling", "Bowling"),
          o("billiards", "Billiards"),
          o("backyard_games", "Backyard games"),
          o("rock_climbing", "Rock climbing"),
          o("martial_arts", "Martial arts"),
          o("crossfit", "CrossFit"),
          o("rowing", "Rowing"),
          o("badminton", "Badminton"),
          o("ping_pong", "Ping pong"),
          o("disc_golf", "Disc golf"),
          o("flag_football", "Flag football"),
          o("sand_volleyball", "Sand volleyball"),
          o("bodybuilding", "Bodybuilding"),
          o("esports", "Esports"),
          o("not_really_into_sports", "Not really into sports"),
          o("other", "Other"),
        ],
      },
      {
        id: "fitnessLifestyle",
        prompt: "What is your fitness lifestyle?",
        options: [
          o("gym_regularly", "Gym regularly"),
          o("running", "Running"),
          o("hiking", "Hiking"),
          o("cycling", "Cycling"),
          o("swimming", "Swimming"),
          o("home_workouts", "Home workouts"),
          o("team_sports", "Team sports"),
          o("outdoor_adventures", "Outdoor adventures"),
          o("stretching", "Stretching"),
          o("still_building_a_routine", "Still building a routine"),
          o("other", "Other"),
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
          o("alone_time", "Alone time"),
          o("friends_or_family", "Friends or family"),
          o("nature", "Nature"),
          o("worship_and_prayer", "Worship and prayer"),
          o("napping", "Napping"),
          o("long_drive", "Long drive"),
          o("reading", "Reading"),
          o("a_good_project", "A good project"),
          o("exercise", "Exercise"),
          o("cooking", "Cooking"),
          o("other", "Other"),
        ],
      },
      {
        id: "communicationStyle",
        prompt: "What is your communication style?",
        options: [
          o("direct", "Direct"),
          o("thoughtful", "Thoughtful"),
          o("expressive", "Expressive"),
          o("humorous", "Humorous"),
          o("good_listener", "Good listener"),
          o("depends_on_the_moment", "Depends on the moment"),
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
          o("soul_food", "Soul food"),
          o("southern_cooking", "Southern cooking"),
          o("american", "American"),
          o("italian", "Italian"),
          o("mexican", "Mexican"),
          o("caribbean", "Caribbean"),
          o("african", "African"),
          o("asian", "Asian"),
          o("mediterranean", "Mediterranean"),
          o("middle_eastern", "Middle Eastern"),
          o("seafood", "Seafood"),
          o("barbecue", "Barbecue"),
          o("comfort_food", "Comfort food"),
          o("breakfast_all_day", "Breakfast all day"),
          o("healthy_eating", "Healthy eating"),
          o("plant_based", "Plant-based"),
          o("other", "Other"),
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
          o("beach", "Beach"),
          o("mountains", "Mountains"),
          o("city_exploration", "City exploration"),
          o("road_trips", "Road trips"),
          o("international", "International"),
          o("cruises", "Cruises"),
          o("historical_sites", "Historical sites"),
          o("food_travel", "Food travel"),
          o("mission_trips", "Mission trips"),
          o("family_visits", "Family visits"),
          o("staycations", "Staycations"),
          o("other", "Other"),
        ],
      },
      {
        id: "travelStyle",
        prompt: "How do you travel best?",
        options: [
          o("fully_planned", "Fully planned"),
          o("spontaneous", "Spontaneous"),
          o("slow_and_deep", "Slow and deep"),
          o("flexible_balance", "Flexible balance"),
          o("whatever_is_affordable", "Whatever is affordable"),
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
          o("home_cooked_meal", "Home-cooked meal"),
          o("movie_or_series", "Movie or series"),
          o("reading", "Reading"),
          o("board_games", "Board games"),
          o("good_conversation", "Good conversation"),
          o("worship_music", "Worship music"),
          o("a_creative_project", "A creative project"),
          o("gaming", "Gaming"),
          o("baking", "Baking"),
          o("just_resting", "Just resting"),
          o("other", "Other"),
        ],
      },
      {
        id: "showsOrMovies",
        prompt: "What kind of shows or movies do you enjoy?",
        options: [
          o("faith_based_films", "Faith-based films"),
          o("documentaries", "Documentaries"),
          o("family_films", "Family films"),
          o("comedies", "Comedies"),
          o("dramas", "Dramas"),
          o("musicals", "Musicals"),
          o("action_and_adventure", "Action and adventure"),
          o("historical", "Historical"),
          o("animated", "Animated"),
          o("sports_docs", "Sports docs"),
          o("true_crime", "True crime"),
          o("nature_and_wildlife", "Nature and wildlife"),
          o("other", "Other"),
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
          o("busy_and_driven", "Busy and driven"),
          o("balanced", "Balanced"),
          o("laid_back", "Laid back"),
          o("routine_oriented", "Routine-oriented"),
          o("in_transition", "In transition"),
          o("building_and_focused", "Building and focused"),
        ],
      },
    ],
  },
];

/** Lucide icon per `EverydayQuestion.id` — reuse on profile, onboarding, etc. */
export const EVERYDAY_QUESTION_ICONS: Partial<Record<string, LucideIcon>> = {
  relationshipHistory: Heart,
  haveChildren: Baby,
  wantChildren: Sparkles,
  openToPartnerWithChildren: UsersRound,
  freeTime: Palette,
  musicTaste: Music,
  sportsPlayOrFollow: Trophy,
  fitnessLifestyle: Activity,
  recharge: Zap,
  communicationStyle: MessageCircle,
  favoriteFood: UtensilsCrossed,
  travelerType: Plane,
  travelStyle: Compass,
  perfectNightIn: Home,
  showsOrMovies: Film,
  dayToDay: CalendarDays,
};

export function getEverydayQuestionLucideIcon(questionId: string): LucideIcon {
  return EVERYDAY_QUESTION_ICONS[questionId] ?? CircleHelp;
}

export type EverydayLifeReviewItem = {
  prompt: string;
  answerText: string;
  /** Stable id for icons / analytics (matches `EverydayQuestion.id`). */
  questionId: string;
};

/** Review rows: only questions with at least one saved value; values shown as option labels. */
export function getEverydayLifeReviewItems(
  answers: Record<string, string[]>
): EverydayLifeReviewItem[] {
  const items: EverydayLifeReviewItem[] = [];
  for (const section of EVERYDAY_QUESTIONS) {
    for (const q of section.questions) {
      const vals = answers[q.id];
      if (!vals?.length) continue;
      const labels = vals.map((v) => {
        const opt = q.options.find((o) => o.value === v);
        return opt?.label ?? v;
      });
      items.push({
        prompt: q.prompt,
        answerText: labels.join(", "),
        questionId: q.id,
      });
    }
  }
  return items;
}
