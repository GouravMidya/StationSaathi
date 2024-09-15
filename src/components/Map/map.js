import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import RoutingMachine from 'react-leaflet-routing-machine';

// Define a simple custom icon using SVG
const createCustomIcon = (color) => new L.DivIcon({
  html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
  </svg>`,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const platformIcon = createCustomIcon('#FF0000');
const facilityIcon = createCustomIcon('#00FF00');
const exitIcon = createCustomIcon('#FFA500');

// Sample POI data
const pointsOfInterest = [
  { id: 1, name: "Platform 1", type: "Platform", position: [19.19580749981172, 72.99722300742985], icon: platformIcon },
  { id: 2, name: "Ticket Counter", type: "Facility", position: [19.195198053795522, 72.99629677278443], icon: facilityIcon },
  { id: 4, name: "West Main Entrance", type: "Access Point", position: [19.194351878878237, 72.99489849133272], icon: exitIcon },
  { id: 5, name: "East Main Entrance", type: "Access Point", position: [19.1961, 72.9985], icon: exitIcon },
];

// LineString route
const route1Coordinates = [
  [19.194351878878237, 72.99489849133272], // West Main Entrance
  [19.194251698613556, 72.99520230660733], // point 1
  [19.195154850427244, 72.99640347714117], //point 2
  [19.195198053795522, 72.99629677278443]  // Ticket Counter
];

const route2Coordinates = [
  [19.195198053795522, 72.99629677278443],  // Start from Ticket Counter
  [19.195154850427244, 72.99640347714117],  //point 2
  [19.19580749981172, 72.99722300742985],  // platform 1
];

// RoutingMachine component that renders the route between two points
const Routing = ({ from, to }) => {
  if (!from || !to) return null;
  console.log("routing from " + from+" to " + to);
  
  return (
    <RoutingMachine
      waypoints={[
        L.latLng(from[0], from[1]),
        L.latLng(to[0], to[1])
      ]}
      lineOptions={{ styles: [{ color: 'red', weight: 4 }] }}
    />
  );
};

function CustMap({ from, to }) {
  return (
    <MapContainer
      center={[19.1952, 72.9963]}
      zoom={18}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {pointsOfInterest.map((poi) => (
        <Marker key={poi.id} position={poi.position} icon={poi.icon}>
          <Popup>
            <strong>{poi.name}</strong><br />
            Type: {poi.type}
          </Popup>
        </Marker>
      ))}

      {/* Display predefined routes */}
      <Polyline positions={route1Coordinates} color="blue" weight={5} />
      <Polyline positions={route2Coordinates} color="blue" weight={5} />

      {/* Display route between from and to points using RoutingMachine */}
      <Routing from={from} to={to} />
    </MapContainer>
  );
}

export default CustMap;
