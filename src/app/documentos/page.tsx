export const revalidate = 3600;

import { FileText, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { getDocumentos, type DocumentoSanity } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";

const RED = "#B22222";
const INK = "#16202E";

export const metadata = {
  title: "Documentos — Iate Clube Brasileiro",
  description: "Acesse os documentos que regem o funcionamento do Iate Clube Brasileiro.",
};

const CATEGORIA_LABELS: Record<string, string> = {
  estatuto:    "Estatuto",
  ata:         "Atas",
  edital:      "Editais",
  regulamento: "Regulamentos",
  balancete:   "Balancetes",
  outros:      "Outros",
};

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
        <PageHeader
          eyebrow="O Clube"
          title="Documentos"
          description="Acesse os documentos que regem o funcionamento do Iate Clube Brasileiro."
          breadcrumb={[{ label: "O Clube", href: "/#sobre" }, { label: "Documentos" }]}
        />

        <FadeIn>
          <div className="px-6 py-16" style={{ backgroundColor: "var(--color-surface)" }}>
            <div className="max-w-3xl mx-auto">
              {docs.length === 0 ? (
                <div className="text-center py-20">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" style={{ color: "var(--color-navy)" }} />
                  <p className="font-semibold" style={{ color: "var(--color-anchor)" }}>Nenhum documento disponível no momento.</p>
                  <p className="text-sm mt-2" style={{ color: "#9CA3AF" }}>Em breve os documentos serão publicados aqui.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-12">
                  {Array.from(grupos.entries()).map(([cat, items]) => (
                    <div key={cat}>
                      <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: "2px solid rgba(0,0,0,0.07)" }}>
                        <h2 className="font-display font-bold uppercase tracking-widest text-xs" style={{ color: INK }}>
                          {CATEGORIA_LABELS[cat] ?? cat}
                        </h2>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "rgba(10,22,40,0.05)", color: "var(--color-anchor)" }}
                        >
                          {items.length}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {items.map((doc) => (
                          <div
                            key={doc._id}
                            className="flex items-center gap-4 bg-white px-5 py-4 transition-shadow hover:shadow-md"
                            style={{
                              borderRadius: "var(--radius-card)",
                              border: "1px solid rgba(0,0,0,0.07)",
                              boxShadow: "var(--shadow-luxury)",
                            }}
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
                                className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-1.5 transition-opacity duration-200 hover:opacity-80"
                                style={{ backgroundColor: RED, color: "#fff", borderRadius: "var(--radius-btn)" }}
                              >
                                <Download className="w-3.5 h-3.5" /> PDF
                              </a>
                            ) : (
                              <span className="flex-shrink-0 text-xs px-3 py-1.5 rounded" style={{ backgroundColor: "rgba(0,0,0,0.04)", color: "#9CA3AF" }}>
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
