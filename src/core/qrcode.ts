import type { EncodingMode, ErrorCorrectionDetectionLevel } from "../types";
import assert from "../util/assert";

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

  private validateConstructorParams(options: ConstructorOptions): void {
    assert(
      ["alphanumeric", "numeric"].includes(options.mode),
      `Invalid mode provided. Must be either "numeric" or "alphanumeric". Received: ${options.mode}`
    );
    assert(
      ["L", "M", "Q", "H"].includes(options.errorCorrectionDetectionLevel),
      `Invalid error correction level provided. Must be either "L", "M", "Q" or "H". Received: ${options.errorCorrectionDetectionLevel}`
    );
    assert(
      options.version >= 1 && options.version <= 40,
      `Invalid version specified. Must be integer between 1 and 40. Received: ${options.version}`
    );
  }

  constructor(data: Buffer, options: ConstructorOptions) {
    const { mode, errorCorrectionDetectionLevel, version } = options;
    this.validateConstructorParams(options);
    this.data = data;
    this.mode = mode;
    this.version = version;
    this.errorLevel = errorCorrectionDetectionLevel;
    console.log(this.data, this.mode, this.errorLevel, this.version);
  }
}
