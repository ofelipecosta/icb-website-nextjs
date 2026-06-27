"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FlowButton } from "@/components/ui/flow-button";

const RED = "#B22222";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: 560 }}
    >
      <Image
        src="/images/hero1.png"
        alt="Vista aérea do Iate Clube Brasileiro"
        fill
        className="object-cover object-[20%_center] sm:object-center"
        priority
        quality={88}
        style={{ filter: "saturate(1.12) contrast(1.04) brightness(1.02)" }}
      />

      {/* Scrim direcional — escurece à esquerda, foto aparece à direita */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.60) 35%, rgba(10,22,40,0.20) 62%, rgba(10,22,40,0) 100%)",
        }}
      />

      {/* Content — centralizado verticalmente no banner */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ zIndex: 10 }}
      >
        <div className="w-full px-6 sm:pl-14 lg:pl-24 max-w-2xl">
          {/* Accent line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "36px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="h-[2px] mb-5"
            style={{ backgroundColor: RED }}
          />

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Niterói · RJ · Desde 1906
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display font-bold leading-[1.05] mb-5"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              color: "white",
            }}
          >
            O Primeiro<br />
            Clube de <em className="not-italic" style={{ color: RED }}>Vela</em><br />
            do Brasil
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="leading-relaxed mb-8 font-light max-w-md"
            style={{
              fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
              color: "rgba(255,255,255,0.68)",
            }}
          >
            120 anos de tradição náutica, esporte e vida social
            às margens da Baía de Guanabara, em Niterói.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <FlowButton
              text="Área do Associado"
              onClick={() => window.open("https://icb.areadosocio.com.br/#/entrada", "_blank")}
              variant="red"
              className="w-full sm:w-auto whitespace-nowrap"
            />
            <FlowButton
              text="Seja Sócio"
              onClick={() => { window.location.href = "/seja-socio"; }}
              variant="dark"
              className="w-full sm:w-auto whitespace-nowrap"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
