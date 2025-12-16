import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Music2, Youtube } from "lucide-react";

const artists = [
  {
    name: "Rohi",
    role: "Vocalist / Performer",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
    bio: "Known for captivating vocals that blend Afrobeats with soulful melodies.",
    genres: ["Afrobeats", "Soul"],
    instagram: "https://instagram.com/rohi",
    tiktok: "https://tiktok.com/@rohi",
    youtube: "https://youtube.com/@rohi",
  },
  {
    name: "Killerverse",
    role: "Rapper / Lyricist",
    image: "https://images.unsplash.com/photo-508700115892-45ecd05ae2ad?w=600&q=80",
    bio: "Lyrical wordsmith bringing fire bars and energy to every performance.",
    genres: ["Hip-Hop", "Rap"],
    instagram: "https://instagram.com/killerverse",
    tiktok: "https://tiktok.com/@killerverse",
    youtube: "https://youtube.com/@killerverse",
  },
  {
    name: "Jahku Beatz",
    role: "Producer",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
    bio: "Master producer crafting the beats that move Keffi's nightlife.",
    genres: ["Afro-House", "Amapiano"],
    instagram: "https://instagram.com/jahkubeatz",
    tiktok: "https://tiktok.com/@jahkubeatz",
    youtube: "https://youtube.com/@jahkubeatz",
  },
  {
    name: "Capt Karisma",
    role: "MC / Hypeman",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80",
    bio: "The voice that hypes every crowd. Master of ceremonies and energy.",
    genres: ["MC", "Entertainment"],
    instagram: "https://instagram.com/captkarisma",
    tiktok: "https://tiktok.com/@captkarisma",
    youtube: "https://youtube.com/@captkarisma",
  },
  {
    name: "DJ Starboy",
    role: "Guest DJ",
    image: "https://images.unsplash.com/photo-1571266028243-d220c6cf3a51?w=600&q=80",
    bio: "Rising star bringing fresh sounds from Lagos to Keffi.",
    genres: ["Afrobeats", "Dancehall"],
    instagram: "https://instagram.com/djstarboy",
    tiktok: "https://tiktok.com/@djstarboy",
    youtube: "https://youtube.com/@djstarboy",
  },
  {
    name: "Melody Queen",
    role: "Singer / Songwriter",
    image: "https://images.unsplash.com/photo-1559570278-eb8d71d06403?w=600&q=80",
    bio: "Sultry vocals and powerful performances that leave audiences speechless.",
    genres: ["R&B", "Afrobeats"],
    instagram: "https://instagram.com/melodyqueen",
    tiktok: "https://tiktok.com/@melodyqueen",
    youtube: "https://youtube.com/@melodyqueen",
  },
];

const team = [
  {
    name: "BIG Puzzle",
    role: "Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: "The mastermind behind the scenes, ensuring everything runs smoothly at Chiller's Arena.",
    instagram: "https://instagram.com/bigpuzzle",
    tiktok: "https://tiktok.com/@bigpuzzle",
    youtube: "https://youtube.com/@bigpuzzle",
  },
];

const Artists = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <PageHeader
          title="Guest Artists"
          subtitle="The talented performers who light up our stage"
          accentWord="Guest"
        />

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artists.map((artist, index) => (
                <Card
                  key={artist.name}
                  className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-all duration-500 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Social Links */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <a
                        href={artist.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a
                        href={artist.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <Music2 className="w-4 h-4" />
                      </a>
                      <a
                        href={artist.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <Youtube className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-display font-bold mb-1 group-hover:text-primary transition-colors">
                        {artist.name}
                      </h3>
                      <p className="text-accent font-medium">{artist.role}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{artist.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {artist.genres.map((genre) => (
                        <span
                          key={genre}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-xs font-medium"
                        >
                          <Music2 className="w-3 h-3" />
                          {genre}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 md:py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Meet the <span className="text-accent">Team</span>
            </h2>
            <div className="flex justify-center">
              {team.map((member, index) => (
                <Card
                  key={member.name}
                  className="bg-card border-border overflow-hidden group hover:border-accent/50 transition-all duration-500 animate-slide-up max-w-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-background/80 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a
                        href={member.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-background/80 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                      >
                        <Music2 className="w-4 h-4" />
                      </a>
                      <a
                        href={member.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-background/80 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                      >
                        <Youtube className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-display font-bold mb-1 group-hover:text-accent transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Want to <span className="text-accent">Perform</span> at Chiller's Arena?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              We're always looking for talented artists to join our stage. If you've got what it takes, 
              reach out to us and let's make magic happen.
            </p>
            <a
              href="mailto:booking@chillersarena.com"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4 rounded-xl transition-all duration-300"
            >
              Contact for Booking
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Artists;
