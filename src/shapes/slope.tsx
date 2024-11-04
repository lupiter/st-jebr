import { ChangeEvent, useState } from "react";
import { GaugeState } from "../app-state";
import { BlockedSlope } from "./blocked-slope";
import {
  Text,
  HStack,
  Heading,
  VStack,
  Grid,
  GridItem,
  Spacer,
  AccordionItem,
  Box,
  Link,
  Flex,
  NumberInputRoot,
  AccordionRoot,
  AccordionItemTrigger,
  AccordionItemContent,
  NativeSelectField,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Field } from "../components/ui/field";
import { NumberInputField } from "../components/ui/number-input";
import { NativeSelectRoot } from "../components/ui/native-select";

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
      <VStack align="stretch" flex={1} flexShrink={0} flexBasis={20}>
        <HStack as="fieldset" align="end">
          <Heading size="sm" as="legend">
            Size
          </Heading>

          <Field maxW={40} label="Width">
            <NumberInputRoot
              value={state.width.toLocaleString()}
              onValueChange={setWidth}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Field>
          <Field maxW={40} label="Height">
            <NumberInputRoot
              value={state.height.toLocaleString()}
              onValueChange={setHeight}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Field>
          <Field maxW={40}>
            <NativeSelectRoot>
              <NativeSelectField
                aria-label="mode"
                onChange={setMode}
                value={state.mode.toString()}
              >
                <option value={MODE.MEASURE.toString()}>
                  {props.gauge.unit.toString()}
                </option>
                <option value={MODE.STITCH.toString()}>stitches</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
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

      <VStack align="stretch" flex={1} flexShrink={0} flexBasis={20}>
        <AccordionRoot multiple>
          <AccordionItem value="working">
            <h2>
              <AccordionItemTrigger>
                <Box as="span" flex="1" textAlign="left">
                  Working
                </Box>
              </AccordionItemTrigger>
            </h2>
            <AccordionItemContent pb={4}>
              <Text>
                Using{" "}
                <Link
                  href="https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm"
                  color="pink.500"
                >
                  Bresenham's algorithm <ExternalLinkIcon mx="2px" />
                </Link>
              </Text>
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>

        <BlockedSlope
          x={widthSt}
          y={heightSt}
          aspect={props.gauge.stitches / props.gauge.rows}
        />
      </VStack>
    </Flex>
  );
}
