import { useEffect, useRef, useState } from "react";
import { calculateRoute, loadGoogleMaps } from "../maps";

export default function MapTracker({ pickup, destination, current, onRoute, live = false }) {
  const mapRef = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const renderer = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function draw() {
      if (!mapRef.current || !pickup || !destination) return;
      try {
        const maps = await loadGoogleMaps();
        if (cancelled) return;
        const center = current || pickup;
        if (!map.current) {
          map.current = new maps.Map(mapRef.current, {
            center,
            zoom: 7,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          });
        }
        markers.current.forEach((m) => m.setMap(null));
        markers.current = [];

        const places = [
          { position: pickup, label: "P", title: "Pickup" },
          { position: destination, label: "D", title: "Destination" },
        ];
        if (current) places.push({ position: current, label: "●", title: "Current parcel location" });
        places.forEach((item) => {
          const marker = new maps.Marker({ map: map.current, position: item.position, label: item.label, title: item.title });
          markers.current.push(marker);
        });

        const route = await calculateRoute(current || pickup, destination);
        if (cancelled) return;
        if (!renderer.current) renderer.current = new maps.DirectionsRenderer({ map: map.current, suppressMarkers: true });
        renderer.current.setDirections(route.result);
        onRoute?.({ distanceKm: route.distanceKm, duration: route.duration });

        const bounds = new maps.LatLngBounds();
        [pickup, destination, current].filter(Boolean).forEach((point) => bounds.extend(point));
        map.current.fitBounds(bounds, 60);
      } catch (err) {
        if (!cancelled) setError(err.message || "Map unavailable.");
      }
    }
    draw();
    return () => { cancelled = true; };
  }, [pickup?.lat, pickup?.lng, destination?.lat, destination?.lng, current?.lat, current?.lng]);