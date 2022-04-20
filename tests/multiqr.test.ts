import { Buffer } from "buffer";
import { analyzeData } from "../src/core/multiqr";
import { describe, it, expect } from "@jest/globals";

describe("Main steps tests", () => {
  describe("Data analysis", () => {
    it("Numeric", () => {
      const buffer = Buffer.from("123", "latin1");
      expect(analyzeData(buffer)).toBe("numeric");
    });
    it("Alphanumeric", () => {
      const buffer = Buffer.from("Hello, world!", "latin1");
      expect(analyzeData(buffer)).toBe("alphanumeric");
    });
  });
});
