import { describe, it, expect } from "@jest/globals";
import ReedSolomon from "../src/core/math/reedSolomon";

describe("Testing the ReedSolomon object", () => {
  describe("getGeneratorPolynomial()", () => {
    it.each([
      [2, [1, 3, 2]],
      [5, [1, 31, 198, 63, 147, 116]],
      [6, [1, 63, 1, 218, 32, 227, 38]],
      [10, [1, 216, 194, 159, 111, 199, 94, 95, 113, 157, 193]],
      [
        22,
        [
          1, 89, 179, 131, 176, 182, 244, 19, 189, 69, 40, 28, 137, 29, 123, 67,
          253, 86, 218, 230, 26, 145, 245,
        ],
      ],
    ])("Generator polynomial of degree %d", (deg, expectedCoefficients) =>
      expect(ReedSolomon.getGeneratorPolynomial(deg).coefficients).toEqual(
        expectedCoefficients
      )
    );
  });
});
