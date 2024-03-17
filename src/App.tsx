import { ChangeEvent, useState } from "react";
import "./App.css";
import { AppState, UNIT } from "./app-state";
import { Square } from "./shapes/square";
import { Even } from "./shapes/even";

function App() {
  const [state, setState] = useState<AppState>({
    gauge: {
      stitches: 14,
      rows: 10,
      unit: UNIT.CM,
      square: 10,
    },
  });

  const setGaugeStitches = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      gauge: { ...state.gauge, stitches: parseFloat(e.target.value) },
    });
  };
  const setGaugeRows = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      gauge: { ...state.gauge, rows: parseFloat(e.target.value) },
    });
  };
  const setGaugeUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      gauge: {
        ...state.gauge,
        unit: e.target.value === UNIT.CM.toString() ? UNIT.CM : UNIT.IN,
      },
    });
  };
  const setGaugeSquare = (e: ChangeEvent<HTMLSelectElement>) => {
    const square = parseInt(e.target.value);
    setState({
      ...state,
      gauge: {
        ...state.gauge,
        square: square === 10 ? 10 : square === 4 ? 4 : 1,
      },
    });
  };

  return (
    <>
    <h1>st-jebr</h1>
    <p role="caption" className="caption">stitch-(al)gebra</p>
      <section></section>
      <main>
        <section>
          <form>
            <fieldset>
              <legend>Gauge</legend>
              <label>
                <input
                  type="number"
                  value={state.gauge.stitches}
                  onChange={setGaugeStitches}
                />{" "}
                stitches
              </label>
              <label>
                <input
                  type="number"
                  value={state.gauge.rows}
                  onChange={setGaugeRows}
                />{" "}
                rows
              </label>
              <select
                value={state.gauge.unit.toString()}
                onChange={setGaugeUnit}
                aria-label="units"
              >
                <option value="cm">cm</option>
                <option value="in">inch</option>
              </select>
              <select
                value={state.gauge.square}
                aria-label="square size"
                onChange={setGaugeSquare}
              >
                <option value={10}>10x10</option>
                <option value={4}>4x4</option>
                <option value={1}>1x1</option>
              </select>
            </fieldset>
            <p className="working">({state.gauge.stitches / state.gauge.square} sts/{state.gauge.unit.toString()}; {state.gauge.rows / state.gauge.square} rows/{state.gauge.unit.toString()})</p>
            
          </form>
        </section>
        <section className="views">
          <Square gauge={state.gauge} />
          <Even />
          {/* <BasicRoundNeck state={state} />
          <ShoulderSlope state={state} />
          <Armhole state={state} />
          <BackNeck state={state} />
          <Slant state={state} />
          <CustomCurve state={state} />
          <SleeveHoleAndCap state={state} />
          <SleeveCapHeight state={state} />
          <StandardSleeveCap state={state} /> */}
        </section>
      </main>
    </>
  );
}

export default App;
