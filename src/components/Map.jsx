import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const center = [-23.572218119099436, -46.632395960507004];

export const Map = () => {
  return (
    <div id='map'>
        <MapContainer 
            style={{height: '100vh', width: '70vw'}} 
            center={center}
            zoom={10}
            scrollWheelZoom={false}
        >
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
        </MapContainer>
    </div>
  )
}
