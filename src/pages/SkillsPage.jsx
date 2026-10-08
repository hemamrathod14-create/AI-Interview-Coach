import { TrendingUp, Sparkles } from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { skillMatrix, recommendedPractice } from "../data/mockData";
import { useToast } from "../context/ToastContext";

function SkillRow({ skill, tone }) {
  const { showToast } = useToast();
  return (
    <div className="rounded-xl border border-ink-200 dark:border-ink-800 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-ink-900 dark:text-white">{skill.label}</p>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{skill.explanation}</p>
        </div>
        <Badge tone={tone}>{skill.score}%</Badge>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <TrendingUp size={13} /> {skill.trend}
        </span>
        <Button size="sm" variant="outlineBrand" onClick={() => showToast(`Starting a focused practice set for ${skill.label}.`, "info")}>
          Practice
        </Button>
      </div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Skills & Weaknesses</h1>
        <p className="text-ink-500 dark:text-ink-400 mt-1">Your next interview is built around what's below.</p>
      </div>

      <Card>
        <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-4">Strong</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillMatrix.strong.map((s) => (
            <SkillRow key={s.key} skill={s} tone="success" />
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-4">Needs Improvement</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillMatrix.needsImprovement.map((s) => (
            <SkillRow key={s.key} skill={s} tone="warning" />
          ))}
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-brand-600 to-brand-800 text-white border-0">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={18} />
          <h3 className="font-display font-semibold">AI Recommended Practice</h3>
        </div>
        <p className="text-sm text-brand-50/80 mb-4">Based on your last 5 interviews</p>
        <ol className="space-y-2.5">
          {recommendedPractice.map((r, i) => (
            <li key={r} className="flex items-start gap-3 text-sm">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">{i + 1}</span>
              {r}
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
