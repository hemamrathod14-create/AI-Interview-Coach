import { Sparkles } from "lucide-react";

export default function AIAvatar({ speaking = false, size = 56 }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {speaking && (
        <span className="absolute inset-0 rounded-2xl bg-brand-400/30 animate-ping" />
      )}
      <div
        className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm"
        style={{ width: size, height: size }}
      >
        <Sparkles size={size * 0.45} strokeWidth={1.75} />
      </div>
    </div>
  );
}
