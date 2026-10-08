import { ChevronDown } from "lucide-react";

export default function Dropdown({ label, value, onChange, options, placeholder = "Select…" }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">{label}</span>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3.5 py-2.5 pr-9 text-sm text-ink-900 dark:text-ink-100 focus-ring"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" />
      </div>
    </label>
  );
}
