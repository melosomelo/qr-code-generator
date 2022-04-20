// A collection of functions that help calculate parameters of the QR Code
// based on its selected version

function length(version: number): number {
  return 21 + 4 * (version - 1);
}

export function numberOfModules(version: number): number {
  const l = length(version);
  return l * l;
}

function numberOfAlignmentPatterns(version: number): number {
  if (version === 1) return 0;
  if (version >= 2 && version < 7) return 1;
  if (version >= 7 && version < 14) return 6;
  if (version >= 14 && version < 21) return 13;
  if (version >= 21 && version < 28) return 22;
  if (version >= 28 && version < 35) return 33;
  return 46;
}

function numberOfAlignmentPatternsIntersectingTimingPatterns(
  version: number
): number {
  if (version === 1) return 0;
  return Math.floor(version / 7) * 2;
}

export function numberOfFunctionPatternModules(version: number): number {
  const l = length(version);
  const finderPatternModules = 7 * 7 * 3;
  const separatorModules = 15 * 3;
  const timingPatternModules = (l - 8 * 2) * 2;
  // The alignment patterns intersect with timing patterns in some
  // version, so we need to make sure they're not counted twice
  const alignmentPatternModules =
    25 * numberOfAlignmentPatterns(version) -
    5 * numberOfAlignmentPatternsIntersectingTimingPatterns(version);
  return (
    finderPatternModules +
    separatorModules +
    timingPatternModules +
    alignmentPatternModules
  );
}

function numberOfInfoAndFormatModules(version: number): number {
  if (version >= 1 && version < 7) return 31;
  return 67;
}

export function numberOfDataModules(version: number): number {
  return (
    numberOfModules(version) -
    (numberOfFunctionPatternModules(version) +
      numberOfInfoAndFormatModules(version))
  );
}
