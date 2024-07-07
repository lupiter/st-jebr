import { ChangeEvent, useState } from "react";
import { GaugeState } from "../app-state";
import { BlockedSlope } from "./blocked-slope";
import {
  FormControl,
  Text,
  FormLabel,
  HStack,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
  Grid,
  GridItem,
  Spacer,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link,
  Flex,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type SlopeState = {
  width: number;
  height: number;
  mode: MODE;
};

enum MODE {
  MEASURE = "measure",
  STITCH = "stitch",
}

export function Slope(props: { gauge: GaugeState }): JSX.Element {
  const [state, setState] = useState<SlopeState>({
    width: 20,
    height: 8,
    mode: MODE.STITCH,
  });

  let heightSt = state.height;
  let widthSt = state.width;
  let heightMeasure = state.height * (props.gauge.square / props.gauge.rows);
  let widthMeasure = state.width * (props.gauge.square / props.gauge.stitches);
  if (state.mode === MODE.MEASURE) {
    heightSt = state.height * (props.gauge.rows / props.gauge.square);
    widthSt = state.width * (props.gauge.stitches / props.gauge.square);
    heightMeasure = state.height;
    widthMeasure = state.width;
  }

  let aspectWidth = 100;
  let aspectHeight = 100;
  if (widthMeasure > heightMeasure) {
    aspectHeight = aspectHeight * (heightMeasure / widthMeasure);
  } else {
    aspectWidth = aspectWidth * (widthMeasure / heightMeasure);
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
  const setMode = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      mode:
        e.target.value === MODE.MEASURE.toString() ? MODE.MEASURE : MODE.STITCH,
    });
  };

  return (
    <Flex
      wrap="wrap"
      align="stretch"
      justify="stretch"
      direction={{ base: "column", md: "row" }}
    >
      <VStack
        spacing={2}
        align="stretch"
        flex={1}
        flexShrink={0}
        flexBasis={20}
      >
        <HStack as="fieldset" align="end">
          <Heading size="sm" as="legend">
            Size
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
          </FormControl>
          <FormControl maxW={40}>
            <Select
              aria-label="mode"
              onChange={setMode}
              value={state.mode.toString()}
            >
              <option value={MODE.MEASURE.toString()}>
                {props.gauge.unit.toString()}
              </option>
              <option value={MODE.STITCH.toString()}>stitches</option>
            </Select>
          </FormControl>
        </HStack>

        <Grid
          alignSelf="center"
          templateColumns="repeat(2, 1fr)"
          alignItems="center"
          justifyItems="center"
          m={4}
        >
          <GridItem>
            <Text>
              {Math.round(heightSt)} sts ({Math.round(heightMeasure * 10) / 10}{" "}
              {props.gauge.unit.toString()}) high
            </Text>
          </GridItem>
          <GridItem>
            {!Number.isNaN(aspectWidth) && !Number.isNaN(aspectHeight) && (
              <svg
                viewBox={`-1 -1  ${aspectWidth + 2} ${aspectHeight + 2}`}
                width={aspectWidth}
                height={aspectHeight}
              >
                <polyline
                  points={`0,${aspectHeight} ${aspectWidth},0`}
                  stroke="black"
                  strokeWidth={1}
                  fill="none"
                />
                <polyline
                  points={`0,${aspectHeight} ${aspectWidth},${aspectHeight} ${aspectWidth},0`}
                  stroke="black"
                  strokeWidth={1}
                  strokeDasharray={4}
                  fill="none"
                />
              </svg>
            )}
          </GridItem>
          <GridItem>
            <Spacer />
          </GridItem>
          <GridItem>
            <Text>
              {Math.round(widthSt)} sts ({Math.round(widthMeasure * 10) / 10}{" "}
              {props.gauge.unit.toString()}) wide
            </Text>
          </GridItem>
        </Grid>
      </VStack>

      <VStack
        spacing={2}
        align="stretch"
        flex={1}
        flexShrink={0}
        flexBasis={20}
      >
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Working
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>
                Using{" "}
                <Link
                  href="https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm"
                  color="pink.500"
                  isExternal
                >
                  Bresenham's algorithm <ExternalLinkIcon mx="2px" />
                </Link>
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <BlockedSlope
          x={widthSt}
          y={heightSt}
          aspect={props.gauge.stitches / props.gauge.rows}
        />
      </VStack>
    </Flex>
  );
}
