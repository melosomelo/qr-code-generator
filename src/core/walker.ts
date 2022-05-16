import type { MoveInstruction } from "../types";

// Class that provides some abstractions to the process of iterating
// through the QR Code matrix and filling its modules.
// It makes the code in mounter.ts (which actually holds the logic for the movements done)
// much more declarative and easier to understand.
export default class Walker {
  private matrix: string[][] = new Array<string[]>(0).fill(
    new Array<string>(0)
  );

  private x = 0;

  private y = 0;

  static walk(matrix: string[][]): Walker {
    const w = new Walker();
    w.matrix = matrix;
    return w;
  }

  public startingAt(x: number, y: number): Walker {
    const w = new Walker();
    w.matrix = this.matrix;
    w.x = x;
    w.y = y;
    return w;
  }

  private moveLeft(): void {
    this.x -= 1;
  }

  private moveRight(): void {
    this.x += 1;
  }

  private moveUp(): void {
    this.y -= 1;
  }

  private moveDown(): void {
    this.y += 1;
  }

  public fill(x: number, y: number, fill: "0" | "1"): void {
    this.matrix[y][x] = fill;
  }

  public fillRegion(
    topLeftX: number,
    topLeftY: number,
    width: number,
    height: number,
    fillWith: "0" | "1"
  ): void {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.matrix[topLeftY + i][topLeftX + j] = fillWith;
      }
    }
  }

  public move(instructions: MoveInstruction[]): void {
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];
      // This is the case where fillWith comes from the message.
      // I'll deal with it later.
      if (instruction.fillWith !== "0" && instruction.fillWith !== "1") {
        console.log("Coming from message!");
      } else {
        const fill: "0" | "1" = instruction.fillWith;
        if (instruction.fillFirst) {
          this.matrix[this.y][this.x] = fill;
        }
        for (let j = 0; j < instruction.times; j++) {
          switch (instruction.direction) {
            case "DOWN":
              this.moveDown();
              break;
            case "UP":
              this.moveUp();
              break;
            case "LEFT":
              this.moveLeft();
              break;
            case "RIGHT":
              this.moveRight();
              break;
          }
          this.matrix[this.y][this.x] = fill;
        }
      }
    }
  }
}
