"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ChevronRight, Send } from "lucide-react";

const benefits = [
  "Acesso à marina e áreas náuticas",
  "Restaurante e bar com preços exclusivos",
  "Participação em regatas e competições",
  "Escola de vela para toda a família",
  "Reserva de salões e churrasqueiras",
  "Academia e quadras poliesportivas",
  "Eventos sociais exclusivos",
  "Desconto em parceiros e estabelecimentos",
];

const plans = [
  {
    name: "Individual",
    description: "Para o entusiasta do mar",
    highlight: false,
  },
  {
    name: "Familiar",
    description: "Para toda a família",
    highlight: true,
  },
  {
    name: "Jovem",
    description: "Até 30 anos",
    highlight: false,
  },
];

export default function Membership() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    plano: "Familiar",
    mensagem: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send to the backend/email
    setSubmitted(true);
  };

  return (
    <section id="socio" className="section-py bg-white px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[var(--color-red)] text-xs tracking-[0.3em] uppercase font-semibold mb-4"
          >
            Associação
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-navy)] leading-tight mb-6"
          >
            Faça Parte desta
            <br />
            <em className="not-italic text-[var(--color-red)]">Tradição</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[var(--color-anchor)] max-w-xl mx-auto text-base leading-relaxed"
          >
            Ser sócio do Iate Clube Brasileiro é pertencer a mais de um século
            de história, esporte e convivência de alto nível.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl font-semibold text-[var(--color-navy)] mb-8">
              Benefícios Exclusivos
            </h3>
            <div className="grid gap-4 mb-10">
              {benefits.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--color-red)]/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-[var(--color-red)]" />
                  </div>
                  <span className="text-[var(--color-navy)]/70 text-sm">{b}</span>
                </motion.div>
              ))}
            </div>

            {/* Plan type selector */}
            <div className="rope-divider mb-8" />
            <h4 className="text-sm font-semibold text-[var(--color-navy)] uppercase tracking-widest mb-5">
              Modalidades
            </h4>
            <div className="grid gap-3">
              {plans.map((plan) => (
                <button
                  key={plan.name}
                  onClick={() => setFormData((p) => ({ ...p, plano: plan.name }))}
                  className={`flex items-center justify-between px-5 py-4 rounded-lg border-2 text-left transition-all duration-300 cursor-pointer ${
                    formData.plano === plan.name
                      ? "border-[var(--color-red)] bg-[var(--color-red)]/5"
                      : "border-[var(--color-ivory-dark)] hover:border-[var(--color-red)]/50"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-[var(--color-navy)] text-sm">{plan.name}</p>
                    <p className="text-[var(--color-anchor)] text-xs mt-0.5">{plan.description}</p>
                  </div>
                  {plan.highlight && (
                    <span className="text-xs bg-[var(--color-red)] text-[var(--color-navy)] px-2 py-0.5 rounded font-semibold">
                      Popular
                    </span>
                  )}
                  {formData.plano === plan.name && (
                    <ChevronRight className="w-4 h-4 text-[var(--color-red)]" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl p-8 shadow-luxury-lg">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-red)]/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-[var(--color-red)]" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[var(--color-navy)] mb-3">
                    Solicitação Enviada!
                  </h3>
                  <p className="text-[var(--color-anchor)] text-sm leading-relaxed">
                    Nossa equipe entrará em contato em até 48 horas úteis
                    para dar continuidade ao seu processo de associação.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-semibold text-[var(--color-navy)] mb-2">
                    Solicite Informações
                  </h3>
                  <p className="text-[var(--color-anchor)] text-sm mb-8">
                    Preencha o formulário e entraremos em contato.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="nome" className="block text-xs font-semibold text-[var(--color-navy)] uppercase tracking-wide mb-2">
                        Nome completo *
                      </label>
                      <input
                        id="nome"
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData((p) => ({ ...p, nome: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-[var(--color-ivory-dark)] rounded-lg text-[var(--color-navy)] text-sm focus:border-[var(--color-red)] focus:outline-none transition-colors duration-200 bg-[var(--color-ivory)]"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-[var(--color-navy)] uppercase tracking-wide mb-2">
                          E-mail *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-[var(--color-ivory-dark)] rounded-lg text-[var(--color-navy)] text-sm focus:border-[var(--color-red)] focus:outline-none transition-colors duration-200 bg-[var(--color-ivory)]"
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="telefone" className="block text-xs font-semibold text-[var(--color-navy)] uppercase tracking-wide mb-2">
                          Telefone
                        </label>
                        <input
                          id="telefone"
                          type="tel"
                          value={formData.telefone}
                          onChange={(e) => setFormData((p) => ({ ...p, telefone: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-[var(--color-ivory-dark)] rounded-lg text-[var(--color-navy)] text-sm focus:border-[var(--color-red)] focus:outline-none transition-colors duration-200 bg-[var(--color-ivory)]"
                          placeholder="(21) 99999-9999"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="plano" className="block text-xs font-semibold text-[var(--color-navy)] uppercase tracking-wide mb-2">
                        Modalidade de interesse
                      </label>
                      <select
                        id="plano"
                        value={formData.plano}
                        onChange={(e) => setFormData((p) => ({ ...p, plano: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-[var(--color-ivory-dark)] rounded-lg text-[var(--color-navy)] text-sm focus:border-[var(--color-red)] focus:outline-none transition-colors duration-200 bg-[var(--color-ivory)]"
                      >
                        {plans.map((p) => (
                          <option key={p.name} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="mensagem" className="block text-xs font-semibold text-[var(--color-navy)] uppercase tracking-wide mb-2">
                        Mensagem
                      </label>
                      <textarea
                        id="mensagem"
                        rows={3}
                        value={formData.mensagem}
                        onChange={(e) => setFormData((p) => ({ ...p, mensagem: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-[var(--color-ivory-dark)] rounded-lg text-[var(--color-navy)] text-sm focus:border-[var(--color-red)] focus:outline-none transition-colors duration-200 bg-[var(--color-ivory)] resize-none"
                        placeholder="Dúvidas ou informações adicionais..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 py-4 bg-[var(--color-navy)] text-white font-semibold rounded-lg text-sm tracking-wide hover:bg-[var(--color-navy-light)] transition-colors duration-300 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Enviar Solicitação
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
