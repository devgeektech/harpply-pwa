export type FaithValueItem = {
  title: string;
  desc: string;
  /** Stable key sent to the API (not display `title`). */
  value: string;
};

export const myFaithValues: FaithValueItem[] = [
  {
    value: "kindness",
    title: "Kindness",
    desc: "Compassion and helpfulness in action.",
  },
  {
    value: "forgiveness",
    title: "Forgiveness",
    desc: "A heart that lets go of resentment and seeks reconciliation.",
  },
  {
    value: "bravery-courage",
    title: "Bravery/Courage",
    desc: "Standing firm in faith despite fear.",
  },
  {
    value: "wisdom",
    title: "Wisdom",
    desc: "Discernment and the ability to apply God's word.",
  },
  {
    value: "humility",
    title: "Humility",
    desc: "Putting others before oneself.",
  },
  {
    value: "integrity",
    title: "Integrity",
    desc: "Honesty and strong moral uprightness.",
  },
  {
    value: "diligence",
    title: "Diligence",
    desc: "Hardworking and committed to one's calling.",
  },
  {
    value: "faithfulness",
    title: "Faithfulness",
    desc: "Loyalty to God and to others.",
  },
  {
    value: "gentleness",
    title: "Gentleness",
    desc: "Strength under control; a calm spirit.",
  },
  {
    value: "self-control",
    title: "Self-Control",
    desc: "Mastery over one's own desires and impulses.",
  },
  {
    value: "hospitality",
    title: "Hospitality",
    desc: "A welcoming heart and a desire to serve.",
  },
  {
    value: "joy",
    title: "Joy",
    desc: "A cheerful heart regardless of circumstances.",
  },
  {
    value: "peace",
    title: "Peace",
    desc: "A tranquil spirit that promotes harmony.",
  },
];

/** Parse API / JSON field into a list of strings (values or legacy titles). */
export function parseFaithValuesFromApi(raw: unknown): string[] {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw.filter((x): x is string => typeof x === "string");
  }
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.filter((x): x is string => typeof x === "string");
      }
    } catch {
      /* plain string */
    }
    const trimmed = raw.trim();
    return trimmed ? [trimmed] : [];
  }
  return [];
}

/** Map stored token (value slug or legacy display title) to canonical `value` for API/store. */
export function normalizeFaithValueTokenToValue(token: string): string {
  const byValue = myFaithValues.find((v) => v.value === token);
  if (byValue) return byValue.value;
  const byTitle = myFaithValues.find((v) => v.title === token);
  return byTitle?.value ?? token;
}

/** Human-readable label for profile UI (value slug or legacy title → title). */
export function faithValueLabelForStored(token: string): string {
  const byValue = myFaithValues.find((v) => v.value === token);
  if (byValue) return byValue.title;
  const byTitle = myFaithValues.find((v) => v.title === token);
  return byTitle?.title ?? token;
}

/** Comma-separated titles for identity / summary lines. */
export function formatFaithValuesForDisplay(raw: unknown): string {
  const arr = parseFaithValuesFromApi(raw);
  if (!arr.length) return "";
  return arr.map(faithValueLabelForStored).join(", ");
}
