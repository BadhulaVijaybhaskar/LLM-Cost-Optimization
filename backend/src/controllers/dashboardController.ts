import { Request, Response } from "express";
import { getDashboardSummary } from "../services/dashboardService.js";

export async function getDashboard(req: Request, res: Response) {
  try {
    const summary = await getDashboardSummary();
    res.json({ data: summary });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
