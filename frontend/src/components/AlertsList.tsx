export function AlertsList({
  alerts
}: {
  alerts: Array<{ id: number; message: string; severity: string; createdAt: string }>;
}) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      <h3>Alerts</h3>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id}>
            [{alert.severity.toUpperCase()}] {alert.message} ({new Date(alert.createdAt).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
