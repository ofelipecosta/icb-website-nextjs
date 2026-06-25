import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RED  = "#B22222";
const NAVY = "#0A1628";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#ffffff" }}>
        <div
          className="relative flex-1 flex flex-col items-center justify-center text-center px-6 overflow-hidden"
          style={{ backgroundColor: NAVY, minHeight: "80vh" }}
        >
          {/* Watermark */}
          <span
            className="absolute select-none pointer-events-none font-display font-black"
            aria-hidden="true"
            style={{
              fontSize: "clamp(8rem, 30vw, 22rem)",
              color: "rgba(255,255,255,0.03)",
              lineHeight: 1,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              whiteSpace: "nowrap",
            }}
          >
            404
          </span>

          <div className="relative z-10 max-w-lg mx-auto">
            <p
              className="text-xs tracking-[0.3em] uppercase font-semibold mb-6"
              style={{ color: RED }}
            >
              Página não encontrada
            </p>
            <h1
              className="font-display font-bold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              Essa página<br />
              <em className="not-italic" style={{ color: RED }}>não existe</em>
            </h1>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              O endereço que você acessou não foi encontrado. Pode ter sido removido, renomeado ou nunca ter existido.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-80"
                style={{ backgroundColor: RED }}
              >
                Ir para o início
              </Link>
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-opacity hover:opacity-80"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                Ver notícias
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
