import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactHero from "@/components/contact/ContactHero";
import Footer from "@/components/Footer";
import { JoinScentJourney } from "@/components/landing";
import Navbar from "@/components/Navbar";


export default function Collections() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Navbar/>
      <ContactHero />
      <ContactFormSection/>
      <JoinScentJourney/>
      <Footer/>
    </div>
  );
}
