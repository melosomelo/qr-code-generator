import type { Direction } from "../types";
startingAt(0, 0).move([
  {
    direction: Direction.RIGHT,
    times: 6,
    fillWith: "0",
  },
]);

class Walker {
  matrix: string[][] = new Array<string[]>(0).fill(new Array<string>(0));
  x = 0;
  y = 0;

  static walk(matrix: string[][]): Walker {
    const w = new Walker();
    w.matrix = matrix;
    return w;
  }

  startingAt(x: number, y: number): Walker {
    const w = new Walker();
    w.matrix = this.matrix;
    w.x = x;
    w.y = y;
    return w;
  }

  move(
    instructions: Array<{
      direction: Direction;
      times: number;
      fillWidth: "0" | "1";
    }>
  ): void {}
}
