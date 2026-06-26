"use client";

import { useActionState, useRef } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const RED = "#B22222";
const INK = "var(--color-ink)";

const initial: ContactState = { status: "idle" };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const formRef = useRef<HTMLFormElement>(null);

  if (state.status === "success") {
    formRef.current?.reset();
  }

  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      <h3 className="font-display font-bold text-lg mb-1" style={{ color: INK }}>
        Envie uma mensagem
      </h3>
      <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
        Responderemos em até 1 dia útil.
      </p>

      {state.status === "success" && (
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6 text-sm font-medium"
          style={{ backgroundColor: "rgba(16,185,129,0.08)", color: "#065f46" }}
        >
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Mensagem enviada! Entraremos em contato em breve.
        </div>
      )}

      {state.status === "error" && (
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6 text-sm font-medium"
          style={{ backgroundColor: "rgba(178,34,34,0.07)", color: RED }}
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {state.message}
        </div>
      )}

      <form ref={formRef} action={action} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nome completo" name="nome" type="text" placeholder="João Silva" />
          <Field label="E-mail" name="email" type="email" placeholder="joao@email.com" />
        </div>
        <Field label="Assunto" name="assunto" type="text" placeholder="Ex: Informações sobre associação" />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: INK }}>
            Mensagem
          </label>
          <textarea
            name="mensagem"
            rows={5}
            placeholder="Descreva como podemos ajudar..."
            required
            className="w-full rounded-lg px-4 py-3 text-sm resize-none outline-none transition-all duration-200"
            style={{
              border: "1px solid #E5E7EB",
              color: INK,
              backgroundColor: "#FAFAFA",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = RED; e.currentTarget.style.backgroundColor = "#fff"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.backgroundColor = "#FAFAFA"; }}
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="self-start flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg transition-opacity disabled:opacity-60"
          style={{ backgroundColor: RED }}
        >
          <Send className="w-4 h-4" />
          {pending ? "Enviando…" : "Enviar mensagem"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, type, placeholder }: { label: string; name: string; type: string; placeholder: string }) {
  const RED = "#B22222";
  const INK = "var(--color-ink)";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: INK }}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200"
        style={{ border: "1px solid #E5E7EB", color: INK, backgroundColor: "#FAFAFA" }}
        onFocus={(e) => { e.currentTarget.style.borderColor = RED; e.currentTarget.style.backgroundColor = "#fff"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.backgroundColor = "#FAFAFA"; }}
      />
    </div>
  );
}
