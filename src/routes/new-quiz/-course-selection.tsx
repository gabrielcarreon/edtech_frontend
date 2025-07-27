import { LuArrowLeft, LuArrowRight, LuBookOpen, LuHeart } from "react-icons/lu";
import { Button, Card, Flex, Group, Select, Text, Textarea, TextInput, Title } from "@mantine/core";
import * as React from "react";
import { JSX, useContext } from "react";
import { NewQuizContext } from "./-new-quiz-context.ts";

const subjects = [
  { value: "Introduction to Real Estate" },
  { value: "Real Estate Economics" },
  { value: "Real Estate Law" },
  { value: "Property Management" },
  { value: "Urban and Regional Planning" },
  { value: "Real Estate Finance" },
  { value: "Real Estate Marketing" },
  { value: "Appraisal and Valuation" },
  { value: "Real Estate Brokerage" },
  { value: "Land Use and Zoning" },
  { value: "Building Construction Basics" },
  { value: "Real Estate Investment Analysis" },
  { value: "Ethics and Professional Responsibility" },
  { value: "Taxation in Real Estate" },
  { value: "Environmental Issues in Real Estate" },
  { value: "Legal Aspects of Property Ownership" },
  { value: "Housing Policy and Development" },
  { value: "Project Development and Management" },
  { value: "Property and Asset Valuation" },
  { value: "Site Analysis and Feasibility Study" },
];

export const CourseSelection: React.FC = (): JSX.Element => {
  const { setStep, selected, setCourse, course, title, setTitle, setDescription } = useContext(NewQuizContext);
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
          <LuBookOpen className="h-10 w-10 text-white" />
        </div>
        <div>
          <h1 className="text-center text-3xl font-semibold">Quiz Information</h1>
          <p className="text-center text-gray-600">Provide the essential details about your quiz to get started</p>
        </div>
      </div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section className="p-8 space-y-4">
          <div>
            <p className="text-lg flex items-center justify-center gap-2 font-bold">
              Basic Quiz Details
            </p>
            <p className="text-gray-600 text-sm text-center">Enter the fundamental information that will help identify and organize our quiz</p>
          </div>
          <div>
            <Select
              onChange={setCourse}
              withAsterisk
              label="Subject"
              placeholder="Select subject"
              data={subjects}
            />
          </div>
          <TextInput
            onChange={e => setTitle(e.target.value)}
            withAsterisk
            mt="md"
            label="Quiz title"
            placeholder="Real estate laws..."
          />
          <Textarea
            rows={5}
            onChange={e => setDescription(e.target.value)}
            label="Description"
            description="Add short description here or instructions."
          />
          <div className="block space-y-2 md:flex md:gap-4">
            <div className="order-2 md:order-1 w-full">
              <Button
                variant="outline"
                color="black"
                bd="1px solid gray"
                onClick={() => setStep(2)}
                fullWidth
                leftSection={<LuArrowLeft/>}
              >Back to Course Selection</Button>
            </div>
            <div className="order-1 md:order-2 w-full">
              {selected === "ai" ? (
                <Button
                  disabled={!title || title === "" || !course || course === ""}
                  fullWidth
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'violet', deg: 90 }}
                  rightSection={<LuArrowRight/>}
                  onClick={() => setStep(4)}
                >Configure AI Generation</Button>
              ) : (
                <Button
                  onClick={() => setStep(2)}
                  size="sm"
                  fullWidth
                >Let&#39;s Add Some Questions</Button>
              )}
            </div>

          </div>
        </Card.Section>
      </Card>
    </div>
  );
};
