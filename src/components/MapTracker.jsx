import { useEffect, useRef, useState } from "react";
import { calculateRoute, loadGoogleMaps } from "../maps";

export default function MapTracker({ pickup, destination, current, onRoute, live = false }) {
  const mapRef = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const renderer = useRef(null);
  const [error, setError] = useState("");
