"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix marker icon issue with Leaflet in Next.js
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -48],
});

export default function MapComponent({ entryData }) {
  const [mapCenter, setMapCenter] = useState([25.831944, 66.628056]); // Default to Lasbela coordinates
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // This is just to ensure leaflet CSS is loaded in Next.js
    import("leaflet/dist/leaflet.css");
  }, []);

  useEffect(() => {
    if (entryData && entryData.location) {
      // Try to extract coordinates from location string
      // This is a simple approach - you might need to adjust based on your location format
      const locationStr = entryData.location.toLowerCase();
      
      // Default coordinates for Lasbela District
      let lat = 25.831944;
      let lng = 66.628056;
      
      // You can add more specific location mappings here
      if (locationStr.includes('lasbela')) {
        lat = 25.831944;
        lng = 66.628056;
      } else if (locationStr.includes('uthal')) {
        lat = 25.8069;
        lng = 66.6219;
      } else if (locationStr.includes('hub')) {
        lat = 25.0172;
        lng = 67.1167;
      }
      
      setMapCenter([lat, lng]);
      setShowMap(true);
    }
  }, [entryData]);

  if (!showMap) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center text-gray-600">
          <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-sm">Loading location...</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={12}
      scrollWheelZoom={false}
      className="w-full h-full animate-fade-in"
      style={{ minHeight: "100%", minWidth: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={mapCenter} icon={markerIcon}>
        <Popup>
          <div className="text-center">
            <div className="font-semibold text-blue-700 mb-1">Beneficiary Location</div>
            <div className="text-sm text-gray-600">
              {entryData?.villageName || 'Village'} • {entryData?.tehsil || 'Tehsil'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {entryData?.location || 'Location'}
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
} 