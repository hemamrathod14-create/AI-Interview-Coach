import { Link } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  Target,
  BrainCircuit,
  MessageSquareText,
  Radar,
  LineChart,
  FileSearch,
  Upload,
  ListChecks,
  Mic,
  ClipboardCheck,
  Repeat,
  TrendingUp,
} from "lucide-react";
import LandingNavbar from "../components/LandingNavbar";
import Button from "../components/Button";
import Card from "../components/Card";
import CircularProgress from "../components/CircularProgress";
import ProgressBar from "../components/ProgressBar";
import Logo from "../components/Logo";

const features = [
  { icon: Target, title: "Personalized Interviews", desc: "Every session is built around the gaps found in your last one — never a generic question set." },
  { icon: BrainCircuit, title: "AI Answer Analysis", desc: "Each response is scored for accuracy, structure, and depth right after you answer." },
  { icon: MessageSquareText, title: "Communication Analysis", desc: "Get feedback on pacing, filler words, and clarity — not just what you said." },
  { icon: Radar, title: "Skill Gap Detection", desc: "AI Coach maps your strengths and weaknesses across technical and behavioral skills." },
  { icon: LineChart, title: "Progress Tracking", desc: "Watch each skill trend up over time with a clear before-and-after view." },
  { icon: FileSearch, title: "Resume-Based Questions", desc: "Questions are generated from your actual resume and the job description you're targeting." },
];

const steps = [
  { icon: Upload, title: "Upload your resume" },
  { icon: Target, title: "Choose your target role" },
  { icon: Mic, title: "Take an AI interview" },
  { icon: ClipboardCheck, title: "Receive detailed feedback" },
  { icon: Repeat, title: "Practice your weaknesses" },
  { icon: TrendingUp, title: "Track your improvement" },
];

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-ink-950">
      <LandingNavbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink-900 dark:text-white leading-[1.1]">
            Practice Smarter. Interview Better.
          </h1>
          <p className="mt-5 text-lg text-ink-600 dark:text-ink-300 max-w-xl">
            An AI-powered interview coach that understands your strengths, identifies your weaknesses, and creates personalized interviews to help you improve.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button as={Link} to="/signup" size="lg" iconRight={ArrowRight}>Start Free Interview</Button>
            <Button as="a" href="#how-it-works" variant="secondary" size="lg" icon={PlayCircle}>See How It Works</Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-brand-100/50 dark:bg-brand-900/20 -z-10 blur-2xl" />
          <Card className="shadow-xl shadow-ink-900/5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm text-ink-500 dark:text-ink-400">Good evening, Alex 👋</p>
                <p className="font-display font-semibold text-ink-900 dark:text-white">Interview Readiness</p>
              </div>
              <Logo className="opacity-60" />
            </div>
            <div className="flex items-center gap-6">
              <CircularProgress value={74} size={104} strokeWidth={9} />
              <div className="flex-1 space-y-3">
                <ProgressBar value={82} label="Technical" size="sm" tone="success" />
                <ProgressBar value={71} label="Communication" size="sm" tone="brand" />
                <ProgressBar value={64} label="Behavioral" size="sm" tone="warning" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-ink-100 dark:border-ink-900 bg-ink-50/60 dark:bg-ink-900/30">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
          <h2 className="font-display text-3xl font-bold text-ink-900 dark:text-white max-w-xl">
            Everything you need to walk in ready.
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="hover:border-brand-200 dark:hover:border-brand-800 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-ink-900 dark:text-white">{title}</h3>
                <p className="mt-1.5 text-sm text-ink-600 dark:text-ink-400">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <h2 className="font-display text-3xl font-bold text-ink-900 dark:text-white">How it works</h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, title }, i) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-900 dark:bg-white text-white dark:text-ink-900 text-sm font-semibold">
                {i + 1}
              </div>
              <div>
                <div className="flex items-center gap-2 text-ink-900 dark:text-white font-medium">
                  <Icon size={16} className="text-brand-600 dark:text-brand-400" /> {title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Personalization loop */}
      <section id="for-students" className="border-t border-ink-100 dark:border-ink-900 bg-ink-50/60 dark:bg-ink-900/30">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 text-center">
          <h2 className="font-display text-3xl font-bold text-ink-900 dark:text-white">
            Your next interview is based on your previous performance.
          </h2>
          <p className="mt-3 text-ink-600 dark:text-ink-400 max-w-2xl mx-auto">
            AI Coach doesn't just give you another mock interview. It learns where you struggle and creates the next interview specifically to help you improve.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-2">
            {["Interview 1", "Weakness Detection", "Personalized Practice", "Interview 2", "Improvement"].map((label, i, arr) => (
              <div key={label} className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-full border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 py-2 text-sm font-medium text-ink-800 dark:text-ink-100 shadow-sm">
                  {label}
                </div>
                {i < arr.length - 1 && <ArrowRight size={16} className="text-ink-300 dark:text-ink-600 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">
          Ready to become interview-ready?
        </h2>
        <div className="mt-8">
          <Button as={Link} to="/signup" size="lg" iconRight={ArrowRight}>Start Practicing</Button>
        </div>
      </section>

      <footer className="border-t border-ink-100 dark:border-ink-900">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo />
          <nav className="flex flex-wrap items-center gap-6 text-sm text-ink-500 dark:text-ink-400">
            <a href="#features" className="hover:text-ink-800 dark:hover:text-ink-200">Features</a>
            <a href="#how-it-works" className="hover:text-ink-800 dark:hover:text-ink-200">How It Works</a>
            <a href="#for-students" className="hover:text-ink-800 dark:hover:text-ink-200">For Students</a>
            <Link to="/login" className="hover:text-ink-800 dark:hover:text-ink-200">Sign In</Link>
          </nav>
          <p className="text-sm text-ink-400">© 2026 AI Coach</p>
        </div>
      </footer>
    </div>
  );
}
