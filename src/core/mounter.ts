import type { Mounter } from "../types";
import Version from "./versions";
import Walker from "./walker";

// Responsible for receiving the final message string (data + ec codewords)
// and mounting the matrix.

const MounterObj: Mounter = {
  matrix: [],
  walker: new Walker(),
  mountMatrix(message, version) {
    // First, we need to know the total size of the qr code symbol.
    const l = Version.length(version);
    // Initialize the empty matrix.
    this.matrix = new Array<string[]>();
    for (let i = 0; i < l; i++) {
      this.matrix.push(new Array<string>(l).fill(""));
    }
    this.walker = Walker.walk(this.matrix);
    this.placeFunctionPatterns();
    console.log(message);
    console.log(this.matrix);
    return this.matrix;
  },
  placeFunctionPatterns() {
    this.placeFinderPatterns();
    this.placeSeparators();
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
};

export default MounterObj;
