import { Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  url?: string;
  title?: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
  const { toast } = useToast();
  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied!",
        description: "Share it with your friends.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="icon"
          asChild
          className="hover:text-primary"
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-4 h-4" />
          </a>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="icon"
        onClick={copyLink}
        className="hover:text-primary"
        aria-label="Copy link"
      >
        <LinkIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
