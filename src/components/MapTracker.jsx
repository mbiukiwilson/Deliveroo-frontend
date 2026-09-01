import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { calculateRoute } from "../maps";

export default function MapTracker({
pickup,
destination,
current,
onRoute,
live = false,
}) {
const mapRef = useRef(null);
const map = useRef(null);
const markers = useRef([]);
const routeLayer = useRef(null);

const [error, setError] = useState("");

useEffect(() => {
let cancelled = false;

async function draw() {
  if (!mapRef.current || !pickup || !destination) {
    return;
  }

  try {
    setError("");

    const center = current || pickup;

    //Create the Leaflet map only once.
  
    if (!map.current) {
      map.current = L.map(mapRef.current).setView(
        [center.lat, center.lng],
        7
      );

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }
      ).addTo(map.current);
    }

    if (cancelled) return;

    //Remove old markers.
    
    markers.current.forEach((marker) => {
      marker.remove();
    });

    markers.current = [];

    //Remove the previous route.

    if (routeLayer.current) {
      routeLayer.current.remove();
      routeLayer.current = null;
    }

    //Pickup marker.
    
    const pickupMarker = L.marker([
      pickup.lat,
      pickup.lng,
    ])
      .addTo(map.current)
      .bindPopup("Pickup");

    markers.current.push(pickupMarker);

    //Destination marker.
    
    const destinationMarker = L.marker([
      destination.lat,
      destination.lng,
    ])
      .addTo(map.current)
      .bindPopup("Destination");

    markers.current.push(destinationMarker);

    //Current parcel location marker.
    
    if (current) {
      const currentMarker = L.marker([
        current.lat,
        current.lng,
      ])
        .addTo(map.current)
        .bindPopup("Current parcel location");

      markers.current.push(currentMarker);
    }

    
    //Calculate driving route.
    
    const route = await calculateRoute(
      current || pickup,
      destination
    );

    if (cancelled) return;

    //Draw the OSRM GeoJSON route on the Leaflet map.
    
    routeLayer.current = L.geoJSON(route.geometry, {
      style: {
        weight: 5,
      },
    }).addTo(map.current);

    //Send route information back to the parent component.
    
    onRoute?.({
      distanceKm: route.distanceKm,
      duration: route.duration,
    });

    //Fit the map around pickup, destination,current location and route.
    
    const points = [
      [pickup.lat, pickup.lng],
      [destination.lat, destination.lng],
    ];

    if (current) {
      points.push([current.lat, current.lng]);
    }

    const bounds = L.latLngBounds(points);

    if (routeLayer.current) {
      bounds.extend(routeLayer.current.getBounds());
    }

    map.current.fitBounds(bounds, {
      padding: [40, 40],
    });
  } catch (err) {
    if (!cancelled) {
      setError(err.message || "Map unavailable.");
    }
  }
}

draw();

return () => {
  cancelled = true;
};

}, [
pickup?.lat,
pickup?.lng,
destination?.lat,
destination?.lng,
current?.lat,
current?.lng,
]);

//Clean up the Leaflet map when the component is removed from the page.

  useEffect(() => {
  return () => {
  if (map.current) {
  map.current.remove();
  map.current = null;
  }
  };
  }, []);

return ( <div className="live-map-wrap"> <div
     ref={mapRef}
     className="live-map"
     aria-label="Parcel route map"
   />

  {error && (
    <div className="map-error">
      {error}
    </div>
  )}

  {live && !error && (
    <div className="live-badge">
      ● LIVE GPS
    </div>
  )}
</div>

);
}
