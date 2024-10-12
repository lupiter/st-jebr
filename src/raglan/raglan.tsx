import { useState } from "react";
import { Header } from "../header/header";
import {
  VStack,
  Spacer,
  HStack,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  Tr,
} from "@chakra-ui/react";

type RaglanState = {
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

const fallback = (partialState: {
  chest: number;
  underarm: number;
}): RaglanState => ({
  ...partialState,
  sleeve: {
    bicep: 0.36 * partialState.chest,
    width: 0.31 * partialState.chest,
    length: 0.15 * partialState.underarm,
    angle: 30,
  },
  neck: {
    width: 0.2 * partialState.chest,
    back: 0.1 * partialState.underarm,
    front: 0.35 * partialState.underarm,
  },
});

export function Raglan() {
  const [state, setState] = useState<RaglanState>(
    fallback({
      chest: 100,
      underarm: 40,
    })
  );

  const setChest = (_: string, chest: number) => {
    setState((state) => ({ ...state, chest }));
  };
  const setUnderarm = (_: string, underarm: number) => {
    setState((state) => ({ ...state, underarm }));
  };
  const setBicep = (bicep: number) => {
    setState((state) => ({ ...state, sleeve: { ...state.sleeve, bicep } }));
  };
  const setSleeveWidth = (width: number) => {
    setState((state) => ({ ...state, sleeve: { ...state.sleeve, width } }));
  };
  const setSleeveLength = (length: number) => {
    setState((state) => ({ ...state, sleeve: { ...state.sleeve, length } }));
  };
  const setShoulderAngle = (angle: number) => {
    setState((state) => ({ ...state, sleeve: { ...state.sleeve, angle } }));
  };
  const setNeckWidth = (width: number) => {
    setState((state) => ({ ...state, neck: { ...state.neck, width } }));
  };
  const setNeckBack = (back: number) => {
    setState((state) => ({ ...state, neck: { ...state.neck, back } }));
  };
  const setNeckFront = (front: number) => {
    setState((state) => ({ ...state, neck: { ...state.neck, front } }));
  };

  const defaults = fallback(state);

  const degToRad = (x: number): number => (x * Math.PI) / 180;
  const sleeveAngleRad = degToRad(state.sleeve.angle);

  const shelf = state.chest * 0.02;

  const frontChest = state.chest / 2;
  const chestAfterShelf = frontChest - 2 * shelf;
  const halfBicep = state.sleeve.bicep / 2;
  const halfNeck = state.neck.width / 2;

  const shoulderToArmpit =
    halfBicep * Math.cos(sleeveAngleRad) +
    ((chestAfterShelf - halfNeck) / 2) * Math.tan(sleeveAngleRad);
  const backCastOff =
    (halfNeck - state.neck.back * Math.tan(sleeveAngleRad)) * 2;
  const bodySlopeWidth = (chestAfterShelf - backCastOff) / 2;

  const neckSlopeHeight = state.neck.front - state.neck.back;
  const neckSlopeWidth = neckSlopeHeight * Math.tan(sleeveAngleRad);
  const neckCastOff = backCastOff - neckSlopeWidth * 2;

  const sleeveExtentPastChest =
    state.sleeve.length * Math.cos(sleeveAngleRad) +
    halfBicep * Math.sin(sleeveAngleRad);
  const sleeveCastOff = (state.neck.back / Math.cos(sleeveAngleRad)) * 2;
  const sleeveSlopeWidth = (state.sleeve.bicep - shelf * 2 - sleeveCastOff) / 2;
  const sleeveSlopeHeight = 20;
  const sleeveTotalLength = state.sleeve.length + sleeveSlopeHeight;

  const garmentWidth = sleeveExtentPastChest * 2 + frontChest;

  console.log(
    `sleeve extent ${sleeveExtentPastChest} bodySlope withd ${bodySlopeWidth}`
  );

  const length = shoulderToArmpit + state.underarm;

  return (
    <VStack align="stretch">
      <Header />
      <Flex
        m={2}
        as="main"
        flexDir={"column"}
        alignItems={"stretch"}
        height={"100%"}
        width={"100%"}
        justify="center"
        marginLeft="auto"
        marginRight="auto"
      >
        <HStack wrap={"wrap"} justifyContent={"center"} alignItems={"start"}>
          <HStack
            align="stretch"
            wrap={{ base: "wrap", sm: "nowrap" }}
            justify="center"
            as="form"
          >
            <VStack align="stretch">
              <VStack align="end" as="fieldset">
                <Heading size="sm" as="legend">
                  Required
                </Heading>
                <FormControl>
                  <FormLabel>Chest (around your widest part)</FormLabel>
                  <NumberInput
                    value={state.chest}
                    onChange={setChest}
                    maxW={20}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>Underarm to bottom of garment</FormLabel>
                  <NumberInput
                    value={state.underarm}
                    onChange={setUnderarm}
                    maxW={20}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </VStack>

              <OptionalInput
                value={state.sleeve.bicep}
                label="Around bicep (widest part of arm)"
                default={defaults.sleeve.bicep}
                onChange={setBicep}
              />

              <OptionalInput
                value={state.sleeve.width}
                label="Around arm (where you want the sleeve to end)"
                default={defaults.sleeve.width}
                onChange={setSleeveWidth}
              />

              <OptionalInput
                value={state.sleeve.length}
                label="Sleeve length"
                default={defaults.sleeve.length}
                onChange={setSleeveLength}
              />

              <OptionalInput
                value={state.sleeve.angle}
                label="Sleeve/shoulder angle (degrees)"
                default={defaults.sleeve.angle}
                onChange={setShoulderAngle}
              />

              <OptionalInput
                value={state.neck.width}
                label="Neck width"
                default={defaults.neck.width}
                onChange={setNeckWidth}
              />

              <OptionalInput
                value={state.neck.back}
                label="Back neck depth"
                default={defaults.neck.back}
                onChange={setNeckBack}
              />

              <OptionalInput
                value={state.neck.front}
                label="Front neck depth"
                default={defaults.neck.front}
                onChange={setNeckFront}
              />
            </VStack>
          </HStack>
          <VStack align="center" justify="center">
            <HStack
              justify={"stretch"}
              align={"stretch"}
              alignSelf={"stretch"}
              justifySelf={"stretch"}
            >
              <figure>
                <svg
                  viewBox={`0 0 ${frontChest} ${length}`}
                  width={frontChest * 2}
                  height={length * 2}
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
              </figure>

              <figure>
                <svg
                  viewBox={`0 0 ${frontChest} ${length}`}
                  width={frontChest * 2}
                  height={length * 2}
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
              </figure>

              <figure>
                <svg
                  viewBox={`0 0 ${state.sleeve.bicep} ${sleeveTotalLength}`}
                  width={state.sleeve.bicep * 2}
                  height={sleeveTotalLength * 2}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    fill="grey"
                    points={
                      `${(state.sleeve.bicep - state.sleeve.width) / 2},${sleeveTotalLength} ` +
                      `0,${sleeveSlopeHeight} ` +
                      `${shelf},${sleeveSlopeHeight} ` +
                      `${shelf + sleeveSlopeWidth},0 ` +
                      `${shelf + sleeveSlopeWidth + sleeveCastOff},0  ` +
                      `${state.sleeve.bicep - shelf},${sleeveSlopeHeight} ` +
                      `${state.sleeve.bicep},${sleeveSlopeHeight} ` +
                      `${state.sleeve.bicep - (state.sleeve.bicep - state.sleeve.width) / 2},${sleeveTotalLength} `
                    }
                  />
                </svg>
                <Text as="figcaption">Sleeve</Text>
              </figure>

              <figure>
                <svg
                  viewBox={`${0 - sleeveExtentPastChest} 0 ${garmentWidth} ${length}`}
                  width={garmentWidth * 2}
                  height={length * 2}
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
              </figure>
            </HStack>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Dimension</Th>
                    <Th isNumeric>Back</Th>
                    <Th isNumeric>Front neck</Th>
                    <Th isNumeric>Sleeve</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Th>Bottom width</Th>
                    <Td isNumeric>{frontChest.toLocaleString()}</Td>
                    <Td></Td>
                    <Td isNumeric>{state.sleeve.width.toLocaleString()}</Td>
                  </Tr>
                  <Tr>
                    <Th>Sleeve max width</Th>
                    <Td></Td>
                    <Td></Td>
                    <Td isNumeric>{state.sleeve.bicep.toLocaleString()}</Td>
                  </Tr>
                  <Tr>
                    <Th>Body length</Th>
                    <Td isNumeric>{state.underarm.toLocaleString()}</Td>
                    <Td></Td>
                    <Td isNumeric>{state.sleeve.length.toLocaleString()}</Td>
                  </Tr>
                  <Tr>
                    <Th>Shelf</Th>
                    <Td isNumeric>{shelf.toLocaleString()}</Td>
                    <Td isNumeric>{shelf.toLocaleString()}</Td>
                    <Td isNumeric>{shelf.toLocaleString()}</Td>
                  </Tr>
                  <Tr>
                    <Th>Slope width</Th>
                    <Td isNumeric>{bodySlopeWidth.toLocaleString()}</Td>
                    <Td isNumeric>{neckSlopeWidth.toLocaleString()}</Td>
                    <Td isNumeric>{sleeveSlopeWidth.toLocaleString()}</Td>
                  </Tr>
                  <Tr>
                    <Th>Slope length</Th>
                    <Td isNumeric>{shoulderToArmpit.toLocaleString()}</Td>
                    <Td isNumeric>{neckSlopeHeight.toLocaleString()}</Td>
                    <Td isNumeric>{shoulderToArmpit.toLocaleString()}</Td>
                  </Tr>
                  <Tr>
                    <Th>Cast off</Th>
                    <Td isNumeric>{backCastOff.toLocaleString()}</Td>
                    <Td isNumeric>{neckCastOff.toLocaleString()}</Td>
                    <Td isNumeric>{sleeveCastOff.toLocaleString()}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </HStack>
        <Spacer m={2} flex={0} />
      </Flex>
    </VStack>
  );
}

function OptionalInput(props: {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  default: number;
}) {
  const [value, setValue] = useState<string>(props.value.toLocaleString());

  const isValid = (x: number) => !isNaN(x) && x !== undefined && x !== null;

  const onChange = (str: string, value: number) => {
    setValue(str);
    if (isValid(value)) {
      props.onChange(value);
    }
  };

  const onBlur = () => {
    const asInt = parseInt(value);
    if (!isValid(asInt)) {
      setValue(props.default.toLocaleString());
      props.onChange(props.default);
    }
  };

  return (
    <HStack as="fieldset" align={"center"}>
      <Heading size="sm" as="legend">
        {props.label}
      </Heading>
      <Box>
        <FormControl>
          <NumberInput
            value={value}
            defaultValue={props.default}
            onChange={onChange}
            onBlur={onBlur}
            maxW={20}
            aria-label="Measurement"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Box>
    </HStack>
  );
}
