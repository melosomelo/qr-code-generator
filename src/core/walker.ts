import type { Direction, MoveInstruction } from "../types";
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

  move(instructions: MoveInstruction[]): void {
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];
      // Alternate takes precedence over fillWith.
      if (instruction.alternate ?? false) {
        if (instruction.startWith === undefined) {
          throw new Error(
            "Cannot specify alternate in an instruction and then don't specify startWith!"
          );
        }
      } else {
        if (instruction.fillWith === "0" || instruction.fillWith === "1") {
          if (instruction.fillFirst ?? false) {
            this.matrix[this.x][this.y] = instruction.fillWith;
          }
          const movementFn = this.movementFunctions[instruction.direction];
          for (let i = 0; i < instruction.times; i++) {
            movementFn();
            this.matrix[this.y][this.y] = instruction.fillWith;
          }
        } else {
          // Deal with fillWith from a longer string later.
          console.log("Nothing for now!");
        }
      }
    }
  }
}
