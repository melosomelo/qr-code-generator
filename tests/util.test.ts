import { describe, it, expect } from "@jest/globals";
import toBinaryString from "../src/util/toBinaryString";

describe("utility functions tests", () => {
  describe("toBinaryString()", () => {
    it.each([
      [8, undefined, "1000"],
      [1, undefined, "1"],
      [0, undefined, "0"],
      [8, 5, "01000"],
      [0, 10, "0000000000"],
      [10, undefined, "1010"],
      [45, undefined, "101101"],
      [1003, undefined, "1111101011"],
    ])(`%#`, (n, digits, result) =>
      expect(toBinaryString(n, digits)).toBe(result)
    );
  });
});
