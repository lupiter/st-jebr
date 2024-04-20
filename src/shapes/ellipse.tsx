import { ChangeEvent, useState } from "react";
import { GaugeState } from "../app-state";
import style from "./shapes.module.css";
import { BlockedCurve } from "./blocked-curve";

type EllipseState = {
  width: number;
  height: number;
};

function floatOrZero(value: string): number {
  const asFloat = parseFloat(value);
  if (Number.isNaN(asFloat)) {
    return 0;
  }
  return asFloat;
}

export function Ellipse(props: { gauge: GaugeState }): JSX.Element {
  const [state, setState] = useState<EllipseState>({
    width: 9,
    height: 8.5,
  });
  const height = state.height * (props.gauge.rows / props.gauge.square);
  const width = (state.width * (props.gauge.stitches / props.gauge.square));

  let aspectWidth = 100;
  let aspectHeight = 100;
  if (state.width > state.height) {
    aspectHeight = aspectHeight * (state.height / state.width);
  } else {
    aspectWidth = aspectWidth * (state.width / state.height);
  }

  const setWidth = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      width: floatOrZero(e.target.value),
    });
  };
  const setHeight = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      height: floatOrZero(e.target.value),
    });
  };

  return (
    <div className={style.container}>
      <h3>Ellipse Quadrant</h3>
      <h4>Round necks, sleeve heads, armscyes</h4>
      <fieldset>
        <legend>Measurements</legend>
        <label>
          width <input type="number" value={state.width} onChange={setWidth} />{" "}
          {props.gauge.unit.toString()}
        </label>
        <label>
          height{" "}
          <input type="number" value={state.height} onChange={setHeight} />{" "}
          {props.gauge.unit.toString()}
        </label>
      </fieldset>
      <p className={style.working}>
        {props.gauge.rows / props.gauge.square} sts/{props.gauge.unit} &times;{" "}
        {state.height} {props.gauge.unit} = {height} sts &asymp;{" "}
        {Math.round(height)} (rounded)
      </p>
      <p className={style.working}>
        {props.gauge.stitches / props.gauge.square} sts/{props.gauge.unit}{" "}
        &times; {state.width} {props.gauge.unit} = {width} sts &asymp;{" "}
        {Math.round(width)} (rounded)
      </p>
      <div className={style.diagram}>
        <p className={style.label}>
          {Math.round(height)} sts ({state.height} {props.gauge.unit.toString()}
          ) high
        </p>
        {!Number.isNaN(aspectWidth) && !Number.isNaN(aspectHeight) && (
          <svg
            viewBox={`-1 -1 ${aspectWidth * 2 + 2} ${aspectHeight * 2 + 2}`}
            width={aspectWidth * 2 + 2}
            height={aspectHeight * 2 + 2}
          >
            <ellipse rx={aspectWidth} ry={aspectHeight} cx={aspectWidth} cy={aspectHeight} stroke="blue" strokeDasharray={4} fill="none" />
            <path
              d={`M ${aspectWidth * 2},${aspectHeight} A ${
                aspectWidth
              } ${aspectHeight} 0 0 1 ${aspectWidth},${aspectHeight * 2}`}
              stroke="black"
              strokeWidth={1}
              fill="none"
            />
          </svg>
        )}
      </div>
      <p className={style.label}>
        {Math.round(width) * 2} sts ({state.width} {props.gauge.unit.toString()}
        ) wide
      </p>
      <p className={style.working}>
        Using{" "}
        {/* <a href="https://www.geeksforgeeks.org/midpoint-ellipse-drawing-algorithm/">
          midpoint ellipse drawing algorithm
        </a>{" "} */}
        <a href="https://zingl.github.io/bresenham.html">
            Bresenham's algorithm extended to ellipses
        </a>{" "}
        with sorting from{" "}
        <a href="http://src.acm.org/binaries/content/assets/src/2012/tiffany-inglis.pdf">
          Inglis' Superpixelator
        </a>
      </p>
      <BlockedCurve
        aspect={props.gauge.stitches / props.gauge.rows}
        rx={Math.round(width)}
        ry={Math.round(height)}
      />
    </div>
  );
}
