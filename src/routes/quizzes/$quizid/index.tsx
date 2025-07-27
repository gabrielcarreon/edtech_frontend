import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quizzes/$quizid/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/quizzes/$quizid/"!</div>;
}
