// A global object that stores data about different QR Code versions
// exposes some utility methods

import type { Version, ECB } from "../types";

function makeECB(totalCodewords: number, dataCodewords: number): ECB {
  return {
    totalCodewords,
    dataCodewords,
  };
}

function makeECBs(
  amount: number,
  totalCodewords: number,
  dataCodewords: number
): ECB[] {
  const result: ECB[] = [];
  for (let i = 0; i < amount; i++) {
    result.push(makeECB(totalCodewords, dataCodewords));
  }
  return result;
}

const VersionObj: Version = {
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
    },
  ],
};

export default VersionObj;
