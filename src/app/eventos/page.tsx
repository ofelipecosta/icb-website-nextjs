export const revalidate = 60;

import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { getEventos, urlFor } from "@/lib/sanity";
import { categoryColors, DEFAULT_CATEGORY_COLOR } from "@/lib/constants";
import { formatDateShort } from "@/lib/utils";

const RED = "#B22222";
const INK = "#16202E";


export const metadata = {
  title: "Eventos — Iate Clube Brasileiro",
  description: "Conheça todos os eventos do Iate Clube Brasileiro.",
};

export default async function EventosPage() {
  const eventos = await getEventos().catch(() => []);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Agenda"
          title="Eventos"
          description="Confira os próximos acontecimentos do Iate Clube Brasileiro."
          breadcrumb={[{ label: "Eventos" }]}
        />

        <FadeIn>
          <div className="bg-white px-6 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {eventos.length === 0 ? (
                  <p className="col-span-3 text-center py-16" style={{ color: "#9CA3AF" }}>
                    Nenhum evento disponível no momento.
                  </p>
                ) : eventos.map((event) => {
                  const cat = categoryColors[event.categoria] ?? DEFAULT_CATEGORY_COLOR;
                  const href = (event as { linkUrl?: string; slug?: string }).linkUrl
                    ?? ((event as { slug?: string }).slug ? `/eventos/${(event as { slug?: string }).slug}` : null);
                  const desc = event.detalhe
                    ?? (event as { descricao?: { _type: string; children?: { text: string }[] }[] }).descricao
                        ?.find((b) => b._type === "block")?.children?.map((c) => c.text).join("") ?? undefined;
                  return (
                    <Link
                      key={event._id}
                      href={href ?? "#"}
                      target={(event as { linkUrl?: string }).linkUrl ? "_blank" : undefined}
                      rel={(event as { linkUrl?: string }).linkUrl ? "noopener noreferrer" : undefined}
                      className="bg-white overflow-hidden group card-hover block"
                      style={{
                        borderRadius: "var(--radius-card)",
                        border: "1px solid rgba(0,0,0,0.07)",
                        boxShadow: "var(--shadow-luxury)",
                      }}
                    >
                      {event.imagem && (
                        <div className="relative w-full flex items-center justify-center" style={{ aspectRatio: "4/3", backgroundColor: "#F3F4F6" }}>
                          <Image
                            src={urlFor(event.imagem).width(600).url()}
                            alt={event.titulo}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col h-full gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {event.data && (
                            <span
                              className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 flex items-center gap-1"
                              style={{ backgroundColor: RED, color: "#fff", borderRadius: "var(--radius-btn)" }}
                            >
                              <Calendar className="w-3 h-3" />{formatDateShort(event.data ?? "")}
                            </span>
                          )}
                          <span
                            className="text-xs font-semibold px-2 py-1"
                            style={{ backgroundColor: cat.bg, color: cat.text, borderRadius: "var(--radius-btn)" }}
                          >
                            {event.categoria}
                          </span>
                        </div>
                        <h3
                          className="font-display text-lg font-semibold leading-snug transition-colors duration-200"
                          style={{ color: INK }}
                        >
                          {event.titulo}
                        </h3>
                        {desc && (
                          <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-anchor)" }}>
                            {desc}
                          </p>
                        )}
                        {event.local && (
                          <p className="flex items-center gap-1.5 text-xs" style={{ color: "#9CA3AF" }}>
                            <MapPin className="w-3.5 h-3.5" />{event.local}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
