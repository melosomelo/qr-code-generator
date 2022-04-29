import type { ReedSolomon } from "../../types";
import Polynomial from "./polynomial";
import GF256 from "./gf256";
import Version from "../versions";

const ReedSolomonObj: ReedSolomon = {
  getGeneratorPolynomial(n) {
    let result = new Polynomial(0, [1]);
    for (let i = 0; i < n; i++) {
      result = Polynomial.multiply(
        result,
        new Polynomial(1, [1, GF256.pow(2, i)])
      );
    }
    return result;
  },
  generateErrorCorrectionCodewords(codewords, version, ecLevel) {
    const ECBInfo = Version.versions[version].ecInfo[ecLevel].ECBs;
  },
};

export default ReedSolomonObj;
