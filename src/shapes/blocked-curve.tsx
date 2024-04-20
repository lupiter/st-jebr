import { fillInSlopes, getSpan, pointsToInstructions, pointsToShortInstructions } from "./blocked-calcs";
import style from "./shapes.module.css";

export function isSorted(all: number[][]): boolean {
  const xs = all.map((_, i) => getSpan(all, i, 0));
  const ys = all.map((_, i) => getSpan(all, i, 1));
  const sortedXs = xs.slice().sort();
  const sortedYs = ys.slice().sort().reverse();
  const xMatch = xs.findIndex((v, i) => sortedXs[i] !== v) < 0;
  const yMatch = ys.findIndex((v, i) => sortedYs[i] !== v) < 0;

  return xMatch && yMatch;
}

function calculateCurvePoints(radiusX: number, radiusY: number, aspect: number): number[][] {
  let points: number[][] = [];

  let x0 = -radiusX;
  let x1 = radiusX;
  let diameterX = 2 * radiusX;
  let diameterY = 2 * radiusY;
  let decisionX = 4 * (1 - diameterX) * diameterY * diameterY;
  let decisionY = 4 * diameterX * diameterX;
  let error = decisionX + decisionY;
  
  let y0 = radiusY * 2 + (diameterY + 1) / 2;
  let startY = y0;
  let y1 = y0;
  diameterX = 8 * diameterX * diameterX;
  let b1 = 8 * diameterY * diameterY;

  do {
    points.push([x1, y0 - startY])
    if (2 * error <= decisionY) {
      y0 += aspect;
      y1 -= aspect;
      decisionY += diameterX;
      error += decisionY;
    }
    if (2 * error * aspect * aspect >= decisionX || 2 * error >= decisionY) {
      x0++;
      x1--;
      decisionX += b1;
      error += decisionX;
    }
  } while (x0 < x1)

  while (y0 - y1 < diameterY * aspect) {
    points.push([x1, y0++ - startY])
  }
  
  return points;
}

export function sortCurvePoints(points: number[][]): number[][] {
  // wildly inefficient sort
  let sorted = false;
  let panic = 0;
  while (!sorted && panic < 200) {
    // first item always sorted so skip
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      const isStart = points[i - 1][0] !== p[0] && points[i - 1][1] !== p[1];
      if (!isStart) {
        // skip any not at the start or end of a group
        continue;
      }

      let prevYSpan = getSpan(points, i - 1, 0);
      let prevXSpan = getSpan(points, i - 1, 0);
      let yspan = getSpan(points, i, 0);
      let xspan = getSpan(points, i, 1);
      if (prevXSpan < xspan) {
        points[i][1] = points[i - 1][1];
      } else if (prevYSpan > yspan) {
        points[i - 1][0] = points[i][0];
      }
    }
    panic++;
    sorted = isSorted(points);
  }
  return points;
}


export function BlockedCurve(props: {
  aspect: number;
  rx: number;
  ry: number;
}): JSX.Element {
  const { rx, ry, aspect } = props;

  if (rx <= 0 || ry <= 0) {
    return <></>
  }

  const curve = calculateCurvePoints(rx, ry, aspect);
  const sortedCurve = sortCurvePoints(curve.slice().reverse());
  const points = fillInSlopes(sortedCurve);
  const instructions = pointsToInstructions(sortedCurve);
  const shortInstructions = pointsToShortInstructions(sortedCurve).reverse();

  const drawPoints = points
    .map(
      (point) =>
        `${Math.round((point[0] * 10))},${Math.round(point[1] * 10)}`
    )
    .join(" ");

  const width = rx * 10;
  const height = ry * 10 * aspect;

  const verticals = new Array(rx)
    .fill(0)
    .map((_, i) => `M ${i * 10},0 V ${height}`)
    .join(" ");
  const horizontals = new Array(ry)
    .fill(0)
    .map((_, i) => `M 0,${i * 10 * aspect} H ${width}`)
    .join(" ");

  return (
    <div className={style.instructions}>
      <svg
        viewBox={`0 0 ${width + 2} ${height + 2}`}
        width={width + 2}
        height={height + 2}
      >
        <path d={`${verticals}`} stroke="black" opacity={0.2} />
        <path d={`${horizontals}`} stroke="black" opacity={0.2} />
        <polyline
          points={drawPoints}
          stroke="black"
          strokeWidth={2}
          fill="none"
        />
        <path
          d={`M ${(rx) * 10},0 A ${(rx) * 10} ${
            ry * 10
          } 0 0 1 0,${ry * 10 * aspect

          } L ${(rx) * 10},${ry * 10 * aspect

          } L ${
            (rx) * 10
          },0 z`}
          stroke="blue"
          fill="none"
          strokeWidth={1}
          strokeDasharray={4}
        />
      </svg>
      <details>
        <summary>Row-by-row</summary>
      <ol className={style.steps}>
        {instructions.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ol>
      </details>
      <details>
        <summary>Japanese-style</summary>
        Matching diagram
      <ul className={style.steps}>
        {shortInstructions.map((n, i) => (
          <li key={i}>{n.decrease}&middot;{n.rows}&middot;{n.times}</li>
        ))}
      </ul>
      </details>
    </div>
  );
}

