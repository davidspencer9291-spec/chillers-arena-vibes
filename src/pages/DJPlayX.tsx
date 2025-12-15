import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Youtube, Music2, Headphones, Calendar, Mail } from "lucide-react";

const mixtapes = [
  { title: "Chillers Sensation Vol. 1", plays: "50K+", year: "2024" },
  { title: "Keffi Block Party Mix", plays: "35K+", year: "2024" },
  { title: "Afro Summer Vibes", plays: "28K+", year: "2023" },
  { title: "New Year's Eve Special", plays: "42K+", year: "2023" },
];

const genres = ["Afrobeats", "Amapiano", "Afro-House", "Hip-Hop", "R&B", "Dancehall", "Reggae"];

const DJPlayX = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1571266028243-d220c6cf3a51?w=1920&q=80"
              alt="DJ Play X"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>

          {/* Spotlight Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
          </div>

          <div className="relative container mx-auto px-4 pb-16 pt-32">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-4">
                <Headphones className="w-4 h-4" />
                <span className="font-medium text-sm">Resident DJ</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black uppercase mb-4">
                <span className="text-primary neon-text-blue">DJ</span>
                <br />
                <span className="text-accent neon-text-pink">Play X</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                The heartbeat of Chiller's Arena. Setting the soundtrack for Keffi's legendary nights.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-primary hover:bg-primary/90 font-bold">
                  <a href="https://instagram.com/djplayx" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5 mr-2" /> Follow
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  <a href="mailto:booking@chillersarena.com">
                    <Mail className="w-5 h-5 mr-2" /> Book DJ Play X
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  The <span className="text-primary">Story</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  DJ Play X emerged from the vibrant streets of Keffi with a passion for music 
                  that transcends boundaries. What started as bedroom mixing sessions has evolved 
                  into becoming one of Nasarawa State's most sought-after DJs.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Known for his electrifying sets that seamlessly blend Afrobeats, Amapiano, and 
                  international hits, DJ Play X has become synonymous with quality entertainment 
                  at Chiller's Arena. His ability to read the crowd and create unforgettable 
                  moments on the dance floor has earned him a dedicated following.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Beyond the decks, DJ Play X is committed to nurturing the next generation of 
                  talent and elevating the music scene in Northern Nigeria.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold">Genres</h3>
                <div className="flex flex-wrap gap-3">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-display font-bold pt-4">Social Media</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/djplayx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://tiktok.com/@djplayx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Music2 className="w-6 h-6" />
                  </a>
                  <a
                    href="https://youtube.com/@djplayx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mixtapes Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                <span className="text-accent">Mixtapes</span> & Sets
              </h2>
              <p className="text-muted-foreground text-lg">
                Listen to DJ Play X's hottest mixes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mixtapes.map((mixtape, index) => (
                <Card
                  key={mixtape.title}
                  className="bg-background border-border hover:border-primary/50 transition-all duration-300 group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                      <Music2 className="w-16 h-16 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {mixtape.title}
                    </h3>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{mixtape.plays} plays</span>
                      <span>{mixtape.year}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Appearances */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                <span className="text-primary">Upcoming</span> Appearances
              </h2>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              {[
                { event: "Chillers Sensation", date: "Every Saturday", venue: "Chiller's Arena" },
                { event: "Keffi Mega Block Party", date: "Dec 25, 2024", venue: "Stadium Road" },
                { event: "NYE Countdown", date: "Dec 31, 2024", venue: "Chiller's Arena" },
              ].map((show, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">{show.event}</h4>
                      <p className="text-sm text-muted-foreground">{show.venue}</p>
                    </div>
                  </div>
                  <span className="text-primary font-medium">{show.date}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DJPlayX;
