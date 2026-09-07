export type Stage = "quiz" | "loading" | "gate" | "unlocked" | "error";

export interface ScoreResult {
  quizSessionId: string;
  score: number;
  scoreBand: string;
  zipCode: string;
}
