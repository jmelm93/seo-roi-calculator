import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ROIData } from "./types";

type ROICardProps = {
  title: string;
  value: string;
  prefix?: string;
};

const ROICard: React.FC<ROICardProps> = ({ title, value, prefix = "" }) => (
  <Grid item xs={12} sm={3}>
    <Card sx={{ border: "1px solid #ccc" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3">
          {prefix}
          {value}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

type ROISectionProps = {
  roiData: ROIData;
};

const ROISection: React.FC<ROISectionProps> = ({ roiData }) => {
  if (!roiData) {
    return null;
  }

  const roiCards = [
    { title: "Return On Investment (ROI)", value: `${roiData.roi}%` },
    {
      title: "Total Additional Traffic",
      value: roiData?.totalAdditionalTraffic?.toLocaleString(),
    },
    {
      title: "Total Additional Profit",
      value: `$${roiData?.totalAdditionalTrafficValue?.toLocaleString()}`,
    },
    {
      title: "Total Investment",
      value: `$${roiData?.totalInvestment?.toLocaleString()}`,
    },
  ];

  return (
    <Grid container spacing={2} justifyContent="center" marginTop={1}>
      {roiCards.map((card, index) => (
        <ROICard key={index} title={card.title} value={card.value ?? ""} />
      ))}
    </Grid>
  );
};

export default ROISection;
