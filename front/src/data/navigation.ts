import type { NavItem } from "@/types";
import type { Translation } from "@/i18n/types";

/* ── GNB 네비게이션 ── */
export const navItems: NavItem[] = [
  { label: "Production", href: "/production" },
  { label: "Studio", href: "/studio" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Story", href: "/story" },
];

/** href → 번역된 라벨 맵 (Header, Footer 공용) */
export function getNavLabelMap(t: Translation): Record<string, string> {
  return {
    "/work": t.nav.work,
    "/production": t.nav.production,
    "/studio": t.nav.studio,
    "/insights": t.nav.insights,
    "/story": t.nav.story,
  };
}
