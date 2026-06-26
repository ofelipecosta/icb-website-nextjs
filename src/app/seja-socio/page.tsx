import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Membership from "@/components/Membership";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Seja Sócio | Iate Clube Brasileiro",
  description: "Conheça as condições de associação ao Iate Clube Brasileiro. 50 títulos disponíveis. Saiba como se tornar sócio do primeiro clube de iatismo do Brasil.",
};

export default function SejaSocioPage() {
  return (
    <>
      <Navbar />
      <main>
        <Membership />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
