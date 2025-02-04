import { describe, test, expect } from "bun:test";
import { rawCostumes, costumes } from "./costumes";

describe("costumes モジュール", () => {
  test("各 Costume に thumbnail と image のパスが正しく追加される", () => {
    for (const costume of rawCostumes) {
      const mapped = costumes.find((c) => c.id === costume.id);
      expect(mapped).toBeDefined();
      if (mapped) {
        expect(mapped.thumbnail).toBe(`/thumbnails/${costume.id}.png`);
        expect(mapped.image).toBe(`/images/${costume.id}.png`);
      }
    }
  });
});
