import type { GF256 } from "../types";

const GF: GF256 = {
  add(a: number, b: number) {
    const temp = a + b;
    return temp >= 256 ? temp ^ 285 : temp;
  },
  multiply(a: number, b: number) {
    if (a === 0 || b === 0) {
      return 0;
    }
    return this.antilog[(this.log[a] + this.log[b]) % 255];
  },
  divide(a: number, b: number) {
    return this.antilog[(this.log[a] + this.log[255 - b]) % 255];
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
