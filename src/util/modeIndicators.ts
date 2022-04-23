import type { EncodingMode } from "../types";

type ModeIndicators = {
  [k in EncodingMode]: string;
};

const MODE_INDICATORS: ModeIndicators = {
  numeric: "0001",
  alphanumeric: "0010",
};

export default MODE_INDICATORS;
