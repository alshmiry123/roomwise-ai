import { describe, expect, it } from "vitest";

import {
  createDraft,
  createRecommendation,
  getRoomAnalysis,
} from "../constants/roomwise";

describe("Roomwise domain", () => {
  it("creates a usable draft with an initial recommendation", () => {
    const draft = createDraft();
    expect(draft.roomType).toBe("Living room");
    expect(draft.style).toBe("Scandinavian");
    expect(draft.recommendation?.estimatedBudget).toBe("$1k–$3k");
    expect(draft.imageUri).toContain("images.unsplash.com");
  });

  it("keeps recommendations aligned to room, style, and budget", () => {
    const recommendation = createRecommendation("Office", "Industrial", "$3k–$8k");
    expect(recommendation.style).toBe("Industrial");
    expect(recommendation.title).toBe("Refined industrial");
    expect(recommendation.furniture).toContain("Oak sit-stand desk");
    expect(recommendation.estimatedBudget).toBe("$3k–$8k");
  });

  it("returns analysis with detected elements and a color story", () => {
    const analysis = getRoomAnalysis("Bedroom");
    expect(analysis.roomType).toBe("Bedroom");
    expect(analysis.detectedObjects).toContain("Bed");
    expect(analysis.palette).toHaveLength(4);
    expect(analysis.confidence).toBeGreaterThan(80);
  });
});
