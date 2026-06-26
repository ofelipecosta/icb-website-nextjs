"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { EventoSanity } from "@/lib/sanity";
import { categoryColors, DEFAULT_CATEGORY_COLOR } from "@/lib/constants";
import { formatDateShort } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";

const RED    = "#B22222";
const INK    = "#16202E";
const ANCHOR = "#6B7A8D";

const FALLBACK_EVENTS: EventoSanity[] = [
  { _id: "1", titulo: "Jantar de Abertura da Temporada",    categoria: "Social",  data: "2026-03-15", local: "Salão Nobre",    detalhe: "Celebre o início da temporada em nosso tradicional jantar de abertura." },
  { _id: "2", titulo: "Festa do Sócio",                     categoria: "Social",  data: "2026-04-19", local: "Salão de Festas", detalhe: "Grande confraternização com drinks, gastronomia e lazer para toda a família." },
  { _id: "3", titulo: "Escola de Vela – Início das Turmas", categoria: "Náutico", data: "2026-05-10", local: "Marina",          detalhe: "Inscrições abertas para iniciantes e avançados na Escola de Vela do ICB." },
];

interface EventsProps {
  sanityData?: EventoSanity[];
}

export default function Events({ sanityData }: EventsProps) {
  const items = (sanityData && sanityData.length > 0 ? sanityData : FALLBACK_EVENTS).slice(0, 3);
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

        {/* Event cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {items.map((event, i) => {
            const cat = categoryColors[event.categoria] ?? DEFAULT_CATEGORY_COLOR;
            return (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="group cursor-pointer"
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
                  {event.detalhe && (
                    <p className="text-sm leading-relaxed line-clamp-2 mb-4 flex-1" style={{ color: "#6B7A8D" }}>
                      {event.detalhe}
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
            </motion.div>
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
