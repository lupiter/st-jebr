export enum MoveTarget {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
}

export type CropState = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  moving?: MoveTarget;
};

export type SetState = React.Dispatch<React.SetStateAction<CropState>>;

export class CropController {
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
      switch (prev.moving) {
        case MoveTarget.TopLeft:
          return {
            ...prev,
            x0: e.clientX - bounds.x,
            y0: e.clientY - bounds.y,
          };
        case MoveTarget.TopRight:
          return {
            ...prev,
            x1: e.clientX - bounds.x,
            y0: e.clientY - bounds.y,
          };
        case MoveTarget.BottomLeft:
          return {
            ...prev,
            x0: e.clientX - bounds.x,
            y1: e.clientY - bounds.y,
          };
        case MoveTarget.BottomRight:
          return {
            ...prev,
            x1: e.clientX - bounds.x,
            y1: e.clientY - bounds.y,
          };
        default:
          break;
      }
      return prev;
    });
  };
}
