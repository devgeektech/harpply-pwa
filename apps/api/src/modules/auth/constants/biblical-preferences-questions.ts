/* eslint-disable prettier/prettier */
/** Must match web `biblicalPreferenceQuestions` question `id` fields. */
export const BIBLICAL_PREFERENCE_QUESTION_IDS = [
  'q1',
  'q2',
  'q3',
  'q4',
  'q5',
  'q6',
  'q7',
  'q8',
  'q9',
  'q10',
] as const;

export type BiblicalPreferenceQuestionId =
  (typeof BIBLICAL_PREFERENCE_QUESTION_IDS)[number];

export const BIBLICAL_PREFERENCE_ALLOWED_ID_SET = new Set<string>(
  BIBLICAL_PREFERENCE_QUESTION_IDS,
);
