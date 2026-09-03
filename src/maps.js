const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";

export async function geocodeAddress(address) {
  if (!address || !address.trim()) {
    throw new Error("Please enter a location.");
  }

  const url = new URL(NOMINATIM_URL);

  url.searchParams.set("q", address.trim());
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "1");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to find that location.");
  }

  const results = await response.json();

  if (!results.length) {
    throw new Error(`Could not find location: ${address}`);
  }

  const result = results[0];

  return {
    lat: Number(result.lat),
    lng: Number(result.lon),
    formatted: result.display_name,
  };
}


export async function calculateRoute(origin, destination) {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required.");
  }

  const coordinates = [
    `${origin.lng},${origin.lat}`,
    `${destination.lng},${destination.lat}`,
  ].join(";");

  const url =
    `${OSRM_URL}/${coordinates}` +
    "?overview=full&geometries=geojson";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to calculate route.");
  }

  const data = await response.json();

  if (data.code !== "Ok" || !data.routes?.length) {
    throw new Error("No driving route was found.");
  }

  const route = data.routes[0];

  return {
    distanceKm: route.distance
      ? route.distance / 1000
      : null,

    duration: route.duration
      ? formatDuration(route.duration)
      : null,

    geometry: route.geometry,
  };
}


function formatDuration(seconds) {
  const totalMinutes = Math.round(seconds / 60);

  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${minutes} min`;
}