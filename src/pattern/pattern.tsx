import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { GaugeState } from "../app-state";
import { Rule } from "./rule";
import { HANDLE_RADIUS, Mode, PatternController, PatternState } from "./pattern-controller";
import { CropBox } from "./cropbox";
import { Scaler } from "./scale";

export type PatternProps = {
  width: number;
  height: number;
  url: string;
  unit: string;
  gauge: GaugeState;
};


export function Pattern(props: PatternProps) {
  const [state, setState] = useState<PatternState>({
    crop: { x0: 10, y0: 10, x1: props.width - 10, y1: props.height - 10 },
    scale: { x0: 30, y0: 30, x1: props.width - 30, y1: 30 },
    scaleSize: 100,
    mode: Mode.None,
    scroll: 0,
  });
  const svgRef = useRef<SVGSVGElement | null>(null);


  const cropWidth = state.crop.x1 - state.crop.x0;
  const scaleFactor = props.width / cropWidth;
  const imageWidth =
    state.mode === Mode.Crop
      ? props.width
      : (props.width / cropWidth) * props.width;

  // !Note: crop might not match aspect ratio of original

  const imageHeight =
    state.mode === Mode.Crop ? props.height : scaleFactor * props.height;


  const scaleLengthPixels = Math.sqrt(
    (state.scale.x1 - state.scale.x0) * (state.scale.x1 - state.scale.x0) +
      (state.scale.y1 - state.scale.y0) * (state.scale.y1 - state.scale.y0)
  );
  const pxPerUnit = scaleLengthPixels / state.scaleSize;

  const rowsPerUnit = props.gauge.rows / props.gauge.square;
  const pxPerRow = pxPerUnit / rowsPerUnit;
  const rowOffset = state.scroll * pxPerRow;

  const imageX = state.mode === Mode.Crop ? 0 : 0 - state.crop.x0 * scaleFactor;
  const imageY =
    state.mode === Mode.Crop
      ? 0
      : 0 - state.crop.y0 * scaleFactor + rowOffset;

  const cropHeight = state.crop.y1 - state.crop.y0;
  const viewBoxHeight = cropHeight * scaleFactor;

  const stitchPerUnit = props.gauge.stitches / props.gauge.square;
  const pxPerStitch = pxPerUnit / stitchPerUnit;
  const stitchWidth = imageWidth / pxPerStitch;

  return (
    <VStack>
      <HStack align={"end"}>
        <Box>
          <Button onClick={() => PatternController.onScaleClick(setState)} isActive={state.mode === Mode.Scale}>
            Scale
          </Button>
        </Box>
        {state.mode === Mode.Scale && (
          <Box>
            <FormControl>
              <FormLabel>Length ({props.unit})</FormLabel>
              <NumberInput
                value={state.scaleSize}
                onChange={(_: string, valueAsNumber: number) => PatternController.setScaleSize(setState, valueAsNumber)}
                maxW={20}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Box>
        )}
        <Box>
          <Button onClick={() => PatternController.onCropClick(setState)} isActive={state.mode === Mode.Crop}>
            Crop
          </Button>
        </Box>
      </HStack>

      <HStack>
        <svg
          viewBox={`0 0 ${props.width} ${state.mode === Mode.Crop ? props.height + 50 : viewBoxHeight + 50}`}
          width={props.width}
          height={
            state.mode === Mode.Crop ? props.height + 50 : viewBoxHeight + 50
          }
          preserveAspectRatio="xMinYMin"
          ref={svgRef}
          onMouseMove={(e) => PatternController.onMouseMove(setState, svgRef, e)}
          onMouseUp={() => PatternController.onMouseUp(setState)}
          onMouseLeave={() => PatternController.onMouseUp(setState)}
          style={{
            cursor: state.moving != undefined ? "grabbing" : "default",
            maxWidth: "80vw",
            objectFit: "contain",
          }}
        >
          <defs>
            <mask id="cropbox">
              <rect
                x={state.crop.x0 - HANDLE_RADIUS * 2}
                y={state.crop.y0 - HANDLE_RADIUS * 2}
                width={state.crop.x1 - state.crop.x0 + HANDLE_RADIUS * 4}
                height={state.crop.y1 - state.crop.y0 + HANDLE_RADIUS * 4}
                fill="white"
              />
              <rect
                x={state.crop.x0}
                y={state.crop.y0}
                width={state.crop.x1 - state.crop.x0}
                height={state.crop.y1 - state.crop.y0}
                fill="black"
              />
            </mask>
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
            clipPath={state.mode === Mode.Crop ? "" : "url(#imagecrop)"}
          />

          {state.mode === Mode.Scale && (
            <Scaler state={state} setState={setState} />
          )}
          {state.mode === Mode.Crop && (
            <CropBox state={state} setState={setState} />
          )}
          <Rule
            x={0}
            y={state.mode === Mode.Crop ? props.height : viewBoxHeight}
            width={props.width}
            pxPerStitch={pxPerStitch}
            stitches={stitchWidth}
          />
        </svg>
        <VStack>
          <Text>{state.scroll}</Text>
          <Button onClick={() => PatternController.scrollUp(setState)} disabled={state.scroll <= 0}>▲</Button>
          <Button onClick={() => PatternController.scrollDown(setState)} >▼</Button>
        </VStack>
      </HStack>
    </VStack>
  );
}
