import {
  HANDLE_RADIUS,
  PatternController,
  PatternState,
  SetState,
} from "./pattern-controller";

export function CropBox(props: { state: PatternState; setState: SetState }) {
  const { state, setState } = props;
  return (
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
        onMouseDown={() => PatternController.onCropTopLeftMouseDown(setState)}
      />
      <circle
        cx={state.crop.x1}
        cy={state.crop.y0}
        r={HANDLE_RADIUS}
        fill="transparent"
        style={{
          cursor: state.moving != undefined ? "grabbing" : "grab",
        }}
        onMouseDown={() => PatternController.onCropTopRightMouseDown(setState)}
      />
      <circle
        cx={state.crop.x0}
        cy={state.crop.y1}
        r={HANDLE_RADIUS}
        fill="transparent"
        style={{
          cursor: state.moving != undefined ? "grabbing" : "grab",
        }}
        onMouseDown={() =>
          PatternController.onCropBottomLeftMouseDown(setState)
        }
      />
      <circle
        cx={state.crop.x1}
        cy={state.crop.y1}
        r={HANDLE_RADIUS}
        fill="transparent"
        style={{
          cursor: state.moving != undefined ? "grabbing" : "grab",
        }}
        onMouseDown={() =>
          PatternController.onCropBottomRightMouseDown(setState)
        }
      />
    </g>
  );
}
