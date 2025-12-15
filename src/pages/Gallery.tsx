import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/shared/PageHeader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&q=80", alt: "Crowd at Chillers Sensation", category: "events" },
  { id: 2, src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80", alt: "DJ Performance", category: "dj" },
  { id: 3, src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80", alt: "Concert lights", category: "events" },
  { id: 4, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80", alt: "Block Party crowd", category: "events" },
  { id: 5, src: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=1200&q=80", alt: "Dance floor", category: "events" },
  { id: 6, src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80", alt: "Live performance", category: "artists" },
  { id: 7, src: "https://images.unsplash.com/photo-1571266028243-d220c6cf3a51?w=1200&q=80", alt: "DJ Setup", category: "dj" },
  { id: 8, src: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1200&q=80", alt: "New Year celebration", category: "events" },
  { id: 9, src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80", alt: "Music festival", category: "events" },
  { id: 10, src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80", alt: "Concert stage", category: "artists" },
  { id: 11, src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200&q=80", alt: "Audience cheering", category: "events" },
  { id: 12, src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80", alt: "Guitar performance", category: "artists" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "events", label: "Events" },
  { id: "dj", label: "DJ Moments" },
  { id: "artists", label: "Artists" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const handlePrevious = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[prevIndex].id);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
    const nextIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(filteredImages[nextIndex].id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <PageHeader
          title="Gallery"
          subtitle="Relive the magic from our unforgettable nights"
        />

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            {/* Photo Credit */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Camera className="w-5 h-5 text-neon-gold" />
              <span className="text-muted-foreground">
                Photography by <span className="text-neon-gold font-semibold">Jay Photography</span>
              </span>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className={activeCategory === category.id 
                    ? "bg-primary hover:bg-primary/90" 
                    : "border-border hover:border-primary"
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <Dialog key={image.id}>
                  <DialogTrigger asChild>
                    <div
                      className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => setSelectedImage(image.id)}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-foreground font-bold">View</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                    <div className="relative">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                        onClick={() => setSelectedImage(null)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={handlePrevious}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={handleNext}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
