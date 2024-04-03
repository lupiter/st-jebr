import { fillInSlopes, getSpan, pointsToInstructions } from "./blocked-calcs";
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

function calculateCurvePoints(rx: number, ry: number, aspect: number): number[][] {
  let points: number[][] = [];
  const fn = (x: number, y: number) => ((x * x) / (rx * rx)) + ((y * y) / (ry * ry * aspect * aspect)) - 1; 
  let y = ry * aspect;
  let x = 0;

  // for (let x = 0; x <= ry; x++) {
  while (x <= rx && y >= 0) {
    points.push([x, y]);
    console.log(x, y, fn(x, y))
    if (fn(x, y - (0.5 * aspect)) > 0) {
      y -= 1 * aspect;
    } else {
      x += 1;
    }
    
  }

  // const rx2 = rx * rx;
  // const ry2 = ry * ry * aspect;

  // let decision = ry2 - rx2 * ry + 0.25 * rx2;
  // let decisionX = 2 * ry2 * x;
  // let decisionY = 2 * rx2 * y;

  // while (decisionX < decisionY) {
  //   points.push([x, y]);

  //   decisionX += 2 * ry2;
  //   x += 1;
  //   if (decision < 0) {
  //     decision += decisionX + ry2;
  //   } else {
  //     y--;
  //     decisionY += - 2 * rx2;
  //     decision += decisionX - decisionY + ry2;
  //   }
  // }

  // decision =
  //   ry2 * (x + 0.5) * (x + 0.5) + rx2 * ((y - 1) * (y - 1)) - rx2 * ry2;

  // while (y > 0) {
  //   points.push([x, y]);

  //   y--;
  //   decisionY = decisionY - 2 * rx2;
  //   if (decision > 0) {
  //     decision += rx2 - decisionY;
  //   } else {
  //     x += 1;
  //     decisionX += 2 * ry2;
  //     decision += decisionX - decisionY + rx2;
  //   }
  // }

  // points.push([rx / aspect, 0]);

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
  const sortedCurve = curve // sortCurvePoints(curve.slice());
  const points = curve // fillInSlopes(sortedCurve);
  const instructions = pointsToInstructions(sortedCurve);

  const drawPoints = points
    .map(
      (point) =>
        `${Math.round((point[0] * 10))},${Math.round(point[1] * 10)}`
    )
    .join(" ");

  // const stitchWidth = Math.max(...points.map((p) => p[0])) * 10;
  // const width = stitchWidth / aspect;
  // const height = Math.max(...points.map((p) => p[1])) * 10;
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
          } 0 0 1 0,${ry * 10 * aspect} L ${(rx) * 10},${ry * 10 * aspect} L ${
            (rx) * 10
          },0 z`}
          stroke="blue"
          fill="none"
          strokeWidth={1}
          strokeDasharray={4}
        />
      </svg>
      <ol className={style.steps}>
        {instructions.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ol>
    </div>
  );
}

