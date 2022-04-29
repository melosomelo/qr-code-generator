import { describe, it, expect } from "@jest/globals";
import Version from "../src/core/versions";

describe("Testing the Version object", () => {
  describe("ecInfo", () => {
    const versions = Version.versions;
    // For each version, check if the sum of the sizes of the ECBs is equal
    // for each possible error correction level.
    it.each(
      versions
        .map((version) => [
          version.ecInfo.L.ECBs,
          version.ecInfo.M.ECBs,
          version.ecInfo.Q.ECBs,
          version.ecInfo.H.ECBs,
        ])
        .map((versionEcbInfo) =>
          versionEcbInfo.map((ecbArray) =>
            ecbArray.reduce<number>(
              (prev, current) => prev + current.totalCodewords,
              0
            )
          )
        )
    )(
      "Testing equality of sum of size of ECBs of different ec levels for version (%# + 1)",
      (l, m, q, h) => {
        expect(l).toBe(m);
        expect(m).toBe(q);
        expect(q).toBe(h);
        expect(h).toBe(l);
      }
    );
  });
  describe("amountTotalModules", () => {
    it.each([
      [1, 21 * 21],
      [2, 25 * 25],
      [3, 29 * 29],
      [4, 33 * 33],
      [5, 37 * 37],
      [10, 57 * 57],
      [15, 77 * 77],
      [20, 97 * 97],
      [25, 117 * 117],
      [30, 137 * 137],
      [35, 157 * 157],
      [40, 177 * 177],
    ])("Version %d", (v, expectedValue) =>
      expect(Version.amountTotalModules(v)).toBe(expectedValue)
    );
  });
  describe("amountFunctionPatternModules", () => {
    it.each([
      [1, 202],
      [2, 235],
      [3, 243],
      [4, 251],
      [5, 259],
      [10, 414],
      [15, 619],
      [20, 659],
      [25, 914],
      [30, 1219],
      [35, 1574],
      [40, 1614],
    ])("Version %d", (v, expectedValue) =>
      expect(Version.amountFunctionPatternModules(v)).toBe(expectedValue)
    );
  });
  describe("amountDataModules", () => {
    it.each([
      [1, 208],
      [2, 359],
      [3, 567],
      [4, 807],
      [5, 1079],
      [10, 2768],
      [15, 5243],
      [20, 8683],
      [25, 12708],
      [30, 17483],
      [35, 23008],
      [40, 29648],
    ])("Version %d", (v, expectedValue) => {
      expect(Version.amountDataModules(v)).toBe(expectedValue);
    });
  });
  describe("willFit", () => {
    it.each([
      [210, 1, "numeric", "L", false],
      [153, 1, "numeric", "L", false],
      [100, 1, "numeric", "L", true],
      [371, 4, "alphanumeric", "Q", true],
      [372, 4, "alphanumeric", "Q", false],
      [5238, 28, "numeric", "H", true],
      [5270, 28, "numeric", "H", true],
      [5271, 28, "numeric", "H", false],
      [18312, 35, "alphanumeric", "L", true],
      [18431, 35, "alphanumeric", "L", true],
      [18913, 35, "alphanumeric", "L", false],
    ])(
      "%d bits, version %d, %s mode, ecLevel %s",
      (dataLength, version, mode, ecLevel, expectedValue) => {
        expect(Version.willFit(dataLength, version, mode, ecLevel)).toBe(
          expectedValue
        );
      }
    );
  });
});
