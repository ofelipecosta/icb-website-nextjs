export const revalidate = 3600; // rebuild com dados frescos do Sanity a cada hora

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Installations from "@/components/Installations";
import Events from "@/components/Events";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getInstalacoes, getNoticias, getEventos } from "@/lib/sanity";

export default async function Home() {
  const [instalacoes, noticias, eventos] = await Promise.all([
    getInstalacoes(),
    getNoticias(4),
    getEventos(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <News sanityData={noticias} />
        <Events sanityData={eventos} />
        <Installations sanityData={instalacoes} />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
