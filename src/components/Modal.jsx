import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg text-ink-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 focus-ring rounded-md p-1">
            <X size={18} />
          </button>
        </div>
        <div className="text-sm text-ink-600 dark:text-ink-300">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
