import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";
import { interviews } from "../data/mockData";

function scoreTone(score) {
  if (score >= 75) return "success";
  if (score >= 60) return "brand";
  return "warning";
}

export default function InterviewHistory() {
  const [type, setType] = useState("");
  const [role, setRole] = useState("");
  const [sort, setSort] = useState("Newest first");
  const navigate = useNavigate();

  const types = useMemo(() => [...new Set(interviews.map((i) => i.type))], []);
  const roles = useMemo(() => [...new Set(interviews.map((i) => i.role))], []);

  const filtered = useMemo(() => {
    let list = interviews.filter((i) => (!type || i.type === type) && (!role || i.role === role));
    if (sort === "Newest first") list = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "Oldest first") list = [...list].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sort === "Highest score") list = [...list].sort((a, b) => b.score - a.score);
    if (sort === "Lowest score") list = [...list].sort((a, b) => a.score - b.score);
    return list;
  }, [type, role, sort]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Interview History</h1>
        <p className="text-ink-500 dark:text-ink-400 mt-1">Every session, with results you can revisit anytime.</p>
      </div>

      <Card>
        <div className="grid sm:grid-cols-3 gap-4">
          <Dropdown label="Interview type" value={type} onChange={setType} options={types} placeholder="All types" />
          <Dropdown label="Role" value={role} onChange={setRole} options={roles} placeholder="All roles" />
          <Dropdown label="Sort by" value={sort} onChange={setSort} options={["Newest first", "Oldest first", "Highest score", "Lowest score"]} />
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState icon={SearchX} title="No interviews match those filters" description="Try clearing a filter to see more results." />
        </Card>
      ) : (
        <Card padded={false} className="overflow-hidden">
          <div className="hidden sm:grid grid-cols-[1.5fr_1fr_1fr_0.6fr_0.6fr_auto] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-400 border-b border-ink-100 dark:border-ink-800">
            <span>Interview</span>
            <span>Type</span>
            <span>Date</span>
            <span>Score</span>
            <span>Duration</span>
            <span></span>
          </div>
          <div className="divide-y divide-ink-100 dark:divide-ink-800">
            {filtered.map((i) => (
              <button
                key={i.id}
                onClick={() => navigate(`/dashboard/history/${i.id}`)}
                className="w-full grid grid-cols-2 sm:grid-cols-[1.5fr_1fr_1fr_0.6fr_0.6fr_auto] gap-2 sm:gap-4 items-center px-5 py-4 text-left hover:bg-ink-50 dark:hover:bg-ink-800/40 focus-ring"
              >
                <span className="font-medium text-ink-900 dark:text-white col-span-2 sm:col-span-1">{i.title}</span>
                <span className="text-sm text-ink-500 dark:text-ink-400">{i.type}</span>
                <span className="text-sm text-ink-500 dark:text-ink-400">
                  {new Date(i.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <Badge tone={scoreTone(i.score)}>{i.score}</Badge>
                <span className="text-sm text-ink-500 dark:text-ink-400">{i.duration}</span>
                <span className="text-sm font-medium text-brand-600 dark:text-brand-400 hidden sm:block">View Results</span>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
