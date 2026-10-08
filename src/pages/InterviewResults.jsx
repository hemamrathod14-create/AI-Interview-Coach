import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowRight, ChevronDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import Card from "../components/Card";
import Button from "../components/Button";
import CircularProgress from "../components/CircularProgress";
import Badge from "../components/Badge";
import { interviewResult } from "../data/mockData";

export default function InterviewResults() {
  const [expanded, setExpanded] = useState(interviewResult.questionResults[0]?.id);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Interview Complete 🎉</h1>
        <p className="text-ink-500 dark:text-ink-400 mt-1">Here's your performance breakdown.</p>
      </div>

      <Card className="flex flex-col items-center text-center">
        <CircularProgress value={interviewResult.overallScore} size={160} strokeWidth={12} label={`${interviewResult.overallScore}`} sublabel="out of 100" />
        <p className="mt-4 text-sm text-ink-500 dark:text-ink-400 max-w-md">{interviewResult.recommendation}</p>
        <Button className="mt-5" iconRight={ArrowRight} onClick={() => navigate("/dashboard/skills")}>
          Practice This Weakness
        </Button>
      </Card>

      <Card>
        <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-4">Score Breakdown</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={interviewResult.breakdown} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-ink-100 dark:stroke-ink-800" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#99a1ae" }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={60} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#99a1ae" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #dde1e7", fontSize: 13 }} />
              <Bar dataKey="score" fill="#4c46e0" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-5">
        <Card>
          <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-3">What you did well</h3>
          <ul className="space-y-2.5">
            {interviewResult.wentWell.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-300">
                <CheckCircle2 size={17} className="text-emerald-500 shrink-0 mt-0.5" /> {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-3">What to improve</h3>
          <ul className="space-y-2.5">
            {interviewResult.toImprove.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-300">
                <XCircle size={17} className="text-amber-500 shrink-0 mt-0.5" /> {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card padded={false}>
        <div className="p-5 sm:p-6 pb-0">
          <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-1">Question Results</h3>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-2">Tap a question to see detailed AI feedback.</p>
        </div>
        <div className="divide-y divide-ink-100 dark:divide-ink-800 mt-2">
          {interviewResult.questionResults.map((q, i) => {
            const open = expanded === q.id;
            return (
              <div key={q.id}>
                <button
                  onClick={() => setExpanded(open ? null : q.id)}
                  className="w-full flex items-center gap-4 px-5 sm:px-6 py-4 text-left hover:bg-ink-50 dark:hover:bg-ink-800/40 focus-ring"
                >
                  <span className="text-sm font-medium text-ink-400 w-16 shrink-0">Q{i + 1}</span>
                  <span className="flex-1 text-sm font-medium text-ink-900 dark:text-white truncate">{q.question}</span>
                  <Badge tone={q.score >= 75 ? "success" : "warning"}>{q.score}</Badge>
                  <ChevronDown size={16} className={`text-ink-400 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div className="px-5 sm:px-6 pb-5 pl-[5.5rem] space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-ink-500 dark:text-ink-400 mb-1.5">Strengths</p>
                      <ul className="space-y-1">
                        {q.strengths.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-ink-500 dark:text-ink-400 mb-1.5">Weaknesses</p>
                      <ul className="space-y-1">
                        {q.weaknesses.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300">
                            <XCircle size={14} className="text-amber-500 shrink-0 mt-0.5" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg bg-ink-50 dark:bg-ink-800/60 p-3 text-sm text-ink-600 dark:text-ink-300">
                      {q.feedback}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex justify-center pb-6">
        <Button variant="secondary" onClick={() => navigate("/dashboard/history")}>View Detailed Analysis</Button>
      </div>
    </div>
  );
}
