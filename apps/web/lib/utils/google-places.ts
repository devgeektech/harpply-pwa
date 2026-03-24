export interface PlaceSuggestion {
  placeId: string;
  text: string;
}

type GooglePlaceAddressComponent = {
  longText?: string;
  shortText?: string;
  types?: string[];
};

const GOOGLE_PLACES_BASE_URL = "https://places.googleapis.com/v1";

function getGooglePlacesApiKey(): string {
  return (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "").trim();
}

function getComponent(
  components: GooglePlaceAddressComponent[] | undefined,
  type: string
): GooglePlaceAddressComponent | undefined {
  return components?.find((c) => c?.types?.includes(type));
}

export function formatCityStateFromGoogleAddressComponents(
  components: GooglePlaceAddressComponent[] | undefined
): string {
  if (!components?.length) return "";

  const cityComponent =
    getComponent(components, "locality") ??
    getComponent(components, "postal_town") ??
    getComponent(components, "administrative_area_level_2") ??
    getComponent(components, "sublocality") ??
    getComponent(components, "neighborhood");

  const stateComponent = getComponent(components, "administrative_area_level_1");

  const city = (cityComponent?.longText ?? cityComponent?.shortText ?? "").trim();
  const state =
    (stateComponent?.shortText ?? stateComponent?.longText ?? "").trim();

  if (!city || !state) return "";
  return `${city}, ${state}`;
}

export async function fetchGooglePlaceSuggestions(
  input: string
): Promise<PlaceSuggestion[]> {
  const query = input.trim();
  if (!query) return [];

  const apiKey = getGooglePlacesApiKey();
  if (!apiKey) return [];

  const res = await fetch(`${GOOGLE_PLACES_BASE_URL}/places:autocomplete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "suggestions.placePrediction.placeId,suggestions.placePrediction.text",
    },
    body: JSON.stringify({
      input: query,
      languageCode: "en",
    }),
  });

  if (!res.ok) return [];

  const json = (await res.json().catch(() => ({}))) as {
    suggestions?: Array<{
      placePrediction?: {
        placeId?: string;
        text?: { text?: string };
      };
    }>;
  };

  const suggestions = json?.suggestions ?? [];
  return suggestions
    .map((s) => ({
      placeId: s?.placePrediction?.placeId ?? "",
      text: s?.placePrediction?.text?.text ?? "",
    }))
    .filter((s) => Boolean(s.placeId && s.text));
}

export async function fetchCityStateFromPlaceId(placeId: string): Promise<string> {
  const id = placeId.trim();
  if (!id) return "";

  const apiKey = getGooglePlacesApiKey();
  if (!apiKey) return "";

  const res = await fetch(
    `${GOOGLE_PLACES_BASE_URL}/places/${encodeURIComponent(id)}?languageCode=en`,
    {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "addressComponents",
      },
    }
  );

  if (!res.ok) return "";

  const json = (await res.json().catch(() => ({}))) as {
    addressComponents?: GooglePlaceAddressComponent[];
  };

  return formatCityStateFromGoogleAddressComponents(json?.addressComponents);
}

