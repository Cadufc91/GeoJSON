import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import icon from "./constants";

const MapSearch = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      marker: {
        icon
      }
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map]);

  return (
    <div>

    </div>
  )
}

export default MapSearch;