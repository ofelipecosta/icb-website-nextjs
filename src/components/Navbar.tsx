"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TubelightNav } from "@/components/ui/tubelight-navbar";

const RED  = "#B22222";
const NAVY = "#0A1628";

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
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeItem,   setActiveItem]   = useState("Início");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const observerRef    = useRef<IntersectionObserver | null>(null);
  const dropdownTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const pathname       = usePathname();
  const router         = useRouter();
  const isHome         = pathname === "/";

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section tracker ── */
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

  const openMenu = (name: string) => {
    if (dropdownTimers.current[name]) clearTimeout(dropdownTimers.current[name]);
    setOpenDropdown(name);
  };

  const closeMenu = (name: string) => {
    dropdownTimers.current[name] = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: isHome
            ? scrolled ? `rgba(10,22,40,0.65)` : "linear-gradient(to bottom, rgba(10,22,40,0.75) 0%, transparent 100%)"
            : `rgba(10,22,40,0.75)`,
          backdropFilter: scrolled ? "blur(20px)" : isHome ? "none" : "blur(20px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : isHome ? "none" : "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
          transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s, padding 0.3s",
          paddingTop: scrolled ? "0.625rem" : "1.125rem",
          paddingBottom: scrolled ? "0.625rem" : "1.125rem",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Início">
            <Image
              src="/images/logo/timao-branco.png"
              alt="Iate Clube Brasileiro"
              width={200}
              height={75}
              className="object-contain drop-shadow-sm"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 py-1 px-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
            {navItems.map((item) => {
              const isActive  = activeItem === item.name;
              const hasDrop   = !!dropdowns[item.name];
              const isOpen    = openDropdown === item.name;

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => hasDrop && openMenu(item.name)}
                  onMouseLeave={() => hasDrop && closeMenu(item.name)}
                >
                  <button
                    type="button"
                    onClick={() => hasDrop ? setOpenDropdown(isOpen ? null : item.name) : handleSelect(item.href, item.name)}
                    aria-current={isActive ? "page" : undefined}
                    aria-haspopup={hasDrop ? "true" : undefined}
                    aria-expanded={hasDrop ? isOpen : undefined}
                    className="relative flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 select-none whitespace-nowrap"
                    style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.55)" }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {hasDrop && (
                      <ChevronDown
                        className="w-3.5 h-3.5 transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", color: "inherit" }}
                      />
                    )}

                    {/* Tubelight bg */}
                    {isActive && (
                      <motion.span
                        layoutId="tubelight-bg"
                        aria-hidden
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ backgroundColor: "rgba(178,34,34,0.22)" }}
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      >
                        <span
                          aria-hidden
                          className="absolute left-1/2 -translate-x-1/2 rounded-b-none rounded-t-full"
                          style={{ top: -1, width: 28, height: 2, backgroundColor: RED, display: "block" }}
                        >
                          <span aria-hidden style={{ display: "block", position: "absolute", top: -6, left: -12, width: 52, height: 18, backgroundColor: RED, opacity: 0.28, borderRadius: "50%", filter: "blur(8px)" }} />
                          <span aria-hidden style={{ display: "block", position: "absolute", top: -3, left: -4, width: 36, height: 10, backgroundColor: RED, opacity: 0.38, borderRadius: "50%", filter: "blur(4px)" }} />
                        </span>
                      </motion.span>
                    )}
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {hasDrop && isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 min-w-[200px] rounded-xl overflow-hidden shadow-2xl z-50"
                        style={{
                          backgroundColor: "rgba(10,22,40,0.97)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          backdropFilter: "blur(20px)",
                        }}
                        onMouseEnter={() => openMenu(item.name)}
                        onMouseLeave={() => closeMenu(item.name)}
                      >
                        {dropdowns[item.name].map((sub, i) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => { setOpenDropdown(null); setActiveItem(item.name); }}
                            className="flex items-center px-4 py-3 text-sm transition-colors duration-150"
                            style={{
                              color: "rgba(255,255,255,0.7)",
                              borderBottom: i < dropdowns[item.name].length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "rgba(178,34,34,0.12)";
                              e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
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

          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-white cursor-pointer"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 w-72 max-w-[85vw] z-50 flex flex-col pt-24 pb-8 px-7 overflow-y-auto"
            style={{ backgroundColor: NAVY, borderLeft: "1px solid rgba(255,255,255,0.08)" }}
          >
            <nav className="flex flex-col" aria-label="Menu mobile">
              {navItems.map((item, i) => {
                const isActive = activeItem === item.name;
                const hasDrop  = !!dropdowns[item.name];
                const isExp    = mobileExpanded === item.name;

                return (
                  <div key={item.href}>
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045 }}
                      onClick={() => {
                        if (hasDrop) {
                          setMobileExpanded(isExp ? null : item.name);
                        } else {
                          handleSelect(item.href, item.name);
                        }
                      }}
                      className="flex items-center justify-between w-full text-base font-medium text-left py-3.5 cursor-pointer"
                      style={{
                        color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {isActive && <span className="w-1 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: RED }} />}
                        {item.name}
                      </div>
                      {hasDrop && (
                        <ChevronDown
                          className="w-4 h-4 transition-transform duration-200"
                          style={{ transform: isExp ? "rotate(180deg)" : "rotate(0deg)", color: "rgba(255,255,255,0.4)" }}
                        />
                      )}
                    </motion.button>

                    {/* Mobile sub-items */}
                    <AnimatePresence>
                      {hasDrop && isExp && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          {dropdowns[item.name].map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                              className="flex items-center pl-6 py-3 text-sm"
                              style={{
                                color: "rgba(255,255,255,0.5)",
                                borderBottom: "1px solid rgba(255,255,255,0.04)",
                              }}
                            >
                              <span className="w-1 h-1 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: RED }} />
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
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
            style={{ backgroundColor: "rgba(10,22,40,0.55)", backdropFilter: "blur(3px)" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
