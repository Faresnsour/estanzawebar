"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
export default function Map({ coordinates, name }: {
    coordinates: [
        number,
        number
    ];
    name: string;
}) {
    return (<MapContainer center={coordinates} zoom={15} style={{ height: "100%", width: "100%", borderRadius: "1rem", zIndex: 0 }}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"/>
      <Marker position={coordinates} icon={customIcon}>
        <Popup className="font-bold">{name}</Popup>
      </Marker>
    </MapContainer>);
}
