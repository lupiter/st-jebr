import { useState } from "react";
import "./calculator.css";
import { GaugeState, UNIT } from "./app-state";
import { Square } from "./shapes/square";
import { Even } from "./shapes/even";
import { Ellipse } from "./shapes/ellipse";
import { Slope } from "./shapes/slope";
import { Header } from "./header/header";
import {
  Alert,
  AlertIcon,
  VStack,
  Text,
  Tabs,
  TabPanel,
  TabPanels,
  Tab,
  TabList,
  Box,
  Flex,
} from "@chakra-ui/react";
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
        maxW={1000}
        justify="center"
        marginLeft="auto"
        marginRight="auto"
      >
        <Box as="form">
          <Gauge gauge={state} onchange={setState} />
        </Box>

        <Tabs>
          <TabList>
            <Tab>
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
            </Tab>
            <Tab>
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
            </Tab>
            <Tab>
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
            </Tab>
            <Tab>
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
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Square gauge={state} />
            </TabPanel>
            <TabPanel>
              <Even />
            </TabPanel>
            <TabPanel>
              <Ellipse gauge={state} />
            </TabPanel>
            <TabPanel>
              <Slope gauge={state} />
            </TabPanel>

            {/*<Armhole gauge={state} />
          <BackNeck gauge={state} />
          <Slant gauge={state} />
          <CustomCurve gauge={state} />
          <SleeveHoleAndCap gauge={state} />
          <SleeveCapHeight gauge={state} />
          <StandardSleeveCap gauge={state} /> */}
          </TabPanels>
        </Tabs>
      </VStack>

      <Alert status="info">
        <AlertIcon />
        <Text>
          This calculator is a <em>work in progress</em> and may produce
          unexpected results.
        </Text>
      </Alert>
    </VStack>
  );
}

export default Calculator;
