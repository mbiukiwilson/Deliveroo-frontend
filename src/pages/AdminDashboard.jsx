import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";
import { t } from "../i18n";

export default function AdminDashboard() {
  const user = useSelector((state) => state.auth.user);
  const { language } = useSelector((state) => state.preferences);
  const [parcels, setParcels] = useState([]);
  const [error, setError] = useState("");
  const watchId = useRef(null);
  const activeParcel = useRef(null);