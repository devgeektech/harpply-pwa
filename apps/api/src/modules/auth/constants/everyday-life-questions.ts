/** Must match web `everydayLifeQuestions` question `id` fields. */
export const EVERYDAY_LIFE_QUESTION_IDS = [
  'relationshipHistory',
  'haveChildren',
  'wantChildren',
  'openToPartnerWithChildren',
  'freeTime',
  'musicTaste',
  'sportsPlayOrFollow',
  'fitnessLifestyle',
  'recharge',
  'communicationStyle',
  'favoriteFood',
  'travelerType',
  'travelStyle',
  'perfectNightIn',
  'showsOrMovies',
  'dayToDay',
] as const;

export type EverydayLifeQuestionId = (typeof EVERYDAY_LIFE_QUESTION_IDS)[number];

/** Questions where up to 3 options may be selected. */
export const EVERYDAY_LIFE_MULTI_MAX3_IDS = new Set<string>([
  'freeTime',
  'musicTaste',
  'sportsPlayOrFollow',
  'fitnessLifestyle',
  'recharge',
  'communicationStyle',
  'favoriteFood',
  'travelerType',
  'travelStyle',
  'perfectNightIn',
  'showsOrMovies',
  'dayToDay',
]);

export const EVERYDAY_LIFE_ALLOWED_ID_SET = new Set<string>(
  EVERYDAY_LIFE_QUESTION_IDS,
);
