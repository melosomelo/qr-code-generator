// A global object that stores data about different QR Code versions
// exposes some utility methods

import type { Version, ECB } from "../types";

function makeECB(totalCodewords: number, dataCodewords: number): ECB {
  return {
    totalCodewords,
    dataCodewords,
  };
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
  ],
};
