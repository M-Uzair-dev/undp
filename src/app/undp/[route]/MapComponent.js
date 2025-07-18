"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix marker icon issue with Leaflet in Next.js
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -48],
});

export default function MapComponent({ lat, lng }) {
  useEffect(() => {
    // This is just to ensure leaflet CSS is loaded in Next.js
    import("leaflet/dist/leaflet.css");
  }, []);

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      scrollWheelZoom={false}
      className="w-full h-full animate-fade-in"
      style={{ minHeight: "100%", minWidth: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={markerIcon}>
        <Popup>
          <span className="font-semibold text-blue-700">Beneficiary Location</span>
        </Popup>
      </Marker>
    </MapContainer>
  );
} 