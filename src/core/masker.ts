type MaskRule = (x: number, y: number) => boolean;

interface Mask {
  rule: MaskRule;
  matrix: string[][];
  formatBitPattern: string;
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
  penaltyFour: (mask: Mask) => number;
  calculateBestMask: () => Mask;
}

// Object responsible applying masks to the original message matrix
// and applying masks and determining the best result
const Masker: MaskerType = {
  masks: [
    {
      rule: (x, y) => (x + y) % 2 === 0,
      matrix: [],
      formatBitPattern: "000",
    },
    {
      rule: (_, y) => y % 2 === 0,
      matrix: [],
      formatBitPattern: "001",
    },
    {
      rule: (x, _) => x % 3 === 0,
      matrix: [],
      formatBitPattern: "010",
    },
    {
      rule: (x, y) => (x + y) % 3 === 0,
      matrix: [],
      formatBitPattern: "011",
    },
    {
      rule: (x, y) => ((y % 2) + (x % 3)) % 2 === 0,
      matrix: [],
      formatBitPattern: "100",
    },
    {
      rule: (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
      matrix: [],
      formatBitPattern: "101",
    },
    {
      rule: (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
      matrix: [],
      formatBitPattern: "110",
    },
    {
      rule: (x, y) => (((x + y) % 2) + ((x + y) % 3)) % 2 === 0,
      matrix: [],
      formatBitPattern: "111",
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
    // First, we check horizontally.
    for (let i = 0; i < mask.matrix.length; i++) {
      for (let j = 0; j < mask.matrix.length; j++) {
        // Increase the counter.
        if (mask.matrix[i][j] === currentBit) {
          counter += 1;
        } else {
          // If not, then we need to check if the broken sequence so far amounts
          // to at least 5 equal modules.
          if (counter >= 5) {
            result += 3 + Math.max(0, counter - 5);
          }
          counter = 1;
          currentBit = mask.matrix[i][j];
        }
      }
      // After finishing a line, we need to check if the result and reset
      // the counter.
      if (counter >= 5) {
        result += 3 + Math.max(0, counter - 5);
      }
      counter = 0;
    }
    counter = 0;
    currentBit = mask.matrix[0][0];
    // Then, we check vertically.
    for (let i = 0; i < mask.matrix.length; i++) {
      for (let j = 0; j < mask.matrix.length; j++) {
        if (mask.matrix[j][i] === currentBit) {
          counter += 1;
        } else {
          if (counter >= 5) {
            result += 3 + Math.max(0, counter - 5);
          }
          counter = 1;
          currentBit = mask.matrix[j][i];
        }
      }
      if (counter >= 5) {
        result += 3 + Math.max(0, counter - 5);
      }
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
  // The fourth penalty says to first calculate the percentage of dark modules
  // in the symbol, to then calculate how much that differs (absolutely) from 50%.
  // Then, for each 5% deviation, we add 10 points.
  penaltyFour(mask) {
    const totalAmountOfModules = mask.matrix.length * mask.matrix.length;
    let amountDarkModules = 0; // amount of modules equal to 1
    for (let i = 0; i < mask.matrix.length; i++) {
      for (let j = 0; j < mask.matrix.length; j++) {
        if (mask.matrix[i][j] === "1") amountDarkModules += 1;
      }
    }
    const percentageOfDarkModules = Math.floor(
      amountDarkModules / totalAmountOfModules
    );
    return Math.floor(Math.abs(percentageOfDarkModules - 50) / 5) * 10;
  },
  calculatePenalties(mask) {
    return (
      this.penaltyOne(mask) +
      this.penaltyTwo(mask) +
      this.penaltyThree(mask) +
      this.penaltyFour(mask)
    );
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
    return results[0].mask;
  },
};

export default Masker;
