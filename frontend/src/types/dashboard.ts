export interface DashboardData {
  monthlyCost: Array<{ month: string; totalCostUsd: number }>;
  costByFeature: Array<{ featureTag: string; totalCostUsd: number; callCount: number }>;
  userAttribution: Array<{
    userId: string;
    totalCostUsd: number;
    totalInputTokens: number;
    totalOutputTokens: number;
  }>;
  efficiencyByFeature: Array<{ featureTag: string; avgEfficiencyScore: number }>;
  alerts: Array<{ id: number; message: string; severity: string; createdAt: string }>;
}

export interface SimulationInput {
  currentProvider: string;
  currentModel: string;
  targetProvider: string;
  targetModel: string;
  avgInputTokens: number;
  avgOutputTokens: number;
  monthlyCallVolume: number;
}

export interface SimulationResult {
  currentPerCall: number;
  targetPerCall: number;
  currentMonthly: number;
  targetMonthly: number;
  estimatedSavings: number;
  savingsPct: number;
}
