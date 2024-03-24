import { ChangeEvent, useState } from "react";
import { GaugeState } from "../app-state";
import style from "./shapes.module.css";
import { BlockedSlope } from "./blocked-slope";

type SlopeState = {
  width: number;
  height: number;
  mode: MODE;
};

enum MODE {
  MEASURE = "measure",
  STITCH = "stitch",
}

export function Slope(props: { gauge: GaugeState }): JSX.Element {
  const [state, setState] = useState<SlopeState>({
    width: 20,
    height: 8,
    mode: MODE.STITCH,
  });

  let heightSt = state.height;
  let widthSt = state.width;
  let heightMeasure = state.height * (props.gauge.square / props.gauge.rows);
  let widthMeasure = state.width * (props.gauge.square / props.gauge.stitches);
  if (state.mode === MODE.MEASURE) {
    heightSt = state.height * (props.gauge.rows / props.gauge.square);
    widthSt = state.width * (props.gauge.stitches / props.gauge.square);
    heightMeasure = state.height;
    widthMeasure = state.width;
  }

  let aspectWidth = 100;
  let aspectHeight = 100;
  if (widthMeasure > heightMeasure) {
    aspectHeight = aspectHeight * (heightMeasure / widthMeasure);
  } else {
    aspectWidth = aspectWidth * (widthMeasure / heightMeasure);
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
  const setMode = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      mode:
        e.target.value === MODE.MEASURE.toString() ? MODE.MEASURE : MODE.STITCH,
    });
  };

  return (
    <div className={style.container}>
      <h3>Diagonal</h3>
      <fieldset>
        <legend>Size</legend>
        <label>
          width <input type="number" value={state.width} onChange={setWidth} />
        </label>
        <label>
          height{" "}
          <input type="number" value={state.height} onChange={setHeight} />
        </label>
        <select
          value={state.mode.toString()}
          onChange={setMode}
          aria-label="mode"
        >
          <option value={MODE.MEASURE.toString()}>
            {props.gauge.unit.toString()}
          </option>
          <option value={MODE.STITCH.toString()}>stitches</option>
        </select>
      </fieldset>
      <div className={style.diagram}>
        <p className={style.label}>
          {Math.round(heightSt)} sts ({Math.round(heightMeasure * 10) / 10}{" "}
          {props.gauge.unit.toString()}) high
        </p>
        {!Number.isNaN(aspectWidth) && !Number.isNaN(aspectHeight) && (
          <svg
            viewBox={`-1 -1  ${aspectWidth + 2} ${aspectHeight + 2}`}
            width={aspectWidth}
            height={aspectHeight}
          >
            <polyline
              points={`0,${aspectHeight} ${aspectWidth},0`}
              stroke="black"
              strokeWidth={1}
              fill="none"
            />
            <polyline
              points={`0,${aspectHeight} ${aspectWidth},${aspectHeight} ${aspectWidth},0`}
              stroke="black"
              strokeWidth={1}
              strokeDasharray={4}
              fill="none"
            />
          </svg>
        )}
      </div>
      <p className={style.label}>
        {Math.round(widthSt)} sts ({Math.round(widthMeasure * 10) / 10}{" "}
        {props.gauge.unit.toString()}) wide
      </p>

      <div className={style.working}>
        Using{" "}
        <a href="https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm">
          Bresenham's line algorithm
        </a>
      </div>
      <div className={style.instructions}>
        <BlockedSlope
          x={widthSt}
          y={heightSt}
          aspect={props.gauge.stitches / props.gauge.rows}
        />
      </div>
    </div>
  );
}
