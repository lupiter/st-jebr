export const holeDiameter = 3.5; // mm
export const holeGapHorizontal = 1; // mm
export const holeGapVertical = 1.5; // mm
export const gapToGuideHole = 2; // mm
export const guideHoleDiameter = 2.75; // mm
export const holeVerticalInset = 1; // mm
export const gapBetweenGuideHole =
  holeDiameter + holeGapVertical - guideHoleDiameter; // mm
export const guideVerticalInset =
  holeDiameter / 2 + holeVerticalInset - guideHoleDiameter / 2; // mm
export const gapToSnapHole = 4; // mm
export const gapBetweenSnapHole = 6.5; // mm
export const gapSnapToEdgeVertical = 4.5; // mm
export const gapSnapToEdge = 2; // mm
export const edgeInset = 2; // mm
export const edgeInsetVertical = 21; // mm

export function chunk<T>(array: T[], chunkSize: number): T[][] {
  const R = [];
  for (let i = 0, len = array.length; i < len; i += chunkSize)
    R.push(array.slice(i, i + chunkSize));
  return R;
}

export function calculateCardEdge(width: number, height: number) {
  return [
    [edgeInset, 0],
    [width - edgeInset, 0],
    [width - edgeInset, edgeInsetVertical],
    [width, edgeInsetVertical + edgeInset],
    [width, height - edgeInsetVertical - edgeInset],
    [width - edgeInset, height - edgeInsetVertical],
    [width - edgeInset, height],
    [edgeInset, height],
    [edgeInset, height - edgeInsetVertical],
    [0, height - edgeInsetVertical - edgeInset],
    [0, edgeInsetVertical + edgeInset],
    [edgeInset, edgeInsetVertical],
  ]
    .map((p) => `${p[0]},${p[1]}`)
    .join(" ");
}

export function guideHoles(width: number, height: number, pixelHeight: number) {
  let xOffset =
    edgeInset +
    gapSnapToEdge +
    holeDiameter +
    gapToSnapHole +
    guideHoleDiameter / 2;
  let guideHoles: number[][] = [
    [xOffset, guideVerticalInset + guideHoleDiameter / 2],
    [width - xOffset, guideVerticalInset + guideHoleDiameter / 2],
    [
      xOffset,
      guideVerticalInset + gapBetweenGuideHole + guideHoleDiameter * 1.5,
    ],
    [
      width - xOffset,
      guideVerticalInset + gapBetweenGuideHole + guideHoleDiameter * 1.5,
    ],

    [xOffset, height - guideVerticalInset - guideHoleDiameter / 2],
    [width - xOffset, height - guideVerticalInset - guideHoleDiameter / 2],
    [
      xOffset,
      height -
        guideVerticalInset -
        gapBetweenGuideHole -
        guideHoleDiameter * 1.5,
    ],
    [
      width - xOffset,
      height -
        guideVerticalInset -
        gapBetweenGuideHole -
        guideHoleDiameter * 1.5,
    ],
  ];
  for (let row = 2; row < pixelHeight + 2; row++) {
    guideHoles.push([
      xOffset,
      guideVerticalInset +
        (gapBetweenGuideHole + guideHoleDiameter) * row +
        guideHoleDiameter / 2,
    ]);
    guideHoles.push([
      width - xOffset,
      guideVerticalInset +
        (gapBetweenGuideHole + guideHoleDiameter) * row +
        guideHoleDiameter / 2,
    ]);
  }
  return guideHoles;
}
