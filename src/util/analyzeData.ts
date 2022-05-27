import type { EncodingMode } from "../types";

function isNumericChar(byte: number): boolean {
  return byte >= 48 && byte <= 57;
}

export default function analyzeData(data: Buffer): EncodingMode {
  let result: EncodingMode = "numeric";
  for (const byte of data) {
    if (!isNumericChar(byte)) {
      result = "alphanumeric";
      break;
    }
  }
  return result;
}
