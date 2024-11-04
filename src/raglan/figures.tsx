import { HStack, Text, VStack } from "@chakra-ui/react";
import { RaglanCalculations, RaglanState } from "./state";

export const Figures = ({
  calculations,
  state,
  halfNeck,
  sleeveAngleRad,
  halfBicep,
}: {
  state: RaglanState;
  calculations: RaglanCalculations;
  halfNeck: number;
  sleeveAngleRad: number;
  halfBicep: number;
}) => {
  const length = calculations.shoulderToArmpit + state.underarm;
  const sleeveExtentPastChest =
    state.sleeve.length * Math.cos(sleeveAngleRad) +
    halfBicep * Math.sin(sleeveAngleRad);
  const garmentWidth = sleeveExtentPastChest * 2 + calculations.frontChest;
  const sleeveTotalLength =
    state.sleeve.length + calculations.sleeveSlopeHeight;

  return (
    <HStack
      justify={"center"}
      align={"end"}
      alignSelf={"stretch"}
      justifySelf={"stretch"}
    >
      <VStack as="figure" align="center">
        <svg
          viewBox={`0 0 ${calculations.frontChest} ${length}`}
          width={calculations.frontChest * 3}
          height={length * 3}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            fill="grey"
            points={
              `0,${length} ` +
              `0,${calculations.shoulderToArmpit} ` +
              `${calculations.shelf},${calculations.shoulderToArmpit} ` +
              `${calculations.shelf + calculations.bodySlopeWidth},${state.neck.back} ` +
              `${calculations.shelf + calculations.bodySlopeWidth + calculations.backCastOff},${state.neck.back}  ` +
              `${calculations.frontChest - calculations.shelf},${calculations.shoulderToArmpit} ` +
              `${calculations.frontChest},${calculations.shoulderToArmpit} ` +
              `${calculations.frontChest},${length} `
            }
          />
        </svg>
        <Text as="figcaption">Back</Text>
      </VStack>

      <VStack as="figure" align="center">
        <svg
          viewBox={`0 0 ${calculations.frontChest} ${length}`}
          width={calculations.frontChest * 3}
          height={length * 3}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            fill="grey"
            points={
              `0,${length} ` +
              `0,${calculations.shoulderToArmpit} ` +
              `${calculations.shelf},${calculations.shoulderToArmpit} ` +
              `${calculations.shelf + calculations.bodySlopeWidth},${state.neck.back} ` +
              `${calculations.shelf + calculations.bodySlopeWidth + calculations.neckSlopeWidth},${state.neck.front} ` +
              `${calculations.shelf + calculations.bodySlopeWidth + calculations.neckSlopeWidth + calculations.neckCastOff},${state.neck.front} ` +
              `${calculations.shelf + calculations.bodySlopeWidth + calculations.backCastOff},${state.neck.back}  ` +
              `${calculations.frontChest - calculations.shelf},${calculations.shoulderToArmpit} ` +
              `${calculations.frontChest},${calculations.shoulderToArmpit} ` +
              `${calculations.frontChest},${length} `
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
              `0,${sleeveTotalLength} ` +
              `0,${calculations.sleeveSlopeHeight} ` +
              `${calculations.shelf},${calculations.sleeveSlopeHeight} ` +
              `${calculations.shelf + calculations.sleeveSlopeWidth},0 ` +
              `${calculations.shelf + calculations.sleeveSlopeWidth + calculations.sleeveCastOff},0  ` +
              `${state.sleeve.bicep - calculations.shelf},${calculations.sleeveSlopeHeight} ` +
              `${state.sleeve.bicep},${calculations.sleeveSlopeHeight} ` +
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
              `0,${calculations.shoulderToArmpit} ` +
              `${calculations.bodySlopeWidth},${state.neck.back} ` +
              `${calculations.bodySlopeWidth + calculations.backCastOff},${state.neck.back}  ` +
              `${calculations.frontChest - calculations.shelf * 2},${calculations.shoulderToArmpit} ` +
              `${calculations.frontChest - calculations.shelf * 2},${length} `
            }
          />

          {/* front */}
          <polygon
            stroke="grey"
            fill="transparent"
            points={
              `0,${length} ` +
              `0,${calculations.shoulderToArmpit} ` +
              `${calculations.bodySlopeWidth},${state.neck.back} ` +
              `${calculations.bodySlopeWidth + calculations.neckSlopeWidth},${state.neck.front} ` +
              `${calculations.bodySlopeWidth + calculations.neckSlopeWidth + calculations.neckCastOff},${state.neck.front} ` +
              `${calculations.bodySlopeWidth + calculations.backCastOff},${state.neck.back}  ` +
              `${calculations.frontChest - calculations.shelf * 2},${calculations.shoulderToArmpit} ` +
              `${calculations.frontChest - calculations.shelf * 2},${length} `
            }
          />

          {/* left sleeve */}
          <polygon
            stroke="red"
            fill="transparent"
            points={
              `${calculations.bodySlopeWidth + calculations.backCastOff / 2 - halfNeck},0 ` +
              `${calculations.bodySlopeWidth},${state.neck.back} ` +
              `0,${calculations.shoulderToArmpit} ` +
              `${0 - state.sleeve.length * Math.cos(sleeveAngleRad)},${calculations.shoulderToArmpit + state.sleeve.length * Math.sin(sleeveAngleRad)} ` +
              `${0 - state.sleeve.length * Math.cos(sleeveAngleRad) - halfBicep * Math.sin(sleeveAngleRad)},${sleeveTotalLength * Math.sin(sleeveAngleRad)} ` +
              ``
            }
          />

          {/* Right sleeve */}
          <polygon
            stroke="grey"
            fill="transparent"
            points={
              `${calculations.bodySlopeWidth + calculations.backCastOff / 2 + halfNeck},0 ` +
              `${calculations.bodySlopeWidth + calculations.backCastOff},${state.neck.back} ` +
              `${calculations.frontChest - calculations.shelf * 2},${calculations.shoulderToArmpit} ` +
              `${calculations.frontChest - calculations.shelf * 2 + state.sleeve.length * Math.cos(sleeveAngleRad)},${calculations.shoulderToArmpit + state.sleeve.length * Math.sin(sleeveAngleRad)} ` +
              `${calculations.frontChest - calculations.shelf * 2 + sleeveExtentPastChest},${sleeveTotalLength * Math.sin(sleeveAngleRad)} ` +
              ``
            }
          />
        </svg>
        <Text as="figcaption">Garment</Text>
      </VStack>
    </HStack>
  );
};
