import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const casesCircleColor = {
  cases: {
    rgb: "rgb(204, 16, 52)",
    multiplier: 400,
  },
  recovered: {
    rgb: "rgb(125, 215, 29)",
    multiplier: 600,
  },
  deaths: {
    rgb: "rgb(251, 68, 67)",
    multiplier: 1000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  /*condensed version below*/
  /*   sortedData.sort((a, b) => {
      if (a.cases > b.cases) {
        return -1;
      } else {
        return 1;
      }
    });
    return sortedData;
  }; */

  /* --condensed code to 1 line-- */
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

/*put circles on MAP with tooltip(local info)*/
export const showDataOnMap = (data, casesType = "cases") =>
  /* added array.isarray */
  Array.isArray(data) &&
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesCircleColor[casesType].rgb}
      fillColor={casesCircleColor[casesType].rgb}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesCircleColor[casesType].multiplier
      }
    >
      <Popup>
        <h4>A Popup</h4>
        <div class="popup_box">
          <div
            class="popup_flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div class="popup_name">{country.country}</div>
          <div class="popup_cases">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div class="popup_recovered">
            Recovered: {numeral(country.cases).format("0,0")}
          </div>
          <div class="popup_deaths">
            Deaths: {numeral(country.cases).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
