import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Mic,
  History,
  TrendingUp,
  Target,
  FileText,
  Settings,
  X,
} from "lucide-react";
import Logo from "./Logo";

const items = [
  { label: "Overview", to: "/dashboard", icon: LayoutGrid, end: true },
  { label: "Start Interview", to: "/dashboard/setup", icon: Mic },
  { label: "Interview History", to: "/dashboard/history", icon: History },
  { label: "Progress", to: "/dashboard/progress", icon: TrendingUp },
  { label: "Skills", to: "/dashboard/skills", icon: Target },
  { label: "Resume", to: "/dashboard/resume", icon: FileText },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-ink-950/50 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed z-50 lg:z-0 lg:static inset-y-0 left-0 w-64 shrink-0 border-r border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-950 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-ink-200 dark:border-ink-800">
          <Logo />
          <button className="lg:hidden text-ink-500" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {items.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-ring ${
                  isActive
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                    : "text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800/60"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-ink-200 dark:border-ink-800">
          <div className="rounded-xl bg-ink-50 dark:bg-ink-800/60 p-3.5">
            <p className="text-xs font-medium text-ink-800 dark:text-ink-100">Next interview is personalized</p>
            <p className="text-xs text-ink-500 dark:text-ink-400 mt-1">Built from your last 4 sessions.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
