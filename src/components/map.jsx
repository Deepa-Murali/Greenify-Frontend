import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function MapView() {
  const [viewport, setViewport] = useState({
    latitude: 12.9716, // You can change this to your default city
    longitude: 77.5946,
    zoom: 100,
    width: '5000%',
    height: '400px',
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="YOUR_MAPBOX_ACCESS_TOKEN"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
}

export default MapView;
