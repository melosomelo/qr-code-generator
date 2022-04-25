import GF256 from "../src/core/math/gf256";
import { describe, it, expect } from "@jest/globals";

describe("GF256", () => {
  describe("addition", () => {
    it.each([
      ["addition with 0", 100, 0, 100],
      ["equal operands", 25, 25, 0],
      ["3 + 2", 3, 2, 1],
      ["42 + 20", 42, 20, 62],
    ])("%s", (_, a, b, result) => {
      expect(GF256.add(a, b)).toBe(result);
    });
  });
  describe("multiplication", () => {
    it.each([
      ["exponent sum less than 255", 7, 8, 56],
      ["exponent sum greater than 255", 254, 255, 29],
      ["exponent sum equal to 255", 5, 167, 1],
      ["one of operands is 0", 0, 10, 0],
    ])("%s", (_, a, b, result) => {
      expect(GF256.multiply(a, b)).toBe(result);
    });
  });
  describe("division", () => {
    it("division by 0", () => {
      expect(() => GF256.divide(10, 0)).toThrow();
    });
    it.each([
      ["division by 1", 33, 1, 33],
      ["10/3", 10, 3, 6],
      ["45/12", 45, 12, 207],
    ])("%s", (_, a, b, result) => {
      expect(GF256.divide(a, b)).toBe(result);
    });
  });
});
