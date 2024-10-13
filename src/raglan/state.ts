export type RaglanState = {
  chest: number;
  underarm: number;
  sleeve: {
    bicep: number;
    width: number;
    length: number;
    angle: number;
  };
  neck: {
    width: number;
    front: number;
    back: number;
  };
};