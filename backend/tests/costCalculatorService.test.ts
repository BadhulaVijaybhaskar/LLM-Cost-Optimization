import { describe, expect, it } from "vitest";
import {
  calculateTokenEfficiencyScore,
  calculateUsageCost
} from "../src/services/costCalculatorService.js";

describe("costCalculatorService", () => {
  it("calculates total usage cost", () => {
    const result = calculateUsageCost({
      provider: "openai",
      model: "gpt-4o",
      inputTokens: 1000,
      outputTokens: 1000
    });

    expect(result).toBe(0.02);
  });

  it("calculates token efficiency score", () => {
    expect(calculateTokenEfficiencyScore(100, 250)).toBe(2.5);
    expect(calculateTokenEfficiencyScore(0, 250)).toBe(0);
  });
});
