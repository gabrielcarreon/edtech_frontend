import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/quizzes/")({
  component: Quizzes,
});

const Quizzes: React.FC = () => {
  return <div></div>
}
