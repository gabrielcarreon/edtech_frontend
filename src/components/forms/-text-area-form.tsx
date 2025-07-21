import { Textarea, TextareaProps } from "@mantine/core";
import * as React from "react";
import { useController, UseFormReturn } from "react-hook-form";
import { JSX, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";

interface TextareaFormProps {
  form: UseFormReturn;
  name: string;

  [key: string]: TextareaProps;
}

export const TextareaForm: React.FC<TextareaFormProps> = ({ form, name, ...rest }): JSX.Element => {
  const { field, formState: { errors } } = useController({
    control: form.control,
    name: name,
  });
  const [value, setValue] = useState<string>(field.value);
  return (
    <>
      <Textarea
        mb={4}
        onChange={e => {
          setValue(e.target.value);
          field.onChange(String(e.target.value));
        }}
        value={value}
        {...rest}
      />
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => <p className="text-xs text-red-500">{message}</p>}
      />
    </>
  );
};
