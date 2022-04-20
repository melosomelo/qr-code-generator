import type { EncodingMode, ErrorCorrectionDetectionLevel } from "../types";

interface ConstructorOptions {
  mode: EncodingMode;
  errorCorrectionDetectionLevel: ErrorCorrectionDetectionLevel;
  version: number;
}

export default class QRCode {
  private readonly data: Buffer;
  private readonly mode: EncodingMode;
  private readonly errorLevel: ErrorCorrectionDetectionLevel;
  private readonly version: number;

  constructor(data: Buffer, options: ConstructorOptions) {
    const { mode, errorCorrectionDetectionLevel, version } = options;
    this.data = data;
    this.mode = mode;
    this.version = version;
    this.errorLevel = errorCorrectionDetectionLevel;
    console.log(this.data, this.mode, this.errorLevel, this.version);
  }
}
