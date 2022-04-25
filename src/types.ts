import QRCode from "./core/qrcode";

export interface GF256 {
  add: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
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
