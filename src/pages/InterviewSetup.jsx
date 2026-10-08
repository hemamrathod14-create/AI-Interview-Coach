import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Users, GitBranch, Shuffle, ArrowRight, Sparkles } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import FileUpload from "../components/FileUpload";
import Badge from "../components/Badge";
import { interviewTypes, targetRoles, difficulties, durations, detectedSkillsFromJD, resumeData } from "../data/mockData";
import { useToast } from "../context/ToastContext";

const typeIcons = { technical: Code2, behavioral: Users, dsa: GitBranch, mixed: Shuffle };

export default function InterviewSetup() {
  const [type, setType] = useState("technical");
  const [role, setRole] = useState(targetRoles[0]);
  const [difficulty, setDifficulty] = useState("Medium");
  const [duration, setDuration] = useState("20 min");
  const [resume, setResume] = useState({ name: resumeData.fileName, size: "412 KB" });
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const showDetectedSkills = jobDescription.trim().length > 20;
  const detected = useMemo(() => detectedSkillsFromJD, []);

  function handleStart() {
    showToast("Building your personalized interview…", "info");
    navigate("/dashboard/interview/live");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Create Your Interview</h1>
        <p className="text-ink-500 dark:text-ink-400 mt-1">Configured around your last session's weak spots.</p>
      </div>

      <Card>
        <p className="text-sm font-semibold text-ink-800 dark:text-ink-100 mb-3">1. Interview Type</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {interviewTypes.map((t) => {
            const Icon = typeIcons[t.key];
            const active = type === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                className={`text-left rounded-xl border p-4 transition-colors focus-ring ${
                  active ? "border-brand-400 bg-brand-50 dark:bg-brand-900/20 dark:border-brand-700" : "border-ink-200 dark:border-ink-800 hover:border-ink-300 dark:hover:border-ink-700"
                }`}
              >
                <Icon size={18} className={active ? "text-brand-600 dark:text-brand-300" : "text-ink-400"} />
                <p className="mt-2 text-sm font-medium text-ink-900 dark:text-white">{t.label}</p>
                <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">{t.description}</p>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <p className="text-sm font-semibold text-ink-800 dark:text-ink-100 mb-3">2. Target Role</p>
        <Dropdown value={role} onChange={setRole} options={targetRoles} />
      </Card>

      <Card>
        <p className="text-sm font-semibold text-ink-800 dark:text-ink-100 mb-3">3. Difficulty</p>
        <div className="flex gap-3">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors focus-ring ${
                difficulty === d ? "border-brand-400 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:border-brand-700 dark:text-brand-300" : "border-ink-200 dark:border-ink-800 text-ink-600 dark:text-ink-300 hover:border-ink-300 dark:hover:border-ink-700"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <p className="text-sm font-semibold text-ink-800 dark:text-ink-100 mb-3">4. Interview Duration</p>
        <div className="flex gap-3">
          {durations.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors focus-ring ${
                duration === d ? "border-brand-400 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:border-brand-700 dark:text-brand-300" : "border-ink-200 dark:border-ink-800 text-ink-600 dark:text-ink-300 hover:border-ink-300 dark:hover:border-ink-700"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <p className="text-sm font-semibold text-ink-800 dark:text-ink-100 mb-3">5. Resume</p>
        <FileUpload
          file={resume}
          onFile={setResume}
          onRemove={() => setResume(null)}
        />
      </Card>

      <Card>
        <p className="text-sm font-semibold text-ink-800 dark:text-ink-100 mb-3">6. Job Description</p>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={5}
          placeholder="Paste the job description here…"
          className="w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 p-4 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus-ring resize-none"
        />
        {showDetectedSkills && (
          <div className="mt-4 rounded-xl bg-ink-50 dark:bg-ink-800/60 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-500 dark:text-ink-400 mb-2">
              <Sparkles size={13} /> Detected skills
            </p>
            <div className="flex flex-wrap gap-2">
              {detected.map((s) => (
                <Badge key={s} tone="brand">{s}</Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-end pb-4">
        <Button size="lg" iconRight={ArrowRight} onClick={handleStart}>Start Interview</Button>
      </div>
    </div>
  );
}
