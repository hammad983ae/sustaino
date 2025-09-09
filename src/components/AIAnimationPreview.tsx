import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Zap, Play, Pause } from 'lucide-react';

interface AIAnimationPreviewProps {
  title?: string;
  isActive?: boolean;
  progress?: {
    currentFrame: number;
    totalFrames: number;
    time: string;
  };
}

const AIAnimationPreview: React.FC<AIAnimationPreviewProps> = ({ 
  title = "Real-Time Preview Window",
  isActive = true,
  progress = {
    currentFrame: 1847,
    totalFrames: 7200,
    time: "00:30.78"
  }
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-to-br from-secondary/50 to-background border-2 border-dashed border-primary/20 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
          
          <div className="relative z-10 text-center space-y-4">
            <div className={`w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center ${isActive ? 'animate-spin' : ''}`}>
              <Zap className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">AI Animation Engine Active</h3>
              <p className="text-muted-foreground">
                Hyper-realistic 3D rendering with ray tracing and deep learning enhancement
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 ${isActive ? 'bg-green-500' : 'bg-yellow-500'} rounded-full animate-pulse`} />
                <span className="text-sm">
                  {isActive ? 'Real-time processing' : 'Processing complete'} • 4K • 60fps
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="gap-1">
                <Play className="h-3 w-3" />
                Play
              </Button>
              <Button size="sm" variant="secondary" className="gap-1">
                <Pause className="h-3 w-3" />
                Pause
              </Button>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              Frame: {progress.currentFrame}/{progress.totalFrames} • Time: {progress.time}
            </div>
          </div>
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