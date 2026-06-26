import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contato | Iate Clube Brasileiro",
  description: "Fale com o Iate Clube Brasileiro. Encontre o departamento certo e entre em contato diretamente com nossa equipe.",
};

export default function ContatoPage() {
  return (
    <>
      <Navbar />
      <main>
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
