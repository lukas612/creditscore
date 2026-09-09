interface Props {
  text: string;
}

export function LoadingSpinner({ text }: Props) {
  return (
    <div className="loading-state">
      <div className="loading-spinner" aria-hidden="true" />
      <p className="loading-text">{text}</p>
    </div>
  );
}
