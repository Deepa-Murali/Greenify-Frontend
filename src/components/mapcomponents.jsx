import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = ({ setSelectedLocation }) => {
  useMapEvents({
    click(e) {
      setSelectedLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
};

const MapComponent = ({ setSelectedLocation, initialLocation }) => {
  const [markerPosition, setMarkerPosition] = useState(initialLocation);

  useEffect(() => {
    if (initialLocation) {
      setMarkerPosition(initialLocation);
    }
  }, [initialLocation]);

  return (
    <MapContainer
      center={initialLocation || [20.5937, 78.9629]}
      zoom={initialLocation ? 13 : 5}
      style={{ height: "400px", width: "100%", marginTop: "20px", borderRadius: "10px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <LocationMarker setSelectedLocation={(loc) => {
        setSelectedLocation(loc);
        setMarkerPosition(loc);
      }} />
      {markerPosition && (
        <Marker position={[markerPosition.lat, markerPosition.lng]} />
      )}
    </MapContainer>
  );
};

export default MapComponent;
