export type RaglanState = {
  chest: number;
  underarm: number;
  back: number;
  sleeve: {
    bicep: number;
    length: number;
  };
  neck: {
    width: number;
    front: number;
    back: number;
  };
};

export type RaglanCalculations = {
  frontChest: number;
  shelf: number;
  bodySlopeWidth: number;
  bodySlopeHeight: number;
  neckSlopeWidth: number;
  sleeveSlopeWidth: number;
  shoulderToArmpit: number;
  neckSlopeHeight: number;
  backCastOff: number;
  neckCastOff: number;
  sleeveCastOff: number;
  sleeveSlopeHeight: number;
};
