import { CropState } from "./crop/crop-controller";
import { ScaleState } from "./scale/scale-controller";

export enum MoveTarget {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
}

export type PatternState = {
  crop: CropState;
  scale: ScaleState;
  scroll: number;
  moving?: MoveTarget;
};

export type SetState = React.Dispatch<React.SetStateAction<PatternState>>;

export class PatternController {
  static scrollDown = (setState: SetState) => {
    setState((prev) => ({
      ...prev,
      scroll: prev.scroll + 1,
    }));
  };

  static scrollUp = (setState: SetState) => {
    setState((prev) => ({
      ...prev,
      scroll: prev.scroll - 1,
    }));
  };
}
