import { useState } from "react";
import { Menu, Search, Bell, Sun, Moon, Monitor, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { notifications } from "../data/mockData";

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  const cycleTheme = () => {
    setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
  };
  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-ink-200 dark:border-ink-800 bg-white/90 dark:bg-ink-950/90 backdrop-blur-md flex items-center gap-4 px-4 sm:px-6">
      <button className="lg:hidden text-ink-600 dark:text-ink-300" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={22} />
      </button>

      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          type="search"
          placeholder="Search interviews, skills…"
          className="w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-900 pl-9 pr-3 py-2 text-sm text-ink-800 dark:text-ink-100 placeholder:text-ink-400 focus-ring"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button onClick={cycleTheme} className="p-2 rounded-lg text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 focus-ring" aria-label="Toggle theme" title={`Theme: ${theme}`}>
          <ThemeIcon size={18} />
        </button>

        <div className="relative">
          <button
            onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false); }}
            className="relative p-2 rounded-lg text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 focus-ring"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unread > 0 && <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-500" />}
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 shadow-lg p-2 z-50">
              <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">Notifications</p>
              {notifications.map((n) => (
                <div key={n.id} className={`px-2 py-2.5 rounded-lg text-sm ${!n.read ? "bg-brand-50/60 dark:bg-brand-900/20" : ""}`}>
                  <p className="text-ink-800 dark:text-ink-100">{n.title}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false); }}
            className="flex items-center gap-2 rounded-lg pl-1 pr-2 py-1 hover:bg-ink-100 dark:hover:bg-ink-800 focus-ring"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 text-xs font-semibold">
              {user?.avatarInitials ?? "AS"}
            </span>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 shadow-lg p-2 z-50">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-ink-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-ink-500 dark:text-ink-400">{user?.email}</p>
              </div>
              <div className="h-px bg-ink-100 dark:bg-ink-800 my-1" />
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut size={15} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
