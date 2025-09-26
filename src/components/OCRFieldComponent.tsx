import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface OCRFieldComponentProps {
  label: string;
  fieldKey: string;
  value: string;
  onChange: (value: string) => void;
  ocrData?: Record<string, any>;
  isTextarea?: boolean;
  placeholder?: string;
  className?: string;
}

export function OCRFieldComponent({ 
  label, 
  fieldKey, 
  value, 
  onChange, 
  ocrData, 
  isTextarea = false,
  placeholder,
  className 
}: OCRFieldComponentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrConfidence, setOcrConfidence] = useState<number | null>(null);
  const [hasOCRData, setHasOCRData] = useState(false);

  useEffect(() => {
    if (ocrData && ocrData[fieldKey]) {
      setHasOCRData(true);
      if (ocrData[fieldKey].confidence) {
        setOcrConfidence(ocrData[fieldKey].confidence);
      }
    }
  }, [ocrData, fieldKey]);

  const handleAutoFill = () => {
    if (ocrData && ocrData[fieldKey]) {
      const ocrValue = typeof ocrData[fieldKey] === 'string' 
        ? ocrData[fieldKey] 
        : ocrData[fieldKey].text || ocrData[fieldKey].value || '';
      
      onChange(ocrValue);
      toast.success(`${label} auto-filled from OCR data`);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-500';
    if (confidence >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const InputComponent = isTextarea ? Textarea : Input;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={fieldKey} className="text-sm font-medium">
          {label}
        </Label>
        <div className="flex items-center gap-2">
          {hasOCRData && (
            <>
              {ocrConfidence && (
                <Badge variant="outline" className="text-xs">
                  <div className={`w-2 h-2 rounded-full mr-1 ${getConfidenceColor(ocrConfidence)}`} />
                  {ocrConfidence}% confidence
                </Badge>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAutoFill}
                className="text-xs h-7"
              >
                <FileText className="w-3 h-3 mr-1" />
                Auto-fill
              </Button>
            </>
          )}
          {isProcessing && (
            <Badge variant="outline">
              <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
              Processing
            </Badge>
          )}
        </div>
      </div>
      
      <InputComponent
        id={fieldKey}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
      
      {hasOCRData && ocrConfidence && ocrConfidence < 70 && (
        <Alert className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Low OCR confidence. Please verify the auto-filled data.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}