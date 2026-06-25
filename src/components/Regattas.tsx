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

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return `${parseInt(d)} de ${months[parseInt(m) - 1]} de ${y}`;
}

interface RegattasProps {
  sanityData?: RegatasSanity[];
}

export default function Regattas({ sanityData }: RegattasProps) {
  const items = sanityData && sanityData.length > 0 ? sanityData : FALLBACK_REGATTAS;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="regatas" className="section-py px-6" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-start gap-4 mb-12"
          style={{ paddingBottom: "1.5rem", borderBottom: "1px solid #E5E7EB" }}
        >
          <span className="w-1 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: "var(--color-red)", height: "3.5rem" }} />
          <div>
            <p className="text-xs tracking-[0.28em] uppercase font-semibold mb-2" style={{ color: "var(--color-red)" }}>Náutica</p>
            <h2 className="font-display font-black leading-none" style={{ color: "var(--color-navy)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
              Velas & Regatas
            </h2>
            <p className="mt-2 text-sm leading-relaxed max-w-md" style={{ color: "#6B7280" }}>
              Calendário de competições na Baía de Guanabara. Inscrições via{" "}
              <a href="https://regatas.icb.org.br" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-red)" }}>regatas.icb.org.br</a>.
            </p>
          </div>
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
                          {formatDate(regatta.data)}
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
