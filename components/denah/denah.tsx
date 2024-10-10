import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import CSS untuk Leaflet
import L, { Icon } from "leaflet";

// Ikon marker custom
const markerIcon: Icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Denah: React.FC = () => {
  const position: [number, number] = [-7.149576801329801, 110.29685356062552]; // Koordinat lokasi

  return (
    <>
      <h1 className="text-[#3C5480] md:text-3xl text-xl mt-4 font-medium text-center">
        Titik Rumah <span className="font-bold">Digital</span>
      </h1>
      <div className="flex flex-col items-center mt-8">
        <div className="bg-white md:px-36 px-4 py-8 rounded-2xl shadow-2xl w-full h-[500px]"> {/* Pastikan ukuran sesuai */}
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
