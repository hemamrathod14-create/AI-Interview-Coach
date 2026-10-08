export default function Card({ children, className = "", padded = true, as: As = "div", ...props }) {
  return (
    <As
      className={`rounded-2xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900 ${padded ? "p-5 sm:p-6" : ""} ${className}`}
      {...props}
    >
      {children}
    </As>
  );
}
