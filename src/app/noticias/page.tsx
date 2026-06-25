import Link from "next/link";
import Image from "next/image";
import { Pin, ArrowLeft } from "lucide-react";
import NewsCard from "./NewsCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumb from "@/components/Breadcrumb";
import FadeIn from "@/components/FadeIn";
import { getTodasNoticias, urlFor } from "@/lib/sanity";

const RED = "#B22222";

export const metadata = {
  title: "Notícias — Iate Clube Brasileiro",
  description: "Fique por dentro das novidades, comunicados e eventos do Iate Clube Brasileiro.",
};

export default async function NoticiasPage() {
  const noticias = await getTodasNoticias();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div className="relative navy-ambient overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(ellipse at 60% 0%, rgba(178,34,34,0.3) 0%, transparent 60%)" }} />
          <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative">
            <div className="mb-8">
              <Breadcrumb items={[{ label: "Notícias" }]} />
            </div>
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: RED }}>Notícias</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Fique por <em className="not-italic" style={{ color: RED }}>dentro</em>
            </h1>
            <p className="text-base max-w-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
              Novidades, comunicados e eventos do Iate Clube Brasileiro.
            </p>
          </div>
        </div>

        {/* Grid */}
        <FadeIn>
        <div className="bg-white px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticias.map((noticia, i) => {
                const imgUrl = noticia.capa
                  ? urlFor(noticia.capa).width(720).height(405).url()
                  : null;

                return (
                  <NewsCard
                    key={noticia._id}
                    noticia={noticia}
                    index={i}
                    imgUrl={imgUrl}
                  />
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
