import { RevenueImpactResult } from "./seoBsForecastCalculator";

export const mockData: RevenueImpactResult = {
  revenueImpactRange: [24500, 35000],
  explanation:
    "Calculating the projected revenue impact based on an estimated SEO change. The current monthly traffic is 50,000 visitors, with an estimated conversion rate of 2%, and an average conversion value of $50.00.\n\nA positive SEO change means a potential increase in traffic by 35% to 50%, which translates to an estimated increase of 24,500 to 35,000 visitors.\n\nThis results in an estimated new traffic volume ranging from 74,500 to 85,000 visitors.\n\nWith these traffic volumes, the projected conversions range from 1,490 to 1,700, leading to a potential revenue impact ranging from $74500.00 to $85000.00.\n\nFor comparison, the current conversions are 1,000, with a total revenue of $50000.00.\n\nTherefore, the estimated change in revenue due to the projected SEO impact ranges from $24500.00 to $35000.00.",
};

export const introText = `The "SEO Revenue Impact Estimator" is a dynamic tool designed to estimate the potential revenue impact of changes made to a website's search engine optimization (SEO) strategies. Whether these changes are intended to enhance or potentially degrade your site's traffic, understanding their financial implications is crucial for making informed decisions.

This tool specifically helps users predict how different SEO changes, classified as either "Positive" or "Negative," might affect their monthly traffic and, by extension, their revenue. Additionally, this tool introduces the concept of an "impact range," which allows users to explore outcomes under varying degrees of impact, addressing uncertainties in the SEO strategy’s effect.

By providing inputs such as current and maximum traffic potentials, expected conversion rates, and conversion values, users receive a calculated range of potential revenue impacts. This range helps in planning and risk assessment, offering a clearer picture of potential changes in revenue due to SEO actions.
`;

export type Field = {
  id: string;
  label: string;
  type: string;
  tooltip: string;
  options?: { label: string; value: string | number }[];
};

export const fields: Field[] = [
  {
    id: "current_traffic",
    label: "Current Traffic",
    type: "number",
    tooltip: "Enter the current monthly traffic as a number.",
  },
  {
    id: "max_traffic",
    label: "Max Traffic",
    type: "number",
    tooltip: "Enter the estimated maximum potential monthly traffic.",
  },
  {
    id: "change_type",
    label: "Change Type",
    type: "select",
    tooltip:
      "Select 'Positive' if the SEO changes are expected to increase traffic, or 'Negative' if they are expected to decrease traffic.",
    options: [
      { label: "Positive", value: "Positive" },
      { label: "Negative", value: "Negative" },
    ],
  },
  {
    id: "impact_range_min",
    label: "Impact Range Min (%)",
    type: "number",
    tooltip:
      "Enter the minimum estimated impact (as a percentage) that the SEO change will have on traffic. For example, enter '5' for a 5% change.",
  },
  {
    id: "impact_range_max",
    label: "Impact Range Max (%)",
    type: "number",
    tooltip:
      "Enter the maximum estimated impact (as a percentage) that the SEO change will have on traffic. This should be higher than the minimum impact.",
  },
  {
    id: "est_cvr",
    label: "Estimated CVR (%)",
    type: "number",
    tooltip:
      "Enter the estimated conversion rate (as a percentage). This is the percentage of visitors who are expected to make a purchase or convert.",
  },
  {
    id: "est_conv_value",
    label: "Estimated Conversion Value ($)",
    type: "number",
    tooltip: "Enter the average revenue expected from a single conversion.",
  },
];
