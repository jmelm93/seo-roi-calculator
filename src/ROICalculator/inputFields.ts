export const inputFields = {
  startingTraffic: {
    label: "Starting Traffic",
    type: "text",
    group: "Traffic",
    tooltip:
      "Starting Traffic represents the initial monthly visitor count to your website before implementing SEO strategies. It's the baseline from which traffic growth is measured.",
  },
  targetTraffic: {
    label: "Target Traffic",
    type: "text",
    group: "Traffic",
    tooltip:
      "Target Traffic is the goal for monthly visitors to your website after implementing SEO strategies within the specified growth timeframe. This figure should be higher than the Starting Traffic.",
  },
  growthTimeframe: {
    label: "Growth Timeframe (months)",
    type: "text",
    group: "Traffic",
    tooltip:
      "Growth Timeframe denotes the number of months over which you aim to reach your Target Traffic from the Starting Traffic. It reflects the duration of your SEO campaign.",
  },
  seoCost: {
    label: "SEO Cost",
    type: "text",
    group: "Investment",
    tooltip:
      "SEO Cost is the total expense for SEO services per month. This investment is made to improve website traffic and overall search engine rankings.",
  },
  seoPeriod: {
    label: "SEO Period (months)",
    type: "text",
    group: "Investment",
    tooltip:
      "SEO Period is the duration, in months, for which SEO services will be paid. This period could coincide with the Growth Timeframe but can vary depending on the strategy.",
  },
  conversionRate: {
    label: "Conversion Rate (%)",
    type: "text",
    group: "Profits",
    tooltip:
      "Conversion Rate is the percentage of website visitors who complete a desired action (e.g., making a purchase, signing up). It is used to estimate the value generated from additional traffic.",
  },
  conversionValue: {
    label: "Conversion Value",
    type: "text",
    group: "Profits",
    tooltip:
      "Conversion Value is the average revenue generated from each conversion. It helps in calculating the financial impact of increased traffic and conversion rates.",
  },
  calcTimeframe: {
    label: "Calculation Timeframe (months)",
    type: "text",
    group: "Trend",
    tooltip:
      "Calculation Timeframe specifies the total number of months over which the ROI and other metrics are calculated. This may extend beyond the SEO Period to observe long-term effects.",
  },
  hangTime: {
    label: "Hang Time (months)",
    type: "text",
    group: "Trend",
    tooltip:
      "Hang Time is the number of months the Target Traffic level is maintained after reaching it. This phase follows the Growth Timeframe and precedes any decay in traffic.",
  },
  decayRate: {
    label: "Decay Rate (%)",
    type: "text",
    group: "Trend",
    tooltip:
      "Decay Rate is the percentage decrease in traffic per month after the Hang Time ends, representing a gradual loss of traffic if no further SEO efforts are made.",
  },
};
