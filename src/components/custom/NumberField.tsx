import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import { useEffect } from "react";

interface NumberFieldProps {
  id: string;
  label?: string;
  values: any;
  setFieldValue: Function;
  colorScheme?: string;
  mt?: string;
}

const NumberField = ({
  id,
  values,
  setFieldValue,
  mt = "0rem",
}: NumberFieldProps) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: values[id],
      min: 0,
      max: 999999999,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    if (input.value != values[id]) setFieldValue(id, input.value);
  }, [input]);

  return (
    <HStack maxW="220px" mt={mt}>
      <Button {...dec}>-</Button>
      <Input {...input} />
      <Button {...inc}>+</Button>
    </HStack>
  );
};

export default NumberField;
