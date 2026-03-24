export type FaithValueItem = {
  title: string;
  desc: string;
  /** Stable key sent to the API (not display `title`). */
  value: string;
};

export const attributeValues: FaithValueItem[] = [
  {
    value: "brave",
    title: "Brave",
    desc: "",
  },
  {
    value: "wise",
    title: "Wise",
    desc: "",
  },
  {
    value: "patient",
    title: "Patient",
    desc: "",
  },
  {
    value: "humble",
    title: "Humble",
    desc: "",
  },
  {
    value: "bold",
    title: "Bold",
    desc: "",
  },
  {
    value: "strategic",
    title: "Strategic",
    desc: "",
  },
  {
    value: "passionate",
    title: "Passionate",
    desc: "",
  },
  {
    value: "creative",
    title: "Creative",
    desc: "",
  },
  {
    value: "determined",
    title: "Determined",
    desc: "",
  },
  {
    value: "optimistic",
    title: "Optimistic",
    desc: "",
  },
  {
    value: "disciplined",
    title: "Disciplined",
    desc: "",
  },
  {
    value: "leader",
    title: "Leader",
    desc: "",
  },
  {
    value: "faithful",
    title: "Faithful",
    desc: "",
  },
  {
    value: "loyal",
    title: "Loyal",
    desc: "",
  },
  {
    value: "hospitable",
    title: "Hospitable",
    desc: "",
  },
  {
    value: "nurturing",
    title: "Nurturing",
    desc: "",
  },
  {
    value: "graceful",
    title: "Graceful",
    desc: "",
  },
  {
    value: "discerning",
    title: "Discerning",
    desc: "",
  },
  {
    value: "resilient",
    title: "Resilient",
    desc: "",
  },
  {
    value: "compassionate",
    title: "Compassionate",
    desc: "",
  },
  {
    value: "resourceful",
    title: "Resourceful",
    desc: "",
  },
  {
    value: "zealous",
    title: "Zealous",
    desc: "",
  },
  {
    value: "prayerful",
    title: "Prayerful",
    desc: "",
  },
  {
    value: "forgiving",
    title: "Forgiving",
    desc: "",
  },
  {
    value: "sincere",
    title: "Sincere",
    desc: "",
  },
  {
    value: "gentle",
    title: "Gentle",
    desc: "",
  },
  {
    value: "self-controlled",
    title: "Self-controlled",
    desc: "",
  },
  {
    value: "joyful",
    title: "Joyful",
    desc: "",
  },
  {
    value: "peaceful",
    title: "Peaceful",
    desc: "",
  },
  {
    value: "merciful",
    title: "Merciful",
    desc: "",
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
  const byValue = attributeValues.find((v) => v.value === token);
  if (byValue) return byValue.value;
  const byTitle = attributeValues.find((v) => v.title === token);
  return byTitle?.value ?? token;
}

/** Human-readable label for profile UI (value slug or legacy title → title). */
export function faithValueLabelForStored(token: string): string {
  const byValue = attributeValues.find((v) => v.value === token);
  if (byValue) return byValue.title;
  const byTitle = attributeValues.find((v) => v.title === token);
  return byTitle?.title ?? token;
}

/** Comma-separated titles for identity / summary lines. */
export function formatFaithValuesForDisplay(raw: unknown): string {
  const arr = parseFaithValuesFromApi(raw);
  if (!arr.length) return "";
  return arr.map(faithValueLabelForStored).join(", ");
}
