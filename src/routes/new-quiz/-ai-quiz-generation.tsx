import * as React from "react";
import { JSX, useContext, useMemo } from "react";
import {
  LuArrowLeft,
  LuBrain,
  LuCircle,
  LuCircleCheck,
  LuCloudUpload,
  LuFile,
  LuPencilLine,
  LuPenTool,
  LuSettings,
  LuUpload,
  LuWand,
  LuX,
} from "react-icons/lu";
import { Badge, Group, Paper, Stack, Text, ThemeIcon } from "@mantine/core";
import { Dropzone, MS_POWERPOINT_MIME_TYPE, MS_WORD_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { useForm, UseFormReturn, useWatch } from "react-hook-form";
import { NewQuizContext } from "./-new-quiz-context.ts";
import { SelectForm } from "@/components/forms/-select-form.tsx";
import { NumberInputForm } from "@/components/forms/-number-input-form.tsx";
import { TextareaForm } from "@/components/forms/-text-area-form.tsx";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/lib/utils/axios_instance.ts"
import { base_url } from "@/lib/constants.ts";
import { handle_errors } from "../../lib/utils/handle_errors.ts";
import { DropzoneForm } from "../../components/forms/-dropzone-form.tsx";
import { notifications } from "@mantine/notifications";

const QuestionTypes: React.FC = ({ form, children, title, description, name }: {
  form: UseFormReturn,
  children: JSX.Element,
  title: string,
  description: string,
  name: string,
}): JSX.Element => {
  return (
    <div className="flex p-4 border border-gray-300/50 rounded-lg bg-gray-100/50">
      <div className="flex grow-1 gap-4">
        {children}
        <Stack gap={0}>
          <Text size="sm">{title}</Text>
          <Text size="sm" c="dimmed">{description}</Text>
        </Stack>
      </div>
      <NumberInputForm
        form={form}
        w={80}
        clampBehavior="strict"
        min={0}
        max={100}
        name={name} />
    </div>
  );
};

const TotalQuestionCounter: React.FC = ({ form }: { form: UseFormReturn }): JSX.Element => {
  const question_type_watcher = useWatch({
    control: form.control,
    name: "question_type",
  });

  const total = useMemo(() => {
    return Object.keys(question_type_watcher).map((item) => {
      return question_type_watcher[item];
    }).reduce((temp, num) => temp + num, 0);
  }, [question_type_watcher]);

  return (
    <div className="border border-blue-600/30 flex p-4 bg-blue-100/50 rounded-lg justify-between">
      <p className="text-sm">Total Questions</p>
      <Badge bdrs="xl">{total}</Badge>
    </div>
  );
};

const form_resolver = z.object({
  focus_areas: z.coerce.string().max(255),
  difficulty: z.enum(["easy", "moderate", "hard", "mixed"]),
  question_type: z.object({
    fill_in_the_blank: z.coerce.number(),
    essay_question: z.coerce.number(),
    true_or_false: z.coerce.number(),
    multiple_choice: z.coerce.number(),
  }),
});

export const AiQuizGeneration: React.FC = () => {
  const { program, course, selected, title, description, setStep } = useContext(NewQuizContext);
  const { isPending, mutate } = useMutation({
    mutationFn: async (variables) => {
      const response = await instance.post(`${base_url}/quizzes/`, variables, {
        headers: { "Content-Type": "application/json" }
      });
      return response.data;
    },
    mutationKey: ["ai_generate_quiz"],
    onError: ({ response }) =>  {
      handle_errors(response)
    }
  });

  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(form_resolver),
    defaultValues: {
      type: selected,
      title: title,
      description: description,
      course: course,
      program: program,
      difficulty: "mixed",
      attachments: [],
      question_type: {
        fill_in_the_blank: 0,
        essay_question: 0,
        true_or_false: 0,
        multiple_choice: 0,
      },
      focus_areas: "",
    },
  });

  const handleSubmit = () => {
    form.trigger().then(r => {
      if (!r) {
        console.log(form.formState.errors);
      } else {
        mutate(form.getValues(), {
          onSuccess: data => {
            console.log(data);
            notifications.show({
              title: "Your quiz is ready to view.",
              message: (
                <a href={`/quizzes/${data.id}/edit-quiz`} target="_blank" rel="noreferrer">{data.title}</a>
              )
            })
          }
        });
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div
            className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-2xl shadow-lg">
            <LuBrain className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-center text-3xl font-semibold">AI Quiz Generator</h1>
            <p className="text-center text-gray-600">Upload your educational materials and configure your quiz
              preferences for intelligent generation</p>
          </div>
        </div>

      </div>
      <Paper mt={28}>
        <Stack gap={4}>
          <Group>
            <ThemeIcon variant="light" color="violet" size={28} bdrs={10}>
              <LuUpload size={14} />
            </ThemeIcon>
            <p className="font-semibold">Upload Learning Materials</p>
          </Group>
          <p className="text-sm text-gray-600">Upload PDFs, Word documents, or text files or containing the content for
            your quiz generation</p>
          <DropzoneForm form={form} name="attachments"/>
        </Stack>
      </Paper>
      <Paper mt={28}>
        <Stack gap={4}>
          <Group>
            <ThemeIcon variant="light" color="violet" size={28} bdrs={10}>
              <LuSettings size={14} />
            </ThemeIcon>
            <p className="font-semibold">Quiz Configuration</p>
          </Group>
          <p className="text-gray-600 text-xs">Customize the structure, difficulty and focus areas for your generated
            quiz</p>
        </Stack>
        <p className="py-4 text-sm font-medium">Question Types & Quantities</p>
        <div className="space-y-4">
          <QuestionTypes
            form={form}
            title="Multiple Choice"
            description="Test knowledge with multiple questions"
            name="question_type.multiple_choice"
          >
            <ThemeIcon size={36} bdrs="md">
              <LuCircleCheck size={20} />
            </ThemeIcon>
          </QuestionTypes>
          <QuestionTypes
            form={form}
            title="True or False"
            description="Simple binary choice questions"
            name="question_type.true_or_false"
          >
            <ThemeIcon size={36} bdrs="md" color="green.9">
              <LuCircle size={20} />
            </ThemeIcon>
          </QuestionTypes>
          <QuestionTypes
            form={form}
            title="Essay Question"
            description="Open-ended written responses"
            name="question_type.essay_question"
          >
            <ThemeIcon size={36} bdrs="md" color="green.9">
              <LuPenTool size={20} />
            </ThemeIcon>
          </QuestionTypes>
          <QuestionTypes
            form={form}
            title="Fill in the Blank"
            description="Complete missing information"
            name="question_type.fill_in_the_blank"
          >
            <ThemeIcon size={36} bdrs="md" color="green.9">
              <LuPencilLine size={20} />
            </ThemeIcon>
          </QuestionTypes>
          <TotalQuestionCounter form={form} />
        </div>
        <div className="mt-8 space-y-4">
          <SelectForm
            form={form}
            name="difficulty"
            withAsterisk
            label="Difficulty Level"
            placeholder="Pick value"
            data={[
              { label: "Easy", value: "easy" },
              { label: "Moderate", value: "moderate" },
              { label: "Hard", value: "hard" },
              { label: "Mixed", value: "mixed" },
            ]}
            allowDeselect={false}
          />
          <TextareaForm
            form={form}
            name="focus_areas"
            label="Focus Areas (Optional)"
            rows={4}
            placeholder="Specificy particular topics, chapters or concepts to emphasize. For example: 'Focus on chapters 1-3, emphasize mathematical formulas, include historical context..."
          />
        </div>
      </Paper>
      <div className="block md:flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="order-2 cursor-pointer disabled:pointer-events-none hover:bg-purple-700 transition-all flex rounded-md bg-purple-600 disabled:bg-purple-300 mt-4 w-full p-3 text-white justify-center items-center gap-4">
          <LuWand />
          <span className="font-medium text-sm">Generate Professional Quiz</span></button>
        <button
          onClick={() => setStep(3)}
          type="button"
          className="order-1 flex hover:bg-gray-200/30 transition-all cursor-pointer rounded-md bg-white text-black border border-gray-500/30 text-black mt-4 w-full p-3 justify-center items-center gap-4">
          <LuArrowLeft />
          <span className="font-medium text-sm">Back to Setup</span></button>
      </div>
    </form>
  );
};
