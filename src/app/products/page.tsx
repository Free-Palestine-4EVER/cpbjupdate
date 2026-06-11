import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import Products from "@/components/Products";
import Showcase from "@/components/Showcase";
import Technology from "@/components/Technology";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Products — JDCO | RC Pipes, Box Culverts, Manholes & Jacking Pipes",
  description:
    "The complete JDCO precast range: reinforced concrete pipes Ø300–3000mm, jacking pipes to Ø3600mm, single/double/triple-cell box culverts and ASTM C748-M manholes with custom linings.",
};

export default function ProductsPage() {
  return (
    <main className="relative">
      <Nav />
      <PageHero
        crumb="Products"
        title="The subterranean ecosystem, complete."
        sub="RC pipes to Ø3,600mm, the Kingdom's first box culverts, manholes engineered to ASTM C748-M — a holistic family of precast solutions with linings for the harshest environments."
        meta={["RC & jacking pipes", "Box culverts since 2010", "ASTM C748-M manholes", "Up to 21,000 kg / unit"]}
        photo="/photos/products/rc-pipes.jpg"
        photoAlt="JDCO reinforced concrete pipes with bell ends in the Riyadh yard"
      />
      <Products />
      <Showcase />
      <Technology />
      <CTA />
      <Footer />
    </main>
  );
}
