type ForecastCalculatorParams = {
  currentTraffic: number;
  maxTraffic: number;
  changeType: "Positive" | "Negative";
  impactRange: [number, number];
  estCvr: number;
  estConvValue: number;
};

export type RevenueImpactResult = {
  revenueImpactRange: [number, number];
  explanation: string;
};

const seoBsForecastCalculator = ({
  currentTraffic,
  maxTraffic,
  changeType,
  impactRange,
  estCvr,
  estConvValue,
}: ForecastCalculatorParams): RevenueImpactResult => {
  let explanation: string[] = [];

  explanation.push(
    `Calculating the projected revenue impact based on an estimated SEO change. The current monthly traffic is ${currentTraffic.toLocaleString()} visitors, with an estimated conversion rate of ${estCvr}%, and an average conversion value of $${estConvValue.toFixed(
      2
    )}.`
  );

  let trafficPotential: number,
    trafficChangeMin: number,
    trafficChangeMax: number;
  trafficPotential =
    changeType.toLowerCase() === "positive"
      ? maxTraffic - currentTraffic
      : currentTraffic;

  trafficChangeMin = (trafficPotential * impactRange[0]) / 100;
  trafficChangeMax = (trafficPotential * impactRange[1]) / 100;
  if (changeType.toLowerCase() === "negative") {
    trafficChangeMin *= -1;
    trafficChangeMax *= -1;
  }

  const verb =
    changeType.toLowerCase() === "positive" ? "increase" : "decrease";
  explanation.push(
    `A ${changeType.toLowerCase()} SEO change means a potential ${verb} in traffic by ${
      impactRange[0]
    }% to ${
      impactRange[1]
    }%, which translates to an estimated ${verb} of ${Math.abs(
      trafficChangeMin
    ).toLocaleString()} to ${Math.abs(
      trafficChangeMax
    ).toLocaleString()} visitors.`
  );

  const newTrafficMin = currentTraffic + trafficChangeMin;
  const newTrafficMax = currentTraffic + trafficChangeMax;
  explanation.push(
    `This results in an estimated new traffic volume ranging from ${newTrafficMin.toLocaleString()} to ${newTrafficMax.toLocaleString()} visitors.`
  );

  const conversionsMin = (newTrafficMin * estCvr) / 100;
  const conversionsMax = (newTrafficMax * estCvr) / 100;
  const newRevenueMin = conversionsMin * estConvValue;
  const newRevenueMax = conversionsMax * estConvValue;
  explanation.push(
    `With these traffic volumes, the projected conversions range from ${conversionsMin.toLocaleString()} to ${conversionsMax.toLocaleString()}, leading to a potential revenue impact ranging from $${newRevenueMin.toFixed(
      2
    )} to $${newRevenueMax.toFixed(2)}.`
  );

  const currentConversions = (currentTraffic * estCvr) / 100;
  const currentRevenue = currentConversions * estConvValue;
  explanation.push(
    `For comparison, the current conversions are ${currentConversions.toLocaleString()}, with a total revenue of $${currentRevenue.toFixed(
      2
    )}.`
  );

  const revenueChangeMin = newRevenueMin - currentRevenue;
  const revenueChangeMax = newRevenueMax - currentRevenue;
  explanation.push(
    `Therefore, the estimated change in revenue due to the projected SEO impact ranges from $${revenueChangeMin.toFixed(
      2
    )} to $${revenueChangeMax.toFixed(2)}.`
  );

  const detailedExplanation = explanation.join("\n\n");

  return {
    revenueImpactRange: [revenueChangeMin, revenueChangeMax],
    explanation: detailedExplanation,
  };
};

export default seoBsForecastCalculator;
