import { ChangeEvent, useState } from "react";
import { GaugeState } from "../app-state";
import style from "./shapes.module.css";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

type SquareState = {
  width: number;
  height: number;
};

export function Square(props: { gauge: GaugeState }): JSX.Element {
  const [state, setState] = useState<SquareState>({ width: 20, height: 20 });
  const height = state.height * (props.gauge.rows / props.gauge.square);
  const width = state.width * (props.gauge.stitches / props.gauge.square);

  let aspectWidth = 100;
  let aspectHeight = 100;
  if (state.width > state.height) {
    aspectHeight = aspectHeight * (state.height / state.width);
  } else {
    aspectWidth = aspectWidth * (state.width / state.height);
  }

  const setWidth = (_: string, numberValue: number) => {
    setState({
      ...state,
      width: numberValue,
    });
  };
  const setHeight = (_: string, numberValue: number) => {
    setState({
      ...state,
      height: numberValue,
    });
  };

  return (
    <VStack spacing={2} align="stretch">
      <Text size="sm">Body panel, dish cloth, apron front</Text>

      <HStack as="fieldset">
        <Heading size="sm" as="legend">
          Measurements
        </Heading>
        <FormControl maxW={40}>
          <FormLabel>Width</FormLabel>
          <NumberInput value={state.width} onChange={setWidth}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>{props.gauge.unit.toString()}</FormHelperText>
        </FormControl>
        <FormControl maxW={40}>
          <FormLabel>Height</FormLabel>
          <NumberInput value={state.height} onChange={setHeight}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>{props.gauge.unit.toString()}</FormHelperText>
        </FormControl>
      </HStack>
      <Text size="sm">
        {props.gauge.rows / props.gauge.square} sts/{props.gauge.unit} &times;{" "}
        {state.height} {props.gauge.unit} = {height} sts &asymp;{" "}
        {Math.round(height)} (rounded)
      </Text>
      <Text size="sm">
        {props.gauge.stitches / props.gauge.square} sts/{props.gauge.unit}{" "}
        &times; {state.width} {props.gauge.unit} = {width} sts &asymp;{" "}
        {Math.round(width)} (rounded)
      </Text>
      <Grid alignSelf="center" templateColumns="repeat(2, 1fr)" alignItems="center" justifyItems="center">
        <GridItem>
          <Text>
            {Math.round(height)} sts ({state.height}{" "}
            {props.gauge.unit.toString()}) high
          </Text>
        </GridItem>
        <GridItem>
          {!Number.isNaN(aspectWidth) && !Number.isNaN(aspectHeight) && (
            <svg viewBox="0 0 102 102" width="102" height="102">
              <rect
                width={aspectWidth}
                height={aspectHeight}
                x={1}
                y={1}
                stroke="black"
                strokeWidth={1}
                fill="none"
              ></rect>
            </svg>
          )}
        </GridItem>
        <GridItem>
          <Spacer />
        </GridItem>
        <GridItem>
          <Text>
            {Math.round(width)} sts ({state.width} {props.gauge.unit.toString()}
            ) wide
          </Text>
        </GridItem>
      </Grid>
    </VStack>
  );
}
