import type { IconBaseProps } from "react-icons";
import * as React from "react";
import { LuCircle, LuCircleCheck, LuPencilLine, LuPenTool } from "react-icons/lu";

export type QuestionType = {
  color: string;
  icon: (props: IconBaseProps) => React.ReactNode;
  label: string
}

export type QuestionTypeMap = {
  multiple_choice: QuestionType;
  fill_in_the_blank: QuestionType;
  true_or_false: QuestionType;
  essay: QuestionType;
}

export const question_type_map: QuestionTypeMap = {
  multiple_choice: {
    icon: LuCircleCheck,
    color: "blue",
    label: "Multiple Choice",
  },
  true_or_false: {
    icon: LuCircle,
    color: "green",
    label: "True or False",
  },
  essay: {
    icon: LuPenTool,
    color: "violet",
    label: "Essay Question"
  },
  fill_in_the_blank: {
    icon: LuPencilLine,
    color: "orange",
    label: "Fill in the Blank"
  },
};
