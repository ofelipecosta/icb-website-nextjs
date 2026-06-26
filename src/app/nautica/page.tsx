import Image from "next/image";
import { ExternalLink, Leaf, Anchor, Ship, Warehouse, Wind, Wrench, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeader from "@/components/PageHeader";
import { getRegatas, type RegatasSanity } from "@/lib/sanity";
import { formatDateLong } from "@/lib/utils";

const RED  = "#B22222";
const INK  = "#16202E";

export const metadata = {
  title: "Náutica — Iate Clube Brasileiro",
  description: "Calendário de regatas, velas e serviços da Secretaria Náutica do Iate Clube Brasileiro.",
};

const FALLBACK_REGATAS: RegatasSanity[] = [
  { _id: "fr-1", titulo: "Interclubes de Niterói",           classes: "ILCA 4 · ILCA 6 · Optimist", data: "2026-06-28", inscricoes: "https://regatas.icb.org.br" },
  { _id: "fr-2", titulo: "3.º Campeonato Interclube — Vela", classes: "Snipe · Laser · Optimist",    data: "2026-08-15", inscricoes: "https://regatas.icb.org.br" },
  { _id: "fr-3", titulo: "Regata da Primavera",               classes: "Todas as classes",            data: "2026-09-21", inscricoes: "https://regatas.icb.org.br" },
  { _id: "fr-4", titulo: "Copa ICB de Fim de Ano",            classes: "ILCA · Snipe · ORC",         data: "2026-11-29", inscricoes: "https://regatas.icb.org.br" },
];

const servicos = [
  { icon: Anchor,    titulo: "Vagas Náuticas",      desc: "Locação e venda de vagas para embarcações de variadas capacidades." },
  { icon: Ship,      titulo: "Descida e Subida",    desc: "Serviço de descida e subida de embarcações de segunda a sexta, das 08h às 17h." },
  { icon: Warehouse, titulo: "Estacionamento Seco", desc: "Área de estacionamento seco e galpão para guarda de embarcações." },
  { icon: Package,   titulo: "Vagas Cobertas",      desc: "Vagas cobertas especialmente para lanchas, com segurança e proteção." },
  { icon: Wind,      titulo: "Guarda de Wind Surf", desc: "Espaço dedicado para guarda de pranchas e equipamentos de wind surf." },
  { icon: Wrench,    titulo: "Oficina de Reparos",  desc: "Oficina especializada para reparos e manutenção de embarcações." },
];


const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

export default async function NauticaPage() {
  const sanityRegatas = await getRegatas().catch(() => []);
  const regatas = sanityRegatas.length > 0 ? sanityRegatas : FALLBACK_REGATAS;

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Náutica"
          title="Velas & Regatas"
          description="Calendário de competições, serviços náuticos e infraestrutura completa para sua embarcação na Baía de Guanabara."
          breadcrumb={[{ label: "Náutica" }]}
          image="/images/vela.png"
          imageAlt="Marina do Iate Clube Brasileiro"
          variant="image-side"
        />

        {/* Sobre o departamento */}
        <div id="secretaria-info" className="px-6 py-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: RED }}>Secretaria Náutica</p>
            <h2 className="font-display font-bold mb-8" style={{ color: INK, fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              Infraestrutura completa para sua embarcação
            </h2>
            <div className="grid md:grid-cols-[1fr_420px] gap-10 items-start">
              <div className="flex flex-col gap-5 text-base leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                <p>
                  O setor de Náutica do Iate Clube Brasileiro oferece aos associados a possibilidade de locação e venda de vagas náuticas, assim como o serviço de descida e subida das embarcações de 08h às 17h. A área náutica do Clube conta com Estacionamento Seco, Galpão, vagas cobertas para lancha e guarderia de Wind Surf. Nesses espaços é possível a guarda de embarcações das mais variadas capacidades. Para conforto dos associados náuticos, o Clube proporciona espaços com oficinas de reparos, boxes de apoio e armários.
                </p>
                <p>
                  Para a utilização da rampa e dos guindastes, os associados devem respeitar os nossos termos e condições de uso. Os serviços da secretaria náutica contam com uma equipe técnica especializada para o seu auxílio. Recentemente implantamos o Plano de Emergência Individual Simplificado – PEI do Iate Clube Brasileiro, de acordo com a Resolução CONAMA Nº 398, de 11 de junho de 2008.
                </p>
              </div>
              <div className="relative w-full aspect-[4/3] overflow-hidden" style={{ borderRadius: "var(--radius-card)" }}>
                <Image
                  src="/images/vela.png"
                  alt="Marina do Iate Clube Brasileiro"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Calendário de Regatas */}
        <div id="regatas" className="px-6 py-16" style={{ backgroundColor: "var(--color-surface)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: RED }}>Temporada 2026</p>
                <h2 className="font-display font-bold" style={{ color: INK, fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
                  Calendário de Regatas
                </h2>
              </div>
              <a
                href="https://regatas.icb.org.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: RED, color: "#fff", borderRadius: "var(--radius-btn)" }}
              >
                <ExternalLink className="w-4 h-4" /> Portal de Inscrições
              </a>
            </div>
            <div
              className="flex flex-col items-center justify-center text-center py-16 px-8"
              style={{
                border: "1px dashed rgba(0,0,0,0.12)",
                borderRadius: "var(--radius-card)",
                backgroundColor: "#ffffff",
              }}
            >
              <p className="text-3xl mb-4" aria-hidden="true">⚓</p>
              <h3 className="font-display font-bold text-xl mb-2" style={{ color: INK }}>Em breve</h3>
              <p className="text-sm max-w-sm leading-relaxed" style={{ color: "var(--color-anchor)" }}>
                O calendário de regatas da Temporada 2026 será divulgado em breve pela Secretaria Náutica.
              </p>
              <a
                href="https://regatas.icb.org.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-sm font-bold px-5 py-2.5 transition-opacity duration-200 hover:opacity-80"
                style={{ border: `1px solid ${RED}`, color: RED, borderRadius: "var(--radius-btn)" }}
              >
                <ExternalLink className="w-4 h-4" /> Acessar Portal de Inscrições
              </a>
            </div>
          </div>
        </div>

        {/* Serviços */}
        <div className="px-6 py-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: RED }}>Infraestrutura</p>
            <h2 className="font-display font-bold mb-10" style={{ color: INK, fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              Nossos Serviços
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {servicos.map(({ icon: Icon, titulo, desc }) => (
                <div
                  key={titulo}
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
                  <h3 className="font-display font-semibold text-base mb-2" style={{ color: INK }}>{titulo}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-anchor)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compromisso ambiental */}
        <div className="px-6 py-12" style={{ backgroundColor: "var(--color-surface)" }}>
          <div className="max-w-5xl mx-auto">
            <div
              className="flex gap-6 items-start p-8"
              style={{
                borderRadius: "var(--radius-card)",
                border: "1px solid rgba(0,0,0,0.07)",
                backgroundColor: "#ffffff",
                boxShadow: "var(--shadow-luxury)",
              }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(10,22,40,0.05)" }}>
                <Leaf className="w-6 h-6" style={{ color: "var(--color-anchor)" }} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-3" style={{ color: INK }}>Compromisso Ambiental</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-ink-soft)" }}>
                  O ICB implementou o Plano de Emergência Individual Simplificado (PEI) conforme a Resolução CONAMA nº 398/2008, com procedimentos rigorosos contra derramamentos acidentais de óleo na Baía de Guanabara.
                </p>
                <ul className="space-y-1.5">
                  {[
                    "Gestão responsável dos resíduos gerados pelas atividades náuticas",
                    "Prevenção e controle de riscos de poluição na Baía de Guanabara",
                    "Preservação dos recursos naturais com redução de consumo de líquidos",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-ink-soft)" }}>
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: "var(--color-anchor)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contato Secretaria Náutica */}
        <div id="secretaria" className="px-6 py-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display font-bold mb-2" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: INK }}>
              Fale com a Secretaria Náutica
            </h2>
            <p className="mb-8 text-sm" style={{ color: "var(--color-anchor)" }}>
              Para vagas, serviços e informações sobre sua embarcação.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/5521985564489"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-3 transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: "#25D366", color: "#fff", borderRadius: "var(--radius-btn)" }}
              >
                <WaIcon /> (21) 98556-4489
              </a>
              <a
                href="mailto:vela@icb.org.br"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 transition-opacity duration-200 hover:opacity-80"
                style={{ border: "1px solid rgba(0,0,0,0.12)", color: INK, borderRadius: "var(--radius-btn)" }}
              >
                vela@icb.org.br
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
