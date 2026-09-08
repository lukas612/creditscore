import { WITME_PHASES, type WitmePhase } from "../data/witmeQuestions";

interface Props {
  current: WitmePhase;
  phases?: { key: WitmePhase; label: string }[];
}

export function WitmePhaseStepper({ current, phases = WITME_PHASES }: Props) {
  const currentIndex = phases.findIndex((p) => p.key === current);

  return (
    <ol className="phase-stepper">
      {phases.map((phase, i) => {
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
