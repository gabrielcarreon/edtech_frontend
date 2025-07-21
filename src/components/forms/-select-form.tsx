import { Select, SelectProps } from "@mantine/core";
import * as React from "react";
import { useController, UseFormReturn } from "react-hook-form";
import { JSX, useState } from "react";

interface SelectFormProps {
  form: UseFormReturn;
  name: string;
  [key: string]: SelectProps
}
export const SelectForm: React.FC<SelectFormProps> = ({ form, name, ...rest }): JSX.Element => {
  const { field } = useController({
    control: form.control,
    name: name
  })
  const [value, setValue] = useState<string>(field.value)

  return (
    <Select
      onChange={e => {
        setValue(e)
        field.onChange(String(e))
      }}
      value={value}
      {...rest}
    />
  )
}
