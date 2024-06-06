import {
  VStack,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Text,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { GaugeState, UNIT } from "../app-state";
import { ChangeEvent } from "react";

export function ModalGauge(props: {
  gauge: GaugeState;
  onchange: (gauge: GaugeState) => void;
}) {

  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure();

  return (
    <Box>
      <Button onClick={onOpen}>Gauge</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">Gauge</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody as="form">
            <Gauge gauge={props.gauge} onchange={props.onchange} />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export function Gauge(props: {
  gauge: GaugeState;
  onchange: (gauge: GaugeState) => void;
}) {
  const setGaugeStitches = (_: string, numberValue: number) => {
    props.onchange({
      ...props.gauge,
      stitches: numberValue,
    });
  };
  const setGaugeRows = (_: string, numberValue: number) => {
    props.onchange({
      ...props.gauge,
      rows: numberValue,
    });
  };
  const setGaugeUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    props.onchange({
      ...props.gauge,
      unit: e.target.value === UNIT.CM.toString() ? UNIT.CM : UNIT.IN,
    });
  };
  const setGaugeSquare = (e: ChangeEvent<HTMLSelectElement>) => {
    const square = parseInt(e.target.value);
    props.onchange({
      ...props.gauge,
      square: square === 10 ? 10 : square === 4 ? 4 : 1,
    });
  };

  return (
    <VStack align="center">
      <HStack as="fieldset" align="end">
        <Heading size="sm" as="legend">
          Gauge
        </Heading>
        <FormControl>
          <FormLabel>stitches</FormLabel>
          <NumberInput
            value={props.gauge.stitches}
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
            value={props.gauge.rows}
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
            value={props.gauge.unit.toString()}
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
            value={props.gauge.square}
          >
            <option value={10}>10x10</option>
            <option value={4}>4x4</option>
            <option value={1}>1x1</option>
          </Select>
        </FormControl>
      </HStack>
      <Text className="working">
        ({props.gauge.stitches / props.gauge.square} sts/
        {props.gauge.unit.toString()}; {props.gauge.rows / props.gauge.square}{" "}
        rows/
        {props.gauge.unit.toString()})
      </Text>
    </VStack>
  );
}
