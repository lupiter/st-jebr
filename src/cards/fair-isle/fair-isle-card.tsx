import { useRef } from "react";
import {
  gapBetweenSnapHole,
  gapSnapToEdgeVertical,
  guideHoleDiameter,
  holeDiameter,
} from "../measurements";

type FairIsleCardProps = {
  height: number;
  width: number;
  cardEdgeCoordinates: string;
  guideHoles: number[][];
  pixelPoints: number[][];
  snapCX: number;
};

export function FairIselCard(props: FairIsleCardProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null);

  const {
    height,
    width,
    cardEdgeCoordinates,
    guideHoles,
    pixelPoints,
    snapCX,
  } = props;

  const download = () => {
    const text = svgRef.current?.outerHTML;
    if (!text) {
      return;
    }
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:image/svg+xml," + encodeURIComponent(text)
    );
    element.setAttribute("download", "punchcard.svg");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section>
      <p>
        This card should be {Math.round(height)}mm high by {Math.round(width)}mm
        wide
      </p>
      <button onClick={download}>Download</button>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={`${width}mm`}
        height={`${height}mm`}
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points={cardEdgeCoordinates}
          stroke="blue"
          fill="white"
          strokeWidth={0.5}
          id="card"
        ></polygon>
        <g id="stitches">
        {pixelPoints.map((p) => (
          <circle
            cx={p[0]}
            cy={p[1]}
            r={holeDiameter / 2}
            key={`${p[0]},${p[1]}`}
            fill="black"
          />
        ))}
        </g>
        <g id="guide-holes">
        {guideHoles.map((p) => (
          <circle
            cx={p[0]}
            cy={p[1]}
            r={guideHoleDiameter / 2}
            key={`${p[0]},${p[1]}`}
            fill="black"
          />
        ))}
        </g>
        <g id="snap-holes">
          <circle
            cx={snapCX}
            cy={gapSnapToEdgeVertical + holeDiameter / 2}
            r={holeDiameter / 2}
            fill="black"
          />
          <circle
            cx={snapCX}
            cy={gapBetweenSnapHole + holeDiameter * 1.5 + gapSnapToEdgeVertical}
            r={holeDiameter / 2}
            fill="black"
          />
          <circle
            cx={width - snapCX}
            cy={gapSnapToEdgeVertical + holeDiameter / 2}
            r={holeDiameter / 2}
            fill="black"
          />
          <circle
            cx={width - snapCX}
            cy={gapBetweenSnapHole + holeDiameter * 1.5 + gapSnapToEdgeVertical}
            r={holeDiameter / 2}
            fill="black"
          />

          <circle
            cx={snapCX}
            cy={height - gapSnapToEdgeVertical - holeDiameter / 2}
            r={holeDiameter / 2}
            fill="black"
          />
          <circle
            cx={snapCX}
            cy={
              height -
              gapBetweenSnapHole -
              holeDiameter * 1.5 -
              gapSnapToEdgeVertical
            }
            r={holeDiameter / 2}
            fill="black"
          />
          <circle
            cx={width - snapCX}
            cy={height - gapSnapToEdgeVertical - holeDiameter / 2}
            r={holeDiameter / 2}
            fill="black"
          />
          <circle
            cx={width - snapCX}
            cy={
              height -
              gapBetweenSnapHole -
              holeDiameter * 1.5 -
              gapSnapToEdgeVertical
            }
            r={holeDiameter / 2}
            fill="black"
          />
        </g>
      </svg>
    </section>
  );
}
