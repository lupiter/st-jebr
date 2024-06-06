import { HANDLE_RADIUS } from "../measures";
import { CropController, CropState, SetState } from "./crop-controller";

export function CropBox(props: { state: CropState; setState: SetState }) {
  const { state, setState } = props;
  return (
    <g
      stroke="white"
      strokeWidth={5}
      style={{ filter: "drop-shadow(0 0 5px rgba(0, 0, 0, .6))" }}
      mask="url(#cropbox)"
    >
      <rect
        x={state.x0}
        y={state.y0}
        width={state.x1 - state.x0}
        height={state.y1 - state.y0}
        fill="transparent"
      />
      <circle
        cx={state.x0}
        cy={state.y0}
        r={HANDLE_RADIUS}
        fill="transparent"
        style={{
          cursor: state.moving != undefined ? "grabbing" : "grab",
        }}
        onMouseDown={() => CropController.onCropTopLeftMouseDown(setState)}
      />
      <circle
        cx={state.x1}
        cy={state.y0}
        r={HANDLE_RADIUS}
        fill="transparent"
        style={{
          cursor: state.moving != undefined ? "grabbing" : "grab",
        }}
        onMouseDown={() => CropController.onCropTopRightMouseDown(setState)}
      />
      <circle
        cx={state.x0}
        cy={state.y1}
        r={HANDLE_RADIUS}
        fill="transparent"
        style={{
          cursor: state.moving != undefined ? "grabbing" : "grab",
        }}
        onMouseDown={() => CropController.onCropBottomLeftMouseDown(setState)}
      />
      <circle
        cx={state.x1}
        cy={state.y1}
        r={HANDLE_RADIUS}
        fill="transparent"
        style={{
          cursor: state.moving != undefined ? "grabbing" : "grab",
        }}
        onMouseDown={() => CropController.onCropBottomRightMouseDown(setState)}
      />
    </g>
  );
}
