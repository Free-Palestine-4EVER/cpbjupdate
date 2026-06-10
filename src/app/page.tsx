import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Imperatives from "@/components/Imperatives";
import Company from "@/components/Company";
import Capacity from "@/components/Capacity";
import Process from "@/components/Process";
import Field from "@/components/Field";
import Products from "@/components/Products";
import Showcase from "@/components/Showcase";
import Technology from "@/components/Technology";
import Quality from "@/components/Quality";
import Timeline from "@/components/Timeline";
import Impact from "@/components/Impact";
import Partners from "@/components/Partners";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Preloader />
      <Nav />
      <Hero />
      <Ticker />
      <Imperatives />
      <Company />
      <Capacity />
      <Process />
      <Field />
      <Products />
      <Showcase />
      <Technology />
      <Quality />
      <Timeline />
      <Impact />
      <Partners />
      <CTA />
      <Footer />
    </main>
  );
}
