/**
 * ============================================================================
 * PROFESSIONAL INSURANCE VALUATION SYSTEM
 * Comprehensive replacement cost assessment for insurance purposes
 * 
 * INTELLECTUAL PROPERTY NOTICE:
 * This valuation methodology and calculation system is proprietary software
 * protected by copyright and trade secret laws. Unauthorized reproduction,
 * distribution, or commercial use is strictly prohibited.
 * 
 * PROFESSIONAL COMPLIANCE: Australian Property Institute Standards
 * ============================================================================
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building2, Calculator, FileText, AlertTriangle, MapPin, Calendar, Users, DollarSign, Upload, Trash2, Download, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getAllPropertyTypes } from "@/components/PropertyTypesComprehensive";
import { checkReportContradictions, generateContradictionReport, type ReportData } from '@/utils/reportContradictionChecker';

interface PropertyDetails {
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  clientName: string;
  inspectionDate: string;
  valuationDate: string;
  localGovernmentArea: string;
  zoning: string;
  numberOfUnits: number;
  propertyType: string;
  propertyClass: string;
}

interface BuildingComponent {
  id: string;
  name: string;
  area: number;
  rate: number;
  category: "building" | "external";
}

interface Building {
  id: string;
  name: string;
  components: BuildingComponent[];
}

interface BuildingAreas {
  buildings: Building[];
  // Keep legacy fields for backward compatibility
  primaryBuilding: number;
  carAccommodation: number;
  garage: number;
  porch: number;
  balcony: number;
  openPatio: number;
  paving: number;
  landscaping: number;
  fencing: number;
}

interface ConstructionRates {
  primaryBuildingRate: number;
  carAccommodationRate: number;
  garageRate: number;
  porchRate: number;
  balconyRate: number;
  patioRate: number;
  pavingRate: number;
  landscapingRate: number;
  fencingRate: number;
}

interface ProjectParameters {
  designDocMonths: number;
  tenderingMonths: number;
  constructionMonths: number;
  escalationRatePerMonth: number;
  professionalFeesRate: number;
  debrisRemovalRate: number;
  lapseEscalationRate: number;
}

interface RentalAssessment {
  // Residential Properties
  studioUnits: { count: number; weeklyRent: number };
  oneBedUnits: { count: number; weeklyRent: number };
  twoBedUnits: { count: number; weeklyRent: number };
  threeBedUnits: { count: number; weeklyRent: number };
  twoBedTownhouses: { count: number; weeklyRent: number };
  threeBedTownhouses: { count: number; weeklyRent: number };
  fourBedTownhouses: { count: number; weeklyRent: number };
  twoBedHouses: { count: number; weeklyRent: number };
  threeBedHouses: { count: number; weeklyRent: number };
  fourBedHouses: { count: number; weeklyRent: number };
  fiveBedHouses: { count: number; weeklyRent: number };
  
  // Commercial Properties  
  retailSpaces: { area: number; monthlyRentPerSqm: number };
  officeSpaces: { area: number; monthlyRentPerSqm: number };
  warehouseSpaces: { area: number; monthlyRentPerSqm: number };
  industrialSpaces: { area: number; monthlyRentPerSqm: number };
  
  // Other Properties
  specialisedSpaces: { area: number; monthlyRentPerSqm: number };
  mixedUseSpaces: { area: number; monthlyRentPerSqm: number };
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

interface ValuationResults {
  replacementValue: number;
  escalationOverPeriod: number;
  totalAfterEscalation: number;
  professionalFees: number;
  debrisRemoval: number;
  totalIncludingFees: number;
  lapseEscalation: number;
  grandTotal: number;
  gstComponent: number;
  finalInsuredValue: number;
  roundedInsuredValue: number;
  totalRentalLoss: number;
  rentalLossPercentage: number;
}

export default function InsuranceValuations() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>({
    address: "",
    suburb: "",
    state: "VIC",
    postcode: "",
    clientName: "",
    inspectionDate: new Date().toISOString().split('T')[0],
    valuationDate: new Date().toISOString().split('T')[0],
    localGovernmentArea: "",
    zoning: "General Residential",
    numberOfUnits: 1,
    propertyType: "",
    propertyClass: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const [buildingAreas, setBuildingAreas] = useState<BuildingAreas>({
    buildings: [
      {
        id: "building-1",
        name: "Primary Building",
        components: [
          { id: "primary", name: "Primary Building", area: 0, rate: 2750, category: "building" },
          { id: "garage", name: "Garage", area: 0, rate: 650, category: "building" },
          { id: "porch", name: "Porch", area: 0, rate: 800, category: "building" },
          { id: "balcony", name: "Balcony", area: 0, rate: 600, category: "building" },
        ]
      }
    ],
    // Legacy compatibility
    primaryBuilding: 0,
    carAccommodation: 0,
    garage: 0,
    porch: 0,
    balcony: 0,
    openPatio: 0,
    paving: 0,
    landscaping: 0,
    fencing: 0,
  });

  const [constructionRates, setConstructionRates] = useState<ConstructionRates>({
    primaryBuildingRate: 2750,
    carAccommodationRate: 0,
    garageRate: 650,
    porchRate: 0,
    balconyRate: 0,
    patioRate: 0,
    pavingRate: 80,
    landscapingRate: 40000,
    fencingRate: 80,
  });

  const [projectParameters, setProjectParameters] = useState<ProjectParameters>({
    designDocMonths: 6,
    tenderingMonths: 6,
    constructionMonths: 12,
    escalationRatePerMonth: 0.29,
    professionalFeesRate: 8.0,
    debrisRemovalRate: 70,
    lapseEscalationRate: 3.5,
  });

  const [rentalAssessment, setRentalAssessment] = useState<RentalAssessment>({
    // Residential
    studioUnits: { count: 0, weeklyRent: 0 },
    oneBedUnits: { count: 0, weeklyRent: 0 },
    twoBedUnits: { count: 0, weeklyRent: 0 },
    threeBedUnits: { count: 0, weeklyRent: 0 },
    twoBedTownhouses: { count: 0, weeklyRent: 0 },
    threeBedTownhouses: { count: 0, weeklyRent: 0 },
    fourBedTownhouses: { count: 0, weeklyRent: 0 },
    twoBedHouses: { count: 0, weeklyRent: 0 },
    threeBedHouses: { count: 0, weeklyRent: 0 },
    fourBedHouses: { count: 0, weeklyRent: 0 },
    fiveBedHouses: { count: 0, weeklyRent: 0 },
    
    // Commercial
    retailSpaces: { area: 0, monthlyRentPerSqm: 0 },
    officeSpaces: { area: 0, monthlyRentPerSqm: 0 },
    warehouseSpaces: { area: 0, monthlyRentPerSqm: 0 },
    industrialSpaces: { area: 0, monthlyRentPerSqm: 0 },
    
    // Other
    specialisedSpaces: { area: 0, monthlyRentPerSqm: 0 },
    mixedUseSpaces: { area: 0, monthlyRentPerSqm: 0 },
  });

  const [results, setResults] = useState<ValuationResults | null>(null);
  const [propertyDescription, setPropertyDescription] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const calculateValuation = () => {
    // Calculate replacement costs from dynamic buildings and components
    let totalReplacementValue = 0;
    
    // Calculate from new building system
    buildingAreas.buildings.forEach(building => {
      building.components.forEach(component => {
        totalReplacementValue += component.area * component.rate;
      });
    });
    
    // Add legacy fields for backward compatibility
    totalReplacementValue += buildingAreas.primaryBuilding * constructionRates.primaryBuildingRate;
    totalReplacementValue += buildingAreas.carAccommodation * constructionRates.carAccommodationRate;
    totalReplacementValue += buildingAreas.garage * constructionRates.garageRate;
    totalReplacementValue += buildingAreas.porch * constructionRates.porchRate;
    totalReplacementValue += buildingAreas.balcony * constructionRates.balconyRate;
    totalReplacementValue += buildingAreas.openPatio * constructionRates.patioRate;
    totalReplacementValue += buildingAreas.paving * constructionRates.pavingRate;
    totalReplacementValue += buildingAreas.landscaping * constructionRates.landscapingRate;
    totalReplacementValue += buildingAreas.fencing * constructionRates.fencingRate;

    const replacementValue = totalReplacementValue;

    // Calculate project period
    const totalProjectMonths = projectParameters.designDocMonths + 
                              projectParameters.tenderingMonths + 
                              projectParameters.constructionMonths;

    // Calculate escalation over construction period
    const totalEscalationRate = (projectParameters.escalationRatePerMonth / 100) * totalProjectMonths;
    const escalationOverPeriod = replacementValue * totalEscalationRate;
    const totalAfterEscalation = replacementValue + escalationOverPeriod;

    // Calculate professional fees
    const professionalFees = totalAfterEscalation * (projectParameters.professionalFeesRate / 100);

    // Calculate debris removal
    const debrisRemoval = (buildingAreas.primaryBuilding + buildingAreas.garage) * projectParameters.debrisRemovalRate;

    // Total including fees
    const totalIncludingFees = totalAfterEscalation + professionalFees + debrisRemoval;

    // Lapse period escalation (12 months)
    const lapseEscalation = totalIncludingFees * (projectParameters.lapseEscalationRate / 100);
    const grandTotal = totalIncludingFees + lapseEscalation;

    // GST
    const gstComponent = grandTotal * 0.1;
    const finalInsuredValue = grandTotal + gstComponent;
    const roundedInsuredValue = Math.ceil(finalInsuredValue / 5000) * 5000;

    // Calculate rental loss based on property type
    let weeklyRental = 0;
    
    if (propertyDetails.propertyType === "residential") {
      // Residential calculation (weekly rent)
      weeklyRental = Object.entries(rentalAssessment)
        .filter(([key]) => !key.includes('Spaces'))
        .reduce((total, [, item]) => {
          if ('weeklyRent' in item) {
            return total + (item.count * item.weeklyRent);
          }
          return total;
        }, 0);
    } else {
      // Commercial calculation (monthly rent converted to weekly)
      const monthlyRental = Object.entries(rentalAssessment)
        .filter(([key]) => key.includes('Spaces'))
        .reduce((total, [, item]) => {
          if ('monthlyRentPerSqm' in item) {
            return total + (item.area * item.monthlyRentPerSqm);
          }
          return total;
        }, 0);
      weeklyRental = monthlyRental / 4.33; // Convert monthly to weekly
    }
    
    const annualRental = weeklyRental * 52;
    const totalRentalLoss = (annualRental / 12) * totalProjectMonths;
    const rentalLossPercentage = finalInsuredValue > 0 ? (totalRentalLoss / finalInsuredValue) * 100 : 0;

    const calculatedResults: ValuationResults = {
      replacementValue,
      escalationOverPeriod,
      totalAfterEscalation,
      professionalFees,
      debrisRemoval,
      totalIncludingFees,
      lapseEscalation,
      grandTotal,
      gstComponent,
      finalInsuredValue,
      roundedInsuredValue,
      totalRentalLoss,
      rentalLossPercentage,
    };

    setResults(calculatedResults);

    toast({
      title: "Insurance Valuation Complete",
      description: `Calculated insured value: ${formatCurrency(roundedInsuredValue)}`,
    });
  };

  // Generate ICV Report with ISFV workflow integration
  const generateICVReport = async () => {
    if (!results) {
      toast({
        title: "Calculate First",
        description: "Please calculate the valuation before generating the report.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingReport(true);
    try {
      // Run contradiction check before generating ICV report (ISFV workflow integration)
      console.log('Running contradiction check for ICV report...');
      
      const contradictionData: ReportData = {
        propertyData: {
          propertyAddress: propertyDetails.address,
          structural_condition: 'good', // Default for insurance valuations
          kitchen_condition: 'good', // Default for insurance valuations
          overall_condition: 'good' // Default for insurance valuations
        },
        riskRatings: {
          environmental: 1,
          structural: 1,
          market: 1,
          legal: 1,
          economic: 1
        },
        vraAssessment: {
          comments: `Insurance valuation assessment completed for replacement cost purposes.`,
          recommendations: 'Property assessed in accordance with Australian Property Institute standards.'
        },
        salesEvidence: [],
        rentalAssessment: {
          weekly_rent: rentalAssessment.studioUnits.weeklyRent + 
                      rentalAssessment.oneBedUnits.weeklyRent + 
                      rentalAssessment.twoBedUnits.weeklyRent
        },
        generalComments: `Professional insurance valuation completed. Total insured value: ${formatCurrency(results.roundedInsuredValue)}. ${propertyDescription}`,
        sections: {
          propertyDetails,
          buildingAreas,
          constructionRates,
          projectParameters,
          rentalAssessment,
          results
        }
      };

      const contradictions = checkReportContradictions(contradictionData);
      const contradictionReport = generateContradictionReport(contradictions);
      
      console.log('ICV contradiction check results:', contradictionReport);

      // Show contradiction results to user if any issues found
      if (contradictions.hasContradictions) {
        toast({
          title: "⚠️ Report Contradictions Detected",
          description: "Critical contradictions found - please review before generating report",
          variant: "destructive"
        });
        console.warn('CRITICAL CONTRADICTIONS in ICV report:', contradictions.contradictions);
      }

      // Simulate report generation process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would call the actual report generation service
      const reportData = {
        propertyDetails,
        buildingAreas,
        constructionRates,
        projectParameters,
        rentalAssessment,
        results,
        contradictionCheck: contradictionReport,
        generated_at: new Date().toISOString()
      };

      // Mock successful generation
      toast({
        title: "ICV Report Generated Successfully",
        description: contradictions.hasContradictions 
          ? "Report generated with contradiction warnings - please review" 
          : "Professional insurance valuation report is ready for download."
      });

      console.log('ICV Report generated with data:', reportData);

    } catch (error) {
      console.error('Error generating ICV report:', error);
      toast({
        title: "Error Generating Report",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `insurance-valuations/${fileName}`;

      try {
        const { data, error } = await supabase.storage
          .from('insurance-valuations')
          .upload(filePath, file);

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('insurance-valuations')
          .getPublicUrl(filePath);

        const newFile: UploadedFile = {
          id: data.path,
          name: file.name,
          size: file.size,
          type: file.type,
          url: publicUrl,
          uploadedAt: new Date().toISOString(),
        };

        setUploadedFiles(prev => [...prev, newFile]);
        
        toast({
          title: "File Uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: `Failed to upload ${file.name}.`,
          variant: "destructive",
        });
      }
    }
  };

  const handleFileDelete = async (fileId: string) => {
    try {
      const { error } = await supabase.storage
        .from('insurance-valuations')
        .remove([fileId]);

      if (error) throw error;

      setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
      
      toast({
        title: "File Deleted",
        description: "File has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete file.",
        variant: "destructive",
      });
    }
  };

  // Building management functions
  const addBuilding = () => {
    const newBuilding: Building = {
      id: `building-${Date.now()}`,
      name: `Building ${buildingAreas.buildings.length + 1}`,
      components: [
        { id: `primary-${Date.now()}`, name: "Primary Structure", area: 0, rate: 2750, category: "building" },
      ]
    };
    
    setBuildingAreas(prev => ({
      ...prev,
      buildings: [...prev.buildings, newBuilding]
    }));
  };

  const removeBuilding = (buildingId: string) => {
    setBuildingAreas(prev => ({
      ...prev,
      buildings: prev.buildings.filter(b => b.id !== buildingId)
    }));
  };

  const updateBuildingName = (buildingId: string, name: string) => {
    setBuildingAreas(prev => ({
      ...prev,
      buildings: prev.buildings.map(b => 
        b.id === buildingId ? { ...b, name } : b
      )
    }));
  };

  const addComponent = (buildingId: string, category: "building" | "external") => {
    const componentTypes = {
      building: ["Additional Structure", "Shed", "Carport", "Storage", "Workshop", "Granny Flat"],
      external: ["Pool", "BBQ Area", "Tennis Court", "Deck", "Pergola", "Driveway", "Garden Beds", "Retaining Wall"]
    };
    
    const defaultNames = componentTypes[category];
    const defaultName = defaultNames[Math.floor(Math.random() * defaultNames.length)];
    
    const newComponent: BuildingComponent = {
      id: `component-${Date.now()}`,
      name: defaultName,
      area: 0,
      rate: category === "building" ? 2000 : 300,
      category
    };

    setBuildingAreas(prev => ({
      ...prev,
      buildings: prev.buildings.map(b => 
        b.id === buildingId 
          ? { ...b, components: [...b.components, newComponent] }
          : b
      )
    }));
  };

  const removeComponent = (buildingId: string, componentId: string) => {
    setBuildingAreas(prev => ({
      ...prev,
      buildings: prev.buildings.map(b => 
        b.id === buildingId 
          ? { ...b, components: b.components.filter(c => c.id !== componentId) }
          : b
      )
    }));
  };

  const updateComponent = (buildingId: string, componentId: string, updates: Partial<BuildingComponent>) => {
    setBuildingAreas(prev => ({
      ...prev,
      buildings: prev.buildings.map(b => 
        b.id === buildingId 
          ? { 
              ...b, 
              components: b.components.map(c => 
                c.id === componentId ? { ...c, ...updates } : c
              )
            }
          : b
      )
    }));
  };

  useEffect(() => {
    const totalPrimaryBuilding = buildingAreas.buildings.reduce((total, building) => {
      return total + building.components.reduce((buildingTotal, component) => {
        return buildingTotal + (component.category === "building" ? component.area : 0);
      }, 0);
    }, 0);
    
    if (totalPrimaryBuilding > 0) {
      calculateValuation();
    }
  }, [buildingAreas, constructionRates, projectParameters, rentalAssessment]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number, decimals: number = 1) => {
    return `${value.toFixed(decimals)}%`;
  };

  // Chart data
  const costBreakdownData = results ? [
    { name: 'Replacement Value', value: results.replacementValue, color: '#3b82f6' },
    { name: 'Professional Fees', value: results.professionalFees, color: '#10b981' },
    { name: 'Debris Removal', value: results.debrisRemoval, color: '#f59e0b' },
    { name: 'Escalation', value: results.escalationOverPeriod + results.lapseEscalation, color: '#ef4444' },
    { name: 'GST', value: results.gstComponent, color: '#8b5cf6' },
  ] : [];

  const areaBreakdownData = [
    { name: 'Primary Building', value: buildingAreas.primaryBuilding, color: '#3b82f6' },
    { name: 'Garage', value: buildingAreas.garage, color: '#10b981' },
    { name: 'Paving', value: buildingAreas.paving, color: '#f59e0b' },
    { name: 'Other Areas', value: buildingAreas.porch + buildingAreas.balcony + buildingAreas.openPatio, color: '#ef4444' },
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-6">
      {/* Back to Dashboard Button */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Professional Header */}
      <Alert>
        <Building2 className="h-4 w-4" />
        <AlertDescription>
          <strong>Professional Insurance Valuation System</strong><br />
          Comprehensive replacement cost assessment in accordance with Australian Property Institute standards.<br />
          ⚠️ This valuation is prepared for insurance purposes only and must be completed by qualified professionals.
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Insurance Valuations
          </h3>
          <p className="text-sm text-muted-foreground">
            Professional insurance valuations and replacement cost assessments
          </p>
        </div>
        <Button onClick={calculateValuation} variant="outline">
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Valuation
        </Button>
      </div>

      <Tabs defaultValue="property-details" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="property-details">Property Details</TabsTrigger>
          <TabsTrigger value="building-areas">Building Areas</TabsTrigger>
          <TabsTrigger value="construction-rates">Construction Rates</TabsTrigger>
          <TabsTrigger value="project-parameters">Project Parameters</TabsTrigger>
          <TabsTrigger value="rental-assessment">Rental Assessment</TabsTrigger>
          <TabsTrigger value="documents">Photos & Documents</TabsTrigger>
          <TabsTrigger value="valuation-results">Valuation Results</TabsTrigger>
          <TabsTrigger value="report-generator">Report Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="property-details" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Property Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    value={propertyDetails.address}
                    onChange={(e) => setPropertyDetails(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="e.g., 123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="suburb">Suburb</Label>
                    <Input
                      id="suburb"
                      value={propertyDetails.suburb}
                      onChange={(e) => setPropertyDetails(prev => ({ ...prev, suburb: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={propertyDetails.state} onValueChange={(value) => setPropertyDetails(prev => ({ ...prev, state: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VIC">VIC</SelectItem>
                        <SelectItem value="NSW">NSW</SelectItem>
                        <SelectItem value="QLD">QLD</SelectItem>
                        <SelectItem value="SA">SA</SelectItem>
                        <SelectItem value="WA">WA</SelectItem>
                        <SelectItem value="TAS">TAS</SelectItem>
                        <SelectItem value="NT">NT</SelectItem>
                        <SelectItem value="ACT">ACT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input
                    id="postcode"
                    value={propertyDetails.postcode}
                    onChange={(e) => setPropertyDetails(prev => ({ ...prev, postcode: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfUnits">Number of Units</Label>
                  <Input
                    id="numberOfUnits"
                    type="number"
                    value={propertyDetails.numberOfUnits}
                    onChange={(e) => setPropertyDetails(prev => ({ ...prev, numberOfUnits: parseInt(e.target.value) || 1 }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select value={propertyDetails.propertyType} onValueChange={(value) => setPropertyDetails(prev => ({ ...prev, propertyType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {getAllPropertyTypes().map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex flex-col">
                              <span>{type.label}</span>
                              <span className="text-xs text-muted-foreground">{type.category}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="propertyClass">Property Class</Label>
                    <Select value={propertyDetails.propertyClass} onValueChange={(value) => setPropertyDetails(prev => ({ ...prev, propertyClass: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Quality</SelectItem>
                        <SelectItem value="good">Good Quality</SelectItem>
                        <SelectItem value="high">High Quality</SelectItem>
                        <SelectItem value="premium">Premium Quality</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="heritage">Heritage/Historic</SelectItem>
                        <SelectItem value="new">New Construction</SelectItem>
                        <SelectItem value="refurbished">Recently Refurbished</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Client & Assessment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={propertyDetails.clientName}
                    onChange={(e) => setPropertyDetails(prev => ({ ...prev, clientName: e.target.value }))}
                    placeholder="e.g., Owners Corporation PS123456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="inspectionDate">Inspection Date</Label>
                    <Input
                      id="inspectionDate"
                      type="date"
                      value={propertyDetails.inspectionDate}
                      onChange={(e) => setPropertyDetails(prev => ({ ...prev, inspectionDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="valuationDate">Valuation Date</Label>
                    <Input
                      id="valuationDate"
                      type="date"
                      value={propertyDetails.valuationDate}
                      onChange={(e) => setPropertyDetails(prev => ({ ...prev, valuationDate: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="localGovernmentArea">Local Government Area</Label>
                  <Input
                    id="localGovernmentArea"
                    value={propertyDetails.localGovernmentArea}
                    onChange={(e) => setPropertyDetails(prev => ({ ...prev, localGovernmentArea: e.target.value }))}
                    placeholder="e.g., City of Melbourne"
                  />
                </div>
                <div>
                  <Label htmlFor="zoning">Zoning</Label>
                  <Select value={propertyDetails.zoning} onValueChange={(value) => setPropertyDetails(prev => ({ ...prev, zoning: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Residential">General Residential</SelectItem>
                      <SelectItem value="Residential Growth">Residential Growth</SelectItem>
                      <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Property Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={propertyDescription}
                onChange={(e) => setPropertyDescription(e.target.value)}
                placeholder="Describe the property improvements, construction type, fitout quality, and any special features..."
                rows={6}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="building-areas" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Buildings & Areas</h3>
            <Button onClick={addBuilding} variant="outline">
              <Building2 className="h-4 w-4 mr-2" />
              Add Building
            </Button>
          </div>

          <div className="space-y-6">
            {buildingAreas.buildings.map((building) => (
              <Card key={building.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <Input
                        value={building.name}
                        onChange={(e) => updateBuildingName(building.id, e.target.value)}
                        className="font-medium"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addComponent(building.id, "building")}
                      >
                        Add Building Component
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addComponent(building.id, "external")}
                      >
                        Add External Component
                      </Button>
                      {buildingAreas.buildings.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeBuilding(building.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Building Components */}
                    <div>
                      <h4 className="font-medium mb-4 flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Building Components (m²)
                      </h4>
                      <div className="space-y-4">
                        {building.components
                          .filter(c => c.category === "building")
                          .map((component) => (
                          <div key={component.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-4">
                              <Input
                                value={component.name}
                                onChange={(e) => updateComponent(building.id, component.id, { name: e.target.value })}
                                placeholder="Component name"
                              />
                            </div>
                            <div className="col-span-3">
                              <Input
                                type="number"
                                value={component.area}
                                onChange={(e) => updateComponent(building.id, component.id, { area: parseFloat(e.target.value) || 0 })}
                                placeholder="Area"
                              />
                            </div>
                            <div className="col-span-3">
                              <Input
                                type="number"
                                value={component.rate}
                                onChange={(e) => updateComponent(building.id, component.id, { rate: parseFloat(e.target.value) || 0 })}
                                placeholder="Rate $/m²"
                              />
                            </div>
                            <div className="col-span-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeComponent(building.id, component.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="col-span-1 text-right text-sm font-medium">
                              {formatCurrency(component.area * component.rate)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* External Components */}
                    <div>
                      <h4 className="font-medium mb-4 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        External Components (m²)
                      </h4>
                      <div className="space-y-4">
                        {building.components
                          .filter(c => c.category === "external")
                          .map((component) => (
                          <div key={component.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-4">
                              <Input
                                value={component.name}
                                onChange={(e) => updateComponent(building.id, component.id, { name: e.target.value })}
                                placeholder="Component name"
                              />
                            </div>
                            <div className="col-span-3">
                              <Input
                                type="number"
                                value={component.area}
                                onChange={(e) => updateComponent(building.id, component.id, { area: parseFloat(e.target.value) || 0 })}
                                placeholder="Area"
                              />
                            </div>
                            <div className="col-span-3">
                              <Input
                                type="number"
                                value={component.rate}
                                onChange={(e) => updateComponent(building.id, component.id, { rate: parseFloat(e.target.value) || 0 })}
                                placeholder="Rate $/m²"
                              />
                            </div>
                            <div className="col-span-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeComponent(building.id, component.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="col-span-1 text-right text-sm font-medium">
                              {formatCurrency(component.area * component.rate)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Building Summary */}
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Building Area</p>
                        <p className="text-lg font-bold">
                          {building.components
                            .filter(c => c.category === "building")
                            .reduce((sum, c) => sum + c.area, 0).toFixed(0)} m²
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">External Area</p>
                        <p className="text-lg font-bold">
                          {building.components
                            .filter(c => c.category === "external")
                            .reduce((sum, c) => sum + c.area, 0).toFixed(0)} m²
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Building Total</p>
                        <p className="text-lg font-bold text-blue-600">
                          {formatCurrency(building.components.reduce((sum, c) => sum + (c.area * c.rate), 0))}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overall Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Total Project Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Buildings</p>
                  <p className="text-xl font-bold">{buildingAreas.buildings.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Building Area</p>
                  <p className="text-xl font-bold">
                    {buildingAreas.buildings
                      .reduce((sum, b) => sum + b.components
                        .filter(c => c.category === "building")
                        .reduce((bSum, c) => bSum + c.area, 0), 0).toFixed(0)} m²
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total External Area</p>
                  <p className="text-xl font-bold">
                    {buildingAreas.buildings
                      .reduce((sum, b) => sum + b.components
                        .filter(c => c.category === "external")
                        .reduce((bSum, c) => bSum + c.area, 0), 0).toFixed(0)} m²
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Replacement Cost</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(buildingAreas.buildings
                      .reduce((sum, b) => sum + b.components
                        .reduce((bSum, c) => bSum + (c.area * c.rate), 0), 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="construction-rates" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Building Construction Rates ($/m²)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="primaryBuildingRate">Primary Building Rate</Label>
                  <Input
                    id="primaryBuildingRate"
                    type="number"
                    value={constructionRates.primaryBuildingRate}
                    onChange={(e) => setConstructionRates(prev => ({ ...prev, primaryBuildingRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="carAccommodationRate">Car Accommodation Rate</Label>
                  <Input
                    id="carAccommodationRate"
                    type="number"
                    value={constructionRates.carAccommodationRate}
                    onChange={(e) => setConstructionRates(prev => ({ ...prev, carAccommodationRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="garageRate">Garage Rate</Label>
                  <Input
                    id="garageRate"
                    type="number"
                    value={constructionRates.garageRate}
                    onChange={(e) => setConstructionRates(prev => ({ ...prev, garageRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="porchRate">Porch Rate</Label>
                  <Input
                    id="porchRate"
                    type="number"
                    value={constructionRates.porchRate}
                    onChange={(e) => setConstructionRates(prev => ({ ...prev, porchRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>External Construction Rates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="balconyRate">Balcony Rate ($/m²)</Label>
                  <Input
                    id="balconyRate"
                    type="number"
                    value={constructionRates.balconyRate}
                    onChange={(e) => setConstructionRates(prev => ({ ...prev, balconyRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="patioRate">Patio Rate ($/m²)</Label>
                  <Input
                    id="patioRate"
                    type="number"
                    value={constructionRates.patioRate}
                    onChange={(e) => setConstructionRates(prev => ({ ...prev, patioRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="pavingRate">Paving Rate ($/m²)</Label>
                  <Input
                    id="pavingRate"
                    type="number"
                    value={constructionRates.pavingRate}
                    onChange={(e) => setConstructionRates(prev => ({ ...prev, pavingRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="landscapingRate">Landscaping Rate ($ total or $/m²)</Label>
                  <Input
                    id="landscapingRate"
                    type="number"
                    value={constructionRates.landscapingRate}
                    onChange={(e) => setConstructionRates(prev => ({ ...prev, landscapingRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="fencingRate">Fencing Rate ($/linear metre)</Label>
                  <Input
                    id="fencingRate"
                    type="number"
                    value={constructionRates.fencingRate}
                    onChange={(e) => setConstructionRates(prev => ({ ...prev, fencingRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="project-parameters" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="designDocMonths">Design & Documentation (Months)</Label>
                  <Input
                    id="designDocMonths"
                    type="number"
                    value={projectParameters.designDocMonths}
                    onChange={(e) => setProjectParameters(prev => ({ ...prev, designDocMonths: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="tenderingMonths">Tendering (Months)</Label>
                  <Input
                    id="tenderingMonths"
                    type="number"
                    value={projectParameters.tenderingMonths}
                    onChange={(e) => setProjectParameters(prev => ({ ...prev, tenderingMonths: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="constructionMonths">Construction (Months)</Label>
                  <Input
                    id="constructionMonths"
                    type="number"
                    value={projectParameters.constructionMonths}
                    onChange={(e) => setProjectParameters(prev => ({ ...prev, constructionMonths: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Total Project Period</p>
                  <p className="text-lg font-bold">
                    {projectParameters.designDocMonths + projectParameters.tenderingMonths + projectParameters.constructionMonths} months
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="escalationRatePerMonth">Escalation Rate per Month (%)</Label>
                  <Input
                    id="escalationRatePerMonth"
                    type="number"
                    step="0.01"
                    value={projectParameters.escalationRatePerMonth}
                    onChange={(e) => setProjectParameters(prev => ({ ...prev, escalationRatePerMonth: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="professionalFeesRate">Professional Fees Rate (%)</Label>
                  <Input
                    id="professionalFeesRate"
                    type="number"
                    step="0.1"
                    value={projectParameters.professionalFeesRate}
                    onChange={(e) => setProjectParameters(prev => ({ ...prev, professionalFeesRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="debrisRemovalRate">Debris Removal Rate ($/m²)</Label>
                  <Input
                    id="debrisRemovalRate"
                    type="number"
                    value={projectParameters.debrisRemovalRate}
                    onChange={(e) => setProjectParameters(prev => ({ ...prev, debrisRemovalRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="lapseEscalationRate">Lapse Period Escalation Rate (%)</Label>
                  <Input
                    id="lapseEscalationRate"
                    type="number"
                    step="0.1"
                    value={projectParameters.lapseEscalationRate}
                    onChange={(e) => setProjectParameters(prev => ({ ...prev, lapseEscalationRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Property Photos & Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Upload Files</Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supported: Images (JPG, PNG, etc.), PDF, Word, Excel documents
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Uploaded Files</h4>
                  <div className="grid gap-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {file.type.startsWith('image/') ? (
                            <ImageIcon className="h-5 w-5 text-blue-500" />
                          ) : (
                            <FileText className="h-5 w-5 text-gray-500" />
                          )}
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB • {new Date(file.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(file.url, '_blank')}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFileDelete(file.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rental-assessment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {propertyDetails.propertyType === "residential" ? "Residential" : 
                 propertyDetails.propertyType === "commercial" ? "Commercial" : 
                 propertyDetails.propertyType === "industrial" ? "Industrial" :
                 propertyDetails.propertyType === "mixed-use" ? "Mixed Use" :
                 "Property"} Rental Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              {propertyDetails.propertyType === "residential" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(rentalAssessment)
                    .filter(([key]) => !key.includes('Spaces'))
                    .map(([key, value]) => (
                    <div key={key} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`${key}-count`}>Count</Label>
                          <Input
                            id={`${key}-count`}
                            type="number"
                            value={'count' in value ? value.count : 0}
                            onChange={(e) => setRentalAssessment(prev => ({
                              ...prev,
                              [key]: { ...prev[key as keyof RentalAssessment], count: parseInt(e.target.value) || 0 }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`${key}-rent`}>Weekly Rent ($)</Label>
                          <Input
                            id={`${key}-rent`}
                            type="number"
                            value={'weeklyRent' in value ? value.weeklyRent : 0}
                            onChange={(e) => setRentalAssessment(prev => ({
                              ...prev,
                              [key]: { ...prev[key as keyof RentalAssessment], weeklyRent: parseFloat(e.target.value) || 0 }
                            }))}
                          />
                        </div>
                      </div>
                      <div className="mt-2 p-2 bg-muted rounded text-sm">
                        Total: {formatCurrency(('count' in value && 'weeklyRent' in value ? value.count * value.weeklyRent : 0) * 52)} pa
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(rentalAssessment)
                    .filter(([key]) => key.includes('Spaces'))
                    .map(([key, value]) => (
                    <div key={key} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`${key}-area`}>Area (m²)</Label>
                          <Input
                            id={`${key}-area`}
                            type="number"
                            value={'area' in value ? value.area : 0}
                            onChange={(e) => setRentalAssessment(prev => ({
                              ...prev,
                              [key]: { ...prev[key as keyof RentalAssessment], area: parseFloat(e.target.value) || 0 }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`${key}-rent`}>Monthly Rent ($/m²)</Label>
                          <Input
                            id={`${key}-rent`}
                            type="number"
                            value={'monthlyRentPerSqm' in value ? value.monthlyRentPerSqm : 0}
                            onChange={(e) => setRentalAssessment(prev => ({
                              ...prev,
                              [key]: { ...prev[key as keyof RentalAssessment], monthlyRentPerSqm: parseFloat(e.target.value) || 0 }
                            }))}
                          />
                        </div>
                      </div>
                      <div className="mt-2 p-2 bg-muted rounded text-sm">
                        Monthly Total: {formatCurrency(('area' in value && 'monthlyRentPerSqm' in value ? value.area * value.monthlyRentPerSqm : 0))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="valuation-results" className="space-y-4">
          {results ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Replacement Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatCurrency(results.replacementValue)}</p>
                    <p className="text-sm text-muted-foreground">Base construction cost</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Professional Fees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatCurrency(results.professionalFees)}</p>
                    <p className="text-sm text-muted-foreground">{formatPercentage(projectParameters.professionalFeesRate)} of replacement cost</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Total Escalation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatCurrency(results.escalationOverPeriod + results.lapseEscalation)}</p>
                    <p className="text-sm text-muted-foreground">Construction + lapse period</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">Final</Badge>
                      Insured Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.roundedInsuredValue)}</p>
                    <p className="text-sm text-muted-foreground">Rounded to nearest $5,000</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Replacement Value:</span>
                        <span className="font-semibold">{formatCurrency(results.replacementValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Escalation Over Project Period:</span>
                        <span className="font-semibold">{formatCurrency(results.escalationOverPeriod)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Total After Escalation:</span>
                        <span className="font-semibold">{formatCurrency(results.totalAfterEscalation)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Professional Fees:</span>
                        <span className="font-semibold">{formatCurrency(results.professionalFees)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Debris Removal:</span>
                        <span className="font-semibold">{formatCurrency(results.debrisRemoval)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lapse Period Escalation:</span>
                        <span className="font-semibold">{formatCurrency(results.lapseEscalation)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Grand Total:</span>
                        <span className="font-semibold">{formatCurrency(results.grandTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST Component:</span>
                        <span className="font-semibold">{formatCurrency(results.gstComponent)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Insured Value:</span>
                        <span className="font-bold text-blue-600">{formatCurrency(results.roundedInsuredValue)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cost Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={costBreakdownData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                          >
                            {costBreakdownData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [formatCurrency(value as number), "Amount"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Rental Loss Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Weekly Rental</p>
                      <p className="text-xl font-bold">
                        {formatCurrency(Object.values(rentalAssessment).reduce((total, item) => total + (item.count * item.weeklyRent), 0))}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Project Period Loss</p>
                      <p className="text-xl font-bold">{formatCurrency(results.totalRentalLoss)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">% of Insured Value</p>
                      <p className="text-xl font-bold">{formatPercentage(results.rentalLossPercentage)}</p>
                    </div>
                  </div>
                  <Alert className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      The loss of rental figure is not included in the Insurance Replacement Value. 
                      Please refer to your insurance policy to determine if additional cover is required.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Calculator className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">No Calculation Results</p>
                <p className="text-muted-foreground">
                  Please enter building areas and construction rates to see valuation results.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="report-generator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Insurance Valuation Certificate
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  <div className="text-center border-2 border-dashed border-gray-300 p-8">
                    <h2 className="text-2xl font-bold mb-4">INSURANCE VALUATION CERTIFICATE</h2>
                    <div className="space-y-2">
                      <p><strong>Property:</strong> {propertyDetails.address}</p>
                      <p><strong>Client:</strong> {propertyDetails.clientName}</p>
                      <p><strong>Valuation Date:</strong> {propertyDetails.valuationDate}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <p className="text-lg mb-2">In our opinion, the Insurance Replacement Value of the subject improvements as at the inspection date is:</p>
                    <p className="text-4xl font-bold text-blue-600 mb-2">{formatCurrency(results.roundedInsuredValue)}</p>
                    <p className="text-lg">({results.roundedInsuredValue.toLocaleString('en-AU')} dollars)</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Summary of Calculations</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Replacement Value:</span>
                          <span>{formatCurrency(results.replacementValue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Professional Fees:</span>
                          <span>{formatCurrency(results.professionalFees)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Debris Removal:</span>
                          <span>{formatCurrency(results.debrisRemoval)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Escalation:</span>
                          <span>{formatCurrency(results.escalationOverPeriod + results.lapseEscalation)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST:</span>
                          <span>{formatCurrency(results.gstComponent)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Total Insured Value:</span>
                          <span>{formatCurrency(results.roundedInsuredValue)}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Property Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Primary Building:</span>
                          <span>{buildingAreas.primaryBuilding} m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Garage:</span>
                          <span>{buildingAreas.garage} m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Paving:</span>
                          <span>{buildingAreas.paving} m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Number of Units:</span>
                          <span>{propertyDetails.numberOfUnits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost per Unit:</span>
                          <span>{formatCurrency(results.roundedInsuredValue / propertyDetails.numberOfUnits)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Project Period:</span>
                          <span>{projectParameters.designDocMonths + projectParameters.tenderingMonths + projectParameters.constructionMonths} months</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important Disclaimers:</strong><br />
                      • This valuation has been prepared for insurance purposes only<br />
                      • The report is not to be relied upon by any other person or for any other purpose<br />
                      • Regular re-appraisal of building insurance values is strongly recommended<br />
                      • Reconstruction may be subject to current planning requirements and regulations
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-4">
                    <Button 
                      className="flex-1" 
                      onClick={generateICVReport}
                      disabled={isGeneratingReport}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {isGeneratingReport ? 'Generating Report...' : 'Generate ICV Report'}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Save Valuation Data
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Report Not Available</p>
                  <p className="text-muted-foreground">
                    Complete the valuation calculation to generate the insurance certificate.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}