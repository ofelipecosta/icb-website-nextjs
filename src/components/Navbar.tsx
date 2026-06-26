"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RED  = "#B22222";
const NAVY = "#0A1628";

function SocialInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SocialFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function SocialYoutube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.95A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

const navItems = [
  { name: "Início",      href: "#hero" },
  { name: "O Clube",     href: "#sobre" },
  { name: "Notícias",    href: "#noticias" },
  { name: "Eventos",     href: "#eventos" },
  { name: "Náutica",     href: "/nautica" },
  { name: "Instalações", href: "#instalacoes" },
  { name: "Contato",     href: "#contato" },
];

const dropdowns: Record<string, { label: string; href: string }[]> = {
  "O Clube": [
    { label: "História",               href: "/historia" },
    { label: "Identidade e Filosofia", href: "/identidade" },
    { label: "Administração",          href: "/administracao" },
    { label: "Documentos Oficiais",    href: "/documentos" },
  ],
};

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeItem,     setActiveItem]     = useState("Início");
  const [openDropdown,   setOpenDropdown]   = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const observerRef    = useRef<IntersectionObserver | null>(null);
  const dropdownTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const pathname = usePathname();
  const router   = useRouter();
  const isHome   = pathname === "/";

  // Navbar é "clara" (branca) quando: não é a home OU fez scroll
  const isLight = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ratios = new Map<string, number>();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.intersectionRatio));
        let bestId = "", bestRatio = 0;
        ratios.forEach((ratio, id) => { if (ratio > bestRatio) { bestRatio = ratio; bestId = id; } });
        const match = navItems.find((n) => n.href === `#${bestId}`);
        if (match) setActiveItem(match.name);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "-64px 0px 0px 0px" }
    );
    navItems.forEach(({ href }) => {
      if (!href.startsWith("#")) return;
      const el = document.querySelector(href);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [isHome]);

  const handleSelect = (href: string, name: string) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setActiveItem(name);
    if (href.startsWith("/")) {
      router.push(href);
    } else if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${href.replace(/^#/, "")}`);
    }
  };

  const openMenu  = (name: string) => {
    if (dropdownTimers.current[name]) clearTimeout(dropdownTimers.current[name]);
    setOpenDropdown(name);
  };
  const closeMenu = (name: string) => {
    dropdownTimers.current[name] = setTimeout(() => setOpenDropdown(null), 130);
  };

  // Cores derivadas do estado claro/escuro
  const linkColor        = isLight ? "rgba(16,32,46,0.62)"  : "rgba(255,255,255,0.65)";
  const linkHoverColor   = isLight ? NAVY                    : "#fff";
  const linkActiveColor  = isLight ? NAVY                    : "#fff";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: isLight
            ? "rgba(255,255,255,0.97)"
            : "linear-gradient(to bottom, rgba(10,22,40,0.72) 0%, transparent 100%)",
          backdropFilter:       isLight ? "blur(18px)" : "none",
          WebkitBackdropFilter: isLight ? "blur(18px)" : "none",
          borderBottom:         isLight ? "1px solid rgba(0,0,0,0.06)" : "none",
          transition: "background 0.35s ease, backdrop-filter 0.35s, border-color 0.35s, padding 0.25s",
          paddingTop:    scrolled ? "0.6rem"  : "1rem",
          paddingBottom: scrolled ? "0.6rem"  : "1rem",
          boxShadow:     isLight ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">

          {/* Logo — branco no hero, colorido no estado claro */}
          <Link href="/" className="flex-shrink-0" aria-label="Início">
            <Image
              src={isLight ? "/images/logo/logo-icb-colorido.png" : "/images/logo/timao-branco.png"}
              alt="Iate Clube Brasileiro"
              width={isLight ? 140 : 160}
              height={52}
              className="object-contain transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Menu principal">
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              const hasDrop  = !!dropdowns[item.name];
              const isOpen   = openDropdown === item.name;

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => hasDrop && openMenu(item.name)}
                  onMouseLeave={() => hasDrop && closeMenu(item.name)}
                >
                  <button
                    type="button"
                    onClick={() => hasDrop
                      ? setOpenDropdown(isOpen ? null : item.name)
                      : handleSelect(item.href, item.name)
                    }
                    aria-current={isActive ? "page" : undefined}
                    aria-haspopup={hasDrop ? "true" : undefined}
                    aria-expanded={hasDrop ? isOpen : undefined}
                    className="relative flex items-center gap-1 text-sm font-medium px-3.5 py-2 rounded-md cursor-pointer select-none whitespace-nowrap transition-colors duration-200"
                    style={{ color: isActive ? linkActiveColor : linkColor }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = linkHoverColor; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? linkActiveColor : linkColor; }}
                  >
                    {item.name}
                    {hasDrop && (
                      <ChevronDown
                        className="w-3.5 h-3.5 transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    )}

                    {/* Indicador ativo — linha vermelha sob o item */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-line"
                        aria-hidden
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                        style={{ backgroundColor: RED }}
                        initial={false}
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {hasDrop && isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0,  scale: 1    }}
                        exit={   { opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 min-w-[210px] rounded-xl overflow-hidden z-50"
                        style={{
                          background:   "#ffffff",
                          border:       "1px solid rgba(0,0,0,0.08)",
                          boxShadow:    "0 8px 28px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                        }}
                        onMouseEnter={() => openMenu(item.name)}
                        onMouseLeave={() => closeMenu(item.name)}
                      >
                        {dropdowns[item.name].map((sub, i) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => { setOpenDropdown(null); setActiveItem(item.name); }}
                            className="flex items-center px-5 py-3 text-sm transition-colors duration-150"
                            style={{
                              color:        "rgba(16,32,46,0.72)",
                              borderBottom: i < dropdowns[item.name].length - 1
                                ? "1px solid rgba(0,0,0,0.05)"
                                : "none",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "rgba(178,34,34,0.05)";
                              e.currentTarget.style.color = NAVY;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.color = "rgba(16,32,46,0.72)";
                            }}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Desktop: CTA Seja Sócio */}
          <Link
            href="/seja-socio"
            className="hidden lg:inline-flex items-center px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-85"
            style={{ backgroundColor: RED, color: "#fff", borderRadius: "var(--radius-btn)" }}
          >
            Seja Sócio
          </Link>

          {/* Hamburger mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg cursor-pointer transition-colors duration-200"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            style={{
              color:           isLight ? NAVY : "#fff",
              backgroundColor: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.1)",
            }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer — Opção C: drawer lateral com fundo claro */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 w-72 max-w-[85vw] z-50 flex flex-col overflow-y-auto"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "-4px 0 28px rgba(0,0,0,0.12)",
            }}
          >
            {/* Drawer header: logo colorido + fechar */}
            <div
              className="flex items-center justify-between px-6 pt-6 pb-5 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
            >
              <Image
                src="/images/logo/logo-icb-colorido.png"
                alt="Iate Clube Brasileiro"
                width={110}
                height={40}
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full cursor-pointer transition-colors duration-200 hover:bg-black/5"
                aria-label="Fechar menu"
                style={{ color: NAVY, backgroundColor: "rgba(22,32,46,0.06)" }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Eyebrow */}
            <div className="px-6 pt-5 pb-3 flex-shrink-0">
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: "rgba(22,32,46,0.28)" }}
              >
                Navegação
              </p>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col px-6 flex-1" aria-label="Menu mobile">
              {navItems.map((item, i) => {
                const isActive = activeItem === item.name;
                const hasDrop  = !!dropdowns[item.name];
                const isExp    = mobileExpanded === item.name;

                return (
                  <div key={item.href}>
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => {
                        if (hasDrop) {
                          setMobileExpanded(isExp ? null : item.name);
                        } else {
                          handleSelect(item.href, item.name);
                        }
                      }}
                      className="flex items-center justify-between w-full py-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="rounded-full flex-shrink-0 transition-all duration-200"
                          style={{
                            width: "3px",
                            height: "16px",
                            backgroundColor: isActive ? RED : "transparent",
                          }}
                        />
                        <span
                          className="text-base"
                          style={{
                            color:      isActive ? NAVY : "rgba(22,32,46,0.5)",
                            fontWeight: isActive ? 600 : 400,
                          }}
                        >
                          {item.name}
                        </span>
                      </div>
                      {hasDrop && (
                        <ChevronDown
                          className="w-4 h-4 transition-transform duration-200"
                          style={{
                            transform: isExp ? "rotate(180deg)" : "rotate(0deg)",
                            color: "rgba(22,32,46,0.28)",
                          }}
                        />
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {hasDrop && isExp && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {dropdowns[item.name].map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                              className="flex items-center pl-6 py-2.5 text-sm"
                              style={{ color: "rgba(22,32,46,0.4)" }}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* CTA mobile */}
            <div className="px-6 pb-4 pt-2 flex-shrink-0">
              <Link
                href="/seja-socio"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center py-3.5 text-sm font-semibold w-full transition-opacity hover:opacity-85"
                style={{ backgroundColor: RED, color: "#fff", borderRadius: "var(--radius-btn)" }}
              >
                Seja Sócio
              </Link>
            </div>

            {/* Rodapé com redes sociais */}
            <div
              className="px-6 py-5 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center gap-5">
                <a
                  href="https://instagram.com/iateclubebrasileiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-opacity duration-200 hover:opacity-50"
                  style={{ color: "rgba(22,32,46,0.38)" }}
                >
                  <SocialInstagram />
                </a>
                <a
                  href="https://facebook.com/iateclubebrasileiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-opacity duration-200 hover:opacity-50"
                  style={{ color: "rgba(22,32,46,0.38)" }}
                >
                  <SocialFacebook />
                </a>
                <a
                  href="https://youtube.com/@iateclubebrasileiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="transition-opacity duration-200 hover:opacity-50"
                  style={{ color: "rgba(22,32,46,0.38)" }}
                >
                  <SocialYoutube />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ backgroundColor: "rgba(10,22,40,0.5)", backdropFilter: "blur(3px)" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
