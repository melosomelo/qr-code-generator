import type { ReedSolomon } from "../../types";
import Polynomial from "./polynomial";
import GF256 from "./gf256";
import Version from "../versions";
import toDecimal from "../../util/toDecimal";
import toBinaryString from "../../util/toBinaryString";

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
    // First, we transform the codewords into numbers.
    const numberedCodewords = codewords.map((codeword) => toDecimal(codeword));
    // The generation of error codewords will be done separately for each group.
    // So we need to get the info for this specific version and this specific ecLevel.
    const ECBs = Version.versions[version - 1].ecInfo[ecLevel].ECBs;
    // Divide into groups
    const groups: Array<{ codewords: number[]; amountEcCodewords: number }> =
      [];
    let j = 0;
    for (let i = 0; i < ECBs.length; i++) {
      groups.push({
        amountEcCodewords: ECBs[i].totalCodewords - ECBs[i].dataCodewords,
        codewords: numberedCodewords.slice(j, j + ECBs[i].dataCodewords),
      });
      j += ECBs[i].dataCodewords;
    }
    // Calculating the error correction codewords
    return groups.map((group) => {
      const generatorPolynomial = this.getGeneratorPolynomial(
        group.amountEcCodewords
      );
      // The specification states that the message polynomial must be multiplied
      // by x^(amount ec codewords)
      const messagePolynomial = Polynomial.multiply(
        new Polynomial(group.codewords.length - 1, group.codewords),
        new Polynomial(group.amountEcCodewords, [
          1,
          ...new Array(group.amountEcCodewords).fill(0),
        ])
      );
      const { remainder } = Polynomial.longDivide(
        messagePolynomial,
        generatorPolynomial
      );
      // Converting the codewords and ec codewords back to binary strings.
      const result = {
        dataCodewords: group.codewords.map((codeword) =>
          toBinaryString(codeword, 8)
        ),
        ecCodewords: remainder.coefficients.map((coefficient) =>
          toBinaryString(coefficient, 8)
        ),
      };
      return result;
    });
  },
  calculate(group) {
    const generatorPolynomial = this.getGeneratorPolynomial(
      group.amountEcCodewords
    );
    const messagePolynomial = new Polynomial(
      group.codewords.length - 1,
      group.codewords
    );
    console.log(generatorPolynomial, messagePolynomial);
  },
};

export default ReedSolomonObj;
