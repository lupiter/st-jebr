

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