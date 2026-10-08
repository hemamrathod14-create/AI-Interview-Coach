export default function AudioWaveform({ active = false, bars = 24 }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-10">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full ${active ? "bg-brand-500 wave-bar" : "bg-ink-200 dark:bg-ink-700"}`}
          style={{
            height: active ? "100%" : "20%",
            animationDelay: `${(i % 6) * 0.12}s`,
            animationDuration: `${0.7 + (i % 4) * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
