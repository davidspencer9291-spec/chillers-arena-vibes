import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation as NavIcon } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    details: ["Gauta/Stadium Road", "By Sanbisa Market", "Keffi, Nasarawa State"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+234 801 234 5678", "+234 802 345 6789"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@chillersarena.com", "booking@chillersarena.com"],
  },
  {
    icon: Clock,
    title: "Opening Hours",
    details: ["Wed - Sun: 8 PM - 4 AM", "Mon - Tue: Closed"],
  },
];

const Contact = () => {
  // Google Maps embed URL for Keffi, Nasarawa State
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31457.52985076687!2d7.8499!3d8.8494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0c1f9d7e3a3d%3A0x8c3e5c1f9d7e3a3d!2sKeffi%2C%20Nasarawa!5e0!3m2!1sen!2sng!4v1640000000000!5m2!1sen!2sng";
  
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Gauta+Stadium+Road+Keffi+Nasarawa+State+Nigeria";
  const whatsappUrl = "https://wa.me/2348012345678?text=Hello%20Chiller's%20Arena!";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <PageHeader
          title="Contact Us"
          subtitle="Get in touch with us or find your way to the party"
        />

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info & Form */}
              <div className="space-y-8">
                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.map((item, index) => (
                    <Card
                      key={item.title}
                      className="bg-card border-border hover:border-primary/50 transition-all duration-300 animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold mb-1">{item.title}</h3>
                            {item.details.map((detail, i) => (
                              <p key={i} className="text-sm text-muted-foreground">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700 text-white font-bold"
                  >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                      <NavIcon className="w-5 h-5 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                </div>

                {/* Contact Form */}
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-display font-bold mb-4">Send us a Message</h3>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>

              {/* Map Section */}
              <div className="space-y-4">
                <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] rounded-2xl overflow-hidden neon-border">
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Chiller's Arena Location"
                    className="absolute inset-0"
                  />
                  {/* Map Overlay with Custom Pin */}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Chiller's Arena</p>
                        <p className="text-xs text-muted-foreground">Keffi, Nigeria</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Directions Info */}
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <NavIcon className="w-4 h-4 text-primary" />
                      How to Find Us
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Located on Gauta/Stadium Road</li>
                      <li>• Near Sanbisa Market</li>
                      <li>• Look for the neon lights!</li>
                      <li>• Parking available on-site</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
