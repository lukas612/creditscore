export type Stage = "quiz" | "loading" | "gate" | "unlocked" | "error";

export interface BreakdownItem {
  key: string;
  label: string;
  points: number;
}

export interface ScoreResult {
  quizSessionId: string;
  score: number;
  scoreBand: string;
  zipCode: string;
  breakdown: BreakdownItem[];
  capacidadMensual: number;
  capacidadMaxima: number;
}
