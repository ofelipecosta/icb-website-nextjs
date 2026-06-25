"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { FlowButton } from "@/components/ui/flow-button";

const RED = "#B22222";
const RED_LIGHT = "#CC3333";

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#sobre")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden navy-ambient"
    >
      {/* Background photo */}
      <Image
        src="/images/hero1.webp"
        alt="Vista aérea do Iate Clube Brasileiro"
        fill
        className="object-cover object-[20%_center] sm:object-center"
        priority
        quality={90}
      />

      {/* Light overlay — mantém texto legível */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.25)",
        }}
      />

      {/* Navy fade no bottom para transição suave com a próxima seção */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0A1628 0%, transparent 100%)" }}
      />

      {/* Content */}
      <div className="relative w-full text-left px-6 sm:pl-12 lg:pl-24 sm:pr-8 max-w-2xl pt-32 pb-10" style={{ zIndex: 10 }}>
        {/* Top accent line */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "60px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 mb-8"
          style={{ backgroundColor: RED }}
        />

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display font-bold leading-[1.05] mb-8"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "white" }}
        >
          O Primeiro<br />
          Clube de <em className="not-italic" style={{ color: RED }}>Vela</em><br />
          do Brasil
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl max-w-xl leading-relaxed mb-12 font-light"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          120 anos de tradição náutica, esporte e vida social
          às margens da Baía de Guanabara, em Niterói.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <button
            onClick={() => {
              window.open("https://icb.areadosocio.com.br/#/entrada", "_blank");
            }}
            className="px-8 py-3 font-semibold rounded tracking-wide text-sm w-full sm:w-auto text-center transition-all duration-300"
            style={{
              backgroundColor: RED,
              color: "#ffffff",
              boxShadow: "0 4px 15px rgba(178,34,34,0.5)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = RED_LIGHT)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = RED)}
          >
            Área do Associado
          </button>
          <FlowButton
            text="Conheça o Clube"
            onClick={() => document.querySelector("#sobre")?.scrollIntoView({ behavior: "smooth" })}
            variant="dark"
            className="w-full sm:w-auto justify-center"
          />
        </motion.div>

      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer transition-colors duration-300"
        style={{ color: "rgba(255,255,255,0.4)", zIndex: 10 }}
        aria-label="Rolar para baixo"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}
