import { useEffect, useMemo, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { calculateRoute } from "../maps";

const pickupIcon = L.divIcon({
  className: "sendit-map-icon",
  html: '<span class="sendit-pin sendit-pin-pickup">P</span>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const destinationIcon = L.divIcon({
  className: "sendit-map-icon",
  html: '<span class="sendit-pin sendit-pin-destination">D</span>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const currentIcon = L.divIcon({
  className: "sendit-map-icon",
  html: '<span class="sendit-pin sendit-pin-current">●</span>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

function FitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    const valid = points.filter(Boolean).map((point) => [point.lat, point.lng]);
    if (valid.length === 1) {
      map.setView(valid[0], 13);
      return;
    }
    if (valid.length > 1) {
      map.fitBounds(valid, { padding: [40, 40] });
    }
  }, [map, points]);

  return null;
}

export default function MapTracker({
  pickup,
  destination,
  current,
  onRoute,
  live = false,
}) {
  const [route, setRoute] = useState(null);
  const [error, setError] = useState("");

  const center = current || pickup || destination || { lat: 0, lng: 0 };

  const routeLine = useMemo(() => {
    if (!route?.geometry?.coordinates) return [];
    return route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
  }, [route]);

  useEffect(() => {
    let cancelled = false;

    async function loadRoute() {
      if (!pickup || !destination) return;

      try {
        setError("");
        const result = await calculateRoute(current || pickup, destination);
        if (cancelled) return;

        setRoute(result);
        onRoute?.({
          distanceKm: result.distanceKm,
          duration: result.duration,
        });
      } catch (err) {
        if (!cancelled) setError(err.message || "Unable to calculate route.");
      }
    }

    loadRoute();
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

  return (
    <div className="live-map-wrap">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={7}
        scrollWheelZoom
        className="live-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pickup && (
          <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon}>
            <Popup>Pickup location</Popup>
          </Marker>
        )}

        {destination && (
          <Marker
            position={[destination.lat, destination.lng]}
            icon={destinationIcon}
          >
            <Popup>Destination</Popup>
          </Marker>
        )}

        {current && (
          <>
            <Marker position={[current.lat, current.lng]} icon={currentIcon}>
              <Popup>Current parcel location</Popup>
            </Marker>
            <CircleMarker
              center={[current.lat, current.lng]}
              radius={12}
              pathOptions={{ color: "#f75c1e", fillOpacity: 0.08 }}
            />
          </>
        )}

        {routeLine.length > 1 && (
          <Polyline
            positions={routeLine}
            pathOptions={{ color: "#f75c1e", weight: 5, opacity: 0.9 }}
          />
        )}

        <FitBounds points={[pickup, destination, current]} />
      </MapContainer>

      {live && !error && <div className="live-badge">● LIVE GPS</div>}
      {error && <div className="map-error">{error}</div>}
    </div>
  );
}
