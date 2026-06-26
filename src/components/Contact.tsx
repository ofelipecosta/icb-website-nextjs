"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const RED  = "#B22222";
const NAVY = "#0A1628";
const INK  = "var(--color-ink)";

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const departments = [
  {
    name: "Secretaria Social",
    desc: "Atendimento geral, associação e informações sobre o clube.",
    contacts: [
      { type: "tel",      label: "(21) 2714-8252",    href: "tel:+552127148252" },
      { type: "whatsapp", label: "(21) 98556-4487",   href: "https://wa.me/5521985564487" },
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
      { type: "whatsapp", label: "(21) 98556-4485",    href: "https://wa.me/5521985564485" },
      { type: "email",    label: "financeiro@icb.org.br", href: "mailto:financeiro@icb.org.br" },
    ],
  },
  {
    name: "Eventos",
    desc: "Salão de festas, eventos sociais e reservas.",
    contacts: [
      { type: "whatsapp", label: "(21) 97370-3932",       href: "https://wa.me/5521973703932" },
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
    desc: "Canal para sugestões, elogios, reclamações e denúncias.",
    contacts: [
      { type: "email", label: "ouvidoria@icb.org.br", href: "mailto:ouvidoria@icb.org.br" },
    ],
  },
];

function ContactButton({ c }: { c: { type: string; label: string; href: string } }) {
  const isWa    = c.type === "whatsapp";
  const isEmail = c.type === "email";

  if (isWa) {
    return (
      <a
        href={c.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${c.label}`}
        className="inline-flex items-center gap-2 font-semibold text-sm rounded-lg cursor-pointer transition-all duration-200 active:scale-95"
        style={{
          backgroundColor: "#25D366",
          color: "#fff",
          padding: "10px 16px",
          minHeight: 44,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1ebc5a"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#25D366"; }}
      >
        <WaIcon /> {c.label}
      </a>
    );
  }

  if (isEmail) {
    return (
      <a
        href={c.href}
        aria-label={`E-mail ${c.label}`}
        className="inline-flex items-center gap-2 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 active:scale-95"
        style={{
          border: "1px solid #D1D5DB",
          color: "#4B5563",
          padding: "10px 16px",
          minHeight: 44,
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = NAVY;
          e.currentTarget.style.color = NAVY;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#D1D5DB";
          e.currentTarget.style.color = "#4B5563";
        }}
      >
        <MailIcon /> {c.label}
      </a>
    );
  }

  // tel
  return (
    <a
      href={c.href}
      aria-label={`Telefone ${c.label}`}
      className="inline-flex items-center gap-2 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 active:scale-95"
      style={{
        color: "#6B7280",
        padding: "10px 0",
        minHeight: 44,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = NAVY; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "#6B7280"; }}
    >
      <Phone className="w-4 h-4" /> {c.label}
    </a>
  );
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contato" className="section-py px-6" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Masthead — horizontal, left-aligned */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-start gap-4 mb-12"
          style={{ paddingBottom: "1.5rem", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
        >
          <span
            className="w-1 rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: RED, height: "3.5rem" }}
          />
          <div>
            <p className="text-xs tracking-[0.28em] uppercase font-semibold mb-2" style={{ color: RED }}>
              Fale Conosco
            </p>
            <h2
              className="font-display font-black leading-none"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: INK }}
            >
              Entre em Contato
            </h2>
            <p className="mt-2 text-sm leading-relaxed max-w-md" style={{ color: "#6B7280" }}>
              Encontre o departamento certo e fale diretamente com quem pode ajudar.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10">

          {/* Departments — 2 cols on md+ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4 content-start"
          >
            {departments.map((dept, i) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.06 }}
                className="rounded-xl p-5 flex flex-col gap-3"
                style={{
                  backgroundColor: "#ffffff",
                  border:       "1px solid rgba(0,0,0,0.07)",
                  borderRadius: "var(--radius-card)",
                  boxShadow:    "var(--shadow-luxury)",
                }}
              >
                <div>
                  <h3 className="font-semibold text-sm leading-snug" style={{ color: INK }}>{dept.name}</h3>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#9CA3AF" }}>
                    {dept.desc}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  {dept.contacts.map((c) => (
                    <ContactButton key={c.href} c={c} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: address + hours + map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col gap-4"
          >
            {/* Address + Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: "#ffffff", border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: RED }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: INK }}>Endereço</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  Estrada Leopoldo Fróes, 400<br />
                  São Francisco, Niterói — RJ<br />
                  CEP 24360-005
                </p>
              </div>
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: "#ffffff", border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 flex-shrink-0" style={{ color: RED }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: INK }}>Horário</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  Ter a dom<br />
                  08h às 20h<br />
                  <span style={{ color: "#D1D5DB" }}>Seg. fechado</span>
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden flex-1" style={{ minHeight: 300 }}>
              <iframe
                title="Localização Iate Clube Brasileiro"
                src="https://maps.google.com/maps?q=Iate+Clube+Brasileiro,+Niterói,+RJ&output=embed&hl=pt-BR"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: 300 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

        </div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10"
        >
          <ContactForm />
        </motion.div>

      </div>
    </section>
  );
}
