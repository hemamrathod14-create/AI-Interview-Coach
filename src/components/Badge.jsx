const tones = {
  neutral: "bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-300",
  brand: "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  danger: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export default function Badge({ children, tone = "neutral", className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
