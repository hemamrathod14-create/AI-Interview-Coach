import { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";

export default function FileUpload({ file, onFile, onRemove, accept = ".pdf" }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800/60 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 shrink-0">
          <FileText size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink-900 dark:text-white truncate">{file.name}</p>
          <p className="text-xs text-ink-500 dark:text-ink-400">{file.size}</p>
        </div>
        <button onClick={onRemove} className="text-ink-400 hover:text-red-500 focus-ring rounded-md p-1" aria-label="Remove file">
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files?.[0];
        if (f) onFile({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB` });
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors focus-ring ${
        dragOver ? "border-brand-400 bg-brand-50 dark:bg-brand-900/20" : "border-ink-200 dark:border-ink-700 hover:border-ink-300 dark:hover:border-ink-600"
      }`}
    >
      <Upload size={22} className="text-ink-400" />
      <p className="text-sm font-medium text-ink-800 dark:text-ink-100">Click to upload or drag and drop</p>
      <p className="text-xs text-ink-500 dark:text-ink-400">PDF, up to 10MB</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB` });
        }}
      />
    </div>
  );
}
