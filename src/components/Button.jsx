import { forwardRef } from "react";
import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm shadow-brand-600/20",
  secondary:
    "bg-white text-ink-800 border border-ink-200 hover:bg-ink-50 dark:bg-ink-900 dark:text-ink-100 dark:border-ink-700 dark:hover:bg-ink-800",
  ghost:
    "bg-transparent text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800",
  danger:
    "bg-red-600 text-white hover:bg-red-700",
  outlineBrand:
    "bg-transparent text-brand-600 border border-brand-200 hover:bg-brand-50 dark:text-brand-300 dark:border-brand-800 dark:hover:bg-brand-900/30",
};

const sizes = {
  sm: "text-sm px-3 py-1.5 rounded-lg gap-1.5",
  md: "text-sm px-4 py-2.5 rounded-lg gap-2",
  lg: "text-base px-5 py-3 rounded-xl gap-2",
};

const Button = forwardRef(function Button(
  { as, to, variant = "primary", size = "md", className = "", children, icon: Icon, iconRight: IconRight, ...props },
  ref
) {
  const classes = `inline-flex items-center justify-center font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-ring ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} ref={ref} {...props}>
        {Icon && <Icon size={16} strokeWidth={2} />}
        {children}
        {IconRight && <IconRight size={16} strokeWidth={2} />}
      </Link>
    );
  }

  return (
    <button className={classes} ref={ref} {...props}>
      {Icon && <Icon size={16} strokeWidth={2} />}
      {children}
      {IconRight && <IconRight size={16} strokeWidth={2} />}
    </button>
  );
});

export default Button;
