import * as React from "react";
import { JSX } from "react";
import { Card, ThemeIcon } from "@mantine/core";
import { LuChartBar } from "react-icons/lu";

export const QuizOverview: React.FC = ({ summary }): JSX.Element => {
  return (
    <Card className="bg-white border-0 shadow-lg">
      <div className="pb-4">
        <div className="flex items-center gap-3 text-lg font-bold text-gray-900">
          <ThemeIcon variant="light">
            <LuChartBar className="h-4 w-4" />
          </ThemeIcon>
          <p>Quiz Overview</p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">{summary.questions_length}</div>
            <div className="text-xs font-semibold text-blue-800">Questions</div>
          </div>
          <div className="text-center p-4 bg-violet-50 rounded-lg border border-violet-200">
            <div className="text-2xl font-bold text-violet-600 mb-1">{summary.points}</div>
            <div className="text-xs font-semibold text-violet-800">Total Points</div>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="text-2xl font-bold text-emerald-600 mb-1">[Time Limit]</div>
            <div className="text-xs font-semibold text-emerald-800">Minutes</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="text-2xl font-bold text-amber-600 mb-1">[Quiz Attempts]</div>
            <div className="text-xs font-semibold text-amber-800">Attempts</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
