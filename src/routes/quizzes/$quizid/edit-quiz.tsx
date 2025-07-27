import { createFileRoute } from "@tanstack/react-router";
import { JSX, Suspense, useMemo, useState } from "react";
import { ActionIcon, Badge, Button, Card, Divider, Loader, ThemeIcon } from "@mantine/core";
import {
  LuArrowLeft, LuAward, LuBookOpen, LuBrain,
  LuCalendar, LuChartBar, LuCircle, LuCircleCheck,
  LuClock,
  LuCopy,
  LuDownload,
  LuEye, LuFileText, LuGlobe, LuGraduationCap, LuPen, LuPenTool, LuPlus, LuSchool,
  LuSettings,
  LuShare2, LuTarget, LuTrash2,
  LuUsers,
} from "react-icons/lu";
import * as React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { instance } from "@/lib/utils/axios_instance.ts";
import { base_url } from "@/lib/constants.ts";
import { QuizOverview } from "./-edit-quiz-components/quiz-overview.tsx";
import { RenderQuestion } from "./-edit-quiz-components/render-question.tsx";

export const Route = createFileRoute("/quizzes/$quizid/edit-quiz")({
  component: EditQuiz,
});


const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "draft":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "archived":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};



const EditQuiz = () => {
  const { quizid } = Route.useParams({ from: "/quizzes/$quizid/edit-quiz" });

  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: [`quiz_${quizid}`],
    queryFn: () => {
      return instance.get(`${base_url}/quizzes/${quizid}/`);
    },
    refetchOnMount: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  if (error && !isFetching) {
    return null;
  }

  const quiz_info: Quiz = data.data;

  const quiz_summary = useMemo(() => {
    let points = 0;
    quiz_info.questions.forEach(question => {
      points += Number(question.points);
    });
    return {
      questions_length: quiz_info.questions.length,
      points: points,
    };
  }, [isFetching]);


  return (
    <Suspense fallback={<Loader />}>
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ActionIcon variant="subtle" color="black">
                <LuArrowLeft className="h-4 w-4" />
              </ActionIcon>
              <div className="flex items-center gap-3">
                <Badge color="blue.9">
                  [Course Info]
                </Badge>
                <Badge color="green.9">
                  [Subject]
                </Badge>
                <Badge color="blue.9" variant="light">
                  [Status]
                </Badge>
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                {quiz_info.title}
              </h1>
              <p className="text-gray-600 max-w-3xl leading-relaxed text-sm md:text-base">{quiz_info.description}</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <LuCalendar className="h-4 w-4" />
                <span>Created [Created At]</span>
              </div>
              <div className="flex items-center gap-2">
                <LuClock className="h-4 w-4" />
                <span>Updated [Updated At]</span>
              </div>
              <div className="flex items-center gap-2">
                <LuUsers className="h-4 w-4" />
                <span>[Quiz Attempts] attempts</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button fw={400} variant="outline" size="sm">
              <LuEye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button fw={400} variant="outline" size="sm">
              <LuCopy className="h-4 w-4 mr-2" />
              Duplicate
            </Button>
            <Button fw={400} variant="outline" size="sm">
              <LuShare2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button fw={400} variant="outline" size="sm">
              <LuDownload className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button fw={400} size="sm">
              <LuSettings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8">
          <div className="xl:col-span-3 space-y-6">
            <QuizOverview summary={quiz_summary}/>
            <Card className="bg-white border-0 shadow-lg">
              <div className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-lg font-bold text-gray-900">
                    <ThemeIcon variant="light">
                      <LuFileText className="h-4 w-4" />
                    </ThemeIcon>
                    Questions ({quiz_info.questions.length})
                  </div>
                  <Button leftSection={<LuPlus className="h-4 w-4" />} size="sm" fw={400}>
                    Add Question
                  </Button>
                </div>
              </div>
              <div className="space-y-6">
                {quiz_info.questions.map((question, index) => {
                  return (
                    <RenderQuestion index={index} key={index} question={question}/>
                  );
                })}
              </div>
            </Card>
          </div>

          {/*<div className="space-y-6">*/}
          {/*  <Card className="bg-white border-0 shadow-lg">*/}
          {/*    <div className="pb-4">*/}
          {/*      <div className="flex items-center gap-2 text-base font-bold text-gray-900">*/}
          {/*        <div className="w-5 h-5 bg-emerald-100 rounded-lg flex items-center justify-center">*/}
          {/*          <LuTarget className="h-3 w-3 text-emerald-600" />*/}
          {/*        </div>*/}
          {/*        Question Types*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="space-y-3">*/}
          {/*      {questionTypes.map((type) => {*/}
          {/*        const count = quiz.questions.filter((q) => q.type === type.value).length;*/}
          {/*        if (count === 0) return null;*/}
          {/*        return (*/}
          {/*          <div*/}
          {/*            key={type.value}*/}
          {/*            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"*/}
          {/*          >*/}
          {/*            <div className="flex items-center gap-3">*/}
          {/*              <div className={`w-6 h-6 ${type.color} rounded-lg flex items-center justify-center`}>*/}
          {/*                <type.icon className="h-3 w-3 text-white" />*/}
          {/*              </div>*/}
          {/*              <span className="font-semibold text-gray-900 text-xs">{type.label}</span>*/}
          {/*            </div>*/}
          {/*            <Badge className="bg-white border-2 border-gray-300 text-gray-700 font-bold px-2 py-1 text-xs">*/}
          {/*              {count}*/}
          {/*            </Badge>*/}
          {/*          </div>*/}
          {/*        );*/}
          {/*      })}*/}
          {/*    </div>*/}
          {/*  </Card>*/}

          {/*  /!* Quick Actions *!/*/}
          {/*  <Card className="bg-white border-0 shadow-lg">*/}
          {/*    <div className="pb-4">*/}
          {/*      <div className="text-base font-bold text-gray-900">Quick Actions</div>*/}
          {/*    </div>*/}
          {/*    <div className="space-y-3">*/}
          {/*      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">*/}
          {/*        <LuPlus className="h-4 w-4 mr-2" />*/}
          {/*        Add Question*/}
          {/*      </Button>*/}
          {/*      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">*/}
          {/*        <LuEye className="h-4 w-4 mr-2" />*/}
          {/*        Preview Quiz*/}
          {/*      </Button>*/}
          {/*      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">*/}
          {/*        <LuChartBar className="h-4 w-4 mr-2" />*/}
          {/*        View Analytics*/}
          {/*      </Button>*/}
          {/*      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">*/}
          {/*        <LuSettings className="h-4 w-4 mr-2" />*/}
          {/*        Quiz Settings*/}
          {/*      </Button>*/}
          {/*      <Divider />*/}
          {/*      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">*/}
          {/*        <LuCopy className="h-4 w-4 mr-2" />*/}
          {/*        Duplicate Quiz*/}
          {/*      </Button>*/}
          {/*      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">*/}
          {/*        <LuDownload className="h-4 w-4 mr-2" />*/}
          {/*        Export Quiz*/}
          {/*      </Button>*/}
          {/*    </div>*/}
          {/*  </Card>*/}

          {/*  /!*<Card className="bg-white border-0 shadow-lg">*!/*/}
          {/*  /!*  <div className="pb-4">*!/*/}
          {/*  /!*    <div className="text-base font-bold text-gray-900">Status & Visibility</div>*!/*/}
          {/*  /!*  </div>*!/*/}
          {/*  /!*  <div className="space-y-4">*!/*/}
          {/*  /!*    <div className="space-y-2">*!/*/}
          {/*  /!*      <label className="text-sm font-semibold text-gray-700">Current Status</label>*!/*/}
          {/*  /!*      /!*<Select*!/*!/*/}
          {/*  /!*      /!*  value={quiz.status}*!/*!/*/}
          {/*  /!*      /!*  onValueChange={(value: "draft" | "published" | "archived") =>*!/*!/*/}
          {/*  /!*      /!*    setQuiz((prev) => ({ ...prev, status: value, updatedAt: new Date().toISOString() }))*!/*!/*/}
          {/*  /!*      /!*  }*!/*!/*/}
          {/*  /!*      /!*>*!/*!/*/}
          {/*  /!*      /!*  <SelectTrigger className="w-full">*!/*!/*/}
          {/*  /!*      /!*    <SelectValue />*!/*!/*/}
          {/*  /!*      /!*  </SelectTrigger>*!/*!/*/}
          {/*  /!*      /!*  <SelectContent>*!/*!/*/}
          {/*  /!*      /!*    <SelectItem value="draft">*!/*!/*/}
          {/*  /!*      /!*      <div className="flex items-center gap-2">*!/*!/*/}
          {/*  /!*      /!*        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>*!/*!/*/}
          {/*  /!*      /!*        Draft*!/*!/*/}
          {/*  /!*      /!*      </div>*!/*!/*/}
          {/*  /!*      /!*    </SelectItem>*!/*!/*/}
          {/*  /!*      /!*    <SelectItem value="published">*!/*!/*/}
          {/*  /!*      /!*      <div className="flex items-center gap-2">*!/*!/*/}
          {/*  /!*      /!*        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>*!/*!/*/}
          {/*  /!*      /!*        Published*!/*!/*/}
          {/*  /!*      /!*      </div>*!/*!/*/}
          {/*  /!*      /!*    </SelectItem>*!/*!/*/}
          {/*  /!*      /!*    <SelectItem value="archived">*!/*!/*/}
          {/*  /!*      /!*      <div className="flex items-center gap-2">*!/*!/*/}
          {/*  /!*      /!*        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>*!/*!/*/}
          {/*  /!*      /!*        Archived*!/*!/*/}
          {/*  /!*      /!*      </div>*!/*!/*/}
          {/*  /!*      /!*    </SelectItem>*!/*!/*/}
          {/*  /!*      /!*  </SelectContent>*!/*!/*/}
          {/*  /!*      /!*</Select>*!/*!/*/}
          {/*  /!*    </div>*!/*/}

          {/*  /!*    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">*!/*/}
          {/*  /!*      <div className="flex items-center gap-2 mb-1">*!/*/}
          {/*  /!*        <LuGlobe className="h-4 w-4 text-blue-600" />*!/*/}
          {/*  /!*        <span className="text-sm font-semibold text-blue-800">Visibility</span>*!/*/}
          {/*  /!*      </div>*!/*/}
          {/*  /!*      <p className="text-xs text-blue-700">*!/*/}
          {/*  /!*        {quiz.status === "published" ? "Visible to students" : "Hidden from students"}*!/*/}
          {/*  /!*      </p>*!/*/}
          {/*  /!*    </div>*!/*/}
          {/*  /!*  </div>*!/*/}
          {/*  /!*</Card>*!/*/}
          {/*</div>*/}
        </div>
      </div>

      {/*<EditQuestionDialog*/}
      {/*  question={editingQuestion}*/}
      {/*  isOpen={showEditDialog}*/}
      {/*  onClose={() => {*/}
      {/*    setShowEditDialog(false);*/}
      {/*    setEditingQuestion(null);*/}
      {/*  }}*/}
      {/*  onSave={handleSaveQuestion}*/}
      {/*/>*/}
    </Suspense>
  );
};
