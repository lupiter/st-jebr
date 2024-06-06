import React from "react";

export enum MoveTarget {
  Start,
  End,
}

export type ScaleState = {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  scaleSize: number;
  moving?: MoveTarget;
};

export type SetState = React.Dispatch<React.SetStateAction<ScaleState>>;

export class ScaleController {
  static setScaleSize = (setState: SetState, numberValue: number) => {
    setState((prev) => ({
      ...prev,
      scaleSize: numberValue,
    }));
  };

  static onScaleStartMouseDown = (setState: SetState) => {
    setState((prev) => ({ ...prev, moving: MoveTarget.Start }));
  };

  static onScaleEndMouseDown = (setState: SetState) => {
    setState((prev) => ({ ...prev, moving: MoveTarget.End }));
  };

  static onMouseUp = (setState: SetState) => {
    setState((prev) => ({ ...prev, moving: undefined }));
  };

  static onMouseMove = (
    setState: SetState,
    svgRef: React.MutableRefObject<SVGElement | null>,
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    if (!svgRef.current) {
      return;
    }
    const bounds = svgRef.current.getBoundingClientRect();
    setState((prev) => {
      if (prev.moving === MoveTarget.Start) {
        return {
          ...prev,
          x0: e.clientX - bounds.x,
          y0: e.clientY - bounds.y,
        };
      }
      if (prev.moving === MoveTarget.End) {
        return {
          ...prev,
          x1: e.clientX - bounds.x,
          y1: e.clientY - bounds.y,
        };
      }

      return { ...prev };
    });
  };
}
