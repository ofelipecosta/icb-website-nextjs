"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Waves, Star } from "lucide-react";
import Image from "next/image";

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
    text: "Um dos clubes mais tradicionais do Rio de Janeiro, com estrutura completa.",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="section-py bg-white px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Masthead — horizontal, left-aligned */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-start gap-4 mb-20"
          style={{ paddingBottom: "1.5rem", borderBottom: "1px solid #E5E7EB" }}
        >
          <span
            className="w-1 rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: "var(--color-red)", height: "3.5rem" }}
          />
          <div>
            <p className="text-xs tracking-[0.28em] uppercase font-semibold mb-2" style={{ color: "var(--color-red)" }}>
              Nossa História
            </p>
            <h2
              className="font-display font-black leading-none"
              style={{ color: "var(--color-navy)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
            >
              Iate Clube Brasileiro
            </h2>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Image placeholder with gradient */}
              <div
                className="aspect-[4/3] rounded-lg overflow-hidden shadow-luxury-lg"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 50%, var(--color-navy-mid) 100%)",
                }}
              >
                {/* Logo ICB */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/logo-timao-contorno.png"
                    alt="Logo Iate Clube Brasileiro"
                    width={380}
                    height={380}
                    className="object-contain drop-shadow-lg w-[60%] h-auto max-h-[85%]"
                  />
                </div>
                {/* Gold corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--color-red)]/60" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--color-red)]/60" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--color-red)]/60" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[var(--color-red)]/60" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[var(--color-red)] text-white rounded-lg p-4 shadow-luxury-lg">
                <p className="font-display text-2xl font-bold leading-none">120</p>
                <p className="text-xs font-semibold uppercase tracking-widest mt-1">Anos</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="font-display font-bold text-xl text-[var(--color-navy)]">
              Conheça o Iate Clube Brasileiro
            </h3>
            <p className="text-[var(--color-navy)]/70 text-lg leading-relaxed font-light">
              Coerente com a tradição de ser o primeiro clube de iatismo do Brasil, o Iate Clube Brasileiro sempre conferiu atenção especial às atividades náuticas, preconizando, desde seu primeiro estatuto, o pleno uso dos melhores hábitos marinheiros.
            </p>
            <p className="text-[var(--color-navy)]/70 text-lg leading-relaxed font-light">
              Além disso, o Clube tem por objetivo o congraçamento e aprimoramento físico, esportivo, artístico, recreativo, cultural e cívico do seu quadro associativo.
            </p>

          </motion.div>
        </div>

        {/* Four pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-navy)]/5 flex items-center justify-center mb-5 group-hover:bg-[var(--color-red)]/10 transition-colors duration-300">
                <pillar.icon className="w-6 h-6 text-[var(--color-red)]" />
              </div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-navy)] mb-3">
                {pillar.title}
              </h3>
              <p className="text-[var(--color-anchor)] text-sm leading-relaxed">
                {pillar.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
