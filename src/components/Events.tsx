"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { EventoSanity } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { categoryColors, DEFAULT_CATEGORY_COLOR } from "@/lib/constants";
import { formatDateShort } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";

const RED    = "#B22222";
const INK    = "#16202E";
const ANCHOR = "#6B7A8D";

interface EventsProps {
  sanityData?: EventoSanity[];
}

export default function Events({ sanityData }: EventsProps) {
  const items = (sanityData ?? []).slice(0, 3);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="eventos" className="section-py px-6" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <SectionHeader
            title="Eventos"
            cta={{ label: "Ver todos", href: "/eventos" }}
          />
        </motion.div>

        {/* Empty state */}
        {items.length === 0 && (
          <p className="mt-8 text-sm text-center" style={{ color: "var(--color-anchor)" }}>
            Em breve novos eventos. Fique ligado!
          </p>
        )}

        {/* Event cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {items.map((event, i) => {
            const cat = categoryColors[event.categoria] ?? DEFAULT_CATEGORY_COLOR;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const desc = event.detalhe
              ?? event.descricao?.find((b: any) => b._type === "block")?.children?.map((c: any) => c.text as string).join("") ?? undefined;
            return (
            <motion.a
              key={event._id}
              href={event.linkUrl ?? (event.slug ? `/eventos/${event.slug}` : "/eventos")}
              target={event.linkUrl ? "_blank" : undefined}
              rel={event.linkUrl ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="group cursor-pointer block"
            >
              <div
                className="card-hover h-full"
                style={{
                  backgroundColor: "#ffffff",
                  border:       "1px solid rgba(0,0,0,0.07)",
                  borderRadius: "var(--radius-card)",
                  boxShadow:    "var(--shadow-luxury)",
                  overflow:     "hidden",
                }}
              >
                {/* Imagem de capa */}
                {event.imagem && (
                  <div className="relative w-full flex items-center justify-center overflow-hidden" style={{ aspectRatio: "4/3", backgroundColor: "#F3F4F6" }}>
                    <Image
                      src={urlFor(event.imagem).width(600).url()}
                      alt={event.titulo}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col h-full">
                  {/* Date + Category */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {event.data && (
                      <span className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded" style={{ backgroundColor: RED, color: "#fff" }}>
                        <Calendar className="w-3 h-3 inline mr-1" />{formatDateShort(event.data)}
                      </span>
                    )}
                    <span className="text-xs font-semibold px-2 py-1" style={{ backgroundColor: cat.bg, color: cat.text, borderRadius: "var(--radius-btn)" }}>
                      {event.categoria}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-lg font-semibold leading-snug mb-3 transition-colors duration-200 group-hover:text-[#B22222] line-clamp-2" style={{ color: INK }}>
                    {event.titulo}
                  </h4>

                  {/* Description */}
                  {desc && (
                    <p className="text-sm leading-relaxed line-clamp-2 mb-4 flex-1" style={{ color: "#6B7A8D" }}>
                      {desc}
                    </p>
                  )}

                  {/* Location */}
                  {event.local && (
                    <div className="flex items-center gap-1.5 text-xs mb-4" style={{ color: "#6B7A8D" }}>
                      <MapPin className="w-3.5 h-3.5" />
                      {event.local}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                    <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300" style={{ color: RED }}>
                      {event.ctaLabel ?? "Ver mais"} →
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
            );
          })}
        </div>

        {/* CTA bottom */}
        <div
          className="flex justify-center pb-8"
          style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: "1.5rem", marginTop: "1.5rem" }}
        >
          <a
            href="/eventos"
            className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-opacity duration-200 hover:opacity-60 cursor-pointer"
            style={{ color: RED }}
          >
            Ver todos os eventos
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
