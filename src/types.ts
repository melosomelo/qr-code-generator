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
}

export type GenerateQRCode = (
  data: string,
  options?: GenerateQRCodeOptions
) => QRCode;
