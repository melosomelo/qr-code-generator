import type { GF256 } from "../../types";

// An object representing the GF(256) and the operations
// that can be performed in it
const GF: GF256 = {
  add(a: number, b: number) {
    return a ^ b;
  },
  multiply(a: number, b: number) {
    if (a === 0 || b === 0) {
      return 0;
    }
    return this.antilog[(this.log[a] + this.log[b]) % 255];
  },
  divide(a: number, b: number) {
    if (b === 0) throw new Error("Cannot perform division by 0!");
    const bInverse = this.antilog[255 - this.log[b]];
    return this.antilog[(this.log[a] + this.log[bInverse]) % 255];
  },
  pow(a: number, b: number) {
    let result = 1;
    for (let i = 0; i < b; i++) {
      result = this.multiply(result, a);
    }
    return result;
  },
  log: {},
  antilog: {},
};

// initializing the field's values
(() => {
  GF.antilog[0] = 1;
  GF.log[1] = 0;
  for (let i = 1; i <= 255; i++) {
    const temp = GF.antilog[i - 1] * 2;
    const log = temp >= 256 ? temp ^ 285 : temp;
    GF.antilog[i] = log;
    GF.log[log] = i;
  }
})();

export default GF;
