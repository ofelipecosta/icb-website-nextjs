"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlowButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "light" | "dark" | "red";
}

export function FlowButton({ text, onClick, href, className, variant = "light" }: FlowButtonProps) {
  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg",
    "text-sm font-semibold overflow-hidden cursor-pointer select-none",
    "transition-all duration-300 border-0"
  );

  const styles: Record<string, { wrapper: string; defaultText: string; hoverFill: string }> = {
    light: {
      wrapper: "bg-white text-gray-900",
      defaultText: "text-gray-900 group-hover:text-white",
      hoverFill: "bg-gray-900",
    },
    dark: {
      wrapper: "bg-slate-800 text-white",
      defaultText: "text-white group-hover:text-slate-800",
      hoverFill: "bg-white",
    },
    red: {
      wrapper: "bg-[#B22222] text-white",
      defaultText: "text-white group-hover:text-white",
      hoverFill: "bg-[#A01F1F]",
    },
  };

  const s = styles[variant];

  const inner = (
    <>
      {/* Fill that sweeps in from left on hover */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -translate-x-full group-hover:translate-x-0",
          "transition-transform duration-300 ease-out",
          s.hoverFill
        )}
      />

      {/* Arrow LEFT — hidden by default, slides in on hover */}
      <ArrowRight
        aria-hidden
        className={cn(
          "relative z-10 w-4 h-4 flex-shrink-0",
          "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
          "transition-all duration-300 ease-out",
          variant === "dark" ? "text-gray-900" : s.defaultText
        )}
        strokeWidth={2.5}
      />

      {/* Label */}
      <span
        className={cn(
          "relative z-10 transition-colors duration-300",
          s.defaultText,
          variant === "dark" && "group-hover:text-gray-900"
        )}
      >
        {text}
      </span>

      {/* Arrow RIGHT — visible by default, slides out on hover */}
      <ArrowRight
        aria-hidden
        className={cn(
          "relative z-10 w-4 h-4 flex-shrink-0",
          "translate-x-0 opacity-100 group-hover:translate-x-4 group-hover:opacity-0",
          "transition-all duration-300 ease-out",
          s.defaultText,
          variant === "dark" && "group-hover:text-gray-900"
        )}
        strokeWidth={2.5}
      />
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(base, s.wrapper, className)}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn(base, s.wrapper, className)}>
      {inner}
    </button>
  );
}
