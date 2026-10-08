export default function CircularProgress({ value, size = 128, strokeWidth = 10, label, sublabel, tone = "#4c46e0" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, value) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-ink-100 dark:stroke-ink-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tone}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 800ms ease-out" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-ink-900 dark:text-white">{label ?? `${value}%`}</span>
        {sublabel && <span className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
}
