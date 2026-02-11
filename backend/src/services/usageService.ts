import { z } from "zod";
import { insertUsageEvent } from "../repositories/usageRepository.js";
import { sendAlert } from "./alertService.js";
import { calculateTokenEfficiencyScore, calculateUsageCost } from "./costCalculatorService.js";

const usageEventSchema = z.object({
  provider: z.string(),
  model: z.string(),
  userId: z.string(),
  featureTag: z.string(),
  inputTokens: z.number().int().nonnegative(),
  outputTokens: z.number().int().nonnegative(),
  requestId: z.string().optional(),
  timestamp: z.string().datetime().optional()
});

export async function ingestUsageEvent(input: unknown) {
  const parsed = usageEventSchema.parse(input);

  const totalCostUsd = calculateUsageCost(parsed);
  const tokenEfficiencyScore = calculateTokenEfficiencyScore(parsed.inputTokens, parsed.outputTokens);

  await insertUsageEvent({
    ...parsed,
    totalCostUsd,
    tokenEfficiencyScore
  });

  if (totalCostUsd > 1) {
    await sendAlert(
      `High cost call detected for feature ${parsed.featureTag}. cost=$${totalCostUsd}`,
      "warning"
    );
  }

  return {
    ...parsed,
    totalCostUsd,
    tokenEfficiencyScore
  };
}
