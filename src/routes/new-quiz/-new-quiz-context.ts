import { createContext } from "react";

export const NewQuizContext = createContext(null);

export type CreationType = "ai" | "manual"
