import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/client";
import { AlertsList } from "../components/AlertsList";
import { CostByFeatureTable } from "../components/CostByFeatureTable";
import { ModelComparisonSimulator } from "../components/ModelComparisonSimulator";
import { MonthlyCostChart } from "../components/MonthlyCostChart";
import { TokenEfficiencyList } from "../components/TokenEfficiencyList";
import { DashboardData } from "../types/dashboard";

export function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboard().then(setData).catch((e) => setError(e.message));
  }, []);

  if (error) {
    return <p>Failed to load dashboard: {error}</p>;
  }

  if (!data) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <main style={{ margin: "0 auto", maxWidth: 1100, padding: 20, display: "grid", gap: 16 }}>
      <h1>AI Unit Economics Engine</h1>
      <MonthlyCostChart data={data.monthlyCost} />
      <CostByFeatureTable rows={data.costByFeature} />
      <TokenEfficiencyList rows={data.efficiencyByFeature} />
      <AlertsList alerts={data.alerts} />
      <ModelComparisonSimulator />
    </main>
  );
}
