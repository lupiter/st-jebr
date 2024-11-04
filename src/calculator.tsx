import { useState } from "react";
import "./calculator.css";
import { GaugeState, UNIT } from "./app-state";
import { Square } from "./shapes/square";
import { Even } from "./shapes/even";
import { Ellipse } from "./shapes/ellipse";
import { Slope } from "./shapes/slope";
import { Header } from "./header/header";
import { VStack, Text, Tabs, Box, Flex } from "@chakra-ui/react";
import { Alert } from "./components/ui/alert";
import { Gauge } from "./guage/gauge";

function Calculator() {
  const [state, setState] = useState<GaugeState>({
    stitches: 14,
    rows: 21,
    unit: UNIT.CM,
    square: 10,
  });

  return (
    <VStack align="stretch">
      <Header />
      <VStack
        m={2}
        as="main"
        align="stretch"
        justify="center"
        marginLeft="auto"
        marginRight="auto"
        width="100%"
      >
        <Box as="form">
          <Gauge gauge={state} onchange={setState} />
        </Box>

        <Tabs.Root>
          <Tabs.List>
            <Tabs.Trigger value="rectangle">
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={1}
                justify="center"
                align="center"
              >
                <svg viewBox="0 0 22 22" width={22} height={22}>
                  <rect
                    x={1}
                    y={1}
                    width={20}
                    height={20}
                    stroke="black"
                    fill="none"
                    strokeWidth={1}
                  />
                </svg>
                <Text>Rectangle</Text>
              </Flex>
            </Tabs.Trigger>
            <Tabs.Trigger value="evenly">
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={1}
                justify="center"
                align="center"
              >
                <svg viewBox="0 0 22 22" width={22} height={22}>
                  <rect
                    x={1}
                    y={1}
                    width={20}
                    height={10}
                    stroke="black"
                    fill="none"
                    strokeWidth={1}
                  />
                  <rect
                    x={4}
                    y={11}
                    width={14}
                    height={10}
                    stroke="black"
                    fill="none"
                    strokeWidth={1}
                  />
                </svg>
                <Text>Decrease/Increase Evenly</Text>
              </Flex>
            </Tabs.Trigger>
            <Tabs.Trigger value="curve">
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={1}
                justify="center"
                align="center"
              >
                <svg viewBox="0 0 22 22" width={22} height={22}>
                  <path
                    d="M 1,1 A 20 20 0 0 1 20,20 L 1,20 z"
                    stroke="black"
                    fill="none"
                    strokeWidth={1}
                  />
                </svg>
                <Text>Curve</Text>
              </Flex>
            </Tabs.Trigger>
            <Tabs.Trigger value="slope">
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={1}
                justify="center"
                align="center"
              >
                <svg viewBox="0 0 22 22" width={22} height={22}>
                  <path
                    d="M 1,1 L 1,20 20,20 z"
                    stroke="black"
                    fill="none"
                    strokeWidth={1}
                  />
                </svg>
                <Text>Slope</Text>
              </Flex>
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="rectangle">
            <Square gauge={state} />
          </Tabs.Content>
          <Tabs.Content value="evenly">
            <Even />
          </Tabs.Content>
          <Tabs.Content value="curve">
            <Ellipse gauge={state} />
          </Tabs.Content>
          <Tabs.Content value="slope">
            <Slope gauge={state} />
          </Tabs.Content>

          {/*<Armhole gauge={state} />
          <BackNeck gauge={state} />
          <Slant gauge={state} />
          <CustomCurve gauge={state} />
          <SleeveHoleAndCap gauge={state} />
          <SleeveCapHeight gauge={state} />
          <StandardSleeveCap gauge={state} /> */}
        </Tabs.Root>
      </VStack>

      <Alert status="info">
        <Text>
          This calculator is a <em>work in progress</em> and may produce
          unexpected results.
        </Text>
      </Alert>
    </VStack>
  );
}

export default Calculator;
