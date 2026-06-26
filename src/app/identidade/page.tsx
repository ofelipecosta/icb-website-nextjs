import { Anchor, Heart, Users, Star, Shield, Waves } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

const RED = "#B22222";
const INK = "#16202E";

export const metadata = {
  title: "Identidade — Iate Clube Brasileiro",
  description: "Conheça a missão, os valores e a filosofia do Iate Clube Brasileiro, o primeiro clube de iatismo do Brasil.",
};

const valores = [
  { icon: Anchor,  titulo: "Tradição Náutica",  texto: "Desde 1906, o ICB preserva e celebra a cultura do mar, formando velejadores e mantendo viva a paixão pela navegação na Baía de Guanabara." },
  { icon: Users,   titulo: "Comunidade",         texto: "Somos um clube de pessoas. Cultivamos laços entre famílias, amigos e gerações, criando um ambiente de convivência saudável e acolhedora." },
  { icon: Star,    titulo: "Excelência",          texto: "Buscamos os mais altos padrões em esporte, infraestrutura e serviços, honrando o legado de mais de um século de história." },
  { icon: Heart,   titulo: "Paixão pelo Mar",    texto: "O amor à vida marítima é o fio que une todos os nossos associados. Ele é inalterável, como a própria história do clube." },
  { icon: Shield,  titulo: "Integridade",         texto: "Conduzimos o clube com transparência, ética e responsabilidade, respeitando nossos associados, colaboradores e o meio ambiente." },
  { icon: Waves,   titulo: "Sustentabilidade",   texto: "Como guardiões da Baía de Guanabara, temos compromisso com a preservação ambiental e com a náutica sustentável para as próximas gerações." },
];

export default function IdentidadePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="O Clube"
          title="Identidade"
          description="Nossa essência, nossos valores e o que nos move há mais de um século."
          breadcrumb={[{ label: "O Clube", href: "/#sobre" }, { label: "Identidade" }]}
        />

        <FadeIn>
          {/* Missão e Visão */}
          <div className="px-6 py-16 bg-white">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              <div
                className="p-8"
                style={{
                  borderRadius: "var(--radius-card)",
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "var(--shadow-luxury)",
                  backgroundColor: "#ffffff",
                  borderTop: `3px solid ${RED}`,
                }}
              >
                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: RED }}>Missão</p>
                <h2 className="font-display font-bold mb-4 text-xl leading-snug" style={{ color: INK }}>
                  Cultivar a paixão pelo mar e pelo esporte náutico
                </h2>
                <p className="leading-relaxed text-sm" style={{ color: "var(--color-ink-soft)" }}>
                  Proporcionar aos nossos associados e às suas famílias um ambiente de excelência náutica, esportiva e social, preservando a tradição de mais de um século e formando as novas gerações de velejadores brasileiros.
                </p>
              </div>
              <div
                className="p-8"
                style={{
                  borderRadius: "var(--radius-card)",
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "var(--shadow-luxury)",
                  backgroundColor: "#ffffff",
                  borderTop: `3px solid ${RED}`,
                }}
              >
                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: RED }}>Visão</p>
                <h2 className="font-display font-bold mb-4 text-xl leading-snug" style={{ color: INK }}>
                  Ser o maior clube náutico do Brasil em tradição e qualidade
                </h2>
                <p className="leading-relaxed text-sm" style={{ color: "var(--color-ink-soft)" }}>
                  Manter e expandir nossa posição como referência nacional no esporte a vela, reconhecidos pela qualidade das instalações, pela excelência das competições e pela força da nossa comunidade de associados.
                </p>
              </div>
            </div>
          </div>

          {/* Valores */}
          <div className="px-6 py-16" style={{ backgroundColor: "var(--color-surface)" }}>
            <div className="max-w-5xl mx-auto">
              <div className="mb-12">
                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: RED }}>Nossos princípios</p>
                <h2 className="font-display font-bold" style={{ color: INK, fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
                  O que nos define
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {valores.map((v) => {
                  const Icon = v.icon;
                  return (
                    <div
                      key={v.titulo}
                      className="bg-white card-hover"
                      style={{
                        borderRadius: "var(--radius-card)",
                        padding: "1.5rem",
                        border: "1px solid rgba(0,0,0,0.07)",
                        boxShadow: "var(--shadow-luxury)",
                      }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(10,22,40,0.05)" }}>
                        <Icon className="w-5 h-5" style={{ color: RED }} />
                      </div>
                      <h3 className="font-display font-bold mb-2 text-base" style={{ color: INK }}>{v.titulo}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-anchor)" }}>{v.texto}</p>
                    </div>
                  );
                })}
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
