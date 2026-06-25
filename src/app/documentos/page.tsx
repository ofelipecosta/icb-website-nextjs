import Link from "next/link";
import { ArrowLeft, FileText, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumb from "@/components/Breadcrumb";
import FadeIn from "@/components/FadeIn";
import { getDocumentos, type DocumentoSanity } from "@/lib/sanity";

const RED  = "#B22222";
const NAVY = "#0A1628";
const INK  = "#111827";

export const metadata = {
  title: "Documentos Oficiais — Iate Clube Brasileiro",
  description: "Acesse os documentos que regem o funcionamento do Iate Clube Brasileiro.",
};

const CATEGORIA_LABELS: Record<string, string> = {
  estatuto:     "Estatuto",
  ata:          "Atas",
  edital:       "Editais",
  regulamento:  "Regulamentos",
  balancete:    "Balancetes",
  outros:       "Outros",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]}. ${y}`;
}

function groupByCategoria(docs: DocumentoSanity[]) {
  const map = new Map<string, DocumentoSanity[]>();
  docs.forEach((d) => {
    if (!map.has(d.categoria)) map.set(d.categoria, []);
    map.get(d.categoria)!.push(d);
  });
  return map;
}

export default async function DocumentosPage() {
  const docs = await getDocumentos();
  const grupos = groupByCategoria(docs);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div className="relative overflow-hidden navy-ambient">
          <span className="absolute bottom-6 right-4 font-display font-black leading-none select-none pointer-events-none" aria-hidden="true" style={{ fontSize: "clamp(6rem, 14vw, 12rem)", color: "rgba(255,255,255,0.04)", lineHeight: 1 }}>ICB</span>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at 70% 0%, rgba(178,34,34,0.25) 0%, transparent 65%)" }} />
          <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative">
            <div className="mb-8">
              <Breadcrumb items={[{ label: "O Clube", href: "/#sobre" }, { label: "Documentos Oficiais" }]} />
            </div>
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: RED }}>O Clube</p>
            <h1 className="font-display font-bold text-white leading-tight mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}>
              Documentos <em className="not-italic" style={{ color: RED }}>Oficiais</em>
            </h1>
            <p className="text-base max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Acesse os documentos que regem o funcionamento do Iate Clube Brasileiro.
            </p>
          </div>
        </div>

        {/* Documentos */}
        <FadeIn>
        <div className="px-6 py-16" style={{ backgroundColor: "#FAFAFA" }}>
          <div className="max-w-3xl mx-auto">
            {docs.length === 0 ? (
              <div className="text-center py-20">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" style={{ color: NAVY }} />
                <p className="font-semibold" style={{ color: "#6B7280" }}>Nenhum documento disponível no momento.</p>
                <p className="text-sm mt-2" style={{ color: "#9CA3AF" }}>Em breve os documentos serão publicados aqui.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-12">
                {Array.from(grupos.entries()).map(([cat, items]) => (
                  <div key={cat}>
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: `2px solid ${RED}` }}>
                      <h2 className="font-display font-black uppercase tracking-widest text-xs" style={{ color: INK }}>
                        {CATEGORIA_LABELS[cat] ?? cat}
                      </h2>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(178,34,34,0.08)", color: RED }}>
                        {items.length}
                      </span>
                    </div>

                    {/* Doc list */}
                    <div className="flex flex-col gap-2">
                      {items.map((doc) => (
                        <div
                          key={doc._id}
                          className="flex items-center gap-4 bg-white rounded-sm px-5 py-4 transition-shadow hover:shadow-md"
                          style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                        >
                          <FileText className="w-5 h-5 flex-shrink-0" style={{ color: RED }} />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm leading-snug" style={{ color: INK }}>{doc.titulo}</p>
                            {doc.dataPublicacao && (
                              <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{formatDate(doc.dataPublicacao)}</p>
                            )}
                          </div>
                          {doc.arquivoUrl ? (
                            <a
                              href={doc.arquivoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded transition-colors duration-200"
                              style={{ backgroundColor: RED, color: "#fff" }}
                            >
                              <Download className="w-3.5 h-3.5" />
                              PDF
                            </a>
                          ) : (
                            <span className="flex-shrink-0 text-xs px-3 py-1.5 rounded" style={{ backgroundColor: "#F3F4F6", color: "#9CA3AF" }}>
                              Em breve
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        </FadeIn>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
