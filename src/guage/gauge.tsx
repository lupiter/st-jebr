import {
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  NumberInputRoot,
} from "@chakra-ui/react";
import { GaugeState, UNIT } from "../app-state";
import { ChangeEvent } from "react";
import { Field } from "../components/ui/field";
import { NumberInputField } from "../components/ui/number-input";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../components/ui/native-select";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogRoot,
} from "../components/ui/dialog";

export function ModalGauge(props: {
  gauge: GaugeState;
  onchange: (gauge: GaugeState) => void;
}) {
  return (
    <DialogRoot>
      <DialogTrigger>
        <Button>Gauge</Button>
      </DialogTrigger>

      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <Heading size="md">Gauge</Heading>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody as="form">
          <Gauge gauge={props.gauge} onchange={props.onchange} />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}

export function Gauge(props: {
  gauge: GaugeState;
  onchange: (gauge: GaugeState) => void;
}) {
  const setGaugeStitches = ({
    valueAsNumber,
  }: {
    value: string;
    valueAsNumber: number;
  }) => {
    props.onchange({
      ...props.gauge,
      stitches: valueAsNumber,
    });
  };
  const setGaugeRows = ({
    valueAsNumber,
  }: {
    value: string;
    valueAsNumber: number;
  }) => {
    props.onchange({
      ...props.gauge,
      rows: valueAsNumber,
    });
  };
  const setGaugeSquare = (e: ChangeEvent<HTMLSelectElement>) => {
    const square = parseInt(e.target.value);
    props.onchange({
      ...props.gauge,
      square: square === 10 ? 10 : square === 4 ? 4 : 1,
    });
  };
  const setGaugeUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    props.onchange({
      ...props.gauge,
      unit: e.target.value === UNIT.CM.toString() ? UNIT.CM : UNIT.IN,
    });
  };

  return (
    <VStack align="center" marginLeft={2} marginRight={2}>
      <HStack
        as="fieldset"
        align="end"
        wrap={{ base: "wrap", sm: "nowrap" }}
        justify="center"
      >
        <Heading size="sm" as="legend">
          Gauge
        </Heading>
        <HStack align="end">
          <Field label="stitches">
            <NumberInputRoot
              value={props.gauge.stitches.toLocaleString()}
              onValueChange={setGaugeStitches}
              maxW={20}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Field>
          <Field label="rows">
            <NumberInputRoot
              value={props.gauge.rows.toLocaleString()}
              onValueChange={setGaugeRows}
              maxW={20}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Field>
        </HStack>

        <HStack align="end">
          <Field label="square">
            <NativeSelectRoot maxW={20}>
              <NativeSelectField
                onChange={setGaugeSquare}
                value={props.gauge.square}
                placeholder="square size"
                aria-label="square size"
              >
                <option value={10}>10x10</option>
                <option value={4}>4x4</option>
                <option value={1}>1x1</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
          <Field label="unit">
            <NativeSelectRoot maxW={20}>
              <NativeSelectField
                placeholder="units"
                aria-label="units"
                onChange={setGaugeUnit}
                value={props.gauge.unit.toString()}
              >
                <option value="cm">cm</option>
                <option value="in">inch</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
        </HStack>
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
