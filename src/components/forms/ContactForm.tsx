import { useState } from "react";
import { User, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("contact_messages").insert({
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      if (error) throw error;

      toast({
        title: "Message Sent! ✉️",
        description: "We'll get back to you soon.",
      });

      setFormData({ fullName: "", email: "", message: "" });
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
        <Label htmlFor="contactName">Full Name *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="contactName"
            placeholder="Your name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="pl-10 bg-muted border-border"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactEmail">Email *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="contactEmail"
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
        <Label htmlFor="contactMessage">Message *</Label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Textarea
            id="contactMessage"
            placeholder="How can we help you?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="pl-10 bg-muted border-border min-h-[120px]"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 font-bold"
      >
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
