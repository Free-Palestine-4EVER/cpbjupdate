import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import Quality from "@/components/Quality";
import Technology from "@/components/Technology";
import Partners from "@/components/Partners";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Quality — JDCO | ISO 9001:2015 Certified Precast Manufacturing",
  description:
    "Quality as a system: ISO 9001:2015 QMS, three-edge bearing tests, hydro-testing for absolute water-tightness, third-party calibration and continuous in-house laboratory verification.",
};

export default function QualityPage() {
  return (
    <main className="relative">
      <Nav />
      <PageHero
        crumb="Quality"
        title="Certainty you can audit."
        sub="At 3,500 tons a day, quality cannot be a promise — it is an ISO 9001:2015 system: material input control, third-party calibration, three-edge bearing and hydro-testing on every production cycle."
        meta={["ISO 9001:2015 · InterCert", "Three-edge bearing", "Hydro-tested joints", "In-house laboratory"]}
        photo="/photos/plant-grid.jpg"
        photoAlt="Inside the JDCO production halls — casting, finishing and inspection"
      />
      <Quality />
      <Technology />
      <Partners />
      <CTA />
      <Footer />
    </main>
  );
}
