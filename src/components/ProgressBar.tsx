interface Props {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="progress-track" aria-label={`Paso ${current} de ${total}`}>
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
