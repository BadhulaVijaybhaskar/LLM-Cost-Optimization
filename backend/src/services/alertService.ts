import { env } from "../config/env.js";
import { createAlert } from "../repositories/alertRepository.js";

export async function sendAlert(message: string, severity: "info" | "warning" | "critical"): Promise<void> {
  // Persist alert in DB so dashboard can render historical alerts.
  await createAlert(message, severity);

  // Stub for webhook integration (Slack / Teams / custom endpoint).
  if (env.ALERT_WEBHOOK_URL) {
    console.log(`[Webhook Stub] POST ${env.ALERT_WEBHOOK_URL}`, { message, severity });
  }

  // Stub for email integration.
  if (env.ALERT_EMAIL_FROM && env.ALERT_EMAIL_TO) {
    console.log(
      `[Email Stub] from=${env.ALERT_EMAIL_FROM} to=${env.ALERT_EMAIL_TO} subject=[${severity}] Unit Economics Alert`,
      { message }
    );
  }
}
