import type { QuestionType } from "@/lib/types.ts";
import * as React from "react";
import { ThemeIcon } from "@mantine/core";
import { question_type_map } from "./types.tsx";

interface QuestionIconInterface {
  question_type: QuestionType;
  [key: string]: string;
}

export const QuestionIcon: React.FC<QuestionIconInterface> = ({ question_type, ...rest }) => {
  const icon_config = question_type_map[question_type];
  const Icon = icon_config.icon;
  return (
    <ThemeIcon size="xl" bdrs="lg" color={icon_config.color}>
      <Icon {...rest} />
    </ThemeIcon>
  );
};
