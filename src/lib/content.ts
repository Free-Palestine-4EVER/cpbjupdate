// ============================================================
// JDCO — content model (frozen from the capability briefing)
// Al-Jazirah Development Factory for Concrete Products
// Contact details are representative placeholders for the concept.
// ============================================================

export const brand = {
  short: "JDCO",
  legal: "Al-Jazirah Development Factory for Concrete Products",
  tagline: "The Foundation of Tomorrow",
  location: "Othman bin Affan, Riyadh, Saudi Arabia",
  established: "2007",
  ownership: "100% Saudi-owned",
  email: "jdco@jdco.com.sa",
  phone: "+966 11 222 6656",
  mobile: "+966 59 604 8049",
  whatsapp: "https://wa.me/966596048049",
  web: "jdco.com.sa",
  maps: "https://www.google.com/maps/search/?api=1&query=JDCO+Othman+bin+Affan+Riyadh",
  socials: [
    { label: "Instagram", handle: "@jdco_sa", href: "https://www.instagram.com/jdco_sa" },
    { label: "X", handle: "@JDCO_SA", href: "https://x.com/JDCO_SA" },
    { label: "LinkedIn", handle: "/jdcosa", href: "https://www.linkedin.com/company/jdcosa/" },
    { label: "Facebook", handle: "JDCO", href: "https://www.facebook.com/profile.php?id=100094904658888" },
  ],
};

export const nav = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Products", href: "#products" },
  { label: "Technology", href: "#technology" },
  { label: "Quality", href: "#quality" },
  { label: "Projects", href: "#projects" },
];

export const heroStats = [
  { value: "3,500", unit: "Tons / Day", label: "Production capacity" },
  { value: "ISO 9001", unit: ":2015", label: "Certified QMS" },
  { value: "70+", unit: "Projects", label: "Delivered region-wide" },
  { value: "2007", unit: "Est.", label: "Riyadh, KSA" },
];

export const imperatives = {
  index: "01",
  kicker: "The Mandate",
  title: "Modern infrastructure demands uncompromising scale.",
  intro:
    "The Gulf is executing the most ambitious mega-projects in modern history. The structural integrity of these developments — from metro systems to massive stormwater networks — relies on subterranean arteries that cannot fail.",
  cards: [
    {
      no: "I",
      title: "The Scale Imperative",
      body: "Supplying high-volume materials at pace, without ever creating a supply-chain bottleneck.",
    },
    {
      no: "II",
      title: "The Precision Mandate",
      body: "Millimeter-perfect joints that guarantee absolute structural and watertight integrity over decades.",
    },
    {
      no: "III",
      title: "Zero-Failure Tolerance",
      body: "Engineered risk mitigation for the project managers executing Vision 2030 objectives.",
    },
  ],
};

export const company = {
  index: "02",
  kicker: "The Company",
  title: "The engine of regional development.",
  lead: "Established in 2007, JDCO is a 100% Saudi-owned manufacturer in the heart of Riyadh. We do not just manufacture concrete — we manufacture certainty for the region's most critical infrastructure.",
  vision:
    "To be the premier, reliable partner for high-quality precast infrastructure components across the region.",
  mission:
    "Empowering clients to build sustainable networks through superior quality and rapid delivery.",
  values: [
    "Ethical Conduct",
    "Unyielding Quality Assurance",
    "Cost-Effectiveness",
    "Lifetime Durability",
    "Safe Construction Practices",
  ],
};

export const capacity = {
  index: "03",
  kicker: "Output Capability",
  headline: "3,500",
  headlineUnit: "Tons / Day",
  sub: "Monumental, sustained daily production — sourced from the world's leading manufacturers to guarantee zero delays in your supply chain.",
  specs: [
    { value: 7, suffix: "", label: "Dedicated production lines" },
    { value: 4, suffix: "", label: "Planetary mixers · 1.4m³ / 2.5 min" },
    { value: 50, suffix: "T", label: "Overhead crane lifting capacity" },
    { value: 32, suffix: "T", label: "Heavy dispatch forklifts" },
  ],
};

export const process = {
  index: "04",
  kicker: "Anatomy of Production",
  title: "Six controlled stages, zero compromise.",
  steps: [
    {
      n: "01",
      title: "Automated Raw Material Control",
      body: "Aggregate storage bins with fully automated weight control and holding hoppers eliminate cycle bottlenecks.",
    },
    {
      n: "02",
      title: "Planetary Mixing",
      body: "Rapid, high-volume blending that achieves a precise, zero-slump consistency.",
    },
    {
      n: "03",
      title: "Immediate Stripping & Curing",
      body: "Semi-dry technology permits instant mold reuse — the engine of our throughput.",
    },
    {
      n: "04",
      title: "Medium-Frequency Steel Fabrication",
      body: "Cage-welding and 2-wire mesh machines form perfect reinforcement without compromising steel properties.",
    },
    {
      n: "05",
      title: "Automated Casting & End-Pressing",
      body: "Molds are filled and immediately pressed to exact, repeatable dimensional tolerances.",
    },
    {
      n: "06",
      title: "Heavy Dispatch",
      body: "50-ton tipping and lifting equipment loads custom fleets for rapid regional deployment.",
    },
  ],
};

export const technology = {
  index: "05",
  kicker: "Technological Superiority",
  title: "Semi-dry technology vs. traditional wet mix.",
  intro:
    "Our zero-slump, semi-dry process is the structural and commercial advantage behind every JDCO unit.",
  columns: ["Metric", "Traditional Wet Mix", "JDCO Semi-Dry"],
  rows: [
    {
      metric: "Water / Cement Ratio",
      traditional: "High — 0.45+",
      jdco: "Strictly controlled — 0.26–0.34",
    },
    {
      metric: "Slump Level",
      traditional: "High slump (flowing)",
      jdco: "Zero slump — immediate rigidity",
    },
    {
      metric: "Mold Reusability",
      traditional: "Requires curing before stripping",
      jdco: "Immediate stripping & reuse",
    },
    {
      metric: "Joint Precision",
      traditional: "Subject to settling variance",
      jdco: "Guaranteed identical joints",
    },
    {
      metric: "Production Speed",
      traditional: "Limited by mold inventory",
      jdco: "Up to 3,500 tons / day",
    },
  ],
};

export type SectorKey = "sanitary" | "storm" | "electrical" | "metro";

export const sectors: { key: SectorKey; label: string }[] = [
  { key: "sanitary", label: "Sanitary Sewers" },
  { key: "storm", label: "Storm Drainage" },
  { key: "electrical", label: "Electrical Utilities" },
  { key: "metro", label: "Metro / Transit" },
];

export const products = {
  index: "06",
  kicker: "The Subterranean Ecosystem",
  title: "A complete range, engineered underground.",
  intro:
    "A holistic family of precast solutions built for specific infrastructure demands — combining low lifecycle cost with ultimate corrosion resistance.",
  items: [
    {
      id: "rc-pipes",
      name: "RC Pipes",
      heading: "Arteries of Infrastructure",
      blurb:
        "Reinforced concrete pipes engineered for flawless subterranean flow and trenchless installation.",
      sectors: ["sanitary", "storm", "metro"] as SectorKey[],
      specs: [
        { k: "Bell & Spigot", v: "Ø 300 – 1000 mm" },
        { k: "Tongue & Groove", v: "Ø 1100 – 3000 mm" },
        { k: "Jacking Pipe", v: "Ø 800 – 3600 mm" },
        { k: "Unit Weight", v: "up to 21,000 kg" },
      ],
    },
    {
      id: "box-culverts",
      name: "Box Culverts",
      heading: "Structural Conduits",
      blurb:
        "The backbone of major storm drainage and subterranean utility networks — introduced first to the KSA market by JDCO in 2010.",
      sectors: ["storm", "metro"] as SectorKey[],
      specs: [
        { k: "Single Cell", v: "900 – 4500 mm span" },
        { k: "Double Cell", v: "Fully customizable" },
        { k: "Triple Cell", v: "Extreme load-bearing" },
        { k: "Application", v: "Max-volume diversion" },
      ],
    },
    {
      id: "manholes",
      name: "Manholes & Chambers",
      heading: "Access & Utility Nodes",
      blurb:
        "Manufactured to ASTM C748-M, fully customizable with internal coatings — Coal-Tar Epoxy, HDPE or GRP lining — for severe environments.",
      sectors: ["sanitary", "storm", "electrical"] as SectorKey[],
      specs: [
        { k: "Circular", v: "Ø 1200 – 2700 mm" },
        { k: "Square", v: "1.0m – 4.0m" },
        { k: "Electric", v: "Precision duct access" },
        { k: "Chambers", v: "Standard & custom" },
      ],
    },
  ],
  matrix: [
    { product: "RC Pipes", sectors: ["sanitary", "storm", "metro"] },
    { product: "Jacking Pipes", sectors: ["storm", "metro"] },
    { product: "Box Culverts", sectors: ["storm", "metro"] },
    { product: "Manholes", sectors: ["sanitary", "storm"] },
    { product: "Electric Manholes", sectors: ["electrical"] },
    { product: "Inspection Chambers", sectors: ["sanitary", "storm"] },
  ] as { product: string; sectors: SectorKey[] }[],
};

export const quality = {
  index: "07",
  kicker: "Uncompromising Certainty",
  title: "Quality is a system, not an afterthought.",
  intro:
    "At 3,500 tons a day, quality cannot be left to chance. It is a fully integrated, auditable ISO 9001:2015 Quality Management System.",
  stages: [
    {
      n: "01",
      title: "Material Input",
      body: "Rigorous testing of raw materials against international standard limits.",
    },
    {
      n: "02",
      title: "Production Monitoring",
      body: "Third-party calibration of all high-tech mixing and welding machinery.",
    },
    {
      n: "03",
      title: "Mix & Curing",
      body: "Strict adherence to zero-slump mix designs and stripping procedures.",
    },
    {
      n: "04",
      title: "Final Verification",
      body: "Continuous in-house laboratory testing of finished products before dispatch.",
    },
  ],
  tests: [
    {
      tag: "Test A",
      title: "Three-Edge Bearing",
      body: "Extreme, concentrated directional force applied to fully cured samples verifies structural compliance against the harshest design loads.",
    },
    {
      tag: "Test B",
      title: "Hydro-Testing",
      body: "Internal pressure testing on joints proves absolute water-tightness — zero subterranean leakage across the product's lifespan.",
    },
  ],
  triad: {
    title: "The JDCO Triad of Excellence",
    sub: "You do not just purchase concrete — you purchase total risk mitigation for your mega-project.",
    pillars: [
      {
        title: "Monumental Scale",
        body: "3,500 tons / day ensures your project never waits on supply.",
      },
      {
        title: "Micro Precision",
        body: "Automated end-pressing and zero-slump tech mean joints fit perfectly — watertight for life.",
      },
      {
        title: "Unyielding Assurance",
        body: "ISO 9001 testing and strict material control mean zero tolerance for structural failure.",
      },
    ],
  },
};

export const timeline = {
  index: "08",
  kicker: "The Staircase to Vision 2030",
  title: "Eighteen years of engineered ascent.",
  steps: [
    { year: "2007", label: "JDCO established — the birth of an idea" },
    { year: "2009", label: "First concrete production kick-off" },
    { year: "2010", label: "Pioneer: first box-culvert technology in KSA" },
    { year: "2011", label: "Pipe & manhole production kick-off" },
    { year: "2012", label: "Best-in-class factory constructed" },
    { year: "2013", label: "Capacity scales to 2,500 tons / day" },
    { year: "2015", label: "Advanced automated cage machine integrated" },
    { year: "2016", label: "Massive expansion to 3,500 tons / day" },
    { year: "2018", label: "Global export operations commence" },
    { year: "Now", label: "Total alignment with KSA Vision 2030" },
  ],
};

export const impact = {
  index: "09",
  kicker: "Regional Footprint",
  title: "Built into the spine of the region.",
  bigStats: [
    { value: 70, suffix: "+", label: "Major infrastructure projects completed" },
    { value: 500, suffix: "M+ SAR", label: "Total project value supplied" },
  ],
  sectors: [
    "Metro Transit",
    "Airports",
    "National Water Networks",
    "Municipal Housing (NHC)",
    "Oil & Gas",
  ],
  reach: [
    "Saudi Arabia",
    "UAE",
    "Bahrain",
    "Qatar",
    "Kuwait",
    "Oman",
    "Yemen",
    "Iraq",
    "Syria",
    "Türkiye",
  ],
  projects: [
    {
      name: "KNPC ZOR Project",
      place: "Kuwait",
      contractor: "Fluor",
      product: "RC Pipes",
      value: "105M SAR",
    },
    {
      name: "Riyadh Storm Water Network",
      place: "Riyadh, KSA",
      contractor: "M&M United · Shibh Al Jazera",
      product: "Box Culverts · Pipes · Manholes",
      value: "172M+ SAR",
    },
    {
      name: "Riyadh Metro Infrastructure",
      place: "Riyadh, KSA",
      contractor: "Bechtel · Almabani · CCC · FCC Aqualia",
      product: "Pipes · Box Culverts · Manholes",
      value: "30M+ SAR",
    },
    {
      name: "King Khaled Airport",
      place: "Riyadh, KSA",
      contractor: "Al-Mabani Contracting",
      product: "RC Pipes",
      value: "16.7M SAR",
    },
  ],
};

export const partners = {
  index: "10",
  kicker: "Trusted by the Architects of the Region",
  title: "Approved where it matters most.",
  intro:
    "JDCO holds active approvals and deep partnerships with the Kingdom's most demanding ministries, municipalities and elite multinational contractors.",
  names: [
    "AlUla",
    "AMAALA",
    "Red Sea Global",
    "QIDDIYA",
    "ROSHN",
    "Diriyah — DGDA",
    "Ministry of Housing — NHC",
    "National Water Company",
    "MODON",
    "KNPC",
    "Nesma & Partners",
    "Fluor",
    "Bechtel",
    "Yüksel",
    "Shibh Al Jazera",
  ],
};

export const cta = {
  kicker: "Partner With Us",
  title: "Build the future with absolute certainty.",
  sub: "Partner with the premier engine of regional development.",
};
