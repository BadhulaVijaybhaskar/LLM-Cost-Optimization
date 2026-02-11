export interface UsageEventInput {
  provider: string;
  model: string;
  userId: string;
  featureTag: string;
  inputTokens: number;
  outputTokens: number;
  requestId?: string;
  timestamp?: string;
}

export interface CalculatedUsageEvent extends UsageEventInput {
  totalCostUsd: number;
  tokenEfficiencyScore: number;
}
