import { PHASES, type Phase } from "../data/questions";

interface Props {
  current: Phase;
}

export function PhaseStepper({ current }: Props) {
  const currentIndex = PHASES.findIndex((p) => p.key === current);

  return (
    <ol className="phase-stepper">
      {PHASES.map((phase, i) => {
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
