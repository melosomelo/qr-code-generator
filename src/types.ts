import Polynomial from "./core/math/polynomial";
import QRCode from "./core/qrcode";

export interface GF256 {
  add: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
  pow: (a: number, b: number) => number;
  log: {
    [key: number]: number;
  };
  antilog: {
    [key: number]: number;
  };
}

export type ErrorCorrectionDetectionLevel = "L" | "M" | "Q" | "H";

export type EncodingMode = "numeric" | "alphanumeric";

export interface GenerateQRCodeOptions {
  mode?: EncodingMode;
  errorCorrectionDetectionLevel?: ErrorCorrectionDetectionLevel;
  version?: number;
}

export type GenerateQRCode = (
  data: string,
  options?: GenerateQRCodeOptions
) => QRCode;

export interface Encoder {
  encode: (data: string) => string;
}

export interface NumericEncoder extends Encoder {}

export interface AlphanumericEncoder extends Encoder {
  encodingTable: {
    [key: string]: number;
  };
  getEncoded: (char: string) => number;
}

export interface ECBInfo {
  totalCodewords: number;
  dataCodewords: number;
}

export interface ECB {
  dataCodewords: string[];
  ecCodewords: string[];
}

interface VersionInfo {
  version: number;
  ecInfo: {
    [key in ErrorCorrectionDetectionLevel]: {
      ECBs: ECBInfo[];
    };
  };
}

export interface Version {
  versions: VersionInfo[];
  willFit: (
    dataLength: number,
    version: number,
    mode: EncodingMode,
    ecLevel: ErrorCorrectionDetectionLevel
  ) => boolean;
  characterCountIndicatorLength: {
    [m in EncodingMode]: [number, number, number];
  };
  getCharacterCountIndicatorLength: (
    version: number,
    mode: EncodingMode
  ) => number;
  amountInfoModules: (version: number) => number;
  amountFunctionPatternModules: (version: number) => number;
  amountDataModules: (version: number) => number;
  amountRealDataModules: (
    version: number,
    mode: EncodingMode,
    ecLevel: ErrorCorrectionDetectionLevel
  ) => number;
  amountTotalModules: (version: number) => number;
  amountAlignmentPatterns: (version: number) => number;
  amountAlignmentPatternsIntersectingTimingPatterns: (
    version: number
  ) => number;
  amountErrorCorrectionModules: (
    version: number,
    ecLevel: ErrorCorrectionDetectionLevel
  ) => number;
  length: (version: number) => number;
}

export interface ReedSolomon {
  getGeneratorPolynomial: (degree: number) => Polynomial;
  generateBlocks: (
    codewords: string[],
    version: number,
    ecLevel: ErrorCorrectionDetectionLevel
  ) => ECB[];
  calculateEcCodewords: (
    message: number[],
    generatorDegree: number
  ) => number[];
}

export interface Mounter {
  mountMatrix: (message: string, version: number) => string[][];
  placeFunctionPatterns: (matrix: string[][]) => void;
  placeFinderPatterns: (matrix: string[][]) => void;
}

export interface MoveInstruction {
  direction: Direction;
  times: number;
  // Should the walker start out by moving away from the first cell or by filling it and then
  // moving away from it?
  fillFirst?: boolean;
  // This could mean: fill the region with all 0s, all 1s, or with the data
  // from a bigger string (the message or part of it).
  fillWith?: "0" | "1" | string;
  // Some patterns require to alternat between 0s and 1s.
  alternate?: boolean;
  // If you want to alternate, you need to specify which bit to start with.
  startWith?: "0" | "1";
}

export interface Walker {
  matrix: string[][];
  x: number;
  y: number;
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
