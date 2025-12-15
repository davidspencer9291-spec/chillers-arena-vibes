import { useState } from "react";
import { User, Mail, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RSVPFormProps {
  eventName: string;
  onSuccess?: () => void;
}

export function RSVPForm({ eventName, onSuccess }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    partySize: "1",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("event_rsvps").insert({
        event_name: eventName,
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        party_size: parseInt(formData.partySize),
      });

      if (error) throw error;

      toast({
        title: "RSVP Confirmed! 🎉",
        description: `You're on the list for ${eventName}. See you there!`,
      });

      setFormData({ fullName: "", email: "", phone: "", partySize: "1" });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="fullName"
            placeholder="Your name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="pl-10 bg-muted border-border"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10 bg-muted border-border"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone (Optional)</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="+234 xxx xxx xxxx"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="pl-10 bg-muted border-border"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="partySize">Party Size</Label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="partySize"
            type="number"
            min="1"
            max="20"
            value={formData.partySize}
            onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
            className="pl-10 bg-muted border-border"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
      >
        {isLoading ? "Submitting..." : "Confirm RSVP"}
      </Button>
    </form>
  );
}
