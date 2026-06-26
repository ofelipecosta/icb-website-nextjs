export const revalidate = 3600;

import { Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { getEventos } from "@/lib/sanity";
import { categoryColors, DEFAULT_CATEGORY_COLOR } from "@/lib/constants";
import { formatDateShort } from "@/lib/utils";

const RED = "#B22222";
const INK = "#16202E";

const FALLBACK_EVENTOS = [
  { _id: "1", titulo: "Jantar de Abertura da Temporada",    categoria: "Social",  data: "2026-03-15", local: "Salão Nobre",    detalhe: "Celebre o início da temporada em nosso tradicional jantar de abertura." },
  { _id: "2", titulo: "Festa do Sócio",                     categoria: "Social",  data: "2026-04-19", local: "Salão de Festas", detalhe: "Grande confraternização com drinks, gastronomia e muito lazer." },
  { _id: "3", titulo: "Escola de Vela – Início das Turmas", categoria: "Náutico", data: "2026-05-10", local: "Marina",          detalhe: "Inscrições abertas para iniciantes e avançados na Escola de Vela do ICB." },
  { _id: "4", titulo: "Festa Junina do ICB",                categoria: "Social",  data: "2026-06-13", local: "Área Externa",    detalhe: "Festa com comidas típicas, danças regionais e muita diversão para todos." },
];

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
      <main>
        <PageHeader
          eyebrow="Agenda"
          title="Eventos"
          description="Confira os próximos acontecimentos do Iate Clube Brasileiro."
          breadcrumb={[{ label: "Eventos" }]}
        />

        <FadeIn>
          <div className="bg-white px-6 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {eventos.length === 0 ? (
                  <p className="col-span-3 text-center py-16" style={{ color: "#9CA3AF" }}>
                    Nenhum evento disponível no momento.
                  </p>
                ) : eventos.map((event) => {
                  const cat = categoryColors[event.categoria] ?? DEFAULT_CATEGORY_COLOR;
                  return (
                    <div
                      key={event._id}
                      className="bg-white overflow-hidden group card-hover"
                      style={{
                        borderRadius: "var(--radius-card)",
                        border: "1px solid rgba(0,0,0,0.07)",
                        boxShadow: "var(--shadow-luxury)",
                      }}
                    >
                      <div className="p-6 flex flex-col h-full gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {event.data && (
                            <span
                              className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 flex items-center gap-1"
                              style={{ backgroundColor: RED, color: "#fff", borderRadius: "var(--radius-btn)" }}
                            >
                              <Calendar className="w-3 h-3" />{formatDateShort(event.data ?? "")}
                            </span>
                          )}
                          <span
                            className="text-xs font-semibold px-2 py-1"
                            style={{ backgroundColor: cat.bg, color: cat.text, borderRadius: "var(--radius-btn)" }}
                          >
                            {event.categoria}
                          </span>
                        </div>
                        <h3
                          className="font-display text-lg font-semibold leading-snug transition-colors duration-200"
                          style={{ color: INK }}
                        >
                          {event.titulo}
                        </h3>
                        {event.detalhe && (
                          <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-anchor)" }}>
                            {event.detalhe}
                          </p>
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
          </div>
        </FadeIn>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
