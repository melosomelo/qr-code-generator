import Polynomial from "../src/core/polynomial";
import { describe, it, expect } from "@jest/globals";

describe("Polynomial class", () => {
  describe("add()", () => {
    it("Result with operands of equal degree", () => {
      const f = new Polynomial(3, [5, 4, 0, 2]);
      const g = new Polynomial(3, [1, 7, 42, 0]);
      const result = Polynomial.add(f, g);
      expect(result.coefficients).toEqual([6, 11, 42, 2]);
    });
    it("Result with operands of different degrees", () => {
      const f = new Polynomial(6, [5, 4, 0, 2, 10, 0, 8]);
      const g = new Polynomial(3, [1, 7, 42, 0]);
      const result = Polynomial.add(f, g);
      expect(result.coefficients).toEqual([5, 4, 0, 3, 17, 42, 8]);
    });
    it("Result with a zero polynomial", () => {
      const f = new Polynomial(0);
      const g = new Polynomial(2, [2, 1, 2]);
      const result = Polynomial.add(f, g);
      expect(result.coefficients).toEqual(g.coefficients);
    });
    it("Result with two zero polynomials", () => {
      const g = new Polynomial(0);
      const f = new Polynomial(0);
      const result = Polynomial.add(f, g);
      expect(result.coefficients).toEqual(g.coefficients);
    });
    it("Degree of result", () => {
      const f = new Polynomial(3, [5, 4, 0, 2]);
      const g = new Polynomial(3, [1, 7, 42, 0]);
      const result = Polynomial.add(f, g);
      expect(result.deg).toBe(f.deg);
    });
    it("Degree of result when leading terms cancel out", () => {
      const f = new Polynomial(5, [5, 1, 30, 10, 15, 2]);
      const g = new Polynomial(5, [-5, 1, 4, 2, 6, 10]);
      const result = Polynomial.add(f, g);
      expect(result.deg).toBe(f.deg - 1);
    });
  });
  describe("multiply()", () => {
    it("Result", () => {
      const f = new Polynomial(2, [4, 5, 1]);
      const g = new Polynomial(2, [1, 3, 1]);
      const result = Polynomial.multiply(f, g);
      expect(result.coefficients).toEqual([4, 17, 20, 8, 1]);
    });
    it("Result when one of the operands is 0", () => {
      const f = new Polynomial(0);
      const g = new Polynomial(2, [1, 3, 1]);
      const result = Polynomial.multiply(f, g);
      expect(result.coefficients).toEqual([0]);
    });
    it("Result when one of the operands is 1", () => {
      const f = new Polynomial(0, [1]);
      const g = new Polynomial(2, [1, 3, 1]);
      const result = Polynomial.multiply(f, g);
      expect(result.coefficients).toEqual(g.coefficients);
    });
    it("Degree", () => {
      const f = new Polynomial(2, [4, 5, 1]);
      const g = new Polynomial(2, [1, 3, 1]);
      const result = Polynomial.multiply(f, g);
      expect(result.deg).toBe(f.deg + g.deg);
    });
    it("Degree when of the operands is 0", () => {
      const f = new Polynomial(2, [4, 5, 1]);
      const g = new Polynomial(0);
      const result = Polynomial.multiply(f, g);
      expect(result.deg).toBe(0);
    });
  });
});
