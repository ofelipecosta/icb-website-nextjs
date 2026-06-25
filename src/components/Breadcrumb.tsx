import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const all = [{ label: "Início", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs flex-wrap">
      {all.map((item, i) => {
        const isLast = i === all.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: "rgba(255,255,255,0.25)" }} />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="transition-colors duration-150 hover:text-white"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {item.label}
              </Link>
            ) : (
              <span style={{ color: isLast ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)" }}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
