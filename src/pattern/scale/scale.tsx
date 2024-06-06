import { HANDLE_RADIUS } from "../measures";
import { ScaleState, SetState, ScaleController } from "./scale-controller";

export function Scaler(props: { state: ScaleState; setState: SetState }) {
  const { state, setState } = props;
  return (
    <g
      stroke="white"
      strokeWidth={5}
      style={{ filter: "drop-shadow(0 0 5px rgba(0, 0, 0, .6))" }}
    >
      <circle
        cx={state.x0}
        cy={state.y0}
        r={HANDLE_RADIUS}
        fill="transparent"
        style={{
          cursor: state.moving != undefined ? "grabbing" : "grab",
        }}
        onMouseDown={() => ScaleController.onScaleStartMouseDown(setState)}
      />
      <line
        x1={state.x0}
        x2={state.x1}
        y1={state.y0}
        y2={state.y1}
      />
      <circle
        cx={state.x1}
        cy={state.y1}
        r={HANDLE_RADIUS}
        fill="transparent"
        style={{
          cursor: state.moving != undefined ? "grabbing" : "grab",
        }}
        onMouseDown={() => ScaleController.onScaleEndMouseDown(setState)}
      />
    </g>
  );
}
