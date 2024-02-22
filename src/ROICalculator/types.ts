export type Inputs = {
  startingTraffic: number;
  targetTraffic: number;
  growthTimeframe: number;
  seoCost: number;
  seoPeriod: number;
  conversionRate: number;
  conversionValue: number;
  calcTimeframe: number;
  hangTime: number;
  decayRate: number;
  [key: string]: string | number;
};

export type InputField = {
  key: string;
  label: string;
  type: string;
  tooltip: string;
};

export type ChartDataItem = {
  month: string;
  valueOfAdditionalTraffic: number;
  cumulativeProfitOrLoss: number;
};

export type ChartData = {
  labels: string[];
  datasets: {
    type: string;
    label: string;
    data: (number | null | undefined)[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
};

export type ROIData = {
  totalAdditionalTraffic?: number;
  totalInvestment?: number;
  totalAdditionalTrafficValue?: number;
  roi?: string;
  chartData?: any[];
};
