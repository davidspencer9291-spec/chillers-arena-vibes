import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/shared/PageHeader";
import { Target, Users, Zap, Award } from "lucide-react";

const milestones = [
  { year: "2020", event: "Chiller's Arena Opens", description: "The beginning of a new era in Keffi nightlife." },
  { year: "2021", event: "First Mega Block Party", description: "Over 5,000 attendees in our first major event." },
  { year: "2022", event: "Chillers Sensation Launch", description: "Weekly events become the talk of the town." },
  { year: "2023", event: "Regional Recognition", description: "Featured in top entertainment platforms." },
  { year: "2024", event: "Expanding the Legacy", description: "New partnerships and bigger events." },
];

const values = [
  {
    icon: Zap,
    title: "Energy",
    description: "We bring unmatched energy to every event, creating experiences that stay with you.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building connections and bringing people together through music and entertainment.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Setting the standard for nightlife entertainment in Nasarawa State.",
  },
  {
    icon: Award,
    title: "Culture",
    description: "Celebrating and elevating Afro-urban culture through unforgettable experiences.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <PageHeader
          title="About Us"
          subtitle="Building a cultural era in Keffi's entertainment scene"
        />

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden neon-border">
                  <img
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"
                    alt="Chiller's Arena crowd"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-4 rounded-xl font-bold">
                  <div className="text-3xl">4+</div>
                  <div className="text-sm opacity-80">Years of Excellence</div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  The <span className="text-primary">Heart</span> of Keffi Nightlife
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Chiller's Arena was born from a vision to create more than just a nightclub. 
                  Located on Gauta/Stadium Road, by Sanbisa Market in Keffi, we've become the 
                  epicenter of entertainment in Nasarawa State.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  From our legendary weekly Chillers Sensation parties to the massive Keffi 
                  Mega Block Party, we've hosted thousands of unforgettable nights. Our 
                  resident DJ Play X and talented guest artists have made Chiller's Arena 
                  synonymous with quality entertainment.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We're not just building a venue—we're building a <span className="text-primary font-semibold">cultural era</span>. 
                  A place where memories are made, friendships are forged, and the music never stops.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Our <span className="text-accent">Values</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                What drives us to create exceptional experiences every single night.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Our <span className="text-primary">Journey</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From humble beginnings to becoming Keffi's premier entertainment destination.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className="relative pl-8 pb-12 last:pb-0 border-l-2 border-border"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />
                  <div className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="text-primary font-bold text-lg">{milestone.year}</span>
                    <h3 className="text-xl font-bold mt-1">{milestone.event}</h3>
                    <p className="text-muted-foreground mt-2">{milestone.description}</p>
                  </div>
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

export default About;
