import { ErrorCorrectionDetectionLevel } from "../types";

type ECIndicators = {
  [k in ErrorCorrectionDetectionLevel]: string;
};

const EC_INDICATORS: ECIndicators = {
  L: "01",
  M: "00",
  Q: "11",
  H: "10",
};

export default EC_INDICATORS;
