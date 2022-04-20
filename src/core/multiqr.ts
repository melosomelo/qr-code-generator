/* Functions that represent the main steps of generating a QRCode, namely: 
  1. Data analysis - Analyze the data in order to check the best encoding mode (if none was specified) 
*/

import QRCode from "./qrcode";
import type {
  ErrorCorrectionDetectionLevel,
  EncodingMode,
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
  // so far, only support for ISO/IEC 8859-1 (latin1)
  const buffer = Buffer.from(data, "latin1");
  const mode: EncodingMode = options?.mode ?? analyzeData(buffer);
  const errorLevel: ErrorCorrectionDetectionLevel =
    options?.errorCorrectionDetectionLevel ?? "L";

  return new QRCode(buffer, {
    mode,
    errorCorrectionDetectionLevel: errorLevel,
    version: 40,
  });
};

export default generateQRCode;
