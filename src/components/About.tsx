"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Waves, Star } from "lucide-react";
import Image from "next/image";

const RED  = "#B22222";
const NAVY = "#0A1628";
const INK  = "#16202E";

const stats = [
  { value: "1906", label: "Fundação" },
  { value: "120",  label: "Anos" },
  { value: "5k+",  label: "Sócios" },
  { value: "300+", label: "Regatas/ano" },
];

const pillars = [
  {
    icon: Waves,
    title: "Esporte Náutico",
    text: "Tradição em vela, remo e pesca esportiva na Baía de Guanabara com atletas campeões nacionais.",
  },
  {
    icon: Users,
    title: "Vida Social",
    text: "Eventos exclusivos, gastronomia de excelência e um ambiente acolhedor para toda a família.",
  },
  {
    icon: Award,
    title: "Tradição",
    text: "Mais de 120 anos formando gerações de velejadores e preservando a cultura náutica brasileira.",
  },
  {
    icon: Star,
    title: "Exclusividade",
    text: "Um dos clubes mais tradicionais do Rio de Janeiro, com estrutura completa e localização privilegiada.",
  },
];

export default function About() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="section-py bg-white px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* ── Masthead com stats integrados ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
          style={{ paddingBottom: "1.5rem", borderBottom: `1px solid rgba(0,0,0,0.07)` }}
        >
          {/* Título */}
          <div>
            <p
              className="text-xs tracking-[0.28em] uppercase font-semibold mb-2"
              style={{ color: RED }}
            >
              Nossa História
            </p>
            <h2
              className="font-display font-bold leading-none"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: INK }}
            >
              Iate Clube Brasileiro
            </h2>
          </div>

          {/* Stats inline — discretos, sem destaque excessivo */}
          <div
            className="flex items-center gap-6 sm:gap-8 flex-wrap"
            style={{ paddingLeft: "0", borderLeft: "none" }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="text-center sm:text-right"
              >
                <div
                  className="font-display font-bold leading-none"
                  style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)", color: INK }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs uppercase tracking-wider mt-0.5"
                  style={{ color: "#9CA3AF", letterSpacing: "0.1em" }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Conteúdo principal ── */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">

          {/* Card da logo — com vignette e profundidade */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "4/3",
                borderRadius: "var(--radius-card)",
                boxShadow: "0 24px 48px rgba(10,22,40,0.22), 0 4px 16px rgba(10,22,40,0.1)",
              }}
            >
              {/* Fundo gradient com profundidade */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at 50% 40%, #1E3A5F 0%, #0D1F3C 60%, #070F1E 100%)",
                }}
              />

              {/* Vignette nas bordas */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(5,10,20,0.55) 100%)",
                }}
              />

              {/* Highlight sutil no topo */}
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background: "linear-gradient(to right, transparent 10%, rgba(255,255,255,0.1) 50%, transparent 90%)",
                }}
              />

              {/* Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/logo-timao-contorno.png"
                  alt="Logo Iate Clube Brasileiro"
                  width={340}
                  height={340}
                  className="object-contain w-[58%] h-auto max-h-[80%]"
                  style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.4))" }}
                />
              </div>

              {/* "Fundado em 1906" — elegante, dentro do card */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-6 pb-5">
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
                <span
                  className="text-xs font-medium uppercase tracking-[0.2em] whitespace-nowrap"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Fundado em 1906
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
              </div>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col gap-5"
          >
            {/* Accent line vermelha */}
            <div className="w-8 h-0.5" style={{ backgroundColor: RED }} />

            <h3
              className="font-display font-bold leading-snug"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", color: INK }}
            >
              Conheça o Iate Clube Brasileiro
            </h3>

            <p
              className="leading-relaxed"
              style={{ color: "rgba(16,32,46,0.65)", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Coerente com a tradição de ser o primeiro clube de iatismo do Brasil,
              o Iate Clube Brasileiro sempre conferiu atenção especial às atividades
              náuticas, preconizando, desde seu primeiro estatuto, o pleno uso dos
              melhores hábitos marinheiros.
            </p>

            <p
              className="leading-relaxed"
              style={{ color: "rgba(16,32,46,0.65)", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Além disso, o Clube tem por objetivo o congraçamento e aprimoramento
              físico, esportivo, artístico, recreativo, cultural e cívico do seu
              quadro associativo.
            </p>

            {/* CTA inline discreta */}
            <div style={{ paddingTop: "0.5rem", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              <a
                href="/historia"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
                style={{ color: RED }}
              >
                Conheça nossa história →
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Quatro pilares ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.35 + i * 0.08 }}
              className="rounded-[var(--radius-card)] p-7 group card-hover"
              style={{
                backgroundColor: "#fff",
                border:      "1px solid rgba(0,0,0,0.07)",
                boxShadow:   "var(--shadow-luxury)",
              }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mb-5 transition-colors duration-300"
                style={{ backgroundColor: "rgba(10,22,40,0.05)" }}
              >
                <pillar.icon className="w-5 h-5" style={{ color: RED }} />
              </div>
              <h3
                className="font-display font-semibold mb-2"
                style={{ fontSize: "1.1rem", color: NAVY }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#6B7A8D" }}
              >
                {pillar.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
