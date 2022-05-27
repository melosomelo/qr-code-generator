import Version from "../core/versions";
import type { ErrorCorrectionDetectionLevel } from "../types";

// Mounts the initial codewords after encoding data and setting
// mode indicator, character count indicator and terminator sequence.
export default function mountCodewords(
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
  const reps = amountCodewords - codewords.length;
  for (let i = 0; i < reps; i++) {
    if (i % 2 === 0) codewords.push("11101100");
    else codewords.push("00010001");
  }
  return codewords;
}
