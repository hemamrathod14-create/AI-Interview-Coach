import { Link } from "react-router-dom";

export default function Logo({ to = "/", className = "" }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2 font-display font-bold text-ink-900 dark:text-white ${className}`}>
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white text-sm">AC</span>
      <span className="text-[15px] tracking-tight">AI Coach</span>
    </Link>
  );
}
