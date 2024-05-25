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
} from "@chakra-ui/react";
import { MouseEvent as ReactMouseEvent, useRef, useState } from "react";
import { GaugeState } from "../app-state";

export type PatternProps = {
  width: number;
  height: number;
  url: string;
  unit: string;
  gauge: GaugeState;
};

const HANDLE_RADIUS = 20;

type Rect = {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
};

enum Mode {
  Crop,
  Scale,
  None,
}

enum MoveTarget {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
}

type PatternState = {
  crop: Rect;
  scale: Rect;
  scaleSize: number;
  mode: Mode;
  scroll: number;
  moving?: MoveTarget;
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

  const onScaleClick = () => {
    setState((prev) => ({
      ...prev,
      mode: prev.mode === Mode.Scale ? Mode.None : Mode.Scale,
    }));
  };

  const onCropClick = () => {
    setState((prev) => ({
      ...prev,
      mode: prev.mode === Mode.Crop ? Mode.None : Mode.Crop,
    }));
  };

  const setScaleSize = (_: string, numberValue: number) => {
    setState((prev) => ({
      ...prev,
      scaleSize: numberValue,
    }));
  };

  const onScaleStartMouseDown = () => {
    setState((prev) => ({ ...prev, moving: MoveTarget.TopLeft }));
  };

  const onScaleEndMouseDown = () => {
    setState((prev) => ({ ...prev, moving: MoveTarget.TopRight }));
  };

  const onCropTopLeftMouseDown = () => {
    setState((prev) => ({ ...prev, moving: MoveTarget.TopLeft }));
  };

  const onCropTopRightMouseDown = () => {
    setState((prev) => ({ ...prev, moving: MoveTarget.TopRight }));
  };

  const onCropBottomLeftMouseDown = () => {
    setState((prev) => ({ ...prev, moving: MoveTarget.BottomLeft }));
  };

  const onCropBottomRightMouseDown = () => {
    setState((prev) => ({ ...prev, moving: MoveTarget.BottomRight }));
  };

  const onMouseUp = () => {
    setState((prev) => ({ ...prev, moving: undefined }));
  };

  const onMouseMove = (e: ReactMouseEvent<SVGElement, MouseEvent>) => {
    if (!svgRef.current) {
      return;
    }
    const bounds = svgRef.current.getBoundingClientRect();
    if (state.mode === Mode.Scale) {
      if (state.moving === MoveTarget.TopLeft) {
        setState((prev) => ({
          ...prev,
          scale: {
            ...prev.scale,
            x0: e.clientX - bounds.x,
            y0: e.clientY - bounds.y,
          },
        }));
      }
      if (state.moving === MoveTarget.TopRight) {
        setState((prev) => ({
          ...prev,
          scale: {
            ...prev.scale,
            x1: e.clientX - bounds.x,
            y1: e.clientY - bounds.y,
          },
        }));
      }
    } else if (state.mode === Mode.Crop) {
      switch (state.moving) {
        case MoveTarget.TopLeft:
          setState((prev) => ({
            ...prev,
            crop: {
              ...prev.crop,
              x0: e.clientX - bounds.x,
              y0: e.clientY - bounds.y,
            },
          }));
          break;
        case MoveTarget.TopRight:
          setState((prev) => ({
            ...prev,
            crop: {
              ...prev.crop,
              x1: e.clientX - bounds.x,
              y0: e.clientY - bounds.y,
            },
          }));
          break;
        case MoveTarget.BottomLeft:
          setState((prev) => ({
            ...prev,
            crop: {
              ...prev.crop,
              x0: e.clientX - bounds.x,
              y1: e.clientY - bounds.y,
            },
          }));
          break;
        case MoveTarget.BottomRight:
          setState((prev) => ({
            ...prev,
            crop: {
              ...prev.crop,
              x1: e.clientX - bounds.x,
              y1: e.clientY - bounds.y,
            },
          }));
          break;
        default:
          break;
      }
    }
  };

  const cropWidth = state.crop.x1 - state.crop.x0;
  const scaleFactor = props.width / cropWidth;
  const imageWidth =
    state.mode === Mode.Crop
      ? props.width
      : (props.width / cropWidth) * props.width;

  // !Note: crop might not match aspect ratio of original

  const imageHeight =
    state.mode === Mode.Crop ? props.height : scaleFactor * props.height;

  const imageX = state.mode === Mode.Crop ? 0 : 0 - state.crop.x0 * scaleFactor;
  const imageY =
    state.mode === Mode.Crop
      ? 0
      : 0 - state.crop.y0 * scaleFactor + state.scroll;

  const cropHeight = state.crop.y1 - state.crop.y0;
  const viewBoxHeight = cropHeight * scaleFactor;

  const scaleLengthPixels = Math.sqrt(
    (state.scale.x1 - state.scale.x0) * (state.scale.x1 - state.scale.x0) +
      (state.scale.y1 - state.scale.y0) * (state.scale.y1 - state.scale.y0)
  );
  const pxPerUnit = scaleLengthPixels / state.scaleSize;
  const stitchPerUnit = props.gauge.stitches / props.gauge.square;
  const pxPerStitch = pxPerUnit / stitchPerUnit;
  const stitchWidth = imageWidth / pxPerStitch;

  return (
    <VStack>
      <HStack align={"end"}>
        <Box>
          <Button onClick={onScaleClick} isActive={state.mode === Mode.Scale}>
            Scale
          </Button>
        </Box>
        {state.mode === Mode.Scale && (
          <Box>
            <FormControl>
              <FormLabel>Length ({props.unit})</FormLabel>
              <NumberInput
                value={state.scaleSize}
                onChange={setScaleSize}
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
          <Button onClick={onCropClick} isActive={state.mode === Mode.Crop}>
            Crop
          </Button>
        </Box>
      </HStack>
      <svg
        viewBox={`0 0 ${props.width} ${state.mode === Mode.Crop ? props.height + 50 : viewBoxHeight + 50}`}
        width={props.width}
        height={state.mode === Mode.Crop ? props.height + 50 : viewBoxHeight + 50}
        ref={svgRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          cursor: state.moving != undefined ? "grabbing" : "default",
          maxWidth: "100vw",
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
          <g
            stroke="white"
            strokeWidth={5}
            style={{ filter: "drop-shadow(0 0 5px rgba(0, 0, 0, .6))" }}
          >
            <circle
              cx={state.scale.x0}
              cy={state.scale.y0}
              r={HANDLE_RADIUS}
              fill="transparent"
              style={{
                cursor: state.moving != undefined ? "grabbing" : "grab",
              }}
              onMouseDown={onScaleStartMouseDown}
            />
            <line
              x1={state.scale.x0}
              x2={state.scale.x1}
              y1={state.scale.y0}
              y2={state.scale.y1}
            />
            <circle
              cx={state.scale.x1}
              cy={state.scale.y1}
              r={HANDLE_RADIUS}
              fill="transparent"
              style={{
                cursor: state.moving != undefined ? "grabbing" : "grab",
              }}
              onMouseDown={onScaleEndMouseDown}
            />
          </g>
        )}
        {state.mode === Mode.Crop && (
          <g
            stroke="white"
            strokeWidth={5}
            style={{ filter: "drop-shadow(0 0 5px rgba(0, 0, 0, .6))" }}
            mask="url(#cropbox)"
          >
            <rect
              x={state.crop.x0}
              y={state.crop.y0}
              width={state.crop.x1 - state.crop.x0}
              height={state.crop.y1 - state.crop.y0}
              fill="transparent"
            />
            <circle
              cx={state.crop.x0}
              cy={state.crop.y0}
              r={HANDLE_RADIUS}
              fill="transparent"
              style={{
                cursor: state.moving != undefined ? "grabbing" : "grab",
              }}
              onMouseDown={onCropTopLeftMouseDown}
            />
            <circle
              cx={state.crop.x1}
              cy={state.crop.y0}
              r={HANDLE_RADIUS}
              fill="transparent"
              style={{
                cursor: state.moving != undefined ? "grabbing" : "grab",
              }}
              onMouseDown={onCropTopRightMouseDown}
            />
            <circle
              cx={state.crop.x0}
              cy={state.crop.y1}
              r={HANDLE_RADIUS}
              fill="transparent"
              style={{
                cursor: state.moving != undefined ? "grabbing" : "grab",
              }}
              onMouseDown={onCropBottomLeftMouseDown}
            />
            <circle
              cx={state.crop.x1}
              cy={state.crop.y1}
              r={HANDLE_RADIUS}
              fill="transparent"
              style={{
                cursor: state.moving != undefined ? "grabbing" : "grab",
              }}
              onMouseDown={onCropBottomRightMouseDown}
            />
          </g>
        )}
        <Rule
          x={0}
          y={state.mode === Mode.Crop ? props.height : viewBoxHeight}
          width={props.width}
          pxPerStitch={pxPerStitch}
          stitches={stitchWidth}
        />
      </svg>
    </VStack>
  );
}

function Rule(props: {
  x: number;
  y: number;
  width: number;
  stitches: number;
  pxPerStitch: number;
}) {
  const segmentCount = Math.ceil(props.stitches / 20);
  const segmentWidth = props.pxPerStitch * 10;
  const segments = [...Array(segmentCount)].fill(0);
  const center = props.width / 2;

  return (
    <g>
      {segments.map((_, i) => (
        <RulePart
          x={props.x + center - segmentWidth * (segmentCount - i)}
          y={props.y}
          key={i}
          pxPerStitch={props.pxPerStitch}
          count={(segmentCount - i)}
        />
      ))}
      {segments.map((_, i) => (
        <RulePart
          x={center + props.x + segmentWidth * i}
          y={props.y}
          key={i}
          pxPerStitch={props.pxPerStitch}
          count={i}
        />
      ))}
    </g>
  );
}

function RulePart(props: {
  x: number;
  y: number;
  pxPerStitch: number;
  count: number;
}) {
  const { x, y, pxPerStitch, count } = props;
  return (
    <g>
      <rect x={x} y={y} width={10 * pxPerStitch} height={20} fill="white" />
      <text x={x} y={y + 35} textAnchor="middle">
        {count}
      </text>
      <line x1={x} x2={x} y1={y} y2={y + 20} stroke={"black"} strokeWidth={2} />
      <line
        x1={x + pxPerStitch}
        x2={x + pxPerStitch}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 2}
        x2={x + pxPerStitch * 2}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 3}
        x2={x + pxPerStitch * 3}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 4}
        x2={x + pxPerStitch * 4}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 5}
        x2={x + pxPerStitch * 5}
        y1={y}
        y2={y + 15}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 6}
        x2={x + pxPerStitch * 6}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 7}
        x2={x + pxPerStitch * 7}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 8}
        x2={x + pxPerStitch * 8}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 9}
        x2={x + pxPerStitch * 9}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
    </g>
  );
}
