import React, { useState, useEffect } from "react";
/* add MATERIAL UI functions */
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Table from "./Table";
import "./App.css";
import { sortData } from "./utilities";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";
import Map from "./Map";

function App() {
  /* //STATE = HOW TO WRITE VARIABLES IN react// */
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.09024,
    lng: -95.712891,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState({});
  const [casesType, setCasesType] = useState("cases");
  //USEEFFECT = runs code based on condition
  //will run once when component loads
  useEffect(() => {
    console.log("hey");
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    console.log("hi");
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //UNITED STATES,UNITED KINGDOM,FRANCE
            value: country.countryInfo.iso3, //USA,UK,FR
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log(countryCode, "PulledCountry!");
    setCountry(countryCode);
    //TURNARY OPERATOR
    const url =
      countryCode === `worldwide`
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        //get all data for country
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      });
  };
  console.log("country info pulled.", countryInfo);

  /*Header, Title & Select DropDown*/
  return (
    <div class="app">
      <div class="app-top">
        <div class="app-header">
          <h1>CovidTracker19</h1>
          <FormControl class="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Global</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div class="app-stats">
          {/*InfoBox -cases*/}
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            class="infoBox"
            title="Cases Today"
            cases={numeral(countryInfo.todayCases).format("0.0a")}
            total={numeral(countryInfo.cases).format("0,0")}
          />
          {/*InfoBox -recovered*/}
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            class="infoBox"
            title="Recovered Today"
            cases={numeral(countryInfo.todayRecovered).format("0,0")}
            total={numeral(countryInfo.recovered).format("0,0")}
          />
          {/*InfoBox -deaths*/}
          <InfoBox
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            class="infoBox"
            title="Deaths Today"
            cases={numeral(countryInfo.todayDeaths).format("0.0a")}
            total={numeral(countryInfo.deaths).format("0,0")}
          />
        </div>
      </div>
      {/*Table*/}
      {/*Graph*/}
      {/*Map*/}
      <div class="app-right">
        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        />
      </div>
      <Card class="app-left">
        <CardContent>
          <h2>
            <strong>LIVE:</strong>
            <h4>Cases By Country</h4>
          </h2>

          <Table countries={tableData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
