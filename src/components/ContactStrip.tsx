import { MapPin, Clock, Phone } from "lucide-react";

const WHATSAPP   = "https://wa.me/5521985564487";
const TEL_HREF   = "tel:+552127148252";
const TEL_LABEL  = "(21) 2714-8252";
const MAPS_URL   = "https://maps.google.com/?q=Estrada+Leopoldo+Fróes+400+Niterói+RJ";

const RED = "#B22222";

const WaIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

export default function ContactStrip() {
  return (
    <section id="contato" className="section-py px-6" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch"
          style={{
            backgroundColor: "#fff",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: "var(--radius-card)",
            padding: "2rem",
            boxShadow: "var(--shadow-luxury)",
          }}
        >
          {/* Left — info + actions */}
          <div className="flex-1 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: RED }}>
                Contato
              </p>
              <h2
                className="font-display font-bold mb-5"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--color-ink)" }}
              >
                Fale com o ICB
              </h2>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(178,34,34,0.07)" }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: RED }} />
                  </div>
                  <p className="text-sm leading-snug" style={{ color: "var(--color-ink-soft)" }}>
                    Est. Leopoldo Fróes, 400 · São Francisco, Niterói — RJ
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(178,34,34,0.07)" }}
                  >
                    <Clock className="w-4 h-4" style={{ color: RED }} />
                  </div>
                  <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
                    Ter a dom, 08h às 20h &nbsp;·&nbsp;{" "}
                    <span style={{ color: "var(--color-anchor)" }}>Seg. fechado</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={TEL_HREF}
                className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-3 transition-opacity hover:opacity-75"
                style={{
                  backgroundColor: RED,
                  color: "#fff",
                  borderRadius: "var(--radius-btn)",
                }}
              >
                <Phone className="w-4 h-4" />
                {TEL_LABEL}
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-3 transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#25D366", color: "#fff", borderRadius: "var(--radius-btn)" }}
              >
                <WaIcon />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Right — map */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden flex-shrink-0 flex items-center justify-center"
            style={{
              width: "clamp(200px, 35%, 320px)",
              minHeight: "180px",
              borderRadius: "var(--radius-card)",
              backgroundColor: "var(--color-surface)",
              border: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <iframe
              title="Localização do Iate Clube Brasileiro"
              src="https://maps.google.com/maps?q=Estrada+Leopoldo+Fr%C3%B3es+400+Niter%C3%B3i+RJ&output=embed&z=15"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0, pointerEvents: "none" }}
              loading="lazy"
            />
            <div
              className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(10,22,40,0.45)" }}
            >
              <span className="text-xs font-semibold text-white uppercase tracking-widest">
                Ver no Google Maps →
              </span>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}
