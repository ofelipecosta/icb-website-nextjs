"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import type { SocioSanity } from "@/lib/sanity";

const WHATSAPP = "https://wa.me/5521985564487";

const DEFAULT_BENEFITS = [
  "Acesso à marina e áreas náuticas",
  "Restaurante e bar com preços exclusivos",
  "Participação em regatas e competições",
  "Escola de vela para toda a família",
  "Reserva de salões e churrasqueiras",
  "Eventos sociais exclusivos",
];

const DEFAULT_PLANS = [
  { parcelas: 10, valorParcela: 1500, taxaInfo: "50% da taxa de manutenção em vigor durante o pagamento das parcelas", destaque: false },
  { parcelas: 15, valorParcela: 1000, taxaInfo: "Taxa de manutenção em vigor no valor integral", destaque: true },
  { parcelas: 24, valorParcela: 625,  taxaInfo: "Taxa de manutenção em vigor no valor integral", destaque: false },
];

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const WaIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

interface MembershipProps {
  sanityData?: SocioSanity | null;
}

export default function Membership({ sanityData }: MembershipProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const valorVenal      = sanityData?.valorVenal      ?? 15000;
  const taxaManutencao  = sanityData?.taxaManutencao  ?? 639.05;
  const taxaAno         = sanityData?.taxaAno         ?? 2025;
  const vagas           = sanityData?.vagas           ?? 50;
  const benefits        = sanityData?.beneficios?.length ? sanityData.beneficios : DEFAULT_BENEFITS;
  const plans           = sanityData?.planos?.length   ? sanityData.planos       : DEFAULT_PLANS;

  return (
    <section id="seja-socio" className="section-py px-6" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <SectionHeader
            eyebrow="Associação"
            title="Seja Sócio do ICB"
            description="Faça parte de mais de um século de história, esporte e convivência de alto nível."
            titleSize="lg"
          />
          <div
            className="inline-flex items-center gap-2 mt-5 px-4 py-2 text-xs font-semibold uppercase tracking-widest"
            style={{ backgroundColor: "rgba(178,34,34,0.08)", color: "var(--color-red)", borderRadius: "var(--radius-btn)" }}
          >
            Oportunidade limitada — {vagas} títulos disponíveis
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-14 items-start">

          {/* Left — valores + benefícios */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-3">
              <div
                className="p-5"
                style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "var(--radius-card)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-anchor)" }}>
                  Valor Venal do Título
                </p>
                <p className="font-display font-bold" style={{ fontSize: "1.75rem", color: "var(--color-ink)" }}>
                  R$ {formatBRL(valorVenal)}
                </p>
              </div>
              <div
                className="p-5"
                style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "var(--radius-card)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-anchor)" }}>
                  Taxa de Manutenção {taxaAno}
                </p>
                <p className="font-display font-bold" style={{ fontSize: "1.75rem", color: "var(--color-ink)" }}>
                  R$ {formatBRL(taxaManutencao)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-anchor)" }}>
                O que está incluído
              </p>
              <div className="flex flex-col gap-3">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(178,34,34,0.1)" }}
                    >
                      <Check className="w-3 h-3" style={{ color: "var(--color-red)" }} />
                    </div>
                    <span className="text-sm" style={{ color: "var(--color-anchor)" }}>{b}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — planos */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col gap-5"
          >
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-anchor)" }}>
              Condições de pagamento
            </p>

            {plans.map((p, i) => {
              const isDestaque = p.destaque ?? false;
              return (
                <motion.div
                  key={`${p.parcelas}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                  className="p-7 relative"
                  style={{
                    backgroundColor: isDestaque ? "var(--color-navy)" : "#fff",
                    border:      isDestaque ? "none" : "1px solid rgba(0,0,0,0.07)",
                    borderRadius: "var(--radius-card)",
                    boxShadow:   isDestaque ? "0 20px 48px rgba(10,22,40,0.18)" : "var(--shadow-luxury)",
                  }}
                >
                  {isDestaque && (
                    <span
                      className="absolute top-5 right-5 text-xs font-bold uppercase tracking-widest px-2 py-0.5"
                      style={{ backgroundColor: "var(--color-red)", color: "#fff", borderRadius: "4px" }}
                    >
                      Mais escolhido
                    </span>
                  )}
                  <div className="flex items-baseline gap-3 mb-2">
                    <span
                      className="font-display font-bold"
                      style={{ fontSize: "2.25rem", lineHeight: 1, color: isDestaque ? "var(--color-red)" : "var(--color-ink)" }}
                    >
                      {p.parcelas}×
                    </span>
                    <span
                      className="font-display font-semibold"
                      style={{ fontSize: "1.25rem", color: isDestaque ? "#fff" : "var(--color-ink)" }}
                    >
                      R$ {formatBRL(p.valorParcela)}
                    </span>
                  </div>
                  {p.taxaInfo && (
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: isDestaque ? "rgba(255,255,255,0.5)" : "var(--color-anchor)" }}
                    >
                      + {p.taxaInfo}
                    </p>
                  )}
                </motion.div>
              );
            })}

            {/* CTA */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 mt-2"
              style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
            >
              <p className="text-sm flex-1" style={{ color: "var(--color-anchor)" }}>
                Para iniciar o processo de associação, fale com a Secretaria Social.
              </p>
              <div className="flex items-center gap-3 flex-shrink-0">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#25D366", color: "#fff", borderRadius: "var(--radius-btn)" }}
                >
                  <WaIcon /> WhatsApp
                </a>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-60"
                  style={{ color: "var(--color-red)" }}
                >
                  Contatos <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
