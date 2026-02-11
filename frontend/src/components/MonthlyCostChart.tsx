import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function MonthlyCostChart({ data }: { data: Array<{ month: string; totalCostUsd: number }> }) {
  return (
    <div style={{ height: 260, border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      <h3>Total Monthly Cost</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="totalCostUsd" stroke="#1e40af" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
