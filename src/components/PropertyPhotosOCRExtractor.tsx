import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, Zap, Eye, FileImage, Loader2, Save, FileText } from "lucide-react";
import Tesseract from 'tesseract.js';
import { Badge } from '@/components/ui/badge';
import { useReportData } from '@/contexts/ReportDataContext';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useUniversalSave } from '@/hooks/useUniversalSave';
import { supabase } from '@/integrations/supabase/client';
import IntelligentDocumentOCR from './IntelligentDocumentOCR';

interface PhotoWithOCR {
  id: string;
  file: File;
  url: string;
  name: string;
  description?: string;
  ocrText?: string;
  ocrProcessed: boolean;
  ocrConfidence?: number;
}

interface PropertyFeaturesExtracted {
  roomTypes: string[];
  features: string[];
  observations: string[];
  condition: string;
  description: string;
}

const PropertyPhotosOCRExtractor: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoWithOCR[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingPhotoId, setProcessingPhotoId] = useState<string | null>(null);
  const [extractedFeatures, setExtractedFeatures] = useState<PropertyFeaturesExtracted>({
    roomTypes: [],
    features: [],
    observations: [],
    condition: '',
    description: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const { updateReportData, reportData } = useReportData();
  const { saveData, loadData, isSaving } = useUniversalSave('PropertyPhotosOCRExtractor');

  // Load existing photos from reportData
  useEffect(() => {
    if (reportData.fileAttachments?.photos) {
      const existingPhotos = reportData.fileAttachments.photos.map((photo, index) => ({
        id: `existing-${index}`,
        file: new File([], photo.name || `photo-${index}.jpg`),
        url: photo.url || '',
        name: photo.name || `Property Photo ${index + 1}`,
        description: photo.description || '',
        ocrText: photo.ocrText || '',
        ocrProcessed: Boolean(photo.ocrText),
        ocrConfidence: photo.ocrConfidence || 0
      }));
      setPhotos(existingPhotos);
    }
  }, [reportData.fileAttachments?.photos]);

  // Save photos data
  const handleSavePhotos = useCallback(async () => {
    try {
      const photosData = {
        photos: photos.map(photo => ({
          id: photo.id,
          name: photo.name,
          url: photo.url,
          description: photo.description || '',
          ocrText: photo.ocrText || '',
          ocrProcessed: photo.ocrProcessed,
          ocrConfidence: photo.ocrConfidence || 0
        })),
        extractedFeatures,
        uploadedAt: new Date().toISOString()
      };

      await saveData(photosData);
      
      // Also update report data for consistency
      updateReportData('fileAttachments', {
        ...reportData.fileAttachments,
        propertyPhotos: photosData.photos
      });

      toast({
        title: "Photos Saved",
        description: `${photos.length} photos and OCR data saved successfully`,
      });
    } catch (error) {
      console.error('Failed to save photos:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save photos data",
        variant: "destructive"
      });
    }
  }, [photos, extractedFeatures, saveData, updateReportData, reportData.fileAttachments, toast]);

  const handleFileUpload = useCallback(async (files: FileList) => {
    const newPhotos: PhotoWithOCR[] = [];
    
    console.log('OCR PAF Step 4: Starting file upload, files count:', files.length);
    
    // Get current user for storage path
    const { data: { user } } = await supabase.auth.getUser();
    console.log('OCR PAF Step 4: User authentication check:', user ? 'authenticated' : 'not authenticated');
    
    if (!user) {
      console.error('OCR PAF Step 4: Authentication failed');
      toast({
        title: "Authentication Required",
        description: "Please log in to upload photos",
        variant: "destructive"
      });
      return;
    }
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const photoId = `photo-${Date.now()}-${i}`;
        
        try {
          // Upload to Supabase storage
          const fileName = `${photoId}-${file.name}`;
          const filePath = `${user.id}/property-photos/${fileName}`;
          
          console.log('OCR PAF Step 4: Attempting upload to path:', filePath);
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: true
            });

          if (uploadError) {
            console.error('OCR PAF Step 4: Upload error:', uploadError);
            toast({
              title: "Upload Failed",
              description: `Failed to upload ${file.name}: ${uploadError.message}`,
              variant: "destructive"
            });
            continue;
          }
          
          console.log('OCR PAF Step 4: Upload successful:', uploadData);

          // Get public URL for the uploaded file
          const { data: urlData } = supabase.storage
            .from('property-images')
            .getPublicUrl(filePath);

          newPhotos.push({
            id: photoId,
            file,
            url: urlData.publicUrl,
            name: file.name,
            description: '',
            ocrProcessed: false
          });
        } catch (error) {
          console.error('Error uploading file:', error);
          toast({
            title: "Upload Error",
            description: `Failed to upload ${file.name}`,
            variant: "destructive"
          });
        }
      }
    }

    if (newPhotos.length === 0) {
      toast({
        title: "No Photos Uploaded",
        description: "No valid image files were uploaded",
        variant: "destructive"
      });
      return;
    }

    setPhotos(prev => [...prev, ...newPhotos]);

    // Auto-process OCR for new photos
    for (const photo of newPhotos) {
      await processPhotoOCR(photo);
    }

    // Auto-save after upload and OCR processing
    setTimeout(() => {
      handleSavePhotos();
    }, 1000); // Small delay to ensure all OCR processing is complete

    toast({
      title: "Photos uploaded",
      description: `${newPhotos.length} photos uploaded to storage and processing OCR`,
    });
  }, [handleSavePhotos, toast]);

  const processPhotoOCR = useCallback(async (photo: PhotoWithOCR) => {
    console.log('OCR PAF Step 4: Starting OCR processing for photo:', photo.name);
    setIsProcessing(true);
    setProcessingPhotoId(photo.id);

    try {
      console.log('OCR PAF Step 4: Calling Tesseract.recognize...');
      const { data } = await Tesseract.recognize(photo.file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log('OCR PAF Step 4: OCR progress:', m.progress);
          }
        }
      });
      console.log('OCR PAF Step 4: Tesseract completed, extracted text length:', data.text.length);

      const extractedText = data.text.trim();
      const confidence = data.confidence;

      setPhotos(prev => prev.map(p => 
        p.id === photo.id 
          ? { 
              ...p, 
              ocrText: extractedText, 
              ocrProcessed: true,
              ocrConfidence: confidence
            }
          : p
      ));

      // Update report data
      updateReportData('fileAttachments', {
        ...reportData.fileAttachments,
        photos: photos.map(p => 
          p.id === photo.id 
            ? {
                name: p.name,
                url: p.url,
                description: p.description || '',
                ocrText: extractedText,
                ocrConfidence: confidence
              }
            : {
                name: p.name,
                url: p.url,
                description: p.description || '',
                ocrText: p.ocrText || '',
                ocrConfidence: p.ocrConfidence || 0
              }
        )
      });

      toast({
        title: "OCR Processing Complete",
        description: `Text extracted from ${photo.name} with ${confidence.toFixed(1)}% confidence`,
      });

    } catch (error) {
      console.error('OCR PAF Step 4: OCR processing failed:', error);
      
      setPhotos(prev => prev.map(p => 
        p.id === photo.id 
          ? { 
              ...p, 
              ocrText: 'OCR processing failed', 
              ocrProcessed: false,
              ocrConfidence: 0
            }
          : p
      ));

      toast({
        title: "OCR Processing Failed",
        description: `Failed to extract text from ${photo.name}`,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProcessingPhotoId(null);
    }
  }, [photos, reportData.fileAttachments, updateReportData, toast]);

  const analyzePropertyFeatures = useCallback(async () => {
    setIsAnalyzing(true);
    
    try {
      // Combine all OCR text
      const allOcrText = photos
        .filter(p => p.ocrProcessed && p.ocrText)
        .map(p => `${p.name}: ${p.ocrText}`)
        .join('\n\n');

      // Extract features from OCR text and photo descriptions
      const roomTypes = extractRoomTypes(allOcrText);
      const features = extractFeatures(allOcrText);
      const observations = extractObservations(allOcrText);
      const condition = assessCondition(allOcrText);
      const description = generateDescription(photos, allOcrText);

      const extractedFeatures = {
        roomTypes,
        features,
        observations,
        condition,
        description
      };

      setExtractedFeatures(extractedFeatures);

      // Update property details in report data
      updateReportData('propertyDetails', {
        ...reportData.propertyDetails,
        photos: photos.map(p => ({
          name: p.name,
          url: p.url,
          description: p.description,
          ocrText: p.ocrText
        })),
        extractedFeatures,
        description,
        condition,
        featuresObserved: features.join('; '),
        roomTypes: roomTypes.join(', ')
      });

      toast({
        title: "Property Analysis Complete",
        description: `Analyzed ${photos.length} photos and extracted property features`,
      });

    } catch (error) {
      console.error('Analysis Error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze property features",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [photos, reportData.propertyDetails, updateReportData, toast]);

  // Helper functions for feature extraction
  const extractRoomTypes = (text: string): string[] => {
    const roomKeywords = ['kitchen', 'bedroom', 'bathroom', 'living', 'dining', 'laundry', 'office', 'garage'];
    const found = roomKeywords.filter(room => 
      text.toLowerCase().includes(room)
    );
    return [...new Set(found)];
  };

  const extractFeatures = (text: string): string[] => {
    const featureKeywords = [
      'modern', 'stainless steel', 'granite', 'hardwood', 'carpet', 'tile',
      'appliances', 'fixtures', 'fencing', 'garden', 'patio', 'deck',
      'fireplace', 'ceiling fan', 'air conditioning', 'heating'
    ];
    const found = featureKeywords.filter(feature => 
      text.toLowerCase().includes(feature)
    );
    return [...new Set(found)];
  };

  const extractObservations = (text: string): string[] => {
    const observations = [];
    if (text.toLowerCase().includes('new') || text.toLowerCase().includes('recently')) {
      observations.push('Recently updated/renovated');
    }
    if (text.toLowerCase().includes('damaged') || text.toLowerCase().includes('worn')) {
      observations.push('Shows signs of wear');
    }
    if (text.toLowerCase().includes('clean') || text.toLowerCase().includes('maintained')) {
      observations.push('Well maintained');
    }
    return observations;
  };

  const assessCondition = (text: string): string => {
    if (text.toLowerCase().includes('excellent') || text.toLowerCase().includes('new')) {
      return 'Excellent';
    }
    if (text.toLowerCase().includes('good') || text.toLowerCase().includes('modern')) {
      return 'Good';
    }
    if (text.toLowerCase().includes('fair') || text.toLowerCase().includes('average')) {
      return 'Fair';
    }
    if (text.toLowerCase().includes('poor') || text.toLowerCase().includes('damaged')) {
      return 'Poor';
    }
    return 'Good'; // Default assumption
  };

  const generateDescription = (photos: PhotoWithOCR[], ocrText: string): string => {
    const roomCount = extractRoomTypes(ocrText).length;
    const featureCount = extractFeatures(ocrText).length;
    
    return `Property photographed with ${photos.length} images showing ${roomCount} distinct room types and ${featureCount} notable features. ${ocrText ? 'OCR analysis reveals text elements within the property images providing additional detail for assessment.' : 'Visual analysis completed.'}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Property Photos with OCR Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Upload Property Photos</p>
              <p className="text-muted-foreground mb-4">
                Drag and drop photos or click to browse. OCR will automatically extract text from images.
              </p>
              <Button>
                <FileImage className="h-4 w-4 mr-2" />
                Choose Photos
              </Button>
            </label>
          </div>

          {/* Save Button */}
          {photos.length > 0 && (
            <div className="flex justify-end">
              <Button 
                onClick={handleSavePhotos}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? 'Saving...' : 'Save Photos'}
              </Button>
            </div>
          )}

          {/* Photos Grid */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {processingPhotoId === photo.id ? (
                        <Badge variant="secondary">
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Processing
                        </Badge>
                      ) : photo.ocrProcessed ? (
                        <Badge variant="default">
                          <Zap className="h-3 w-3 mr-1" />
                          OCR Complete
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          Ready for OCR
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium truncate">{photo.name}</p>
                    {photo.ocrText && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {photo.ocrText.substring(0, 100)}...
                      </p>
                    )}
                    {photo.ocrConfidence && (
                      <p className="text-xs text-muted-foreground">
                        Confidence: {photo.ocrConfidence.toFixed(1)}%
                      </p>
                    )}
                    <div className="flex gap-1 mt-2">
                      {!photo.ocrProcessed && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => processPhotoOCR(photo)}
                          disabled={isProcessing}
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          Extract Text
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Analysis Button */}
          {photos.some(p => p.ocrProcessed) && (
            <div className="flex justify-center">
              <Button
                onClick={analyzePropertyFeatures}
                disabled={isAnalyzing}
                size="lg"
              >
                {isAnalyzing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Eye className="h-4 w-4 mr-2" />
                )}
                Analyze Property Features
              </Button>
            </div>
          )}

          {/* Extracted Features Display */}
          {extractedFeatures.description && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Extracted Property Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-medium">Property Description</Label>
                  <Textarea
                    value={extractedFeatures.description}
                    onChange={(e) => setExtractedFeatures(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    className="mt-2"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">Room Types Identified</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {extractedFeatures.roomTypes.map((room, index) => (
                        <Badge key={index} variant="secondary">{room}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="font-medium">Features Observed</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {extractedFeatures.features.map((feature, index) => (
                        <Badge key={index} variant="outline">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="font-medium">Overall Condition</Label>
                  <Badge 
                    variant={extractedFeatures.condition === 'Excellent' ? 'default' : 
                             extractedFeatures.condition === 'Good' ? 'secondary' : 
                             'destructive'}
                    className="ml-2"
                  >
                    {extractedFeatures.condition}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Button */}
          {photos.length > 0 && photos.some(p => p.ocrProcessed) && (
            <div className="flex justify-center">
              <Button
                onClick={analyzePropertyFeatures}
                disabled={isAnalyzing}
                className="flex items-center gap-2"
                size="lg"
              >
                {isAnalyzing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
                {isAnalyzing ? 'Analyzing Property Features...' : 'Analyze Property Features'}
              </Button>
            </div>
          )}

          {/* Extracted Features Display */}
          {extractedFeatures.roomTypes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Property Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {extractedFeatures.roomTypes.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Room Types Identified:</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {extractedFeatures.roomTypes.map((room, index) => (
                        <Badge key={index} variant="secondary" className="capitalize">
                          {room}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {extractedFeatures.features.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Features Observed:</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {extractedFeatures.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="capitalize">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {extractedFeatures.observations.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Observations:</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {extractedFeatures.observations.map((obs, index) => (
                        <Badge key={index} variant="default">
                          {obs}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {extractedFeatures.condition && (
                  <div>
                    <Label className="text-sm font-medium">Overall Condition:</Label>
                    <Badge variant="secondary" className="ml-2">
                      {extractedFeatures.condition}
                    </Badge>
                  </div>
                )}

                {extractedFeatures.description && (
                  <div>
                    <Label className="text-sm font-medium">Description:</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {extractedFeatures.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Document OCR Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Analysis & OCR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <IntelligentDocumentOCR
            onDataExtracted={(documents) => {
              console.log('Document OCR extracted:', documents);
              // Update report data with document information
              updateReportData('fileAttachments', {
                ...reportData.fileAttachments,
                documents: documents.map(doc => ({
                  name: doc.name,
                  type: doc.documentType,
                  extractedFields: doc.extractedFields,
                  confidence: doc.confidence
                }))
              });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyPhotosOCRExtractor;