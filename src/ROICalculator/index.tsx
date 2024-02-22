import React, { useState, useEffect } from "react";
import calculateROI from "./calculateRoi";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ROISection from "./ROISection";
import ROIForm from "./ROIForm";
import ROIChart from "./ROIChart";
import { ChartData, ChartDataItem, Inputs, ROIData } from "./types";

const defaultInputs: Inputs = {
  startingTraffic: 10000,
  targetTraffic: 18000,
  growthTimeframe: 12,
  seoCost: 10000,
  seoPeriod: 12,
  conversionRate: 2.5,
  conversionValue: 150,
  calcTimeframe: 24,
  hangTime: 12,
  decayRate: 1,
};

const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [roiData, setRoiData] = useState<ROIData>({});

  useEffect(() => {
    calculateAndSetChartData(); // Initialize chart data
  }, []);

  const calculateAndSetChartData = () => {
    const results = calculateROI(inputs);

    const seoCostData = Array.from(
      { length: inputs.calcTimeframe },
      (_, index) => (index < inputs.seoPeriod ? inputs.seoCost : 0)
    );

    const data: ChartData = {
      labels:
        results?.chartData?.map(
          (item: ChartDataItem) => `Month ${item.month}`
        ) || [],
      datasets: [
        {
          type: "bar",
          label: "Value of Additional Traffic",
          data:
            results?.chartData?.map(
              (item: ChartDataItem) => item.valueOfAdditionalTraffic
            ) || [],
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          type: "bar",
          label: "Cumulative Profit/Loss",
          data:
            results?.chartData?.map(
              (item: ChartDataItem) => item.cumulativeProfitOrLoss
            ) || [],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          type: "line",
          label: "SEO Cost",
          data: seoCostData,
          borderColor: "rgba(204, 122, 0, 0.6)",
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    setChartData(data);
    setRoiData(results);
  };

  return (
    <Container>
      <Typography variant="h3" marginBottom={2.5}>
        ROI Calculator
      </Typography>
      <ROIForm
        inputs={inputs}
        setInputs={setInputs}
        calculateAndSetChartData={calculateAndSetChartData}
      />
      <Divider sx={{ mt: 3, mb: 2 }} />
      <ROISection roiData={roiData} />
      <ROIChart chartData={chartData} />
    </Container>
  );
};

export default ROICalculator;
