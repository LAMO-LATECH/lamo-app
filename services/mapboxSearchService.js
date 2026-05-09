import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1";
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

let sessionToken = uuidv4();

export function generateSessionToken() {
  sessionToken = uuidv4();
}

export function resetSessionToken() {
  sessionToken = uuidv4();
}

export function getSessionToken() {
  return sessionToken;
}

export async function fetchSuggestions(query, options = {}) {
  if (!query || query.length < 2) return [];

  const params = new URLSearchParams({
    q: query,
    access_token: ACCESS_TOKEN,
    session_token: sessionToken,
    language: "en",
    limit: "5",
  });

  if (options.proximity) {
    params.set("proximity", options.proximity);
  }

  const response = await fetch(`${BASE_URL}/suggest?${params}`);
  if (!response.ok) {
    throw new Error(`Mapbox suggest failed: ${response.status}`);
  }

  const data = await response.json();
  console.log("[Mapbox suggest]", JSON.stringify(data, null, 2));
  return (data.suggestions ?? []).map((s) => ({
    mapboxId: s.mapbox_id,
    name: s.name,
    fullAddress: s.full_address ?? s.place_formatted ?? "",
  }));
}

export async function retrievePlace(mapboxId) {
  const params = new URLSearchParams({
    access_token: ACCESS_TOKEN,
    session_token: sessionToken,
  });

  const response = await fetch(`${BASE_URL}/retrieve/${mapboxId}?${params}`);
  if (!response.ok) {
    throw new Error(`Mapbox retrieve failed: ${response.status}`);
  }

  const data = await response.json();
  console.log("[Mapbox retrieve]", JSON.stringify(data, null, 2));
  const feature = data.features?.[0];
  if (!feature) throw new Error("No place found");

  const [longitude, latitude] = feature.geometry.coordinates;

  resetSessionToken();

  return {
    mapboxId,
    name: feature.properties.name,
    fullAddress:
      feature.properties.full_address ??
      feature.properties.place_formatted ??
      "",
    coordinates: { latitude, longitude },
  };
}
