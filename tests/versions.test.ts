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
      "Testing equality of sum of size of ECBs of different ec levels for version %#",
      (l, m, q, h) => {
        expect(l).toBe(m);
        expect(m).toBe(q);
        expect(q).toBe(h);
        expect(h).toBe(l);
      }
    );
  });
});
