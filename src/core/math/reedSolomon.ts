import type { ReedSolomon } from "../../types";
import Polynomial from "./polynomial";
import GF256 from "./gf256";
import Version from "../versions";
import toDecimal from "../../util/toDecimal";
import toBinaryString from "../../util/toBinaryString";

const RS: ReedSolomon = {
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
  generateBlocks(codewords, version, ecLevel) {
    // First, we transform the codewords into numbers.
    const numberedCodewords = codewords.map((codeword) => toDecimal(codeword));
    // The generation of error codewords will be done separately for each group.
    // So we need to get the info for this specific version and this specific ecLevel.
    const ECBsInfo = Version.versions[version - 1].ecInfo[ecLevel].ECBs;
    // Divide into groups (pre-blocks)
    const groups: Array<{ codewords: number[]; amountEcCodewords: number }> =
      [];
    let j = 0;
    for (let i = 0; i < ECBsInfo.length; i++) {
      groups.push({
        amountEcCodewords:
          ECBsInfo[i].totalCodewords - ECBsInfo[i].dataCodewords,
        codewords: numberedCodewords.slice(j, j + ECBsInfo[i].dataCodewords),
      });
      j += ECBsInfo[i].dataCodewords;
    }

    return groups.map((group) => {
      const remainderCoefficients = this.calculateEcCodewords(
        group.codewords,
        group.amountEcCodewords
      );
      return {
        ecCodewords: remainderCoefficients.map((coefficient) =>
          toBinaryString(coefficient, 8)
        ),
        dataCodewords: group.codewords.map((codeword) =>
          toBinaryString(codeword, 8)
        ),
      };
    });
  },
  // Calculates error correction codewords for a specific message.
  calculateEcCodewords(message, generatorDegree) {
    const generatorPolynomial = this.getGeneratorPolynomial(generatorDegree);
    // The specification states that the message polynomial must be multiplied
    // by x^(amount ec codewords)
    const messagePolynomial = Polynomial.multiply(
      new Polynomial(message.length - 1, message),
      new Polynomial(generatorDegree, [
        1,
        ...new Array(generatorDegree).fill(0),
      ])
    );
    const { remainder } = Polynomial.longDivide(
      messagePolynomial,
      generatorPolynomial
    );
    return remainder.coefficients;
  },
};

export default RS;
