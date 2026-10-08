import { useState } from "react";
import { Sparkles, Briefcase, GraduationCap, FolderGit2 } from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import FileUpload from "../components/FileUpload";
import LoadingState from "../components/LoadingState";
import { resumeData } from "../data/mockData";
import { useToast } from "../context/ToastContext";

export default function ResumePage() {
  const [file, setFile] = useState({ name: resumeData.fileName, size: "412 KB" });
  const [analyzing, setAnalyzing] = useState(false);
  const { showToast } = useToast();

  function handleAnalyze() {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      showToast("Resume analyzed — your interviews are now personalized to it.");
    }, 1400);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Resume</h1>
        <p className="text-ink-500 dark:text-ink-400 mt-1">Your resume is being used to personalize your interview questions.</p>
      </div>

      <Card>
        <p className="text-sm font-semibold text-ink-800 dark:text-ink-100 mb-3">Current resume</p>
        <FileUpload file={file} onFile={setFile} onRemove={() => setFile(null)} />
        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-ink-400">Uploaded {resumeData.uploadedOn}</p>
          <Button size="sm" icon={Sparkles} onClick={handleAnalyze} disabled={!file || analyzing}>
            {analyzing ? "Analyzing…" : "Re-analyze Resume"}
          </Button>
        </div>
      </Card>

      {analyzing ? (
        <Card><LoadingState label="Analyzing your resume…" /></Card>
      ) : (
        <>
          <Card>
            <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-3">Extracted Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((s) => (
                <Badge key={s} tone="brand">{s}</Badge>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-4 flex items-center gap-2">
              <Briefcase size={18} className="text-ink-400" /> Experience
            </h3>
            <div className="space-y-4">
              {resumeData.experience.map((e) => (
                <div key={e.role} className="border-l-2 border-brand-200 dark:border-brand-800 pl-4">
                  <p className="font-medium text-ink-900 dark:text-white">{e.role} · {e.company}</p>
                  <p className="text-xs text-ink-400">{e.period}</p>
                  <p className="text-sm text-ink-600 dark:text-ink-300 mt-1">{e.summary}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-4 flex items-center gap-2">
              <FolderGit2 size={18} className="text-ink-400" /> Projects
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {resumeData.projects.map((p) => (
                <div key={p.name} className="rounded-xl border border-ink-200 dark:border-ink-800 p-4">
                  <p className="font-medium text-ink-900 dark:text-white">{p.name}</p>
                  <p className="text-sm text-ink-600 dark:text-ink-300 mt-1">{p.summary}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-display font-semibold text-ink-900 dark:text-white mb-4 flex items-center gap-2">
              <GraduationCap size={18} className="text-ink-400" /> Education
            </h3>
            {resumeData.education.map((e) => (
              <div key={e.degree}>
                <p className="font-medium text-ink-900 dark:text-white">{e.degree}</p>
                <p className="text-sm text-ink-500 dark:text-ink-400">{e.institution} · {e.period}</p>
              </div>
            ))}
          </Card>
        </>
      )}
    </div>
  );
}
