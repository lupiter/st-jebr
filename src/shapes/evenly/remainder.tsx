import { Results } from "../results";
import { Text } from "@chakra-ui/react";

function calculateStiches(
  before: number,
  after: number,
): {
  start: number;
  end: number;
  changeRepeat: number;
  change: number;
  remainder: number;
} {
  const change = after - before;
  if (change === 0) {
    return { start: 0, end: after, changeRepeat: 0, change, remainder: 0 };
  }
  const changeRepeat = Math.floor(before / Math.abs(change));
  const remainder = before - Math.abs(change) * changeRepeat;
  const start = Math.floor(changeRepeat / 2 + remainder / 2);
  const end = before - (start + 1 + (Math.abs(change) - 1) * changeRepeat);
  return { start, end, changeRepeat, change, remainder };
}

export function Remainder(props: {
  after: number;
  before: number;
}): JSX.Element {
  const { before, after } = props;
  const { start, end, changeRepeat, change, remainder } = calculateStiches(
    before,
    after,
  );

  const startStiches = start > 0 ? new Array(start).fill(0) : [];
  const patternStitches =
    changeRepeat > 0 ? new Array(changeRepeat).fill(0) : [];
  const endStitches = end > 0 ? new Array(end).fill(0) : [];
  const svgWidth = Math.max(
    102,
    start * 10 + changeRepeat * 10 + end * 10 + 40,
  );

  return (
    <Results
      title="Simple Remainder Method"
      working={
        <>
          <Text>
            {after} - {before} = {change} st change
          </Text>
          {change != 0 && (
            <>
              <Text>
                {before} &divide; abs({change}) sts ={" "}
                {before / Math.abs(change)} sts &asymp; every {changeRepeat} sts
                (truncated) (note: we want the{" "}
                {after > before ? "increase" : "decrease"} in the middle of this
                group)
              </Text>
              <Text>
                {before} - (abs({change}) &times; {changeRepeat}) = remainder{" "}
                {remainder} sts
              </Text>
              <Text>
                ({changeRepeat} &divide; 2) + ({remainder} &divide; 2) ={" "}
                {changeRepeat / 2 + remainder / 2} &asymp; {start} (truncated)
                sts before first decrease
              </Text>
            </>
          )}
        </>
      }
      words={
        <>
          {start > 0 && <li>work {start} stitches as usual</li>}
          {change != 0 && (
            <li>
              {before > after ? "decrease" : "increase"}, and then{" "}
              {before > after ? "decrease" : "increase"} every {changeRepeat}{" "}
              stitches {Math.abs(change) - 1} times ({Math.abs(change)} total){" "}
            </li>
          )}
          <li>work as usual to end of row ({end} stitches)</li>
        </>
      }
      diagram={
        <svg viewBox={`0 0 ${svgWidth} 50`} width={svgWidth} height="50">
          <defs>
            <polygon
              id="stitch"
              points="0,0 4,0 4,20 0,20"
              strokeWidth={0}
              fill="black"
            />
            <polygon id="dec" points="0,20 10,0 20,20 16,20 10,8 4,20" />
            <polygon id="inc" points="0,0 10,20 20,0 16,0 10,13 4,0" />
          </defs>
          {change != 0 && (
            <text y={15} x={start * 10 + changeRepeat * 5 + 18}>
              &times; {Math.abs(change) - 1}
            </text>
          )}
          {change != 0 && (
            <polyline
              points={`${start * 10 + 19},30 ${start * 10 + 19},20  ${
                start * 10 + changeRepeat * 10 + 38
              },20 ${start * 10 + changeRepeat * 10 + 38},30 `}
              fill="none"
              stroke="black"
              strokeWidth={1}
            ></polyline>
          )}

          {startStiches.map((_, i) => (
            <use href="#stitch" x={i * 10} y={25} key={i} />
          ))}
          {change != 0 && (
            <use href={after > before ? "#inc" : "#dec"} x={start * 9} y={25} />
          )}
          {patternStitches.map((_, i) => (
            <use href="#stitch" x={start * 10 + 21 + i * 10} y={25} key={i} />
          ))}
          {change != 0 && (
            <use
              href={after > before ? "#inc" : "#dec"}
              x={start * 10 + changeRepeat * 10 + 17}
              y={25}
            />
          )}
          {endStitches.map((_, i) => (
            <use
              href="#stitch"
              x={start * 10 + changeRepeat * 10 + 40 + i * 10}
              y={25}
              key={i}
            />
          ))}
        </svg>
      }
    />
  );
}
