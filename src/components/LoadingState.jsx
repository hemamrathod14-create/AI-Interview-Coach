export default function LoadingState({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 gap-3">
      <div className="h-8 w-8 rounded-full border-2 border-ink-200 dark:border-ink-700 border-t-brand-600 animate-spin" />
      <p className="text-sm text-ink-500 dark:text-ink-400">{label}</p>
    </div>
  );
}
