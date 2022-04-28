import type { Encoder, EncodingMode } from "../../types";

import AlphanumericEncoder from "./alphanumeric";
import NumericEncoder from "./numeric";

type Encoders = {
  [k in EncodingMode]: Encoder;
};

const encodersObj: Encoders = {
  alphanumeric: AlphanumericEncoder,
  numeric: NumericEncoder,
};

export default encodersObj;
