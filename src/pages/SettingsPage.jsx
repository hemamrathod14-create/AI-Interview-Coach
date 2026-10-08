import { useState } from "react";
import { Sun, Moon, Monitor, Mic, Camera, Volume2 } from "lucide-react";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { targetRoles, difficulties, durations, interviewTypes } from "../data/mockData";

const experienceLevels = ["Student / New Grad", "0-2 years", "2-4 years", "5+ years"];

function Section({ title, description, children }) {
  return (
    <Card>
      <h3 className="font-display font-semibold text-ink-900 dark:text-white">{title}</h3>
      {description && <p className="text-sm text-ink-500 dark:text-ink-400 mt-1 mb-4">{description}</p>}
      {!description && <div className="mb-4" />}
      <div className="space-y-4">{children}</div>
    </Card>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState(user?.targetRole ?? targetRoles[0]);
  const [experience, setExperience] = useState("2-4 years");

  const [defaultDifficulty, setDefaultDifficulty] = useState("Medium");
  const [defaultDuration, setDefaultDuration] = useState("20 min");
  const [defaultType, setDefaultType] = useState("Technical");

  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyWeekly, setNotifyWeekly] = useState(true);

  function save(section) {
    showToast(`${section} saved.`);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Settings</h1>
        <p className="text-ink-500 dark:text-ink-400 mt-1">Manage your profile and interview preferences.</p>
      </div>

      <Section title="Profile">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3.5 py-2.5 text-sm text-ink-900 dark:text-ink-100 focus-ring" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">Email</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3.5 py-2.5 text-sm text-ink-900 dark:text-ink-100 focus-ring" />
          </label>
          <Dropdown label="Target role" value={role} onChange={setRole} options={targetRoles} />
          <Dropdown label="Experience level" value={experience} onChange={setExperience} options={experienceLevels} />
        </div>
        <div className="flex justify-end"><Button size="sm" onClick={() => save("Profile")}>Save changes</Button></div>
      </Section>

      <Section title="Interview Preferences">
        <div className="grid sm:grid-cols-3 gap-4">
          <Dropdown label="Default type" value={defaultType} onChange={setDefaultType} options={interviewTypes.map((t) => t.label)} />
          <Dropdown label="Default difficulty" value={defaultDifficulty} onChange={setDefaultDifficulty} options={difficulties} />
          <Dropdown label="Default duration" value={defaultDuration} onChange={setDefaultDuration} options={durations} />
        </div>
        <div className="flex justify-end"><Button size="sm" onClick={() => save("Interview preferences")}>Save changes</Button></div>
      </Section>

      <Section title="Audio & Video">
        <div className="grid sm:grid-cols-3 gap-4">
          <Dropdown label="Camera" value="Built-in Camera" onChange={() => {}} options={["Built-in Camera", "External Webcam"]} />
          <Dropdown label="Microphone" value="Built-in Microphone" onChange={() => {}} options={["Built-in Microphone", "External Mic"]} />
          <Dropdown label="Speaker" value="System Default" onChange={() => {}} options={["System Default", "Headphones"]} />
        </div>
        <div className="flex gap-6 text-xs text-ink-400 pt-1">
          <span className="inline-flex items-center gap-1"><Camera size={13} /> Camera ready</span>
          <span className="inline-flex items-center gap-1"><Mic size={13} /> Mic ready</span>
          <span className="inline-flex items-center gap-1"><Volume2 size={13} /> Speaker ready</span>
        </div>
      </Section>

      <Section title="Appearance">
        <div className="flex gap-3">
          {[
            { key: "light", label: "Light", icon: Sun },
            { key: "dark", label: "Dark", icon: Moon },
            { key: "system", label: "System", icon: Monitor },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`flex-1 flex flex-col items-center gap-2 rounded-xl border py-4 text-sm font-medium transition-colors focus-ring ${
                theme === key ? "border-brand-400 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:border-brand-700 dark:text-brand-300" : "border-ink-200 dark:border-ink-800 text-ink-600 dark:text-ink-300 hover:border-ink-300 dark:hover:border-ink-700"
              }`}
            >
              <Icon size={18} /> {label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Notifications">
        <label className="flex items-center justify-between">
          <span className="text-sm text-ink-700 dark:text-ink-300">Email me after each interview</span>
          <input type="checkbox" checked={notifyEmail} onChange={(e) => setNotifyEmail(e.target.checked)} className="h-5 w-9 appearance-none rounded-full bg-ink-200 dark:bg-ink-700 checked:bg-brand-600 relative transition-colors before:content-[''] before:absolute before:h-4 before:w-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-transform cursor-pointer" />
        </label>
        <label className="flex items-center justify-between">
          <span className="text-sm text-ink-700 dark:text-ink-300">Weekly progress summary</span>
          <input type="checkbox" checked={notifyWeekly} onChange={(e) => setNotifyWeekly(e.target.checked)} className="h-5 w-9 appearance-none rounded-full bg-ink-200 dark:bg-ink-700 checked:bg-brand-600 relative transition-colors before:content-[''] before:absolute before:h-4 before:w-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-transform cursor-pointer" />
        </label>
        <div className="flex justify-end"><Button size="sm" onClick={() => save("Notification preferences")}>Save changes</Button></div>
      </Section>
    </div>
  );
}
