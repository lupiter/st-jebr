import { useState } from "react";
import {
  VStack,
  Text,
  HStack,
  Heading,
  Box,
  Flex,
  NumberInputRoot,
} from "@chakra-ui/react";
import { Remainder } from "./evenly/remainder";
import { Spread } from "./evenly/spread";
import { Field } from "../components/ui/field";
import { NumberInputField } from "../components/ui/number-input";

type EvenState = {
  before: number;
  after: number;
};

export function Even(): JSX.Element {
  const [state, setState] = useState<EvenState>({ before: 60, after: 50 });

  let aspectBefore = 100;
  let aspectAfter = 100;
  let offsetBefore = 1;
  let offsetAfter = 1;
  if (state.after > state.before) {
    aspectBefore = aspectBefore * (state.before / state.after);
    offsetBefore = (aspectAfter - aspectBefore) / 2;
  } else {
    aspectAfter = aspectAfter * (state.after / state.before);
    offsetAfter = (aspectBefore - aspectAfter) / 2;
  }

  const setBefore = ({
    valueAsNumber,
  }: {
    value: string;
    valueAsNumber: number;
  }) => {
    setState({
      ...state,
      before: valueAsNumber,
    });
  };
  const setAfter = ({
    valueAsNumber,
  }: {
    value: string;
    valueAsNumber: number;
  }) => {
    setState({
      ...state,
      after: valueAsNumber,
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
        <Text>
          Cuff to sleeve, ribbing to body, working in the round generally
        </Text>
        <HStack as="fieldset">
          <Heading size="sm" as="legend">
            Change
          </Heading>
          <Field maxW={40} label="Before" helperText="stitches">
            <NumberInputRoot
              value={state.before.toLocaleString()}
              onValueChange={setBefore}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Field>
          <Field maxW={40} label="After" helperText="stitches">
            <NumberInputRoot
              value={state.after.toLocaleString()}
              onValueChange={setAfter}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Field>
        </HStack>

        <Box alignSelf="center">
          <svg viewBox="0 0 102 102" width={102} height={102}>
            <rect
              width={aspectAfter}
              height={30}
              x={offsetAfter}
              y={1}
              stroke="black"
              strokeWidth={1}
              fill="transparent"
            ></rect>
            <g
              transform={`translate(${
                Math.max(aspectAfter, aspectBefore) / 2 - 10
              } 17)`}
            >
              <polygon points="10,0 20,10 15,10 15,20 5,20 5,10 0,10" />
            </g>
            <rect
              width={aspectBefore}
              height={30}
              x={offsetBefore}
              y={31}
              stroke="black"
              strokeWidth={1}
              fill="transparent"
            ></rect>
          </svg>
        </Box>
      </VStack>
      <VStack align="stretch" flex={1} flexShrink={0} flexBasis={20}>
        <Remainder before={state.before} after={state.after} />
        <Spread before={state.before} after={state.after} />
      </VStack>
    </Flex>
  );
}
