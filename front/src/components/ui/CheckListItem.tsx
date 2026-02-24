import { IconCheck } from "@/components/ui/Icon";

interface CheckListItemProps {
  text: string;
  /** 체크 아이콘 색상 — green(기본), violet, blue */
  color?: "green" | "violet" | "blue";
}

const colorMap: Record<CheckListItemProps["color"] & string, string> = {
  green: "text-emerald-500",
  violet: "text-secondary-500",
  blue: "text-brand-500",
};

/** 체크 아이콘 + 텍스트 리스트 항목 */
export default function CheckListItem({ text, color = "green" }: CheckListItemProps) {
  return (
    <li className="flex items-start gap-2">
      <IconCheck className={`mt-0.5 h-5 w-5 shrink-0 ${colorMap[color]}`} />
      {text}
    </li>
  );
}
