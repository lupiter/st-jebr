import { ChangeEvent, useState } from "react";
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
    <VStack
      align="stretch"
      m={2}
      maxW={1000}
      justify="center"
      marginLeft="auto"
      marginRight="auto"
    >
      <Header />
      <VStack as="main" align="stretch">
        <Box as="form">
          <Gauge gauge={state} onchange={setState} />
        </Box>

        <Tabs>
          <TabList>
            <Tab>Rectangle</Tab>
            <Tab>Decrease/Increase Evenly</Tab>
            <Tab>Curve</Tab>
            <Tab>Slope</Tab>
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
