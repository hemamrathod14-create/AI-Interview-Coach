import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { targetRoles } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const experienceLevels = ["Student / New Grad", "0-2 years", "2-4 years", "5+ years"];

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "", experience: "" });
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  function handleSubmit(e) {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters.";
    if (form.confirm !== form.password) next.confirm = "Passwords do not match.";
    if (!form.role) next.role = "Choose a target role.";
    if (!form.experience) next.experience = "Choose your experience level.";
    setErrors(next);
    if (Object.keys(next).length) return;

    signup();
    showToast("Account created — let's get started.");
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 dark:bg-ink-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8"><Logo /></div>
        <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 p-7 shadow-sm">
          <h1 className="font-display text-xl font-bold text-ink-900 dark:text-white">Create your account</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Start with a free personalized interview.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">Full name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                  placeholder="Alex Sharma"
                  className={`w-full rounded-lg border bg-white dark:bg-ink-900 pl-9 pr-3 py-2.5 text-sm text-ink-900 dark:text-ink-100 focus-ring ${errors.name ? "border-red-400" : "border-ink-200 dark:border-ink-700"}`}
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border bg-white dark:bg-ink-900 pl-9 pr-3 py-2.5 text-sm text-ink-900 dark:text-ink-100 focus-ring ${errors.email ? "border-red-400" : "border-ink-200 dark:border-ink-700"}`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => set("password")(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full rounded-lg border bg-white dark:bg-ink-900 pl-9 pr-3 py-2.5 text-sm text-ink-900 dark:text-ink-100 focus-ring ${errors.password ? "border-red-400" : "border-ink-200 dark:border-ink-700"}`}
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">Confirm</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => set("confirm")(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full rounded-lg border bg-white dark:bg-ink-900 pl-9 pr-3 py-2.5 text-sm text-ink-900 dark:text-ink-100 focus-ring ${errors.confirm ? "border-red-400" : "border-ink-200 dark:border-ink-700"}`}
                  />
                </div>
                {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>}
              </div>
            </div>

            <Dropdown label="Target role" value={form.role} onChange={set("role")} options={targetRoles} />
            {errors.role && <p className="-mt-2 text-xs text-red-500">{errors.role}</p>}

            <Dropdown label="Experience level" value={form.experience} onChange={set("experience")} options={experienceLevels} />
            {errors.experience && <p className="-mt-2 text-xs text-red-500">{errors.experience}</p>}

            <Button type="submit" className="w-full" size="md">Create account</Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
            Already have an account? <Link to="/login" className="font-medium text-brand-600 dark:text-brand-400 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
