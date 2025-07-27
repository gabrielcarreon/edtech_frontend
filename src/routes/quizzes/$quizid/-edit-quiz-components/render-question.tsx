import { JSX } from "react";
import { LuBrain, LuCircleCheck, LuCopy, LuPen, LuPenTool, LuTrash2 } from "react-icons/lu";
import * as React from "react";
import type { Question } from "./types.ts";
import { ActionIcon, Badge, ThemeIcon } from "@mantine/core";
import { QuestionIcon } from "@/components/question-type/question-icon.tsx";
import { question_type_map } from "@/components/question-type/types.tsx";

const RenderAnswer = ({ question }: { question: Question }) => {
  console.log(question);
  return (
    <>
      {question.type === "multiple_choice" && question.answers.length > 0 && (
        <div className="space-y-3 ml-8">
          {question.answers.map((answer, answerIndex) => (
            <div key={answer.id} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${answer.is_correct
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-600"}`}>
                {String.fromCharCode(65 + answerIndex)}
              </div>
              <span
                className={`text-sm ${
                  answer.is_correct ? "font-semibold text-emerald-700" : "text-gray-700"
                }`}
              >{answer.answer}</span>
              {answer.is_correct && <LuCircleCheck className="h-4 w-4 text-emerald-500" />}
            </div>
          ))}
        </div>
      )}
      {question.type === "true_or_false" && (
        <div className="ml-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-100 rounded-lg">
            <LuCircleCheck className="h-4 w-4 text-emerald-600" />
            <span className="font-semibold text-emerald-800 text-sm">
                Correct Answer: {question.answers.find((a) => a.is_correct)?.answer || "Not set"}
            </span>
          </div>
        </div>
      )}

      {question.type === "essay" && (
        <div className="ml-8 space-y-3">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-violet-100 rounded-lg">
            <LuPenTool className="h-4 w-4 text-violet-600" />
            <span className="font-semibold text-violet-800 text-sm">Essay Question</span>
          </div>
          <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
            <div className="flex items-center gap-2 mb-2">
              <LuBrain className="h-4 w-4 text-violet-600" />
              <span className="text-sm font-semibold text-violet-800">AI Grading Context</span>
            </div>
            <p className="text-xs text-violet-700 leading-relaxed">
              {question.answers[0].answer}
            </p>
            <div className="mt-2 text-xs text-violet-600">
              {/*Max Score: {question.essayGrading.maxScore} points*/}
            </div>
          </div>
        </div>
      )}

      {question.type === "fill_in_the_blank" && (
        <div className="ml-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-100 rounded-lg">
            <LuPen className="h-4 w-4 text-amber-600" />
            <span className="font-semibold text-amber-800 text-sm">Fill in the Blank</span>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            Expected answer: <span className="font-semibold">{question.answers[0].answer}</span>
          </div>
        </div>
      )}
    </>
  );
};

export const RenderQuestion = ({ question, index }: { question: Question, index: number }): JSX.Element => {
  return (
    <>
      <div key={question.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 rounded-md">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <ThemeIcon>
              <QuestionIcon question_type={question.type} className="h-6 w-6 text-white" />
            </ThemeIcon>
            <div className="flex items-center gap-3">
              <Badge variant="outline">{question_type_map[question.type].label}</Badge>
              <Badge color="orange">{question.points} pt{question.points !== 1 ? "s" : ""}</Badge>
              {question.essayGrading?.enabled && (
                <Badge
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold px-2 py-1 text-xs">
                  <LuBrain className="h-3 w-3 mr-1" />
                  AI Grading
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2 item-center">
            <ActionIcon
              size="md"
              variant="subtle">
              <LuPen className="h-4 w-4" />
            </ActionIcon>
            <ActionIcon
              size="md"
              variant="subtle"
              color="green">
              <LuCopy className="h-4 w-4" />
            </ActionIcon>
            <ActionIcon
              size="md"
              variant="subtle"
              color="red">
              <LuTrash2 className="h-4 w-4" />
            </ActionIcon>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-semibold text-gray-900 text-base leading-relaxed">
            <span className="text-blue-600 font-bold mr-2">{index + 1}.</span>
            <span >{question.question}</span>
          </p>
        </div>
      </div>
      <RenderAnswer question={question} />
    </>
  );
};
