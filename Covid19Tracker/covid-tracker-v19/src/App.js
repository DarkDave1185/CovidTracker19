import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
/* add MATERIAL UI functions */
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import "./App.css";

function App() {
  /* //STATE = HOW TO WRITE VARIABLES IN react// */
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState({});
  //USEEFFECT = runs code based on condition
  //will run once when component loads
  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
          }));
          setTableData(data);
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
        <h4> Building Covid Tracker for Portfolio </h4>
        <div class="app-stats">
          {/*InfoBox -cases*/}
          <InfoBox
            class="infoBox"
            title="Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          {/*InfoBox -recovered*/}
          <InfoBox
            class="infoBox"
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          {/*InfoBox -deaths*/}
          <InfoBox
            class="infoBox"
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
      </div>
      {/*Table*/}
      {/*Graph*/}

      <Card class="app-left">
        <CardContent>
          <h3>LIVE</h3>
          <h2>Cases By Country</h2>
          <Table />
          <h2>New Global Cases</h2>
        </CardContent>
      </Card>
      {/*Map*/}
      <div class="app-right">
        <Map />
      </div>
    </div>
  );
}

export default App;
