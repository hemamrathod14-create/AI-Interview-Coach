export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 dark:bg-ink-800">
          <Icon size={22} className="text-ink-500 dark:text-ink-400" />
        </div>
      )}
      <h3 className="font-display font-semibold text-ink-900 dark:text-white">{title}</h3>
      {description && <p className="mt-1 text-sm text-ink-500 dark:text-ink-400 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
