import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
}

/** 공용 섹션 래퍼 — max-w-7xl + 좌우 패딩 */
export default function SectionContainer({
  children,
  className = "",
  as: Tag = "section",
}: SectionContainerProps) {
  return (
    <Tag className={className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </Tag>
  );
}
