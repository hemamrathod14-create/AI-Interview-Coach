import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Globe } from "lucide-react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;

    login();
    showToast("Welcome back!");
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 dark:bg-ink-950 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8"><Logo /></div>
        <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 p-7 shadow-sm">
          <h1 className="font-display text-xl font-bold text-ink-900 dark:text-white">Sign in to AI Coach</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Pick up where you left off.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border bg-white dark:bg-ink-900 pl-9 pr-3 py-2.5 text-sm text-ink-900 dark:text-ink-100 focus-ring ${errors.email ? "border-red-400" : "border-ink-200 dark:border-ink-700"}`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-ink-700 dark:text-ink-300">Password</label>
                <Link to="#" className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full rounded-lg border bg-white dark:bg-ink-900 pl-9 pr-3 py-2.5 text-sm text-ink-900 dark:text-ink-100 focus-ring ${errors.password ? "border-red-400" : "border-ink-200 dark:border-ink-700"}`}
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <label className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-ink-300 text-brand-600 focus-ring" />
              Remember me
            </label>

            <Button type="submit" className="w-full" size="md">Sign in</Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-ink-100 dark:bg-ink-800" />
            <span className="text-xs text-ink-400">or</span>
            <div className="h-px flex-1 bg-ink-100 dark:bg-ink-800" />
          </div>

          <Button
            variant="secondary"
            className="w-full"
            icon={Globe}
            onClick={() => { login(); showToast("Signed in with Google"); navigate("/dashboard"); }}
          >
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
            New here? <Link to="/signup" className="font-medium text-brand-600 dark:text-brand-400 hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
