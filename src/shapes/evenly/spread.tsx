import { Results } from "../results";
import { Text } from "@chakra-ui/react";

function calculateStiches(
  before: number,
  after: number
): {
  changeRepeat: number;
  change: number;
  remainder: number;
  first: number;
} {
  const change = after - before;
  if (change === 0) {
    return {
      changeRepeat: 0,
      change,
      remainder: 0,
      first: 0,
    };
  }
  const changeRepeat = Math.floor(before / Math.abs(change));
  const remainder = before - Math.abs(change) * changeRepeat;
  const first = Math.abs(change) - remainder;
  return { changeRepeat, change, remainder, first };
}

export function Spread(props: { after: number; before: number }): JSX.Element {
  const { before, after } = props;
  const { changeRepeat, change, remainder, first } = calculateStiches(
    before,
    after
  );

  const biggerRepeats = Math.max(first, remainder);
  const {
    changeRepeat: changeRepeat2,
    change: change2,
    remainder: remainder2,
    first: first2,
  } = calculateStiches(
    first + remainder - Math.min(first, remainder),
    first + remainder
  );

  const start = Math.floor(
    (first > remainder ? changeRepeat : changeRepeat + 1) / 2
  );
  const end = (first > remainder ? changeRepeat : changeRepeat + 1) - start;

  const startStiches = start > 0 ? new Array(start).fill(0) : [];
  const patternStitches =
    changeRepeat > 0 ? new Array(changeRepeat).fill(0) : [];
  const endStitches = end > 0 ? new Array(end).fill(0) : [];
  const svgWidth = Math.max(
    102,
    start * 10 + changeRepeat * 10 + end * 10 + 40
  );

  return (
    <Results
      title="Diophantine Equations aka The Magic Formula"
      working={
        <>
          <Text>
            {after} - {before} = {change} st change
          </Text>
          {change != 0 && (
            <>
              <Text>
                {before} &divide; abs({change}) sts ={" "}
                {before / Math.abs(change)} sts {remainder > 0 && (<>&asymp; every {changeRepeat} sts</>)}
              </Text>
              {remainder > 0 && (
                <>
                  <Text>
                    {before} - (abs({change}) &times; {changeRepeat}) =
                    remainder {remainder} sts
                  </Text>
                  <Text>
                    abs({change}) - {remainder} = {first} extra stitches would
                    be required to make another whole group
                  </Text>
                  <Text>
                    {changeRepeat} + 1 = {changeRepeat + 1} groups we would have
                    if we had the extra group (and could divide evenly)
                  </Text>
                  <Text>
                    (a) {after > before ? "increase" : "decrease"} every{" "}
                    {changeRepeat} sts {first} times <em>then</em> (b){" "}
                    {after > before ? "increase" : "decrease"} every{" "}
                    {changeRepeat + 1} sts {remainder} times
                  </Text>
                  <Text as="em">Verify</Text>
                  <Text>
                    {changeRepeat} (sts) &times; {first} (repeats) ={" "}
                    {changeRepeat * first} (sts)
                  </Text>
                  <Text>
                    {changeRepeat + 1} (sts) &times; {remainder} (repeats) ={" "}
                    {remainder * (changeRepeat + 1)} (sts)
                  </Text>
                  <Text>
                    {changeRepeat * first} (sts) +{" "}
                    {remainder * (changeRepeat + 1)} (sts) = {before} total
                    current stitches
                  </Text>
                  <Text>
                    {first} (sts {after > before ? "increase" : "decrease"}) +{" "}
                    {remainder} (sts {after > before ? "increase" : "decrease"})
                    = {Math.abs(change)} total{" "}
                    {after > before ? "increase" : "decrease"} stitches
                  </Text>
                  <Text as={"strong"}>Evening it up</Text>
                  <Text>
                    max({first}, {remainder}) = {biggerRepeats} (which repeat do
                    we have more of, a or b?)
                  </Text>
                  <Text>
                    {biggerRepeats} / {Math.min(first, remainder)} ={" "}
                    {biggerRepeats / Math.min(first, remainder)} ={" "}
                    {changeRepeat2} remainder {remainder2} (divide more repeats
                    by fewer to get how many repeats to do before switching
                    type)
                  </Text>
                  <Text>
                    {Math.min(first, remainder)} - {remainder2} ={" "}
                    {Math.min(first, remainder) - remainder2} (smallest repeat,
                    minus the remainder, how many more of the smaller repeats
                    would we need to divide evenly)
                  </Text>
                  <Text>
                    (i) every {changeRepeat2} groups {first2} times (ii) every{" "}
                    {change2 + 1} groups {remainder2} times
                  </Text>
                </>
              )}
            </>
          )}
        </>
      }
      words={
        <>
          {start > 0 && <li>work {start} stitches as usual</li>}
          {change != 0 && (
            <>
              {remainder === 0 && (
                <li>
                  {before > after ? "decrease" : "increase"}, and then{" "}
                  {before > after ? "decrease" : "increase"} every{" "}
                  {changeRepeat} stitches {Math.abs(change) - 1} times (
                  {Math.abs(change)} total){" "}
                </li>
              )}
              {remainder !== 0 && first > remainder && (
                <>
                  <li>
                    {before > after ? "decrease" : "increase"}, and then{" "}
                    {before > after ? "decrease" : "increase"} every{" "}
                    {changeRepeat} stitches {first2} times
                  </li>
                  <li>
                    {before > after ? "decrease" : "increase"}, and then{" "}
                    {before > after ? "decrease" : "increase"} every{" "}
                    {changeRepeat + 1} stitches {remainder2} times
                  </li>
                </>
              )}
            </>
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
