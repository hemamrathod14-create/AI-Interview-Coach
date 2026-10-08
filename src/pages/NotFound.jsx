import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-ink-50 dark:bg-ink-950">
      <Compass size={40} className="text-ink-300 dark:text-ink-600 mb-4" />
      <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Page not found</h1>
      <p className="text-ink-500 dark:text-ink-400 mt-2 max-w-sm">The page you're looking for doesn't exist or has moved.</p>
      <Button as={Link} to="/" className="mt-6">Back to home</Button>
    </div>
  );
}
