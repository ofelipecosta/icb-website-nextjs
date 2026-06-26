import type { ReactNode, CSSProperties } from "react";

interface BaseCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hover?: "md" | "sm" | "none";
}

export default function BaseCard({
  children,
  className = "",
  style,
  hover = "md",
}: BaseCardProps) {
  const hoverClass =
    hover === "md" ? "card-hover" : hover === "sm" ? "card-hover-sm" : "";

  return (
    <div
      className={[hoverClass, className].filter(Boolean).join(" ")}
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-luxury)",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
