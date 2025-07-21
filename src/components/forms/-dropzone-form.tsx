import * as React from "react";
import { useController, UseFormReturn } from "react-hook-form";
import { JSX, useState } from "react";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { Group, Text } from "@mantine/core";
import { LuCloudUpload, LuFile, LuX } from "react-icons/lu";

interface DropzoneFormProps {
  form: UseFormReturn;
  name: string;

  [key: string]: DropzoneProps;
}

export const DropzoneForm: React.FC<DropzoneFormProps> = ({ form, name, ...rest }): JSX.Element => {
  const { field } = useController({
    control: form.control,
    name: name,
  });
  const [files, setFiles] = useState<string>(field.value);

  return (
    <Dropzone
      // onChange={e => {
      //
      // }}
      {...rest}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
        <Dropzone.Accept>
          <LuCloudUpload size={52} color="var(--mantine-color-blue-6)" stroke="1.5" />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <LuX size={52} color="var(--mantine-color-red-6)" stroke="1.5" />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <LuFile size={52} color="var(--mantine-color-dimmed)" stroke="1.5" />
        </Dropzone.Idle>
        <div>
          <Text ta="center" size="xl" inline>
            Drag files here or click to select files
          </Text>
          <Text ta="center" size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 50mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
