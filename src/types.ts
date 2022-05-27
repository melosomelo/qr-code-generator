import QRCode from "./core/qrcode";

export type ErrorCorrectionDetectionLevel = "L" | "M" | "Q" | "H";

export type Bit = "0" | "1";

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

export interface VersionInfo {
  version: number;
  ecInfo: {
    [key in ErrorCorrectionDetectionLevel]: {
      ECBs: ECBInfo[];
    };
  };
  alignmentPatternCenters: number[];
}

export interface MoveInstruction {
  direction: Direction;
  times: number;
  // Should the walker start out by moving away from the first cell or by filling it and then
  // moving away from it?
  fillFirst?: boolean;
  // This could mean: fill the region with all 0s, all 1s, or with the data
  // from a bigger string (the message or part of it).
  fillWith: Bit | string;
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

type MaskRule = (x: number, y: number) => boolean;
export interface Mask {
  rule: MaskRule;
  matrix: string[][];
  formatBitPattern: string;
}
