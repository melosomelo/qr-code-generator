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
      [createMaskFromString(`000\n000\n000`), 0],
      [createMaskFromString(`00000\n00000\n00000\n00000\n00000`), 30],
      [createMaskFromString(`00001\n10100\n00000\n00000\n00010`), 9],
      [
        createMaskFromString(`000000\n000000\n000000\n000000\n000000\n000000`),
        48,
      ],
      [
        createMaskFromString(
          `0000010\n0000000\n0000010\n1100000\n0100000\n0000100\n0000000`
        ),
        40,
      ],
    ])("%#", (matrix, expectedValue) => {
      expect(Masker.penaltyOne(matrix)).toBe(expectedValue);
    });
  });
  describe("Penalty 2", () => {
    it.each([
      [createMaskFromString(`00\n00`), 3],
      [createMaskFromString(`11\n11`), 3],
      [createMaskFromString(`000\n000\n000`), 12],
      [createMaskFromString(`10\n01`), 0],
      [createMaskFromString(`111\n100\n100`), 3],
    ])("%#", (matrix, expectedValue) =>
      expect(Masker.penaltyTwo(matrix)).toBe(expectedValue)
    );
  });
  describe("Penalty 3", () => {
    it.each([
      [
        createMaskFromString(
          `10111010000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000`
        ),
        40,
      ],
      [
        createMaskFromString(
          `10111010000\n10111010000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000`
        ),
        80,
      ],
      [
        createMaskFromString(
          `101110100000\n000000000000\n000000000000\n000000000000\n000000000000\n000000000000\n000000000000\n000000000000\n000000000000\n000000000000\n000000000000`
        ),
        40,
      ],
      [
        createMaskFromString(
          `10000000000\n00000000000\n10000000000\n10000000000\n10000000000\n00000000000\n10000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000`
        ),
        40,
      ],
      [
        createMaskFromString(
          `10100000000\n00000000000\n10100000000\n10100000000\n10100000000\n00000000000\n10100000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000`
        ),
        80,
      ],
      [
        createMaskFromString(
          `10111010000\n00001011101\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000\n00000000000`
        ),
        80,
      ],
    ])("%#", (matrix, expectedValue) =>
      expect(Masker.penaltyThree(matrix)).toBe(expectedValue)
    );
  });
});
