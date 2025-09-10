import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileImage, FileText, Camera, MapPin, Edit3, Trash2, Eye, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface JobFile {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_category: string;
  description: string;
  file_size: number;
  tags: string[];
  is_primary: boolean;
  created_at: string;
  mime_type: string;
}

interface JobNote {
  id: string;
  title: string;
  content: string;
  note_type: string;
  location_tag: string;
  priority: string;
  created_at: string;
}

interface JobFileManagerProps {
  jobId: string;
  jobTitle: string;
}

export const JobFileManager = ({ jobId, jobTitle }: JobFileManagerProps) => {
  const [files, setFiles] = useState<JobFile[]>([]);
  const [notes, setNotes] = useState<JobNote[]>([]);
  const [uploading, setUploading] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    note_type: "general",
    location_tag: "",
    priority: "normal"
  });
  const { toast } = useToast();

  const fileTypes = [
    { value: "photo", label: "Photo", icon: Camera },
    { value: "document", label: "Document", icon: FileText },
    { value: "drawing", label: "Drawing", icon: Edit3 },
    { value: "survey", label: "Survey", icon: MapPin }
  ];

  const noteTypes = [
    { value: "general", label: "General Note" },
    { value: "inspection", label: "Inspection Note" },
    { value: "valuation", label: "Valuation Note" },
    { value: "market_analysis", label: "Market Analysis" },
    { value: "risk_assessment", label: "Risk Assessment" }
  ];

  const locationTags = [
    "exterior", "interior", "kitchen", "bathroom", "bedroom", "living_room", 
    "roof", "foundation", "garage", "garden", "fence", "driveway"
  ];

  useEffect(() => {
    loadJobFiles();
    loadJobNotes();
  }, [jobId]);

  const loadJobFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('job_files')
        .select('*')
        .eq('job_id', jobId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error loading files:', error);
      toast({
        title: "Error",
        description: "Failed to load job files",
        variant: "destructive"
      });
    }
  };

  const loadJobNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('job_notes')
        .select('*')
        .eq('job_id', jobId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/job_${jobId}/${Date.now()}.${fileExt}`;
      const bucket = fileType === 'photo' ? 'property-images' : 'documents';

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('job_files')
        .insert({
          job_id: jobId,
          user_id: user.id,
          file_name: file.name,
          file_path: fileName,
          file_type: fileType,
          file_category: fileType === 'photo' ? 'property_photos' : 'documents',
          mime_type: file.type,
          file_size: file.size,
          description: `${fileType} uploaded for ${jobTitle}`
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: `${fileType} uploaded successfully`
      });

      loadJobFiles();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload file",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.title || !newNote.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and content",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('job_notes')
        .insert({
          job_id: jobId,
          user_id: user.id,
          ...newNote
        });

      if (error) throw error;

      setNewNote({
        title: "",
        content: "",
        note_type: "general",
        location_tag: "",
        priority: "normal"
      });

      toast({
        title: "Success",
        description: "Note added successfully"
      });

      loadJobNotes();
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: "Error",
        description: "Failed to add note",
        variant: "destructive"
      });
    }
  };

  const getFileIcon = (fileType: string) => {
    const type = fileTypes.find(t => t.value === fileType);
    return type ? type.icon : FileText;
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileImage className="h-5 w-5" />
          Job Files & Notes - {jobTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="files">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="files">Files ({files.length})</TabsTrigger>
            <TabsTrigger value="notes">Notes ({notes.length})</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="files" className="space-y-4">
            {files.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileImage className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No files uploaded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((file) => {
                  const IconComponent = getFileIcon(file.file_type);
                  return (
                    <Card key={file.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <IconComponent className="h-8 w-8 text-blue-500" />
                        {file.is_primary && <Badge variant="secondary">Primary</Badge>}
                      </div>
                      <h4 className="font-medium text-sm truncate" title={file.file_name}>
                        {file.file_name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatFileSize(file.file_size)} • {new Date(file.created_at).toLocaleDateString()}
                      </p>
                      {file.description && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {file.description}
                        </p>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="note-title">Note Title</Label>
                <Input
                  id="note-title"
                  value={newNote.title}
                  onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter note title"
                />
              </div>
              <div>
                <Label htmlFor="note-type">Note Type</Label>
                <Select value={newNote.note_type} onValueChange={(value) => setNewNote(prev => ({ ...prev, note_type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {noteTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location-tag">Location</Label>
                <Select value={newNote.location_tag} onValueChange={(value) => setNewNote(prev => ({ ...prev, location_tag: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationTags.map(tag => (
                      <SelectItem key={tag} value={tag}>
                        {tag.replace('_', ' ').toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={newNote.priority} onValueChange={(value) => setNewNote(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="note-content">Note Content</Label>
              <Textarea
                id="note-content"
                value={newNote.content}
                onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter your note content"
                rows={4}
              />
            </div>
            
            <Button onClick={handleAddNote} className="w-full">
              Add Note
            </Button>

            <div className="space-y-3">
              {notes.map((note) => (
                <Card key={note.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{note.title}</h4>
                    <div className="flex gap-2">
                      <Badge variant={note.priority === 'critical' ? 'destructive' : note.priority === 'high' ? 'default' : 'secondary'}>
                        {note.priority}
                      </Badge>
                      <Badge variant="outline">{note.note_type.replace('_', ' ')}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{note.content}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{new Date(note.created_at).toLocaleString()}</span>
                    {note.location_tag && <span>📍 {note.location_tag.replace('_', ' ')}</span>}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fileTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <Card key={type.value} className="p-6">
                    <div className="text-center">
                      <IconComponent className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                      <h3 className="font-medium mb-2">{type.label}</h3>
                      <Label htmlFor={`upload-${type.value}`}>
                        <Button variant="outline" disabled={uploading} className="w-full" asChild>
                          <span>
                            <Upload className="h-4 w-4 mr-2" />
                            {uploading ? 'Uploading...' : `Upload ${type.label}`}
                          </span>
                        </Button>
                      </Label>
                      <Input
                        id={`upload-${type.value}`}
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, type.value)}
                        accept={type.value === 'photo' ? 'image/*' : '*'}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};