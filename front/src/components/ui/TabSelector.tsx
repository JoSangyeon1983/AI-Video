"use client";

/* ============================================
   공용 탭 선택 컴포넌트
   ─ ContactClient, ContactModal 등에서 재사용
   ============================================ */

interface TabOption<T extends string> {
  value: T;
  label: string;
}

interface TabSelectorProps<T extends string> {
  options: TabOption<T>[];
  selected: T;
  onChange: (value: T) => void;
  className?: string;
}

export default function TabSelector<T extends string>({
  options,
  selected,
  onChange,
  className = "",
}: TabSelectorProps<T>) {
  return (
    <div className={`flex rounded-lg border border-slate-200 p-1 dark:border-slate-700 ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
            selected === opt.value
              ? "bg-brand-600 text-white dark:bg-brand-500 dark:text-white"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
