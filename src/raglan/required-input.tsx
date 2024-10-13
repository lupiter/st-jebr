import { FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormHelperText } from "@chakra-ui/react";

export function RequiredInput({
    label,
    value,
    onChange,
    hint,
    showHint,
  }: {
    label: string;
    value: number;
    onChange: (newValue: number) => void;
    hint: string;
    showHint: boolean;
  }) {
    const onInputChange = (_str: string, num: number) => {
      if (isNaN(num)) {
        onChange(0);
      }
      onChange(num);
    };
  
    return (
      <FormControl isRequired={true}>
        <FormLabel>{label}</FormLabel>
        <NumberInput value={value} onChange={onInputChange}  maxW={20}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {showHint && <FormHelperText>{hint}</FormHelperText>}
      </FormControl>
    );
  }