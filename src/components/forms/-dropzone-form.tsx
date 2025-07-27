import * as React from "react";
import {
  FieldArray,
  FieldArrayWithId,
  FieldValues,
  useController,
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { JSX, useCallback, useEffect, useState } from "react";
import { Dropzone, DropzoneProps, FileWithPath } from "@mantine/dropzone";
import { ActionIcon, Button, Divider, Group, Text, ThemeIcon } from "@mantine/core";
import { LuCloudUpload, LuFile, LuTrash2, LuX } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/lib/utils/axios_instance.ts";
import { base_url } from "@/lib/constants.ts";
import { notifications } from "@mantine/notifications";

interface DropzoneFormProps {
  form: UseFormReturn;
  name: string;

  [key: string]: DropzoneProps;
}

interface FileAttachedProps {
  file: FieldArray<{
    name: string;
    size: string;
  }>;
  index: number;
  fieldArray: UseFieldArrayReturn<FieldValues, string, "id">
}

const FileAttached: React.FC<FileAttachedProps> = ({ file, fieldArray, index }) => {
  return (
    <div className="mt-2 p-4 bg-gray-100/50 flex justify-between rounded-lg border border-gray-300/50 items-center">
      <div className="flex items-center gap-4">
        <ThemeIcon variant="light" color="violet" size={40} bdrs={10}>
          <LuFile h={52} />
        </ThemeIcon>
        <div className="overflow-hidden">
          <p className="text-sm text-ellipsis">{file.name}</p>
          <p className="text-xs text-gray-600">{file.size}kb</p>
        </div>
      </div>
      <ActionIcon
        onClick={() => fieldArray.remove(index)}
        color="red"
        variant="subtle"
        aria-label="Settings"
      >
        <LuTrash2 />
      </ActionIcon>
    </div>
  );
};


export const DropzoneForm: React.FC<DropzoneFormProps> = ({ form, name, ...rest }): JSX.Element => {
  const fieldArray = useFieldArray({
    keyName: "uid",
    control: form.control,
    name: name
  })
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate } = useMutation({
    mutationFn: async (variables) => {
      const response = await instance.post(`${base_url}/file-manager/`, variables, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    mutationKey: [`upload_file`],
  });

  return (
    <>
      <Dropzone
        loading={loading}
        onDrop={(uploaded_files: FileWithPath[]) => {
          setLoading(true);
          mutate({ attachments: uploaded_files, type: "document" }, {
            onSuccess: data => {
              const response = data.files;
              response.forEach((file, index) => {
                fieldArray.append({
                  name: uploaded_files[index].name,
                  size: uploaded_files[index].size,
                  uuid: file.uuid,
                  timestamp: file.timestamp,
                  ...uploaded_files[index]
                })
              })
            },
            onError: ({ response }) => {
              const errors = response.data.errors
              errors.forEach(error => {
                notifications.show({
                  title: "Upload failed",
                  message: error.detail,
                  color: "red"
                })
              })
              setLoading(false)
            },
            onSettled: data => {
              setLoading(false);
            }
          });
        }}
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
      {fieldArray.fields.length > 0 && (
        <>
          <Divider my={20} />
          <p className="font-medium">Uploaded Files</p>
          {fieldArray.fields.map((file, index) => (
            <FileAttached
              key={file.uid}
              file={file}
              index={index}
              fieldArray={fieldArray}
            />
          ))}
        </>
      )}
    </>
  );
};
