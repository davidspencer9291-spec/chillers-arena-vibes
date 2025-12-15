import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Music2, MapPin, Phone, Mail } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const socialLinks = [
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/chillersarena" },
  { name: "Facebook", icon: Facebook, url: "https://facebook.com/chillersarena" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com/@chillersarena" },
  { name: "TikTok", icon: Music2, url: "https://tiktok.com/@chillersarena" },
];

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-neon-gradient flex items-center justify-center">
                <Music2 className="w-5 h-5 text-background" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="text-primary">CHILLER'S</span>
                <span className="text-accent ml-1">ARENA</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Keffi's premier nightlife and entertainment venue. Building a cultural era, one event at a time.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Gauta/Stadium Road, by Sanbisa Market, Keffi, Nasarawa State</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+2348012345678" className="text-sm hover:text-primary transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@chillersarena.com" className="text-sm hover:text-primary transition-colors">
                  info@chillersarena.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe for exclusive event updates and offers.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {new Date().getFullYear()} Chiller's Arena. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Photography by <span className="text-primary">Jay Photography</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
