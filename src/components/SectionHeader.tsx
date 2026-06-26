import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const RED = "var(--color-red)";
const INK = "var(--color-ink)";

export interface SectionCta {
  label: string;
  href: string;
}

export interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string | ReactNode;
  cta?: SectionCta;
  rightSlot?: ReactNode;
  divider?: boolean;
  /** pb-5 = default compact; pb-6 = when description present */
  spacing?: "compact" | "spacious";
  titleSize?: "sm" | "md" | "lg";
  className?: string;
}

const TITLE_FONT_SIZE: Record<string, string> = {
  sm: "clamp(1.375rem, 2.5vw, 1.875rem)",
  md: "clamp(1.5rem, 3vw, 2.25rem)",
  lg: "clamp(1.75rem, 3.5vw, 2.5rem)",
};

export default function SectionHeader({
  title,
  eyebrow,
  description,
  cta,
  rightSlot,
  divider = true,
  spacing,
  titleSize = "md",
  className = "",
}: SectionHeaderProps) {
  const hasDetail = !!eyebrow || !!description;
  const pb = spacing === "spacious" || hasDetail ? "1.5rem" : "1.25rem";
  const barHeight = hasDetail ? "3.5rem" : "1.75rem";
  const flexAlign = hasDetail ? "flex-start" : "center";
  const hasRight = cta || rightSlot;

  return (
    <div
      className={`flex items-${hasDetail ? "start" : "center"} justify-between gap-6 ${className}`}
      style={
        divider
          ? { paddingBottom: pb, borderBottom: "1px solid rgba(0,0,0,0.07)" }
          : { paddingBottom: pb }
      }
    >
      {/* Left: accent bar + text */}
      <div
        className="flex gap-3 min-w-0"
        style={{ alignItems: flexAlign }}
      >
        <span
          className="w-1 rounded-full flex-shrink-0"
          style={{
            backgroundColor: RED,
            height: barHeight,
            marginTop: hasDetail ? "0.2rem" : 0,
          }}
        />
        <div className="min-w-0">
          {eyebrow && (
            <p
              className="text-xs tracking-[0.28em] uppercase font-semibold mb-2 leading-none"
              style={{ color: RED }}
            >
              {eyebrow}
            </p>
          )}
          <h2
            className="font-display font-black leading-none"
            style={{ color: INK, fontSize: TITLE_FONT_SIZE[titleSize] }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="mt-2 text-sm leading-relaxed max-w-md"
              style={{ color: "var(--color-anchor)" }}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Right: CTA link or custom slot */}
      {hasRight && (
        <div className="flex-shrink-0 self-center">
          {rightSlot ?? (
            cta && (
              <Link
                href={cta.href}
                className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
                style={{ color: RED }}
              >
                {cta.label}
                <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
