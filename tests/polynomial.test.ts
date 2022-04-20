import Polynomial from "../src/core/polynomial";
import { describe, it, expect } from "@jest/globals";

describe("Polynomial class", () => {
  describe("add()", () => {
    it.each([
      [
        "Result with operands of equal degree",
        [5, 4, 0, 2],
        [1, 7, 42, 0],
        [4, 3, 42, 2],
      ],
      [
        "Result with operands of different degrees",
        [5, 4, 0, 2, 10, 0, 8],
        [1, 7, 42, 0],
        [5, 4, 0, 3, 13, 42, 8],
      ],
      [
        "Result when one of operands is a zero polynomial",
        [0],
        [2, 1, 2],
        [2, 1, 2],
      ],
    ])("%s", (_, fCoef, gCoef, resultCoef) => {
      const f = new Polynomial(fCoef.length - 1, fCoef);
      const g = new Polynomial(gCoef.length - 1, gCoef);
      const result = Polynomial.add(f, g);
      expect(result.coefficients).toEqual(resultCoef);
    });
    it("Degree of result", () => {
      const f = new Polynomial(3, [5, 4, 0, 2]);
      const g = new Polynomial(3, [1, 7, 42, 0]);
      const result = Polynomial.add(f, g);
      expect(result.deg).toBe(f.deg);
    });
    it("Degree of result when leading terms cancel out", () => {
      const f = new Polynomial(5, [5, 2, 30, 10, 15, 2]);
      const g = new Polynomial(5, [5, 1, 4, 2, 6, 10]);
      const result = Polynomial.add(f, g);
      expect(result.deg).toBe(f.deg - 1);
    });
  });
  describe("multiply()", () => {
    it.each([
      [
        "(4x^2 + 5x + 1)*(x^2 + 3x + 1)",
        [4, 5, 1],
        [1, 3, 1],
        [4, 9, 10, 6, 1],
      ],
      ["Result when one of operands is 0", [0], [1, 3, 1], [0]],
      ["Result when one of operands is 1", [1], [1, 3, 1], [1, 3, 1]],
    ])("%s", (_, fCoef, gCoef, resultCoef) => {
      const f = new Polynomial(fCoef.length - 1, fCoef);
      const g = new Polynomial(gCoef.length - 1, gCoef);
      const result = Polynomial.multiply(f, g);
      expect(result.coefficients).toEqual(resultCoef);
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
  describe("longDivide()", () => {
    it("Throw error when divisor is 0", () => {
      const f = new Polynomial(4, [1, 0, 6, 0, 2]);
      const g = new Polynomial(0);
      expect(() => Polynomial.longDivide(f, g)).toThrow();
    });
    it("Result when dividend is 0", () => {
      const f = new Polynomial(0);
      const g = new Polynomial(2, [1, 0, 5]);
      const { quotient } = Polynomial.longDivide(f, g);
      expect(quotient.coefficients).toEqual([0]);
    });
    describe("quotient results", () => {
      it.each([
        ["(x^4+6x^2+2x)/(x^2+5)", [1, 0, 6, 0, 2], [1, 0, 5], [1, 0, 3]],
        ["(x^3+x^2)/(x^2+x+2)", [1, 1, 0, 0], [1, 1, 2], [1, 0]],
        ["(2x^2+5x+18)/(x+4)", [2, 5, 18], [1, 4], [2, 13]],
      ])("%s", (_, fCoef, gCoef, resultCoef) => {
        const f = new Polynomial(fCoef.length - 1, fCoef);
        const g = new Polynomial(gCoef.length - 1, gCoef);
        const result = Polynomial.longDivide(f, g);
        expect(result.quotient.coefficients).toEqual(resultCoef);
      });
    });
    describe("remainder results", () => {
      it.each([
        ["(x^4+6x^2+2x)/(x^2+5)", [1, 0, 6, 0, 2], [1, 0, 5], [13]],
        ["(x^3+x^2)/(x^2+x+2)", [1, 1, 0, 0], [1, 1, 2], [2, 0]],
        ["(2x^2+5x+18)/(x+4)", [2, 5, 18], [1, 4], [38]],
      ])("%s", (_, fCoef, gCoef, resultCoef) => {
        const f = new Polynomial(fCoef.length - 1, fCoef);
        const g = new Polynomial(gCoef.length - 1, gCoef);
        const result = Polynomial.longDivide(f, g);
        expect(result.remainder.coefficients).toEqual(resultCoef);
      });
    });
  });
});
