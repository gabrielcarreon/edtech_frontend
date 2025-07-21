import * as React from "react";
import { JSX, useContext } from "react";
import { NewQuizContext } from "./-new-quiz-context.ts";
import { AiQuizGeneration } from "./-ai-quiz-generation.tsx";
import { ManualQuizGeneration } from "./-manual-quiz-generation.tsx";

export const QuizGeneration: React.FC = (): JSX.Element => {
  const { selected } = useContext(NewQuizContext)
  return selected === "ai" ? <AiQuizGeneration/> : <ManualQuizGeneration/>
}
