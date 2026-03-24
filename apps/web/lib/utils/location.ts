const US_STATE_TO_CODE: Record<string, string> = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
  "District of Columbia": "DC",
};

type ReverseAddress = {
  city?: string;
  municipality?: string;
  town?: string;
  village?: string;
  hamlet?: string;
  suburb?: string;
  state?: string;
  state_code?: string;
  province?: string;
  region?: string;
  county?: string;
  state_district?: string;
  "ISO3166-2-lvl4"?: string;
  "ISO3166-2-lvl6"?: string;
};

function toStateCode(
  state: string,
  stateCode?: string,
  iso3166Lvl4?: string,
  iso3166Lvl6?: string
): string {
  const direct = (stateCode ?? "").trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(direct)) return direct;
  const isoRaw = (iso3166Lvl4 ?? iso3166Lvl6 ?? "").trim().toUpperCase();
  if (isoRaw) {
    const parts = isoRaw.split("-");
    const suffix = parts[parts.length - 1]?.trim();
    if (suffix && /^[A-Z0-9]{2,3}$/.test(suffix)) return suffix;
  }
  return US_STATE_TO_CODE[state.trim()] ?? "";
}

function formatCityStateFromAddress(address?: ReverseAddress): string {
  const city =
    address?.city ??
    address?.municipality ??
    address?.town ??
    address?.village ??
    address?.hamlet ??
    address?.suburb ??
    address?.county ??
    "";
  const stateRaw =
    address?.state ??
    address?.province ??
    address?.region ??
    address?.state_district ??
    "";
  const stateCode = toStateCode(
    stateRaw,
    address?.state_code,
    address?.["ISO3166-2-lvl4"],
    address?.["ISO3166-2-lvl6"]
  );
  const stateOrRegion = stateCode || stateRaw;
  if (city && stateOrRegion) return `${city}, ${stateOrRegion}`;
  return "";
}

export async function reverseGeocodeCityState(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
      String(latitude)
    )}&lon=${encodeURIComponent(String(longitude))}&addressdetails=1`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return "";

    const json = (await res.json()) as { address?: ReverseAddress };
    return formatCityStateFromAddress(json?.address);
  } catch {
    return "";
  }
}

