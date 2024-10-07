import { ChangeEvent, useState } from "react";
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
  Switch,
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
  length: number;
  underarm: number;
  sleeve: {
    bicep: number;
    width: number;
    length: number;
  };
  neck: {
    width: number;
    depth: number;
    angle: number;
  };
};

const fallback = (partialState: {
  chest: number;
  length: number;
}): RaglanState => ({
  ...partialState,
  underarm: 0.6 * partialState.length,
  sleeve: {
    bicep: 0.36 * partialState.chest,
    width: 0.31 * partialState.chest,
    length: 0.08 * partialState.length,
  },
  neck: {
    width: 0.14 * partialState.chest,
    depth: 0.5 * partialState.length,
    angle: 76,
  },
});

export function Raglan() {
  const [state, setState] = useState<RaglanState>(
    fallback({
      chest: 100,
      length: 60,
    })
  );

  const setChest = (_: string, chest: number) => {
    setState((state) => ({ ...state, chest }));
  };
  const setLength = (_: string, length: number) => {
    setState((state) => ({ ...state, length }));
  };
  const setUnderarm = (underarm: number) => {
    setState((state) => ({ ...state, underarm }));
  };
  const setBicep = (underarm: number) => {
    setState((state) => ({ ...state, sleeve: { ...state.sleeve, underarm } }));
  };
  const setSleeveWidth = (width: number) => {
    setState((state) => ({ ...state, sleeve: { ...state.sleeve, width } }));
  };
  const setSleeveLength = (length: number) => {
    setState((state) => ({ ...state, sleeve: { ...state.sleeve, length } }));
  };
  const setNeckWidth = (width: number) => {
    setState((state) => ({ ...state, neck: { ...state.neck, width } }));
  };
  const setNeckDepth = (depth: number) => {
    setState((state) => ({ ...state, neck: { ...state.neck, depth } }));
  };
  const setNeckAngle = (angle: number) => {
    setState((state) => ({ ...state, neck: { ...state.neck, angle } }));
  };

  const defaults = fallback(state);

  const shelf = state.chest * 0.02;
  const bodySlopeWidth = (state.chest / 2 - state.neck.width) / 2 - shelf;
  const sleeveSlopeWidth = state.chest * 0.11;
  const sleeveCastOff = state.sleeve.bicep - (sleeveSlopeWidth + shelf) * 2;
  const neckSlopeHeight = state.neck.depth - sleeveCastOff / 2;
  const neckSlopeWidth =
    neckSlopeHeight / Math.tan((state.neck.angle * Math.PI) / 180);
  const neckCastOff = state.neck.width - neckSlopeWidth * 2;
  const sleeveTotalLength = state.sleeve.length + (state.length - state.underarm);

  console.log("render", sleeveSlopeWidth);

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
                  <FormLabel>Length (from back of neck)</FormLabel>
                  <NumberInput
                    value={state.length}
                    onChange={setLength}
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
                value={state.underarm}
                label="Underarm to bottom of garmet"
                default={defaults.underarm}
                onChange={setUnderarm}
              />

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
                value={state.neck.width}
                label="Neck width"
                default={defaults.neck.width}
                onChange={setNeckWidth}
              />

              <OptionalInput
                value={state.neck.depth}
                label="Neck depth"
                default={defaults.neck.depth}
                onChange={setNeckDepth}
              />

              <OptionalInput
                value={state.neck.angle}
                label="Neck slope (degrees)"
                default={defaults.neck.angle}
                onChange={setNeckAngle}
              />
            </VStack>
          </HStack>
          <VStack align="center" justify={"center"}>
            <HStack justify={'stretch'} align={'stretch'} alignSelf={'stretch'} justifySelf={'stretch'}>
              <figure>
                <svg
                  viewBox={`0 0 ${state.chest / 2} ${state.length}`}
                  width={state.chest / 2 * 2}
                  height={state.length * 2}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    fill="grey"
                    points={
                      `0,${state.length} ` +
                      `0,${state.length - state.underarm} ` +
                      `${shelf},${state.length - state.underarm} ` +
                      `${shelf + bodySlopeWidth},0 ` +
                      `${shelf + bodySlopeWidth + state.neck.width},0  ` +
                      `${state.chest / 2 - shelf},${state.length - state.underarm} ` +
                      `${state.chest / 2},${state.length - state.underarm} ` +
                      `${state.chest / 2},${state.length} `
                    }
                  />
                </svg>
                <Text as="figcaption">Back</Text>
              </figure>

              <figure>
                <svg
                  viewBox={`0 0 ${state.chest / 2} ${state.length}`}

                  width={state.chest / 2 * 2}
                  height={state.length * 2}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    fill="grey"
                    points={
                      `0,${state.length} ` +
                      `0,${state.length - state.underarm} ` +
                      `${shelf},${state.length - state.underarm} ` +
                      `${shelf + bodySlopeWidth},0 ` +
                      `${shelf + bodySlopeWidth + neckSlopeWidth},${neckSlopeHeight} ` +
                      `${shelf + bodySlopeWidth + neckSlopeWidth + neckCastOff},${neckSlopeHeight} ` +
                      `${shelf + bodySlopeWidth + state.neck.width},0  ` +
                      `${state.chest / 2 - shelf},${state.length - state.underarm} ` +
                      `${state.chest / 2},${state.length - state.underarm} ` +
                      `${state.chest / 2},${state.length} `
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
                      `0,${state.length - state.underarm} ` +
                      `${shelf},${state.length - state.underarm} ` +
                      `${shelf + sleeveSlopeWidth},0 ` +
                      `${shelf + sleeveSlopeWidth + sleeveCastOff},0  ` +
                      `${state.sleeve.bicep - shelf},${state.length - state.underarm} ` +
                      `${state.sleeve.bicep},${state.length - state.underarm} ` +
                      `${state.sleeve.bicep - (state.sleeve.bicep - state.sleeve.width) / 2},${sleeveTotalLength} `
                    }
                  />
                </svg>
                <Text as="figcaption">Sleeve</Text>
              </figure>
            </HStack>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Part</Th>
                    <Th isNumeric>Body width</Th>
                    <Th isNumeric>Body length</Th>
                    <Th isNumeric>Shelf</Th>
                    <Th isNumeric>Slope width</Th>
                    <Th isNumeric>Slope length</Th>
                    <Th isNumeric>Cast off</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Back</Td>
                    <Td isNumeric>{(state.chest / 2).toLocaleString()}</Td>
                    <Td isNumeric>{state.underarm.toLocaleString()}</Td>
                    <Td isNumeric>{shelf.toLocaleString()}</Td>
                    <Td isNumeric>{bodySlopeWidth.toLocaleString()}</Td>
                    <Td isNumeric>
                      {(state.length - state.underarm).toLocaleString()}
                    </Td>
                    <Td isNumeric>{state.neck.width.toLocaleString()}</Td>
                  </Tr>
                  <Tr>
                    <Td>Front neck</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td isNumeric>{neckSlopeWidth.toLocaleString()}</Td>
                    <Td isNumeric>{neckSlopeHeight.toLocaleString()}</Td>
                    <Td isNumeric>
                      {(neckCastOff).toLocaleString()}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>

              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Part</Th>
                    <Th isNumeric>Sleeve end width</Th>
                    <Th isNumeric>Sleeve max width</Th>
                    <Th isNumeric>Sleeve length</Th>
                    <Th isNumeric>Shelf</Th>
                    <Th isNumeric>Slope width</Th>
                    <Th isNumeric>Slope length</Th>
                    <Th isNumeric>Cast off</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Sleeve</Td>
                    <Td isNumeric>{state.sleeve.width.toLocaleString()}</Td>
                    <Td isNumeric>{state.sleeve.bicep.toLocaleString()}</Td>
                    <Td isNumeric>{state.sleeve.length.toLocaleString()}</Td>
                    <Td isNumeric>{shelf.toLocaleString()}</Td>
                    <Td isNumeric>{sleeveSlopeWidth.toLocaleString()}</Td>
                    <Td isNumeric>
                      {(state.length - state.underarm).toLocaleString()}
                    </Td>
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
  const [state, setState] = useState<{
    override: number;
    useOverride: boolean;
  }>({
    override: props.value,
    useOverride: false,
  });

  const setOverride = (_: string, value: number) => {
    setState((curr) => ({
      ...curr,
      override: value,
    }));
    props.onChange(value);
  };
  const setUseOverride = (e: ChangeEvent<HTMLInputElement>) => {
    const useOverride = e.target.checked;
    setState((curr) => ({
      ...curr,
      useOverride,
    }));
    props.onChange(useOverride ? state.override : props.default);
  };

  return (
    <HStack as="fieldset" align={"center"}>
      <Heading size="sm" as="legend">
        {props.label}
      </Heading>

      <Box>
        <FormControl>
          <Switch
            isChecked={state.useOverride}
            onChange={setUseOverride}
            aria-label="Measure myself"
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <NumberInput
            value={state.override}
            onChange={setOverride}
            maxW={20}
            isDisabled={!state.useOverride}
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
