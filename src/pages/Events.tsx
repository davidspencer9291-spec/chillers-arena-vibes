import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/shared/PageHeader";
import { SocialShare } from "@/components/shared/SocialShare";
import { RSVPForm } from "@/components/forms/RSVPForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Users, Ticket } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Chillers Sensation",
    date: "Every Saturday",
    time: "10:00 PM - 4:00 AM",
    location: "Chiller's Arena, Keffi",
    description: "Our legendary weekly party featuring DJ Play X spinning the hottest Afrobeats, Amapiano, and international hits. Free entry before 11 PM!",
    artists: ["DJ Play X", "Guest DJs"],
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80",
    status: "recurring",
    highlight: false,
  },
  {
    id: 2,
    title: "Keffi Mega Block Party",
    date: "January 31, 2026",
    time: "4:00 PM - 12:00 AM",
    location: "Stadium Road, Keffi",
    description: "The biggest street party in Nasarawa State returns! Live performances, food vendors, and non-stop music. An unforgettable experience for the whole family!",
    artists: ["DJ Play X", "Rohi", "Killerverse", "Capt Karisma", "Special Guests"],
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    status: "upcoming",
    highlight: true,
  },
  {
    id: 3,
    title: "Valentine's Night Special",
    date: "February 14, 2026",
    time: "9:00 PM - 4:00 AM",
    location: "Chiller's Arena, Keffi",
    description: "Celebrate love with the ultimate Valentine's experience. Couples get special treatment, romantic ambiance, and the best music.",
    artists: ["DJ Play X", "Live Band", "Special Guests"],
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&q=80",
    status: "upcoming",
    highlight: false,
  },
  {
    id: 4,
    title: "Afrobeats Night",
    date: "March 15, 2026",
    time: "10:00 PM - 4:00 AM",
    location: "Chiller's Arena, Keffi",
    description: "A special night dedicated to the best of Afrobeats. Special guest performances and exclusive vibes.",
    artists: ["DJ Play X", "Guest Performers"],
    image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&q=80",
    status: "upcoming",
    highlight: false,
  },
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  
  const highlightedEvent = events.find(e => e.highlight);
  const regularEvents = events.filter(e => !e.highlight);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <PageHeader
          title="Upcoming Events"
          subtitle="Experience the best nightlife in Keffi. RSVP and secure your spot at Chiller's Arena."
        />

        {/* Featured Event - Mega Block Party */}
        {highlightedEvent && (
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
              <div className="mb-6">
                <span className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm font-bold tracking-wider animate-pulse">
                  ★ FEATURED EVENT ★
                </span>
              </div>
              <Card className="bg-gradient-to-br from-card via-card to-primary/10 border-2 border-accent/50 overflow-hidden group hover:border-accent transition-all duration-500 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                    <img
                      src={highlightedEvent.image}
                      alt={highlightedEvent.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-transparent to-transparent lg:bg-gradient-to-t" />
                    <div className="absolute top-4 left-4 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-bold tracking-wider shadow-lg">
                      🔥 BIGGEST EVENT OF 2026
                    </div>
                  </div>

                  <CardContent className="p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-accent drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                      {highlightedEvent.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">{highlightedEvent.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 text-foreground bg-muted/50 p-3 rounded-lg">
                        <Calendar className="w-5 h-5 text-accent" />
                        <span className="font-semibold">{highlightedEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground bg-muted/50 p-3 rounded-lg">
                        <Clock className="w-5 h-5 text-accent" />
                        <span className="font-semibold">{highlightedEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground bg-muted/50 p-3 rounded-lg sm:col-span-2">
                        <MapPin className="w-5 h-5 text-accent" />
                        <span className="font-semibold">{highlightedEvent.location}</span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-semibold">Performing Artists</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {highlightedEvent.artists.map((artist) => (
                          <span
                            key={artist}
                            className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium"
                          >
                            {artist}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            onClick={() => setSelectedEvent(highlightedEvent)}
                            size="lg"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 shadow-lg shadow-accent/30"
                          >
                            <Ticket className="w-5 h-5 mr-2" />
                            RSVP Now - It's Free!
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-display">
                              RSVP for {highlightedEvent.title}
                            </DialogTitle>
                          </DialogHeader>
                          <RSVPForm eventName={highlightedEvent.title} />
                        </DialogContent>
                      </Dialog>
                      <SocialShare title={`Join me at ${highlightedEvent.title} - Chiller's Arena Keffi`} />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Regular Events */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
              More Events at <span className="text-primary">Chiller's Arena</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {regularEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-all duration-500 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold ${
                      event.status === "recurring" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-accent text-accent-foreground"
                    }`}>
                      {event.status === "recurring" ? "WEEKLY" : "UPCOMING"}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{event.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {event.location}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">Artists</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {event.artists.map((artist) => (
                          <span
                            key={artist}
                            className="px-3 py-1 bg-muted rounded-full text-xs font-medium"
                          >
                            {artist}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            onClick={() => setSelectedEvent(event)}
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                          >
                            <Ticket className="w-4 h-4 mr-2" />
                            RSVP Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-display">
                              RSVP for {event.title}
                            </DialogTitle>
                          </DialogHeader>
                          <RSVPForm eventName={event.title} />
                        </DialogContent>
                      </Dialog>
                      <SocialShare title={`Join me at ${event.title} - Chiller's Arena`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
