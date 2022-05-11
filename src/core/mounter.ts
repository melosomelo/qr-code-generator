import type { Mounter } from "../types";
import Version from "./versions";

// Responsible for receiving the final message string (data + ec codewords)
// and mounting the matrix.
const MounterObj: Mounter = {
  mountMatrix(message, version) {
    // First, we need to know the total size of the qr code symbol.
    const l = Version.length(version);
    // Create the empty matrix.
    const matrix = new Array<string[]>(l).fill(new Array<string>(l).fill(""));
    this.placeFunctionPatterns(matrix);
  },
  placeFunctionPatterns(matrix) {
    this.placeFinderPatterns(matrix);
  },
  placeFinderPatterns: (matrix) => {
    // The finder patterns are located on the top left, top right and bottom left of the QR Code.
    // They are composed of three concentric squares, with the first being a 7x7 dark square,
    // the second one being a 5x5 white square and the third being a 3x3 black square.
  },
};

export default MounterObj;
