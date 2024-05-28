import React from "react";


export const HANDLE_RADIUS = 20;

type Rect = {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
};

export enum Mode {
  Crop,
  Scale,
  None,
}

export enum MoveTarget {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
}

export type PatternState = {
  crop: Rect;
  scale: Rect;
  scaleSize: number;
  mode: Mode;
  scroll: number;
  moving?: MoveTarget;
};

export type SetState = React.Dispatch<React.SetStateAction<PatternState>>

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

  static onScaleClick = (setState: SetState) => {
    setState((prev) => ({
      ...prev,
      mode: prev.mode === Mode.Scale ? Mode.None : Mode.Scale,
    }));
  };

  static onCropClick = (setState: SetState) => {
    setState((prev) => ({
      ...prev,
      mode: prev.mode === Mode.Crop ? Mode.None : Mode.Crop,
    }));
  };

  static setScaleSize = (setState: SetState, numberValue: number) => {
    setState((prev) => ({
      ...prev,
      scaleSize: numberValue,
    }));
  };

  static onScaleStartMouseDown = (setState: SetState) => {
    setState((prev) => ({ ...prev, moving: MoveTarget.TopLeft }));
  };

  static onScaleEndMouseDown = (setState: SetState) => {
    setState((prev) => ({ ...prev, moving: MoveTarget.TopRight }));
  };

  static onCropTopLeftMouseDown = (setState: SetState) => {
    setState((prev) => ({ ...prev, moving: MoveTarget.TopLeft }));
  };

  static onCropTopRightMouseDown = (setState: SetState) => {
    setState((prev) => ({ ...prev, moving: MoveTarget.TopRight }));
  };

  static onCropBottomLeftMouseDown = (setState: SetState) => {
    setState((prev) => ({ ...prev, moving: MoveTarget.BottomLeft }));
  };

  static onCropBottomRightMouseDown = (setState: SetState) => {
    setState((prev) => ({ ...prev, moving: MoveTarget.BottomRight }));
  };

  static onMouseUp = (setState: SetState) => {
    setState((prev) => ({ ...prev, moving: undefined }));
  };

  static onMouseMove = (setState: SetState, svgRef: React.MutableRefObject<SVGElement | null>, e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (!svgRef.current) {
      return;
    }
    const bounds = svgRef.current.getBoundingClientRect();
    setState((prev) => {
      if (prev.mode === Mode.Scale) {
        if (prev.moving === MoveTarget.TopLeft) {
          return {
            ...prev,
            scale: {
              ...prev.scale,
              x0: e.clientX - bounds.x,
              y0: e.clientY - bounds.y,
            },
          };
        }
        if (prev.moving === MoveTarget.TopRight) {
          return {
            ...prev,
            scale: {
              ...prev.scale,
              x1: e.clientX - bounds.x,
              y1: e.clientY - bounds.y,
            },
          };
        }
      } else if (prev.mode === Mode.Crop) {
        switch (prev.moving) {
          case MoveTarget.TopLeft:
            return {
              ...prev,
              crop: {
                ...prev.crop,
                x0: e.clientX - bounds.x,
                y0: e.clientY - bounds.y,
              },
            };
          case MoveTarget.TopRight:
            return {
              ...prev,
              crop: {
                ...prev.crop,
                x1: e.clientX - bounds.x,
                y0: e.clientY - bounds.y,
              },
            };
          case MoveTarget.BottomLeft:
            return {
              ...prev,
              crop: {
                ...prev.crop,
                x0: e.clientX - bounds.x,
                y1: e.clientY - bounds.y,
              },
            }
          case MoveTarget.BottomRight:
            return {
              ...prev,
              crop: {
                ...prev.crop,
                x1: e.clientX - bounds.x,
                y1: e.clientY - bounds.y,
              },
            };
          default:
            break;
        }
      }
      return {...prev}
    })
  };
}