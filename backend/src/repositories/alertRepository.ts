import { pool } from "../db/pool.js";

export async function createAlert(message: string, severity: "info" | "warning" | "critical"): Promise<void> {
  await pool.query("INSERT INTO alerts (message, severity) VALUES ($1, $2)", [message, severity]);
}

export async function listAlerts(): Promise<Array<{ id: number; message: string; severity: string; createdAt: string }>> {
  const result = await pool.query(
    `SELECT id, message, severity, created_at
     FROM alerts
     ORDER BY created_at DESC
     LIMIT 200`
  );

  return result.rows.map((row) => ({
    id: row.id,
    message: row.message,
    severity: row.severity,
    createdAt: row.created_at
  }));
}
