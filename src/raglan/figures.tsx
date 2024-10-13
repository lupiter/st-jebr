import { HStack, Text, VStack } from "@chakra-ui/react";
import { RaglanState } from "./state";

export const Figures = ({
  frontChest,
  shoulderToArmpit,
  shelf,
  bodySlopeWidth,
  state,
  neckSlopeWidth,
  backCastOff,
  neckCastOff,
  sleeveSlopeWidth,
  sleeveCastOff,
  halfNeck,
  sleeveAngleRad,
  halfBicep,
  chestAfterShelf,
}: {
  frontChest: number;
  shoulderToArmpit: number;
  shelf: number;
  bodySlopeWidth: number;
  state: RaglanState;
  neckSlopeWidth: number;
  backCastOff: number;
  neckCastOff: number;
  sleeveSlopeWidth: number;
  sleeveCastOff: number;
  halfNeck: number;
  sleeveAngleRad: number;
  halfBicep: number;
  chestAfterShelf: number;
}) => {
  const length = shoulderToArmpit + state.underarm;
  const sleeveExtentPastChest =
    state.sleeve.length * Math.cos(sleeveAngleRad) +
    halfBicep * Math.sin(sleeveAngleRad);
  const garmentWidth = sleeveExtentPastChest * 2 + frontChest;
  const sleeveSlopeHeight = 20; // TODO: nonsense
  const sleeveTotalLength = state.sleeve.length + sleeveSlopeHeight;

  return (
    <HStack
      justify={"center"}
      align={"end"}
      alignSelf={"stretch"}
      justifySelf={"stretch"}
    >
      <VStack as="figure" align="center">
        <svg
          viewBox={`0 0 ${frontChest} ${length}`}
          width={frontChest * 3}
          height={length * 3}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            fill="grey"
            points={
              `0,${length} ` +
              `0,${shoulderToArmpit} ` +
              `${shelf},${shoulderToArmpit} ` +
              `${shelf + bodySlopeWidth},${state.neck.back} ` +
              `${shelf + bodySlopeWidth + backCastOff},${state.neck.back}  ` +
              `${frontChest - shelf},${shoulderToArmpit} ` +
              `${frontChest},${shoulderToArmpit} ` +
              `${frontChest},${length} `
            }
          />
        </svg>
        <Text as="figcaption">Back</Text>
      </VStack>

      <VStack as="figure" align="center">
        <svg
          viewBox={`0 0 ${frontChest} ${length}`}
          width={frontChest * 3}
          height={length * 3}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            fill="grey"
            points={
              `0,${length} ` +
              `0,${shoulderToArmpit} ` +
              `${shelf},${shoulderToArmpit} ` +
              `${shelf + bodySlopeWidth},${state.neck.back} ` +
              `${shelf + bodySlopeWidth + neckSlopeWidth},${state.neck.front} ` +
              `${shelf + bodySlopeWidth + neckSlopeWidth + neckCastOff},${state.neck.front} ` +
              `${shelf + bodySlopeWidth + backCastOff},${state.neck.back}  ` +
              `${frontChest - shelf},${shoulderToArmpit} ` +
              `${frontChest},${shoulderToArmpit} ` +
              `${frontChest},${length} `
            }
          />
        </svg>
        <Text as="figcaption">Front</Text>
      </VStack>

      <VStack as="figure" align="center">
        <svg
          viewBox={`0 0 ${state.sleeve.bicep} ${sleeveTotalLength}`}
          width={state.sleeve.bicep * 3}
          height={sleeveTotalLength * 3}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            fill="grey"
            points={
              `${(state.sleeve.bicep - state.sleeve.bicep) / 2},${sleeveTotalLength} ` +
              `0,${sleeveSlopeHeight} ` +
              `${shelf},${sleeveSlopeHeight} ` +
              `${shelf + sleeveSlopeWidth},0 ` +
              `${shelf + sleeveSlopeWidth + sleeveCastOff},0  ` +
              `${state.sleeve.bicep - shelf},${sleeveSlopeHeight} ` +
              `${state.sleeve.bicep},${sleeveSlopeHeight} ` +
              `${state.sleeve.bicep - (state.sleeve.bicep - state.sleeve.bicep) / 2},${sleeveTotalLength} `
            }
          />
        </svg>
        <Text as="figcaption">Sleeve</Text>
      </VStack>

      <VStack as="figure" align="center">
        <svg
          viewBox={`${0 - sleeveExtentPastChest} 0 ${garmentWidth} ${length}`}
          width={garmentWidth * 3}
          height={length * 3}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* back */}
          <polygon
            stroke="grey"
            fill="transparent"
            points={
              `0,${length} ` +
              `0,${shoulderToArmpit} ` +
              `${bodySlopeWidth},${state.neck.back} ` +
              `${bodySlopeWidth + backCastOff},${state.neck.back}  ` +
              `${frontChest - shelf * 2},${shoulderToArmpit} ` +
              `${frontChest - shelf * 2},${length} `
            }
          />

          {/* front */}
          <polygon
            stroke="grey"
            fill="transparent"
            points={
              `0,${length} ` +
              `0,${shoulderToArmpit} ` +
              `${bodySlopeWidth},${state.neck.back} ` +
              `${bodySlopeWidth + neckSlopeWidth},${state.neck.front} ` +
              `${bodySlopeWidth + neckSlopeWidth + neckCastOff},${state.neck.front} ` +
              `${bodySlopeWidth + backCastOff},${state.neck.back}  ` +
              `${frontChest - shelf * 2},${shoulderToArmpit} ` +
              `${frontChest - shelf * 2},${length} `
            }
          />

          {/* left sleeve */}
          <polygon
            stroke="grey"
            fill="transparent"
            points={
              `${bodySlopeWidth + backCastOff / 2 - halfNeck},0 ` +
              `${bodySlopeWidth},${state.neck.back} ` +
              `0,${shoulderToArmpit} ` +
              `${0 - state.sleeve.length * Math.cos(sleeveAngleRad)},${shoulderToArmpit + state.sleeve.length * Math.sin(sleeveAngleRad)} ` +
              `${0 - state.sleeve.length * Math.cos(sleeveAngleRad) - halfBicep * Math.sin(sleeveAngleRad)},${sleeveTotalLength * Math.sin(sleeveAngleRad)} ` +
              ``
            }
          />

          {/* Right sleeve */}
          <polygon
            stroke="grey"
            fill="transparent"
            points={
              `${bodySlopeWidth + backCastOff / 2 + halfNeck},0 ` +
              `${bodySlopeWidth + backCastOff},${state.neck.back} ` +
              `${frontChest - shelf * 2},${shoulderToArmpit} ` +
              `${frontChest - shelf * 2 + state.sleeve.length * Math.cos(sleeveAngleRad)},${shoulderToArmpit + state.sleeve.length * Math.sin(sleeveAngleRad)} ` +
              `${chestAfterShelf + sleeveExtentPastChest},${sleeveTotalLength * Math.sin(sleeveAngleRad)} ` +
              ``
            }
          />
        </svg>
        <Text as="figcaption">Garment</Text>
      </VStack>
    </HStack>
  );
};
