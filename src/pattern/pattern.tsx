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

export type PatternProps = {
  width: number;
  height: number;
  url: string;
  unit: string;
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
    crop: { x0: 0, y0: 0, x1: props.height, y1: props.width },
    scale: { x0: 30, y0: 30, x1: props.height - 30, y1: 30 },
    scaleSize: 10,
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

  const imageX = state.mode === Mode.Crop ? 0 : 0 - state.crop.x0;
  const imageY = state.mode === Mode.Crop ? 0 : 0 - state.crop.y0 + state.scroll;

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
        viewBox={`0 0 ${props.width} ${props.height + 20}`}
        width={props.width}
        height={props.height + 20}
        ref={svgRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          cursor: state.moving != undefined ? "grabbing" : "default",
        }}
      >
        <defs></defs>
        <image
          href={props.url}
          aria-label="your image"
          width={props.width}
          height={props.height}
          x={imageX}
          y={imageY}
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
        <Rule x={0} y={props.height} />
      </svg>
    </VStack>
  );
}

function Rule(props: { x: number; y: number }) {
  const { x, y } = props;
  return (
    <g>
      <line x1={x} x2={x} y1={y} y2={y + 10} stroke={"black"} strokeWidth={2} />
      <line
        x1={x + 10}
        x2={x + 10}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + 20}
        x2={x + 20}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + 30}
        x2={x + 30}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + 40}
        x2={x + 40}
        y1={y}
        y2={y + 15}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + 50}
        x2={x + 50}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + 60}
        x2={x + 60}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + 70}
        x2={x + 70}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + 80}
        x2={x + 80}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + 90}
        x2={x + 90}
        y1={y}
        y2={y + 20}
        stroke={"black"}
        strokeWidth={2}
      />
    </g>
  );
}
