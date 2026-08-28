let mapsPromise;

export function loadGoogleMaps() {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!key) return Promise.reject(new Error("VITE_GOOGLE_MAPS_API_KEY is not configured."));
  if (window.google?.maps) return Promise.resolve(window.google.maps);
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById("sendit-google-maps");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google.maps), { once: true });
      existing.addEventListener("error", () => reject(new Error("Google Maps failed to load.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = "sendit-google-maps";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = () => reject(new Error("Google Maps failed to load."));
    document.head.appendChild(script);
  });
  return mapsPromise;
}

export async function geocodeAddress(address) {
  const maps = await loadGoogleMaps();
  const geocoder = new maps.Geocoder();
  const response = await geocoder.geocode({ address });
  if (!response.results?.length) throw new Error(`Could not find location: ${address}`);
  const location = response.results[0].geometry.location;
  return { lat: location.lat(), lng: location.lng(), formatted: response.results[0].formatted_address };
}

export async function calculateRoute(origin, destination) {
  const maps = await loadGoogleMaps();
  const service = new maps.DirectionsService();
  const result = await service.route({
    origin,
    destination,
    travelMode: maps.TravelMode.DRIVING,
    drivingOptions: { departureTime: new Date(), trafficModel: "bestguess" },
  });
  const route = result.routes?.[0];
  const leg = route?.legs?.[0];
  if (!route || !leg) throw new Error("No driving route was found.");
  return {
    result,
    distanceKm: leg.distance?.value ? leg.distance.value / 1000 : null,
    duration: leg.duration_in_traffic?.text || leg.duration?.text || null,
  };
}