import type { Direction, MoveInstruction } from "../types";

export default class Walker {
  matrix: string[][] = new Array<string[]>(0).fill(new Array<string>(0));
  x = 0;
  y = 0;

  private readonly movementFunctions: {
    [d in Direction]: () => void;
  } = {
    UP: this.moveUp,
    DOWN: this.moveDown,
    RIGHT: this.moveRight,
    LEFT: this.moveLeft,
  };

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

  moveLeft(): void {
    this.x -= 1;
  }

  moveRight(): void {
    this.x += 1;
  }

  moveUp(): void {
    this.y -= 1;
  }

  moveDown(): void {
    this.y += 1;
  }

  alternate(bit: "0" | "1"): "0" | "1" {
    if (bit === "0") return "1";
    return "0";
  }

  move(instructions: MoveInstruction[]): void {
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];
      // This is the case where fillWith comes from the message.
      // I'll deal with it later.
      if (
        instruction.fillWith !== undefined &&
        instruction.fillWith !== "0" &&
        instruction.fillWith !== "1"
      ) {
        console.log("Coming from message!");
      } else {
        // Here we either alternate or fill with 0 and 1
        let currentFill: "0" | "1";
        if (instruction.fillWith !== undefined) {
          currentFill = instruction.fillWith;
        }
        // `alternate` takes precedence over fillWith.
        if (instruction.alternate && instruction.startWith !== undefined) {
          currentFill = instruction.startWith;
        }
        if (currentFill === undefined) {
          throw new Error("Must set at least one of fillWith and startWith!");
        }
        const movementFn = this.movementFunctions[instruction.direction];
        if (instruction.fillFirst) {
          this.matrix[this.x][this.y] = currentFill;
          if (instruction.alternate) {
            currentFill = this.alternate(currentFill);
          }
        }
        for (let j = 0; j < instruction.times; j++) {
          movementFn();
          this.matrix[this.x][this.y] = currentFill;
          if (instruction.alternate) {
            currentFill = this.alternate(currentFill);
          }
        }
      }
    }
  }
}
