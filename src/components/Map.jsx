import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

export const Map = () => {
    const center = [-23.572218119099436, -46.632395960507004];
    const [mapLayers, setMapLayers] = useState([]);

    const _onCreated = (e) => {
        console.log(e);

        const { layerType, layer } = e;
        if(layerType === "polygon") {
            const {_leaflet_id} = layer;
            setMapLayers((layers) => [
                ...layers, { id: _leaflet_id, latlngs: layer.getLatLngs()[0]}
            ]);
        }
    };

    const _onEdited = (e) => {
        console.log(e);
        const {layers: {_layers}, } = e;

        Object.values(_layers).map(({ _leaflet_id, editing }) => {
            setMapLayers((layers) => 
                layers.map( l => 
                    l.id === _leaflet_id 
                    ? { ...l, latlngs: {...editing.latlngs[0]} }
                    : l));
        });
    };

    const _onDeleted = (e) => {
        console.log(e);
        const {layers: {_layers}, } = e;

        Object.values(_layers).map(({ _leaflet_id }) => {
            setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
        });
    };

  return (
    <div id='map'>
        <MapContainer 
            style={{height: '100vh', width: '70vw'}} 
            center={center}
            zoom={10}
            scrollWheelZoom={false}
        >
            <FeatureGroup>
                <EditControl
                    position='topright'
                    onCreated={_onCreated}
                    onEdited={_onEdited}
                    onDeleted={_onDeleted}
                    draw={{
                        rectangle: false,
                        polyline: false,
                        circle: false,
                        circlemarker: false,
                        marker: false,
                    }}
                />
            </FeatureGroup>

            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
        </MapContainer>

        <p>{JSON.stringify(mapLayers, 0, 2)}</p>
    </div>
  )
}
