import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutValues from '@/components/about/AboutValues';
import AboutBottleShowcase from '@/components/about/AboutBottleShowcase';
import Navbar from '@/components/Navbar';
import { JoinScentJourney } from '@/components/landing';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      {/* Hero Section */}
      <AboutHero />
      {/* About Story Section */}
      <AboutStory />
      {/* About Values Section */}
      <AboutValues />
      {/* Bottle Showcase Section */}
      <AboutBottleShowcase />

      <JoinScentJourney/>
      <Footer/>
   
    </div>
  );
}
