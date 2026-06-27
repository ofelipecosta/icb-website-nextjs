import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumb from "@/components/Breadcrumb";
import { getEvento, getEventosNav, urlFor } from "@/lib/sanity";
import { formatDateLong } from "@/lib/utils";
import { categoryColors, DEFAULT_CATEGORY_COLOR } from "@/lib/constants";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const revalidate = 60;

const RED  = "#B22222";
const NAVY = "#0A1628";
const INK  = "var(--color-ink)";

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
  const nav = await getEventosNav();
  return nav.filter((e) => !!e.slug).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const evento = await getEvento(slug);
  if (!evento) return {};
  return {
    title: `${evento.titulo} — Iate Clube Brasileiro`,
    description: evento.detalhe,
  };
}

export default async function EventoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const evento = await getEvento(slug);
  if (!evento) notFound();

  const cat    = categoryColors[evento.categoria] ?? DEFAULT_CATEGORY_COLOR;
  const imgUrl = evento.imagem ? urlFor(evento.imagem).width(1200).url() : null;

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#ffffff" }}>

        {/* Header */}
        <div className="navy-ambient relative overflow-hidden" style={{ paddingTop: "7rem", paddingBottom: "0" }}>
          <div className="max-w-4xl mx-auto px-6 pb-6">
            <Breadcrumb items={[{ label: "Eventos", href: "/eventos" }, { label: evento.titulo }]} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 pt-10 pb-16">

          {/* Categoria + data */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-semibold px-2.5 py-1 rounded" style={{ backgroundColor: cat.bg, color: cat.text }}>
              {evento.categoria}
            </span>
            {evento.data && (
              <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "#6B7A8D" }}>
                <Calendar className="w-4 h-4" />
                {formatDateLong(evento.data)}
              </span>
            )}
            {evento.local && (
              <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "#6B7A8D" }}>
                <MapPin className="w-4 h-4" />
                {evento.local}
              </span>
            )}
          </div>

          {/* Título */}
          <h1
            className="font-display font-black leading-tight mb-6"
            style={{ color: INK, fontSize: "clamp(1.6rem, 5vw, 3rem)", lineHeight: 1.1 }}
          >
            {evento.titulo}
          </h1>

          {/* Linha de apoio */}
          {evento.detalhe && (
            <p className="text-lg leading-relaxed mb-8" style={{ color: "#374151", fontWeight: 500 }}>
              {evento.detalhe}
            </p>
          )}

          {/* Imagem */}
          {imgUrl && (
            <div className="relative w-full mb-10 overflow-hidden rounded-lg" style={{ aspectRatio: "16/9" }}>
              <Image
                src={imgUrl}
                alt={evento.titulo}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Descrição rich text */}
          <div className="prose prose-sm max-w-none">
            {evento.descricao && (evento.descricao as unknown[]).length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <PortableText value={evento.descricao as any} components={portableComponents} />
            ) : (
              <p style={{ color: "#9CA3AF" }}>Mais informações em breve.</p>
            )}
          </div>

          {/* Botão de inscrição */}
          {evento.linkUrl && (
            <div className="mt-10 pt-8" style={{ borderTop: "1px solid #E5E7EB" }}>
              <a
                href={evento.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: RED, color: "#fff", borderRadius: "var(--radius-btn)" }}
              >
                <ExternalLink className="w-4 h-4" />
                {evento.ctaLabel ?? "Inscrever-se"}
              </a>
            </div>
          )}

        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
