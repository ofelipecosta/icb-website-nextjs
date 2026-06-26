import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Administração — Iate Clube Brasileiro",
  description: "Conheça a diretoria executiva e os conselhos do Iate Clube Brasileiro.",
};

const RED = "#B22222";
const INK = "#16202E";

const diretoriaExecutiva = [
  { cargo: "Comodoro",                        nome: "Eduardo Augusto Granato de Carvalho" },
  { cargo: "Vice-Comodoro",                   nome: "Marcelo Cardoso Coelho" },
  { cargo: "Diretor Administrativo",          nome: "Luiz Antonio Alves" },
  { cargo: "Diretor Financeiro",              nome: "Eduardo Augusto Granato de Carvalho" },
  { cargo: "Diretor Médico",                  nome: "Henrique Tostes Padilha Neto" },
  { cargo: "Diretor Social e de Eventos",     nome: "Marcelo Cardoso Coelho" },
  { cargo: "Diretor de Esporte",              nome: "Marcelo Cardoso Coelho" },
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
      className="flex flex-col gap-2 p-5 bg-white card-hover-sm"
      style={{
        borderRadius: "var(--radius-card)",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "var(--shadow-luxury)",
      }}
    >
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: RED }}>{cargo}</span>
      <span className="text-sm font-semibold leading-snug" style={{ color: INK }}>{nome}</span>
    </div>
  );
}

function BoardSection({ title, members }: { title: string; members: { cargo: string; nome: string }[] }) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-4 mb-6">
        <span className="w-1 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: RED }} />
        <h2 className="font-display font-bold text-lg" style={{ color: INK }}>{title}</h2>
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
        <PageHeader
          eyebrow="O Clube"
          title="Administração"
          description="Conheça a Comodoria e os conselhos que conduzem o Iate Clube Brasileiro."
          breadcrumb={[{ label: "O Clube", href: "/#sobre" }, { label: "Administração" }]}
        />

        <FadeIn>
          <div className="px-6 py-16" style={{ backgroundColor: "var(--color-surface)" }}>
            <div className="max-w-5xl mx-auto">

              {/* Mensagem + foto */}
              <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start mb-16">
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-5" style={{ color: RED }}>
                    Mensagem da Comodoria
                  </p>
                  <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                    <p>
                      Nós, da Comodoria eleita para o próximo triênio, vimos por meio desta, agradecer a confiança que nos foi depositada. Como objetivos principais para o nosso mandato, temos como não poderia deixar de ser, o aumento da frequência dos sócios ao Clube e a conciliação entre todas as vertentes de pensamento e interesses existentes no Clube.
                    </p>
                    <p className="font-semibold" style={{ color: INK }}>Linhas de ação para o triênio:</p>
                    <ul className="space-y-3">
                      {acoes.map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed">
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
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-anchor)" }}>
                      Sabemos que esse caminho é longo e com restrições orçamentárias, porém, trabalharemos todos os dias para que possamos percorrê-lo da forma mais suave e rápida possível.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div
                    className="overflow-hidden w-full"
                    style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-luxury-lg)" }}
                  >
                    <Image
                      src="/images/comodoro_e_vice.webp"
                      alt="Comodoro e Vice-Comodoro do Iate Clube Brasileiro"
                      width={360}
                      height={460}
                      className="object-cover w-full"
                    />
                  </div>
                  <p className="text-xs text-center" style={{ color: "var(--color-anchor)" }}>
                    Comodoro e Vice-Comodoro · Triênio atual
                  </p>
                </div>
              </div>

              <div className="mb-14" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }} />

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
