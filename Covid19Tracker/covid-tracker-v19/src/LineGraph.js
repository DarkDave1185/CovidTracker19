import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function LineGraph() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=28")
      .then((response) => response.json())
      .then((data) => {
        console.log("LineGraph info", data);
      });
  }, []);

  return (
    <div>
      <h3>LineGraph Here</h3>
      <Line data options />
    </div>
  );
}

export default LineGraph;
