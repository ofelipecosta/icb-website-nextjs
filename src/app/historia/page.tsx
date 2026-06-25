import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumb from "@/components/Breadcrumb";
import FadeIn from "@/components/FadeIn";

const RED  = "#B22222";
const NAVY = "#0A1628";
const INK  = "#111827";

export const metadata = {
  title: "Nossa História — Iate Clube Brasileiro",
  description: "Fundado em 10 de setembro de 1906 — o primeiro clube de iatismo do Brasil.",
};

const timeline = [
  {
    ano: "1906",
    titulo: "A ideia nasce no mar",
    texto: "Estamos em 1906. Um belo dia de sol aquece os velejadores que passeiam nas águas da Baía de Guanabara. Entre as poucas velas que panejam, somente uma delas interessa à nossa história: é a do cúter “Marajó”. A bordo estão o jornalista Eduardo Motta e o proprietário Armando Leite. Conversa puxa conversa e surge a ideia de se fundar um clube de vela.",
  },
  {
    ano: "10 set. 1906",
    titulo: "A reunião fundadora",
    texto: "O idealizador Armando Leite, coadjuvado por Eduardo Motta, realizam a primeira reunião de fundação no dia 10 de setembro de 1906, na sede da então Federação das Sociedades de Remo, antigamente situada à Rua do Rosário nº 135. Presidida pelo Cel. Ferreira Aguiar e secretariada por Ernesto Curvello e Eduardo Motta, compareceram cerca de 30 pessoas. Ao final da reunião inaugural, apenas quatro sócios pagaram a primeira mensalidade então instituída.",
  },
  {
    ano: "1906",
    titulo: "Primeiros sócios e a primeira sede",
    texto: "À fundação, seguiu-se uma campanha nos jornais para angariar novos sócios. Os amantes da vela Armando Leite e Eduardo Motta foram procurados pelo Sr. Saldanha da Gama, como representante do Sr. Simensen, para saber se eram aceitos sócios estrangeiros. Em virtude da resposta afirmativa, foram procurados no dia seguinte pelo próprio Simensen, que representava 25 estrangeiros — alguns proprietários de barcos — que proporcionaram um impulso significativo ao clube. O local da primeira sede era na Praia das Saudades nº 24 – Botafogo. Fundou-se desta maneira o “Yacht Club Brasileiro”, o primeiro núcleo da vela na Guanabara e no Brasil.",
  },
];

const fundadores = [
  { nome: "Armando Leite",        papel: "Idealizador" },
  { nome: "Eduardo Motta",        papel: "Jornalista · Co-fundador" },
  { nome: "Cel. Ferreira Aguiar", papel: "Presidente da reunião inaugural" },
  { nome: "Ernesto Curvello",     papel: "Secretário" },
  { nome: "Sr. Saldanha da Gama", papel: "Membro fundador" },
  { nome: "Sr. Simensen",         papel: "Representante de 25 sócios estrangeiros" },
];

export default function HistoriaPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — two-column layout */}
        <div className="relative overflow-hidden navy-ambient">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(ellipse at 80% 20%, rgba(178,34,34,0.2) 0%, transparent 60%)" }}
          />

          <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative">
            <div className="mb-10">
              <Breadcrumb items={[{ label: "O Clube", href: "/#sobre" }, { label: "Nossa História" }]} />
            </div>

            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
              {/* Left — text */}
              <div>
                <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: RED }}>
                  O Clube
                </p>
                <h1
                  className="font-display font-bold text-white leading-[0.95] mb-6"
                  style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
                >
                  Nossa<br />
                  <em className="not-italic" style={{ color: RED }}>História</em>
                </h1>
                <p className="text-base leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Fundado em 10 de setembro de 1906 — o primeiro clube de iatismo do Brasil.
                </p>
              </div>

              {/* Right — year badge */}
              <div className="hidden lg:flex flex-col items-end gap-2 pb-1">
                <span
                  className="font-display font-black leading-none select-none"
                  style={{
                    fontSize: "clamp(5rem, 10vw, 8rem)",
                    color: "rgba(255,255,255,0.04)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  1906
                </span>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px" style={{ backgroundColor: RED }} />
                  <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: RED }}>
                    Fundação
                  </span>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div
              className="mt-12 grid grid-cols-3 gap-px"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {[
                { value: "120", label: "Anos de história" },
                { value: "1906", label: "Ano de fundação" },
                { value: "1°", label: "Clube de iatismo do Brasil" },
              ].map((stat) => (
                <div key={stat.label} className="pt-6 pr-6">
                  <p className="font-display font-black text-2xl text-white leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pull-quote — impactful typographic style */}
        <FadeIn>
        <div className="px-6 py-20" style={{ backgroundColor: "#0D1E38" }}>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Large decorative opening quote */}
              <span
                className="absolute -top-6 -left-2 font-display font-black leading-none select-none pointer-events-none"
                aria-hidden="true"
                style={{ fontSize: "8rem", color: RED, opacity: 0.15, lineHeight: 1 }}
              >
                &ldquo;
              </span>
              <blockquote
                className="relative font-display text-xl md:text-2xl leading-relaxed pl-8"
                style={{ color: "rgba(255,255,255,0.82)", fontStyle: "italic" }}
              >
                Está cheia de altos e baixos, mas de uma coisa estamos certos, tudo mudou: homens, barcos, aspectos do clube. Contudo, o grande amor pela vida marítima permanece inalterável. Na história do primeiro clube de vela no Brasil, notaremos sempre que o mar está em primeiro plano.
              </blockquote>
              <div className="flex items-center gap-3 mt-8 pl-8">
                <span className="w-10 h-px" style={{ backgroundColor: RED }} />
                <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: RED }}>
                  Crônica do clube · acervo ICB
                </span>
              </div>
            </div>
          </div>
        </div>

        </FadeIn>
        {/* Timeline */}
        <div className="px-6 py-20" style={{ backgroundColor: "#FAFAFA" }}>
          <div className="max-w-4xl mx-auto">
            <div className="mb-14">
              <p className="text-xs tracking-[0.25em] uppercase font-bold mb-3" style={{ color: RED }}>
                Linha do tempo
              </p>
              <h2 className="font-display font-bold" style={{ color: INK, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                Como tudo começou
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line — offset to align with dots */}
              <div
                className="absolute top-2 bottom-2 w-px hidden sm:block"
                style={{ left: "6.5rem", backgroundColor: "#E5E7EB" }}
              />

              <div className="flex flex-col gap-14">
                {timeline.map((item, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                  <div className="flex gap-6 sm:gap-10">
                    {/* Year */}
                    <div className="flex-shrink-0 w-24 text-right pt-0.5">
                      <span
                        className="font-display font-black text-xs leading-tight block"
                        style={{ color: RED, letterSpacing: "0.05em" }}
                      >
                        {item.ano}
                      </span>
                    </div>

                    {/* Dot + line connector */}
                    <div className="relative hidden sm:flex flex-col items-center flex-shrink-0" style={{ width: 14 }}>
                      <div
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: RED, boxShadow: `0 0 0 3px #FAFAFA, 0 0 0 4px ${RED}` }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 -mt-0.5">
                      <h3
                        className="font-display font-bold mb-3 leading-snug"
                        style={{ color: INK, fontSize: "1.125rem" }}
                      >
                        {item.titulo}
                      </h3>
                      <p
                        className="leading-relaxed"
                        style={{ color: "#4B5563", fontSize: "0.9375rem", lineHeight: 1.85 }}
                      >
                        {item.texto}
                      </p>
                    </div>
                  </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fotos históricas */}
        <FadeIn>
        <div className="px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs tracking-[0.25em] uppercase font-bold mb-3" style={{ color: RED }}>
              Registros históricos
            </p>
            <h2
              className="font-display font-bold mb-12"
              style={{ color: INK, fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
            >
              O clube nos primeiros anos
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { src: "/images/historia/foto01.jpg", caption: "Primeira sede do clube · início do século XX" },
                { src: "/images/historia/foto02.jpg", caption: "Sede histórica do ICB · acervo do clube" },
              ].map((foto, i) => (
                <figure
                  key={i}
                  className="overflow-hidden rounded-xl group"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                >
                  <div className="relative overflow-hidden bg-[#F3F0E8]" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={foto.src}
                      alt={foto.caption}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption
                    className="px-5 py-3.5 text-xs flex items-center gap-2"
                    style={{ color: "#6B7280", backgroundColor: "#F9FAFB", borderTop: "1px solid #E5E7EB" }}
                  >
                    <span className="w-4 h-px flex-shrink-0" style={{ backgroundColor: RED }} />
                    {foto.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        {/* Fundadores */}
        <div className="px-6 py-20" style={{ backgroundColor: "#FAFAFA" }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-xs tracking-[0.25em] uppercase font-bold mb-3" style={{ color: RED }}>1906</p>
            <h2
              className="font-display font-bold mb-12"
              style={{ color: INK, fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
            >
              Os Fundadores
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fundadores.map((f) => (
                <div
                  key={f.nome}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 transition-shadow duration-200 hover:shadow-md"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB" }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-white text-base"
                    style={{ backgroundColor: NAVY }}
                  >
                    {f.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-snug" style={{ color: INK }}>{f.nome}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{f.papel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </FadeIn>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
