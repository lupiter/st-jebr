import { equal, hex, number } from "../color";
import "./fair-isle.css";
import {
  calculateCardEdge,
  chunk,
  edgeInset,
  gapSnapToEdge,
  gapToGuideHole,
  gapToSnapHole,
  guideHoleDiameter,
  guideHoles,
  holeDiameter,
  holeGapHorizontal,
  holeGapVertical,
  holeVerticalInset,
} from "../measurements";
import { FairIselCard } from "./fair-isle-card";
import { Text, VStack } from "@chakra-ui/react";
import { Alert } from "../../components/ui/alert";

type FairIsleProps = {
  data: number[][];
  width: number;
  maxHeight?: number;
};

function pixels(
  height: number,
  pixelWidth: number,
  pixelHeight: number,
  data: number[][],
  mostCommon: number[],
) {
  const pixelPoints: number[][] = [];
  const xOffset =
    edgeInset +
    gapSnapToEdge +
    holeDiameter +
    gapToSnapHole +
    guideHoleDiameter +
    gapToGuideHole;
  const yOffset = holeVerticalInset;
  for (let st = 0; st < pixelWidth; st++) {
    // top overlap holes
    pixelPoints.push([
      xOffset + st * (holeGapHorizontal + holeDiameter) + holeDiameter / 2,
      yOffset + holeDiameter / 2,
    ]);
    pixelPoints.push([
      xOffset + st * (holeGapHorizontal + holeDiameter) + holeDiameter / 2,
      yOffset + (holeGapVertical + holeDiameter + holeDiameter / 2),
    ]);
    // bottom overlap holes
    pixelPoints.push([
      xOffset + st * (holeGapHorizontal + holeDiameter) + holeDiameter / 2,
      height - yOffset - holeDiameter / 2,
    ]);
    pixelPoints.push([
      xOffset + st * (holeGapHorizontal + holeDiameter) + holeDiameter / 2,
      height - yOffset - (holeGapVertical + holeDiameter + holeDiameter / 2),
    ]);

    for (let row = 0; row < pixelHeight; row++) {
      const pixel = data[row * pixelWidth + st];
      if (!equal(pixel, mostCommon)) {
        pixelPoints.push([
          xOffset + st * (holeGapHorizontal + holeDiameter) + holeDiameter / 2,
          yOffset +
            (holeGapVertical + holeDiameter) * (row + 2) +
            holeDiameter / 2,
        ]);
      }
    }
  }
  return pixelPoints;
}

type CardMeasurements = {
  width: number;
  height: number;
  cardEdgeCoordinates: string;
  pixelPoints: number[][];
  guideHoles: number[][];
  snapCX: number;
};

type FairIsleCalculationInputs = {
  width: number;
  data: number[][];
  mostCommon: number[];
};

function calculateFairIsle(props: FairIsleCalculationInputs): CardMeasurements {
  const pixelWidth = props.width;
  const pixelHeight = props.data.length / props.width;

  const width =
    (holeDiameter + holeGapHorizontal) * pixelWidth -
    holeGapHorizontal +
    (gapToGuideHole +
      guideHoleDiameter +
      gapToSnapHole +
      holeDiameter +
      gapSnapToEdge +
      edgeInset) *
      2;

  const height =
    holeVerticalInset * 2 +
    (holeDiameter + holeGapVertical) * (pixelHeight + 4) -
    holeGapVertical;

  const snapCX = edgeInset + gapSnapToEdge + holeDiameter / 2;

  return {
    width,
    height,
    cardEdgeCoordinates: calculateCardEdge(width, height),
    pixelPoints: pixels(
      height,
      pixelWidth,
      pixelHeight,
      props.data,
      props.mostCommon,
    ),
    guideHoles: guideHoles(width, height, pixelHeight),
    snapCX,
  };
}

function buildPalette(data: number[][]) {
  const palette: number[][] = [];
  const counts: Map<string, number> = new Map();
  data.forEach((value: number[]) => {
    const count = counts.get(hex(value));
    if (count) {
      counts.set(hex(value), count + 1);
    } else {
      counts.set(hex(value), 1);
    }

    const match = palette.findIndex((p) => equal(p, value));
    if (match < 0) {
      palette.push(value);
    }
  });
  const mostCommonCount = Math.max(...Array.from(counts.values()));
  let mostCommon: number[] = [];
  counts.forEach((v, k) => {
    if (v === mostCommonCount) {
      mostCommon = number(k);
    }
  });
  return { palette, mostCommon };
}

export function FairIsle(props: FairIsleProps): JSX.Element {
  const { palette, mostCommon } = buildPalette(props.data);

  let cards: CardMeasurements[] = [calculateFairIsle({ ...props, mostCommon })];
  let largestHeight = cards[0].height;
  const rows = props.data.length / props.width;

  if (props.maxHeight && props.maxHeight < 200) {
    return (
      <Alert status="warning" m={4}>
        We can't generate cards this small. Try making the max height larger
      </Alert>
    );
  }

  while (props.maxHeight && largestHeight > props.maxHeight) {
    // split into multiple cards
    const splitData = chunk(
      props.data,
      Math.ceil(rows / (cards.length + 1)) * props.width,
    );
    cards = splitData.map((data) =>
      calculateFairIsle({ data, width: props.width, mostCommon }),
    );
    largestHeight = Math.max(...cards.map((card) => card.height));
  }

  return (
    <VStack>
      <Text>
        Total {props.width} stitches wide, {props.data.length / props.width}{" "}
        stitches long, {palette.length} colours
      </Text>
      {palette.length > 2 && (
        <Alert status="info">
          Note: when using more than 2 colours, we assume the most common colour
          is the background for fair isle. To be precise, use a two-colour
          image.
        </Alert>
      )}
      <VStack>
        {cards.map((card, i) => (
          <FairIselCard
            height={card.height}
            width={card.width}
            pixelPoints={card.pixelPoints}
            cardEdgeCoordinates={card.cardEdgeCoordinates}
            guideHoles={card.guideHoles}
            snapCX={card.snapCX}
            key={i}
            index={i + 1}
          />
        ))}
      </VStack>
    </VStack>
  );
}
