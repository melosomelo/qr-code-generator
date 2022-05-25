type MaskRule = (x: number, y: number) => boolean;

interface Mask {
  rule: MaskRule;
  matrix: string[][];
}

interface MaskerType {
  masks: Mask[];
  initializeMasks: (m: string[][]) => void;
  applyMask: (x: number, y: number, bit: "0" | "1") => void;
  flipBit: (bit: "0" | "1") => "0" | "1";
  xor: (x: "0" | "1", y: "0" | "1") => "0" | "1";
}

// Object responsible applying masks to the original message matrix
// and applying masks and determining the best result
const Masker: MaskerType = {
  masks: [
    {
      rule: (x, y) => (x + y) % 2 === 0,
      matrix: [],
    },
    {
      rule: (_, y) => y % 2 === 0,
      matrix: [],
    },
    {
      rule: (x, _) => x % 3 === 0,
      matrix: [],
    },
    {
      rule: (x, y) => (x + y) % 3 === 0,
      matrix: [],
    },
    {
      rule: (x, y) => ((y % 2) + (x % 3)) % 2 === 0,
      matrix: [],
    },
    {
      rule: (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
      matrix: [],
    },
    {
      rule: (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
      matrix: [],
    },
    {
      rule: (x, y) => (((x + y) % 2) + ((x + y) % 3)) % 2 === 0,
      matrix: [],
    },
  ],
  // Copying the message matrix after placing the
  // function patterns and reserving the info modules .
  initializeMasks(messageMatrix: string[][]): void {
    for (let i = 0; i < this.masks.length; i++) {
      this.masks[i].matrix = [...messageMatrix];
    }
  },
  xor(x, y) {
    if (x === "0") return y;
    else return this.flipBit(y);
  },
  flipBit(bit) {
    if (bit === "0") return "1";
    return "0";
  },
  applyMask(x, y, bit) {
    this.masks.forEach((mask) => {
      const { rule, matrix } = mask;
      let b: "0" | "1";
      if (rule(x, y)) {
        b = "1";
      } else {
        b = "0";
      }
      matrix[y][x] = this.xor(b, bit);
    });
  },
};

export default Masker;
