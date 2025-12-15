import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Wand2, Trash2, Download, Image as ImageIcon } from "lucide-react";

const presetCategories = [
  {
    category: "Chiller's Arena Specials",
    presets: [
      {
        label: "Keffi Nightlife",
        prompt: "Nigerian street-style nightclub exterior at night in Keffi, neon signs glowing, excited crowd arriving dressed stylishly, urban African atmosphere, warm humid evening, street vendors nearby"
      },
      {
        label: "Afrobeats Live",
        prompt: "Nigerian artist performing live Afrobeats on stage, crowd going wild with hands up, green and white accent lights, concert energy, Lagos nightclub vibes"
      },
      {
        label: "Nigerian VIP",
        prompt: "Upscale Nigerian nightclub VIP section with champagne towers and bottle sparklers, elegant African party elite celebrating, gold and purple ambient lighting, luxury setting"
      },
      {
        label: "Owambe Party",
        prompt: "Colorful Nigerian owambe celebration in modern nightclub, traditional party vibes mixed with neon club lighting, aso-ebi style, joyful dancing, vibrant energy"
      },
      {
        label: "Amapiano Night",
        prompt: "Amapiano dance party in Nigerian club, stylish dancers in trendy outfits, deep house atmosphere, smoke effects, blue and orange lighting"
      },
      {
        label: "Ladies Night",
        prompt: "Glamorous Nigerian women celebrating ladies night, elegant dresses and high fashion, champagne glasses, pink and gold lighting, upscale nightclub atmosphere"
      },
      {
        label: "Birthday Bash",
        prompt: "Nigerian birthday celebration at nightclub with LED cake, sparklers, VIP booth setup, balloons and decorations, excited friends celebrating"
      },
      {
        label: "Club Entrance",
        prompt: "Excited crowd queuing at Nigerian nightclub entrance, bouncers at velvet rope, neon club sign, urban street scene, anticipation energy"
      }
    ]
  },
  {
    category: "Club Scenes",
    presets: [
      {
        label: "Dance Floor",
        prompt: "Packed dance floor with people dancing, colorful LED lights from above, smoke machine effects, nightclub party atmosphere, silhouettes moving"
      },
      {
        label: "Smoke & Lasers",
        prompt: "Dense club atmosphere with smoke machines, cutting laser beams in multiple colors, silhouettes dancing, dramatic lighting effects"
      },
      {
        label: "Stage Lights",
        prompt: "Dramatic stage with concert lighting, spotlights and laser beams cutting through smoke, empty stage ready for performance"
      },
      {
        label: "VIP Lounge",
        prompt: "Stylish VIP lounge area in upscale nightclub with purple and gold ambient lighting, elegant decor, bottle service setup"
      },
      {
        label: "After Party",
        prompt: "Late night intimate club setting, low warm lights, relaxed sophisticated atmosphere, small groups conversing, end of night vibes"
      }
    ]
  },
  {
    category: "Artists & DJs",
    presets: [
      {
        label: "Nigerian DJ",
        prompt: "Nigerian DJ spinning Afrobeats at mixer, green white green flag color accent lighting, professional equipment, focused performance, crowd visible"
      },
      {
        label: "DJ Equipment",
        prompt: "Close-up of professional DJ mixer and turntables with neon glow effects, smoke atmosphere, nightclub setting"
      },
      {
        label: "Live Band",
        prompt: "Nigerian live band performing on stage, brass section, energetic performance, colorful stage lights, audience engagement"
      },
      {
        label: "Artist Portrait",
        prompt: "Professional portrait of a DJ artist with neon lighting, urban style, confident pose, nightclub background blur"
      },
      {
        label: "MC on Stage",
        prompt: "Hype man with microphone on stage, crowd interaction, spotlight beam, energetic pose, Nigerian nightclub performance"
      }
    ]
  }
];

interface GeneratedImage {
  id: string;
  prompt: string;
  storage_path: string;
  category: string;
  created_at: string;
}

export default function AdminImages() {
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("gallery");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("generated_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching images:", error);
      return;
    }

    setGeneratedImages(data || []);
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setPreviewUrl(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt, category },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Image generated successfully!");
      setPreviewUrl(data.imageUrl);
      fetchImages();
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteImage = async (id: string, storagePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("generated-images")
        .remove([storagePath]);

      if (storageError) {
        console.error("Storage delete error:", storageError);
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from("generated_images")
        .delete()
        .eq("id", id);

      if (dbError) {
        throw dbError;
      }

      toast.success("Image deleted");
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  const getPublicUrl = (storagePath: string) => {
    const { data } = supabase.storage
      .from("generated-images")
      .getPublicUrl(storagePath);
    return data.publicUrl;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-black uppercase mb-8">
            <span className="text-accent neon-text-pink">AI</span> Image Generator
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Generator Panel */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-accent" />
                  Generate New Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Quick Presets
                  </label>
                  <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {presetCategories.map((cat) => (
                      <div key={cat.category}>
                        <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                          {cat.category}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.presets.map((preset) => (
                            <Button
                              key={preset.label}
                              variant="outline"
                              size="sm"
                              onClick={() => setPrompt(preset.prompt)}
                              className="text-xs h-7"
                            >
                              {preset.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Custom Prompt
                  </label>
                  <Textarea
                    placeholder="Describe the image you want to generate..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="bg-background"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Category
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gallery">Gallery</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="artists">Artists</SelectItem>
                      <SelectItem value="hero">Hero Backgrounds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-accent hover:bg-accent/80"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Preview Panel */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-neon-blue" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
                      <p className="text-muted-foreground">Creating your image...</p>
                      <p className="text-sm text-muted-foreground/60">This may take 15-30 seconds</p>
                    </div>
                  </div>
                ) : previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Generated preview"
                      className="w-full rounded-lg"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(previewUrl, "_blank")}
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Generated image will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Generated Images Gallery */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Generated Images ({generatedImages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedImages.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No images generated yet. Create your first one above!
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {generatedImages.map((image) => (
                    <div
                      key={image.id}
                      className="group relative rounded-lg overflow-hidden bg-muted"
                    >
                      <img
                        src={getPublicUrl(image.storage_path)}
                        alt={image.prompt.substring(0, 50)}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-xs text-foreground line-clamp-2 mb-2">
                            {image.prompt.substring(0, 60)}...
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-accent uppercase">
                              {image.category}
                            </span>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => deleteImage(image.id, image.storage_path)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
