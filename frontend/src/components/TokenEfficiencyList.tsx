export function TokenEfficiencyList({
  rows
}: {
  rows: Array<{ featureTag: string; avgEfficiencyScore: number }>;
}) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      <h3>Token Efficiency Score</h3>
      <ul>
        {rows.map((row) => (
          <li key={row.featureTag}>
            <strong>{row.featureTag}</strong>: {row.avgEfficiencyScore.toFixed(4)}
          </li>
        ))}
      </ul>
    </div>
  );
}
