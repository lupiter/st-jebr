import { ChangeEvent, useState } from "react";
import { GaugeState } from "../app-state";
import style from "./shapes.module.css";
import { BlockedCurve } from "./blocked-curve";

type BasicRoundNeckState = {
  width: number;
  height: number;
};

export function BasicRoundNeck(props: { gauge: GaugeState }): JSX.Element {
  const [state, setState] = useState<BasicRoundNeckState>({
    width: 18,
    height: 8.5,
  });
  const height = state.height * (props.gauge.rows / props.gauge.square);
  const width = state.width * (props.gauge.stitches / props.gauge.square) / 2;

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
      width: parseFloat(e.target.value),
    });
  };
  const setHeight = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      height: parseFloat(e.target.value),
    });
  };

  return (
    <div className={style.container}>
      <h3>Basic Round Neck</h3>
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
        &times; {state.width} {props.gauge.unit} = {width * 2} sts &asymp;{" "}
        {Math.round(width) * 2} (rounded to nearest even number)
      </p>
      <div className={style.diagram}>
        <p className={style.label}>
          {Math.round(height)} sts ({state.height} {props.gauge.unit.toString()}
          ) high
        </p>
        {!Number.isNaN(aspectWidth) && !Number.isNaN(aspectHeight) && (
          <svg viewBox={`-1 -1 ${aspectWidth + 2} ${aspectHeight + 2}`} width={aspectWidth + 2} height={aspectHeight + 2}>
            <path
              d={`M ${aspectWidth},0 A ${
                aspectWidth / 2
              } ${aspectHeight} 0 1 1 0,0`}
              stroke="black"
              strokeWidth={1}
              fill="none"
            />
            <path
              d={`M 0,0 L 0,${aspectHeight} L ${aspectWidth},${aspectHeight} L ${aspectWidth},0`}
              stroke="black"
              strokeWidth={1}
              fill="none"
              strokeDasharray={4}
            />
          </svg>
        )}
      </div>
      <p className={style.label}>
        {Math.round(width) * 2} sts ({state.width} {props.gauge.unit.toString()})
        wide
      </p>
      <BlockedCurve
        aspect={props.gauge.stitches / props.gauge.rows}
        rx={Math.round(width)}
        ry={Math.round(height)}
      />
    </div>
  );
}
