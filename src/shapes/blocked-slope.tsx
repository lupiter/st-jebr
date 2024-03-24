import { fillInSlopes, getSpan } from "./blocked-calcs";
import style from "./shapes.module.css";

function calculateSlopePoints(x2: number, y2: number, aspect: number): number[][] {
  let points: number[][] = [];
  let changeX = x2;
  let changeY = y2;
  let yStart = 1;
  if (changeY < 0) {
    yStart = -1;
    changeY = -changeY;
  }
  let decision = 2 * changeY - changeX;
  let y = yStart;

  for (let x = 0; x <= x2; x += 1) {
    points.push([x, y]);
    if (decision > 0) {
      y += yStart;
      decision += 2 * (changeY - changeX);
    } else {
      decision += 2 * changeY;
    }
  }

  points.push([x2, y2])

  return points;
}

function pointsToInstructions(all: number[][]): string[] {
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

export function BlockedSlope(props: {
  aspect: number;
  x: number;
  y: number;
}): JSX.Element {
  const { x, y, aspect } = props;

  const slope = calculateSlopePoints(x, y * -1, aspect);
  const points = fillInSlopes(slope).map((p) => [p[0], p[1] + y]);
  const instructions = pointsToInstructions(slope);

  const drawPoints = points
    .map(
      (point) =>
        `${Math.round((point[0] * 10))},${Math.round(point[1] * 10)}`
    )
    .join(" ");

  const stitchWidth = Math.max(...points.map((p) => p[0])) * 10;
  const width = stitchWidth / aspect;
  const height = Math.max(...points.map((p) => p[1])) * 10;

  const verticals = new Array(stitchWidth / 10)
    .fill(0)
    .map((_, i) => `M ${(i * 10) / aspect},0 V ${height}`)
    .join(" ");
  const horizontals = new Array(height / 10)
    .fill(0)
    .map((_, i) => `M 0,${i * 10} H ${width}`)
    .join(" ");

  return (
    <div className={style.instructions}>
      <svg
        viewBox={`-1 -1 ${width + 2} ${height + 2}`}
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

        <polyline
          points={`0,${height} ${width},${height} ${width},0 0,${height}`}
          stroke="blue"
          strokeWidth={1}
          strokeDasharray={4}
          fill="none"
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
