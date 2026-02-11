import {
  getCostByFeature,
  getEfficiencyByFeature,
  getMonthlyCosts,
  getUserAttribution
} from "../repositories/usageRepository.js";
import { listAlerts } from "../repositories/alertRepository.js";

export async function getDashboardSummary() {
  const [monthlyCost, costByFeature, userAttribution, efficiencyByFeature, alerts] = await Promise.all([
    getMonthlyCosts(),
    getCostByFeature(),
    getUserAttribution(),
    getEfficiencyByFeature(),
    listAlerts()
  ]);

  return {
    monthlyCost,
    costByFeature,
    userAttribution,
    efficiencyByFeature,
    alerts
  };
}
