"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { EventoSanity } from "@/lib/sanity";

const RED = "#B22222";
const INK = "#111827";

const FALLBACK_EVENTS: EventoSanity[] = [
  { _id: "1", titulo: "Jantar de Abertura da Temporada",    categoria: "Social",  data: "2026-03-15", local: "Salão Nobre",    detalhe: "Celebre o início da temporada em nosso tradicional jantar de abertura." },
  { _id: "2", titulo: "Festa do Sócio",                     categoria: "Social",  data: "2026-04-19", local: "Salão de Festas", detalhe: "Grande confraternização com drinks, gastronomia e lazer para toda a família." },
  { _id: "3", titulo: "Escola de Vela – Início das Turmas", categoria: "Náutico", data: "2026-05-10", local: "Marina",          detalhe: "Inscrições abertas para iniciantes e avançados na Escola de Vela do ICB." },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  Social:   { bg: "rgba(168, 85, 247, 0.08)", text: "#A855F7" },
  Esporte:  { bg: "rgba(16, 185, 129, 0.08)", text: "#10B981" },
  Náutico:  { bg: "rgba(59, 130, 246, 0.08)", text: "#3B82F6" },
  Cultural: { bg: "rgba(234, 179, 8, 0.08)",  text: "#CA8A04" },
};

function formatEventDate(iso?: string): string {
  if (!iso) return "";
  const [, m, d] = iso.split("-");
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]}`;
}

interface EventsProps {
  sanityData?: EventoSanity[];
}

export default function Events({ sanityData }: EventsProps) {
  const items = (sanityData && sanityData.length > 0 ? sanityData : FALLBACK_EVENTS).slice(0, 3);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="eventos" className="section-py px-6" style={{ backgroundColor: "#FAF8F3" }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Masthead — igual ao de Notícias */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
          style={{ paddingTop: "1rem", paddingBottom: "1.25rem", borderBottom: "1px solid #E5E7EB" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-1 h-7 rounded-full flex-shrink-0"
              style={{ backgroundColor: RED }}
            />
            <span
              className="font-display font-black leading-none"
              style={{ color: INK, fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              Eventos
            </span>
          </div>
          <a
            href="/eventos"
            className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-opacity duration-200 hover:opacity-60 cursor-pointer"
            style={{ color: RED }}
          >
            Ver todos
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* Event cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {items.map((event, i) => {
            const cat = categoryColors[event.categoria] ?? { bg: "rgba(107,122,141,0.08)", text: "#6B7A8D" };
            return (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="group cursor-pointer"
            >
              <div
                className="rounded-lg transition-all duration-300 h-full"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="p-5 flex flex-col h-full">
                  {/* Date + Category */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {event.data && (
                      <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded" style={{ backgroundColor: RED, color: "#fff" }}>
                        <Calendar className="w-3 h-3 inline mr-1" />{formatEventDate(event.data)}
                      </span>
                    )}
                    <span className="text-xs font-semibold px-2 py-1 rounded" style={{ backgroundColor: cat.bg, color: cat.text }}>
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
                  <div className="mt-auto pt-4" style={{ borderTop: "1px solid #E5E7EB" }}>
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
          style={{ borderTop: "1px solid #E5E7EB", paddingTop: "1.5rem", marginTop: "1.5rem" }}
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
