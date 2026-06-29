import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const INK   = "var(--color-ink)";
const MUTED = "var(--color-anchor)";

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const all = [{ label: "Início", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1">
      {all.map((item, i) => {
        const isLast = i === all.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <span style={{ color: "#CBD5E0", fontSize: "10px", lineHeight: 1 }}>/</span>
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="opacity-75 hover:opacity-100 transition-opacity duration-150"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.06em",
                  color: MUTED,
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.06em",
                  color: isLast ? INK : MUTED,
                  opacity: isLast ? 0.9 : 0.75,
                  fontWeight: isLast ? 500 : 400,
                }}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
