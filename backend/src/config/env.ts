import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

/**
 * DATABASE_URL has a safe local default so unit tests for pure services
 * (cost calculator, simulation, etc.) can run without a dedicated .env.
 */
const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().url().default("postgresql://postgres:postgres@localhost:5432/unit_economics"),
  OPENAI_GPT4O_INPUT_PER_1K: z.coerce.number().default(0.005),
  OPENAI_GPT4O_OUTPUT_PER_1K: z.coerce.number().default(0.015),
  ANTHROPIC_CLAUDE3_5_SONNET_INPUT_PER_1K: z.coerce.number().default(0.003),
  ANTHROPIC_CLAUDE3_5_SONNET_OUTPUT_PER_1K: z.coerce.number().default(0.015),
  ALERT_WEBHOOK_URL: z.string().optional(),
  ALERT_EMAIL_FROM: z.string().email().optional(),
  ALERT_EMAIL_TO: z.string().email().optional()
});

export const env = envSchema.parse(process.env);
