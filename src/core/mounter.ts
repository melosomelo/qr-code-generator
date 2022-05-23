import type { Mounter } from "../types";
import Version from "./versions";
import Walker from "./walker";

// Responsible for receiving the final message string (data + ec codewords)
// and mounting the matrix.

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

const MounterObj: Mounter = {
  matrix: [],
  walker: new Walker(),
  mountMatrix(message, version) {
    console.log(message.length);
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
    this.placeMessage(message, version);
    console.log(message);
    printMatrix(this.matrix);
    return this.matrix;
  },
  placeFunctionPatterns(version) {
    this.placeFinderPatterns();
    this.placeSeparators();
    this.placeTimingPatterns();
    this.placeAlignmentPatterns(version);
  },
  // The finder patterns are located on the top left, top right and bottom left of the QR Code.
  // They are composed of three concentric squares, with the first being a 7x7 dark square,
  // the second one being a 5x5 white square and the third being a 3x3 black square.
  placeFinderPattern(x, y) {
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
  placeFinderPatterns() {
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
  placeSeparator(x, y, firstDir, secondDir) {
    this.walker.startingAt(x, y).move([
      { fillFirst: true, fillWith: "0", times: 7, direction: firstDir },
      { fillWith: "0", times: 7, direction: secondDir },
    ]);
  },
  placeSeparators() {
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
  placeTimingPattern(x, y, direction) {
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
  placeTimingPatterns() {
    this.placeTimingPattern(8, 6, "RIGHT");
    this.placeTimingPattern(6, 8, "DOWN");
  },
  // Alignment patterns are composed of three concentric squares.
  // The first one is a 5x5 black square. The second one is a 3x3  white square
  // and the last one is a single black module.
  placeAlignmentPattern(centerX, centerY) {
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
  placeAlignmentPatterns(version) {
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
  reserveInfoModules(version) {
    const l = this.matrix.length - 1;
    console.log(version);
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
  placeMessage(message, version) {
    /*
    The movement of placing the message on the QR Code Matrix
    depends on the current direction (upwards or downwards).
    If it's upwards, then this is the order:
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
      // Starting at number 1 (bottom right or top right module),
      // we first check to see if it is already filled.
      if (this.matrix[y][x] === "") {
        this.matrix[y][x] = message[y * l + x];
        amountModulesPlaced += 1;
      }
      // On both possible scenarios, we then move left to number 2
      // and check it.
      x -= 1;
      if (this.matrix[y][x] === "") {
        this.matrix[y][x] = message[y * l + x];
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
