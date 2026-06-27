"use client";

import { Anchor } from "lucide-react";
import Image from "next/image";

const RED = "#B22222";
const NAVY = "#0A1628";

const footerLinks = {
  "O Clube": [
    { label: "Notícias", href: "/noticias" },
    { label: "Nossa História", href: "/historia" },
    { label: "Instalações", href: "/#instalacoes" },
    { label: "Administração", href: "/administracao" },
    { label: "Documentos Oficiais", href: "/documentos" },
    { label: "Identidade e Filosofia", href: "/identidade" },
  ],
  "Náutica": [
    { label: "Velas e Regatas", href: "/nautica" },
    { label: "Secretaria Náutica", href: "/nautica" },
    { label: "Eventos", href: "/eventos" },
  ],
  "Contato": [
    { label: "(21) 2714-8252", href: "tel:+552127148252" },
    { label: "secretaria@icb.org.br", href: "mailto:secretaria@icb.org.br" },
  ],
};

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/iateclubebrasileiro",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/iateclubebrasileiro",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="navy-ambient" style={{ borderTop: "2px solid rgba(178,34,34,0.4)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <Image
                src="/images/logo/timao-branco.png"
                alt="Iate Clube Brasileiro"
                width={180}
                height={60}
                className="object-contain"
              />
            </div>
            <p className="italic text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              "O primeiro clube de vela do Brasil."
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = RED; e.currentTarget.style.backgroundColor = "rgba(178,34,34,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)"; }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          © {new Date().getFullYear()} Iate Clube Brasileiro. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
