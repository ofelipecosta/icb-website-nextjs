"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor, type NoticiaSanity } from "@/lib/sanity";

const RED = "#B22222";
const INK = "#111827";

function stripEmoji(s: string): string {
  return s.replace(/\p{Emoji_Presentation}/gu, "").replace(/\p{Emoji}️/gu, "").trim();
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]}. ${y}`;
}

function formatDateShort(iso: string): string {
  const [, m, d] = iso.split("-");
  const months = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]}`;
}

const fallbacks = [
  "from-[#0A1628] to-[#1E3A5F]",
  "from-[#122040] to-[#1a4a7a]",
  "from-[#0d1f3c] to-[#163563]",
  "from-[#111827] to-[#1f2937]",
];

interface NewsProps {
  sanityData?: NoticiaSanity[];
}

export default function News({ sanityData = [] }: NewsProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const items = sanityData.length > 0 ? sanityData : [
    { _id: "1", titulo: "ICB conquista tri-campeonato na Copa Baía de Guanabara", slug: { current: "" }, data: "2025-03-12", resumo: "Nossos atletas da classe Laser confirmaram o favoritismo e trouxeram mais um título nacional para o clube." },
    { _id: "2", titulo: "Renovação completa da marina com novas vagas e serviços náuticos", slug: { current: "" }, data: "2025-03-05", resumo: "O ICB conclui a modernização com 30 novas vagas." },
    { _id: "3", titulo: "Baile de Carnaval reuniu mais de 800 sócios e convidados", slug: { current: "" }, data: "2025-02-28", resumo: "O tradicional Baile de Carnaval do ICB voltou com tudo em 2025." },
    { _id: "4", titulo: "Escola de Vela abre inscrições para temporada 2025", slug: { current: "" }, data: "2025-02-10", resumo: "Turmas para iniciantes e avançados a partir de março." },
  ];

  const featured  = items[0];
  const secondary = items.slice(1, 4);

  const featSlug = (featured as NoticiaSanity).slug?.current;
  const featImg  = (featured as NoticiaSanity).capa
    ? urlFor((featured as NoticiaSanity).capa!).width(1100).height(740).url()
    : null;

  return (
    <section
      id="noticias"
      className="navy-ambient"
    >
      <div className="max-w-7xl mx-auto px-6" ref={ref}>

        {/* ── Masthead ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
          style={{ paddingTop: "1rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-1 h-7 rounded-full flex-shrink-0"
              style={{ backgroundColor: RED }}
            />
            <span
              className="font-display font-black leading-none"
              style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              Notícias
            </span>
          </div>
          <Link
            href="/noticias"
            className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
            style={{ color: RED }}
          >
            Ver todas
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* ── Featured story ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ paddingTop: "2rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link
            href={featSlug ? `/noticias/${featSlug}` : "/noticias"}
            className="group grid md:grid-cols-[3fr_2fr] gap-10 items-center"
          >
            {/* Image */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "3/2", borderRadius: "2px" }}
            >
              {featImg ? (
                <Image
                  src={featImg}
                  alt={stripEmoji(featured.titulo)}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${fallbacks[0]}`} />
              )}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {featured.fixado && (
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-2 py-0.5"
                    style={{ backgroundColor: RED, color: "#fff" }}
                  >
                    Destaque
                  </span>
                )}
                <time className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {formatDate(featured.data)}
                </time>
              </div>

              <h3
                className="font-display font-black leading-tight transition-colors duration-200 group-hover:text-[#B22222]"
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
                  lineHeight: 1.1,
                }}
              >
                {stripEmoji(featured.titulo)}
              </h3>

              {(featured as NoticiaSanity & { resumo?: string }).resumo && (
                <p
                  className="leading-relaxed line-clamp-3"
                  style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}
                >
                  {(featured as NoticiaSanity & { resumo?: string }).resumo}
                </p>
              )}

              <div style={{ paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <span
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 group-hover:gap-3"
                  style={{ color: RED }}
                >
                  Ler matéria <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── Secondary stories (3-col) ── */}
        <div
          className="grid sm:grid-cols-3 gap-6"
          style={{ paddingTop: "1.75rem", paddingBottom: "2rem" }}
        >
          {secondary.map((item, i) => {
            const slug   = (item as NoticiaSanity).slug?.current;
            const imgUrl = (item as NoticiaSanity).capa
              ? urlFor((item as NoticiaSanity).capa!).width(600).height(380).url()
              : null;

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.22 + i * 0.09 }}
              >
                <Link href={slug ? `/noticias/${slug}` : "/noticias"} className="group h-full">
                  <div
                    className="h-full rounded-lg transition-all duration-300 flex flex-col"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #E5E7EB",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      overflow: "visible",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.borderColor = "#D1D5DB";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "#E5E7EB";
                    }}
                  >
                    {/* Image */}
                    <div
                      className="relative overflow-hidden flex-shrink-0 rounded-t-lg"
                      style={{ aspectRatio: "16/9" }}
                    >
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={stripEmoji(item.titulo)}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${fallbacks[(i + 1) % 4]}`} />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-3 flex-1 p-5">
                      <time
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: RED }}
                      >
                        {formatDate(item.data)}
                      </time>
                      <h4
                        className="font-display font-bold leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[#B22222]"
                        style={{ color: INK, fontSize: "1rem" }}
                      >
                        {stripEmoji(item.titulo)}
                      </h4>

                      {(item as NoticiaSanity & { resumo?: string }).resumo && (
                        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "#6B7A8D" }}>
                          {(item as NoticiaSanity & { resumo?: string }).resumo}
                        </p>
                      )}

                      <span
                        className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 mt-auto"
                        style={{ color: RED }}
                      >
                        Ler mais →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile "ver todas" */}
        <div
          className="flex justify-center pb-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem" }}
        >
          <Link
            href="/noticias"
            className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
            style={{ color: RED }}
          >
            Ver todas as notícias
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
