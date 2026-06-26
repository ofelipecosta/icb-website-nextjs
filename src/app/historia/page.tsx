import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

const RED = "#B22222";
const INK = "#16202E";

export const metadata = {
  title: "História — Iate Clube Brasileiro",
  description: "Fundado em 10 de setembro de 1906 — o primeiro clube de iatismo do Brasil.",
};

const timeline = [
  {
    ano: "1906",
    titulo: "A ideia nasce no mar",
    texto: 'Estamos em 1906. Um belo dia de sol aquece os velejadores que passeiam nas águas da Baía de Guanabara. Entre as poucas velas que panejam, somente uma delas interessa à nossa história: é a do cúter “Marajó”. A bordo estão o jornalista Eduardo Motta e o proprietário Armando Leite. Conversa puxa conversa e surge a ideia de se fundar um clube de vela.',
  },
  {
    ano: "10 set. 1906",
    titulo: "A reunião fundadora",
    texto: "O idealizador Armando Leite, coadjuvado por Eduardo Motta, realizam a primeira reunião de fundação no dia 10 de setembro de 1906, na sede da então Federação das Sociedades de Remo, antigamente situada à Rua do Rosário nº 135. Presidida pelo Cel. Ferreira Aguiar e secretariada por Ernesto Curvello e Eduardo Motta, compareceram cerca de 30 pessoas. Ao final da reunião inaugural, apenas quatro sócios pagaram a primeira mensalidade então instituída.",
  },
  {
    ano: "1906",
    titulo: "Primeiros sócios e a primeira sede",
    texto: 'À fundação, seguiu-se uma campanha nos jornais para angariar novos sócios. Os amantes da vela Armando Leite e Eduardo Motta foram procurados pelo Sr. Saldanha da Gama, como representante do Sr. Simensen, para saber se eram aceitos sócios estrangeiros. Em virtude da resposta afirmativa, foram procurados no dia seguinte pelo próprio Simensen, que representava 25 estrangeiros — alguns proprietários de barcos — que proporcionaram um impulso significativo ao clube. O local da primeira sede era na Praia das Saudades nº 24 – Botafogo. Fundou-se desta maneira o "Yacht Club Brasileiro", o primeiro núcleo da vela na Guanabara e no Brasil.',
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
        <PageHeader
          eyebrow="O Clube"
          title="História"
          description="Fundado em 10 de setembro de 1906 — o primeiro clube de iatismo do Brasil."
          breadcrumb={[{ label: "O Clube", href: "/#sobre" }, { label: "História" }]}
          stats={[
            { value: "1906", label: "Fundação" },
            { value: "120",  label: "Anos" },
            { value: "1.°",  label: "Do Brasil" },
          ]}
        />

        {/* Pull-quote */}
        <FadeIn>
          <div className="px-6 py-16" style={{ backgroundColor: "var(--color-surface)" }}>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <span
                  className="absolute -top-4 -left-2 font-display font-bold leading-none select-none pointer-events-none"
                  aria-hidden="true"
                  style={{ fontSize: "6rem", color: RED, opacity: 0.1, lineHeight: 1 }}
                >
                  &ldquo;
                </span>
                <blockquote
                  className="relative font-display text-xl md:text-2xl leading-relaxed pl-8"
                  style={{ color: INK, fontStyle: "italic", opacity: 0.7 }}
                >
                  Está cheia de altos e baixos, mas de uma coisa estamos certos, tudo mudou: homens, barcos, aspectos do clube. Contudo, o grande amor pela vida marítima permanece inalterável. Na história do primeiro clube de vela no Brasil, notaremos sempre que o mar está em primeiro plano.
                </blockquote>
                <div className="flex items-center gap-3 mt-6 pl-8">
                  <span className="w-8 h-px" style={{ backgroundColor: RED }} />
                  <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--color-anchor)" }}>
                    Crônica do clube · acervo ICB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="px-6 py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-14">
              <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: RED }}>
                Linha do tempo
              </p>
              <h2 className="font-display font-bold" style={{ color: INK, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                Como tudo começou
              </h2>
            </div>
            <div className="relative">
              <div
                className="absolute top-2 bottom-2 w-px hidden sm:block"
                style={{ left: "6.5rem", backgroundColor: "rgba(0,0,0,0.07)" }}
              />
              <div className="flex flex-col gap-14">
                {timeline.map((item, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className="flex gap-6 sm:gap-10">
                      <div className="flex-shrink-0 w-24 text-right pt-0.5">
                        <span className="font-display font-bold text-xs leading-tight block" style={{ color: RED, letterSpacing: "0.05em" }}>
                          {item.ano}
                        </span>
                      </div>
                      <div className="relative hidden sm:flex flex-col items-center flex-shrink-0" style={{ width: 14 }}>
                        <div
                          className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: RED, boxShadow: `0 0 0 3px #fff, 0 0 0 4px ${RED}` }}
                        />
                      </div>
                      <div className="flex-1 -mt-0.5">
                        <h3 className="font-display font-bold mb-3 leading-snug" style={{ color: INK, fontSize: "1.125rem" }}>
                          {item.titulo}
                        </h3>
                        <p style={{ color: "var(--color-ink-soft)", fontSize: "0.9375rem", lineHeight: 1.85 }}>
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
          <div className="px-6 py-16" style={{ backgroundColor: "var(--color-surface)" }}>
            <div className="max-w-4xl mx-auto">
              <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: RED }}>
                Registros históricos
              </p>
              <h2 className="font-display font-bold mb-12" style={{ color: INK, fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                O clube nos primeiros anos
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { src: "/images/historia/foto01.jpg", caption: "Primeira sede do clube · início do século XX" },
                  { src: "/images/historia/foto02.jpg", caption: "Sede histórica do ICB · acervo do clube" },
                ].map((foto, i) => (
                  <figure
                    key={i}
                    className="overflow-hidden group"
                    style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-luxury)" }}
                  >
                    <div className="relative overflow-hidden bg-[#EEF2F6]" style={{ aspectRatio: "4/3" }}>
                      <Image
                        src={foto.src}
                        alt={foto.caption}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <figcaption
                      className="px-5 py-3.5 text-xs flex items-center gap-2 bg-white"
                      style={{ color: "var(--color-anchor)", borderTop: "1px solid rgba(0,0,0,0.07)" }}
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
          <div className="px-6 py-16 bg-white">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: RED }}>1906</p>
              <h2 className="font-display font-bold mb-12" style={{ color: INK, fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                Os Fundadores
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fundadores.map((f) => (
                  <div
                    key={f.nome}
                    className="flex items-center gap-4 bg-white card-hover-sm"
                    style={{
                      borderRadius: "var(--radius-card)",
                      padding: "1rem",
                      boxShadow: "var(--shadow-luxury)",
                      border: "1px solid rgba(0,0,0,0.07)",
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-white text-base"
                      style={{ backgroundColor: "var(--color-navy)" }}
                    >
                      {f.nome.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm leading-snug" style={{ color: INK }}>{f.nome}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-anchor)" }}>{f.papel}</p>
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
