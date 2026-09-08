import { WITME_PHASES, type WitmePhase } from "../data/witmeQuestions";

interface Props {
  current: WitmePhase;
}

export function WitmePhaseStepper({ current }: Props) {
  const currentIndex = WITME_PHASES.findIndex((p) => p.key === current);

  return (
    <ol className="phase-stepper">
      {WITME_PHASES.map((phase, i) => {
        const state = i < currentIndex ? "done" : i === currentIndex ? "active" : "todo";
        return (
          <li key={phase.key} className={`phase-step phase-step-${state}`}>
            <span className="phase-dot">{state === "done" ? "✓" : i + 1}</span>
            <span className="phase-label">{phase.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
