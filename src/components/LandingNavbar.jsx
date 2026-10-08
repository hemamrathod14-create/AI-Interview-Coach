import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";

const links = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Students", href: "#for-students" },
];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 dark:border-ink-800/70 bg-white/80 dark:bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 h-16">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button as={Link} to="/login" variant="ghost" size="sm">Sign In</Button>
          <Button as={Link} to="/signup" variant="primary" size="sm">Start Practicing</Button>
        </div>
        <button className="md:hidden text-ink-700 dark:text-ink-200" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-ink-200 dark:border-ink-800 px-5 py-4 flex flex-col gap-4 bg-white dark:bg-ink-950">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-ink-700 dark:text-ink-200">
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Button as={Link} to="/login" variant="secondary" size="sm" className="flex-1">Sign In</Button>
            <Button as={Link} to="/signup" variant="primary" size="sm" className="flex-1">Start Practicing</Button>
          </div>
        </div>
      )}
    </header>
  );
}
