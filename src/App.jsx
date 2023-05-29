import { useState } from 'react';
import { FeatureGroup, LayersControl, MapContainer, TileLayer  } from 'react-leaflet';
import './App.css';
import { EditControl } from 'react-leaflet-draw';
import MapSearch from './components/MapSearch';
import { WMSTileLayer } from 'react-leaflet/WMSTileLayer';

function App() {
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
    <div className='App'>
      <div className='map-container'>
        <MapContainer 
            style={{height: '100vh', width: '70vw'}} 
            center={center}
            zoom={10}
            scrollWheelZoom={true}
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
            <LayersControl>
              <LayersControl.BaseLayer name="Street View" checked>
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Topografia">
                <WMSTileLayer
                  layers="TOPO-WMS"
                  url="http://ows.mundialis.de/services/service?"
                />   
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Lugares">
                <WMSTileLayer
                  layers="OSM-Overlay-WMS"
                  url="http://ows.mundialis.de/services/service?"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Topografia + Lugares">
                <WMSTileLayer
                  layers="TOPO-WMS,OSM-Overlay-WMS"
                  url="http://ows.mundialis.de/services/service?"
                />
              </LayersControl.BaseLayer>
            </LayersControl>
          <MapSearch />
        </MapContainer>
      </div>
      <div className='panel-container'>
        <pre>
          {JSON.stringify(mapLayers, 0, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;
