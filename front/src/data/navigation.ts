import type { NavItem } from "@/types";
import type { Translation } from "@/i18n/types";

/* ── GNB 네비게이션 ── */
export const navItems: NavItem[] = [
  { label: "Service", href: "/service" },
  { label: "Solution", href: "/solution" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Story", href: "/story" },
];

/** href → 번역된 라벨 맵 (Header, Footer 공용) */
export function getNavLabelMap(t: Translation): Record<string, string> {
  return {
    "/work": t.nav.work,
    "/service": t.nav.service,
    "/solution": t.nav.solution,
    "/insights": t.nav.insights,
    "/story": t.nav.story,
  };
}
