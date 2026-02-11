import { pool } from "../db/pool.js";
import { CalculatedUsageEvent } from "../models/usageEvent.js";

export async function insertUsageEvent(event: CalculatedUsageEvent): Promise<void> {
  await pool.query(
    `INSERT INTO usage_events (
      provider, model, user_id, feature_tag, input_tokens, output_tokens,
      total_cost_usd, token_efficiency_score, request_id, created_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [
      event.provider,
      event.model,
      event.userId,
      event.featureTag,
      event.inputTokens,
      event.outputTokens,
      event.totalCostUsd,
      event.tokenEfficiencyScore,
      event.requestId ?? null,
      event.timestamp ?? new Date().toISOString()
    ]
  );
}

export async function getMonthlyCosts(): Promise<Array<{ month: string; totalCostUsd: number }>> {
  const result = await pool.query(
    `SELECT to_char(date_trunc('month', created_at), 'YYYY-MM') AS month,
            ROUND(SUM(total_cost_usd)::numeric, 6) AS total_cost_usd
     FROM usage_events
     GROUP BY 1
     ORDER BY 1 ASC`
  );

  return result.rows.map((row) => ({
    month: row.month,
    totalCostUsd: Number(row.total_cost_usd)
  }));
}

export async function getCostByFeature(): Promise<
  Array<{ featureTag: string; totalCostUsd: number; callCount: number }>
> {
  const result = await pool.query(
    `SELECT feature_tag,
            ROUND(SUM(total_cost_usd)::numeric, 6) AS total_cost_usd,
            COUNT(*)::int AS call_count
     FROM usage_events
     GROUP BY feature_tag
     ORDER BY total_cost_usd DESC`
  );

  return result.rows.map((row) => ({
    featureTag: row.feature_tag,
    totalCostUsd: Number(row.total_cost_usd),
    callCount: row.call_count
  }));
}

export async function getUserAttribution(): Promise<
  Array<{ userId: string; totalCostUsd: number; totalInputTokens: number; totalOutputTokens: number }>
> {
  const result = await pool.query(
    `SELECT user_id,
            ROUND(SUM(total_cost_usd)::numeric, 6) AS total_cost_usd,
            SUM(input_tokens)::int AS total_input_tokens,
            SUM(output_tokens)::int AS total_output_tokens
     FROM usage_events
     GROUP BY user_id
     ORDER BY total_cost_usd DESC`
  );

  return result.rows.map((row) => ({
    userId: row.user_id,
    totalCostUsd: Number(row.total_cost_usd),
    totalInputTokens: row.total_input_tokens,
    totalOutputTokens: row.total_output_tokens
  }));
}

export async function getEfficiencyByFeature(): Promise<
  Array<{ featureTag: string; avgEfficiencyScore: number }>
> {
  const result = await pool.query(
    `SELECT feature_tag,
            ROUND(AVG(token_efficiency_score)::numeric, 4) AS avg_efficiency_score
     FROM usage_events
     GROUP BY feature_tag
     ORDER BY avg_efficiency_score DESC`
  );

  return result.rows.map((row) => ({
    featureTag: row.feature_tag,
    avgEfficiencyScore: Number(row.avg_efficiency_score)
  }));
}

export async function listUsageEvents(limit = 200): Promise<any[]> {
  const result = await pool.query(
    `SELECT id, provider, model, user_id, feature_tag, input_tokens, output_tokens, total_cost_usd,
            token_efficiency_score, created_at
     FROM usage_events
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit]
  );

  return result.rows;
}
