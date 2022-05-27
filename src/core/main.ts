import QRCode from "./qrcode";
import MODE_INDICATORS from "../util/modeIndicators";
import type {
  EncodingMode,
  ErrorCorrectionDetectionLevel,
  GenerateQRCode,
} from "../types";
import assert from "../util/assert";
import analyzeData from "../util/analyzeData";
import mountCodewords from "../util/mountCodewords";
import interleaveBlocks from "../util/interleaveBlocks";
import Version from "./versions";
import encoders from "./encoders";
import toBinaryString from "../util/toBinaryString";
import RS from "./math/reedSolomon";
import Mounter from "./mounter";

function printMatrix(matrix: string[][]): void {
  for (let i = 0; i < matrix.length; i++) {
    let str = "";
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "1") str += "#";
      else str += " ";
    }
    console.log(str);
  }
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
  // Mount the intial data bit stream.
  const dataBitStream = `${modeIndicator}${characterCountIndicator}${encodedData}${terminatorSequence}`;
  // Mount the data codewords.
  const codewords = mountCodewords(dataBitStream, version, ecLevel);
  // Generate the blocks of data and ec codewords.
  const blocks = RS.generateBlocks(codewords, version, ecLevel);
  // Generate the final message by interleaving blocks and adding remainder bits.
  let finalMessage = interleaveBlocks(blocks);
  const amountRemainderBits = Version.amountDataModules(version) % 8;
  for (let i = 0; i < amountRemainderBits; i++) {
    finalMessage += "0";
  }
  const matrix = Mounter.mountQRCodeMatrix(finalMessage, version);
  printMatrix(matrix);
  return new QRCode(inputBuffer, {
    mode,
    errorCorrectionDetectionLevel: "H",
    version: 40,
  });
};

generateQRCode("HELLO WORLD", {
  errorCorrectionDetectionLevel: "M",
  version: 2,
});

export default generateQRCode;
