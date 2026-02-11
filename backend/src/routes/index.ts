import { Router } from "express";
import { postUsageEvent } from "../controllers/usageController.js";
import { getDashboard } from "../controllers/dashboardController.js";
import { postSimulation } from "../controllers/simulationController.js";
import { listPricing } from "../utils/pricingTable.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// Collector route for real-time ingest of LLM API usage events.
apiRouter.post("/usage-events", postUsageEvent);

// Dashboard aggregate route.
apiRouter.get("/dashboard", getDashboard);

// Static route to inspect model pricing table sourced from env.
apiRouter.get("/pricing", (_req, res) => {
  res.json({ data: listPricing() });
});

// Model comparison simulation route.
apiRouter.post("/simulate-model", postSimulation);
