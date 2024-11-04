import { Box, ListItem, ListRoot, VStack } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../components/ui/accordion";
import {
  fillInSlopes,
  pointsToInstructions,
  pointsToShortInstructions,
  sortCurvePoints,
} from "./blocked-calcs";
import style from "./shapes.module.css";

function calculateCurvePoints(
  radiusX: number,
  radiusY: number,
  aspect: number,
): number[][] {
  const points: number[][] = [];

  let x0 = -radiusX;
  let x1 = radiusX;
  let diameterX = 2 * radiusX;
  const diameterY = 2 * radiusY;
  let decisionX = 4 * (1 - diameterX) * diameterY * diameterY;
  let decisionY = 4 * diameterX * diameterX;
  let error = decisionX + decisionY;

  let y0 = radiusY * 2 + (diameterY + 1) / 2;
  const startY = y0;
  let y1 = y0;
  diameterX = 8 * diameterX * diameterX;
  const b1 = 8 * diameterY * diameterY;

  do {
    points.push([x1, y0 - startY]);
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
  } while (x0 < x1);

  while (y0 - y1 < diameterY * aspect) {
    points.push([x1, y0++ - startY]);
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
    return <></>;
  }

  const curve = calculateCurvePoints(rx, ry, aspect);
  const sortedCurve = sortCurvePoints(curve.slice().reverse());
  const points = fillInSlopes(sortedCurve);
  const instructions = pointsToInstructions(sortedCurve);
  const shortInstructions = pointsToShortInstructions(sortedCurve).reverse();

  const drawPoints = points
    .map((point) => `${Math.round(point[0] * 10)},${Math.round(point[1] * 10)}`)
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
    <VStack align="stretch">
      <AccordionRoot multiple>
        <AccordionItem value="row">
          <h2>
            <AccordionItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                Row-by-row
              </Box>
            </AccordionItemTrigger>
          </h2>
          <AccordionItemContent pb={4}>
            <ListRoot className={style.steps}>
              {instructions.map((n, i) => (
                <ListItem key={i}>{n}</ListItem>
              ))}
            </ListRoot>
          </AccordionItemContent>
        </AccordionItem>

        <AccordionItem value="japanese">
          <h2>
            <AccordionItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                Japanese-style
              </Box>
            </AccordionItemTrigger>
          </h2>
          <AccordionItemContent pb={4}>
            Matching diagram
            <ListRoot>
              {shortInstructions.map((n, i) => (
                <ListItem key={i}>
                  {n.decrease}&middot;{n.rows}&middot;{n.times}
                </ListItem>
              ))}
            </ListRoot>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
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
          d={`M ${rx * 10},0 A ${rx * 10} ${ry * 10} 0 0 1 0,${
            ry * 10 * aspect
          } L ${rx * 10},${ry * 10 * aspect} L ${rx * 10},0 z`}
          stroke="blue"
          fill="none"
          strokeWidth={1}
          strokeDasharray={4}
        />
      </svg>
    </VStack>
  );
}
