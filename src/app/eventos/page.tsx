import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumb from "@/components/Breadcrumb";
import FadeIn from "@/components/FadeIn";
import { getEventos } from "@/lib/sanity";

const RED = "#B22222";
const INK = "#111827";

const FALLBACK_EVENTOS = [
  { _id: "1", titulo: "Jantar de Abertura da Temporada",    categoria: "Social",  data: "2026-03-15", local: "Salão Nobre",    detalhe: "Celebre o início da temporada em nosso tradicional jantar de abertura." },
  { _id: "2", titulo: "Festa do Sócio",                     categoria: "Social",  data: "2026-04-19", local: "Salão de Festas", detalhe: "Grande confraternização com drinks, gastronomia e muito lazer." },
  { _id: "3", titulo: "Escola de Vela – Início das Turmas", categoria: "Náutico", data: "2026-05-10", local: "Marina",          detalhe: "Inscrições abertas para iniciantes e avançados na Escola de Vela do ICB." },
  { _id: "4", titulo: "Festa Junina do ICB",                categoria: "Social",  data: "2026-06-13", local: "Área Externa",    detalhe: "Festa com comidas típicas, danças regionais e muita diversão para todos." },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  Social:   { bg: "rgba(168, 85, 247, 0.08)", text: "#A855F7" },
  Esporte:  { bg: "rgba(16, 185, 129, 0.08)", text: "#10B981" },
  Náutico:  { bg: "rgba(59, 130, 246, 0.08)", text: "#3B82F6" },
  Cultural: { bg: "rgba(234, 179, 8, 0.08)",  text: "#CA8A04" },
};

function formatDate(iso?: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]}. ${y}`;
}

export const metadata = {
  title: "Eventos — Iate Clube Brasileiro",
  description: "Conheça todos os eventos do Iate Clube Brasileiro.",
};

export default async function EventosPage() {
  const sanityEventos = await getEventos().catch(() => []);
  const eventos = sanityEventos.length > 0 ? sanityEventos : FALLBACK_EVENTOS;
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#ffffff" }}>

        {/* Hero */}
        <div className="navy-ambient relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
            <div className="mb-8">
              <Breadcrumb items={[{ label: "Eventos" }]} />
            </div>
          </div>
        </div>

        {/* Content */}
        <FadeIn>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <header className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: RED }}>
              Agenda
            </p>
            <h1
              className="font-display font-black leading-tight text-4xl md:text-5xl"
              style={{ color: INK }}
            >
              Todos os Eventos
            </h1>
            <p className="mt-4 text-lg" style={{ color: "#6B7A8D" }}>
              Confira os próximos acontecimentos do Iate Clube Brasileiro
            </p>
          </header>

          {/* Events grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventos.length === 0 ? (
              <p className="col-span-3 text-center py-16" style={{ color: "#9CA3AF" }}>
                Nenhum evento disponível no momento.
              </p>
            ) : eventos.map((event) => {
              const cat = categoryColors[event.categoria] ?? { bg: "rgba(107,122,141,0.08)", text: "#6B7A8D" };
              return (
              <div
                key={event._id}
                className="bg-white rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <div className="p-6 flex flex-col h-full gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {event.data && (
                      <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded flex items-center gap-1" style={{ backgroundColor: RED, color: "#fff" }}>
                        <Calendar className="w-3 h-3" />{formatDate(event.data)}
                      </span>
                    )}
                    <span className="text-xs font-semibold px-2 py-1 rounded" style={{ backgroundColor: cat.bg, color: cat.text }}>
                      {event.categoria}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold leading-snug group-hover:text-[#B22222] transition-colors duration-200" style={{ color: INK }}>
                    {event.titulo}
                  </h3>
                  {event.detalhe && (
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "#6B7A8D" }}>{event.detalhe}</p>
                  )}
                  {event.local && (
                    <p className="flex items-center gap-1.5 text-xs" style={{ color: "#9CA3AF" }}>
                      <MapPin className="w-3.5 h-3.5" />{event.local}
                    </p>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </div>
        </FadeIn>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
