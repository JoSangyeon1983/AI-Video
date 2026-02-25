import { type ReactNode, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

/* ============================================
   공용 버튼 컴포넌트
   ─ brand / secondary / outline 버전을 단일 API로 관리
   ============================================ */

type Variant = "brand" | "secondary" | "outline" | "white";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  /** 전체 너비 (모바일 등) */
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: "button";
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: "a";
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/* ── 스타일 맵 ── */
const variantStyles: Record<Variant, string> = {
  brand:
    "bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500 dark:text-white dark:hover:bg-brand-600",
  secondary:
    "bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-500 dark:text-white dark:hover:bg-secondary-600",
  outline:
    "border-2 border-slate-600 text-white hover:border-slate-400 hover:bg-white/5",
  white:
    "bg-white text-slate-900 hover:bg-slate-200",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-sm",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "brand",
    size = "lg",
    fullWidth = false,
    children,
    className = "",
    ...rest
  } = props;

  const base =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";
  const classes = [
    base,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (props.as === "a") {
    const { as: _as, variant: _v, size: _s, fullWidth: _fw, className: _c, children: _ch, ...linkRest } = props;
    return (
      <a className={classes} {...(linkRest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, fullWidth: _fw, className: _c, children: _ch, ...btnRest } = props;
  return (
    <button className={classes} {...(btnRest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
