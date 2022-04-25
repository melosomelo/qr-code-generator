import type { AlphanumericEncoder } from "../../types";
import toBinaryString from "../../util/toBinaryString";

const AlphanumEncoder: AlphanumericEncoder = {
  encode(data: string) {
    const upperCaseData = data.toUpperCase();
    let result = "";
    for (let i = 0; i < Math.ceil(data.length / 2); i++) {
      // if there is only one character remaining, encode it as a 6 bit number
      if (i * 2 === data.length - 1) {
        result += toBinaryString(this.encodingTable[upperCaseData[i * 2]], 6);
      } else {
        // if not, then multiply the first char's value by 45, add the second char's value
        // and then convert it to an 11 bit binary string
        result += `${
          this.encodingTable[upperCaseData[i * 2]] * 45 +
          this.encodingTable[upperCaseData[i * 2 + 1]]
        }`;
      }
      result +=
        i === data.length
          ? toBinaryString(this.encodingTable[upperCaseData[i * 2]], 6)
          : toBinaryString(
              this.encodingTable[i * 2] * 45 + this.encodingTable[i * 2 + 1],
              11
            );
    }
    return result;
  },
  encodingTable: {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    G: 16,
    H: 17,
    I: 18,
    J: 19,
    K: 20,
    L: 21,
    M: 22,
    N: 23,
    O: 24,
    P: 25,
    Q: 26,
    R: 27,
    S: 28,
    T: 29,
    U: 30,
    V: 31,
    W: 32,
    X: 33,
    Y: 34,
    Z: 35,
    " ": 36,
    $: 37,
    "%": 38,
    "*": 39,
    "+": 40,
    "-": 41,
    ".": 42,
    "/": 43,
    ":": 44,
  },
};

export default AlphanumEncoder;
