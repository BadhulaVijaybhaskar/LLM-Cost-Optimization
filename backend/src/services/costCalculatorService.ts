import { getPricing } from "../utils/pricingTable.js";

export function calculateUsageCost(params: {
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
}): number {
  const pricing = getPricing(params.provider, params.model);

  const inputCost = (params.inputTokens / 1000) * pricing.inputPer1k;
  const outputCost = (params.outputTokens / 1000) * pricing.outputPer1k;

  return Number((inputCost + outputCost).toFixed(6));
}

export function calculateTokenEfficiencyScore(inputTokens: number, outputTokens: number): number {
  if (inputTokens <= 0) {
    return 0;
  }

  // Higher output for each input token means higher efficiency.
  return Number((outputTokens / inputTokens).toFixed(4));
}
