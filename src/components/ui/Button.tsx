"use client";

import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";

type Variant = "primary" | "dark" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

const BASE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  fontWeight: 600,
  borderRadius: "var(--radius-btn)",
  cursor: "pointer",
  textDecoration: "none",
  transition: "opacity 150ms, background-color 150ms",
  fontFamily: "var(--font-body)",
};

const VARIANTS: Record<Variant, CSSProperties> = {
  primary: { backgroundColor: "var(--color-red)", color: "#fff", border: "none" },
  dark:    { backgroundColor: "var(--color-navy)", color: "#fff", border: "none" },
  outline: { backgroundColor: "transparent", color: "var(--color-red)", border: "1.5px solid var(--color-red)" },
  ghost:   { backgroundColor: "transparent", color: "var(--color-red)", border: "none" },
};

const SIZES: Record<Size, CSSProperties> = {
  sm: { fontSize: "0.7rem",  padding: "0.45rem 0.9rem",  letterSpacing: "0.1em",  textTransform: "uppercase" as const },
  md: { fontSize: "0.8rem",  padding: "0.65rem 1.25rem", letterSpacing: "0.06em", textTransform: "uppercase" as const },
  lg: { fontSize: "0.9rem",  padding: "0.85rem 1.75rem", letterSpacing: "0.04em" },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  onClick,
  disabled,
  type = "button",
  className = "",
}: ButtonProps) {
  const style: CSSProperties = { ...BASE, ...VARIANTS[variant], ...SIZES[size], ...(disabled ? { opacity: 0.5, pointerEvents: "none" } : {}) };

  if (href) {
    const isExternal = external ?? (href.startsWith("http") || href.startsWith("//"));
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" style={style} className={`hover:opacity-75 ${className}`}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} style={style} className={`hover:opacity-75 ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={style} className={`hover:opacity-75 ${className}`}>
      {children}
    </button>
  );
}
