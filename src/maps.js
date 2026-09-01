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
