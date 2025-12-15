import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featuredEvents = [
  {
    id: 1,
    title: "Chillers Sensation",
    date: "Every Saturday",
    time: "10 PM",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80",
    description: "Weekly party featuring DJ Play X and guest DJs.",
  },
  {
    id: 2,
    title: "Keffi Mega Block Party",
    date: "December 25, 2024",
    time: "4 PM",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    description: "The biggest street party in Nasarawa State.",
  },
  {
    id: 3,
    title: "New Year's Eve Countdown",
    date: "December 31, 2024",
    time: "9 PM",
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&q=80",
    description: "Ring in the new year with live performances.",
  },
];

export function FeaturedEvents() {
  return (
    <section className="py-20 md:py-28 relative">
      {/* Background Texture */}
      <div className="absolute inset-0 texture-graffiti" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase mb-4">
            <span className="text-primary neon-text-blue">Upcoming</span> Events
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't miss out on the hottest events in Keffi. Get your spot now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredEvents.map((event, index) => (
            <Card
              key={event.id}
              className="group bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                  HOT
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-primary" />
                    {event.time}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 font-bold"
          >
            <Link to="/events">
              View All Events <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
