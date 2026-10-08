export default function ProgressBar({ value, label, tone = "brand", size = "md" }) {
  const toneClasses = {
    brand: "bg-brand-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
  };
  const heights = { sm: "h-1.5", md: "h-2" };

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="text-ink-600 dark:text-ink-400">{label}</span>
          <span className="font-medium text-ink-800 dark:text-ink-100">{value}%</span>
        </div>
      )}
      <div className={`w-full ${heights[size]} rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden`}>
        <div
          className={`${heights[size]} rounded-full ${toneClasses[tone]} transition-all duration-700 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
