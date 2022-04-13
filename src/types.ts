export interface GF256 {
  add: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
  log: {
    [key: number]: number;
  };
  antilog: {
    [key: number]: number;
  };
}
