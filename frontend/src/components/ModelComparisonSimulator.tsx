import { FormEvent, useState } from "react";
import { runSimulation } from "../api/client";
import { SimulationInput, SimulationResult } from "../types/dashboard";

const defaultState: SimulationInput = {
  currentProvider: "openai",
  currentModel: "gpt-4o",
  targetProvider: "anthropic",
  targetModel: "claude-3-5-sonnet",
  avgInputTokens: 1200,
  avgOutputTokens: 600,
  monthlyCallVolume: 10000
};

export function ModelComparisonSimulator() {
  const [form, setForm] = useState<SimulationInput>(defaultState);
  const [result, setResult] = useState<SimulationResult | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data = await runSimulation(form);
    setResult(data);
  }

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      <h3>Model Comparison Simulator</h3>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(2, 1fr)" }}>
        <label>
          Current Provider
          <input value={form.currentProvider} onChange={(e) => setForm({ ...form, currentProvider: e.target.value })} />
        </label>
        <label>
          Current Model
          <input value={form.currentModel} onChange={(e) => setForm({ ...form, currentModel: e.target.value })} />
        </label>
        <label>
          Target Provider
          <input value={form.targetProvider} onChange={(e) => setForm({ ...form, targetProvider: e.target.value })} />
        </label>
        <label>
          Target Model
          <input value={form.targetModel} onChange={(e) => setForm({ ...form, targetModel: e.target.value })} />
        </label>
        <label>
          Avg Input Tokens
          <input
            type="number"
            value={form.avgInputTokens}
            onChange={(e) => setForm({ ...form, avgInputTokens: Number(e.target.value) })}
          />
        </label>
        <label>
          Avg Output Tokens
          <input
            type="number"
            value={form.avgOutputTokens}
            onChange={(e) => setForm({ ...form, avgOutputTokens: Number(e.target.value) })}
          />
        </label>
        <label>
          Monthly Call Volume
          <input
            type="number"
            value={form.monthlyCallVolume}
            onChange={(e) => setForm({ ...form, monthlyCallVolume: Number(e.target.value) })}
          />
        </label>
        <button type="submit">Run Simulation</button>
      </form>

      {result && (
        <div style={{ marginTop: 12 }}>
          <p>Current Monthly Cost: ${result.currentMonthly.toFixed(2)}</p>
          <p>Target Monthly Cost: ${result.targetMonthly.toFixed(2)}</p>
          <p>Estimated Savings: ${result.estimatedSavings.toFixed(2)} ({result.savingsPct.toFixed(2)}%)</p>
        </div>
      )}
    </div>
  );
}
