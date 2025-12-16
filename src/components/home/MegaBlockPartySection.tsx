import { Calendar, MapPin, Music, Star } from "lucide-react";
import { EventCountdown } from "./EventCountdown";
import { ReminderForm } from "@/components/forms/ReminderForm";

const EVENT_DATE = new Date("2026-01-31T16:00:00");

export function MegaBlockPartySection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Mega Event</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black uppercase mb-4">
            <span className="text-accent neon-text-gold">Mega Block Party</span>
            <br />
            <span className="text-foreground">0.1 - The First Wave</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The biggest street party Keffi has ever seen is coming! Be part of history.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <p className="text-center text-sm text-muted-foreground uppercase tracking-wider mb-4">
            Countdown to the madness
          </p>
          <EventCountdown targetDate={EVENT_DATE} />
        </div>

        {/* Event Info & Reminder Form Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Event Details */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-accent/20">
            <h3 className="text-xl font-display font-bold text-foreground mb-6">Event Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Date & Time</p>
                  <p className="text-muted-foreground">January 31, 2026 • 4:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Location</p>
                  <p className="text-muted-foreground">Gauta/Stadium Road, Keffi, Nasarawa State</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Music className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Featuring</p>
                  <p className="text-muted-foreground">DJ Play X, Killerverse Rohi & Special Guests</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-accent font-medium">
                🔥 Free Entry • Live Performances • Street Food • Good Vibes Only
              </p>
            </div>
          </div>

          {/* Reminder Signup */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-primary/20">
            <h3 className="text-xl font-display font-bold text-foreground mb-2">Get Reminded</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Don't miss out! Sign up and we'll remind you before the event.
            </p>
            <ReminderForm eventName="Mega Block Party 0.1 - The First Wave" />
          </div>
        </div>
      </div>
    </section>
  );
}
