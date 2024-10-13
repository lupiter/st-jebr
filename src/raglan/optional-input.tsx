import {
  Box,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";

export function OptionalInput(props: {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  default: number;
  hint: string;
  showHint: boolean;
}) {
  const [value, setValue] = useState<string>(props.value.toLocaleString());

  const isValid = (x: number) => !isNaN(x) && x !== undefined && x !== null;

  const onChange = (str: string, value: number) => {
    setValue(str);
    if (isValid(value)) {
      props.onChange(value);
    }
  };

  const onBlur = () => {
    const asInt = parseInt(value);
    if (!isValid(asInt)) {
      setValue(props.default.toLocaleString());
      props.onChange(props.default);
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>{props.label}</FormLabel>
        <NumberInput
          value={value}
          defaultValue={props.default}
          onChange={onChange}
          onBlur={onBlur}
          maxW={20}
          aria-label="Measurement"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        {props.showHint && <FormHelperText>{props.hint}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
