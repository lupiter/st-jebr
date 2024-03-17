import { ChangeEvent, useState } from "react";
import { GaugeState } from "../app-state";
import style from "./shapes.module.css";

type SquareState = {
  width: number;
  height: number;
};

export function Square(props: { gauge: GaugeState }): JSX.Element {
  const [state, setState] = useState<SquareState>({ width: 20, height: 20 });
  const height = state.height * (props.gauge.rows / props.gauge.square);
  const width = state.width * (props.gauge.stitches / props.gauge.square);

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
      <h3>Rectangle</h3>
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
          <svg viewBox="0 0 102 102" width="102" height="102">
            <rect
              width={aspectWidth}
              height={aspectHeight}
              x={1}
              y={1}
              stroke="black"
              strokeWidth={1}
              fill="transparent"
            ></rect>
          </svg>
        )}
      </div>
      <p className={style.label}>
        {Math.round(width)} sts ({state.width} {props.gauge.unit.toString()})
        wide
      </p>
    </div>
  );
}
