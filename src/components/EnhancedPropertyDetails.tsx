import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Image, 
  Download, 
  Eye, 
  Zap,
  Camera,
  Home,
  MapPin,
  Ruler,
  Calendar,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { useReportData } from "@/contexts/ReportDataContext";
import { useProperty } from "@/contexts/PropertyContext";

interface PropertyPhoto {
  id: string;
  url: string;
  caption: string;
  category: "exterior" | "interior" | "aerial" | "street-view" | "plans";
  uploadedAt: Date;
  fromPAF: boolean;
}

interface PropertyImprovement {
  id: string;
  type: string;
  description: string;
  value: number;
  yearAdded: number;
  condition: string;
  fromPAF: boolean;
}

interface BuildingSpecification {
  field: string;
  value: string;
  unit?: string;
  fromPAF: boolean;
  editable: boolean;
}

interface WorkingDrawing {
  id: string;
  name: string;
  type: "architectural" | "engineering" | "survey" | "planning";
  file: File | null;
  extractedData: any;
  ocrProcessed: boolean;
  uploadedAt: Date;
}

export default function EnhancedPropertyDetails() {
  const { reportData, updateReportData } = useReportData();
  const { addressData } = useProperty();

  // Core States
  const [includeSection, setIncludeSection] = useState(true);
  const [pafDataLoaded, setPafDataLoaded] = useState(false);
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);

  // Property Type (preselected from PAF)
  const [propertyType, setPropertyType] = useState("residential");

  // Property Photos (transferred from PAF)
  const [propertyPhotos, setPropertyPhotos] = useState<PropertyPhoto[]>([]);

  // Property Improvements (from PAF)
  const [propertyImprovements, setPropertyImprovements] = useState<PropertyImprovement[]>([]);

  // Building Specifications (auto-populated from PAF)
  const [buildingSpecs, setBuildingSpecs] = useState<BuildingSpecification[]>([
    { field: "Building Area", value: "", unit: "sqm", fromPAF: false, editable: true },
    { field: "Land Area", value: "", unit: "sqm", fromPAF: false, editable: true },
    { field: "Height", value: "", unit: "meters", fromPAF: false, editable: true },
    { field: "Floors", value: "", unit: "levels", fromPAF: false, editable: true },
    { field: "Construction Type", value: "", fromPAF: false, editable: true },
    { field: "Year Built", value: "", fromPAF: false, editable: true },
    { field: "Condition", value: "", fromPAF: false, editable: true },
    { field: "Parking Spaces", value: "", unit: "spaces", fromPAF: false, editable: true },
    { field: "Accessibility Features", value: "", fromPAF: false, editable: true }
  ]);

  // Working Drawings and Plans
  const [workingDrawings, setWorkingDrawings] = useState<WorkingDrawing[]>([]);

  // Additional Information
  const [additionalInfo, setAdditionalInfo] = useState({
    propertyDescription: "",
    specialFeatures: "",
    locationDescription: "",
    accessNotes: "",
    maintenanceHistory: "",
    upgradesRenovations: ""
  });

  // PAF Data Transfer Effect
  useEffect(() => {
    const pafData = reportData?.propertySearchData;
    if (pafData && !pafDataLoaded) {
      // Transfer property type
      if (pafData.propertyType) {
        setPropertyType(pafData.propertyType);
      }

      // Transfer property photos
      if (pafData.photos && pafData.photos.length > 0) {
        const transferredPhotos = pafData.photos.map((photo: any, index: number) => ({
          id: `paf-photo-${index}`,
          url: photo.url || photo.dataUrl,
          caption: photo.caption || `Property photo ${index + 1}`,
          category: photo.category || "exterior",
          uploadedAt: new Date(),
          fromPAF: true
        }));
        setPropertyPhotos(transferredPhotos);
      }

      // Transfer building specifications
      setBuildingSpecs(prev => prev.map(spec => {
        const pafValue = getPAFValue(spec.field, pafData);
        if (pafValue) {
          return { ...spec, value: pafValue, fromPAF: true };
        }
        return spec;
      }));

      // Transfer property improvements
      if (pafData.improvements) {
        const transferredImprovements = pafData.improvements.map((improvement: any, index: number) => ({
          id: `paf-improvement-${index}`,
          type: improvement.type || "General",
          description: improvement.description || "",
          value: improvement.value || 0,
          yearAdded: improvement.yearAdded || new Date().getFullYear(),
          condition: improvement.condition || "Good",
          fromPAF: true
        }));
        setPropertyImprovements(transferredImprovements);
      }

      // Transfer additional information
      setAdditionalInfo(prev => ({
        ...prev,
        propertyDescription: pafData.description || prev.propertyDescription,
        specialFeatures: pafData.specialFeatures || prev.specialFeatures,
        locationDescription: pafData.locationNotes || prev.locationDescription
      }));

      setPafDataLoaded(true);
      toast.success("Property details pre-populated from Property Assessment Form");
    }
  }, [reportData?.propertySearchData, pafDataLoaded]);

  // Get PAF value for building specification field
  const getPAFValue = (field: string, pafData: any): string => {
    const fieldMap: { [key: string]: string } = {
      "Building Area": pafData.buildingArea || pafData.floorArea,
      "Land Area": pafData.landArea || pafData.siteArea,
      "Height": pafData.buildingHeight,
      "Floors": pafData.numberOfFloors || pafData.levels,
      "Construction Type": pafData.constructionType || pafData.buildingMaterial,
      "Year Built": pafData.yearBuilt || pafData.constructionYear,
      "Condition": pafData.propertyCondition || pafData.buildingCondition,
      "Parking Spaces": pafData.parkingSpaces || pafData.carSpaces,
      "Accessibility Features": pafData.accessibilityFeatures || pafData.disabilityAccess
    };
    return fieldMap[field] || "";
  };

  // OCR Processing for Working Drawings
  const processOCRDocument = async (file: File, drawingId: string) => {
    setIsProcessingOCR(true);
    setOcrProgress(0);

    try {
      const stages = [
        { message: "Scanning document...", progress: 25 },
        { message: "Extracting dimensions...", progress: 50 },
        { message: "Analyzing specifications...", progress: 75 },
        { message: "Updating property data...", progress: 100 }
      ];

      for (const stage of stages) {
        setOcrProgress(stage.progress);
        toast.loading(stage.message);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Mock extracted data based on document type
      const extractedData = {
        dimensions: {
          buildingArea: "450",
          landArea: "650",
          frontage: "20",
          depth: "32.5"
        },
        specifications: {
          constructionType: "Brick Veneer",
          roofType: "Tile",
          floors: "2"
        },
        permits: {
          planningPermit: "PP-2023-001234",
          buildingPermit: "BP-2023-005678",
          approvalDate: "2023-08-15"
        }
      };

      // Update working drawing with extracted data
      setWorkingDrawings(prev => prev.map(drawing => 
        drawing.id === drawingId 
          ? { ...drawing, extractedData, ocrProcessed: true }
          : drawing
      ));

      // Auto-populate building specs with extracted data
      setBuildingSpecs(prev => prev.map(spec => {
        if (spec.field === "Building Area" && extractedData.dimensions.buildingArea) {
          return { ...spec, value: extractedData.dimensions.buildingArea, fromPAF: false };
        }
        if (spec.field === "Land Area" && extractedData.dimensions.landArea) {
          return { ...spec, value: extractedData.dimensions.landArea, fromPAF: false };
        }
        if (spec.field === "Construction Type" && extractedData.specifications.constructionType) {
          return { ...spec, value: extractedData.specifications.constructionType, fromPAF: false };
        }
        if (spec.field === "Floors" && extractedData.specifications.floors) {
          return { ...spec, value: extractedData.specifications.floors, fromPAF: false };
        }
        return spec;
      }));

      toast.success("OCR processing completed - property data updated");

    } catch (error) {
      toast.error("OCR processing failed. Please try again.");
    } finally {
      setIsProcessingOCR(false);
      setOcrProgress(0);
    }
  };

  // File upload handler
  const handleFileUpload = (file: File, category: "photo" | "drawing") => {
    if (category === "photo") {
      if (file.type.startsWith("image/")) {
        const newPhoto: PropertyPhoto = {
          id: `photo-${Date.now()}`,
          url: URL.createObjectURL(file),
          caption: `Property photo - ${file.name}`,
          category: "exterior",
          uploadedAt: new Date(),
          fromPAF: false
        };
        setPropertyPhotos(prev => [...prev, newPhoto]);
        toast.success("Photo uploaded successfully");
      } else {
        toast.error("Please upload an image file");
      }
    } else {
      const newDrawing: WorkingDrawing = {
        id: `drawing-${Date.now()}`,
        name: file.name,
        type: getDrawingType(file.name),
        file,
        extractedData: null,
        ocrProcessed: false,
        uploadedAt: new Date()
      };
      setWorkingDrawings(prev => [...prev, newDrawing]);
      
      // Start OCR processing if it's a PDF or image
      if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        processOCRDocument(file, newDrawing.id);
      }
      
      toast.success("Working drawing uploaded successfully");
    }
  };

  // Determine drawing type from filename
  const getDrawingType = (filename: string): WorkingDrawing["type"] => {
    const lower = filename.toLowerCase();
    if (lower.includes("architectural") || lower.includes("plan")) return "architectural";
    if (lower.includes("engineering") || lower.includes("structural")) return "engineering";
    if (lower.includes("survey")) return "survey";
    if (lower.includes("planning")) return "planning";
    return "architectural";
  };

  // Add new improvement
  const addImprovement = () => {
    const newImprovement: PropertyImprovement = {
      id: `improvement-${Date.now()}`,
      type: "",
      description: "",
      value: 0,
      yearAdded: new Date().getFullYear(),
      condition: "Good",
      fromPAF: false
    };
    setPropertyImprovements(prev => [...prev, newImprovement]);
  };

  // Update improvement
  const updateImprovement = (id: string, field: keyof PropertyImprovement, value: any) => {
    setPropertyImprovements(prev => prev.map(improvement => 
      improvement.id === id ? { ...improvement, [field]: value } : improvement
    ));
  };

  // Remove improvement
  const removeImprovement = (id: string) => {
    setPropertyImprovements(prev => prev.filter(improvement => improvement.id !== id));
  };

  // Update building spec
  const updateBuildingSpec = (field: string, value: string) => {
    setBuildingSpecs(prev => prev.map(spec => 
      spec.field === field ? { ...spec, value } : spec
    ));
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Property Details</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive property information with PAF integration and OCR processing
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="include-property-details">Include Section</Label>
          <Switch
            id="include-property-details"
            checked={includeSection}
            onCheckedChange={setIncludeSection}
          />
        </div>
      </div>

      {includeSection && (
        <>
          {/* PAF Data Alert */}
          {pafDataLoaded && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <div className="flex items-center justify-between">
                  <span>Property details transferred from Property Assessment Form</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    <Eye className="h-3 w-3 mr-1" />
                    PAF Data Loaded
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Property Type (Preselected from PAF) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Type
                {pafDataLoaded && (
                  <Badge className="bg-blue-100 text-blue-800">
                    Preselected from PAF
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="specialised">Specialised</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Tabs defaultValue="photos" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
              <TabsTrigger value="drawings">Working Drawings</TabsTrigger>
              <TabsTrigger value="additional">Additional Info</TabsTrigger>
            </TabsList>

            {/* Property Photos Tab */}
            <TabsContent value="photos" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Property Photos
                      {propertyPhotos.some(p => p.fromPAF) && (
                        <Badge className="bg-green-100 text-green-800">
                          {propertyPhotos.filter(p => p.fromPAF).length} from PAF
                        </Badge>
                      )}
                    </CardTitle>
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          files.forEach(file => handleFileUpload(file, "photo"));
                        }}
                        className="hidden"
                        id="photo-upload"
                      />
                      <Button asChild variant="outline">
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Photos
                        </label>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {propertyPhotos.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No property photos available</p>
                      <p className="text-sm text-gray-400">Upload photos or transfer from PAF</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {propertyPhotos.map((photo) => (
                        <Card key={photo.id} className="overflow-hidden">
                          <div className="aspect-video relative">
                            <img 
                              src={photo.url} 
                              alt={photo.caption}
                              className="w-full h-full object-cover"
                            />
                            {photo.fromPAF && (
                              <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                                <Zap className="h-3 w-3 mr-1" />
                                PAF
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-3">
                            <p className="text-sm font-medium">{photo.caption}</p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="outline">
                                {photo.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {photo.uploadedAt.toLocaleDateString()}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Building Specifications Tab */}
            <TabsContent value="specifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    Building Specifications
                    {buildingSpecs.some(s => s.fromPAF) && (
                      <Badge className="bg-green-100 text-green-800">
                        Auto-populated from PAF
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {buildingSpecs.map((spec) => (
                      <div key={spec.field} className="space-y-2">
                        <Label className="flex items-center gap-2">
                          {spec.field}
                          {spec.fromPAF && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                              <Zap className="h-2 w-2 mr-1" />
                              PAF
                            </Badge>
                          )}
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            value={spec.value}
                            onChange={(e) => updateBuildingSpec(spec.field, e.target.value)}
                            placeholder={`Enter ${spec.field.toLowerCase()}`}
                            disabled={!spec.editable}
                          />
                          {spec.unit && (
                            <div className="flex items-center px-3 bg-gray-100 rounded-md border">
                              <span className="text-sm text-gray-600">{spec.unit}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Property Improvements Tab */}
            <TabsContent value="improvements" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Property Improvements
                      {propertyImprovements.some(i => i.fromPAF) && (
                        <Badge className="bg-green-100 text-green-800">
                          From PAF
                        </Badge>
                      )}
                    </CardTitle>
                    <Button onClick={addImprovement} size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Add Improvement
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {propertyImprovements.length === 0 ? (
                    <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500">No improvements recorded</p>
                    </div>
                  ) : (
                    propertyImprovements.map((improvement) => (
                      <Card key={improvement.id} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">
                            Improvement #{propertyImprovements.indexOf(improvement) + 1}
                          </h4>
                          <div className="flex items-center gap-2">
                            {improvement.fromPAF && (
                              <Badge className="bg-green-100 text-green-800">
                                <Zap className="h-3 w-3 mr-1" />
                                PAF
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeImprovement(improvement.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Type</Label>
                            <Input
                              value={improvement.type}
                              onChange={(e) => updateImprovement(improvement.id, "type", e.target.value)}
                              placeholder="e.g., Kitchen renovation"
                            />
                          </div>
                          <div>
                            <Label>Value (AUD)</Label>
                            <Input
                              type="number"
                              value={improvement.value}
                              onChange={(e) => updateImprovement(improvement.id, "value", parseFloat(e.target.value) || 0)}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label>Year Added</Label>
                            <Input
                              type="number"
                              value={improvement.yearAdded}
                              onChange={(e) => updateImprovement(improvement.id, "yearAdded", parseInt(e.target.value) || new Date().getFullYear())}
                              placeholder="2023"
                            />
                          </div>
                        </div>
                        <div className="mt-3">
                          <Label>Description</Label>
                          <Textarea
                            value={improvement.description}
                            onChange={(e) => updateImprovement(improvement.id, "description", e.target.value)}
                            placeholder="Describe the improvement..."
                            className="min-h-[60px]"
                          />
                        </div>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Working Drawings Tab */}
            <TabsContent value="drawings" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Working Drawings & Plans
                    </CardTitle>
                    <div>
                      <Input
                        type="file"
                        accept=".pdf,.dwg,.png,.jpg,.jpeg"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "drawing");
                        }}
                        className="hidden"
                        id="drawing-upload"
                      />
                      <Button asChild variant="outline">
                        <label htmlFor="drawing-upload" className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Drawing
                        </label>
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload architectural plans, working drawings, and other documentation. OCR will extract dimensions and specifications.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* OCR Progress */}
                  {isProcessingOCR && (
                    <Card className="p-4 border-blue-200 bg-blue-50">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-700">Processing OCR...</span>
                          <span className="text-sm text-blue-600">{ocrProgress}%</span>
                        </div>
                        <Progress value={ocrProgress} className="h-2" />
                      </div>
                    </Card>
                  )}

                  {workingDrawings.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-2">No working drawings uploaded</p>
                      <p className="text-sm text-gray-400">Upload PDF, DWG, or image files for OCR processing</p>
                    </div>
                  ) : (
                    workingDrawings.map((drawing) => (
                      <Card key={drawing.id} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <h4 className="font-medium">{drawing.name}</h4>
                              <p className="text-sm text-muted-foreground capitalize">
                                {drawing.type} drawing
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {drawing.ocrProcessed && (
                              <Badge className="bg-green-100 text-green-800">
                                <Zap className="h-3 w-3 mr-1" />
                                OCR Processed
                              </Badge>
                            )}
                            <Badge variant="outline">
                              {drawing.uploadedAt.toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>

                        {drawing.extractedData && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <h5 className="font-medium mb-2">Extracted Data:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              {drawing.extractedData.dimensions && (
                                <div>
                                  <span className="font-medium">Dimensions:</span>
                                  <ul className="ml-4 mt-1">
                                    {Object.entries(drawing.extractedData.dimensions).map(([key, value]) => (
                                      <li key={key}>• {key}: {value as string}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {drawing.extractedData.specifications && (
                                <div>
                                  <span className="font-medium">Specifications:</span>
                                  <ul className="ml-4 mt-1">
                                    {Object.entries(drawing.extractedData.specifications).map(([key, value]) => (
                                      <li key={key}>• {key}: {value as string}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Additional Information Tab */}
            <TabsContent value="additional" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Additional Property Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Property Description</Label>
                    <Textarea
                      value={additionalInfo.propertyDescription}
                      onChange={(e) => setAdditionalInfo(prev => ({ ...prev, propertyDescription: e.target.value }))}
                      placeholder="Provide a comprehensive description of the property..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label>Special Features</Label>
                    <Textarea
                      value={additionalInfo.specialFeatures}
                      onChange={(e) => setAdditionalInfo(prev => ({ ...prev, specialFeatures: e.target.value }))}
                      placeholder="List any special features, unique characteristics, or notable amenities..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Location Description</Label>
                      <Textarea
                        value={additionalInfo.locationDescription}
                        onChange={(e) => setAdditionalInfo(prev => ({ ...prev, locationDescription: e.target.value }))}
                        placeholder="Describe the location, surroundings, and accessibility..."
                        className="min-h-[80px]"
                      />
                    </div>
                    <div>
                      <Label>Access Notes</Label>
                      <Textarea
                        value={additionalInfo.accessNotes}
                        onChange={(e) => setAdditionalInfo(prev => ({ ...prev, accessNotes: e.target.value }))}
                        placeholder="Access arrangements, keys, restrictions, etc..."
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Maintenance History</Label>
                    <Textarea
                      value={additionalInfo.maintenanceHistory}
                      onChange={(e) => setAdditionalInfo(prev => ({ ...prev, maintenanceHistory: e.target.value }))}
                      placeholder="Recent maintenance work, service records, warranty information..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div>
                    <Label>Upgrades & Renovations</Label>
                    <Textarea
                      value={additionalInfo.upgradesRenovations}
                      onChange={(e) => setAdditionalInfo(prev => ({ ...prev, upgradesRenovations: e.target.value }))}
                      placeholder="Details of recent upgrades, renovations, or modifications..."
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}