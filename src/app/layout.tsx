import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import QuoteModal from "@/components/QuoteModal";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JDCO — The Foundation of Tomorrow | Precast Concrete Infrastructure",
  description:
    "Al-Jazirah Development Factory for Concrete Products (JDCO). A Riyadh-based precast concrete manufacturer engineering certainty for the region's most critical infrastructure — 3,500 tons/day, ISO 9001:2015, aligned with Saudi Vision 2030.",
  keywords: [
    "precast concrete",
    "RC pipes",
    "box culverts",
    "manholes",
    "infrastructure",
    "Saudi Arabia",
    "Vision 2030",
    "JDCO",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexMono.variable} antialiased`}
    >
      <body className="grain">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=new URLSearchParams(location.search).get('theme');var t=p||localStorage.getItem('jdco-theme');if(t==='light')document.documentElement.classList.add('light');else document.documentElement.classList.remove('light');}catch(e){}
/* pre-hydration mobile menu: on slow networks the React bundle can take 10s+,
   during which the hamburger would be a dead button. This zero-dependency
   handler drives the menu via the .menu-open class until html.hydrated is set,
   then permanently steps aside. */
document.addEventListener('click',function(e){var h=document.documentElement;if(h.classList.contains('hydrated'))return;var t=e.target;if(!t||!t.closest)return;if(t.closest('[data-menu-btn]')){h.classList.toggle('menu-open');return;}if(t.closest('[data-mobile-panel] a'))h.classList.remove('menu-open');},true);})();`,
          }}
        />
        <CursorGlow />
        <SmoothScroll>{children}</SmoothScroll>
        <QuoteModal />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
