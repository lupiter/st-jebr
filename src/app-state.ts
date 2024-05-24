export enum UNIT {
  CM = "cm",
  IN = "in",
}

export type GaugeState = {
  stitches: number;
  rows: number;
  unit: UNIT;
  square: 4 | 10 | 1;
};
