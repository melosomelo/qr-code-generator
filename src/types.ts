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
