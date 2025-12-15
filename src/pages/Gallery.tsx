import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/shared/PageHeader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

const categories = [
  { id: "all", label: "All" },
  { id: "gallery", label: "Gallery" },
  { id: "events", label: "Events" },
  { id: "artists", label: "Artists" },
  { id: "hero", label: "Hero" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("generated_images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching images:", error);
        return;
      }

      const galleryImages: GalleryImage[] = (data || []).map((img) => ({
        id: img.id,
        src: supabase.storage.from("generated-images").getPublicUrl(img.storage_path).data.publicUrl,
        alt: img.prompt.substring(0, 50),
        category: img.category,
      }));

      setImages(galleryImages);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredImages = activeCategory === "all"
    ? images
    : images.filter((img) => img.category === activeCategory);

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

            {/* Loading State */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
                <p className="text-muted-foreground">Loading gallery...</p>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-20">
                <Camera className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground text-lg">No images yet</p>
                <p className="text-muted-foreground/70 text-sm mt-2">
                  Generate images at /admin/images to populate the gallery
                </p>
              </div>
            ) : (
              /* Gallery Grid */
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
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
