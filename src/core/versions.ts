// A global object that stores data about different QR Code versions
// exposes some utility methods

import type {
  ECBInfo,
  VersionInfo,
  EncodingMode,
  ErrorCorrectionDetectionLevel,
} from "../types";

function makeECB(totalCodewords: number, dataCodewords: number): ECBInfo {
  return {
    totalCodewords,
    dataCodewords,
  };
}

function makeECBs(
  amount: number,
  totalCodewords: number,
  dataCodewords: number
): ECBInfo[] {
  const result: ECBInfo[] = [];
  for (let i = 0; i < amount; i++) {
    result.push(makeECB(totalCodewords, dataCodewords));
  }
  return result;
}

const Version = {
  versions: [
    {
      version: 1,
      ecInfo: {
        L: {
          ECBs: [makeECB(26, 19)],
        },
        M: {
          ECBs: [makeECB(26, 16)],
        },
        Q: {
          ECBs: [makeECB(26, 13)],
        },
        H: {
          ECBs: [makeECB(26, 9)],
        },
      },
      alignmentPatternCenters: [],
    },
    {
      version: 2,
      ecInfo: {
        L: {
          ECBs: [makeECB(44, 34)],
        },
        M: {
          ECBs: [makeECB(44, 28)],
        },
        Q: {
          ECBs: [makeECB(44, 22)],
        },
        H: {
          ECBs: [makeECB(44, 16)],
        },
      },
      alignmentPatternCenters: [6, 18],
    },
    {
      version: 3,
      ecInfo: {
        L: {
          ECBs: [makeECB(70, 55)],
        },
        M: {
          ECBs: [makeECB(70, 44)],
        },
        Q: {
          ECBs: [makeECB(35, 17), makeECB(35, 17)],
        },
        H: {
          ECBs: [makeECB(35, 13), makeECB(35, 13)],
        },
      },
      alignmentPatternCenters: [6, 22],
    },
    {
      version: 4,
      ecInfo: {
        L: {
          ECBs: [makeECB(100, 80)],
        },
        M: {
          ECBs: [makeECB(50, 32), makeECB(50, 32)],
        },
        Q: {
          ECBs: [makeECB(50, 24), makeECB(50, 24)],
        },
        H: {
          ECBs: [
            makeECB(25, 9),
            makeECB(25, 9),
            makeECB(25, 9),
            makeECB(25, 9),
          ],
        },
      },
      alignmentPatternCenters: [6, 26],
    },
    {
      version: 5,
      ecInfo: {
        L: {
          ECBs: [makeECB(134, 108)],
        },
        M: {
          ECBs: [makeECB(67, 43), makeECB(67, 43)],
        },
        Q: {
          ECBs: [
            makeECB(33, 15),
            makeECB(33, 15),
            makeECB(34, 16),
            makeECB(34, 16),
          ],
        },
        H: {
          ECBs: [
            makeECB(33, 11),
            makeECB(33, 11),
            makeECB(34, 12),
            makeECB(34, 12),
          ],
        },
      },
      alignmentPatternCenters: [6, 30],
    },
    {
      version: 6,
      ecInfo: {
        L: {
          ECBs: [makeECB(86, 68), makeECB(86, 68)],
        },
        M: {
          ECBs: [
            makeECB(43, 27),
            makeECB(43, 27),
            makeECB(43, 27),
            makeECB(43, 27),
          ],
        },
        Q: {
          ECBs: [
            makeECB(43, 19),
            makeECB(43, 19),
            makeECB(43, 19),
            makeECB(43, 19),
          ],
        },
        H: {
          ECBs: [
            makeECB(43, 15),
            makeECB(43, 15),
            makeECB(43, 15),
            makeECB(43, 15),
          ],
        },
      },
      alignmentPatternCenters: [6, 34],
    },
    {
      version: 7,
      ecInfo: {
        L: {
          ECBs: [makeECB(98, 78), makeECB(98, 78)],
        },
        M: {
          ECBs: [
            makeECB(49, 31),
            makeECB(49, 31),
            makeECB(49, 31),
            makeECB(49, 31),
          ],
        },
        Q: {
          ECBs: [
            makeECB(32, 14),
            makeECB(32, 14),
            makeECB(33, 15),
            makeECB(33, 15),
            makeECB(33, 15),
            makeECB(33, 15),
          ],
        },
        H: {
          ECBs: [
            makeECB(39, 13),
            makeECB(39, 13),
            makeECB(39, 13),
            makeECB(39, 13),
            makeECB(40, 14),
          ],
        },
      },
      alignmentPatternCenters: [6, 22, 38],
    },
    {
      version: 8,
      ecInfo: {
        L: {
          ECBs: [makeECB(121, 97), makeECB(121, 97)],
        },
        M: {
          ECBs: [
            makeECB(60, 38),
            makeECB(60, 38),
            makeECB(61, 39),
            makeECB(61, 39),
          ],
        },
        Q: {
          ECBs: [
            makeECB(40, 18),
            makeECB(40, 18),
            makeECB(40, 18),
            makeECB(40, 18),
            makeECB(41, 19),
            makeECB(41, 19),
          ],
        },
        H: {
          ECBs: [
            makeECB(40, 14),
            makeECB(40, 14),
            makeECB(40, 14),
            makeECB(40, 14),
            makeECB(41, 15),
            makeECB(41, 15),
          ],
        },
      },
      alignmentPatternCenters: [6, 24, 42],
    },
    {
      version: 9,
      ecInfo: {
        L: {
          ECBs: [makeECB(146, 116), makeECB(146, 116)],
        },
        M: {
          ECBs: [
            makeECB(58, 36),
            makeECB(58, 36),
            makeECB(58, 36),
            makeECB(59, 37),
            makeECB(59, 37),
          ],
        },
        Q: {
          ECBs: [
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(37, 17),
            makeECB(37, 17),
            makeECB(37, 17),
            makeECB(37, 17),
          ],
        },
        H: {
          ECBs: [
            makeECB(36, 12),
            makeECB(36, 12),
            makeECB(36, 12),
            makeECB(36, 12),
            makeECB(37, 13),
            makeECB(37, 13),
            makeECB(37, 13),
            makeECB(37, 13),
          ],
        },
      },
      alignmentPatternCenters: [6, 26, 46],
    },
    {
      version: 10,
      ecInfo: {
        L: {
          ECBs: [
            makeECB(86, 68),
            makeECB(86, 68),
            makeECB(87, 69),
            makeECB(87, 69),
          ],
        },
        M: {
          ECBs: [
            makeECB(69, 43),
            makeECB(69, 43),
            makeECB(69, 43),
            makeECB(69, 43),
            makeECB(70, 44),
          ],
        },
        Q: {
          ECBs: [
            makeECB(43, 19),
            makeECB(43, 19),
            makeECB(43, 19),
            makeECB(43, 19),
            makeECB(43, 19),
            makeECB(43, 19),
            makeECB(44, 20),
            makeECB(44, 20),
          ],
        },
        H: {
          ECBs: [
            makeECB(43, 15),
            makeECB(43, 15),
            makeECB(43, 15),
            makeECB(43, 15),
            makeECB(43, 15),
            makeECB(43, 15),
            makeECB(44, 16),
            makeECB(44, 16),
          ],
        },
      },
      alignmentPatternCenters: [6, 28, 50],
    },
    {
      version: 11,
      ecInfo: {
        L: {
          ECBs: [
            makeECB(101, 81),
            makeECB(101, 81),
            makeECB(101, 81),
            makeECB(101, 81),
          ],
        },
        M: {
          ECBs: [
            makeECB(80, 50),
            makeECB(81, 51),
            makeECB(81, 51),
            makeECB(81, 51),
            makeECB(81, 51),
          ],
        },
        Q: {
          ECBs: [
            makeECB(50, 22),
            makeECB(50, 22),
            makeECB(50, 22),
            makeECB(50, 22),
            makeECB(51, 23),
            makeECB(51, 23),
            makeECB(51, 23),
            makeECB(51, 23),
          ],
        },
        H: {
          ECBs: [
            makeECB(36, 12),
            makeECB(36, 12),
            makeECB(36, 12),
            makeECB(37, 13),
            makeECB(37, 13),
            makeECB(37, 13),
            makeECB(37, 13),
            makeECB(37, 13),
            makeECB(37, 13),
            makeECB(37, 13),
            makeECB(37, 13),
          ],
        },
      },
      alignmentPatternCenters: [6, 30, 54],
    },
    {
      version: 12,
      ecInfo: {
        L: {
          ECBs: [
            makeECB(116, 92),
            makeECB(116, 92),
            makeECB(117, 93),
            makeECB(117, 93),
          ],
        },
        M: {
          ECBs: [
            makeECB(58, 36),
            makeECB(58, 36),
            makeECB(58, 36),
            makeECB(58, 36),
            makeECB(58, 36),
            makeECB(58, 36),
            makeECB(59, 37),
            makeECB(59, 37),
          ],
        },
        Q: {
          ECBs: [
            makeECB(46, 20),
            makeECB(46, 20),
            makeECB(46, 20),
            makeECB(46, 20),
            makeECB(47, 21),
            makeECB(47, 21),
            makeECB(47, 21),
            makeECB(47, 21),
            makeECB(47, 21),
            makeECB(47, 21),
          ],
        },
        H: {
          ECBs: [
            makeECB(42, 14),
            makeECB(42, 14),
            makeECB(42, 14),
            makeECB(42, 14),
            makeECB(42, 14),
            makeECB(42, 14),
            makeECB(42, 14),
            makeECB(43, 15),
            makeECB(43, 15),
            makeECB(43, 15),
            makeECB(43, 15),
          ],
        },
      },
      alignmentPatternCenters: [6, 32, 58],
    },
    {
      version: 13,
      ecInfo: {
        L: {
          ECBs: [
            makeECB(133, 107),
            makeECB(133, 107),
            makeECB(133, 107),
            makeECB(133, 107),
          ],
        },
        M: {
          ECBs: [
            makeECB(59, 37),
            makeECB(59, 37),
            makeECB(59, 37),
            makeECB(59, 37),
            makeECB(59, 37),
            makeECB(59, 37),
            makeECB(59, 37),
            makeECB(59, 37),
            makeECB(60, 38),
          ],
        },
        Q: {
          ECBs: [
            makeECB(44, 20),
            makeECB(44, 20),
            makeECB(44, 20),
            makeECB(44, 20),
            makeECB(44, 20),
            makeECB(44, 20),
            makeECB(44, 20),
            makeECB(44, 20),
            makeECB(45, 21),
            makeECB(45, 21),
            makeECB(45, 21),
            makeECB(45, 21),
          ],
        },
        H: {
          ECBs: [
            makeECB(33, 11),
            makeECB(33, 11),
            makeECB(33, 11),
            makeECB(33, 11),
            makeECB(33, 11),
            makeECB(33, 11),
            makeECB(33, 11),
            makeECB(33, 11),
            makeECB(33, 11),
            makeECB(33, 11),
            makeECB(33, 11),
            makeECB(33, 11),
            makeECB(34, 12),
            makeECB(34, 12),
            makeECB(34, 12),
            makeECB(34, 12),
          ],
        },
      },
      alignmentPatternCenters: [6, 34, 62],
    },
    {
      version: 14,
      ecInfo: {
        L: {
          ECBs: [
            makeECB(145, 115),
            makeECB(145, 115),
            makeECB(145, 115),
            makeECB(146, 116),
          ],
        },
        M: {
          ECBs: [
            makeECB(64, 40),
            makeECB(64, 40),
            makeECB(64, 40),
            makeECB(64, 40),
            makeECB(65, 41),
            makeECB(65, 41),
            makeECB(65, 41),
            makeECB(65, 41),
            makeECB(65, 41),
          ],
        },
        Q: {
          ECBs: [
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(36, 16),
            makeECB(37, 17),
            makeECB(37, 17),
            makeECB(37, 17),
            makeECB(37, 17),
            makeECB(37, 17),
          ],
        },
        H: {
          ECBs: [...makeECBs(11, 36, 12), ...makeECBs(5, 37, 13)],
        },
      },
      alignmentPatternCenters: [6, 26, 46, 66],
    },
    {
      version: 15,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(5, 109, 87), ...makeECBs(1, 110, 88)],
        },
        M: {
          ECBs: [...makeECBs(5, 65, 41), ...makeECBs(5, 66, 42)],
        },
        Q: {
          ECBs: [...makeECBs(5, 54, 24), ...makeECBs(7, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(11, 36, 12), ...makeECBs(7, 37, 13)],
        },
      },
      alignmentPatternCenters: [6, 26, 48, 70],
    },
    {
      version: 16,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(5, 122, 98), ...makeECBs(1, 123, 99)],
        },
        M: {
          ECBs: [...makeECBs(7, 73, 45), ...makeECBs(3, 74, 46)],
        },
        Q: {
          ECBs: [...makeECBs(15, 43, 19), ...makeECBs(2, 44, 20)],
        },
        H: {
          ECBs: [...makeECBs(3, 45, 15), ...makeECBs(13, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 26, 50, 74],
    },
    {
      version: 17,
      ecInfo: {
        L: {
          ECBs: [makeECB(135, 107), ...makeECBs(5, 136, 108)],
        },
        M: {
          ECBs: [...makeECBs(10, 74, 46), makeECB(75, 47)],
        },
        Q: {
          ECBs: [makeECB(50, 22), ...makeECBs(15, 51, 23)],
        },
        H: {
          ECBs: [...makeECBs(2, 42, 14), ...makeECBs(17, 43, 15)],
        },
      },
      alignmentPatternCenters: [6, 30, 54, 78],
    },
    {
      version: 18,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(5, 150, 120), makeECB(151, 121)],
        },
        M: {
          ECBs: [...makeECBs(9, 69, 43), ...makeECBs(4, 70, 44)],
        },
        Q: {
          ECBs: [...makeECBs(17, 50, 22), makeECB(51, 23)],
        },
        H: {
          ECBs: [...makeECBs(2, 42, 14), ...makeECBs(19, 43, 15)],
        },
      },
      alignmentPatternCenters: [6, 30, 56, 82],
    },
    {
      version: 19,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(3, 141, 113), ...makeECBs(4, 142, 114)],
        },
        M: {
          ECBs: [...makeECBs(3, 70, 44), ...makeECBs(11, 71, 45)],
        },
        Q: {
          ECBs: [...makeECBs(17, 47, 21), ...makeECBs(4, 48, 22)],
        },
        H: {
          ECBs: [...makeECBs(9, 39, 13), ...makeECBs(16, 40, 14)],
        },
      },
      alignmentPatternCenters: [6, 30, 58, 86],
    },
    {
      version: 20,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(3, 135, 107), ...makeECBs(5, 136, 108)],
        },
        M: {
          ECBs: [...makeECBs(3, 67, 41), ...makeECBs(13, 68, 42)],
        },
        Q: {
          ECBs: [...makeECBs(15, 54, 24), ...makeECBs(5, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(15, 43, 15), ...makeECBs(10, 44, 16)],
        },
      },
      alignmentPatternCenters: [6, 34, 62, 90],
    },
    {
      version: 21,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(4, 144, 116), ...makeECBs(4, 145, 117)],
        },
        M: {
          ECBs: [...makeECBs(17, 68, 42)],
        },
        Q: {
          ECBs: [...makeECBs(17, 50, 22), ...makeECBs(6, 51, 23)],
        },
        H: {
          ECBs: [...makeECBs(19, 46, 16), ...makeECBs(6, 47, 17)],
        },
      },
      alignmentPatternCenters: [6, 28, 50, 72, 94],
    },
    {
      version: 22,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(2, 139, 111), ...makeECBs(7, 140, 112)],
        },
        M: {
          ECBs: [...makeECBs(17, 74, 46)],
        },
        Q: {
          ECBs: [...makeECBs(7, 54, 24), ...makeECBs(16, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(34, 37, 12)],
        },
      },
      alignmentPatternCenters: [6, 26, 50, 74, 98],
    },
    {
      version: 23,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(4, 151, 121), ...makeECBs(5, 152, 122)],
        },
        M: {
          ECBs: [...makeECBs(4, 75, 47), ...makeECBs(14, 76, 48)],
        },
        Q: {
          ECBs: [...makeECBs(11, 54, 24), ...makeECBs(14, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(16, 45, 15), ...makeECBs(14, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 30, 54, 78, 102],
    },
    {
      version: 24,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(6, 147, 117), ...makeECBs(4, 148, 118)],
        },
        M: {
          ECBs: [...makeECBs(6, 73, 45), ...makeECBs(14, 74, 46)],
        },
        Q: {
          ECBs: [...makeECBs(11, 54, 24), ...makeECBs(16, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(30, 46, 16), ...makeECBs(2, 47, 17)],
        },
      },
      alignmentPatternCenters: [6, 28, 54, 80, 106],
    },
    {
      version: 25,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(8, 132, 106), ...makeECBs(4, 133, 107)],
        },
        M: {
          ECBs: [...makeECBs(8, 75, 47), ...makeECBs(13, 76, 48)],
        },
        Q: {
          ECBs: [...makeECBs(7, 54, 24), ...makeECBs(22, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(22, 45, 15), ...makeECBs(13, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 32, 58, 84, 110],
    },
    {
      version: 26,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(10, 142, 114), ...makeECBs(2, 143, 115)],
        },
        M: {
          ECBs: [...makeECBs(19, 74, 46), ...makeECBs(4, 75, 47)],
        },
        Q: {
          ECBs: [...makeECBs(28, 50, 22), ...makeECBs(6, 51, 23)],
        },
        H: {
          ECBs: [...makeECBs(33, 46, 16), ...makeECBs(4, 47, 17)],
        },
      },
      alignmentPatternCenters: [6, 30, 58, 86, 114],
    },
    {
      version: 27,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(8, 152, 122), ...makeECBs(4, 153, 123)],
        },
        M: {
          ECBs: [...makeECBs(22, 73, 45), ...makeECBs(3, 74, 46)],
        },
        Q: {
          ECBs: [...makeECBs(8, 53, 23), ...makeECBs(26, 54, 24)],
        },
        H: {
          ECBs: [...makeECBs(12, 45, 15), ...makeECBs(28, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 34, 62, 90, 118],
    },
    {
      version: 28,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(3, 147, 117), ...makeECBs(10, 148, 118)],
        },
        M: {
          ECBs: [...makeECBs(3, 73, 45), ...makeECBs(23, 74, 46)],
        },
        Q: {
          ECBs: [...makeECBs(4, 54, 24), ...makeECBs(31, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(11, 45, 15), ...makeECBs(31, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 26, 50, 74, 98, 122],
    },
    {
      version: 29,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(7, 146, 116), ...makeECBs(7, 147, 117)],
        },
        M: {
          ECBs: [...makeECBs(21, 73, 45), ...makeECBs(7, 74, 46)],
        },
        Q: {
          ECBs: [makeECB(53, 23), ...makeECBs(37, 54, 24)],
        },
        H: {
          ECBs: [...makeECBs(19, 45, 15), ...makeECBs(26, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 30, 54, 78, 102, 126],
    },
    {
      version: 30,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(5, 145, 115), ...makeECBs(10, 146, 116)],
        },
        M: {
          ECBs: [...makeECBs(19, 75, 47), ...makeECBs(10, 76, 48)],
        },
        Q: {
          ECBs: [...makeECBs(15, 54, 24), ...makeECBs(25, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(23, 45, 15), ...makeECBs(25, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 26, 52, 78, 104, 130],
    },
    {
      version: 31,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(13, 145, 115), ...makeECBs(3, 146, 116)],
        },
        M: {
          ECBs: [...makeECBs(2, 74, 46), ...makeECBs(29, 75, 47)],
        },
        Q: {
          ECBs: [...makeECBs(42, 54, 24), ...makeECBs(1, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(23, 45, 15), ...makeECBs(28, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 30, 56, 82, 108, 134],
    },
    {
      version: 32,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(17, 145, 115)],
        },
        M: {
          ECBs: [...makeECBs(10, 74, 46), ...makeECBs(23, 75, 47)],
        },
        Q: {
          ECBs: [...makeECBs(10, 54, 24), ...makeECBs(35, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(19, 45, 15), ...makeECBs(35, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 34, 60, 86, 112, 138],
    },
    {
      version: 33,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(17, 145, 115), makeECB(146, 116)],
        },
        M: {
          ECBs: [...makeECBs(14, 74, 46), ...makeECBs(21, 75, 47)],
        },
        Q: {
          ECBs: [...makeECBs(29, 54, 24), ...makeECBs(19, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(11, 45, 15), ...makeECBs(46, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 30, 58, 86, 114, 142],
    },
    {
      version: 34,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(13, 145, 115), ...makeECBs(6, 146, 116)],
        },
        M: {
          ECBs: [...makeECBs(14, 74, 46), ...makeECBs(23, 75, 47)],
        },
        Q: {
          ECBs: [...makeECBs(44, 54, 24), ...makeECBs(7, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(59, 46, 15), makeECB(47, 17)],
        },
      },
      alignmentPatternCenters: [6, 34, 62, 90, 118, 146],
    },
    {
      version: 35,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(12, 151, 121), ...makeECBs(7, 152, 122)],
        },
        M: {
          ECBs: [...makeECBs(12, 75, 47), ...makeECBs(26, 76, 48)],
        },
        Q: {
          ECBs: [...makeECBs(39, 54, 24), ...makeECBs(14, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(22, 45, 15), ...makeECBs(41, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 30, 54, 78, 102, 126, 150],
    },
    {
      version: 36,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(6, 151, 121), ...makeECBs(14, 152, 122)],
        },
        M: {
          ECBs: [...makeECBs(6, 75, 47), ...makeECBs(34, 76, 48)],
        },
        Q: {
          ECBs: [...makeECBs(46, 54, 24), ...makeECBs(10, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(2, 45, 15), ...makeECBs(64, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 24, 50, 76, 102, 128, 154],
    },
    {
      version: 37,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(17, 152, 122), ...makeECBs(4, 153, 123)],
        },
        M: {
          ECBs: [...makeECBs(29, 74, 46), ...makeECBs(14, 75, 47)],
        },
        Q: {
          ECBs: [...makeECBs(49, 54, 24), ...makeECBs(10, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(24, 45, 15), ...makeECBs(46, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 28, 54, 80, 106, 132, 158],
    },
    {
      version: 38,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(4, 152, 122), ...makeECBs(18, 153, 123)],
        },
        M: {
          ECBs: [...makeECBs(13, 74, 46), ...makeECBs(32, 75, 47)],
        },
        Q: {
          ECBs: [...makeECBs(48, 54, 24), ...makeECBs(14, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(42, 45, 15), ...makeECBs(32, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 32, 58, 84, 110, 136, 162],
    },
    {
      version: 39,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(20, 147, 117), ...makeECBs(4, 148, 118)],
        },
        M: {
          ECBs: [...makeECBs(40, 75, 47), ...makeECBs(7, 76, 48)],
        },
        Q: {
          ECBs: [...makeECBs(43, 54, 24), ...makeECBs(22, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(10, 45, 15), ...makeECBs(67, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 26, 54, 82, 110, 138, 166],
    },
    {
      version: 40,
      ecInfo: {
        L: {
          ECBs: [...makeECBs(19, 148, 118), ...makeECBs(6, 149, 119)],
        },
        M: {
          ECBs: [...makeECBs(18, 75, 47), ...makeECBs(31, 76, 48)],
        },
        Q: {
          ECBs: [...makeECBs(34, 54, 24), ...makeECBs(34, 55, 25)],
        },
        H: {
          ECBs: [...makeECBs(20, 45, 15), ...makeECBs(61, 46, 16)],
        },
      },
      alignmentPatternCenters: [6, 30, 58, 86, 114, 142, 170],
    },
  ] as VersionInfo[],
  willFit(
    dataLength: number,
    version: number,
    mode: EncodingMode,
    ecLevel: ErrorCorrectionDetectionLevel
  ) {
    return this.amountRealDataModules(version, mode, ecLevel) >= dataLength;
  },
  // When talking about data modules, the specification doesn't distinguish between
  // modules used by the mode indicator, character count indicator, error correction codewords
  // and remainder bits. So, "real" data modules would be those ones that are
  // available for use by the encoded data.
  amountRealDataModules(
    version: number,
    mode: EncodingMode,
    ecLevel: ErrorCorrectionDetectionLevel
  ): number {
    // Mode indicator is always 4 bits for QR Codes.
    const modeIndicatorLength = 4;
    const characterCountIndicatorLength = this.getCharacterCountIndicatorLength(
      version,
      mode
    );
    const errorCorrectionBits = this.amountErrorCorrectionModules(
      version,
      ecLevel
    );
    const remainderBits = this.amountDataModules(version) % 8;
    return (
      this.amountDataModules(version) -
      (modeIndicatorLength +
        characterCountIndicatorLength +
        errorCorrectionBits +
        remainderBits)
    );
  },
  characterCountIndicatorLength: {
    alphanumeric: [9, 11, 13],
    numeric: [10, 12, 14],
  },
  amountErrorCorrectionModules(
    version: number,
    ecLevel: ErrorCorrectionDetectionLevel
  ): number {
    return this.versions[version - 1].ecInfo[ecLevel].ECBs.reduce<number>(
      (prev, current) =>
        prev + (current.totalCodewords - current.dataCodewords) * 8,
      0
    );
  },
  getCharacterCountIndicatorLength(
    version: number,
    mode: EncodingMode
  ): number {
    const possibleValues = this.characterCountIndicatorLength[mode];
    if (version >= 1 && version <= 9) return possibleValues[0];
    else if (version >= 10 && version <= 26) return possibleValues[1];
    return possibleValues[2];
  },
  amountFunctionPatternModules(version: number): number {
    const l = this.length(version);
    const finderPatternModules = 7 * 7 * 3;
    const separatorModules = 15 * 3;
    const timingPatternModules = (l - 8 * 2) * 2;
    // The alignment patterns intersect with timing patterns in
    // some versions, so we need to make sure they're not counted twice.
    const alignmentPatternModules =
      25 * this.amountAlignmentPatterns(version) -
      5 * this.amountAlignmentPatternsIntersectingTimingPatterns(version);
    return (
      finderPatternModules +
      separatorModules +
      timingPatternModules +
      alignmentPatternModules
    );
  },
  amountAlignmentPatternsIntersectingTimingPatterns(version: number): number {
    if (version === 1) return 0;
    return Math.floor(version / 7) * 2;
  },
  amountDataModules(version: number): number {
    return (
      this.amountTotalModules(version) -
      (this.amountFunctionPatternModules(version) +
        this.amountInfoModules(version))
    );
  },
  // Find a way to improve this later.
  amountAlignmentPatterns(version: number): number {
    if (version === 1) return 0;
    if (version >= 2 && version < 7) return 1;
    if (version >= 7 && version < 14) return 6;
    if (version >= 14 && version < 21) return 13;
    if (version >= 21 && version < 28) return 22;
    if (version >= 28 && version < 35) return 33;
    return 46;
  },
  amountInfoModules(version: number): number {
    return (
      this.amountFormatInfoModules() + this.amountVersionInfoModules(version)
    );
  },
  amountFormatInfoModules(): number {
    return 31;
  },
  amountVersionInfoModules(version: number): number {
    if (version >= 1 && version <= 6) return 0;
    return 36;
  },
  amountTotalModules(version: number): number {
    const l = this.length(version);
    return l * l;
  },
  length(version: number): number {
    return 21 + 4 * (version - 1);
  },
};

export default Version;
