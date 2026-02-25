"use client";

interface FilterGroupProps {
  label: string;
  options: readonly string[];
  selected: string;
  onChange: (value: string) => void;
}

/** 필터 선택 그룹 — Work/Insights 등에서 재사용 */
export default function FilterGroup({ label, options, selected, onChange }: FilterGroupProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</span>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selected === opt
                ? "bg-white text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
