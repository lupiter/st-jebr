import { useState } from "react";
import { GaugeState } from "../app-state";
import { BlockedCurve } from "./blocked-curve";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Link,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Field } from "../components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "../components/ui/number-input";

type EllipseState = {
  width: number;
  height: number;
};

export function Ellipse(props: { gauge: GaugeState }): JSX.Element {
  const [state, setState] = useState<EllipseState>({
    width: 9,
    height: 8.5,
  });
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
        <Text>Round necks, sleeve heads, armscyes</Text>

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
              <svg
                viewBox={`-1 -1 ${aspectWidth * 2 + 2} ${aspectHeight * 2 + 2}`}
                width={aspectWidth * 2 + 2}
                height={aspectHeight * 2 + 2}
              >
                <ellipse
                  rx={aspectWidth}
                  ry={aspectHeight}
                  cx={aspectWidth}
                  cy={aspectHeight}
                  stroke="blue"
                  strokeDasharray={4}
                  fill="none"
                />
                <path
                  d={`M ${
                    aspectWidth * 2
                  },${aspectHeight} A ${aspectWidth} ${aspectHeight} 0 0 1 ${aspectWidth},${
                    aspectHeight * 2
                  }`}
                  stroke="black"
                  strokeWidth={1}
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
              {Math.round(width)} sts ({state.width}{" "}
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
                {/* <a href="https://www.geeksforgeeks.org/midpoint-ellipse-drawing-algorithm/">
          midpoint ellipse drawing algorithm
        </a>{" "} */}
                <Link
                  href="https://zingl.github.io/bresenham.html"
                  color="pink.500"
                >
                  Bresenham's algorithm extended to ellipses{" "}
                  <ExternalLinkIcon mx="2px" />
                </Link>{" "}
                with sorting from{" "}
                <Link
                  href="http://src.acm.org/binaries/content/assets/src/2012/tiffany-inglis.pdf"
                  color="pink.500"
                >
                  Inglis' Superpixelator <ExternalLinkIcon mx="2px" />
                </Link>
              </Text>
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>

        <BlockedCurve
          aspect={props.gauge.stitches / props.gauge.rows}
          rx={Math.round(width)}
          ry={Math.round(height)}
        />
      </VStack>
    </Flex>
  );
}
