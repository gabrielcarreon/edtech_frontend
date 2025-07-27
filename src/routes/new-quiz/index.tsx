import { createFileRoute } from "@tanstack/react-router";
import { JSX, useState } from "react";
import { CreationType, NewQuizContext } from "./-new-quiz-context.ts";
import { CreationMode } from "./-creation-mode.tsx";
import { ProgramSelection } from "./-program-selection.tsx";
import { useForm } from "react-hook-form";
import * as React from "react";
import { CourseSelection } from "./-course-selection.tsx";
import { QuizGeneration } from "./-quiz-generation.tsx";

export const Route = createFileRoute("/new-quiz/")({
  component: NewQuiz,
});

const step_map = {
  "1": <CreationMode />,
  "2": <ProgramSelection />,
  "3": <CourseSelection />,
  "4": <QuizGeneration />,
};

const NewQuiz: React.FC = (): JSX.Element => {
  const [step, setStep] = useState<number>(1);
  const [selected, setSelected] = useState<"manual" | "ai">("manual");
  const [course, setCourse] = useState<string>(null);
  const [program, setProgram] = useState<string>(null);
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const selectedType = (type: CreationType) => {
    return () => {
      setSelected(type);
    };
  };

  return (
    <NewQuizContext.Provider value={{
      step, setStep,
      selected, selectedType,
      course, setCourse,
      program, setProgram,
      title, setTitle,
      description, setDescription
    }}>
      {step_map[String(step)]}
    </NewQuizContext.Provider>
  );
};
