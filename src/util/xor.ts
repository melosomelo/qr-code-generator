import type { Bit } from "../types";

export default function xor(x: Bit, y: Bit): Bit {
  if (x === "0") return y;
  else return flipBit(y);
}

function flipBit(bit: Bit): Bit {
  if (bit === "0") return "1";
  return "0";
}
