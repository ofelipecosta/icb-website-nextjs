"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

const RED  = "#B22222";
const NAVY = "#0A1628";
const INK  = "#16202E";


export default function About() {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-100px" });
  const [playing, setPlaying] = useState(false);

  return (
    <section id="sobre" className="section-py bg-white px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* ── Masthead com stats integrados ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <SectionHeader
            eyebrow="Nossa História"
            title="Iate Clube Brasileiro"
            titleSize="lg"
          />
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
                aspectRatio: "16/9",
                borderRadius: "var(--radius-card)",
                boxShadow: "0 24px 48px rgba(10,22,40,0.22), 0 4px 16px rgba(10,22,40,0.1)",
              }}
            >
              {playing ? (
                <iframe
                  src="https://www.youtube.com/embed/QrRoMpiAGXg?autoplay=1&rel=0&modestbranding=1"
                  title="Iate Clube Brasileiro"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              ) : (
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 w-full h-full group"
                  aria-label="Reproduzir vídeo do Iate Clube Brasileiro"
                >
                  {/* Fundo navy */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at 50% 40%, #1E3A5F 0%, #0D1F3C 60%, #070F1E 100%)" }}
                  />

                  {/* Vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(5,10,20,0.55) 100%)" }}
                  />

                  {/* Logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/images/logo-timao-contorno.png"
                      alt="Logo Iate Clube Brasileiro"
                      width={260}
                      height={260}
                      className="object-contain w-[42%] h-auto"
                      style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.4))" }}
                    />
                  </div>

                  {/* "Fundado em 1906" */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-6 pb-4">
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
                    <span className="text-xs font-medium uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.35)" }}>
                      Fundado em 1906
                    </span>
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
                  </div>

                  {/* Botão play */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(10,22,40,0.35)" }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: RED }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </button>
              )}
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

      </div>
    </section>
  );
}
