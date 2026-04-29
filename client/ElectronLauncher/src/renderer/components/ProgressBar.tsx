type ProgressBarProps = {
  label: string;
  percentage: number;
  className?: string;
};

export function ProgressBar({ label, percentage, className = 'progress-wrapper' }: ProgressBarProps) {
  return (
    <div className={className}>
      <div className={className === 'progress-wrapper' ? 'progress-label' : 'progress-text'}>{label}</div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
