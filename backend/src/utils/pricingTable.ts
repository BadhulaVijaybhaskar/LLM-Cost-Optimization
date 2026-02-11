import { env } from "../config/env.js";
import { ModelPricing } from "../models/pricing.js";

const pricingTable: ModelPricing[] = [
  {
    provider: "openai",
    model: "gpt-4o",
    inputPer1k: env.OPENAI_GPT4O_INPUT_PER_1K,
    outputPer1k: env.OPENAI_GPT4O_OUTPUT_PER_1K
  },
  {
    provider: "anthropic",
    model: "claude-3-5-sonnet",
    inputPer1k: env.ANTHROPIC_CLAUDE3_5_SONNET_INPUT_PER_1K,
    outputPer1k: env.ANTHROPIC_CLAUDE3_5_SONNET_OUTPUT_PER_1K
  }
];

export function getPricing(provider: string, model: string): ModelPricing {
  const normalizedProvider = provider.toLowerCase();
  const normalizedModel = model.toLowerCase();

  const pricing = pricingTable.find(
    (item) => item.provider === normalizedProvider && item.model === normalizedModel
  );

  if (!pricing) {
    throw new Error(`No pricing found for provider=${provider} model=${model}`);
  }

  return pricing;
}

export function listPricing(): ModelPricing[] {
  return pricingTable;
}
