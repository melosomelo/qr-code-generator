/* Functions that represent the main steps of generating a QRCode, namely: 
  1. Data analysis - Analyze the data in order to check the best encoding mode (if none was specified) */

import QRCode from "./qrcode";
import MODE_INDICATORS from "../util/modeIndicators";
import type {
  EncodingMode,
  ErrorCorrectionDetectionLevel,
  GenerateQRCode,
} from "../types";
import assert from "../util/assert";
import Version from "../core/versions";
import encoders from "../core/encoders";
import toBinaryString from "../util/toBinaryString";

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

function mountCodewords(
  bitStream: string,
  version: number,
  ecLevel: ErrorCorrectionDetectionLevel
): string[] {
  // Pad the bit stream if its length isn't a multiple of 8.
  let finalBitStream = `${bitStream}`;
  const codewords: string[] = [];
  const nextMultipleOfEight = Math.ceil(bitStream.length / 8) * 8;
  for (let i = 0; i < nextMultipleOfEight - bitStream.length; i++) {
    finalBitStream += "0";
  }
  // Mount the initial codewords
  for (let i = 0; i < finalBitStream.length / 8; i++) {
    codewords.push(finalBitStream.slice(i * 8, (i + 1) * 8));
  }
  // Amount of data codewords for the version and ecLevel.
  // If the amount of codewords so far is smaller, then we need to
  // add padding codewords.
  const amountCodewords =
    Math.floor(Version.amountDataModules(version) / 8) -
    Math.floor(Version.amountErrorCorrectionModules(version, ecLevel) / 8);
  for (let i = 0; i < amountCodewords - codewords.length; i++) {
    if (i % 2 === 0) codewords.push("11101100");
    else codewords.push("00010001");
  }
  return codewords;
}

const generateQRCode: GenerateQRCode = (data, options) => {
  // So far, only support for ISO/IEC 8859-1 (latin1).
  const inputBuffer = Buffer.from(data, "latin1");
  const mode: EncodingMode = options?.mode ?? analyzeData(inputBuffer);
  const ecLevel: ErrorCorrectionDetectionLevel =
    options?.errorCorrectionDetectionLevel ?? "M";
  const encoder = encoders[mode];
  const encodedData = encoder.encode(data);
  let version = 1;
  // Check to see if provided version + ecLevel is enough to store the data.
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (options?.version) {
    assert(
      Version.willFit(encodedData.length, options.version, mode, ecLevel),
      "Data is too big for selected version!"
    );
    version = options.version;
  } else {
    // If no version was provided, calculate the minimal version that works.
    while (!Version.willFit(encodedData.length, version, mode, ecLevel)) {
      version += 1;
    }
    // Deal with data too big for any possible version.
  }
  // Determine the size of the terminator sequence.
  // For QR Codes, the size is always 4 bits. But, if the remaining data capacity
  // is less than 4, then the sequence must be shortened (or even omitted).
  const terminatorSequenceLength = Math.min(
    4,
    Version.amountRealDataModules(version, mode, ecLevel) - encodedData.length
  );
  let terminatorSequence = "";
  for (let i = 0; i < terminatorSequenceLength; i++) {
    terminatorSequence += "0";
  }
  const modeIndicator = MODE_INDICATORS[mode];
  const characterCountIndicator = toBinaryString(
    data.length,
    Version.getCharacterCountIndicatorLength(version, mode)
  );
  // Mount the data bit stream.
  const dataBitStream = `${modeIndicator}${characterCountIndicator}${encodedData}${terminatorSequence}`;
  // Mount the codewords.
  const codewords = mountCodewords(dataBitStream, version, ecLevel);
  console.log(codewords);
  return new QRCode(inputBuffer, {
    mode,
    errorCorrectionDetectionLevel: "H",
    version: 40,
  });
};

export default generateQRCode;
