import { describe, it, expect } from "@jest/globals";
import {
  numberOfModules,
  numberOfFunctionPatternModules,
  numberOfDataModules,
} from "../src/core/formulas";

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
  describe("Number of function pattern modules", () => {
    it.each([
      [1, 202],
      [7, 390],
      [14, 611],
      [21, 882],
      [28, 1203],
      [35, 1574],
    ])("version %i", (version, amount) => {
      expect(numberOfFunctionPatternModules(version)).toBe(amount);
    });
  });
  describe("Number of data modules", () => {
    it.each([
      [1, 208],
      [7, 1568],
      [14, 4651],
      [21, 9252],
      [28, 15371],
      [35, 23008],
    ])("version %i", (version, amount) => {
      expect(numberOfDataModules(version)).toBe(amount);
    });
  });
});
