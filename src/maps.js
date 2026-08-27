let mapsPromise = null;

export function loadGoogleMaps() {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!key) {
    return Promise.reject(
      new Error(
        "Google Maps API key is not configured. Add VITE_GOOGLE_MAPS_API_KEY to Vercel."
      )
    );
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (mapsPromise) {
    return mapsPromise;
  }

  mapsPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(
      "sendit-google-maps"
    );

    if (existing) {
      existing.addEventListener(
        "load",
        () => {
          if (window.google?.maps) {
            resolve(window.google.maps);
          } else {
            reject(
              new Error(
                "Google Maps loaded but is unavailable."
              )
            );
          }
        },
        { once: true }
      );

      existing.addEventListener(
        "error",
        () =>
          reject(
            new Error("Google Maps failed to load.")
          ),
        { once: true }
      );

      return;
    }

    const script = document.createElement("script");

    script.id = "sendit-google-maps";

    script.src =
      "https://maps.googleapis.com/maps/api/js?" +
      `key=${encodeURIComponent(key)}` +
      "&libraries=geometry" +
      "&loading=async";

    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google?.maps) {
        resolve(window.google.maps);
      } else {
        reject(
          new Error(
            "Google Maps loaded but the Maps API is unavailable."
          )
        );
      }
    };

    script.onerror = () => {
      reject(
        new Error(
          "Google Maps failed to load. Check your API key and Google Cloud APIs."
        )
      );
    };

    document.head.appendChild(script);
  });

  return mapsPromise;
}

export async function geocodeAddress(address) {
  if (!address) {
    throw new Error("An address is required.");
  }

  const maps = await loadGoogleMaps();

  const geocoder = new maps.Geocoder();

  const response = await geocoder.geocode({
    address,
  });

  if (
    !response.results ||
    response.results.length === 0
  ) {
    throw new Error(
      `Could not find location: ${address}`
    );
  }

  const result = response.results[0];

  const location = result.geometry.location;

  return {
    lat: location.lat(),
    lng: location.lng(),
    formatted: result.formatted_address,
  };
}

export async function calculateRoute(
  origin,
  destination
) {
  const maps = await loadGoogleMaps();

  const service = new maps.DirectionsService();

  const result = await service.route({
    origin,
    destination,

    travelMode: maps.TravelMode.DRIVING,

    drivingOptions: {
      departureTime: new Date(),
      trafficModel: "bestguess",
    },
  });

  const route = result.routes?.[0];

  const leg = route?.legs?.[0];

  if (!route || !leg) {
    throw new Error(
      "No driving route was found."
    );
  }

  return {
    result,

    distanceKm: leg.distance?.value
      ? leg.distance.value / 1000
      : null,

    duration:
      leg.duration_in_traffic?.text ||
      leg.duration?.text ||
      null,
  };
}