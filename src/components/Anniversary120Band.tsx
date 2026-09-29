import HistoryVideo from "@/components/HistoryVideo";

const RED_LIGHT = "#E57373";

export default function Anniversary120Band() {
  return (
    <section className="navy-ambient px-6 section-py">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] mb-4" style={{ color: RED_LIGHT }}>
            120 anos · 1906–2026
          </p>
          <h2
            className="font-display font-bold leading-tight mb-4"
            style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
          >
            Uma história que começou em 1906
          </h2>
          <p
            className="leading-relaxed max-w-md"
            style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}
          >
            O primeiro clube de vela do Brasil conta sua trajetória em vídeo.
            Assista ao documentário dos 120 anos do Iate Clube Brasileiro.
          </p>
        </div>
        <div>
          <HistoryVideo caption="" />
        </div>
      </div>
    </section>
  );
}
