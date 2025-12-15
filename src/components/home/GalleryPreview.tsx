import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import chillersVenue1 from "@/assets/chillers-venue-1.jpg";

const fallbackImages = [
  chillersVenue1,
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
  "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
];

export function GalleryPreview() {
  const [images, setImages] = useState<string[]>(fallbackImages);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPreviewImages();
  }, []);

  const fetchPreviewImages = async () => {
    try {
      const { data, error } = await supabase
        .from("generated_images")
        .select("storage_path, category")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;

      if (data && data.length > 0) {
        const dbImages = data.map((img) => {
          const { data: urlData } = supabase.storage
            .from("generated-images")
            .getPublicUrl(img.storage_path);
          return urlData.publicUrl;
        });

        // Fill remaining slots with fallbacks if needed
        const combinedImages = [...dbImages];
        let fallbackIndex = 0;
        while (combinedImages.length < 6 && fallbackIndex < fallbackImages.length) {
          combinedImages.push(fallbackImages[fallbackIndex]);
          fallbackIndex++;
        }

        setImages(combinedImages);
      }
    } catch (error) {
      console.error("Error fetching preview images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neon-gold/10 text-neon-gold px-4 py-2 rounded-full mb-4">
            <Camera className="w-4 h-4" />
            <span className="font-medium text-sm">Powered by Jay Photography</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase mb-4">
            <span className="text-accent neon-text-pink">Event</span> Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Relive the magic from our past events. Every night is a story.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <Skeleton
                    className={`aspect-square ${
                      index === 0 ? "md:aspect-auto md:h-full md:min-h-[400px]" : ""
                    }`}
                  />
                </div>
              ))
            : images.map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <div className={`aspect-square ${index === 0 ? "md:aspect-auto md:h-full" : ""}`}>
                    <img
                      src={image}
                      alt={`Event photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-foreground font-bold text-lg">View</span>
                  </div>
                </div>
              ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent/10 font-bold"
          >
            <Link to="/gallery">
              View Full Gallery <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
