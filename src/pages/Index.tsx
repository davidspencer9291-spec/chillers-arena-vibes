import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedEvents } from "@/components/home/FeaturedEvents";
import { DJSpotlight } from "@/components/home/DJSpotlight";
import { GalleryPreview } from "@/components/home/GalleryPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedEvents />
        <DJSpotlight />
        <GalleryPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
