
export function Rule(props: {
  x: number;
  y: number;
  width: number;
  stitches: number;
  pxPerStitch: number;
}) {
  const segmentCount = Math.ceil(props.stitches / 20);
  const segmentWidth = props.pxPerStitch * 10;
  const segments = [...Array(segmentCount)].fill(0);
  const center = props.width / 2;

  return (
    <g>
      {segments.map((_, i) => (
        <RulePart
          x={props.x + center - segmentWidth * (segmentCount - i)}
          y={props.y}
          key={i}
          pxPerStitch={props.pxPerStitch}
          count={segmentCount - i}
        />
      ))}
      {segments.map((_, i) => (
        <RulePart
          x={center + props.x + segmentWidth * i}
          y={props.y}
          key={i}
          pxPerStitch={props.pxPerStitch}
          count={i}
        />
      ))}
    </g>
  );
}

function RulePart(props: {
  x: number;
  y: number;
  pxPerStitch: number;
  count: number;
}) {
  const { x, y, pxPerStitch, count } = props;
  return (
    <g>
      <rect x={x} y={y} width={10 * pxPerStitch} height={20} fill="white" />
      <text x={x} y={y + 35} textAnchor="middle">
        {count * 10}
      </text>
      <line x1={x} x2={x} y1={y} y2={y + 20} stroke={"black"} strokeWidth={2} />
      <line
        x1={x + pxPerStitch}
        x2={x + pxPerStitch}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 2}
        x2={x + pxPerStitch * 2}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 3}
        x2={x + pxPerStitch * 3}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 4}
        x2={x + pxPerStitch * 4}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 5}
        x2={x + pxPerStitch * 5}
        y1={y}
        y2={y + 15}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 6}
        x2={x + pxPerStitch * 6}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 7}
        x2={x + pxPerStitch * 7}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 8}
        x2={x + pxPerStitch * 8}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={x + pxPerStitch * 9}
        x2={x + pxPerStitch * 9}
        y1={y}
        y2={y + 10}
        stroke={"black"}
        strokeWidth={2}
      />
    </g>
  );
}
