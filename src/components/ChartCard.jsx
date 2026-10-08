import Card from "./Card";

export default function ChartCard({ title, subtitle, action, children }) {
  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-ink-900 dark:text-white">{title}</h3>
          {subtitle && <p className="text-sm text-ink-500 dark:text-ink-400 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </Card>
  );
}
