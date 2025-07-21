import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Group,
  NumberInput,
  Paper,
  Select,
  Space,
  Stack,
  Text,
  Textarea,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { LuBookOpen, LuFileText } from "react-icons/lu";
import { MdOutlineEdit, MdOutlineStar } from "react-icons/md";
import * as React from "react";
import { useContext } from "react";
import { NewQuizContext } from "./-new-quiz-context.ts";

const CreateQuestion: React.FC = () => {
  return (
    <Stack gap={24}>
      <Flex
        direction={{ base: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        align={{ sm: "center" }}
      >
        <ThemeIcon size="xl">
          <LuBookOpen size={24} />
        </ThemeIcon>
        <Stack gap={0}>
          <Title order={4}>Quiz Information</Title>
          <Text size="sm" c="dimmed">Provide the essential details about your quiz to get started</Text>
        </Stack>
      </Flex>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
      >
        <Select
          flex={1}
          label="Question Type"
          placeholder="Pick question type"
          data={["Multiple Choice", "Essay", "True or False", "Computation"]}
          defaultValue="Multiple Choice"
          allowDeselect={false}
        />
        <NumberInput
          flex={1}
          label="Points Value"
          placeholder="1"
          hideControls />
      </Flex>
      <Textarea
        rows={7}
        label="Your Question"
        placeholder="What would you ask your students?"
      />
      <div className="border border-blue-500 p-6 rounded-md border-dashed bg-blue-100/30">
        <Text fw={600}>Essay Question</Text>
        <Text
          size="sm"
          c="dimmed">
          Perfect for creative thinking! Students can express their ideas freely. You&#39;ll review these manually.
        </Text>
        <Divider my="md" />
        <Button
          variant="gradient"
          gradient={{ from: "blue", to: "grape", deg: 90 }}
          fullWidth>
          Upgrade to Enable AI Grading
        </Button>
      </div>
      <Button fullWidth>Save Question</Button>
    </Stack>
  );
};

const Questions = () => {
  return (
    <Stack>
      <Group>
        <ThemeIcon>
          <MdOutlineStar />
        </ThemeIcon>
        <Title order={3}>Your Questions (1)</Title>
      </Group>
      <Question />
    </Stack>
  );
};

const Question = () => {
  return (
    <>
      <Card radius="md" shadow="none">
        <Stack gap={8}>
          <Group justify="space-between">
            <Group gap={8}>
              <Badge variant="outline">Essay Question</Badge>
              <Badge variant="filled">1 pt</Badge>
            </Group>
            <Group>
              <ActionIcon variant="white" aria-label="Settings">
                <LuBookOpen style={{ width: "70%", height: "70%" }} />
              </ActionIcon>
              <ActionIcon variant="white" aria-label="Settings">
                <LuBookOpen style={{ width: "70%", height: "70%" }} />
              </ActionIcon>
            </Group>
          </Group>
          <Text size="sm"><span>1. </span>Sample question</Text>
        </Stack>
      </Card>
    </>
  );
};

export const ManualQuizGeneration = () => {
  const { setStep } = useContext(NewQuizContext);
  return (
    <Container>
      <Stack gap={20}>
        <Title order={1}>Question Title</Title>
        <Group>
          <Badge size="lg" variant="light" color="blue">Badge</Badge>
          <Badge size="lg" leftSection={<LuFileText />}>0 questions</Badge>
        </Group>
        <Button leftSection={<MdOutlineEdit />} variant="outline" w="fit-content" onClick={() => setStep(1)}>Edit Quiz
          Info</Button>
      </Stack>
      <Space h="md" />
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
      >
        <Paper radius="md" p={24}>
          <CreateQuestion />
        </Paper>
        <Paper radius="md" p={24}>
          <Questions />
        </Paper>
      </Flex>
    </Container>

  );
};
