import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import Technology from "@/components/Technology";
import Process from "@/components/Process";
import Capacity from "@/components/Capacity";
import Film from "@/components/Film";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Technology — JDCO | Zero-Slump Semi-Dry Precast Manufacturing",
  description:
    "Why JDCO's zero-slump semi-dry process beats traditional wet casting: 0.26–0.34 water/cement ratio, immediate mold stripping, guaranteed identical joints and 3,500 tons/day throughput.",
};

export default function TechnologyPage() {
  return (
    <main className="relative">
      <Nav />
      <PageHero
        crumb="Technology"
        title="Zero slump. Zero compromise."
        sub="Semi-dry technology is the structural and commercial advantage behind every JDCO unit — a strictly controlled 0.26–0.34 water/cement ratio that leaves the mold rigid, identical and ready to ship."
        meta={["W/C 0.26–0.34", "Immediate mold reuse", "End-pressed joints", "Semi-dry pioneer · ME"]}
        photo="/photos/pour-yard.jpg"
        photoAlt="Zero-slump semi-dry pour at the JDCO casting bay"
      />
      <Technology />
      <Process />
      <Capacity />
      <Film />
      <CTA />
      <Footer />
    </main>
  );
}
