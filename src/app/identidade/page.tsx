import Link from "next/link";
import { ArrowLeft, Anchor, Heart, Users, Star, Shield, Waves } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumb from "@/components/Breadcrumb";
import FadeIn from "@/components/FadeIn";

const RED  = "#B22222";
const NAVY = "#0A1628";
const INK  = "#111827";

export const metadata = {
  title: "Identidade e Filosofia — Iate Clube Brasileiro",
  description: "Conheça a missão, os valores e a filosofia do Iate Clube Brasileiro, o primeiro clube de iatismo do Brasil.",
};

const valores = [
  {
    icon: Anchor,
    titulo: "Tradição Náutica",
    texto: "Desde 1906, o ICB preserva e celebra a cultura do mar, formando velejadores e mantendo viva a paixão pela navegação na Baía de Guanabara.",
  },
  {
    icon: Users,
    titulo: "Comunidade",
    texto: "Somos um clube de pessoas. Cultivamos laços entre famílias, amigos e gerações, criando um ambiente de convivência saudável e acolhedora.",
  },
  {
    icon: Star,
    titulo: "Excelência",
    texto: "Buscamos os mais altos padrões em esporte, infraestrutura e serviços, honrando o legado de mais de um século de história.",
  },
  {
    icon: Heart,
    titulo: "Paixão pelo Mar",
    texto: "O amor à vida marítima é o fio que une todos os nossos associados. Ele é inalterável, como a própria história do clube.",
  },
  {
    icon: Shield,
    titulo: "Integridade",
    texto: "Conduzimos o clube com transparência, ética e responsabilidade, respeitando nossos associados, colaboradores e o meio ambiente.",
  },
  {
    icon: Waves,
    titulo: "Sustentabilidade",
    texto: "Como guardiões da Baía de Guanabara, temos compromisso com a preservação ambiental e com a náutica sustentável para as próximas gerações.",
  },
];

const bandeira = [
  { item: "Campo", descricao: "Vermelho — cor da paixão e do pioneirismo" },
  { item: "Estrelas", descricao: "Três estrelas brancas — representando os três estados fundadores: RJ, SP e MG" },
  { item: "Âncora", descricao: "Símbolo da tradição náutica e da estabilidade do clube" },
  { item: "Timão", descricao: "A roda do leme — representa a condução e o rumo do clube ao longo dos anos" },
  { item: "I.C.B.", descricao: "Iniciais de Iate Clube Brasileiro, presentes desde a fundação em 1906" },
];

export default function IdentidadePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div className="relative overflow-hidden navy-ambient">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at 70% 0%, rgba(178,34,34,0.25) 0%, transparent 65%)" }} />
          <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative">
            <div className="mb-8">
              <Breadcrumb items={[{ label: "O Clube", href: "/#sobre" }, { label: "Identidade e Filosofia" }]} />
            </div>
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: RED }}>O Clube</p>
            <h1 className="font-display font-bold text-white leading-tight mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}>
              Identidade &<br /><em className="not-italic" style={{ color: RED }}>Filosofia</em>
            </h1>
            <p className="text-base max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              O primeiro clube de iatismo do Brasil — nossa essência, nossos valores e o que nos move há mais de um século.
            </p>
          </div>
        </div>

        {/* Missão e Visão */}
        <FadeIn>
        <div className="px-6 py-16 bg-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-sm" style={{ backgroundColor: NAVY, borderTop: `3px solid ${RED}` }}>
              <p className="text-xs tracking-[0.25em] uppercase font-bold mb-3" style={{ color: RED }}>Missão</p>
              <h2 className="font-display font-bold text-white mb-4 text-xl leading-snug">
                Cultivar a paixão pelo mar e pelo esporte náutico
              </h2>
              <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                Proporcionar aos nossos associados e às suas famílias um ambiente de excelência náutica, esportiva e social, preservando a tradição de mais de um século e formando as novas gerações de velejadores brasileiros.
              </p>
            </div>
            <div className="p-8 rounded-sm" style={{ border: `1px solid #E5E7EB`, borderTop: `3px solid ${RED}` }}>
              <p className="text-xs tracking-[0.25em] uppercase font-bold mb-3" style={{ color: RED }}>Visão</p>
              <h2 className="font-display font-bold mb-4 text-xl leading-snug" style={{ color: INK }}>
                Ser o maior clube náutico do Brasil em tradição e qualidade
              </h2>
              <p className="leading-relaxed text-sm" style={{ color: "#4B5563" }}>
                Manter e expandir nossa posição como referência nacional no esporte a vela, reconhecidos pela qualidade das instalações, pela excelência das competições e pela força da nossa comunidade de associados.
              </p>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="px-6 py-16" style={{ backgroundColor: "#FAFAFA !important" } as any}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.25em] uppercase font-bold mb-2" style={{ color: RED }}>Nossos princípios</p>
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
                    className="bg-white p-6 rounded-sm"
                    style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(178,34,34,0.08)" }}>
                      <Icon className="w-5 h-5" style={{ color: RED }} />
                    </div>
                    <h3 className="font-display font-bold mb-2 text-base" style={{ color: INK }}>{v.titulo}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{v.texto}</p>
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
