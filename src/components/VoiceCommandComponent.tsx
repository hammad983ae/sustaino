import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface VoiceCommandProps {
  onFieldUpdate: (fieldName: string, value: string) => void;
  isEnabled: boolean;
  onToggle: () => void;
}

const VoiceCommandComponent: React.FC<VoiceCommandProps> = ({
  onFieldUpdate,
  isEnabled,
  onToggle
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Field mapping for voice commands
  const fieldMapping = {
    // Property Address and Basic Info
    'property address': 'propertyAddress',
    'address': 'propertyAddress',
    'street address': 'propertyAddress',
    'instructed by': 'instructedBy',
    'lender': 'lender',
    'contact': 'contact',
    'borrower': 'borrower',
    
    // Property Details
    'real property description': 'realPropertyDescription',
    'property description': 'realPropertyDescription',
    'site dimensions': 'siteDimensions',
    'site area': 'siteArea',
    'zoning': 'zoning',
    'current use': 'currentUse',
    'local government area': 'localGovernmentArea',
    'lga': 'localGovernmentArea',
    'main dwelling': 'mainDwelling',
    'built about': 'builtAbout',
    'additions': 'additions',
    'living area': 'livingArea',
    'outdoor area': 'outdoorArea',
    'other area': 'otherArea',
    'car accommodation': 'carAccommodation',
    'car areas': 'carAreas',
    'marketability': 'marketability',
    
    // Valuation
    'market value': 'marketValue',
    'land value': 'landValue',
    'improvements value': 'improvementValue',
    'rental assessment': 'rentalAssessment',
    'insurance estimate': 'insuranceEstimate',
    
    // TBE/Construction Details
    'builder name': 'builderName',
    'builder': 'builderName',
    'developer': 'builderName',
    'contract price': 'contractPrice',
    'contract date': 'contractDate',
    'building cost': 'buildingCost',
    'completion date': 'estimatedCompletionDate',
    
    // Dates
    'inspection date': 'inspectionDate',
    'valuation date': 'valuationDate'
  };

  const processVoiceCommand = useCallback((text: string) => {
    const lowerText = text.toLowerCase();
    console.log('Processing voice command:', text);

    // Look for field mentions and extract values
    for (const [keyword, fieldName] of Object.entries(fieldMapping)) {
      const keywordIndex = lowerText.indexOf(keyword.toLowerCase());
      if (keywordIndex !== -1) {
        // Extract the value after the field name
        const afterKeyword = text.substring(keywordIndex + keyword.length).trim();
        
        // Remove common prefixes like "is", "set to", "equals", etc.
        const cleanValue = afterKeyword
          .replace(/^(is |set to |equals |:|,|;)\s*/i, '')
          .replace(/\.$/, '') // Remove trailing period
          .trim();

        if (cleanValue) {
          console.log(`Setting ${fieldName} to: ${cleanValue}`);
          onFieldUpdate(fieldName, cleanValue);
          
          toast({
            title: "Voice Command Processed",
            description: `Set ${keyword} to: ${cleanValue}`,
          });
          return true;
        }
      }
    }

    // If no specific field found, show what was heard
    toast({
      title: "Voice Command Heard",
      description: `"${text}" - No matching field found. Try saying "[field name] [value]"`,
      variant: "destructive"
    });
    
    return false;
  }, [onFieldUpdate, toast]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      toast({
        title: "Recording Started",
        description: "Speak your command now...",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording Error",
        description: "Could not access microphone",
        variant: "destructive"
      });
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  }, [isRecording]);

  const processAudio = async (audioBlob: Blob) => {
    try {
      // Convert blob to base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = '';
      const chunkSize = 0x8000;
      
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
        binary += String.fromCharCode(...chunk);
      }
      
      const base64Audio = btoa(binary);

      // Send to voice-to-text function
      const { data, error } = await supabase.functions.invoke('voice-to-text', {
        body: { audio: base64Audio }
      });

      if (error) {
        throw error;
      }

      if (data?.text) {
        processVoiceCommand(data.text);
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      toast({
        title: "Processing Error",
        description: "Could not process voice command",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
      {/* Status Badge */}
      <Badge 
        variant={isRecording ? "destructive" : isProcessing ? "secondary" : "default"}
        className="px-3 py-1"
      >
        {isRecording ? "🎙️ Recording..." : isProcessing ? "🔄 Processing..." : "🎤 Voice Ready"}
      </Badge>

      {/* Voice Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="mb-2"
      >
        {isEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        {isEnabled ? 'Voice On' : 'Voice Off'}
      </Button>

      {/* Recording Button */}
      {isEnabled && (
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          variant={isRecording ? "destructive" : "default"}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg"
        >
          {isRecording ? (
            <MicOff className="h-8 w-8" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </Button>
      )}

      {/* Help Text */}
      {isEnabled && !isRecording && !isProcessing && (
        <div className="text-xs text-muted-foreground max-w-48 text-right">
          Say: "[field name] [value]"<br/>
          Example: "Property address 123 Main Street"
        </div>
      )}
    </div>
  );
};

export default VoiceCommandComponent;