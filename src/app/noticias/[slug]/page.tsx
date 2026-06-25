import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Pin } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumb from "@/components/Breadcrumb";
import { getNoticia, getNoticiasNav, getNoticiasRelacionadas, urlFor } from "@/lib/sanity";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const RED  = "#B22222";
const NAVY = "#0A1628";
const INK  = "#111827";

function stripEmoji(s: string): string {
  return s.replace(/\p{Emoji_Presentation}/gu, "").replace(/\p{Emoji}️/gu, "").trim();
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  return `${parseInt(d)} de ${months[parseInt(m) - 1]} de ${y}`;
}

function formatDateShort(iso: string): string {
  const [, m, d] = iso.split("-");
  const months = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]}`;
}

const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = urlFor(value as SanityImageSource).width(900).url();
      return url ? (
        <figure className="my-10">
          <div className="overflow-hidden rounded" style={{ backgroundColor: "#F3F4F6" }}>
            <img src={url} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </figure>
      ) : null;
    },
  },
  block: {
    normal: ({ children }) => (
      <p style={{ marginBottom: "1.375rem", lineHeight: 1.8, color: "#374151", fontSize: "1.0625rem" }}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontFamily: "inherit", fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: NAVY, borderLeft: `3px solid ${RED}`, paddingLeft: "0.875rem" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontFamily: "inherit", fontSize: "1.25rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: NAVY }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: `4px solid ${RED}`, paddingLeft: "1.25rem", margin: "1.75rem 0", fontStyle: "italic", color: "#6B7A8D", fontSize: "1.125rem", lineHeight: 1.7 }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ fontWeight: 600, color: INK }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ color: RED, textDecoration: "underline" }}>
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol style={{ listStyleType: "decimal", paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li style={{ color: "#374151", marginBottom: "0.5rem", lineHeight: 1.7 }}>{children}</li>,
    number: ({ children }) => <li style={{ color: "#374151", marginBottom: "0.5rem", lineHeight: 1.7 }}>{children}</li>,
  },
};

export async function generateStaticParams() {
  const nav = await getNoticiasNav();
  return nav.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const noticia = await getNoticia(slug);
  if (!noticia) return {};
  return {
    title: `${stripEmoji(noticia.titulo)} — Iate Clube Brasileiro`,
    description: noticia.resumo,
  };
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [noticia, nav, relacionadas] = await Promise.all([
    getNoticia(slug),
    getNoticiasNav(),
    getNoticiasRelacionadas(slug, 4),
  ]);

  if (!noticia) notFound();

  const title   = stripEmoji(noticia.titulo);
  const imgUrl  = noticia.capa ? urlFor(noticia.capa).width(1400).url() : null;
  const idx     = nav.findIndex((n) => n.slug === slug);
  const prev    = idx > 0 ? nav[idx - 1] : null;
  const next    = idx >= 0 && idx < nav.length - 1 ? nav[idx + 1] : null;

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#ffffff" }}>

        {/* ── Header with breadcrumb ── */}
        <div className="navy-ambient relative overflow-hidden" style={{ paddingTop: "6rem", paddingBottom: "0" }}>
          <div className="max-w-4xl mx-auto px-6 pb-6">
            <Breadcrumb items={[{ label: "Notícias", href: "/noticias" }, { label: title }]} />
          </div>
        </div>

        {/* ── 2-column layout: article + sidebar ── */}
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-16 grid lg:grid-cols-[1fr_340px] gap-12 items-start">

          {/* Article */}
          <article>

            {/* Title */}
            <header className="mb-8">
              <h1
                className="font-display font-black leading-tight"
                style={{
                  color: INK,
                  fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                  lineHeight: 1.1,
                  fontWeight: 800,
                }}
              >
                {title}
              </h1>
            </header>

            {/* Meta + Date */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8" style={{ borderBottom: "1px solid #E5E7EB" }}>
              <span
                className="text-xs font-black uppercase tracking-widest px-2.5 py-1"
                style={{ backgroundColor: RED, color: "#fff", letterSpacing: "0.12em" }}
              >
                Notícias
              </span>
              {noticia.fixado && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(178,34,34,0.08)", color: RED }}>
                  <Pin className="w-3 h-3" /> Destaque
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "#6B7A8D" }}>
                <Calendar className="w-4 h-4" />
                {formatDate(noticia.data)}
              </span>
            </div>

            {/* Lead / Resumo */}
            {noticia.resumo && (
              <div className="mb-10">
                <p
                  className="leading-relaxed"
                  style={{ color: "#374151", fontSize: "1.1875rem", lineHeight: 1.8, fontWeight: 500 }}
                >
                  {noticia.resumo}
                </p>
              </div>
            )}

            {/* Cover image */}
            {imgUrl && (
              <div
                className="w-full flex items-center justify-center mb-12 overflow-hidden rounded-lg"
                style={{
                  backgroundColor: "#F9FAFB",
                  minHeight: 300,
                  maxHeight: "60vh",
                }}
              >
                <img
                  src={imgUrl}
                  alt={title}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            {/* Body text */}
            <div className="prose prose-sm max-w-none">
              {noticia.corpo && noticia.corpo.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <PortableText value={noticia.corpo as any} components={portableComponents} />
              ) : (
                <p style={{ color: "#9CA3AF", fontSize: "1rem" }}>Conteúdo completo em breve.</p>
              )}
            </div>

            {/* Prev / Next navigation */}
            {(prev || next) && (
              <div className="mt-16 pt-12" style={{ borderTop: "2px solid #E5E7EB" }}>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    {prev && (
                      <Link href={`/noticias/${prev.slug}`} className="group flex flex-col gap-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-[#B22222]" style={{ color: "#9CA3AF" }}>
                          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                          Anterior
                        </span>
                        <span className="text-sm font-semibold line-clamp-2 transition-colors duration-200 group-hover:text-[#B22222]" style={{ color: INK, lineHeight: 1.4 }}>
                          {stripEmoji(prev.titulo)}
                        </span>
                      </Link>
                    )}
                  </div>
                  <div className="text-right">
                    {next && (
                      <Link href={`/noticias/${next.slug}`} className="group flex flex-col gap-2 items-end">
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-[#B22222]" style={{ color: "#9CA3AF" }}>
                          Próxima
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                        <span className="text-sm font-semibold line-clamp-2 text-right transition-colors duration-200 group-hover:text-[#B22222]" style={{ color: INK, lineHeight: 1.4 }}>
                          {stripEmoji(next.titulo)}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Sidebar: Mais notícias */}
          {relacionadas.length > 0 && (
            <aside className="hidden lg:block">
              <div
                className="sticky"
                style={{ top: "5.5rem" }}
              >
                {/* Sidebar header */}
                <div
                  className="flex items-center justify-between mb-6 pb-4"
                  style={{ borderBottom: `2px solid ${RED}` }}
                >
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: INK }}>
                    Mais notícias
                  </span>
                  <Link
                    href="/noticias"
                    className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-[#B22222]"
                    style={{ color: "#9CA3AF" }}
                  >
                    Ver todas
                  </Link>
                </div>

                {/* Cards */}
                <div className="flex flex-col divide-y" style={{ borderColor: "#E5E7EB" }}>
                  {relacionadas.map((item) => {
                    const thumbUrl = item.capa
                      ? urlFor(item.capa).width(320).height(200).url()
                      : null;
                    return (
                      <Link
                        key={item._id}
                        href={`/noticias/${item.slug.current}`}
                        className="group flex gap-3 py-5 items-start transition-opacity hover:opacity-75"
                      >
                        {/* Thumb */}
                        <div
                          className="flex-shrink-0 overflow-hidden rounded-sm"
                          style={{ width: 80, height: 56, backgroundColor: "#F3F4F6" }}
                        >
                          {thumbUrl ? (
                            <img
                              src={thumbUrl}
                              alt={stripEmoji(item.titulo)}
                              style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            />
                          ) : (
                            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #E5E7EB 0%, #F3F4F6 100%)" }} />
                          )}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: RED }}>
                            {formatDateShort(item.data)}
                          </p>
                          <p
                            className="text-sm font-semibold line-clamp-3 transition-colors duration-200 group-hover:text-[#B22222]"
                            style={{ color: INK, lineHeight: 1.35 }}
                          >
                            {stripEmoji(item.titulo)}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </aside>
          )}
        </div>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
