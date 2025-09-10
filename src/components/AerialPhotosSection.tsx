import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Download, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AerialPhoto {
  url: string;
  zoom: number;
  type: string;
  description: string;
}

interface AerialPhotosSectionProps {
  address: string;
  lat?: number;
  lng?: number;
  className?: string;
}

export const AerialPhotosSection: React.FC<AerialPhotosSectionProps> = ({
  address,
  lat,
  lng,
  className = ""
}) => {
  const [photos, setPhotos] = useState<AerialPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<AerialPhoto | null>(null);
  const { toast } = useToast();

  const fetchAerialPhotos = async () => {
    if (!address.trim()) {
      toast({
        title: "Error",
        description: "Please provide a valid address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-aerial-photos', {
        body: { address, lat, lng }
      });

      if (error) throw error;

      if (data.success) {
        setPhotos(data.photos);
        setSelectedPhoto(data.photos[0]); // Select first photo by default
        toast({
          title: "Success",
          description: `Retrieved ${data.photos.length} aerial photos for ${address}`,
        });
      } else {
        throw new Error(data.error || 'Failed to fetch aerial photos');
      }
    } catch (error: any) {
      console.error('Error fetching aerial photos:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch aerial photos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchAerialPhotos();
    }
  }, [address, lat, lng]);

  const downloadPhoto = (photo: AerialPhoto) => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `aerial-photo-${photo.type}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Aerial Photography
        </CardTitle>
        <CardDescription>
          High-resolution aerial and satellite imagery for property assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Address: {address}
          </div>
          <Button
            onClick={fetchAerialPhotos}
            disabled={loading || !address}
            size="sm"
            variant="outline"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Refresh Photos"
            )}
          </Button>
        </div>

        {photos.length > 0 && (
          <>
            {/* Photo Selection Tabs */}
            <div className="flex flex-wrap gap-2">
              {photos.map((photo, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedPhoto(photo)}
                  variant={selectedPhoto?.type === photo.type ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  {photo.type.charAt(0).toUpperCase() + photo.type.slice(1).replace('-', ' ')}
                  <Badge variant="secondary" className="text-xs">
                    {photo.type === 'street-view' ? 'SV' : `Z${photo.zoom}`}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Selected Photo Display */}
            {selectedPhoto && (
              <div className="space-y-3">
                <div className="relative group">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.description}
                    className="w-full h-64 md:h-80 object-cover rounded-lg border shadow-sm"
                    onError={(e) => {
                      console.error('Failed to load aerial photo:', selectedPhoto.url);
                      toast({
                        title: "Image Error",
                        description: "Failed to load aerial photo. Please try refreshing.",
                        variant: "destructive",
                      });
                    }}
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={() => downloadPhoto(selectedPhoto)}
                      size="sm"
                      variant="secondary"
                      className="bg-background/80 backdrop-blur-sm"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {selectedPhoto.description}
                </div>
                
                {/* Download All Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={() => photos.forEach(downloadPhoto)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download All Photos ({photos.length})
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-sm text-muted-foreground">Loading aerial photos...</span>
          </div>
        )}

        {!loading && photos.length === 0 && address && (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No aerial photos available for this address</p>
            <Button onClick={fetchAerialPhotos} variant="outline" size="sm" className="mt-2">
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};