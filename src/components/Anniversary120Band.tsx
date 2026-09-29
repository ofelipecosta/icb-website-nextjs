import Link from "next/link";
import HistoryVideo from "@/components/HistoryVideo";

const RED = "#B22222";
const INK = "#16202E";

export default function Anniversary120Band() {
  return (
    <section
      className="section-py px-6 bg-white"
      style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Texto (esquerda no desktop) */}
        <div className="order-2 lg:order-1">
          <div className="w-9 h-0.5 mb-5" style={{ backgroundColor: RED }} />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] mb-3" style={{ color: RED }}>
            120 anos · 1906–2026
          </p>
          <h2
            className="font-display font-bold leading-tight mb-4"
            style={{ color: INK, fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
          >
            Uma história que começou em 1906
          </h2>
          <p className="leading-relaxed max-w-md mb-6" style={{ color: "#4A5666", fontSize: "1rem" }}>
            O primeiro clube de vela do Brasil conta sua trajetória em vídeo.
            Reviva 120 anos de tradição náutica, esporte e vida social às margens
            da Baía de Guanabara.
          </p>
          <Link
            href="/historia"
            className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
            style={{ color: RED }}
          >
            Conheça nossa história
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* Vídeo (direita no desktop, topo no mobile) */}
        <div className="order-1 lg:order-2">
          <HistoryVideo />
        </div>
      </div>
    </section>
  );
}
