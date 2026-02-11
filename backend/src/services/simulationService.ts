import { calculateUsageCost } from "./costCalculatorService.js";

export interface SimulationRequest {
  currentProvider: string;
  currentModel: string;
  targetProvider: string;
  targetModel: string;
  avgInputTokens: number;
  avgOutputTokens: number;
  monthlyCallVolume: number;
}

export function runModelComparisonSimulation(input: SimulationRequest) {
  const currentPerCall = calculateUsageCost({
    provider: input.currentProvider,
    model: input.currentModel,
    inputTokens: input.avgInputTokens,
    outputTokens: input.avgOutputTokens
  });

  const targetPerCall = calculateUsageCost({
    provider: input.targetProvider,
    model: input.targetModel,
    inputTokens: input.avgInputTokens,
    outputTokens: input.avgOutputTokens
  });

  const currentMonthly = Number((currentPerCall * input.monthlyCallVolume).toFixed(2));
  const targetMonthly = Number((targetPerCall * input.monthlyCallVolume).toFixed(2));
  const estimatedSavings = Number((currentMonthly - targetMonthly).toFixed(2));
  const savingsPct = currentMonthly > 0 ? Number(((estimatedSavings / currentMonthly) * 100).toFixed(2)) : 0;

  return {
    currentPerCall,
    targetPerCall,
    currentMonthly,
    targetMonthly,
    estimatedSavings,
    savingsPct
  };
}
