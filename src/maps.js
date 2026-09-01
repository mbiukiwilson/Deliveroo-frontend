const NOMINATIM_URL = "https://nominatim.openstreetmap.org";
const OSRM_URL = "https://router.project-osrm.org";

// Convert an address into latitude/longitude using Nominatim.

export async function geocodeAddress(address) {
if (!address?.trim()) {
throw new Error("Address is required.");
}

const url = new URL(`${NOMINATIM_URL}/search`);

url.searchParams.set("q", address.trim());
url.searchParams.set("format", "jsonv2");
url.searchParams.set("limit", "1");
url.searchParams.set("addressdetails", "1");

const response = await fetch(url.toString(), {
headers: {
Accept: "application/json",
},
});

if (!response.ok) {
throw new Error("Unable to find this address.");
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

//Calculate a driving route using OSRM.
//
//origin and destination must be:
//{ lat: number, lng: number }

export async function calculateRoute(origin, destination) {
if (!origin || !destination) {
throw new Error("Origin and destination are required.");
}

const coordinates = [
`${origin.lng},${origin.lat}`,
`${destination.lng},${destination.lat}`,
].join(";");

const url =
`${OSRM_URL}/route/v1/driving/${coordinates}` +
"?overview=full&geometries=geojson&steps=true";

const response = await fetch(url);

if (!response.ok) {
throw new Error("Unable to calculate the driving route.");
}

const data = await response.json();

if (data.code !== "Ok" || !data.routes?.length) {
throw new Error("No driving route was found.");
}

const route = data.routes[0];

return {
result: data,
geometry: route.geometry,
distanceKm: route.distance ? route.distance / 1000 : null,
duration: route.duration
? formatDuration(route.duration)
: null,
durationSeconds: route.duration ?? null,
};
}

//Convert seconds into a readable duration.
function formatDuration(seconds) {
const totalMinutes = Math.round(seconds / 60);

if (totalMinutes < 60) {
return `${totalMinutes} min`;
}

const hours = Math.floor(totalMinutes / 60);
const minutes = totalMinutes % 60;

return minutes
? `${hours} hr ${minutes} min`
: `${hours} hr`;
}
