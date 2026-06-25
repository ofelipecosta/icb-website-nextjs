import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumb from "@/components/Breadcrumb";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Administração — Iate Clube Brasileiro",
  description: "Conheça a diretoria executiva e os conselhos do Iate Clube Brasileiro.",
};

const RED  = "#B22222";
const NAVY = "#0A1628";
const INK  = "#111827";

const diretoriaExecutiva = [
  { cargo: "Comodoro",                      nome: "Eduardo Augusto Granato de Carvalho" },
  { cargo: "Vice-Comodoro",                 nome: "Marcelo Cardoso Coelho" },
  { cargo: "Diretor Administrativo",        nome: "Luiz Antonio Alves" },
  { cargo: "Diretor Financeiro",            nome: "Eduardo Augusto Granato de Carvalho" },
  { cargo: "Diretor Médico",                nome: "Henrique Tostes Padilha Neto" },
  { cargo: "Diretor Social e de Eventos",   nome: "Marcelo Cardoso Coelho" },
  { cargo: "Diretor de Esporte",            nome: "Marcelo Cardoso Coelho" },
  { cargo: "Diretor Náutico e de Manutenção", nome: "Rafael Rocha Ramos" },
];

const conselhoDeliberativo = [
  { cargo: "Presidente",      nome: "Aline Rabello Rocha" },
  { cargo: "Vice-Presidente", nome: "Carlos Almir Magliano Gardel" },
  { cargo: "Secretário",      nome: "Eduardo Henrique Kopschitz de Barros" },
];

const conselhoFiscal = [
  { cargo: "Presidente",     nome: "Olympio Passos da Motta Neto" },
  { cargo: "Membro Efetivo", nome: "Alridio Jorge Maria Gomes de Carvalho" },
];

const acoes = [
  "Recuperar, através de manutenção corretiva, a infraestrutura física do Clube com obras de reparo e pintura geral;",
  "Readequação do quadro de funcionários, de forma a prestar um serviço de boa qualidade e condizentes com as nossas expectativas;",
  "Revisar e reorganizar os regulamentos internos e normas, de forma a estabelecer acesso e tratamento mais igualitário a todas as instalações e serviços do Clube;",
  "Incentivar a prática dos esportes e atividades compatíveis com a nossa natureza náutica e estrutura física, além das atividades de lazer;",
  "Reorganizar os serviços de bar e restaurante, para que possamos usufruir toda a infraestrutura e potencial social de que dispomos;",
  "Na medida em que avançarmos nos itens acima, criar opções de lazer com o objetivo de cativar cada vez mais o associado.",
];

function MemberCard({ cargo, nome }: { cargo: string; nome: string }) {
  return (
    <div
      className="flex flex-col gap-2 p-5 rounded-xl transition-shadow duration-200 hover:shadow-md"
      style={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      <span
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: RED }}
      >
        {cargo}
      </span>
      <span
        className="text-sm font-semibold leading-snug"
        style={{ color: INK }}
      >
        {nome}
      </span>
    </div>
  );
}

function BoardSection({ title, members }: { title: string; members: { cargo: string; nome: string }[] }) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-4 mb-6">
        <span
          className="w-1 h-6 rounded-full flex-shrink-0"
          style={{ backgroundColor: RED }}
        />
        <h2
          className="font-display font-bold text-lg"
          style={{ color: INK }}
        >
          {title}
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => (
          <MemberCard key={`${m.cargo}-${m.nome}`} {...m} />
        ))}
      </div>
    </div>
  );
}

export default function AdministracaoPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div className="relative overflow-hidden navy-ambient">
          <span className="absolute bottom-6 right-4 font-display font-black leading-none select-none pointer-events-none" aria-hidden="true" style={{ fontSize: "clamp(6rem, 14vw, 12rem)", color: "rgba(255,255,255,0.04)", lineHeight: 1 }}>ICB</span>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(ellipse at 70% 0%, rgba(178,34,34,0.25) 0%, transparent 65%)" }}
          />
          <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative">
            <div className="mb-8">
              <Breadcrumb items={[{ label: "O Clube", href: "/#sobre" }, { label: "Administração" }]} />
            </div>
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: RED }}>
              O Clube
            </p>
            <h1
              className="font-display font-bold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
            >
              Administração
            </h1>
            <p className="text-base max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Conheça a Comodoria e os conselhos que conduzem o Iate Clube Brasileiro.
            </p>
          </div>
        </div>

        {/* Mensagem da Comodoria */}
        <FadeIn>
        <div className="px-6 py-16" style={{ backgroundColor: "#FAFAFA" }}>
          <div className="max-w-5xl mx-auto">

            {/* Foto em destaque — full width no mobile, lateral no desktop */}
            <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start mb-16">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase font-bold mb-5" style={{ color: RED }}>
                  Mensagem da Comodoria
                </p>
                <div className="space-y-4 text-base leading-relaxed" style={{ color: "#374151" }}>
                  <p>
                    Nós, da Comodoria eleita para o próximo triênio, vimos por meio desta, agradecer a confiança que nos foi depositada. Como objetivos principais para o nosso mandato, temos como não poderia deixar de ser, o aumento da frequência dos sócios ao Clube e a conciliação entre todas as vertentes de pensamento e interesses existentes no Clube.
                  </p>
                  <p className="font-semibold" style={{ color: INK }}>
                    Linhas de ação para o triênio:
                  </p>
                  <ul className="space-y-3">
                    {acoes.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                          style={{ backgroundColor: RED, minWidth: 20 }}
                        >
                          {i + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    Sabemos que esse caminho é longo e com restrições orçamentárias, porém, trabalharemos todos os dias para que possamos percorrê-lo da forma mais suave e rápida possível. Nossa Comodoria reitera seu compromisso em respeitar integralmente o Estatuto, Regulamento Interno e normas vigentes.
                  </p>
                </div>
              </div>

              {/* Foto grande */}
              <div className="flex flex-col items-center gap-4">
                <div
                  className="rounded-2xl overflow-hidden w-full shadow-xl"
                  style={{ border: `3px solid ${RED}` }}
                >
                  <Image
                    src="/images/comodoro_e_vice.webp"
                    alt="Comodoro e Vice-Comodoro do Iate Clube Brasileiro"
                    width={400}
                    height={520}
                    className="object-cover w-full"
                  />
                </div>
                <div
                  className="text-center w-full rounded-xl py-3 px-4"
                  style={{ backgroundColor: NAVY }}
                >
                  <p className="text-sm font-semibold text-white">Comodoro e Vice-Comodoro</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Iate Clube Brasileiro — Triênio atual
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mb-14" style={{ borderTop: "1px solid #E5E7EB" }} />

            {/* Boards */}
            <BoardSection title="Diretoria Executiva"   members={diretoriaExecutiva} />
            <BoardSection title="Conselho Deliberativo" members={conselhoDeliberativo} />
            <BoardSection title="Conselho Fiscal"       members={conselhoFiscal} />
          </div>
        </div>
        </FadeIn>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
