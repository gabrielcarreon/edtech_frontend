export type File = {
  lastModified: number;
  name: string;
  path: string;
  relativePath: string;
  size: number;
  type: string;
  webkitRelativePath?: string
}

export type QuestionType = "multiple_choice" | "true_or_false" | "fill_in_the_blank" | "essay"
