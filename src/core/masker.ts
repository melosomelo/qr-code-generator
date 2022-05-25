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
  calculatePenalties: (mask: Mask) => number;
  penaltyOne: (mask: Mask) => number;
  penaltyTwo: (mask: Mask) => number;
  penaltyThree: (mask: Mask) => number;
  calculateBestMask: () => string[][];
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
  // The penalty one states that for every row/column, any subsequence
  // of (5 + i) modules of equal color will add 3 + i points to the penalty
  penaltyOne(mask) {
    let counter = 0;
    let currentBit = mask.matrix[0][0];
    let result = 0;
    // first, we check every row
    for (let i = 0; i < mask.matrix.length; i++) {
      const row = mask.matrix[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === currentBit) {
          counter += 1;
        } else {
          if (counter >= 5) result += 3 + Math.max(0, counter - 5);
          currentBit = row[j];
          counter = 1;
        }
      }
      if (counter >= 5) result += 3 + Math.max(0, counter - 5);
      counter = 0;
    }
    currentBit = mask.matrix[0][0];
    // then, we check every column
    for (let i = 0; i < mask.matrix.length; i++) {
      for (let j = 0; j < mask.matrix.length; j++) {
        if (mask.matrix[j][i] === currentBit) {
          counter += 1;
        } else {
          if (counter >= 5) result += 3 + Math.max(0, counter - 5);
          currentBit = mask.matrix[j][i];
          counter = 1;
        }
      }
      if (counter >= 5) result += 3 + Math.max(0, counter - 5);
      counter = 0;
    }
    return result;
  },
  // The penalty two states that for every 2x2 block of modules of the same color
  // we add 3 to the penalty score
  // So the strategy is just to create a 2x2 square and travel around the whole
  // matrix to check.
  penaltyTwo(mask) {
    let result = 0;
    for (let i = 0; i < mask.matrix.length - 1; i++) {
      for (let j = 0; j < mask.matrix.length - 1; j++) {
        const topLeft = mask.matrix[i][j];
        const topRight = mask.matrix[i][j + 1];
        const bottomLeft = mask.matrix[i + 1][j];
        const bottomRight = mask.matrix[i + 1][j + 1];
        if (
          topLeft === topRight &&
          topRight === bottomLeft &&
          bottomLeft === bottomRight
        )
          result += 3;
      }
    }
    return result;
  },
  // The penalty three states that for every appearance of the following two modules,
  // add 40 to the penalty:
  // 10111010000
  // 00001011101
  // We will use the same strategy as with the 2nd penalty
  penaltyThree(mask) {
    let result = 0;
    const first = "10111010000";
    const second = "00001011101";
    // first, we check horizontally
    for (let i = 0; i < mask.matrix.length; i++) {
      for (let j = 0; j <= mask.matrix.length - 11; j++) {
        const slice = mask.matrix[i].slice(j, j + 11).join("");
        if (slice === first || slice === second) result += 40;
      }
    }
    // then, vertically
    for (let i = 0; i <= mask.matrix.length - 11; i++) {
      for (let j = 0; j < mask.matrix.length; j++) {
        let found = true;
        for (let k = 0; k < 11; k++) {
          if (
            first[k] !== mask.matrix[i + k][j] &&
            second[k] !== mask.matrix[i + k][j]
          ) {
            found = false;
            break;
          }
        }
        if (found) result += 40;
      }
    }
    return result;
  },
  calculatePenalties(mask) {
    return this.penaltyOne(mask) + this.penaltyTwo(mask);
  },
  calculateBestMask() {
    const results: Array<{ mask: Mask; result: number }> = [];
    this.masks.forEach((mask) => {
      results.push({
        mask,
        result: this.calculatePenalties(mask),
      });
    });
    results.sort((a, b) => a.result - b.result);
    return results[0].mask.matrix;
  },
};

export default Masker;
