"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Calendar, ExternalLink, Flag } from "lucide-react";
import type { RegatasSanity } from "@/lib/sanity";

const FALLBACK_REGATTAS: RegatasSanity[] = [
  { _id: "fr-1", titulo: "Interclubes de Niterói",              classes: "ILCA 4 · ILCA 6 · Optimist",  data: "2026-06-28", inscricoes: "https://regatas.icb.org.br" },
  { _id: "fr-2", titulo: "3.º Campeonato Interclube — Vela",    classes: "Snipe · Laser · Optimist",     data: "2026-08-15", inscricoes: "https://regatas.icb.org.br" },
  { _id: "fr-3", titulo: "Regata da Primavera",                  classes: "Todas as classes",             data: "2026-09-21", inscricoes: "https://regatas.icb.org.br" },
  { _id: "fr-4", titulo: "Copa ICB de Fim de Ano",               classes: "ILCA · Snipe · ORC",          data: "2026-11-29", inscricoes: "https://regatas.icb.org.br" },
];

const achievements = [
  { value: "50+", label: "Títulos Nacionais" },
  { value: "120", label: "Anos de história" },
  { value: "200+", label: "Regatas por Ano" },
  { value: "8", label: "Classes de Vela" },
];

import { formatDateLong } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";

interface RegattasProps {
  sanityData?: RegatasSanity[];
}

export default function Regattas({ sanityData }: RegattasProps) {
  const items = sanityData && sanityData.length > 0 ? sanityData : FALLBACK_REGATTAS;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="regatas" className="section-py px-6" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12"
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

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="navy-ambient rounded-xl p-10 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-[var(--color-red)]/10" />
              <div className="absolute -bottom-16 -left-10 w-52 h-52 rounded-full border border-[var(--color-red)]/10" />

              <Trophy className="w-10 h-10 text-[var(--color-red)] mb-8" />
              <h3 className="font-display text-2xl font-semibold text-white mb-6">
                Uma Tradição Vencedora
              </h3>
              <p className="text-white opacity-50 text-sm leading-relaxed mb-10">
                O ICB é berço de campeões. Nossos atletas representam o Brasil
                nas mais importantes competições de vela do mundo, da Semana
                Internacional de Vela de Ilhabela à Copa do Mundo de Vela.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {achievements.map((a, i) => (
                  <motion.div
                    key={a.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="glass-white rounded-lg p-5"
                  >
                    <p className="font-display text-3xl font-bold text-[var(--color-red)] mb-1">
                      {a.value}
                    </p>
                    <p className="text-white opacity-50 text-xs uppercase tracking-widest">
                      {a.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Regatta calendar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-8">
              <Flag className="w-5 h-5 text-[var(--color-red)]" />
              <h3 className="font-display text-2xl font-semibold text-[var(--color-navy)]">
                Calendário de Regatas
              </h3>
            </div>

            {items.map((regatta, i) => (
              <motion.a
                key={regatta._id}
                href={regatta.inscricoes ?? "https://regatas.icb.org.br"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300 group block"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-display text-lg font-semibold text-[var(--color-navy)] mb-2 group-hover:text-[var(--color-red)] transition-colors duration-300">
                      {regatta.titulo}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-anchor)]">
                      {regatta.data && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDateLong(regatta.data)}
                        </span>
                      )}
                      {regatta.classes && (
                        <span className="px-2 py-0.5 bg-[var(--color-navy)]/5 rounded text-[var(--color-navy)]/60">
                          {regatta.classes}
                        </span>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--color-anchor)]/40 group-hover:text-[var(--color-red)] transition-colors duration-300 flex-shrink-0 mt-1" />
                </div>
              </motion.a>
            ))}

            <motion.a
              href="https://regatas.icb.org.br"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center justify-center gap-2 w-full py-4 border-2 border-[var(--color-red)]/40 text-[var(--color-red)] font-semibold rounded-lg text-sm tracking-wide hover:bg-[var(--color-red)] hover:text-[var(--color-navy)] hover:border-[var(--color-red)] transition-all duration-300 mt-6"
            >
              <ExternalLink className="w-4 h-4" />
              Portal de Regatas
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
