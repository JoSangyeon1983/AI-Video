interface CheckListItemProps {
  text: string;
  /** 체크 아이콘 색상 — green(기본), violet, blue */
  color?: "green" | "violet" | "blue" | "indigo";
}

/** 체크 아이콘 + 텍스트 리스트 항목 */
export default function CheckListItem({ text, color = "green" }: CheckListItemProps) {
  const colorMap: Record<string, string> = {
    green: "text-emerald-500",
    violet: "text-secondary-500",
    blue: "text-brand-500",
    indigo: "text-secondary-500",
  };
  const iconColor = colorMap[color] ?? "text-emerald-500";

  return (
    <li className="flex items-start gap-2">
      <svg
        className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      {text}
    </li>
  );
}
