import { describe, it, expect } from "@jest/globals";
import { numberOfModules } from "../src/core/formulas";

describe("Formulas", () => {
  describe("Total number of modules", () => {
    it.each([
      [1, 21 * 21],
      [7, 45 * 45],
      [14, 73 * 73],
      [21, 101 * 101],
      [28, 129 * 129],
      [35, 157 * 157],
    ])("version %i", (version, amount) => {
      expect(numberOfModules(version)).toBe(amount);
    });
  });
});
