import { DashboardData, SimulationInput, SimulationResult } from "../types/dashboard";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000/api";

export async function fetchDashboard(): Promise<DashboardData> {
  const response = await fetch(`${API_BASE}/dashboard`);
  const json = await response.json();
  return json.data;
}

export async function runSimulation(input: SimulationInput): Promise<SimulationResult> {
  const response = await fetch(`${API_BASE}/simulate-model`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  const json = await response.json();
  return json.data;
}
