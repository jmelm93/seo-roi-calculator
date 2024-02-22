import { Inputs, ROIData } from "./types";

const calculateROI = (inputs: Inputs): ROIData => {
  const diffTraffic = inputs.targetTraffic - inputs.startingTraffic;

  let chartData = [];
  let trafficValueIndex =
    inputs.conversionRate * (inputs.conversionValue / 100);
  let currentTraffic = inputs.startingTraffic;
  let totalAdditionalTraffic = -diffTraffic / 2;
  let valueOfAdditionalTraffic = 0;
  let cumulativeProfitOrLoss = 0;

  for (
    let currentMonth = 1;
    currentMonth <= inputs.calcTimeframe;
    currentMonth++
  ) {
    if (currentMonth <= inputs.growthTimeframe) {
      currentTraffic =
        inputs.startingTraffic +
        diffTraffic * (currentMonth / inputs.growthTimeframe);
    } else if (currentMonth <= inputs.growthTimeframe + inputs.hangTime) {
      currentTraffic = inputs.targetTraffic;
    } else {
      currentTraffic *= 1 - inputs.decayRate / 100;
    }

    let additionalTraffic = currentTraffic - inputs.startingTraffic;
    totalAdditionalTraffic += additionalTraffic;

    let profitLossByMonth: any = {};
    profitLossByMonth.month = currentMonth;

    if (currentMonth <= inputs.seoPeriod) {
      profitLossByMonth.seoCost = inputs.seoCost;
      if (currentMonth > 1) {
        valueOfAdditionalTraffic +=
          (diffTraffic * trafficValueIndex) / (inputs.growthTimeframe - 1);
      }
      profitLossByMonth.valueOfAdditionalTraffic = valueOfAdditionalTraffic;
      cumulativeProfitOrLoss -= inputs.seoCost;
    } else {
      profitLossByMonth.seoCost = 0;
      profitLossByMonth.valueOfAdditionalTraffic =
        additionalTraffic * trafficValueIndex;
    }

    cumulativeProfitOrLoss += profitLossByMonth.valueOfAdditionalTraffic;
    profitLossByMonth.valueOfAdditionalTraffic = Math.round(
      profitLossByMonth.valueOfAdditionalTraffic
    );
    profitLossByMonth.cumulativeProfitOrLoss = Math.round(
      cumulativeProfitOrLoss
    );

    chartData.push(profitLossByMonth);
  }

  let totalInvestment = inputs.seoCost * inputs.seoPeriod;
  let totalAdditionalTrafficValue = totalAdditionalTraffic * trafficValueIndex;
  let roi = totalAdditionalTrafficValue / totalInvestment;

  return {
    totalAdditionalTraffic: Math.round(totalAdditionalTraffic),
    totalInvestment: Math.round(totalInvestment),
    totalAdditionalTrafficValue: Math.round(totalAdditionalTrafficValue),
    roi: roi.toFixed(1),
    chartData: chartData,
  };
};

export default calculateROI;
