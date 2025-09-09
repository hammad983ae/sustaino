import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Mail, FileText, Eye, Loader2 } from "lucide-react";

interface ExtractedData {
  propertyAddress?: string;
  propertyType?: string;
  estimatedValue?: number;
  reportType?: string;
  clientName?: string;
  contactEmail?: string;
  contactPhone?: string;
  dueDate?: string;
  priority?: string;
  description?: string;
}

export const EmailProcessor = () => {
  const [emailContent, setEmailContent] = useState('');
  const [subject, setSubject] = useState('');
  const [sender, setSender] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data:mime;base64, prefix
      };
      reader.onerror = error => reject(error);
    });
  };

  const processEmail = async () => {
    if (!emailContent.trim() && attachments.length === 0) {
      toast({
        title: "Error",
        description: "Please provide email content or attachments to process",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Convert attachments to base64
      const processedAttachments = await Promise.all(
        attachments.map(async (file) => ({
          filename: file.name,
          content: await convertFileToBase64(file),
          mimeType: file.type
        }))
      );

      const { data, error } = await supabase.functions.invoke('email-processor', {
        body: {
          emailContent,
          subject,
          sender,
          attachments: processedAttachments
        }
      });

      if (error) {
        throw error;
      }

      setExtractedData(data.extractedData);
      
      toast({
        title: "Success",
        description: `Email processed successfully. Created ${data.createdRecords?.length || 0} records.`,
      });

    } catch (error) {
      console.error('Email processing error:', error);
      toast({
        title: "Error",
        description: "Failed to process email. Please check the logs.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email to OCR Processor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sender">Sender Email</Label>
              <Input
                id="sender"
                type="email"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="sender@example.com"
              />
            </div>
            <div>
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Valuation Request - 123 Main St"
              />
            </div>
          </div>

          {/* Email Content */}
          <div>
            <Label htmlFor="email-content">Email Content</Label>
            <Textarea
              id="email-content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Paste the email content here..."
              className="min-h-[200px]"
            />
          </div>

          {/* File Attachments */}
          <div>
            <Label htmlFor="attachments">Attachments (Images, PDFs)</Label>
            <div className="mt-2">
              <Input
                id="attachments"
                type="file"
                multiple
                onChange={handleFileUpload}
                accept="image/*,.pdf"
                className="mb-4"
              />
              
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Selected Files:</h4>
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Process Button */}
          <Button
            onClick={processEmail}
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing Email...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Process Email & Extract Data
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Extracted Data Display */}
      {extractedData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Extracted Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(extractedData).map(([key, value]) => (
                value && (
                  <div key={key} className="space-y-1">
                    <Label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                    <div className="p-2 bg-muted rounded text-sm">
                      {typeof value === 'number' ? value.toLocaleString() : value}
                    </div>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};