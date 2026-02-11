import { Request, Response } from "express";
import { z } from "zod";
import { runModelComparisonSimulation } from "../services/simulationService.js";

const simulationSchema = z.object({
  currentProvider: z.string(),
  currentModel: z.string(),
  targetProvider: z.string(),
  targetModel: z.string(),
  avgInputTokens: z.number().int().positive(),
  avgOutputTokens: z.number().int().nonnegative(),
  monthlyCallVolume: z.number().int().positive()
});

export async function postSimulation(req: Request, res: Response) {
  try {
    const parsed = simulationSchema.parse(req.body);
    const result = runModelComparisonSimulation(parsed);
    res.json({ data: result });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
