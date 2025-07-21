import { NumberInput, NumberInputProps, Select } from "@mantine/core";
import * as React from "react";
import { useController, UseFormReturn } from "react-hook-form";
import { JSX, useState } from "react";

interface NumberInputFormProps {
  form: UseFormReturn;
  name: string;
  [key: string]: NumberInputProps
}
export const NumberInputForm: React.FC<NumberInputFormProps> = ({ form, name, ...rest }): JSX.Element => {
  const { field } = useController({
    control: form.control,
    name: name
  })
  const [value, setValue] = useState<string>(field.value)

  return (
    <NumberInput
      value={value}
      onChange={e => {
        setValue(e);
        field.onChange(Number(e));
      }}
      {...rest}
    />
  )
}
