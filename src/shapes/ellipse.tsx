import { useState } from "react";
import { GaugeState } from "../app-state";
import { BlockedCurve } from "./blocked-curve";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

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
        flexBasis={20}>
        <Text>Round necks, sleeve heads, armscyes</Text>

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

      <VStack 
        spacing={2}
        align="stretch"
        flex={1}
        flexShrink={0}
        flexBasis={20}>
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
                {/* <a href="https://www.geeksforgeeks.org/midpoint-ellipse-drawing-algorithm/">
          midpoint ellipse drawing algorithm
        </a>{" "} */}
                <Link
                  href="https://zingl.github.io/bresenham.html"
                  color="pink.500"
                  isExternal
                >
                  Bresenham's algorithm extended to ellipses{" "}
                  <ExternalLinkIcon mx="2px" />
                </Link>{" "}
                with sorting from{" "}
                <Link
                  href="http://src.acm.org/binaries/content/assets/src/2012/tiffany-inglis.pdf"
                  color="pink.500"
                  isExternal
                >
                  Inglis' Superpixelator <ExternalLinkIcon mx="2px" />
                </Link>
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <BlockedCurve
          aspect={props.gauge.stitches / props.gauge.rows}
          rx={Math.round(width)}
          ry={Math.round(height)}
        />
      </VStack>
    </Flex>
  );
}
