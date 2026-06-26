"use client";

import Link from "next/link";
import Image from "next/image";

export type PageHeaderVariant = "clean" | "image-side" | "image-large" | "video";

export interface PageHeaderStat {
  value: string;
  label: string;
}

export interface PageHeaderCrumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: PageHeaderCrumb[];
  stats?: PageHeaderStat[];
  image?: string;
  imageAlt?: string;
  video?: string;
  variant?: PageHeaderVariant;
}

const INK    = "var(--color-ink)";
const MUTED  = "var(--color-anchor)";
const BORDER = "var(--color-border)";

const gridCols: Record<PageHeaderVariant, string> = {
  clean:       "",
  "image-side":  "lg:grid lg:gap-14 lg:items-center",
  "image-large": "lg:grid lg:gap-12 lg:items-center",
  video:         "lg:grid lg:gap-14 lg:items-center",
};

const colTemplate: Record<PageHeaderVariant, string> = {
  clean:         "",
  "image-side":  "62% 1fr",
  "image-large": "56% 1fr",
  video:         "62% 1fr",
};

const imgAspect: Record<PageHeaderVariant, string> = {
  clean:         "3/2",
  "image-side":  "3/2",
  "image-large": "4/3",
  video:         "16/9",
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  stats,
  image,
  imageAlt,
  video,
  variant,
}: PageHeaderProps) {
  const resolved: PageHeaderVariant =
    variant ?? (video ? "video" : image ? "image-side" : "clean");

  const hasMedia = resolved !== "clean" && (image || video);

  const allCrumbs: PageHeaderCrumb[] = [{ label: "Início", href: "/" }, ...(breadcrumb ?? [])];

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface)",
        borderBottom: `1px solid ${BORDER}`,
        paddingTop: "6.5rem",
        paddingBottom: "2.5rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        {allCrumbs.length > 1 && (
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 mb-6">
            {allCrumbs.map((crumb, i) => {
              const isLast = i === allCrumbs.length - 1;
              return (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && (
                    <span style={{ color: "#CBD5E0", fontSize: "10px", lineHeight: 1 }}>/</span>
                  )}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.06em",
                        color: MUTED,
                        opacity: 0.75,
                        textDecoration: "none",
                        transition: "opacity 150ms",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
                      onMouseOut={(e) => (e.currentTarget.style.opacity = "0.75")}
                    >
                      {crumb.label}
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
                      {crumb.label}
                    </span>
                  )}
                </span>
              );
            })}
          </nav>
        )}

        {/* Layout grid */}
        <div
          className={gridCols[resolved]}
          style={hasMedia ? { gridTemplateColumns: colTemplate[resolved] } : undefined}
        >
          {/* Text column */}
          <div>
            {eyebrow && (
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: MUTED,
                  marginBottom: "0.75rem",
                  opacity: 0.9,
                }}
              >
                {eyebrow}
              </p>
            )}

            <h1
              className="font-display font-bold leading-none"
              style={{
                fontSize: "clamp(1.875rem, 4vw, 3rem)",
                color: INK,
                letterSpacing: "-0.025em",
                marginBottom: description ? "0.875rem" : 0,
              }}
            >
              {title}
            </h1>

            {description && (
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: MUTED,
                  lineHeight: 1.7,
                  maxWidth: "38rem",
                }}
              >
                {description}
              </p>
            )}

            {stats && stats.length > 0 && (
              <div
                className="flex items-center gap-6 flex-wrap"
                style={{ marginTop: "1.375rem" }}
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="font-display font-bold leading-none"
                      style={{ fontSize: "1.25rem", color: INK }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: "8px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#9CA3AF",
                        marginTop: "3px",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Media column — hidden on mobile */}
          {hasMedia && (
            <div
              className="hidden lg:block"
              style={{
                borderRadius: "var(--radius-card)",
                overflow: "hidden",
                position: "relative",
                aspectRatio: imgAspect[resolved],
                backgroundColor: "#E2EAF0",
              }}
            >
              {resolved === "video" && video ? (
                <video
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : image ? (
                <Image
                  src={image}
                  alt={imageAlt ?? title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0px, 40vw"
                  priority
                />
              ) : null}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
