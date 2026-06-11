import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import Imperatives from "@/components/Imperatives";
import Edge from "@/components/Edge";
import Capacity from "@/components/Capacity";
import Process from "@/components/Process";
import Field from "@/components/Field";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Capabilities — JDCO | 3,500 Tons/Day Precast Manufacturing",
  description:
    "JDCO's manufacturing capability: 7 production lines, planetary mixers, 50T overhead cranes and semi-dry technology delivering 3,500 tons of precast concrete daily in Riyadh.",
};

export default function CapabilitiesPage() {
  return (
    <main className="relative">
      <Nav />
      <PageHero
        crumb="Capabilities"
        title="Built to deliver at national scale."
        sub="Seven automated production lines, planetary mixing, 50-ton overhead lifting and a heavy dispatch fleet — engineered as one machine with a single output: certainty."
        meta={["7 production lines", "50T crane capacity", "Riyadh · KSA", "3,500 tons / day"]}
        photo="/photos/crane-yard.jpg"
        photoAlt="Overhead crane lifting precast units across the JDCO yard"
      />
      <Imperatives />
      <Capacity />
      <Edge />
      <Process />
      <Field />
      <CTA />
      <Footer />
    </main>
  );
}
