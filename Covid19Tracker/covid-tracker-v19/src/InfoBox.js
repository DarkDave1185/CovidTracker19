import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
  return (
    <Card class="infoBox">
      <CardContent>
        {/*title*/}
        <Typography class="infoBox-title" color="textSecondary">
          {title}
        </Typography>
        {/*case #*/}
        <h3 class="infoBox-cases">{cases}</h3>
        {/*total #*/}
        <Typography class="infoBox-total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
