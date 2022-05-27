import type { Direction, Bit, Mask } from "../types";
import Version from "./versions";
import Walker from "./walker";
import xor from "../util/xor";

/*
function printMatrix(matrix: string[][]): void {
  for (let i = 0; i < matrix.length; i++) {
    let str = "";
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "1") str += "#";
      else str += " ";
    }
    console.log(str);
  }
}
*/

// Responsible for mounting the QR Code matrix.
const MounterObj = {
  matrix: [] as string[][],
  walker: new Walker(),
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
  ] as Mask[],
  initializeMasks(): void {
    // Each mask initially is a copy of the current state of the matrix.
    for (let i = 0; i < this.masks.length; i++) {
      this.masks[i].matrix = [...this.matrix];
    }
  },
  applyMask(x: number, y: number, bit: Bit): void {
    this.masks.forEach((mask) => {
      const { rule, matrix } = mask;
      let b: Bit;
      if (rule(x, y)) {
        b = "1";
      } else {
        b = "0";
      }
      matrix[y][x] = xor(b, bit);
    });
  },
  // The penalty one states that for every row/column, any subsequence
  // of (5 + i) modules of equal color will add 3 + i points to the penalty
  penaltyOne(mask: Mask): number {
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
  penaltyTwo(mask: Mask): number {
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
  penaltyThree(mask: Mask): number {
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
  penaltyFour(mask: Mask): number {
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
  calculatePenalties(mask: Mask): number {
    return (
      this.penaltyOne(mask) +
      this.penaltyTwo(mask) +
      this.penaltyThree(mask) +
      this.penaltyFour(mask)
    );
  },
  mountQRCodeMatrix(message: string, version: number): string[][] {
    // First, we need to know the total size of the qr code symbol.
    const l = Version.length(version);
    // Initialize the empty matrix.
    this.matrix = new Array<string[]>();
    for (let i = 0; i < l; i++) {
      this.matrix.push(new Array<string>(l).fill(""));
    }
    this.walker = Walker.walk(this.matrix);
    this.placeFunctionPatterns(version);
    this.reserveInfoModules(version);
    this.initializeMasks();
    this.placeMessage(message, version);
    // after placing the message and generating each mask, we
    // need to pick the best one.
    const results: Array<{ mask: Mask; result: number }> = this.masks.map(
      (mask) => ({
        mask,
        result: this.calculatePenalties(mask),
      })
    );
    results.sort((a, b) => a.result - b.result);
    const bestMask = results[0].mask;
    // Now we have to place the format and version information
    return this.matrix;
  },
  placeFunctionPatterns(version: number): void {
    this.placeFinderPatterns();
    this.placeSeparators();
    this.placeTimingPatterns();
    this.placeAlignmentPatterns(version);
  },
  // The finder patterns are located on the top left, top right and bottom left of the QR Code.
  // They are composed of three concentric squares, with the first being a 7x7 dark square,
  // the second one being a 5x5 white square and the third being a 3x3 black square.
  placeFinderPattern(x: number, y: number): void {
    this.walker.startingAt(x, y).move([
      {
        fillFirst: true,
        fillWith: "1",
        times: 6,
        direction: "RIGHT",
      },
      {
        fillWith: "1",
        times: 6,
        direction: "DOWN",
      },
      {
        fillWith: "1",
        times: 6,
        direction: "LEFT",
      },
      {
        fillWith: "1",
        times: 6,
        direction: "UP",
      },
    ]);
    this.walker.startingAt(x + 1, y + 1).move([
      {
        fillFirst: true,
        fillWith: "0",
        times: 4,
        direction: "RIGHT",
      },
      {
        fillWith: "0",
        times: 4,
        direction: "DOWN",
      },
      {
        fillWith: "0",
        times: 4,
        direction: "LEFT",
      },
      {
        fillWith: "0",
        times: 4,
        direction: "UP",
      },
    ]);
    this.walker.startingAt(x + 2, y + 2).move([
      {
        fillFirst: true,
        fillWith: "1",
        times: 2,
        direction: "RIGHT",
      },
      {
        fillWith: "1",
        times: 2,
        direction: "DOWN",
      },
      {
        fillWith: "1",
        times: 2,
        direction: "LEFT",
      },
      {
        fillWith: "1",
        times: 2,
        direction: "UP",
      },
    ]);
    this.walker.fill(x + 3, y + 3, "1");
  },
  placeFinderPatterns(): void {
    const l = this.matrix.length - 1;
    // top left one
    this.placeFinderPattern(0, 0);
    // bottom left one
    this.placeFinderPattern(0, l - 6);
    // top right one
    this.placeFinderPattern(l - 6, 0);
  },
  // Separators separate a finder pattern from the rest of the qr code.
  // They are an 1 module wide and have an L shape.
  placeSeparator(
    x: number,
    y: number,
    firstDir: Direction,
    secondDir: Direction
  ): void {
    this.walker.startingAt(x, y).move([
      { fillFirst: true, fillWith: "0", times: 7, direction: firstDir },
      { fillWith: "0", times: 7, direction: secondDir },
    ]);
  },
  placeSeparators(): void {
    const l = this.matrix.length - 1;
    // top left one
    this.placeSeparator(7, 0, "DOWN", "LEFT");
    // bottom left one
    this.placeSeparator(0, l - 7, "RIGHT", "DOWN");
    // top right one
    this.placeSeparator(l - 7, 0, "DOWN", "RIGHT");
  },
  // Timing patterns are one module-wide pattern of alternating
  // black and white modules that connect the adjacent pairs of finder patterns.
  placeTimingPattern(x: number, y: number, direction: "RIGHT" | "DOWN"): void {
    const l = this.matrix.length;
    const lengthTimingPattern = l - 8 * 2;
    for (let i = 0; i < lengthTimingPattern; i++) {
      if (i % 2 === 0) {
        this.matrix[y][x] = "1";
      } else {
        this.matrix[y][x] = "0";
      }
      if (direction === "DOWN") y += 1;
      else x += 1;
    }
  },
  placeTimingPatterns(): void {
    this.placeTimingPattern(8, 6, "RIGHT");
    this.placeTimingPattern(6, 8, "DOWN");
  },
  // Alignment patterns are composed of three concentric squares.
  // The first one is a 5x5 black square. The second one is a 3x3  white square
  // and the last one is a single black module.
  placeAlignmentPattern(centerX: number, centerY: number): void {
    // First, we need to check if they're not intersecting any of the three finder patterns.
    const l = this.matrix.length - 1;
    const isIntersectingTopLeftFinderPattern =
      centerX - 2 <= 6 && centerY - 2 <= 6;
    const isIntersectingTopRightFinderPattern =
      centerX + 2 >= l - 6 && centerX + 2 <= l && centerY - 2 <= 6;
    const isIntersectingBottomLeftFinderPattern =
      centerX - 2 <= 6 && centerY + 2 >= l - 6 && centerY + 2 <= l;
    if (
      isIntersectingBottomLeftFinderPattern ||
      isIntersectingTopLeftFinderPattern ||
      isIntersectingTopRightFinderPattern
    )
      return;
    // the 1x1 center module
    this.walker.fill(centerX, centerY, "1");
    // the 3x3 white square
    this.walker.startingAt(centerX - 1, centerY - 1).move([
      {
        fillFirst: true,
        fillWith: "0",
        direction: "RIGHT",
        times: 2,
      },
      {
        fillWith: "0",
        direction: "DOWN",
        times: 2,
      },
      {
        fillWith: "0",
        direction: "LEFT",
        times: 2,
      },
      {
        fillWith: "0",
        direction: "UP",
        times: 2,
      },
    ]);
    this.walker.startingAt(centerX - 2, centerY - 2).move([
      {
        fillFirst: true,
        fillWith: "1",
        direction: "RIGHT",
        times: 4,
      },
      {
        fillWith: "1",
        direction: "DOWN",
        times: 4,
      },
      {
        fillWith: "1",
        direction: "LEFT",
        times: 4,
      },
      {
        fillWith: "1",
        direction: "UP",
        times: 4,
      },
    ]);
  },
  placeAlignmentPatterns(version: number): void {
    const possibleCenters =
      Version.versions[version - 1].alignmentPatternCenters;
    for (let i = 0; i < possibleCenters.length; i++) {
      for (let j = 0; j < possibleCenters.length; j++) {
        this.placeAlignmentPattern(possibleCenters[i], possibleCenters[j]);
      }
    }
  },
  // The info module placement happens after the placement of the message.
  // Because of this, it's necessary to reserve these modules, so that
  // when the message is being placed, it doesn't invade these spaces.
  reserveInfoModules(version: number): void {
    const l = this.matrix.length - 1;
    if (Version.amountVersionInfoModules(version) > 0) {
      // place the version info modules
      this.walker.fillRegion(0, l - 10, 6, 3, "1");
      this.walker.fillRegion(l - 10, 0, 3, 6, "1");
    }
    // place the format info modules
    this.walker
      .startingAt(l, 8)
      .move([{ fillFirst: true, fillWith: "1", direction: "LEFT", times: 7 }]);
    this.walker.startingAt(8, l).move([
      {
        fillFirst: true,
        fillWith: "1",
        direction: "UP",
        times: 6,
      },
    ]);
    this.walker.startingAt(8, 0).move([
      {
        direction: "DOWN",
        times: 8,
        fillWith: "1",
        fillFirst: true,
      },
      {
        direction: "LEFT",
        times: 8,
        fillWith: "1",
      },
    ]);
  },
  placeMessage(message: string, version: number): void {
    /*
      The movement of placing the message on the QR Code Matrix
      depends on the current direction (upwards or downwards).
      If it's upwards, then this is the order
      | 4 | 3 |
      | 2 | 1 |
      If it's downwards, then this is the order:
      | 2 | 1 |
      | 4 | 3 |
    */
    let currentDirection: "UP" | "DOWN" = "UP";
    let amountModulesPlaced = 0;
    const l = Version.length(version);
    // We start at the bottom right corner.
    let x = l - 1;
    let y = l - 1;
    while (amountModulesPlaced < message.length) {
      // If x == 6, then we're at the vertical timing pattern column.
      // We need to skip this column, idk why.
      if (x === 6) {
        x -= 1;
      }
      // Starting at number 1 (bottom right or top right module),
      // we first check to see if it is already filled.
      if (this.matrix[y][x] === "") {
        this.matrix[y][x] = message[amountModulesPlaced];
        // While placing the message, we already create the different masks.
        // We do this now because it's the best time to do so:
        // the masks should only be applied to the data bits, not function patterns
        // nor info/format modules.
        this.applyMask(x, y, message[amountModulesPlaced] as Bit);
        amountModulesPlaced += 1;
      }
      // On both possible scenarios, we then move left to number 2
      // and check it.
      x -= 1;
      if (this.matrix[y][x] === "" && amountModulesPlaced < message.length) {
        this.matrix[y][x] = message[amountModulesPlaced];
        this.applyMask(x, y, message[amountModulesPlaced] as Bit);
        amountModulesPlaced += 1;
      }
      // To go to number 3, we need to make a "jump".
      // After the jump, number 3 becomes the new number 1.
      // If we're going UP, then this jump is going up and then right.
      // If we're going DOWN, then it is going down and the right.
      // Before making a jump, we need to make sure we're not on the edges
      // of the QR Code Matrix. If we are, then we need to switch directions.
      if (currentDirection === "UP") {
        if (y !== 0) {
          // Going up and then right.
          y -= 1;
          x += 1;
        } else {
          // If we need to switch directions, we need to
          // go to one cell left so that we start at the right place.
          currentDirection = "DOWN";
          x -= 1;
        }
      } else {
        if (y !== l - 1) {
          // Going down and then right.
          y += 1;
          x += 1;
        } else {
          currentDirection = "UP";
          x -= 1;
        }
      }
    }
  },
};

export default MounterObj;
