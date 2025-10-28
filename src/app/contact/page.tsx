import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactHero from "@/components/contact/ContactHero";


export default function Collections() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <ContactHero />
      <ContactFormSection/>
      
    </div>
  );
}
