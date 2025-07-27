type QuestionType = "multiple-choice" | "essay" | "true-false" | "fill-blank"

export interface Answer {
  id: string;
  answer: string;
  is_correct: boolean;
}

export interface EssayGradingConfig {
  enabled: boolean;
  context: string;
  gradingCriteria: string[];
  maxScore: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  answers: Answer[];
  points: number;
  essayGrading?: EssayGradingConfig;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  course: string;
  subject: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  status: "draft" | "published" | "archived";
  totalPoints: number;
  estimatedTime: number;
  attempts: number;
}
