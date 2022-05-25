import Masker from "../src/core/masker";
import { describe, it, expect } from "@jest/globals";

function createMaskFromString(s: string) {
  return {
    matrix: s.split("\n").map((s) => s.split("")),
  };
}

describe("Masker", () => {
  describe("Penalty 1", () => {
    it.each([
      [createMaskFromString(`000\n000\n000`), 0],
      [createMaskFromString(`00000\n00000\n00000\n00000\n00000`), 30],
      [
        createMaskFromString(
          `000000
      000000
      000000
      000000
      000000
      000000`
        ),
        36,
      ],
    ])("%#", (matrix, expectedValue) => {
      expect(Masker.penaltyOne(matrix)).toBe(expectedValue);
    });
  });
});
