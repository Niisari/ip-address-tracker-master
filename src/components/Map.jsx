import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Polygon,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

function Map({ center }) {
  const polygonCoordinates = [
    [center[0] + 0.005, center[1] - 0.01],
    [center[0] - 0.005, center[1] - 0.01],
    [center[0], center[1] + 0.01],
  ];

  return (
    <div className="map__wrapper">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="leaflet__container--override"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap center={center} />
        <Circle center={center} radius={500} pathOptions={{ color: "blue" }} />
        <Polygon
          positions={polygonCoordinates}
          pathOptions={{ color: "purple" }}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
