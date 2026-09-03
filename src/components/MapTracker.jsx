import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { calculateRoute } from "../maps";


// Fix Leaflet marker icons when using Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});


export default function MapTracker({
  pickup,
  destination,
  current,
  onRoute,
  live = false,
}) {
  const [route, setRoute] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const routeStart = current || pickup;

  useEffect(() => {
    let cancelled = false;

    async function loadRoute() {
      if (!routeStart || !destination) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const result = await calculateRoute(
          routeStart,
          destination
        );

        if (cancelled) return;

        setRoute(result);

        onRoute?.({
          distanceKm: result.distanceKm,
          duration: result.duration,
        });
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Unable to load route."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRoute();

    return () => {
      cancelled = true;
    };
  }, [
    routeStart?.lat,
    routeStart?.lng,
    destination?.lat,
    destination?.lng,
  ]);


  if (!pickup || !destination) {
    return (
      <div className="map-placeholder">
        <div className="map-label">
          Location information is not available.
        </div>
      </div>
    );
  }


  const center = current || pickup;


  return (
    <div className="live-map-wrap">

      <MapContainer
        center={[center.lat, center.lng]}
        zoom={7}
        scrollWheelZoom={true}
        className="live-map"
      >

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        <Marker
          position={[pickup.lat, pickup.lng]}
        >
          <Popup>
            <strong>Pickup</strong>
          </Popup>
        </Marker>


        <Marker
          position={[
            destination.lat,
            destination.lng,
          ]}
        >
          <Popup>
            <strong>Destination</strong>
          </Popup>
        </Marker>


        {current && (
          <Marker
            position={[
              current.lat,
              current.lng,
            ]}
          >
            <Popup>
              <strong>Current Parcel Location</strong>
            </Popup>
          </Marker>
        )}


        {route?.geometry?.coordinates && (
          <Polyline
            positions={route.geometry.coordinates.map(
              ([lng, lat]) => [lat, lng]
            )}
            pathOptions={{
              weight: 5,
            }}
          />
        )}


        <MapBounds
          pickup={pickup}
          destination={destination}
          current={current}
        />

      </MapContainer>


      {loading && (
        <div className="map-status">
          Calculating route...
        </div>
      )}


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


function MapBounds({
  pickup,
  destination,
  current,
}) {
  const map = useMap();

  useEffect(() => {
    const points = [
      pickup,
      destination,
      current,
    ].filter(Boolean);

    if (!points.length) return;

    const bounds = L.latLngBounds(
      points.map((point) => [
        point.lat,
        point.lng,
      ])
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
    });

  }, [
    map,
    pickup?.lat,
    pickup?.lng,
    destination?.lat,
    destination?.lng,
    current?.lat,
    current?.lng,
  ]);

  return null;
}