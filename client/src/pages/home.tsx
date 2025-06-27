import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import UploadSection from "@/components/upload-section";
import FeaturesSection from "@/components/features-section";
import GallerySection from "@/components/gallery-section";
import FAQSection from "@/components/faq-section";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <UploadSection />
      <FeaturesSection />
      <GallerySection />
      <FAQSection />
      <ContactForm />
      <Footer />
    </div>
  );
}
