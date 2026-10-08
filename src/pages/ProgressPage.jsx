import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import Card from "../components/Card";
import ChartCard from "../components/ChartCard";
import ProgressBar from "../components/ProgressBar";
import { scoreHistory, firstInterviewSkills, skillScores } from "../data/mockData";

const tabs = ["Overall", "Technical", "Communication", "Problem Solving", "Behavioral"];
const tabKeyMap = {
  Overall: null,
  Technical: "technical",
  Communication: "communication",
  "Problem Solving": "problemSolving",
  Behavioral: "behavioral",
};

const biggestImprovement = { label: "Communication", delta: "+19%" };

export default function ProgressPage() {
  const [tab, setTab] = useState("Overall");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Your Progress</h1>
        <p className="text-ink-500 dark:text-ink-400 mt-1 inline-flex items-center gap-1.5">
          <ArrowUpRight size={16} className="text-emerald-500" />
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">+18% this month</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-ring ${
              tab === t ? "bg-brand-600 text-white" : "bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:border-ink-300 dark:hover:border-ink-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ChartCard title={`${tab} Trend`} subtitle="Across all completed interviews">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-ink-100 dark:stroke-ink-800" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                tick={{ fontSize: 12, fill: "#99a1ae" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#99a1ae" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #dde1e7", fontSize: 13 }} />
              <Line type="monotone" dataKey="score" stroke="#4c46e0" strokeWidth={2.5} dot={{ r: 4, fill: "#4c46e0" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-4">First Interview</h3>
          <div className="space-y-3.5">
            {firstInterviewSkills.map((s) => (
              <ProgressBar key={s.key} label={s.label} value={s.score} tone="warning" />
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-4">Latest Interview</h3>
          <div className="space-y-3.5">
            {skillScores.map((s) => (
              <ProgressBar key={s.key} label={s.label} value={s.score} tone="success" />
            ))}
          </div>
        </Card>
      </div>

      <Card className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-ink-500 dark:text-ink-400">Your biggest improvement</p>
          <p className="font-display text-lg font-semibold text-ink-900 dark:text-white">{biggestImprovement.label}</p>
        </div>
        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{biggestImprovement.delta}</span>
      </Card>
    </div>
  );
}
