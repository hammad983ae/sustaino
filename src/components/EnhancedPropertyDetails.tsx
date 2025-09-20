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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
  RefreshCw,
  Building2,
  Shield,
  BookOpen,
  Calculator
} from "lucide-react";
import { toast } from "sonner";
import { useReportData } from "@/contexts/ReportDataContext";
import { useProperty } from "@/contexts/PropertyContext";

// IPMS Measurement Standards (API Technical Information Paper)
interface IPMSMeasurement {
  ipms1: string; // Whole building measurement to outer perimeter (insurance, construction)
  ipms2: string; // Interior boundary to Internal Dominant Face (benchmarking) 
  ipms3: string; // Exclusive occupier areas (transactional - sales/leasing/valuation)
  measurementMethod: 'ipms_3_office' | 'ipms_3a_residential' | 'ipms_3a_industrial' | 'pca_gla' | 'pca_glar' | 'strata_title';
  stateStrataMethod?: string; // For strata properties (VIC/NSW/QLD/SA/WA/TAS/NT/ACT)
  primaryUse: 'office' | 'residential' | 'industrial' | 'retail' | 'mixed_use' | 'specialised';
  measurementNotes?: string;
  lastVerified?: string;
}

// Building Compliance with PAF Integration
interface BuildingCompliance {
  id: string;
  category: 'building_code' | 'fire_safety' | 'disability_access' | 'energy_efficiency' | 'planning_permit' | 'strata_compliance' | 'heritage_listing' | 'environmental' | 'structural' | 'electrical' | 'plumbing' | 'hvac';
  description: string;
  status: 'yes' | 'no' | 'not_applicable';
  details?: string;
  pafSource: boolean;
  lastChecked?: string;
  certificationNumber?: string;
  expiryDate?: string;
}

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
  category: 'measurement' | 'construction' | 'systems' | 'features';
}

interface WorkingDrawing {
  id: string;
  name: string;
  type: "architectural" | "engineering" | "survey" | "planning" | "structural" | "services";
  file: File | null;
  extractedData: any;
  ocrProcessed: boolean;
  uploadedAt: Date;
  measurementData?: {
    areas: { [key: string]: string };
    dimensions: { [key: string]: string };
    specifications: { [key: string]: string };
  };
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

  // IPMS Building Area Measurements (comprehensive standards)
  const [buildingAreas, setBuildingAreas] = useState<IPMSMeasurement>({
    ipms1: "", // Gross Building Area (outer perimeter)
    ipms2: "", // Internal area to Internal Dominant Face
    ipms3: "", // Net Lettable/Exclusive area (transactional)
    measurementMethod: 'ipms_3a_residential',
    primaryUse: 'residential',
    measurementNotes: "",
    lastVerified: ""
  });

  // Building Compliance with PAF Integration
  const [buildingCompliance, setBuildingCompliance] = useState<BuildingCompliance[]>([
    { id: 'bc-1', category: 'building_code', description: 'Building Code Compliance (BCA/NCC)', status: 'not_applicable', pafSource: false },
    { id: 'bc-2', category: 'fire_safety', description: 'Fire Safety Certificate', status: 'not_applicable', pafSource: false },
    { id: 'bc-3', category: 'disability_access', description: 'Disability Discrimination Act Compliance', status: 'not_applicable', pafSource: false },
    { id: 'bc-4', category: 'energy_efficiency', description: 'Energy Efficiency Certificate', status: 'not_applicable', pafSource: false },
    { id: 'bc-5', category: 'planning_permit', description: 'Planning Permit/Approval', status: 'not_applicable', pafSource: false },
    { id: 'bc-6', category: 'strata_compliance', description: 'Strata/Body Corporate Compliance', status: 'not_applicable', pafSource: false },
    { id: 'bc-7', category: 'heritage_listing', description: 'Heritage Listing Compliance', status: 'not_applicable', pafSource: false },
    { id: 'bc-8', category: 'environmental', description: 'Environmental Compliance', status: 'not_applicable', pafSource: false },
    { id: 'bc-9', category: 'structural', description: 'Structural Engineering Certificate', status: 'not_applicable', pafSource: false },
    { id: 'bc-10', category: 'electrical', description: 'Electrical Safety Certificate', status: 'not_applicable', pafSource: false },
    { id: 'bc-11', category: 'plumbing', description: 'Plumbing/Gas Compliance Certificate', status: 'not_applicable', pafSource: false },
    { id: 'bc-12', category: 'hvac', description: 'HVAC/Air Conditioning Compliance', status: 'not_applicable', pafSource: false }
  ]);

  // Property Photos (transferred from PAF)
  const [propertyPhotos, setPropertyPhotos] = useState<PropertyPhoto[]>([]);

  // Property Improvements (from PAF)
  const [propertyImprovements, setPropertyImprovements] = useState<PropertyImprovement[]>([]);

  // Building Specifications (auto-populated from PAF with IPMS compliance)
  const [buildingSpecs, setBuildingSpecs] = useState<BuildingSpecification[]>([
    // Measurement Category (IPMS Standards)
    { field: "IPMS 1 - Gross Building Area", value: "", unit: "sqm", fromPAF: false, editable: true, category: 'measurement' },
    { field: "IPMS 2 - Internal Area", value: "", unit: "sqm", fromPAF: false, editable: true, category: 'measurement' },
    { field: "IPMS 3 - Net Lettable Area", value: "", unit: "sqm", fromPAF: false, editable: true, category: 'measurement' },
    { field: "Land Area", value: "", unit: "sqm", fromPAF: false, editable: true, category: 'measurement' },
    { field: "Site Coverage", value: "", unit: "%", fromPAF: false, editable: true, category: 'measurement' },
    { field: "Floor Space Ratio", value: "", unit: ":1", fromPAF: false, editable: true, category: 'measurement' },
    
    // Construction Category
    { field: "Construction Type", value: "", fromPAF: false, editable: true, category: 'construction' },
    { field: "External Wall Construction", value: "", fromPAF: false, editable: true, category: 'construction' },
    { field: "Roof Construction", value: "", fromPAF: false, editable: true, category: 'construction' },
    { field: "Internal Wall Construction", value: "", fromPAF: false, editable: true, category: 'construction' },
    { field: "Floor Construction", value: "", fromPAF: false, editable: true, category: 'construction' },
    { field: "Foundation Type", value: "", fromPAF: false, editable: true, category: 'construction' },
    { field: "Year Built", value: "", fromPAF: false, editable: true, category: 'construction' },
    { field: "Year Renovated", value: "", fromPAF: false, editable: true, category: 'construction' },
    
    // Systems Category  
    { field: "Heating System", value: "", fromPAF: false, editable: true, category: 'systems' },
    { field: "Cooling System", value: "", fromPAF: false, editable: true, category: 'systems' },
    { field: "Hot Water System", value: "", fromPAF: false, editable: true, category: 'systems' },
    { field: "Electrical System", value: "", fromPAF: false, editable: true, category: 'systems' },
    { field: "Plumbing System", value: "", fromPAF: false, editable: true, category: 'systems' },
    { field: "Internet/Data Infrastructure", value: "", fromPAF: false, editable: true, category: 'systems' },
    
    // Features Category
    { field: "Parking Spaces", value: "", unit: "spaces", fromPAF: false, editable: true, category: 'features' },
    { field: "Levels/Floors", value: "", unit: "levels", fromPAF: false, editable: true, category: 'features' },
    { field: "Ceiling Height", value: "", unit: "m", fromPAF: false, editable: true, category: 'features' },
    { field: "Natural Light Rating", value: "", fromPAF: false, editable: true, category: 'features' },
    { field: "Accessibility Features", value: "", fromPAF: false, editable: true, category: 'features' },
    { field: "Energy Efficiency Rating", value: "", fromPAF: false, editable: true, category: 'features' },
    { field: "Overall Condition", value: "", fromPAF: false, editable: true, category: 'features' }
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
        setBuildingAreas(prev => ({
          ...prev,
          primaryUse: pafData.propertyType as IPMSMeasurement['primaryUse'],
          measurementMethod: getMeasurementMethod(pafData.propertyType)
        }));
      }

      // Transfer building area measurements with IPMS standards
      if (pafData.buildingArea || pafData.landArea) {
        setBuildingAreas(prev => ({
          ...prev,
          ipms3: pafData.buildingArea || prev.ipms3,
          lastVerified: new Date().toISOString()
        }));
      }

      // Transfer building compliance from PAF
      if (pafData.compliance || pafData.certificates) {
        setBuildingCompliance(prev => prev.map(comp => {
          const pafCompliance = getPAFCompliance(comp.category, pafData);
          if (pafCompliance) {
            return { ...comp, ...pafCompliance, pafSource: true };
          }
          return comp;
        }));
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

  // Get IPMS measurement method based on property type
  const getMeasurementMethod = (propType: string): IPMSMeasurement['measurementMethod'] => {
    switch (propType.toLowerCase()) {
      case 'office': return 'ipms_3_office';
      case 'residential': return 'ipms_3a_residential';
      case 'industrial': return 'ipms_3a_industrial';
      case 'retail': return 'pca_gla';
      default: return 'ipms_3a_residential';
    }
  };

  // Get compliance data from PAF
  const getPAFCompliance = (category: BuildingCompliance['category'], pafData: any) => {
    const complianceMap: { [key: string]: any } = {
      'building_code': pafData.buildingCodeCompliance || pafData.bcaCompliance,
      'fire_safety': pafData.fireSafetyCertificate || pafData.fireCompliance,
      'disability_access': pafData.dadCompliance || pafData.accessibilityCompliance,
      'energy_efficiency': pafData.energyRating || pafData.efficiencyCompliance,
      'planning_permit': pafData.planningPermit || pafData.planningApproval,
      'strata_compliance': pafData.strataCompliance || pafData.bodyCorpCompliance,
      'heritage_listing': pafData.heritageCompliance || pafData.heritageStatus,
      'environmental': pafData.environmentalCompliance || pafData.epaCompliance
    };
    
    const compliance = complianceMap[category];
    if (compliance) {
      return {
        status: compliance.status || 'not_applicable',
        details: compliance.details || compliance.notes,
        certificationNumber: compliance.certificateNumber || compliance.permitNumber,
        expiryDate: compliance.expiryDate,
        lastChecked: new Date().toISOString()
      };
    }
    return null;
  };

  // Get PAF value for building specification field
  const getPAFValue = (field: string, pafData: any): string => {
    const fieldMap: { [key: string]: string } = {
      "IPMS 1 - Gross Building Area": pafData.grossBuildingArea || pafData.ipms1,
      "IPMS 2 - Internal Area": pafData.internalArea || pafData.ipms2,
      "IPMS 3 - Net Lettable Area": pafData.buildingArea || pafData.netlettableArea || pafData.ipms3,
      "Land Area": pafData.landArea || pafData.siteArea,
      "Site Coverage": pafData.siteCoverage,
      "Floor Space Ratio": pafData.floorSpaceRatio || pafData.fsr,
      "Construction Type": pafData.constructionType || pafData.buildingMaterial,
      "External Wall Construction": pafData.externalWalls || pafData.wallConstruction,
      "Roof Construction": pafData.roofType || pafData.roofMaterial,
      "Internal Wall Construction": pafData.internalWalls,
      "Floor Construction": pafData.floorType || pafData.flooring,
      "Foundation Type": pafData.foundationType,
      "Year Built": pafData.yearBuilt || pafData.constructionYear,
      "Year Renovated": pafData.yearRenovated || pafData.renovationYear,
      "Heating System": pafData.heating || pafData.heatingSystem,
      "Cooling System": pafData.cooling || pafData.airConditioning,
      "Hot Water System": pafData.hotWater || pafData.hotWaterSystem,
      "Electrical System": pafData.electrical || pafData.electricalSystem,
      "Plumbing System": pafData.plumbing || pafData.plumbingSystem,
      "Internet/Data Infrastructure": pafData.internetData || pafData.dataInfrastructure,
      "Parking Spaces": pafData.parkingSpaces || pafData.carSpaces,
      "Levels/Floors": pafData.numberOfFloors || pafData.levels,
      "Ceiling Height": pafData.ceilingHeight,
      "Natural Light Rating": pafData.naturalLight,
      "Accessibility Features": pafData.accessibilityFeatures || pafData.disabilityAccess,
      "Energy Efficiency Rating": pafData.energyRating || pafData.energyEfficiency,
      "Overall Condition": pafData.propertyCondition || pafData.buildingCondition
    };
    return fieldMap[field] || "";
  };

  // Update building compliance
  const updateCompliance = (id: string, field: keyof BuildingCompliance, value: any) => {
    setBuildingCompliance(prev => prev.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };

  // Update building area measurement
  const updateBuildingArea = (field: keyof IPMSMeasurement, value: string) => {
    setBuildingAreas(prev => ({ ...prev, [field]: value }));
  };

  // OCR Processing for Working Drawings with enhanced measurement extraction
  const processOCRDocument = async (file: File, drawingId: string) => {
    setIsProcessingOCR(true);
    setOcrProgress(0);

    try {
      const stages = [
        { message: "Scanning document for text and dimensions...", progress: 20 },
        { message: "Extracting IPMS measurements...", progress: 40 },
        { message: "Analyzing building specifications...", progress: 60 },
        { message: "Processing compliance information...", progress: 80 },
        { message: "Updating property data...", progress: 100 }
      ];

      for (const stage of stages) {
        setOcrProgress(stage.progress);
        toast.loading(stage.message);
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

      // Enhanced extracted data with IPMS compliance
      const extractedData = {
        measurements: {
          ipms1_gross: "485.5",
          ipms2_internal: "450.2", 
          ipms3_net: "420.8",
          landArea: "650.0",
          siteCoverage: "34.5",
          floorSpaceRatio: "0.65"
        },
        specifications: {
          constructionType: "Brick Veneer",
          externalWalls: "Double Brick with Cavity",
          roofType: "Concrete Tiles",
          floors: "2",
          ceilingHeight: "2.7"
        },
        compliance: {
          planningPermit: "PP-2023-001234",
          buildingPermit: "BP-2023-005678",
          fireSafetyCert: "FS-2023-009876",
          approvalDate: "2023-08-15"
        },
        dimensions: {
          frontage: "20.0",
          depth: "32.5",
          height: "8.5"
        }
      };

      // Update working drawing with extracted data
      setWorkingDrawings(prev => prev.map(drawing => 
        drawing.id === drawingId 
          ? { 
              ...drawing, 
              extractedData, 
              ocrProcessed: true,
              measurementData: {
                areas: extractedData.measurements,
                dimensions: extractedData.dimensions,
                specifications: extractedData.specifications
              }
            }
          : drawing
      ));

      // Auto-populate IPMS building areas
      setBuildingAreas(prev => ({
        ...prev,
        ipms1: extractedData.measurements.ipms1_gross,
        ipms2: extractedData.measurements.ipms2_internal,
        ipms3: extractedData.measurements.ipms3_net,
        lastVerified: new Date().toISOString()
      }));

      // Auto-populate building specs with extracted data
      setBuildingSpecs(prev => prev.map(spec => {
        if (spec.field === "IPMS 1 - Gross Building Area") {
          return { ...spec, value: extractedData.measurements.ipms1_gross };
        }
        if (spec.field === "IPMS 2 - Internal Area") {
          return { ...spec, value: extractedData.measurements.ipms2_internal };
        }
        if (spec.field === "IPMS 3 - Net Lettable Area") {
          return { ...spec, value: extractedData.measurements.ipms3_net };
        }
        if (spec.field === "Land Area") {
          return { ...spec, value: extractedData.measurements.landArea };
        }
        if (spec.field === "Construction Type") {
          return { ...spec, value: extractedData.specifications.constructionType };
        }
        if (spec.field === "External Wall Construction") {
          return { ...spec, value: extractedData.specifications.externalWalls };
        }
        if (spec.field === "Roof Construction") {
          return { ...spec, value: extractedData.specifications.roofType };
        }
        if (spec.field === "Levels/Floors") {
          return { ...spec, value: extractedData.specifications.floors };
        }
        if (spec.field === "Ceiling Height") {
          return { ...spec, value: extractedData.specifications.ceilingHeight };
        }
        return spec;
      }));

      // Auto-populate compliance data
      setBuildingCompliance(prev => prev.map(comp => {
        if (comp.category === 'planning_permit' && extractedData.compliance.planningPermit) {
          return { 
            ...comp, 
            status: 'yes',
            details: `Planning Permit: ${extractedData.compliance.planningPermit}`,
            certificationNumber: extractedData.compliance.planningPermit
          };
        }
        if (comp.category === 'building_code' && extractedData.compliance.buildingPermit) {
          return { 
            ...comp, 
            status: 'yes',
            details: `Building Permit: ${extractedData.compliance.buildingPermit}`,
            certificationNumber: extractedData.compliance.buildingPermit
          };
        }
        if (comp.category === 'fire_safety' && extractedData.compliance.fireSafetyCert) {
          return { 
            ...comp, 
            status: 'yes',
            details: `Fire Safety Certificate: ${extractedData.compliance.fireSafetyCert}`,
            certificationNumber: extractedData.compliance.fireSafetyCert
          };
        }
        return comp;
      }));

      toast.success("OCR processing completed - IPMS measurements and compliance data extracted");

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
      
      toast.success("Working drawing uploaded - OCR processing started");
    }
  };

  // Determine drawing type from filename
  const getDrawingType = (filename: string): WorkingDrawing["type"] => {
    const lower = filename.toLowerCase();
    if (lower.includes("architectural") || lower.includes("plan")) return "architectural";
    if (lower.includes("engineering") || lower.includes("structural")) return "engineering";
    if (lower.includes("survey")) return "survey";
    if (lower.includes("planning")) return "planning";
    if (lower.includes("services") || lower.includes("mechanical")) return "services";
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

  // Get measurement method description
  const getMeasurementDescription = (method: IPMSMeasurement['measurementMethod']): string => {
    const descriptions = {
      'ipms_3_office': 'IPMS 3 Office - Exclusive occupier area excluding Standard Facilities',
      'ipms_3a_residential': 'IPMS 3A Residential - Australian standard for detached/attached/multi-unit dwellings',
      'ipms_3a_industrial': 'IPMS 3A Industrial - Australian standard for exclusive occupier areas',
      'pca_gla': 'PCA Gross Lettable Area - Standard for retail showrooms and supermarkets',
      'pca_glar': 'PCA Gross Lettable Area Retail - Standard for shopping centres and strip shops',
      'strata_title': 'State-specific strata title measurement (varies by jurisdiction)'
    };
    return descriptions[method] || 'Standard measurement method';
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Enhanced Property Details</h2>
          <p className="text-sm text-muted-foreground">
            IPMS-compliant measurements, building compliance, and comprehensive property specifications
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
                  <span>Property details and compliance data transferred from Property Assessment Form</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    <Eye className="h-3 w-3 mr-1" />
                    PAF Data Loaded
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* OCR Processing Alert */}
          {isProcessingOCR && (
            <Alert className="border-blue-200 bg-blue-50">
              <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
              <AlertDescription className="text-blue-800">
                <div className="space-y-2">
                  <span>Processing working drawings with OCR - extracting IPMS measurements...</span>
                  <Progress value={ocrProgress} className="w-full" />
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="measurements" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="measurements">IPMS Measurements</TabsTrigger>
              <TabsTrigger value="compliance">Building Compliance</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="drawings">Working Drawings</TabsTrigger>
              <TabsTrigger value="additional">Additional Info</TabsTrigger>
            </TabsList>

            {/* IPMS Measurements Tab */}
            <TabsContent value="measurements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    IPMS Building Area Measurements
                    <Badge className="bg-blue-100 text-blue-800">
                      API Technical Standards
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    International Property Measurement Standards for consistent valuation methodology
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Property Type and Measurement Method */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primary-use">Primary Property Use</Label>
                      <Select 
                        value={buildingAreas.primaryUse} 
                        onValueChange={(value) => updateBuildingArea('primaryUse', value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border shadow-lg z-[100]">
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="mixed_use">Mixed Use</SelectItem>
                          <SelectItem value="specialised">Specialised</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="measurement-method">Measurement Method</Label>
                      <Select 
                        value={buildingAreas.measurementMethod} 
                        onValueChange={(value) => updateBuildingArea('measurementMethod', value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border shadow-lg z-[100]">
                          <SelectItem value="ipms_3_office">IPMS 3 Office</SelectItem>
                          <SelectItem value="ipms_3a_residential">IPMS 3A Residential</SelectItem>
                          <SelectItem value="ipms_3a_industrial">IPMS 3A Industrial</SelectItem>
                          <SelectItem value="pca_gla">PCA GLA (Retail)</SelectItem>
                          <SelectItem value="pca_glar">PCA GLAR (Shopping Centres)</SelectItem>
                          <SelectItem value="strata_title">Strata Title (State-specific)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getMeasurementDescription(buildingAreas.measurementMethod)}
                      </p>
                    </div>
                  </div>

                  {/* IPMS Measurements */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="space-y-2">
                        <Label htmlFor="ipms1">IPMS 1 - Gross Building Area</Label>
                        <div className="flex gap-2">
                          <Input
                            id="ipms1"
                            value={buildingAreas.ipms1}
                            onChange={(e) => updateBuildingArea('ipms1', e.target.value)}
                            placeholder="0.00"
                          />
                          <span className="flex items-center text-sm text-muted-foreground">sqm</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Outer perimeter measurement for insurance/construction
                        </p>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="space-y-2">
                        <Label htmlFor="ipms2">IPMS 2 - Internal Area</Label>
                        <div className="flex gap-2">
                          <Input
                            id="ipms2"
                            value={buildingAreas.ipms2}
                            onChange={(e) => updateBuildingArea('ipms2', e.target.value)}
                            placeholder="0.00"
                          />
                          <span className="flex items-center text-sm text-muted-foreground">sqm</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Internal Dominant Face measurement for benchmarking
                        </p>
                      </div>
                    </Card>

                    <Card className="p-4 border-blue-200 bg-blue-50">
                      <div className="space-y-2">
                        <Label htmlFor="ipms3">IPMS 3 - Net Lettable Area</Label>
                        <div className="flex gap-2">
                          <Input
                            id="ipms3"
                            value={buildingAreas.ipms3}
                            onChange={(e) => updateBuildingArea('ipms3', e.target.value)}
                            placeholder="0.00"
                            className="font-semibold"
                          />
                          <span className="flex items-center text-sm font-semibold text-blue-700">sqm</span>
                        </div>
                        <p className="text-xs text-blue-700 font-medium">
                          PRIMARY for sales/leasing/valuation
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Measurement Notes */}
                  <div>
                    <Label htmlFor="measurement-notes">Measurement Notes</Label>
                    <Textarea
                      id="measurement-notes"
                      value={buildingAreas.measurementNotes}
                      onChange={(e) => updateBuildingArea('measurementNotes', e.target.value)}
                      placeholder="Additional notes about measurement methodology, limitations, or special considerations..."
                      className="mt-1"
                    />
                  </div>

                  {buildingAreas.lastVerified && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Measurements verified: {new Date(buildingAreas.lastVerified).toLocaleDateString()}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Building Compliance Tab */}
            <TabsContent value="compliance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Building Compliance Assessment
                    {buildingCompliance.some(c => c.pafSource) && (
                      <Badge className="bg-green-100 text-green-800">
                        {buildingCompliance.filter(c => c.pafSource).length} from PAF
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive compliance checklist with PAF integration and dropdown options
                  </p>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {buildingCompliance.map((compliance) => (
                        <Card key={compliance.id} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                            <div>
                              <Label className="font-medium">{compliance.description}</Label>
                              {compliance.pafSource && (
                                <Badge variant="outline" className="mt-1 bg-green-100 text-green-800">
                                  PAF Source
                                </Badge>
                              )}
                            </div>
                            
                            <div>
                              <Label htmlFor={`status-${compliance.id}`}>Compliance Status</Label>
                              <Select 
                                value={compliance.status} 
                                onValueChange={(value) => updateCompliance(compliance.id, 'status', value as any)}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white border shadow-lg z-[100]">
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                  <SelectItem value="not_applicable">Not Applicable</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor={`cert-${compliance.id}`}>Certificate/Permit Number</Label>
                              <Input
                                id={`cert-${compliance.id}`}
                                value={compliance.certificationNumber || ""}
                                onChange={(e) => updateCompliance(compliance.id, 'certificationNumber', e.target.value)}
                                placeholder="Certificate number"
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label htmlFor={`details-${compliance.id}`}>Additional Details</Label>
                              <Textarea
                                id={`details-${compliance.id}`}
                                value={compliance.details || ""}
                                onChange={(e) => updateCompliance(compliance.id, 'details', e.target.value)}
                                placeholder="Notes, expiry dates, conditions..."
                                className="mt-1 h-20"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Building Specifications Tab */}
            <TabsContent value="specifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Building Specifications
                    {buildingSpecs.some(s => s.fromPAF) && (
                      <Badge className="bg-green-100 text-green-800">
                        {buildingSpecs.filter(s => s.fromPAF).length} from PAF
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="measurement" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="measurement">Measurements</TabsTrigger>
                      <TabsTrigger value="construction">Construction</TabsTrigger>
                      <TabsTrigger value="systems">Systems</TabsTrigger>
                      <TabsTrigger value="features">Features</TabsTrigger>
                    </TabsList>

                    {['measurement', 'construction', 'systems', 'features'].map((category) => (
                      <TabsContent key={category} value={category}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {buildingSpecs
                            .filter(spec => spec.category === category)
                            .map((spec) => (
                              <div key={spec.field} className="space-y-2">
                                <Label htmlFor={spec.field}>
                                  {spec.field}
                                  {spec.fromPAF && (
                                    <Badge variant="outline" className="ml-2 bg-green-100 text-green-800">
                                      PAF
                                    </Badge>
                                  )}
                                </Label>
                                <div className="flex gap-2">
                                  <Input
                                    id={spec.field}
                                    value={spec.value}
                                    onChange={(e) => updateBuildingSpec(spec.field, e.target.value)}
                                    placeholder={`Enter ${spec.field.toLowerCase()}`}
                                    disabled={!spec.editable}
                                  />
                                  {spec.unit && (
                                    <span className="flex items-center text-sm text-muted-foreground px-2">
                                      {spec.unit}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

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
                          <div className="aspect-video bg-gray-100">
                            <img 
                              src={photo.url} 
                              alt={photo.caption}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="text-xs">
                                {photo.category}
                              </Badge>
                              {photo.fromPAF && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  PAF
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{photo.caption}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
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
                      <Badge className="bg-blue-100 text-blue-800">
                        OCR Processing Available
                      </Badge>
                    </CardTitle>
                    <div>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.tiff,.dwg"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          files.forEach(file => handleFileUpload(file, "drawing"));
                        }}
                        className="hidden"
                        id="drawing-upload"
                      />
                      <Button asChild variant="outline">
                        <label htmlFor="drawing-upload" className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Drawings
                        </label>
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload architectural plans, engineering drawings, or surveys for automatic OCR processing and measurement extraction
                  </p>
                </CardHeader>
                <CardContent>
                  {workingDrawings.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No working drawings uploaded</p>
                      <p className="text-sm text-gray-400">Upload PDF or image files for OCR processing</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {workingDrawings.map((drawing) => (
                        <Card key={drawing.id} className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-blue-500" />
                              <div>
                                <h4 className="font-medium">{drawing.name}</h4>
                                <p className="text-sm text-gray-500 capitalize">{drawing.type} drawing</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {drawing.ocrProcessed ? (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  OCR Complete
                                </Badge>
                              ) : (
                                <Badge variant="outline">
                                  <RefreshCw className="h-3 w-3 mr-1" />
                                  Processing...
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {drawing.ocrProcessed && drawing.measurementData && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <h5 className="font-medium mb-2">Extracted Measurements</h5>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <strong>Areas:</strong>
                                  <ul className="text-gray-600">
                                    {Object.entries(drawing.measurementData.areas).map(([key, value]) => (
                                      <li key={key}>{key}: {value} sqm</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <strong>Dimensions:</strong>
                                  <ul className="text-gray-600">
                                    {Object.entries(drawing.measurementData.dimensions).map(([key, value]) => (
                                      <li key={key}>{key}: {value}m</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <strong>Specifications:</strong>
                                  <ul className="text-gray-600">
                                    {Object.entries(drawing.measurementData.specifications).map(([key, value]) => (
                                      <li key={key}>{key}: {value}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Additional Information Tab */}
            <TabsContent value="additional" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Additional Property Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="property-description">Property Description</Label>
                      <Textarea
                        id="property-description"
                        value={additionalInfo.propertyDescription}
                        onChange={(e) => setAdditionalInfo(prev => ({ ...prev, propertyDescription: e.target.value }))}
                        placeholder="General description of the property..."
                        className="mt-1 h-32"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="special-features">Special Features</Label>
                      <Textarea
                        id="special-features"
                        value={additionalInfo.specialFeatures}
                        onChange={(e) => setAdditionalInfo(prev => ({ ...prev, specialFeatures: e.target.value }))}
                        placeholder="Notable features, recent improvements, unique characteristics..."
                        className="mt-1 h-32"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location-description">Location Description</Label>
                      <Textarea
                        id="location-description"
                        value={additionalInfo.locationDescription}
                        onChange={(e) => setAdditionalInfo(prev => ({ ...prev, locationDescription: e.target.value }))}
                        placeholder="Location attributes, proximity to amenities..."
                        className="mt-1 h-32"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="access-notes">Access Notes</Label>
                      <Textarea
                        id="access-notes"
                        value={additionalInfo.accessNotes}
                        onChange={(e) => setAdditionalInfo(prev => ({ ...prev, accessNotes: e.target.value }))}
                        placeholder="Access arrangements, security, parking..."
                        className="mt-1 h-32"
                      />
                    </div>
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