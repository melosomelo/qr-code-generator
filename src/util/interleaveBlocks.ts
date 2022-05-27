import type { ECB } from "../types";

// After mounting the blocks, this will mount the final sequence of codewords
export default function interleaveBlocks(blocks: ECB[]): string {
  let result = "";
  // Some blocks have more data codewords than others, and the specification states
  // that the smallest blocks must come first. I don't know for sure if I wrote
  // every block in the correct order in the versions.ts file, so I'm sorting just in case.
  blocks.sort((a, b) => a.dataCodewords.length - b.dataCodewords.length);
  const maxAmountOfCodewords = blocks[blocks.length - 1].dataCodewords.length;
  // First, we interleave the data codewords.
  for (let i = 0; i < maxAmountOfCodewords; i++) {
    for (let j = 0; j < blocks.length; j++) {
      // Remember, some blocks have less data codewords than others.
      if (blocks[j].dataCodewords[i] === undefined) continue;
      result += blocks[j].dataCodewords[i];
    }
  }
  // Then, we interleave the ec codewords, following the same strategy as before.
  // Each block always has the same amount.
  const amountEcCodewords = blocks[0].ecCodewords.length;
  for (let i = 0; i < amountEcCodewords; i++) {
    for (let j = 0; j < blocks.length; j++) {
      result += blocks[j].ecCodewords[i];
    }
  }
  return result;
}
