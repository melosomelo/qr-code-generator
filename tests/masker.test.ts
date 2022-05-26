import Masker from "../src/core/masker";
import { describe, it, expect } from "@jest/globals";

function createMaskFromString(s: string) {
  const matrix: string[][] = [];
  const lines = s.split("\n").map((l) => l.trim());
  lines.forEach((line) => {
    matrix.push(Array.from(line));
  });
  return {
    matrix,
  };
}

describe("Masker", () => {
  describe("Penalty 1", () => {
    it.each([
      // [createMaskFromString(`000\n000\n000`), 0],
      // [createMaskFromString(`00000\n00000\n00000\n00000\n00000`), 30],
      [
        createMaskFromString(`00001
      10100
      00000
      00000
      00010`),
        12,
      ],
    ])("%#", (matrix, expectedValue) => {
      expect(Masker.penaltyOne(matrix)).toBe(expectedValue);
    });
  });
});
