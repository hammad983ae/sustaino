import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SustanoProSocialLogo from "@/components/SustanoProSocialLogo";

const SocialMediaAssets: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadLogo = async (variant: string, backgroundColor: string, textColor: string = 'white') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for social media (good quality)
    canvas.width = 800;
    canvas.height = 320;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create gradient background
    let gradient;
    if (backgroundColor.includes('blue')) {
      gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#3B82F6'); // blue-500
      gradient.addColorStop(1, '#2563EB'); // blue-600
    } else if (backgroundColor.includes('purple')) {
      gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#8B5CF6'); // purple-500
      gradient.addColorStop(1, '#7C3AED'); // purple-600
    } else if (backgroundColor.includes('green')) {
      gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#10B981'); // emerald-500
      gradient.addColorStop(1, '#059669'); // emerald-600
    } else if (backgroundColor.includes('dark')) {
      gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#1F2937'); // gray-800
      gradient.addColorStop(1, '#111827'); // gray-900
    } else {
      gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#F3F4F6'); // gray-100
      gradient.addColorStop(1, '#E5E7EB'); // gray-200
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.fillStyle = textColor;
    ctx.font = 'bold 64px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw "Sustano Pro" text
    const text = 'Sustano Pro';
    const textWidth = ctx.measureText(text).width;
    const logoSize = 80;
    const gap = 30;
    const totalWidth = textWidth + logoSize + gap;
    const startX = (canvas.width - totalWidth) / 2;

    ctx.fillText(text, startX + textWidth / 2, canvas.height / 2);

    // Draw logo (geometric arc with dot)
    const logoX = startX + textWidth + gap + logoSize / 2;
    const logoY = canvas.height / 2;

    // Save context for rotation
    ctx.save();
    ctx.translate(logoX, logoY);
    ctx.rotate(Math.PI / 4); // 45 degrees

    // Draw arc
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(0, 0, logoSize / 2 - 4, 0, Math.PI); // Half circle (arc)
    ctx.stroke();

    // Restore context
    ctx.restore();

    // Draw center dot
    ctx.fillStyle = textColor;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(logoX, logoY, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Download the image
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sustano-pro-logo-${variant}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  const logoVariants = [
    { name: 'Blue Gradient', variant: 'blue', bg: 'blue', textColor: 'white' },
    { name: 'Purple Gradient', variant: 'purple', bg: 'purple', textColor: 'white' },
    { name: 'Green Gradient', variant: 'green', bg: 'green', textColor: 'white' },
    { name: 'Dark Gradient', variant: 'dark', bg: 'dark', textColor: 'white' },
    { name: 'Light Gradient', variant: 'light', bg: 'light', textColor: 'black' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Sustano Pro Social Media Assets
          </h1>
          <p className="text-xl text-purple-200">
            Download logo variations for your social media platforms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {logoVariants.map((logo) => (
            <Card key={logo.variant} className="bg-white/10 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">{logo.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <SustanoProSocialLogo 
                    variant={logo.variant as any}
                    size="medium"
                  />
                </div>
                <Button 
                  onClick={() => downloadLogo(logo.variant, logo.bg, logo.textColor)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download {logo.name} Logo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-white/10 border-purple-500/30 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white">Usage Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-2">
              <p>• Logo files are 800x320px - perfect for social media headers</p>
              <p>• Use on social platforms like LinkedIn, Twitter, Facebook</p>
              <p>• High-quality PNG format with transparent backgrounds where applicable</p>
              <p>• Choose variants that contrast well with your content</p>
            </CardContent>
          </Card>
        </div>

        {/* Hidden canvas for generating downloads */}
        <canvas 
          ref={canvasRef} 
          style={{ display: 'none' }} 
          width="800" 
          height="320"
        />
      </div>
    </div>
  );
};

export default SocialMediaAssets;