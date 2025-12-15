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

const presetPrompts = [
  {
    label: "Nightclub Crowd",
    prompt: "Vibrant African nightclub scene with energetic crowd dancing under neon blue and pink lights, urban atmosphere, concert photography style, high energy party vibe"
  },
  {
    label: "DJ Performance",
    prompt: "Professional DJ performing on stage with dramatic spotlight beams and colorful laser effects, crowd silhouettes in foreground, concert photography, neon lighting"
  },
  {
    label: "Afrobeats Party",
    prompt: "Exciting Afrobeats concert party with diverse crowd celebrating, colorful stage lights, Nigerian nightclub atmosphere, vibrant energy"
  },
  {
    label: "VIP Lounge",
    prompt: "Stylish VIP lounge area in upscale nightclub with purple and gold ambient lighting, elegant decor, bottle service setup"
  },
  {
    label: "DJ Equipment",
    prompt: "Close-up of professional DJ mixer and turntables with neon glow effects, smoke atmosphere, nightclub setting"
  },
  {
    label: "Dance Floor",
    prompt: "Packed dance floor with people dancing, colorful LED lights from above, smoke machine effects, nightclub party atmosphere"
  },
  {
    label: "Stage Lights",
    prompt: "Dramatic stage with concert lighting, spotlights and laser beams cutting through smoke, empty stage ready for performance"
  },
  {
    label: "Artist Portrait",
    prompt: "Professional portrait of a DJ artist with neon lighting, urban style, confident pose, nightclub background blur"
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
                  <div className="flex flex-wrap gap-2">
                    {presetPrompts.map((preset) => (
                      <Button
                        key={preset.label}
                        variant="outline"
                        size="sm"
                        onClick={() => setPrompt(preset.prompt)}
                        className="text-xs"
                      >
                        {preset.label}
                      </Button>
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
