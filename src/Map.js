import React from "react";
import "./Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./utilities";

function Map({ countries, casesType, center, zoom }) {
  console.log(countries);
  return (
    <div class="map">
      {/*set center and zoom start of page */}
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          /*reference = https://wiki.openstreetmap.org/wiki/Tile_servers*/
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http:osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
