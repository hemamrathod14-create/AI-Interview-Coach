import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Card from "../components/Card";
import Button from "../components/Button";
import CircularProgress from "../components/CircularProgress";
import ProgressBar from "../components/ProgressBar";
import InterviewCard from "../components/InterviewCard";
import ChartCard from "../components/ChartCard";
import Badge from "../components/Badge";
import { useAuth } from "../context/AuthContext";
import { readiness, skillScores, interviews, scoreHistory, weaknesses, aiInsight } from "../data/mockData";

export default function DashboardOverview() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">
          Good evening, {user?.name?.split(" ")[0] ?? "there"} 👋
        </h1>
        <p className="text-ink-500 dark:text-ink-400 mt-1">Here's how your interview preparation is progressing.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Readiness */}
        <Card className="lg:col-span-1 flex flex-col items-center justify-center text-center">
          <p className="text-sm font-medium text-ink-500 dark:text-ink-400 mb-4">Interview Readiness</p>
          <CircularProgress value={readiness.score} size={140} strokeWidth={11} />
          <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight size={15} /> {readiness.deltaLabel}
          </p>
          <Button as={Link} to="/dashboard/setup" className="mt-6 w-full" iconRight={ArrowRight}>
            Start New Interview
          </Button>
        </Card>

        {/* Skills */}
        <Card className="lg:col-span-2">
          <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-4">Skill Breakdown</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {skillScores.map((s) => (
              <ProgressBar
                key={s.key}
                label={s.label}
                value={s.score}
                tone={s.score >= 75 ? "success" : s.score >= 65 ? "brand" : "warning"}
              />
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Performance chart */}
        <div className="lg:col-span-2">
          <ChartCard title="Performance Over Time" subtitle="Score across your last 6 interviews">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreHistory.slice(-6)} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-ink-100 dark:stroke-ink-800" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    tick={{ fontSize: 12, fill: "#99a1ae" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#99a1ae" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #dde1e7", fontSize: 13 }}
                    labelFormatter={(d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  />
                  <Line type="monotone" dataKey="score" stroke="#4c46e0" strokeWidth={2.5} dot={{ r: 4, fill: "#4c46e0" }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* AI Insight */}
        <Card className="bg-gradient-to-br from-brand-600 to-brand-800 text-white border-0">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} />
            <h3 className="font-display font-semibold">AI Insight</h3>
          </div>
          <p className="text-sm text-brand-50/90 leading-relaxed">{aiInsight}</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent interviews */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-ink-900 dark:text-white">Recent Interviews</h3>
            <Link to="/dashboard/history" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {interviews.slice(0, 4).map((i) => (
              <InterviewCard key={i.id} interview={i} />
            ))}
          </div>
        </Card>

        {/* Weaknesses */}
        <Card>
          <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-1">Your Focus Areas</h3>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">Where your next interview will focus.</p>
          <div className="space-y-3">
            {weaknesses.map((w) => (
              <div key={w.key} className="flex items-center justify-between rounded-xl border border-ink-200 dark:border-ink-800 p-3.5">
                <div>
                  <p className="text-sm font-medium text-ink-900 dark:text-white">{w.title}</p>
                  <Badge tone={w.status === "strong" ? "success" : "warning"} className="mt-1.5">{w.statusLabel}</Badge>
                </div>
                <Link to="/dashboard/skills" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline whitespace-nowrap">
                  {w.status === "strong" ? "Keep practicing" : "Practice now"}
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
