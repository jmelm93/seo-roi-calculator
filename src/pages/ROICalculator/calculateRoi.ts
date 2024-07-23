import { Inputs, ROIData } from "./types";

const calculateROI = (inputs: Inputs): ROIData => {
  const diffTraffic = inputs.targetTraffic - inputs.startingTraffic; // Difference in traffic from start to target

  let chartData = [];
  const trafficValueIndex =
    inputs.conversionRate * (inputs.conversionValue / 100); // Value per unit of traffic
  let currentTraffic = inputs.startingTraffic; // Initialize current traffic to starting traffic
  let totalAdditionalTraffic = 0; // Initialize total additional traffic
  let cumulativeProfitOrLoss = 0; // Initialize cumulative profit or loss

  for (
    let currentMonth = 1;
    currentMonth <= inputs.calcTimeframe;
    currentMonth++
  ) {
    // Calculate current traffic based on growth timeframe, hang time, and decay rate
    if (currentMonth <= inputs.growthTimeframe) {
      currentTraffic =
        inputs.startingTraffic +
        diffTraffic * (currentMonth / inputs.growthTimeframe);
    } else if (currentMonth <= inputs.growthTimeframe + inputs.hangTime) {
      currentTraffic = inputs.targetTraffic;
    } else {
      currentTraffic *= 1 - inputs.decayRate / 100;
    }

    const additionalTraffic = currentTraffic - inputs.startingTraffic; // Calculate additional traffic
    totalAdditionalTraffic += additionalTraffic; // Accumulate additional traffic

    let profitLossByMonth: any = {};
    profitLossByMonth.month = currentMonth;
    profitLossByMonth.currentTraffic = Math.round(currentTraffic); // Current traffic for the month
    profitLossByMonth.additionalTraffic = Math.round(additionalTraffic); // Additional traffic for the month

    // Determine SEO cost for the month
    if (currentMonth <= inputs.seoPeriod) {
      profitLossByMonth.seoCost = inputs.seoCost;
    } else {
      profitLossByMonth.seoCost = 0;
    }

    const valueOfAdditionalTraffic = additionalTraffic * trafficValueIndex; // Calculate value of additional traffic
    cumulativeProfitOrLoss +=
      valueOfAdditionalTraffic - profitLossByMonth.seoCost; // Update cumulative profit or loss

    profitLossByMonth.valueOfAdditionalTraffic = Math.round(
      valueOfAdditionalTraffic
    ); // Round value of additional traffic
    profitLossByMonth.cumulativeProfitOrLoss = Math.round(
      cumulativeProfitOrLoss
    ); // Round cumulative profit or loss

    chartData.push(profitLossByMonth); // Add monthly profit/loss data to chart
  }

  const totalInvestment = inputs.seoCost * inputs.seoPeriod; // Calculate total investment
  const totalAdditionalTrafficValue =
    totalAdditionalTraffic * trafficValueIndex; // Calculate total additional traffic value
  const roi =
    ((totalAdditionalTrafficValue - totalInvestment) / totalInvestment) * 100; // Calculate ROI and convert to percentage

  return {
    totalAdditionalTraffic: Math.round(totalAdditionalTraffic), // Round total additional traffic
    totalInvestment: Math.round(totalInvestment), // Round total investment
    totalAdditionalTrafficValue: Math.round(totalAdditionalTrafficValue), // Round total additional traffic value
    roi: roi.toFixed(0), // Convert ROI to fixed decimal string
    chartData: chartData, // Return chart data
  };
};

export default calculateROI;
