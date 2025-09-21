import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useReportData } from '@/contexts/ReportDataContext';
import { useUniversalSave } from '@/hooks/useUniversalSave';
import { Camera, Upload, Save, X, Eye, FileText, Loader2, Copy, AlertTriangle } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { toast } from 'sonner';

interface PropertyPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  file?: File;
  ocrText?: string;
  ocrConfidence?: number;
}

interface PropertyPhotosProps {
  propertyAddress: string;
}

const PropertyPhotos = ({ propertyAddress }: PropertyPhotosProps) => {
  const { reportData, updateReportData } = useReportData();
  const { saveData, loadData, isSaving } = useUniversalSave('PropertyPhotos');
  const [photos, setPhotos] = useState<PropertyPhoto[]>([]);
  const [isProcessingOCR, setIsProcessingOCR] = useState<string | null>(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  
  // Default photos if no uploaded photos
  const defaultPhotos: PropertyPhoto[] = [
    {
      id: 'default-1',
      src: "/lovable-uploads/b8e317ec-d54a-4985-971b-2286c4ba16b8.png",
      alt: "Front exterior view of property",
      title: "Front Exterior",
      description: "Single story brick veneer home with security fencing"
    },
    {
      id: 'default-2',
      src: "/lovable-uploads/94ed0c55-57c3-4721-bce9-60460195a7ed.png", 
      alt: "Street view with driveway and car",
      title: "Street View",
      description: "Driveway access and street frontage"
    },
    {
      id: 'default-3',
      src: "/lovable-uploads/d8f0c168-3f78-4505-944e-650ae39f4b7e.png",
      alt: "Kitchen with island bench and modern appliances",
      title: "Main Kitchen",
      description: "Modern kitchen with island bench, gas cooktop and quality appliances"
    },
    {
      id: 'default-4',
      src: "/lovable-uploads/1923715f-e356-49d3-82d7-2d2ea55eab44.png",
      alt: "Kitchen showing gas cooktop and range hood", 
      title: "Kitchen Cooking Area",
      description: "Gas cooktop with modern range hood and stainless steel appliances"
    },
    {
      id: 'default-5',
      src: "/lovable-uploads/64776f15-4ac5-4df6-aa9b-49659cfc75ca.png",
      alt: "Alternative kitchen view with electric cooktop",
      title: "Kitchen Alternative View", 
      description: "Electric cooktop configuration with white cabinetry"
    },
    {
      id: 'default-6',
      src: "/lovable-uploads/26df2df4-d039-40ea-a3eb-4cba94b29f25.png",
      alt: "Outdoor entertaining area with paved patio",
      title: "Outdoor Entertaining",
      description: "Paved outdoor entertaining area with quality finishes"
    },
    {
      id: 'default-7',
      src: "/lovable-uploads/05e097a5-54d8-4dac-a2ab-b617454a6f73.png",
      alt: "Covered outdoor area with seating",
      title: "Covered Outdoor Area",
      description: "Undercover entertaining space with seating"
    },
    {
      id: 'default-8',
      src: "/lovable-uploads/63512d3f-82a9-452e-8010-0b78d4c3e40b.png",
      alt: "Backyard with new timber fencing",
      title: "Backyard",
      description: "Well-maintained lawn with new timber fencing"
    },
    {
      id: 'default-9',
      src: "/lovable-uploads/afa255b1-2f74-4f08-9a75-dbea69fad1b2.png",
      alt: "Modern bathroom with shower",
      title: "Bathroom",
      description: "Modern bathroom with quality fixtures and finishes"
    }
  ];

  useEffect(() => {
    // Load saved photos on mount
    loadData().then(savedData => {
      if (savedData?.photos) {
        setPhotos(savedData.photos);
      } else {
        // Initialize with default photos if none saved
        setPhotos(defaultPhotos);
      }
    });
  }, [loadData]);

  const handleFileUpload = useCallback(async (files: FileList) => {
    const newPhotos: PropertyPhoto[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        continue;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(`${file.name} is too large. Maximum size is 10MB`);
        continue;
      }
      
      const id = `photo-${Date.now()}-${i}`;
      const src = URL.createObjectURL(file);
      const title = file.name.split('.')[0].replace(/[_-]/g, ' ');
      
      const photo: PropertyPhoto = {
        id,
        src,
        alt: `Property photo: ${title}`,
        title,
        description: 'Property photo',
        file
      };
      
      newPhotos.push(photo);
    }
    
    setPhotos(prev => [...prev, ...newPhotos]);
    toast.success(`${newPhotos.length} photo(s) uploaded successfully`);
  }, []);

  const runOCR = useCallback(async (photo: PropertyPhoto) => {
    if (!photo.file && !photo.src) return;
    
    setIsProcessingOCR(photo.id);
    setOcrProgress(0);
    
    try {
      const imageSource = photo.file || photo.src;
      const { data } = await Tesseract.recognize(imageSource, 'eng', {
        logger: (m: any) => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        }
      });
      
      const text = data.text.trim();
      const confidence = data.confidence;
      
      setPhotos(prev => prev.map(p => 
        p.id === photo.id 
          ? { ...p, ocrText: text, ocrConfidence: confidence }
          : p
      ));
      
      if (confidence > 70) {
        toast.success(`OCR completed with ${Math.round(confidence)}% confidence`);
      } else {
        toast.warning(`OCR completed with low confidence (${Math.round(confidence)}%)`);
      }
      
    } catch (error) {
      console.error('OCR Error:', error);
      toast.error('Failed to process image with OCR');
    } finally {
      setIsProcessingOCR(null);
      setOcrProgress(0);
    }
  }, []);

  const removePhoto = useCallback((photoId: string) => {
    setPhotos(prev => {
      const newPhotos = prev.filter(p => p.id !== photoId);
      // Clean up object URLs
      const removedPhoto = prev.find(p => p.id === photoId);
      if (removedPhoto?.src.startsWith('blob:')) {
        URL.revokeObjectURL(removedPhoto.src);
      }
      return newPhotos;
    });
    toast.success('Photo removed');
  }, []);

  const updatePhotoDetails = useCallback((photoId: string, updates: Partial<PropertyPhoto>) => {
    setPhotos(prev => prev.map(p => 
      p.id === photoId ? { ...p, ...updates } : p
    ));
  }, []);

  const handleSavePhotos = async () => {
    const photoData = {
      photos: photos,
      propertyAddress,
      savedAt: new Date().toISOString(),
      photoCount: photos.length
    };
    
    const result = await saveData(photoData);
    if (result.success) {
      // Also update report data
      updateReportData('fileAttachments', {
        ...reportData.fileAttachments,
        propertyPhotos: photos.map(photo => ({
          id: photo.id,
          url: photo.src,
          name: photo.title,
          description: photo.description,
          alt: photo.alt,
          ocrText: photo.ocrText,
          ocrConfidence: photo.ocrConfidence,
          uploadedAt: new Date().toISOString()
        }))
      });
      toast.success('Photos saved successfully');
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const copyOCRText = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('OCR text copied to clipboard');
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl font-semibold">Property Photos</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{photos.length} Photos</Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSavePhotos}
              disabled={isSaving}
              className="flex items-center gap-1"
            >
              <Save className="h-3 w-3" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{propertyAddress}</p>
      </CardHeader>
      <CardContent>
        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors mb-6"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop photos here, or click to browse
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
            id="photo-upload"
          />
          <label htmlFor="photo-upload">
            <Button variant="outline" className="cursor-pointer">
              <Camera className="h-4 w-4 mr-2" />
              Select Photos
            </Button>
          </label>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="space-y-2 border rounded-lg p-3">
              <div className="aspect-video relative overflow-hidden rounded-lg border">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  {!photo.id.startsWith('default-') && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removePhoto(photo.id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Input
                  value={photo.title}
                  onChange={(e) => updatePhotoDetails(photo.id, { title: e.target.value })}
                  className="text-sm font-medium"
                  placeholder="Photo title"
                />
                <Input
                  value={photo.description}
                  onChange={(e) => updatePhotoDetails(photo.id, { description: e.target.value })}
                  className="text-xs"
                  placeholder="Photo description"
                />
                
                {/* OCR Section */}
                <div className="border-t pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">OCR Text Recognition</span>
                    {!photo.ocrText && !isProcessingOCR && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => runOCR(photo)}
                        className="h-6 text-xs"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Scan Text
                      </Button>
                    )}
                  </div>
                  
                  {isProcessingOCR === photo.id && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span className="text-xs">Processing...</span>
                      </div>
                      <Progress value={ocrProgress} className="h-1" />
                    </div>
                  )}
                  
                  {photo.ocrText && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={photo.ocrConfidence && photo.ocrConfidence > 70 ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {photo.ocrConfidence ? Math.round(photo.ocrConfidence) : 0}% confidence
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyOCRText(photo.ocrText!)}
                          className="h-6 text-xs"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="bg-muted p-2 rounded text-xs max-h-20 overflow-y-auto">
                        <pre className="whitespace-pre-wrap">{photo.ocrText}</pre>
                      </div>
                      {photo.ocrConfidence && photo.ocrConfidence < 70 && (
                        <Alert>
                          <AlertTriangle className="h-3 w-3" />
                          <AlertDescription className="text-xs">
                            Low confidence. Consider retaking with better lighting.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Property Features Observed:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Modern kitchen with gas and electric cooking facilities</li>
            <li>• Quality stainless steel appliances throughout</li>
            <li>• Secure front fencing and established gardens</li>
            <li>• Paved outdoor entertaining areas</li>
            <li>• Undercover outdoor spaces</li>
            <li>• New timber boundary fencing</li>
            <li>• Modern bathroom with quality fixtures</li>
            <li>• Well-maintained lawned areas</li>
            <li>• Off-street parking via driveway</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyPhotos;