import { Badge, Button, Flex, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import {
  LuBook,
  LuBrain,
  LuCircleCheckBig,
  LuCreativeCommons,
  LuPencilLine,
  LuSettings,
  LuUpload,
  LuZap,
} from "react-icons/lu";
import * as React from "react";
import { JSX, useContext } from "react";
import { cn } from "@/lib/utils/cn.ts";
import type { IconBaseProps } from "react-icons";
import { CreationType, NewQuizContext } from "./-new-quiz-context.ts";

type Perks = {
  icon: (props: IconBaseProps) => React.ReactNode
  text: string;
}

const manual_creation_perks: Perks[] = [
  { icon: LuCreativeCommons, text: "Complete creative control" },
  { icon: LuSettings, text: "Custom question formats" },
  { icon: LuCircleCheckBig, text: "Perfect for specialized content" },
];

const ai_creation_perks: Perks[] = [
  { icon: LuZap, text: "Generate in seconds" },
  { icon: LuUpload, text: "Support for PDFs, docs, text and powerpoint" },
  { icon: LuBrain, text: "Intelligent question variety" },
];

interface CreationCardOptionProps {
  perks: Perks[];
  config: {
    selected: boolean;
    selected_color: string;
    type: CreationType
  };
  children: JSX.Element;
}

const CreationCardOption: React.FC<CreationCardOptionProps> = ({ perks, config, children }): JSX.Element => {
  const { selectedType } = useContext(NewQuizContext);
  return (
    <div
      onClick={selectedType(config.type)}
      className={cn("w-full rounded-lg grow p-10 h-full md:space-y-4 shadow-md transition-all cursor-pointer hover:shadow-xl duration-500", config.selected
        ? config.selected_color
        : "border-2 border-gray-300/50")}
    >
      {children}
      <div className="space-y-4">
        {perks.map((perk, index) => (
          <div key={index} className="flex bg-white rounded-lg p-4 items-center gap-2 shadow-xs">
            <ThemeIcon variant="light">
              <perk.icon className="text-blue-600" />
            </ThemeIcon>
            <Text size="sm">{perk.text}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CreationMode = () => {
  const { selected, setStep } = useContext(NewQuizContext);
  return (
    <Stack>
      <div className="mx-auto flex flex-col items-center gap-6">
        <ThemeIcon bdrs="lg" size={70}>
          <LuBook size={36} />
        </ThemeIcon>
        <div>
          <h1 className="text-center text-3xl font-semibold">Create Professional Quizzes</h1>
          <p className="text-center text-gray-600">Choose your preferred method to build engaging assessments
            for your students</p>
        </div>
      </div>
      <div className="md:flex block w-full space-y-8 md:gap-8">
        <CreationCardOption
          perks={manual_creation_perks}
          config={{
            selected: selected === "manual",
            selected_color: "bg-blue-100/50 border-2 border-blue-600",
            type: "manual",
          }}
        >
          <Flex direction="column" align="center" gap={12}>
            <ThemeIcon size={50} bdrs="md">
              <LuPencilLine size={24} />
            </ThemeIcon>
            <h4 className="text-lg font-bold flex items-center gap-2">Manual Creation</h4>
            <Text c="dimmed" size="sm">Build your quiz question by question with creative control and
              customization.</Text>
          </Flex>
        </CreationCardOption>
        <CreationCardOption
          perks={ai_creation_perks}
          config={{
            selected: selected === "ai",
            selected_color: "bg-purple-100/50 border-2 border-purple-600",
            type: "ai",
          }}
        >
          <Flex direction="column" align="center" gap={12}>
            <ThemeIcon size={50} bdrs="md" bg="purple">
              <LuBrain size={24} />
            </ThemeIcon>
            <h4 className="text-lg font-bold flex items-center gap-2">AI Generation
              <Badge bg="purple">Professional</Badge>
            </h4>
            <Text c="dimmed" size="sm">Upload your materials and let advanced AI create comprehensive quizzes
              instantly.</Text>
          </Flex>
        </CreationCardOption>
      </div>
      <Button
        onClick={() => setStep(2)}
        mt={20}
        fullWidth
        variant="gradient"
        gradient={{ from: "blue", to: "violet", deg: 90 }}
      >Continue with {selected === "ai" ? "AI Creation" : "Manual Creation"}
      </Button>
    </Stack>
  );
};
