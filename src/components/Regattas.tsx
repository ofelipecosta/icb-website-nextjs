"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";
import type { RegatasSanity } from "@/lib/sanity";
import { formatDateLong } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";

interface RegattasProps {
  sanityData?: RegatasSanity[];
}

export default function Regattas({ sanityData }: RegattasProps) {
  const items = sanityData ?? [];
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="regatas" className="section-py px-6" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto" ref={ref}>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <SectionHeader
            eyebrow="Náutica"
            title="Velas & Regatas"
            titleSize="lg"
            description={
              <>
                Calendário de competições na Baía de Guanabara. Inscrições via{" "}
                <a href="https://regatas.icb.org.br" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-red)" }}>
                  regatas.icb.org.br
                </a>.
              </>
            }
          />
        </motion.div>

        {items.length === 0 && (
          <p className="mb-6 text-sm" style={{ color: "var(--color-anchor)" }}>
            O calendário de regatas será divulgado em breve.
          </p>
        )}

        <div className="space-y-3">
          {items.map((regatta, i) => (
            <motion.a
              key={regatta._id}
              href={regatta.inscricoes ?? "https://regatas.icb.org.br"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="bg-white rounded-[var(--radius-card)] p-5 shadow-luxury hover:shadow-luxury-hover transition-shadow duration-200 group flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-base font-semibold text-[var(--color-navy)] mb-1.5 group-hover:text-[var(--color-red)] transition-colors duration-200">
                  {regatta.titulo}
                </h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-anchor)]">
                  {regatta.data && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {formatDateLong(regatta.data)}
                    </span>
                  )}
                  {regatta.classes && (
                    <span className="px-2 py-0.5 rounded bg-[var(--color-navy)]/5 text-[var(--color-navy)]/60">
                      {regatta.classes}
                    </span>
                  )}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 flex-shrink-0 text-[var(--color-anchor)]/30 group-hover:text-[var(--color-red)] transition-colors duration-200" />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-6"
        >
          <a
            href="https://regatas.icb.org.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: "var(--color-red)", color: "#fff", borderRadius: "var(--radius-btn)" }}
          >
            <ExternalLink className="w-4 h-4" />
            Portal de Inscrições
          </a>
        </motion.div>

      </div>
    </section>
  );
}
