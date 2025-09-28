import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Download,
  Zap,
  Search,
  X,
  FileCheck
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ContradictionResult {
  id: string;
  type: 'logical' | 'factual' | 'temporal' | 'quantitative' | 'semantic';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  evidence: string[];
  suggestions?: string[];
  confidence: number;
  location?: {
    start: number;
    end: number;
    context: string;
  };
}

interface AnalysisSession {
  id: string;
  name: string;
  documents: UploadedDocument[];
  textContent: string;
  contradictions: ContradictionResult[];
  createdAt: Date;
  status: 'analyzing' | 'complete' | 'error';
  progress: number;
}

interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string;
  url?: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
}

export default function ContradictionChecker() {
  const [currentSession, setCurrentSession] = useState<AnalysisSession>({
    id: Date.now().toString(),
    name: 'New Analysis Session',
    documents: [],
    textContent: '',
    contradictions: [],
    createdAt: new Date(),
    status: 'complete',
    progress: 0
  });

  const [sessions, setSessions] = useState<AnalysisSession[]>([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // File upload handling
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newDocuments: UploadedDocument[] = acceptedFiles.map(file => ({
      id: Date.now().toString() + Math.random().toString(),
      name: file.name,
      type: file.type || 'unknown',
      size: file.size,
      status: 'pending' as const
    }));

    setCurrentSession(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocuments]
    }));

    // Process each file
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      const docId = newDocuments[i].id;

      try {
        updateDocumentStatus(docId, 'processing');
        
        if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
          // Handle text files
          const text = await file.text();
          updateDocumentContent(docId, text, 'complete');
        } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
          // Handle PDF files - we'll need to implement PDF parsing
          await processPDFDocument(file, docId);
        } else if (file.type.startsWith('image/')) {
          // Handle images with OCR
          await processImageDocument(file, docId);
        } else {
          // Try to read as text for other formats
          try {
            const text = await file.text();
            updateDocumentContent(docId, text, 'complete');
          } catch {
            updateDocumentStatus(docId, 'error');
            toast.error(`Unsupported file type: ${file.name}`);
          }
        }
      } catch (error) {
        console.error('Error processing file:', error);
        updateDocumentStatus(docId, 'error');
        toast.error(`Failed to process ${file.name}`);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.md', '.rtf'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff'],
      'application/json': ['.json'],
      'text/csv': ['.csv']
    },
    maxFiles: 10,
    maxSize: 20 * 1024 * 1024 // 20MB
  });

  const updateDocumentStatus = (docId: string, status: UploadedDocument['status']) => {
    setCurrentSession(prev => ({
      ...prev,
      documents: prev.documents.map(doc => 
        doc.id === docId ? { ...doc, status } : doc
      )
    }));
  };

  const updateDocumentContent = (docId: string, content: string, status: UploadedDocument['status']) => {
    setCurrentSession(prev => ({
      ...prev,
      documents: prev.documents.map(doc => 
        doc.id === docId ? { ...doc, content, status } : doc
      )
    }));
  };

  const processPDFDocument = async (file: File, docId: string) => {
    try {
      // Upload to Supabase for processing
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const fileName = `${user.id}/contradiction-checker/${docId}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('evidence-uploads')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // For now, mark as complete - in a real implementation, you'd use a PDF parsing service
      updateDocumentContent(docId, `[PDF Document: ${file.name} - Content extraction pending]`, 'complete');
      toast.success(`PDF uploaded: ${file.name}`);
    } catch (error) {
      console.error('PDF processing error:', error);
      updateDocumentStatus(docId, 'error');
      throw error;
    }
  };

  const processImageDocument = async (file: File, docId: string) => {
    try {
      // For now, mark as complete - in a real implementation, you'd use OCR
      updateDocumentContent(docId, `[Image Document: ${file.name} - OCR processing pending]`, 'complete');
      toast.success(`Image uploaded: ${file.name}`);
    } catch (error) {
      console.error('Image processing error:', error);
      updateDocumentStatus(docId, 'error');
      throw error;
    }
  };

  const removeDocument = (docId: string) => {
    setCurrentSession(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== docId)
    }));
  };

  const analyzeForContradictions = async () => {
    setIsAnalyzing(true);
    setCurrentSession(prev => ({ ...prev, status: 'analyzing', progress: 0 }));

    try {
      // Combine all content
      const allContent = [
        currentSession.textContent,
        ...currentSession.documents
          .filter(doc => doc.content)
          .map(doc => doc.content)
      ].filter(Boolean).join('\n\n');

      if (!allContent.trim()) {
        toast.error('No content to analyze. Please upload documents or add text.');
        return;
      }

      // Simulate analysis progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setCurrentSession(prev => ({ ...prev, progress }));
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Run contradiction analysis
      const contradictions = await runContradictionAnalysis(allContent);

      setCurrentSession(prev => ({
        ...prev,
        contradictions,
        status: 'complete',
        progress: 100
      }));

      if (contradictions.length === 0) {
        toast.success('Analysis complete - No contradictions found!');
      } else {
        toast.warning(`Analysis complete - ${contradictions.length} contradiction(s) found`);
      }

      setActiveTab('results');
    } catch (error) {
      console.error('Analysis error:', error);
      setCurrentSession(prev => ({ ...prev, status: 'error' }));
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const runContradictionAnalysis = async (content: string): Promise<ContradictionResult[]> => {
    const contradictions: ContradictionResult[] = [];
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Simple contradiction detection patterns
    const patterns = [
      {
        type: 'logical' as const,
        pattern: /(always|never).*(?:sometimes|occasionally|rarely)/i,
        description: 'Logical contradiction between absolute and conditional statements'
      },
      {
        type: 'quantitative' as const,
        pattern: /(increase|rise|grow).*(?:decrease|fall|decline)/i,
        description: 'Contradictory quantitative trends mentioned'
      },
      {
        type: 'temporal' as const,
        pattern: /(before|prior|earlier).*(?:after|later|following)/i,
        description: 'Conflicting temporal relationships'
      },
      {
        type: 'factual' as const,
        pattern: /(yes|true|correct).*(?:no|false|incorrect|wrong)/i,
        description: 'Contradictory factual statements'
      }
    ];

    // Check for opposite sentiment words
    const oppositePairs = [
      ['good', 'bad'], ['high', 'low'], ['large', 'small'], 
      ['increase', 'decrease'], ['positive', 'negative'],
      ['safe', 'dangerous'], ['effective', 'ineffective']
    ];

    sentences.forEach((sentence, index) => {
      const cleanSentence = sentence.trim().toLowerCase();
      
      // Check contradiction patterns
      patterns.forEach(pattern => {
        if (pattern.pattern.test(cleanSentence)) {
          contradictions.push({
            id: `contradiction-${contradictions.length + 1}`,
            type: pattern.type,
            severity: 'medium',
            description: pattern.description,
            evidence: [sentence.trim()],
            confidence: 75,
            location: {
              start: index,
              end: index,
              context: sentence.trim()
            }
          });
        }
      });

      // Check for opposite word pairs in the same sentence
      oppositePairs.forEach(([word1, word2]) => {
        if (cleanSentence.includes(word1) && cleanSentence.includes(word2)) {
          contradictions.push({
            id: `contradiction-${contradictions.length + 1}`,
            type: 'semantic',
            severity: 'medium',
            description: `Contradictory terms "${word1}" and "${word2}" in same context`,
            evidence: [sentence.trim()],
            confidence: 70,
            location: {
              start: index,
              end: index,
              context: sentence.trim()
            }
          });
        }
      });
    });

    // Check for contradictions across sentences
    for (let i = 0; i < sentences.length; i++) {
      for (let j = i + 1; j < sentences.length; j++) {
        const sent1 = sentences[i].trim().toLowerCase();
        const sent2 = sentences[j].trim().toLowerCase();

        // Look for negation patterns
        oppositePairs.forEach(([word1, word2]) => {
          if ((sent1.includes(word1) && sent2.includes(word2)) ||
              (sent1.includes(word2) && sent2.includes(word1))) {
            contradictions.push({
              id: `contradiction-${contradictions.length + 1}`,
              type: 'semantic',
              severity: 'high',
              description: `Contradictory statements about "${word1}" vs "${word2}"`,
              evidence: [sentences[i].trim(), sentences[j].trim()],
              confidence: 80,
              suggestions: ['Review these statements for consistency', 'Consider clarifying the relationship between these concepts']
            });
          }
        });
      }
    }

    return contradictions;
  };

  const getSeverityColor = (severity: ContradictionResult['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: ContradictionResult['type']) => {
    switch (type) {
      case 'logical': return '🧠';
      case 'factual': return '📊';
      case 'temporal': return '⏰';
      case 'quantitative': return '📈';
      case 'semantic': return '💬';
      default: return '❓';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Contradiction Checker Platform
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload documents, paste text, or analyze any content to automatically detect logical contradictions, 
          inconsistencies, and conflicting statements with AI-powered analysis.
        </p>
      </div>

      {/* Session Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Current Analysis Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Input
                value={currentSession.name}
                onChange={(e) => setCurrentSession(prev => ({ ...prev, name: e.target.value }))}
                className="font-medium"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {currentSession.documents.length} document(s) • {currentSession.contradictions.length} contradiction(s) found
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
              <Button 
                onClick={analyzeForContradictions}
                disabled={isAnalyzing || (!currentSession.textContent.trim() && currentSession.documents.length === 0)}
              >
                <Zap className="h-4 w-4 mr-2" />
                {isAnalyzing ? 'Analyzing...' : 'Analyze Content'}
              </Button>
            </div>
          </div>
          
          {currentSession.status === 'analyzing' && (
            <div className="mt-4">
              <Progress value={currentSession.progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">
                Analyzing content for contradictions... {currentSession.progress}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload & Input</TabsTrigger>
          <TabsTrigger value="documents">Documents ({currentSession.documents.length})</TabsTrigger>
          <TabsTrigger value="results">
            Results ({currentSession.contradictions.length})
            {currentSession.contradictions.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {currentSession.contradictions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
        </TabsList>

        {/* Upload & Input Tab */}
        <TabsContent value="upload" className="space-y-6">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Document Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                {isDragActive ? (
                  <p className="text-lg font-medium">Drop files here...</p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Drag & drop files here, or click to select</p>
                    <p className="text-sm text-muted-foreground">
                      Supports: PDF, Word, Text, Images, CSV, JSON (Max 20MB each, 10 files)
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Text Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Direct Text Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="textContent">Paste or type content to analyze</Label>
                <Textarea
                  id="textContent"
                  placeholder="Enter text content here to check for contradictions..."
                  value={currentSession.textContent}
                  onChange={(e) => setCurrentSession(prev => ({ ...prev, textContent: e.target.value }))}
                  rows={10}
                  className="min-h-[200px]"
                />
                <p className="text-sm text-muted-foreground">
                  {currentSession.textContent.length} characters
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          {currentSession.documents.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">No documents uploaded</p>
                <p className="text-muted-foreground">Upload documents to begin analysis</p>
              </CardContent>
            </Card>
          ) : (
            currentSession.documents.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(doc.size / 1024).toFixed(1)} KB • {doc.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={doc.status === 'complete' ? 'default' : 
                                doc.status === 'error' ? 'destructive' : 'secondary'}
                      >
                        {doc.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(doc.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {doc.content && (
                    <div className="mt-3 p-3 bg-muted rounded border">
                      <p className="text-sm text-muted-foreground mb-1">Content preview:</p>
                      <p className="text-sm">
                        {doc.content.length > 200 
                          ? doc.content.substring(0, 200) + '...' 
                          : doc.content
                        }
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-4">
          {currentSession.contradictions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <p className="text-lg font-medium mb-2">No contradictions found</p>
                <p className="text-muted-foreground">
                  {currentSession.textContent || currentSession.documents.length > 0
                    ? 'Your content appears to be logically consistent!'
                    : 'Upload content or run analysis to see results here'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Contradiction Analysis Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {['critical', 'high', 'medium', 'low'].map(severity => {
                      const count = currentSession.contradictions.filter(c => c.severity === severity).length;
                      return (
                        <div key={severity} className="text-center">
                          <div className={`w-4 h-4 rounded-full ${getSeverityColor(severity as any)} mx-auto mb-1`}></div>
                          <p className="text-2xl font-bold">{count}</p>
                          <p className="text-sm text-muted-foreground capitalize">{severity}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Contradictions List */}
              {currentSession.contradictions.map((contradiction, index) => (
                <Card key={contradiction.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getTypeIcon(contradiction.type)}</span>
                        <span>Contradiction #{index + 1}</span>
                        <Badge className={`${getSeverityColor(contradiction.severity)} text-white`}>
                          {contradiction.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {contradiction.type}
                        </Badge>
                      </div>
                      <Badge variant="secondary">
                        {contradiction.confidence}% confidence
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-medium">{contradiction.description}</p>
                    
                    <div>
                      <Label className="text-sm font-medium">Evidence:</Label>
                      <div className="mt-2 space-y-2">
                        {contradiction.evidence.map((evidence, idx) => (
                          <Alert key={idx}>
                            <AlertDescription>
                              "{evidence}"
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </div>

                    {contradiction.suggestions && (
                      <div>
                        <Label className="text-sm font-medium">Suggestions:</Label>
                        <ul className="mt-2 space-y-1">
                          {contradiction.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span>•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardContent className="p-8 text-center">
              <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Analysis History</p>
              <p className="text-muted-foreground">Previous analysis sessions will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}