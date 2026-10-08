import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext(null);

const icons = { success: CheckCircle2, info: Info, warning: AlertTriangle };
const toneClasses = {
  success: "text-emerald-600 dark:text-emerald-400",
  info: "text-brand-600 dark:text-brand-400",
  warning: "text-amber-600 dark:text-amber-400",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, tone = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const dismiss = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-[calc(100%-2.5rem)] max-w-sm">
        {toasts.map((t) => {
          const Icon = icons[t.tone];
          return (
            <div key={t.id} className="flex items-start gap-3 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg p-4 animate-[fadeIn_0.2s_ease-out]">
              <Icon size={18} className={`shrink-0 mt-0.5 ${toneClasses[t.tone]}`} />
              <p className="flex-1 text-sm text-ink-800 dark:text-ink-100">{t.message}</p>
              <button onClick={() => dismiss(t.id)} className="text-ink-400 hover:text-ink-700 dark:hover:text-ink-200">
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
