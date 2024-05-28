import {
  HANDLE_RADIUS,
  PatternController,
  PatternState,
  SetState,
} from "./pattern-controller";

export function Scaler(props: { state: PatternState; setState: SetState }) {
  const { state, setState } = props;
  return (
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
        onMouseDown={() => PatternController.onScaleStartMouseDown(setState)}
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
        onMouseDown={() => PatternController.onScaleEndMouseDown(setState)}
      />
    </g>
  );
}
