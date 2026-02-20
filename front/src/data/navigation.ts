import type { NavItem, FooterLinkGroup } from "@/types";

/* ── GNB 네비게이션 ── */
export const navItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Service", href: "/service" },
  { label: "Solution", href: "/solution" },
  { label: "Insights", href: "/insights" },
  { label: "Story", href: "/story" },
];

/* ── 푸터 링크 ── */
export const footerLinks: FooterLinkGroup = {
  서비스: [
    { label: "Work", href: "/work" },
    { label: "Service", href: "/service" },
    { label: "Solution", href: "/solution" },
  ],
  회사: [
    { label: "Story", href: "/story" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  정책: [
    { label: "이용약관", href: "#" },
    { label: "개인정보처리방침", href: "#" },
  ],
};
