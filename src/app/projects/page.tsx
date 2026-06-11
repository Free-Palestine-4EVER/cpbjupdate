import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import Impact from "@/components/Impact";
import Film from "@/components/Film";
import Timeline from "@/components/Timeline";
import Partners from "@/components/Partners";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects — JDCO | 70+ Mega-Projects Across the Region",
  description:
    "JDCO precast inside the region's spine: Riyadh Metro, Riyadh stormwater networks, King Khaled Airport, KNPC ZOR Kuwait — 70+ projects, 500M+ SAR supplied, 10 countries reached.",
};

export default function ProjectsPage() {
  return (
    <main className="relative">
      <Nav />
      <PageHero
        crumb="Projects"
        title="Inside the spine of the region."
        sub="From the Riyadh Metro to Kuwait's KNPC ZOR refinery — JDCO precast carries the region's water, power and transit. 70+ major projects delivered across 10 countries."
        meta={["70+ projects", "500M+ SAR supplied", "10 countries", "Vision 2030 aligned"]}
        photo="/photos/crane-yard.jpg"
        photoAlt="JDCO precast yard with cured units ready for dispatch"
      />
      <Impact />
      <Timeline />
      <Film />
      <Partners />
      <CTA />
      <Footer />
    </main>
  );
}
