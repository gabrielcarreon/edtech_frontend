import { Button, Divider, Group, Image, SimpleGrid, Stack, Text, ThemeIcon } from "@mantine/core";
import { LuArrowLeft, LuArrowRight, LuBook } from "react-icons/lu";
import * as React from "react";
import { useContext } from "react";
import { NewQuizContext } from "./-new-quiz-context.ts";
import { useWatch } from "react-hook-form";
import { cn } from "../../lib/utils/cn.ts";

type CoursesType = {
  title: string;
}

const courses: CoursesType[] = [
  { title: "Real Estate" },
  { title: "Customs" },
];

export const ProgramSelection = () => {
  const { setStep, form, program, setProgram } = useContext(NewQuizContext);

  return (
    <Stack>
      <div className="mx-auto flex flex-col items-center gap-6">
        <ThemeIcon bdrs="lg" size={70}>
          <LuBook size={36} />
        </ThemeIcon>
        <div>
          <h1 className="text-center text-3xl font-semibold">Select Course</h1>
          <p className="text-center text-gray-600">Choose your course that best matches your quiz category</p>
        </div>
      </div>
      <SimpleGrid cols={{ xs: 2, md: 3, lg: 4 }}>
        {courses.map((course, index) => (
          <div
            onClick={() => setProgram(course.title)}
            className={cn("border-2 border-gray-300/50 shadow duration-300 p-4 rounded-md space-y-2 hover:shadow-lg cursor-pointer transition-all",
              program === course.title ? "border-blue-600 bg-blue-100/50" : "")}
            key={index}>
            <Image h={150} src="https://picsum.photos/200/300" />
            <Text fw={600}>{course.title}</Text>
          </div>
        ))}
      </SimpleGrid>
      <Divider py={20} />
      <Group grow>
        <Button
          onClick={() => setStep(1)}
          leftSection={<LuArrowLeft />}
          variant="outline"
          color="black"
          bd="1px solid gray"
          h={50}
        >Back to Mode Selection</Button>
        <Button
          onClick={() => setStep(3)}
          rightSection={<LuArrowRight />}
          variant="gradient"
          gradient={{ from: "blue", to: "violet", deg: 90 }}
          color="black"
          h={50}
        >Continue to Quiz Setup</Button>
      </Group>
    </Stack>
  );
};
