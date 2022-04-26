/* Functions that represent the main steps of generating a QRCode, namely: 
  1. Data analysis - Analyze the data in order to check the best encoding mode (if none was specified) */

import QRCode from "./qrcode";
import MODE_INDICATORS from "../util/modeIndicators";
import type {
  EncodingMode,
  ErrorCorrectionDetectionLevel,
  GenerateQRCode,
} from "../types";

function isNumericChar(byte: number): boolean {
  return byte >= 48 && byte <= 57;
}

export function analyzeData(data: Buffer): EncodingMode {
  let result: EncodingMode = "numeric";
  for (const byte of data) {
    if (!isNumericChar(byte)) {
      result = "alphanumeric";
      break;
    }
  }
  return result;
}

const generateQRCode: GenerateQRCode = (data, options) => {
  // So far, only support for ISO/IEC 8859-1 (latin1).
  const inputBuffer = Buffer.from(data, "latin1");
  const mode: EncodingMode = options?.mode ?? analyzeData(inputBuffer);
  const modeIndicator = MODE_INDICATORS[mode];
  const ecLevel: ErrorCorrectionDetectionLevel =
    options?.errorCorrectionDetectionLevel ?? "M";
  return new QRCode(inputBuffer, {
    mode,
    errorCorrectionDetectionLevel: "H",
    version: 40,
  });
};

export default generateQRCode;
