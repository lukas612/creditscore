import { useState } from "react";
import type { Answers } from "./data/questions";
import { supabase } from "./lib/supabase";
import { Header } from "./components/Header";
import { Landing } from "./components/Landing";
import { Quiz } from "./components/Quiz";
import { ResultGate } from "./components/ResultGate";
import { ResultFull } from "./components/ResultFull";

type Stage = "landing" | "quiz" | "loading" | "gate" | "unlocked" | "error";

interface ScoreResult {
  quizSessionId: string;
  score: number;
  scoreBand: string;
  zipCode: string;
}

export default function App() {
  const [stage, setStage] = useState<Stage>("landing");
  const [result, setResult] = useState<ScoreResult | null>(null);

  const handleQuizComplete = async (answers: Answers) => {
    setStage("loading");

    const params = new URLSearchParams(window.location.search);

    const { data: quizSessionId, error: sessionError } = await supabase.rpc(
      "create_quiz_session",
      {
        p_answers: answers,
        p_utm_source: params.get("utm_source"),
        p_click_id: params.get("click_id") ?? params.get("clickid"),
      },
    );

    if (sessionError || !quizSessionId) {
      setStage("error");
      return;
    }

    const { data: scored, error: scoreError } = await supabase
      .rpc("calculate_score", { p_answers: answers })
      .single<{ score: number; score_band: string }>();

    if (scoreError || !scored) {
      setStage("error");
      return;
    }

    setResult({
      quizSessionId,
      score: scored.score,
      scoreBand: scored.score_band,
      zipCode: String(answers.codigo_postal ?? ""),
    });
    setStage("gate");
  };

  if (stage === "landing") {
    return (
      <>
        <Header />
        <Landing onStart={() => setStage("quiz")} />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="app-shell">
        {stage === "quiz" && <Quiz onComplete={handleQuizComplete} />}

        {stage === "loading" && <p className="loading-text">Calculando tu puntuación…</p>}

        {stage === "gate" && result && (
          <ResultGate
            quizSessionId={result.quizSessionId}
            score={result.score}
            scoreBand={result.scoreBand}
            zipCode={result.zipCode}
            onUnlock={() => setStage("unlocked")}
          />
        )}

        {stage === "unlocked" && result && (
          <ResultFull score={result.score} scoreBand={result.scoreBand} />
        )}

        {stage === "error" && (
          <p className="loading-text">
            Ha ocurrido un error al calcular tu puntuación. Recarga la página e inténtalo
            de nuevo.
          </p>
        )}
      </main>
    </>
  );
}
