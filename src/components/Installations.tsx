"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Anchor, Utensils, Dumbbell, Ship, Waves, Building2,
  X, ChevronLeft, ChevronRight, Images, type LucideIcon,
} from "lucide-react";
import { urlFor, type InstalacaoSanity } from "@/lib/sanity";

const RED = "#B22222";

// ─── Static fallback ─────────────────────────────────────────────────────────

const staticInstallations = [
  { title: "Marina",           description: "Marina completa com vagas para embarcações de todos os tamanhos, com acesso 24h e serviços de manutenção.", fallbackColor: "from-blue-900 to-[#0A1628]" },
  { title: "Restaurante & Bar",description: "Gastronomia de excelência com vista panorâmica para a Baía de Guanabara e menu de frutos do mar.",            fallbackColor: "from-amber-900 to-[#0A1628]" },
  { title: "Salões de Eventos",description: "Espaços versáteis para festas, reuniões corporativas e comemorações, com capacidade para até 500 pessoas.",    fallbackColor: "from-slate-700 to-[#0A1628]" },
  { title: "Esporte Náutico",  description: "Escola de vela, remo e natação com instrutores certificados para todas as idades e níveis.",                   fallbackColor: "from-teal-900 to-[#0A1628]" },
  { title: "Academia",         description: "Academia equipada e quadras poliesportivas para os sócios manterem a forma com qualidade.",                    fallbackColor: "from-gray-800 to-[#0A1628]" },
  { title: "Churrasqueiras",   description: "Áreas de churrasqueira exclusivas disponíveis para reserva pelos sócios com vista para o mar.",                fallbackColor: "from-orange-900 to-[#0A1628]" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  marina: Ship, restaurante: Utensils, sal: Building2, academia: Dumbbell, churrasco: Anchor, n: Waves,
};

function getIcon(title: string): LucideIcon {
  const key = title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  for (const [k, Icon] of Object.entries(iconMap)) {
    if (key.includes(k)) return Icon;
  }
  return Anchor;
}

function getFallbackColor(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("marina"))      return "from-blue-900 to-[#0A1628]";
  if (t.includes("restaurante")) return "from-amber-900 to-[#0A1628]";
  if (t.includes("sal"))         return "from-slate-700 to-[#0A1628]";
  if (t.includes("academia"))    return "from-gray-800 to-[#0A1628]";
  if (t.includes("churrasco"))   return "from-orange-900 to-[#0A1628]";
  return "from-teal-900 to-[#0A1628]";
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface CardItem {
  title: string;
  description: string;
  imageUrl?: string;
  photos: string[];      // full-res for lightbox
  cardPhotos: string[];  // medium-res for card carousel
  thumbs: string[];      // small for thumbnail strip
  fallbackColor: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

// ─── Slide variants ──────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
};

const slideTransition = { duration: 0.38, ease: [0.32, 0, 0.67, 0] as const };

// ─── Photo Modal ─────────────────────────────────────────────────────────────

function PhotoModal({ item, onClose }: { item: CardItem; onClose: () => void }) {
  const [[idx, dir], setSlide] = useState<[number, number]>([0, 0]);
  const thumbsRef  = useRef<HTMLDivElement>(null);
  const activeRef  = useRef<HTMLButtonElement>(null);
  const { photos, thumbs } = item;

  const navigate = useCallback((newIdx: number) => {
    const d = newIdx > idx ? 1 : -1;
    setSlide([newIdx, d]);
  }, [idx]);

  const prev = useCallback(() => navigate((idx - 1 + photos.length) % photos.length), [idx, navigate, photos.length]);
  const next = useCallback(() => navigate((idx + 1) % photos.length), [idx, navigate, photos.length]);

  // Keyboard nav + scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  // Scroll active thumb into view
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [idx]);

  const hasManyPhotos = photos.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(5, 10, 20, 0.96)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 16 }}
        animate={{ scale: 1,    opacity: 1, y: 0 }}
        exit={   { scale: 0.96, opacity: 0, y: 16 }}
        transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
        className="relative flex flex-col w-full mx-4"
        style={{ maxWidth: 900, borderRadius: 16, overflow: "hidden", background: "#0d1b30" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", color: "#fff" }}
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── Main image + swipe ─────────────────────────────────────────── */}
        <div className="relative overflow-hidden select-none" style={{ aspectRatio: "16/9" }}>
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={idx}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                const threshold = 60;
                if (info.offset.x < -threshold || info.velocity.x < -400) next();
                else if (info.offset.x > threshold || info.velocity.x > 400) prev();
              }}
            >
              {photos[idx] ? (
                <Image
                  src={photos[idx]}
                  alt={`${item.title} — foto ${idx + 1}`}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 900px) 100vw, 900px"
                  priority
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${item.fallbackColor}`} />
              )}
              {/* Subtle vignette */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)" }} />
            </motion.div>
          </AnimatePresence>

          {/* Counter pill */}
          {hasManyPhotos && (
            <div
              className="absolute top-3 left-3 z-20 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.9)" }}
            >
              {idx + 1} / {photos.length}
            </div>
          )}

          {/* Arrow buttons */}
          {hasManyPhotos && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", color: "#fff" }}
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", color: "#fff" }}
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* ── Thumbnail strip ────────────────────────────────────────────── */}
        {hasManyPhotos && (
          <div
            ref={thumbsRef}
            className="flex gap-2 px-4 py-3 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {thumbs.map((url, i) => (
              <motion.button
                key={i}
                ref={i === idx ? activeRef : null}
                onClick={() => navigate(i)}
                whileTap={{ scale: 0.94 }}
                className="relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-250"
                style={{
                  width: 72, height: 48,
                  outline: i === idx ? `2px solid ${RED}` : "2px solid transparent",
                  outlineOffset: 1,
                  opacity: i === idx ? 1 : 0.45,
                  transform: i === idx ? "scale(1.05)" : "scale(1)",
                }}
                aria-label={`Ver foto ${i + 1}`}
              >
                <Image
                  src={url}
                  alt={`Miniatura ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </motion.button>
            ))}
          </div>
        )}

        {/* ── Info bar ──────────────────────────────────────────────────── */}
        <div
          className="flex items-start justify-between gap-4 px-5 pb-5"
          style={{ paddingTop: hasManyPhotos ? 0 : 16 }}
        >
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold text-white leading-tight">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-sm leading-relaxed mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                {item.description}
              </p>
            )}
          </div>
          {item.ctaLabel && item.ctaUrl && (
            <a
              href={item.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 hover:brightness-110"
              style={{ backgroundColor: RED, color: "#fff" }}
            >
              {item.ctaLabel}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function InstallationCard({
  item, i, inView, onOpen,
}: {
  item: CardItem; i: number; inView: boolean; onOpen: () => void;
}) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [hovered,  setHovered ] = useState(false);
  const wasDrag = useRef(false);
  const Icon    = getIcon(item.title);
  const photos  = item.cardPhotos;
  const count   = photos.length;
  const hasPhotos = count > 0;

  const goNext = () => setPhotoIdx((p) => (p + 1) % count);
  const goPrev = () => setPhotoIdx((p) => (p - 1 + count) % count);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (Math.abs(info.offset.x) > 8) {
      wasDrag.current = true;
      if (info.offset.x < -50 || info.velocity.x < -250) goNext();
      else if (info.offset.x > 50 || info.velocity.x > 250) goPrev();
    }
  };

  const handleClick = () => {
    if (wasDrag.current) { wasDrag.current = false; return; }
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ minHeight: 280 }}
    >
      {/* Swipeable photo layer */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={photoIdx}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          drag={count > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ touchAction: count > 1 ? "pan-y" : "auto" }}
        >
          {hasPhotos ? (
            <Image
              src={photos[photoIdx]}
              alt={`${item.title} — foto ${photoIdx + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${item.fallbackColor}`}>
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

      {/* Red border on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl border pointer-events-none"
        style={{ borderColor: RED }}
        animate={{ opacity: hovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-end pointer-events-none" style={{ minHeight: 280 }}>
        <div className="mb-auto">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
            <Icon className="w-6 h-6" style={{ color: RED }} />
          </div>
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold text-white mb-2">{item.title}</h3>
          <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.6)" }}>
            {item.description}
          </p>

          {/* Dot indicators + red line */}
          <div className="flex items-center gap-3 mt-4">
            <motion.div
              className="h-px flex-1"
              style={{ background: `linear-gradient(to right, ${RED}, transparent)`, transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            {count > 1 && (
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {Array.from({ length: count }).map((_, di) => (
                  <div
                    key={di}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: di === photoIdx ? 18 : 6,
                      height: 6,
                      backgroundColor: di === photoIdx ? RED : "rgba(255,255,255,0.45)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface InstallationsProps {
  sanityData?: InstalacaoSanity[];
}

export default function Installations({ sanityData = [] }: InstallationsProps) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });
  const [modal, setModal] = useState<CardItem | null>(null);

  const items: CardItem[] =
    sanityData.length > 0
      ? sanityData.map((doc) => ({
          title:         doc.titulo,
          description:   doc.texto ?? "",
          imageUrl:      doc.fotos?.[0] ? urlFor(doc.fotos[0]).width(800).height(560).url() : undefined,
          cardPhotos:    doc.fotos?.map((f) => urlFor(f).width(800).height(560).fit("crop").url()) ?? [],
          photos:        doc.fotos?.map((f) => urlFor(f).width(1400).height(900).url())           ?? [],
          thumbs:        doc.fotos?.map((f) => urlFor(f).width(144).height(96).fit("crop").url()) ?? [],
          fallbackColor: getFallbackColor(doc.titulo),
          ctaLabel:      doc.ctaLabel,
          ctaUrl:        doc.ctaUrl,
        }))
      : staticInstallations.map((s) => ({ ...s, imageUrl: undefined, cardPhotos: [], photos: [], thumbs: [], ctaLabel: undefined, ctaUrl: undefined }));

  return (
    <>
      <section id="instalacoes" className="section-py navy-ambient px-6">
        <div className="max-w-7xl mx-auto" ref={ref}>
          {/* Masthead — horizontal, left-aligned, consistent with News/Events */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-end justify-between gap-6 mb-12 relative overflow-hidden"
            style={{ paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Left: bar + title + subtitle */}
            <div className="flex items-start gap-4">
              <span
                className="w-1 rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: RED, height: "3.5rem" }}
              />
              <div>
                <p className="text-xs tracking-[0.28em] uppercase font-semibold mb-2" style={{ color: RED }}>
                  Estrutura
                </p>
                <h2
                  className="font-display font-black text-white leading-none"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
                >
                  Instalações do ICB
                </h2>
                <p className="mt-2 text-sm leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Infraestrutura completa para lazer, esporte e convivência.
                </p>
              </div>
            </div>

          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <InstallationCard key={item.title} item={item} i={i} inView={inView} onOpen={() => setModal(item)} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modal && <PhotoModal item={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </>
  );
}
