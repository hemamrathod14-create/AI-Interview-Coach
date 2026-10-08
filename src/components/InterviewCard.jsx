import { useNavigate } from "react-router-dom";
import { ChevronRight, Clock } from "lucide-react";
import Badge from "./Badge";

function scoreTone(score) {
  if (score >= 75) return "success";
  if (score >= 60) return "brand";
  return "warning";
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function InterviewCard({ interview }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/dashboard/history/${interview.id}`)}
      className="w-full flex items-center gap-4 rounded-xl border border-ink-200 dark:border-ink-800 p-4 text-left transition-colors hover:bg-ink-50 dark:hover:bg-ink-800/60 focus-ring"
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-ink-900 dark:text-white truncate">{interview.title}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-ink-500 dark:text-ink-400">
          <span>{formatDate(interview.date)}</span>
          <span className="w-1 h-1 rounded-full bg-ink-300 dark:bg-ink-600" />
          <span className="inline-flex items-center gap-1"><Clock size={12} /> {interview.duration}</span>
        </div>
      </div>
      <Badge tone={scoreTone(interview.score)}>{interview.score}</Badge>
      <ChevronRight size={18} className="text-ink-400 shrink-0" />
    </button>
  );
}
