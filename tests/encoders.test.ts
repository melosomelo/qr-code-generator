import { describe, it, expect } from "@jest/globals";
import NumericEncoder from "../src/core/encoders/numeric";

describe("Encoders", () => {
  describe("Numeric encoder", () => {
    it.each([
      ["01234567", "000000110001010110011000011"],
      [
        "0123456789012345",
        "000000110001010110011010100110111000010100111010100101",
      ],
      ["1", "0001"],
      ["0", "0000"],
      ["10", "0001010"],
      ["4915738", "011110101110001111011000"],
    ])("Encoding %s", (data, expectedResult) =>
      expect(NumericEncoder.encode(data)).toBe(expectedResult)
    );
  });
});
