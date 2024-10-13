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
} from "@chakra-ui/react";
import { RaglanState } from "./state";
import { Figures } from "./figures";
import { RaglanTable } from "./table";

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

  const setChest = (chest: number) => {
    setState((state) => ({ ...state, chest }));
  };
  const setUnderarm = (underarm: number) => {
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

  const sleeveCastOff = (state.neck.back / Math.cos(sleeveAngleRad)) * 2;
  const sleeveSlopeWidth = (state.sleeve.bicep - shelf * 2 - sleeveCastOff) / 2;

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

                <Input label="Chest" value={state.chest} onChange={setChest} />
                <Input
                  label="Underarm"
                  value={state.underarm}
                  onChange={setUnderarm}
                />
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
            <Figures
              frontChest={frontChest}
              shoulderToArmpit={shoulderToArmpit}
              shelf={shelf}
              bodySlopeWidth={bodySlopeWidth}
              state={state}
              neckSlopeWidth={neckSlopeWidth}
              backCastOff={backCastOff}
              neckCastOff={neckCastOff}
              sleeveSlopeWidth={sleeveSlopeWidth}
              sleeveCastOff={sleeveCastOff}
              halfNeck={halfNeck}
              sleeveAngleRad={sleeveAngleRad}
              halfBicep={halfBicep}
              chestAfterShelf={chestAfterShelf}
            />
            <RaglanTable
              frontChest={frontChest}
              state={state}
              shelf={shelf}
              bodySlopeWidth={bodySlopeWidth}
              neckSlopeWidth={neckSlopeWidth}
              sleeveSlopeWidth={sleeveSlopeWidth}
              shoulderToArmpit={shoulderToArmpit}
              neckSlopeHeight={neckSlopeHeight}
              backCastOff={backCastOff}
              neckCastOff={neckCastOff}
              sleeveCastOff={sleeveCastOff}
            />
          </VStack>
        </HStack>
        <Spacer m={2} flex={0} />
      </Flex>
    </VStack>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
}) {
  const onInputChange = (_str: string, num: number) => {
    if (isNaN(num)) {
      onChange(0);
    }
    onChange(num);
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <NumberInput value={value} onChange={onInputChange} maxW={20}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
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
