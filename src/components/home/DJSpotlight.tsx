import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DJSpotlight() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="aspect-square rounded-2xl overflow-hidden neon-border">
              <img
                src="https://images.unsplash.com/photo-1571266028243-d220c6cf3a51?w=800&q=80"
                alt="DJ Play X"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-lg shadow-lg neon-border-pink">
              RESIDENT DJ
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Music2 className="w-4 h-4" />
              <span className="font-medium text-sm">Featured Artist</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase">
              <span className="text-primary neon-text-blue">DJ</span>
              <br />
              <span className="text-accent neon-text-pink">Play X</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              The driving force behind Chiller's Arena legendary nights. DJ Play X brings an 
              electrifying mix of Afrobeats, Amapiano, and international hits that keep the 
              crowd moving until dawn. With years of experience and an unmatched connection 
              with the audience, every set is an unforgettable experience.
            </p>

            <div className="flex flex-wrap gap-3">
              {["Afrobeats", "Amapiano", "Hip-Hop", "Dancehall"].map((genre) => (
                <span
                  key={genre}
                  className="px-4 py-2 bg-muted rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 font-bold"
              >
                <Link to="/dj-playx">
                  View Profile <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10"
              >
                <a
                  href="https://instagram.com/djplayx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="mr-2 w-5 h-5" /> Follow
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
