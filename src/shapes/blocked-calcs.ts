export function getSpan(
  all: number[][],
  index: number,
  subindex: number
): number {
  const target = all[index][subindex];
  let i = index - 1;
  let count = 1;
  while (i >= 0 && all[i][subindex] === target) {
    count++;
    i--;
  }
  i = index + 1;
  while (i < all.length && all[i][subindex] === target) {
    count++;
    i++;
  }
  return count;
}

export function fillInSlopes(points: number[][]): number[][] {
  let outPoints: number[][] = [];
  // add intermediate points where needed
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    if (i > 0) {
      const prev = points[i - 1];
      if (prev[0] != p[0] && prev[1] != p[1]) {
        outPoints.push([p[0], prev[1]]);
      }
    }
    outPoints.push(p);
  }
  return outPoints;
}

type Instruction = {
  // decrease {decrease} every {rows} rows, {times} times.
  decrease: number;
  rows: number;
  times: number;
};

export function pointsToShortInstructions(all: number[][]): Instruction[] {
  let instructions: Instruction[] = [];
  let current: Instruction | undefined = undefined;
  let repeatRow = 1;

  for (let pixel = 1; pixel < all.length; pixel++) {
    const element = all[pixel];
    const prev = all[pixel - 1];
    // have we changed row?
    if (element[1] !== prev[1]) {
      const spanX = getSpan(all, pixel - 1, 1);
      console.log(current, spanX, repeatRow);
      if (!current) {
        current = {
          decrease: spanX,
          rows: 1,
          times: 1,
        };
      } else if (current.decrease !== spanX) {
        instructions.push({ ...current });
        current = {
          decrease: spanX,
          rows: 1,
          times: 1,
        };
      } else if (element[0] === prev[0]) {
        if (current.times > 1) {
          repeatRow++;
          if (repeatRow > current.rows) {
            if (current.rows > 1) {
              current.times -= 1;
            }
            instructions.push({ ...current });
            current = {
              decrease: current.decrease,
              rows: repeatRow,
              times: 1,
            };
            repeatRow = 1;
          }
        } else {
          current.rows += 1;
        }
      } else {
        current.times += 1;
        repeatRow = 1;
      }
    }
  }
  if (current) {
    instructions.push(current);
  }
  console.log(instructions);

  return instructions;
}

export function pointsToInstructions(all: number[][]): string[] {
  let instructions: string[] = [];

  for (let pixel = 1; pixel < all.length; pixel++) {
    const element = all[pixel];
    const prev = all[pixel - 1];
    // have we changed row?
    if (element[1] !== prev[1]) {
      const spanX = getSpan(all, pixel - 1, 1);
      if (spanX > 1) {
        if (instructions.length === 0) {
          instructions.push(`Cast off ${spanX} stitch${spanX > 1 ? "es" : ""}`);
        } else {
          instructions.push(`Decrease ${spanX} stitches`);
        }
      } else {
        if (element[0] !== prev[0]) {
          instructions.push(`Decrease 1 stitch`);
        } else {
          instructions.push(`Work all stitches`);
        }
      }
    }
  }

  return instructions;
}
