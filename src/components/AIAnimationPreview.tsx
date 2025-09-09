import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Zap, Play, Pause, Download, Copy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface AIAnimationPreviewProps {
  title?: string;
  isActive?: boolean;
  imageURL?: string;
  prompt?: string;
  isGenerating?: boolean;
  progress?: number;
  generationInfo?: {
    seed: number;
    cost?: number;
    taskUUID: string;
  };
}

const AIAnimationPreview: React.FC<AIAnimationPreviewProps> = ({ 
  title = "AI Animation Preview",
  isActive = false,
  imageURL,
  prompt,
  isGenerating = false,
  progress = 0,
  generationInfo
}) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!imageURL) return;
    
    try {
      const response = await fetch(imageURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `ai-animation-${generationInfo?.taskUUID || Date.now()}.webp`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download Started",
        description: "Your animation is being downloaded",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the animation",
        variant: "destructive",
      });
    }
  };

  const handleCopyURL = async () => {
    if (!imageURL) return;
    
    try {
      await navigator.clipboard.writeText(imageURL);
      toast({
        title: "URL Copied",
        description: "Animation URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy URL to clipboard",
        variant: "destructive",
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            {title}
          </div>
          {imageURL && (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleCopyURL} className="gap-1">
                <Copy className="h-3 w-3" />
                Copy URL
              </Button>
              <Button size="sm" variant="outline" onClick={handleDownload} className="gap-1">
                <Download className="h-3 w-3" />
                Download
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-to-br from-secondary/50 to-background border-2 border-dashed border-primary/20 rounded-lg flex items-center justify-center relative overflow-hidden">
          {imageURL ? (
            <>
              <img 
                src={imageURL} 
                alt={prompt || "Generated animation"} 
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/70 backdrop-blur-sm rounded-lg p-2">
                <Badge variant="secondary" className="text-xs">
                  Generated Successfully
                </Badge>
                {generationInfo && (
                  <div className="text-xs text-white font-mono">
                    Seed: {generationInfo.seed} {generationInfo.cost && `• Cost: $${generationInfo.cost?.toFixed(4)}`}
                  </div>
                )}
              </div>
            </>
          ) : isGenerating ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
              
              <div className="relative z-10 text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-spin">
                  <Zap className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">AI Animation Engine Active</h3>
                  <p className="text-muted-foreground">
                    Generating your animation with advanced AI technology
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm">
                      Processing • {Math.round(progress)}% complete
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-full bg-secondary/50 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-background" />
              
              <div className="relative z-10 text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/50 to-secondary/50 rounded-full flex items-center justify-center">
                  <Camera className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Ready to Generate</h3>
                  <p className="text-muted-foreground">
                    Enter a prompt and click generate to create your AI animation
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                    <span className="text-sm">
                      Waiting for input
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <div className="text-lg font-semibold">4K UHD</div>
            <div className="text-xs text-muted-foreground">Resolution</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <div className="text-lg font-semibold">60fps</div>
            <div className="text-xs text-muted-foreground">Frame Rate</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <div className="text-lg font-semibold">Ray Traced</div>
            <div className="text-xs text-muted-foreground">Lighting</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <div className="text-lg font-semibold">AI Enhanced</div>
            <div className="text-xs text-muted-foreground">Quality</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAnimationPreview;