import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesCircleColor = [
  {
    cases: {
      rgb: "rgb(204, 16, 52)",
      multiplier: 800,
    },
    recovered: {
      rgb: "rgb(125, 215, 29)",
      multiplier: 1200,
    },
    deaths: {
      rgb: "rgb(251, 68, 67)",
      multiplier: 2000,
    },
  },
];

export const sortData = (data) => {
  const sortedData = [...data];
  /*condensed version below*/
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};
/*--condensed code to 1 line--
return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1)) */

/*put circles on MAP with tooltip(local info)*/
export const showDataOnMap = (data, casesType = "cases") => {
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesCircleColor[casesType].hex}
      fillColor={casesCircleColor[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesCircleColor[casesType].multiplier
      }
    >
      <Popup>
        <h4>A Popup</h4>
      </Popup>
    </Circle>
  ));
};
