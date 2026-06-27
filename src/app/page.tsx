export const revalidate = 60; // rebuild com dados frescos do Sanity a cada minuto

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Installations from "@/components/Installations";
import Events from "@/components/Events";
import Regattas from "@/components/Regattas";
import News from "@/components/News";
import ContactStrip from "@/components/ContactStrip";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getInstalacoes, getNoticias, getEventos, getRegatas } from "@/lib/sanity";

export default async function Home() {
  const [instalacoes, noticias, eventos, regatas] = await Promise.all([
    getInstalacoes(),
    getNoticias(4),
    getEventos(),
    getRegatas(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Installations sanityData={instalacoes} />
        <News sanityData={noticias} />
        <Events sanityData={eventos} />
        <Regattas sanityData={regatas} />
        <ContactStrip />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
