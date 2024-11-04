import { useState } from "react";
import { GaugeState } from "../app-state";
import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  NumberInputRoot,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { NumberInputField } from "../components/ui/number-input";

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

  const setWidth = ({
    valueAsNumber,
  }: {
    value: string;
    valueAsNumber: number;
  }) => {
    setState({
      ...state,
      width: valueAsNumber,
    });
  };
  const setHeight = ({
    valueAsNumber,
  }: {
    value: string;
    valueAsNumber: number;
  }) => {
    setState({
      ...state,
      height: valueAsNumber,
    });
  };

  return (
    <Flex
      wrap="wrap"
      align="stretch"
      justify="stretch"
      direction={{ base: "column", md: "row" }}
    >
      <VStack align="stretch" flex={1} flexShrink={0} flexBasis={20}>
        <Text fontSize="sm">Body panel, dish cloth, apron front</Text>

        <HStack as="fieldset">
          <Heading size="sm" as="legend">
            Measurements
          </Heading>
          <Field
            maxW={40}
            label="Width"
            helperText={props.gauge.unit.toString()}
          >
            <NumberInputRoot
              value={state.width.toLocaleString()}
              onValueChange={setWidth}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Field>
          <Field
            maxW={40}
            label="Height"
            helperText={props.gauge.unit.toString()}
          >
            <NumberInputRoot
              value={state.height.toLocaleString()}
              onValueChange={setHeight}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Field>
        </HStack>
      </VStack>
      <VStack flex={1} flexShrink={0} flexBasis={20}>
        <Text fontSize="sm">
          {props.gauge.rows / props.gauge.square} sts/{props.gauge.unit} &times;{" "}
          {state.height} {props.gauge.unit} = {height} sts &asymp;{" "}
          {Math.round(height)} (rounded)
        </Text>
        <Text fontSize="sm">
          {props.gauge.stitches / props.gauge.square} sts/{props.gauge.unit}{" "}
          &times; {state.width} {props.gauge.unit} = {width} sts &asymp;{" "}
          {Math.round(width)} (rounded)
        </Text>
        <Grid
          alignSelf="center"
          templateColumns="repeat(2, 1fr)"
          alignItems="center"
          justifyItems="center"
        >
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
              {Math.round(width)} sts ({state.width}{" "}
              {props.gauge.unit.toString()}) wide
            </Text>
          </GridItem>
        </Grid>
      </VStack>
    </Flex>
  );
}
