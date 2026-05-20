const BASE_URL = "https://api.mapbox.com/directions/v5/mapbox/driving";
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

export async function fetchDirections(origin, destination) {
  const coords = `${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}`;
  const params = new URLSearchParams({
    steps: "true",
    geometries: "geojson",
    overview: "full",
    access_token: ACCESS_TOKEN,
  });

  const response = await fetch(`${BASE_URL}/${coords}?${params}`);
  if (!response.ok) {
    throw new Error(`Mapbox directions failed: ${response.status}`);
  }

  const data = await response.json();
  const route = data.routes?.[0];
  if (!route) throw new Error("No route found");

  const steps = route.legs[0].steps.map((step) => ({
    instruction: step.maneuver.instruction,
    maneuverType: step.maneuver.type,
    maneuverModifier: step.maneuver.modifier,
    distance: step.distance,
    duration: step.duration,
    coordinate: step.maneuver.location,
  }));

  return {
    steps,
    geometry: route.geometry,
    duration: route.duration,
    distance: route.distance,
  };
}
