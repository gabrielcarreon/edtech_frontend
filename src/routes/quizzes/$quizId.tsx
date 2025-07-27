import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Loader } from "@mantine/core";
import { instance } from "@/lib/utils/axios_instance.ts";
import { base_url } from "@/lib/constants.ts";

export const Route = createFileRoute("/quizzes/$quizId")({
  component: Quiz,
});


const Quiz: React.FC = () => {
  const { quizId } = Route.useParams();
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: [`quiz_${quizId}`],
    queryFn: () => {
      return instance.get(`${base_url}/quizzes/${quizId}/`);
    },
    refetchOnMount: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  if (error && !isFetching) {
    return (
      <>Failed to load</>
    );
  }

  return (
    <Suspense fallback={<Loader color="blue" />}>
    </Suspense>
  );
};
