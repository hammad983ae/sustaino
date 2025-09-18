import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';

interface LogoDownloaderProps {
  logoComponent: React.ReactNode;
  filename: string;
  backgroundColor?: string;
  padding?: number;
  width?: number;
  height?: number;
}

const LogoDownloader: React.FC<LogoDownloaderProps> = ({
  logoComponent,
  filename,
  backgroundColor = '#ffffff',
  padding = 40,
  width = 800,
  height = 400
}) => {
  const logoRef = useRef<HTMLDivElement>(null);

  const downloadLogo = async () => {
    if (!logoRef.current) return;

    try {
      // Create canvas with high quality
      const canvas = await html2canvas(logoRef.current, {
        backgroundColor: backgroundColor,
        scale: 3, // High resolution
        width: width,
        height: height,
        useCORS: true,
        allowTaint: true,
        logging: false
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error downloading logo:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden logo container for download */}
      <div 
        ref={logoRef}
        className="fixed -top-[9999px] left-0 flex items-center justify-center"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          padding: `${padding}px`,
          backgroundColor: backgroundColor
        }}
      >
        {logoComponent}
      </div>

      {/* Download button */}
      <Button onClick={downloadLogo} className="w-full">
        <Download className="w-4 h-4 mr-2" />
        Download High-Quality PNG
      </Button>
    </div>
  );
};

export default LogoDownloader;