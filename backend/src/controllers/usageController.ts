import { Request, Response } from "express";
import { ingestUsageEvent } from "../services/usageService.js";

export async function postUsageEvent(req: Request, res: Response) {
  try {
    const result = await ingestUsageEvent(req.body);
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
