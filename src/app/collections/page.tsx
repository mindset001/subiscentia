import CollectionsHero from '@/components/collections/CollectionsHero';
import MostBelovedFragrancesHeader from '@/components/collections/MostBelovedFragrancesHeader';
import EssenceCollection from '@/components/collections/EssenceCollection';
import Navbar from '@/components/Navbar';
import { JoinScentJourney } from '@/components/landing';
import Footer from '@/components/Footer';

export default function Collections() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      {/* Hero Section */}
      <CollectionsHero />
      {/* Most Beloved Fragrances Header Section */}
      <MostBelovedFragrancesHeader />
      {/* Essence Collection Section */}
      <EssenceCollection />
      {/* ...existing collections content... */}
      <EssenceCollection />
      {/* ...existing collections content... */}
      <JoinScentJourney/>
      <Footer/>
    </div>
  );
}
