export const revalidate = 3600;

import NewsCard from "./NewsCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { getTodasNoticias, urlFor } from "@/lib/sanity";

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
        <PageHeader
          eyebrow="Notícias"
          title="Notícias"
          description="Novidades, comunicados e acontecimentos do Iate Clube Brasileiro."
          breadcrumb={[{ label: "Notícias" }]}
        />

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
