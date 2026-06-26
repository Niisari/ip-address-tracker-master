import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

// Mounts the invisible trigger to monitor position shifts
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

// Custom marker icon
const customLocationIcon = new L.divIcon({
  html: `
    <svg class="custom__pin--svg" xmlns="http://www.w3.org/2000/svg" width="46" height="56">
      <path fill="#000000" fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/>
    </svg>
  `,
  className: "custom__marker--icon",
  iconSize: [46, 56], // Total dimensions of the SVG box
  iconAnchor: [23, 56], // Crucial: Aligns the very bottom center point of the pin to the coordinate
  popupAnchor: [0, -50], // Offsets the tooltip balloon so it opens neatly above the loop tip
});

function Map({ center }) {
  return (
    <div className="map__wrapper">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="leaflet__container--override"
      >
        {/* The open-source satellite map style tiles layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Mounts the invisible trigger to monitor position shifts */}
        <RecenterMap center={center} />

        {/* Drops a custom pin onto the exact coordinate location */}
        <Marker position={center} icon={customLocationIcon}>
          <Popup>
            <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
              <strong>IP Target Identified</strong> <br />
              Lat: {center[0].toFixed(4)} <br />
              Lng: {center[1].toFixed(4)}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
