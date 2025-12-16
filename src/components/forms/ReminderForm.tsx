import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Bell, Loader2 } from "lucide-react";

interface ReminderFormProps {
  eventName?: string;
  onSuccess?: () => void;
}

export function ReminderForm({ eventName = "Mega Block Party 0.1", onSuccess }: ReminderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const full_name = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    const { error } = await supabase.from("event_reminders").insert({
      full_name: full_name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      event_name: eventName,
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "You're on the list!",
      description: "We'll remind you before the event. Get ready to party!",
    });

    (e.target as HTMLFormElement).reset();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reminder_name" className="text-foreground">Full Name</Label>
        <Input
          id="reminder_name"
          name="full_name"
          placeholder="Enter your full name"
          required
          className="bg-background/50 border-border/50 focus:border-accent"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reminder_email" className="text-foreground">Email</Label>
        <Input
          id="reminder_email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          className="bg-background/50 border-border/50 focus:border-accent"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reminder_phone" className="text-foreground">Phone (Optional)</Label>
        <Input
          id="reminder_phone"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          className="bg-background/50 border-border/50 focus:border-accent"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold neon-border-gold"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Bell className="w-4 h-4 mr-2" />
        )}
        Get Reminded
      </Button>
    </form>
  );
}
