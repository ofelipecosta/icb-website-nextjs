"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import Link from "next/link";

const RED  = "#B22222";
const NAVY = "#0A1628";

const WaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const departments = [
  {
    name: "Secretaria Social",
    desc: "Atendimento geral, associação e informações sobre o clube.",
    contacts: [
      { type: "tel",      label: "(21) 2714-8252",       href: "tel:+552127148252" },
      { type: "whatsapp", label: "(21) 98556-4487",       href: "https://wa.me/5521985564487" },
      { type: "email",    label: "secretaria@icb.org.br", href: "mailto:secretaria@icb.org.br" },
    ],
  },
  {
    name: "Secretaria Náutica",
    desc: "Vagas, serviços náuticos, velas e regatas.",
    contacts: [
      { type: "whatsapp", label: "(21) 98556-4489", href: "https://wa.me/5521985564489" },
      { type: "email",    label: "vela@icb.org.br", href: "mailto:vela@icb.org.br" },
    ],
  },
  {
    name: "Financeiro",
    desc: "Mensalidades, cobranças e assuntos financeiros.",
    contacts: [
      { type: "whatsapp", label: "(21) 98556-4485",       href: "https://wa.me/5521985564485" },
      { type: "email",    label: "financeiro@icb.org.br", href: "mailto:financeiro@icb.org.br" },
    ],
  },
  {
    name: "Eventos · Salão de Festas",
    desc: "Eventos sociais, reservas e celebrações.",
    contacts: [
      { type: "whatsapp", label: "(21) 97370-3932",          href: "https://wa.me/5521973703932" },
      { type: "email",    label: "salaodefestas@icb.org.br", href: "mailto:salaodefestas@icb.org.br" },
    ],
  },
  {
    name: "Comodoria",
    desc: "Contato direto com a Comodoria do clube.",
    contacts: [
      { type: "email", label: "comodoria@icb.org.br", href: "mailto:comodoria@icb.org.br" },
    ],
  },
  {
    name: "Ouvidoria",
    desc: "Sugestões, elogios, reclamações e denúncias.",
    contacts: [
      { type: "email", label: "ouvidoria@icb.org.br", href: "mailto:ouvidoria@icb.org.br" },
    ],
  },
];

function ContactBadge({ c }: { c: { type: string; label: string; href: string } }) {
  if (c.type === "whatsapp") {
    return (
      <a
        href={c.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
        style={{ backgroundColor: "#25D366", color: "#fff" }}
      >
        <WaIcon /> {c.label}
      </a>
    );
  }
  if (c.type === "email") {
    return (
      <a
        href={c.href}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-70"
        style={{ border: `1px solid rgba(178,34,34,0.3)`, color: RED }}
      >
        <MailIcon /> {c.label}
      </a>
    );
  }
  return (
    <a
      href={c.href}
      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-70"
      style={{ border: "1px solid rgba(0,0,0,0.12)", color: "var(--color-anchor)" }}
    >
      <Phone className="w-3 h-3" /> {c.label}
    </a>
  );
}

export default function ContactStrip() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contato" className="section-py px-6" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto" ref={ref}>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Coluna esquerda: editorial + endereço + mapa ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: RED }}>
              Contato
            </p>
            <h2
              className="font-display font-bold leading-tight mb-3"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--color-ink)" }}
            >
              Fale com o ICB
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--color-anchor)", maxWidth: 340 }}>
              Encontre o departamento certo e fale diretamente com quem pode ajudar.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(178,34,34,0.07)" }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: RED }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--color-ink)" }}>Endereço</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-anchor)" }}>
                    Est. Leopoldo Fróes, 400<br />
                    São Francisco, Niterói — RJ
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(178,34,34,0.07)" }}>
                  <Clock className="w-3.5 h-3.5" style={{ color: RED }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--color-ink)" }}>Horário</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-anchor)" }}>
                    Ter a dom · 08h às 20h<br />
                    <span style={{ opacity: 0.6 }}>Segunda fechado</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden" style={{ borderRadius: "var(--radius-card)", height: 200 }}>
              <iframe
                title="Localização Iate Clube Brasileiro"
                src="https://maps.google.com/maps?q=Iate+Clube+Brasileiro,+Niterói,+RJ&output=embed&hl=pt-BR"
                width="100%"
                height="200"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* ── Coluna direita: lista de departamentos ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {departments.map((dept, i) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                className="flex flex-col gap-2 py-4"
                style={{ borderBottom: i < departments.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none" }}
              >
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>{dept.name}</p>
                  <p className="text-xs leading-relaxed mt-0.5" style={{ color: "var(--color-anchor)" }}>{dept.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dept.contacts.map((c) => (
                    <ContactBadge key={c.href} c={c} />
                  ))}
                </div>
              </motion.div>
            ))}

            <div className="pt-5">
              <Link
                href="/contato"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-60"
                style={{ color: RED }}
              >
                Ver página de contato completa →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
