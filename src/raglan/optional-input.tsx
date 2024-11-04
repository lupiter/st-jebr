import { Box } from "@chakra-ui/react";

import { Field } from "../components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "../components/ui/number-input";
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

  const onChange = ({
    value,
    valueAsNumber,
  }: {
    value: string;
    valueAsNumber: number;
  }) => {
    setValue(value);
    if (isValid(valueAsNumber)) {
      props.onChange(valueAsNumber);
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
      <Field
        label={props.label}
        helperText={props.showHint ? props.hint : undefined}
      >
        <NumberInputRoot
          value={value}
          defaultValue={props.default.toLocaleString()}
          onValueChange={onChange}
          onBlur={onBlur}
          maxW={20}
          aria-label="Measurement"
        >
          <NumberInputField />
        </NumberInputRoot>
      </Field>
    </Box>
  );
}
