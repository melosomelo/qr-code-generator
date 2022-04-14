import GF256 from "../src/core/gf256";
import { describe, it, expect } from "@jest/globals";

describe("GF256", () => {
  describe("addition", () => {
    it("result less than 256", () => {
      expect(GF256.add(3, 2)).toBe(5);
    });
    it("result greater than 256", () => {
      expect(GF256.add(230, 120)).toBe(67);
    });
  });
  describe("multiplication", () => {
    it("exponent sum less than 255", () => {
      expect(GF256.multiply(7, 8)).toBe(56);
    });
    it("exponent sum greater than 255", () => {
      expect(GF256.multiply(254, 255)).toBe(29);
    });
    it("exponent sum equal to 255", () => {
      expect(GF256.multiply(5, 167)).toBe(1);
    });
    it("one of operands is 0", () => {
      expect(GF256.multiply(0, 10)).toBe(0);
    });
  });
  describe("division", () => {
    it("division by 0", () => {
      expect(() => GF256.divide(10, 0)).toThrow();
    });
    it("division by 1", () => {
      expect(GF256.divide(33, 1)).toBe(33);
    });
    it("1", () => {
      expect(GF256.divide(10, 3)).toBe(6);
    });
    it("2", () => {
      expect(GF256.divide(45, 12)).toBe(207);
    });
  });
});
