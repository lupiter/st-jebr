import { ChangeEvent, useState } from "react";
import "./calculator.css";
import { AppState, UNIT } from "./app-state";
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
  HStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Heading,
  Tabs,
  TabPanel,
  TabPanels,
  Tab,
  TabList,
} from "@chakra-ui/react";

function Calculator() {
  const [state, setState] = useState<AppState>({
    gauge: {
      stitches: 14,
      rows: 21,
      unit: UNIT.CM,
      square: 10,
    },
  });

  const setGaugeStitches = (_: string, numberValue: number) => {
    setState({
      ...state,
      gauge: { ...state.gauge, stitches: numberValue },
    });
  };
  const setGaugeRows = (_: string, numberValue: number) => {
    setState({
      ...state,
      gauge: { ...state.gauge, rows: numberValue },
    });
  };
  const setGaugeUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      gauge: {
        ...state.gauge,
        unit: e.target.value === UNIT.CM.toString() ? UNIT.CM : UNIT.IN,
      },
    });
  };
  const setGaugeSquare = (e: ChangeEvent<HTMLSelectElement>) => {
    const square = parseInt(e.target.value);
    setState({
      ...state,
      gauge: {
        ...state.gauge,
        square: square === 10 ? 10 : square === 4 ? 4 : 1,
      },
    });
  };

  return (
    <VStack align="stretch" m={2} maxW={1000} justify="center" marginLeft="auto" marginRight="auto">
      <Header />
      <VStack as="main" align="stretch">
        <VStack as="form" align="center">
          <HStack as="fieldset" align="end">
            <Heading size="sm" as="legend">
              Gauge
            </Heading>
            <FormControl>
              <FormLabel>stitches</FormLabel>
              <NumberInput
                value={state.gauge.stitches}
                onChange={setGaugeStitches}
                maxW={20}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>rows</FormLabel>
              <NumberInput
                value={state.gauge.rows}
                onChange={setGaugeRows}
                maxW={20}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <Select
                placeholder="units"
                aria-label="units"
                onChange={setGaugeUnit}
                value={state.gauge.unit.toString()}
              >
                <option value="cm">cm</option>
                <option value="in">inch</option>
              </Select>
            </FormControl>
            <FormControl>
              <Select
                placeholder="square size"
                aria-label="square size"
                onChange={setGaugeSquare}
                value={state.gauge.square}
              >
                <option value={10}>10x10</option>
                <option value={4}>4x4</option>
                <option value={1}>1x1</option>
              </Select>
            </FormControl>
          </HStack>
          <Text className="working">
            ({state.gauge.stitches / state.gauge.square} sts/
            {state.gauge.unit.toString()};{" "}
            {state.gauge.rows / state.gauge.square} rows/
            {state.gauge.unit.toString()})
          </Text>
        </VStack>

        <Tabs>
          <TabList>
            <Tab>Rectangle</Tab>
            <Tab>Decrease/Increase Evenly</Tab>
            <Tab>Curve</Tab>
            <Tab>Slope</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Square gauge={state.gauge} />
            </TabPanel>
            <TabPanel>
              <Even />
            </TabPanel>
            <TabPanel>
              <Ellipse gauge={state.gauge} />
            </TabPanel>
            <TabPanel>
              <Slope gauge={state.gauge} />
            </TabPanel>

            {/*<Armhole gauge={state.gauge} />
          <BackNeck gauge={state.gauge} />
          <Slant gauge={state.gauge} />
          <CustomCurve gauge={state.gauge} />
          <SleeveHoleAndCap gauge={state.gauge} />
          <SleeveCapHeight gauge={state.gauge} />
          <StandardSleeveCap gauge={state.gauge} /> */}
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
