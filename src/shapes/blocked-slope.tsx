import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ListItem,
  OrderedList,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import {
  fillInSlopes,
  pointsToInstructions,
  pointsToShortInstructions,
} from "./blocked-calcs";
import style from "./shapes.module.css";

function calculateSlopePoints(
  x2: number,
  y2: number,
  aspect: number
): number[][] {
  const points: number[][] = [];
  let yStart = 1 * aspect;
  if (y2 < 0) {
    yStart = -1 * aspect;
  }
  let y = 0;
  const fn = (x: number, y: number) => y2 * x - (x2 * y) / aspect;

  for (let x = 0; x <= x2; x += 1) {
    points.push([x, y]);
    if (fn(x, y) > 0) {
      y += yStart;
    }
  }

  return points;
}

function calculateSteepSlopePoints(
  x2: number,
  y2: number,
  aspect: number
): number[][] {
  const points: number[][] = [];
  let yStart = 1;
  if (x2 < 0) {
    yStart = -1;
  }
  let y = 0;
  const fn = (x: number, y: number) => (x2 * x) / aspect - y2 * y;

  for (let x = 0; x <= y2; x += 1 * aspect) {
    points.push([y, x]);
    if (fn(x, y) > 0) {
      y += yStart;
    }
  }

  return points;
}

export function BlockedSlope(props: {
  aspect: number;
  x: number;
  y: number;
}): JSX.Element {
  const { x, y, aspect } = props;

  const slope =
    x > y
      ? calculateSlopePoints(x, y, aspect)
      : calculateSteepSlopePoints(x, y, aspect);
  const points = fillInSlopes(slope);
  const instructions = pointsToInstructions(slope.slice().reverse());
  const shortInstructions = pointsToShortInstructions(
    slope.slice().reverse()
  ).reverse();

  const drawPoints = points
    .map((point) => `${Math.round(point[0] * 10)},${Math.round(point[1] * 10)}`)
    .join(" ");

  const width = x * 10;
  const height = y * 10 * aspect;

  if (!x || !y || x <= 0 || y <= 0) {
    return <></>;
  }

  const verticals = new Array(x)
    .fill(0)
    .map((_, i) => `M ${i * 10},0 V ${height}`)
    .join(" ");
  const horizontals = new Array(y)
    .fill(0)
    .map((_, i) => `M 0,${i * 10 * aspect} H ${width}`)
    .join(" ");

  return (
    <VStack align="stretch">
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Row-by-row
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            From bottom
            <OrderedList className={style.steps}>
              {instructions.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Japanese-style
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Matching diagram
            <UnorderedList>
              {shortInstructions.map((n, i) => (
                <ListItem key={i}>
                  {n.decrease}&middot;{n.rows}&middot;{n.times}
                </ListItem>
              ))}
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
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
          points={`0,0 ${width},${height} 0,${height} 0,0`}
          stroke="blue"
          strokeWidth={1}
          strokeDasharray={4}
          fill="none"
        />
      </svg>
    </VStack>
  );
}
