import Link from "next/link";
import Button from "@/components/ui/Button";

/* ─────────────────────────────────────────────
   NotFound — Work / Insight 상세 404 표시
   ───────────────────────────────────────────── */

interface NotFoundProps {
  message: string;
  backLabel: string;
  backHref: string;
}

export function NotFound({ message, backLabel, backHref }: NotFoundProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">404</h1>
        <p className="mt-2 text-slate-500">{message}</p>
        <Link href={backHref} className="mt-4 inline-block text-sm font-semibold text-slate-400 hover:text-white">
          {backLabel}
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DetailCTA — 상세 페이지 하단 문의 유도 블록
   ───────────────────────────────────────────── */

interface DetailCTAProps {
  heading: string;
  href: string;
  label: string;
  variant?: "brand" | "secondary" | "white";
  /** 외부 래퍼 className (기본 "mt-14") */
  className?: string;
}

export function DetailCTA({ heading, href, label, variant = "brand", className = "mt-14" }: DetailCTAProps) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900 ${className}`}>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{heading}</h3>
      <Button as="a" href={href} variant={variant} className="mt-4">
        {label}
      </Button>
    </div>
  );
}
