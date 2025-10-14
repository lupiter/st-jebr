import { Field } from "../components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "../components/ui/number-input";
import { useState } from "react";

export function RequiredInput(props: {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  hint: string;
  showHint: boolean;
  errorText?: string;
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
      setValue("0");
      props.onChange(0);
    }
  };

  return (
    <Field
      label={props.label}
      helperText={props.showHint ? props.hint : undefined}
      required
      errorText={props.errorText}
    >
      <NumberInputRoot
        value={value.toLocaleString()}
        onValueChange={onChange}
        onBlur={onBlur}
        maxW={20}
        aria-label="Measurement"
      >
        <NumberInputField />
      </NumberInputRoot>
    </Field>
  );
}
