import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Membership from "@/components/Membership";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSocio } from "@/lib/sanity";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Seja Sócio | Iate Clube Brasileiro",
  description: "Conheça as condições de associação ao Iate Clube Brasileiro. 50 títulos disponíveis. Saiba como se tornar sócio do primeiro clube de iatismo do Brasil.",
};

export default async function SejaSocioPage() {
  const socio = await getSocio();

  return (
    <>
      <Navbar />
      <main>
        <Membership sanityData={socio} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
