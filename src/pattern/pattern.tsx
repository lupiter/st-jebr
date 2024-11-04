import { Button, HStack, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { GaugeState } from "../app-state";
import { Rule } from "./rule";
import { PatternController, PatternState } from "./pattern-controller";
import { CropModal } from "./crop/crop-modal";
import { CropState } from "./crop/crop-controller";
import { ScaleModal } from "./scale/scale-modal";
import { ScaleState } from "./scale/scale-controller";

export type PatternProps = {
  width: number;
  height: number;
  url: string;
  unit: string;
  gauge: GaugeState;
};

export function Pattern(props: PatternProps) {
  const [state, setState] = useState<PatternState>({
    crop: {
      x0: 10,
      y0: 10,
      x1: props.width - 10,
      y1: props.height - 10,
      xprev: 0,
      yprev: 0,
    },
    scale: { x0: 30, y0: 30, x1: props.width - 30, y1: 30, scaleSize: 100 },
    scroll: 0,
  });

  const cropWidth = state.crop.x1 - state.crop.x0;
  const scaleFactor = props.width / cropWidth;
  const imageWidth = (props.width / cropWidth) * props.width;

  // !Note: crop might not match aspect ratio of original

  const imageHeight = scaleFactor * props.height;

  const scaleLengthPixels = Math.sqrt(
    (state.scale.x1 - state.scale.x0) * (state.scale.x1 - state.scale.x0) +
      (state.scale.y1 - state.scale.y0) * (state.scale.y1 - state.scale.y0),
  );
  const pxPerUnit = scaleLengthPixels / state.scale.scaleSize;

  const rowsPerUnit = props.gauge.rows / props.gauge.square;
  const pxPerRow = pxPerUnit / rowsPerUnit;
  const rowOffset = state.scroll * pxPerRow;

  const imageX = 0 - state.crop.x0 * scaleFactor;
  const imageY = 0 - state.crop.y0 * scaleFactor + rowOffset;

  const cropHeight = state.crop.y1 - state.crop.y0;
  const viewBoxHeight = cropHeight * scaleFactor;

  const stitchPerUnit = props.gauge.stitches / props.gauge.square;
  const pxPerStitch = pxPerUnit / stitchPerUnit;
  const stitchWidth = imageWidth / pxPerStitch;

  const onCrop = (crop: CropState) => {
    setState((prev) => ({ ...prev, crop }));
  };

  const onScale = (scale: ScaleState) => {
    setState((prev) => ({ ...prev, scale }));
  };

  return (
    <VStack flex={1} alignItems={"stretch"}>
      <HStack align={"end"} justifyContent={"center"}>
        <ScaleModal
          height={props.height}
          width={props.width}
          url={props.url}
          unit={props.unit}
          onchange={onScale}
          scale={state.scale}
        />
        <CropModal
          height={props.height}
          width={props.width}
          url={props.url}
          onchange={onCrop}
          crop={state.crop}
        />
      </HStack>

      <HStack flex={1} justifyContent={"center"}>
        <svg
          viewBox={`0 0 ${props.width} ${viewBoxHeight + 50}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMinYMin"
          style={{
            maxWidth: "80vw",
            objectFit: "contain",
            flex: 1,
            background: "white",
          }}
        >
          <defs>
            <clipPath id="imagecrop">
              <rect
                x={0}
                y={0}
                width={props.width}
                height={viewBoxHeight}
                fill="white"
              />
            </clipPath>
          </defs>
          <image
            href={props.url}
            aria-label="your image"
            width={imageWidth}
            height={imageHeight}
            x={imageX}
            y={imageY}
            clipPath={"url(#imagecrop)"}
          />

          <Rule
            x={0}
            y={viewBoxHeight}
            width={props.width}
            pxPerStitch={pxPerStitch}
            stitches={stitchWidth}
          />
        </svg>
        <VStack>
          <Text>{state.scroll}</Text>
          <Button
            onClick={() => PatternController.scrollUp(setState)}
            disabled={state.scroll <= 0}
          >
            ▲
          </Button>
          <Button onClick={() => PatternController.scrollDown(setState)}>
            ▼
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
}
