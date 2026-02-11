export function CostByFeatureTable({
  rows
}: {
  rows: Array<{ featureTag: string; totalCostUsd: number; callCount: number }>;
}) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      <h3>Cost by Feature</h3>
      <table width="100%">
        <thead>
          <tr>
            <th align="left">Feature</th>
            <th align="right">Calls</th>
            <th align="right">Cost (USD)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.featureTag}>
              <td>{row.featureTag}</td>
              <td align="right">{row.callCount}</td>
              <td align="right">${row.totalCostUsd.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
