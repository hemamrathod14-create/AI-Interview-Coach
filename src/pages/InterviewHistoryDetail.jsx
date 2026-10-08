import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import Card from "../components/Card";
import Button from "../components/Button";
import CircularProgress from "../components/CircularProgress";
import { interviews, interviewResult } from "../data/mockData";

export default function InterviewHistoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const interview = interviews.find((i) => i.id === id) ?? interviews[0];

  // Scale the shared breakdown template to roughly match this interview's overall score
  const scale = interview.score / interviewResult.overallScore;
  const breakdown = interviewResult.breakdown.map((b) => ({
    ...b,
    score: Math.max(30, Math.min(100, Math.round(b.score * scale))),
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate("/dashboard/history")} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-ink-200 focus-ring rounded">
        <ArrowLeft size={16} /> Back to history
      </button>

      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">{interview.title}</h1>
        <p className="text-ink-500 dark:text-ink-400 mt-1">
          {interview.type} · {interview.role} · {new Date(interview.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <Card className="flex flex-col items-center text-center">
        <CircularProgress value={interview.score} size={140} strokeWidth={11} />
        <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">{interview.questionsAnswered} questions answered in {interview.duration}</p>
      </Card>

      <Card>
        <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-4">Score Breakdown</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={breakdown} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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

      <div className="flex justify-center pb-6">
        <Button as={Link} to="/dashboard/setup">Practice This Again</Button>
      </div>
    </div>
  );
}
