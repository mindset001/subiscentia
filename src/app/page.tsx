import { Hero, FragranceCollections, MostBelovedFragrances, JoinScentJourney, LuminousFlorals } from "@/components/landing";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Fragrance Collections Section */}
      <FragranceCollections />
        {/* Luminous Florals Section */}
      <LuminousFlorals />

      {/* Most Beloved Fragrances Section */}
      <MostBelovedFragrances />

     
    
    </div>
  );
}
