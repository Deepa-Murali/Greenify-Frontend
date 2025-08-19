import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/427/427735.png',
  iconSize: [30, 30],
});

function LocationMarker({ setSelectedLocation }) {
  useMapEvents({
    click(e) {
      setSelectedLocation(e.latlng);
    },
  });
  return null;
}

const MapView = ({ trees, setSelectedLocation }) => {
  return (
    <MapContainer center={[20.59, 78.96]} zoom={5} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker setSelectedLocation={setSelectedLocation} />
      {trees.map((tree, index) => (
        <Marker key={index} position={tree.location} icon={customIcon}>
          <Popup>
            <strong>{tree.treeName}</strong><br />
            {tree.treeType}<br />
            <img src={tree.imageUrl} alt="tree" width="100" />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
