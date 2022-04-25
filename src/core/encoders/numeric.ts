import type { Encoder } from "../../types";
import toBinaryString from "../../util/toBinaryString";

const NumericEncoder: Encoder = {
  encode(data: string) {
    let result = "";
    for (let i = 0; i < Math.ceil(data.length / 3); i++) {
      const slice = data.slice(3 * i, Math.min(data.length, 3 * (i + 1)));
      const amountDigits = 4 + 3 * (slice.length - 1);
      result += toBinaryString(parseInt(slice, 10), amountDigits);
    }
    return result;
  },
};

export default NumericEncoder;
