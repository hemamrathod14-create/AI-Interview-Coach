import ProgressBar from "./ProgressBar";

function toneFor(score) {
  if (score >= 75) return "success";
  if (score >= 60) return "brand";
  return "warning";
}

export default function SkillCard({ label, score }) {
  return (
    <div className="rounded-xl border border-ink-200 dark:border-ink-800 p-4">
      <ProgressBar value={score} label={label} tone={toneFor(score)} />
    </div>
  );
}
