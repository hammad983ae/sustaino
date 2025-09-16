/**
 * Document Photo Upload Component with OCR capabilities
 * Provides intelligent text extraction from uploaded images
 */
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  Camera, 
  FileText, 
  Loader2, 
  CheckCircle, 
  XCircle,
  Eye,
  Copy
} from 'lucide-react';
import Tesseract from 'tesseract.js';

interface ExtractedData {
  text: string;
  confidence: number;
  fields?: {
    [key: string]: string;
  };
}

interface DocumentPhotoUploadProps {
  onDataExtracted: (data: ExtractedData) => void;
  acceptedTypes?: string[];
  maxSize?: number;
}

const DocumentPhotoUpload: React.FC<DocumentPhotoUploadProps> = ({
  onDataExtracted,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg'],
  maxSize = 10 * 1024 * 1024 // 10MB
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const processImage = useCallback(async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setError('');
    
    try {
      // Create image URL for preview
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);

      // Process with Tesseract.js
      const { data } = await Tesseract.recognize(file, 'eng', {
        logger: (m: any) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });

      

      const text = data.text.trim();
      const avgConfidence = data.confidence;

      setExtractedText(text);
      setConfidence(avgConfidence);

      // Extract potential fields from text
      const fields = extractFields(text);

      const extractedData: ExtractedData = {
        text,
        confidence: avgConfidence,
        fields
      };

      onDataExtracted(extractedData);
      
    } catch (err) {
      console.error('OCR Error:', err);
      setError('Failed to process image. Please try again or check image quality.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [onDataExtracted]);

  const extractFields = (text: string) => {
    const fields: { [key: string]: string } = {};
    
    // Common patterns for property documents
    const patterns = {
      address: /(?:address|location|property)[\s:]+([^\n\r]+)/i,
      area: /(?:area|size)[\s:]+([0-9,]+\.?[0-9]*)\s*(?:m2|sqm|square)/i,
      rent: /(?:rent|rental)[\s:]+\$?([0-9,]+\.?[0-9]*)/i,
      tenant: /(?:tenant|occupant)[\s:]+([^\n\r]+)/i,
      lease: /(?:lease|term)[\s:]+([0-9]+)\s*(?:year|month)/i,
      yield: /(?:yield|return)[\s:]+([0-9.]+)%/i,
      value: /(?:value|price)[\s:]+\$([0-9,]+)/i
    };

    Object.entries(patterns).forEach(([key, pattern]) => {
      const match = text.match(pattern);
      if (match && match[1]) {
        fields[key] = match[1].trim();
      }
    });

    return fields;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!acceptedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG).');
      return;
    }

    if (file.size > maxSize) {
      setError('File size too large. Please select an image under 10MB.');
      return;
    }

    processImage(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (!acceptedTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG).');
        return;
      }
      processImage(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Document OCR Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {isProcessing ? (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Processing image...</p>
                  <Progress value={progress} className="w-full max-w-sm mx-auto" />
                  <p className="text-xs text-muted-foreground mt-2">{progress}% complete</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">Upload Document Image</p>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to select a property document, lease, or contract
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Lease Agreements</Badge>
                  <Badge variant="secondary">Property Reports</Badge>
                  <Badge variant="secondary">Contracts</Badge>
                  <Badge variant="secondary">Financial Documents</Badge>
                </div>
                <input
                  type="file"
                  accept={acceptedTypes.join(',')}
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    <FileText className="h-4 w-4 mr-2" />
                    Select Image
                  </Button>
                </label>
              </div>
            )}
          </div>

          {error && (
            <Alert className="mt-4" variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {uploadedImage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Uploaded Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img 
              src={uploadedImage} 
              alt="Uploaded document" 
              className="max-w-full h-auto rounded-lg border"
            />
          </CardContent>
        </Card>
      )}

      {extractedText && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Extracted Text
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={confidence > 80 ? "default" : confidence > 60 ? "secondary" : "destructive"}>
                  {Math.round(confidence)}% confidence
                </Badge>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{extractedText}</pre>
            </div>
            
            {confidence < 70 && (
              <Alert className="mt-4">
                <AlertDescription>
                  Low confidence detected. Consider retaking the photo with better lighting or resolution.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentPhotoUpload;