import React from "react";
import Paper from "@mui/material/Paper";
import { ChartData } from "./types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  ChartTooltip,
  Legend
);

type ROIChartProps = {
  chartData: ChartData;
};

const ROIChart: React.FC<ROIChartProps> = ({ chartData }) => {
  return (
    chartData.labels && (
      <Paper
        elevation={1}
        style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc" }}
      >
        <Bar data={chartData as any} options={{ responsive: true }} />
      </Paper>
    )
  );
};

export default ROIChart;
