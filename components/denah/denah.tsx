import React from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import "leaflet/dist/leaflet.css"; // Import CSS for Leaflet
import L, { Icon } from "leaflet";

// Custom marker icon
const markerIcon: Icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Dynamically import the MapContainer with SSR disabled
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const Denah: React.FC = () => {
  const position: [number, number] = [-7.149576801329801, 110.29685356062552]; // Location coordinates

  return (
    <>
      <h1 className="text-[#3C5480] md:text-3xl text-xl mt-4 font-medium text-center">
        Titik Rumah <span className="font-bold">Digital</span>
      </h1>
      <div className="flex flex-col items-center mt-8">
        <div className="bg-white md:px-36 px-4 py-8 rounded-2xl shadow-2xl w-full h-[500px]"> {/* Adjust size accordingly */}
          <MapContainer 
            center={position} 
            zoom={14} 
            scrollWheelZoom={false} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIcon}>
              <Popup>
                Titik Rumah Digital di Sriwulan, Kendal.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Denah;
