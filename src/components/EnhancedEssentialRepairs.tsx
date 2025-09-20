import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  Calculator, 
  CheckCircle, 
  XCircle, 
  TrendingDown, 
  Clock,
  Zap,
  Eye,
  Download,
  Camera
} from "lucide-react";
import { toast } from "sonner";
import { useReportData } from "@/contexts/ReportDataContext";
import { useProperty } from "@/contexts/PropertyContext";

interface RepairItem {
  id: number;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  estimatedCost: string;
  actualCost: string;
  quoteUploaded: boolean;
  quoteFile: File | null;
  contractorName: string;
  timeline: string;
  notes: string;
  ocrExtracted: boolean;
  category: string;
}

interface DepreciationData {
  propertyType: string;
  propertyAge: number;
  currentCondition: string;
  effectiveAge: number;
  totalEconomicLife: number;
  remainingLife: number;
  depreciationRate: number;
  depreciationAmount: number;
}

export default function EnhancedEssentialRepairs() {
  const { reportData, updateReportData } = useReportData();
  const { addressData } = useProperty();

  // Core States
  const [essentialRepairsRequired, setEssentialRepairsRequired] = useState<string>("");
  const [propertyCondition, setPropertyCondition] = useState("good");
  const [maintenanceLevel, setMaintenanceLevel] = useState("adequately-maintained");
  
  // Depreciation Calculator States
  const [depreciationData, setDepreciationData] = useState<DepreciationData>({
    propertyType: "residential",
    propertyAge: 10,
    currentCondition: "good",
    effectiveAge: 10,
    totalEconomicLife: 50,
    remainingLife: 40,
    depreciationRate: 2.5,
    depreciationAmount: 0
  });

  // OCR and Processing States
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  
  // Repair Items Management
  const [repairItems, setRepairItems] = useState<RepairItem[]>([
    {
      id: 1,
      description: "",
      priority: "medium",
      estimatedCost: "",
      actualCost: "",
      quoteUploaded: false,
      quoteFile: null,
      contractorName: "",
      timeline: "",
      notes: "",
      ocrExtracted: false,
      category: "maintenance"
    }
  ]);

  const [totalCost, setTotalCost] = useState(0);
  const [includeSection, setIncludeSection] = useState(true);

  // Standard valuation impact comment
  const standardValuationComment = "Adjustments for condition and maintenance have been considered in comparable sales analysis and in the overall value.";

  // PAF Pre-population Effect
  useEffect(() => {
    const pafData = reportData?.propertySearchData;
    if (pafData) {
      // Auto-populate from PAF
      if (pafData.propertyCondition) {
        setPropertyCondition(pafData.propertyCondition);
      }
      if (pafData.propertyType) {
        setDepreciationData(prev => ({ ...prev, propertyType: pafData.propertyType }));
      }
      if (pafData.yearBuilt) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - parseInt(pafData.yearBuilt);
        setDepreciationData(prev => ({ ...prev, propertyAge: age, effectiveAge: age }));
      }
    }
  }, [reportData?.propertyAssessmentForm]);

  // Auto-set conditions based on essential repairs selection
  useEffect(() => {
    if (essentialRepairsRequired === "no") {
      setPropertyCondition("good");
      setMaintenanceLevel("adequately-maintained");
      toast.success("Property condition preset to 'Good' and maintenance level set to 'Adequately Maintained'");
    }
  }, [essentialRepairsRequired]);

  // Calculate depreciation
  const calculateDepreciation = () => {
    const { propertyAge, totalEconomicLife, currentCondition } = depreciationData;
    
    // Condition adjustments
    const conditionFactors = {
      excellent: 0.8,
      good: 1.0,
      fair: 1.2,
      poor: 1.5
    };
    
    const conditionFactor = conditionFactors[currentCondition as keyof typeof conditionFactors] || 1.0;
    const effectiveAge = propertyAge * conditionFactor;
    const remainingLife = Math.max(0, totalEconomicLife - effectiveAge);
    const depreciationRate = (effectiveAge / totalEconomicLife) * 100;
    
    setDepreciationData(prev => ({
      ...prev,
      effectiveAge: Math.round(effectiveAge),
      remainingLife: Math.round(remainingLife),
      depreciationRate: Math.round(depreciationRate * 100) / 100
    }));
  };

  // OCR Processing Simulation
  const processOCRDocument = async (file: File, repairId: number) => {
    setIsProcessingOCR(true);
    setOcrProgress(0);
    
    try {
      // Simulate OCR processing stages
      const stages = [
        { message: "Scanning document...", progress: 20 },
        { message: "Extracting text...", progress: 50 },
        { message: "Analyzing repair details...", progress: 80 },
        { message: "Populating fields...", progress: 100 }
      ];

      for (const stage of stages) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setOcrProgress(stage.progress);
        toast.loading(stage.message);
      }

      // Mock extracted data
      const extractedData = {
        description: "Roof repairs - replace broken tiles and fix guttering issues",
        estimatedCost: "8500",
        contractorName: "ABC Roofing Solutions",
        timeline: "2-3 weeks",
        category: "structural"
      };

      // Update repair item with extracted data
      setRepairItems(prev => prev.map(item => 
        item.id === repairId 
          ? { 
              ...item, 
              ...extractedData,
              ocrExtracted: true,
              quoteUploaded: true,
              quoteFile: file 
            }
          : item
      ));

      toast.success("OCR extraction completed successfully!");
      
    } catch (error) {
      toast.error("OCR processing failed. Please try again.");
    } finally {
      setIsProcessingOCR(false);
      setOcrProgress(0);
    }
  };

  // Add new repair item
  const addRepairItem = () => {
    const newId = Math.max(...repairItems.map(item => item.id)) + 1;
    setRepairItems(prev => [...prev, {
      id: newId,
      description: "",
      priority: "medium",
      estimatedCost: "",
      actualCost: "",
      quoteUploaded: false,
      quoteFile: null,
      contractorName: "",
      timeline: "",
      notes: "",
      ocrExtracted: false,
      category: "maintenance"
    }]);
  };

  // Remove repair item
  const removeRepairItem = (id: number) => {
    if (repairItems.length > 1) {
      setRepairItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // Update repair item
  const updateRepairItem = (id: number, field: keyof RepairItem, value: any) => {
    setRepairItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Calculate total costs
  useEffect(() => {
    const total = repairItems.reduce((sum, item) => {
      const cost = parseFloat(item.estimatedCost || item.actualCost || "0");
      return sum + cost;
    }, 0);
    setTotalCost(total);
  }, [repairItems]);

  // File upload handler
  const handleFileUpload = (file: File, repairId: number) => {
    if (file.type === "application/pdf" || file.type.startsWith("image/")) {
      processOCRDocument(file, repairId);
    } else {
      toast.error("Please upload a PDF or image file for OCR processing.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Essential Repairs Assessment</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive property condition and repair analysis with automated calculations
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="include-section">Include Section</Label>
          <Switch
            id="include-section"
            checked={includeSection}
            onCheckedChange={setIncludeSection}
          />
        </div>
      </div>

      {includeSection && (
        <Tabs defaultValue="assessment" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="repairs">Repair Details</TabsTrigger>
            <TabsTrigger value="depreciation">Depreciation</TabsTrigger>
            <TabsTrigger value="impact">Valuation Impact</TabsTrigger>
          </TabsList>

          {/* Assessment Tab */}
          <TabsContent value="assessment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Essential Repairs Required?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={essentialRepairsRequired}
                  onValueChange={setEssentialRepairsRequired}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="repairs-yes" />
                    <Label htmlFor="repairs-yes" className="cursor-pointer">
                      Yes - Repairs Required
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="repairs-no" />
                    <Label htmlFor="repairs-no" className="cursor-pointer">
                      No - No Essential Repairs
                    </Label>
                  </div>
                </RadioGroup>

                {essentialRepairsRequired === "no" && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <div className="space-y-2">
                        <p className="font-medium">Property Condition Summary Auto-Set:</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Overall Condition: Good
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Maintenance: Adequately Maintained
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-green-700">
                          {standardValuationComment}
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {essentialRepairsRequired === "yes" && (
                  <Alert className="border-amber-200 bg-amber-50">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      Essential repairs identified. Please provide detailed repair information and cost estimates.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Repair Details Tab */}
          <TabsContent value="repairs" className="space-y-4">
            {essentialRepairsRequired === "yes" && (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Detailed Repair List</h3>
                  <Button onClick={addRepairItem} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Repair Item
                  </Button>
                </div>

                {repairItems.map((item, index) => (
                  <Card key={item.id} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          Repair Item #{index + 1}
                          {item.ocrExtracted && (
                            <Badge className="ml-2 bg-blue-100 text-blue-800">
                              <Zap className="h-3 w-3 mr-1" />
                              OCR Extracted
                            </Badge>
                          )}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRepairItem(item.id)}
                          disabled={repairItems.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Description and Category */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Repair Description</Label>
                          <Textarea
                            value={item.description}
                            onChange={(e) => updateRepairItem(item.id, "description", e.target.value)}
                            placeholder="Describe the repair work required..."
                            className="min-h-[80px]"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label>Category</Label>
                            <Select
                              value={item.category}
                              onValueChange={(value) => updateRepairItem(item.id, "category", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="structural">Structural</SelectItem>
                                <SelectItem value="electrical">Electrical</SelectItem>
                                <SelectItem value="plumbing">Plumbing</SelectItem>
                                <SelectItem value="roofing">Roofing</SelectItem>
                                <SelectItem value="maintenance">General Maintenance</SelectItem>
                                <SelectItem value="cosmetic">Cosmetic</SelectItem>
                                <SelectItem value="safety">Safety</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Priority</Label>
                            <Select
                              value={item.priority}
                              onValueChange={(value) => updateRepairItem(item.id, "priority", value as RepairItem["priority"])}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low Priority</SelectItem>
                                <SelectItem value="medium">Medium Priority</SelectItem>
                                <SelectItem value="high">High Priority</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Cost and Timeline */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Estimated Cost (AUD)</Label>
                          <Input
                            type="number"
                            value={item.estimatedCost}
                            onChange={(e) => updateRepairItem(item.id, "estimatedCost", e.target.value)}
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <Label>Contractor Name</Label>
                          <Input
                            value={item.contractorName}
                            onChange={(e) => updateRepairItem(item.id, "contractorName", e.target.value)}
                            placeholder="Enter contractor name"
                          />
                        </div>
                        <div>
                          <Label>Timeline</Label>
                          <Input
                            value={item.timeline}
                            onChange={(e) => updateRepairItem(item.id, "timeline", e.target.value)}
                            placeholder="e.g., 2-3 weeks"
                          />
                        </div>
                      </div>

                      {/* Quote Upload and OCR */}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload quote or estimate (PDF/Image) for OCR processing
                          </p>
                          <Input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, item.id);
                              }
                            }}
                            className="w-full"
                          />
                          {item.quoteUploaded && (
                            <Badge className="mt-2 bg-green-100 text-green-800">
                              <FileText className="h-3 w-3 mr-1" />
                              Quote Uploaded
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* OCR Progress */}
                      {isProcessingOCR && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Processing OCR...</span>
                            <span className="text-sm text-muted-foreground">{ocrProgress}%</span>
                          </div>
                          <Progress value={ocrProgress} className="h-2" />
                        </div>
                      )}

                      {/* Notes */}
                      <div>
                        <Label>Additional Notes</Label>
                        <Textarea
                          value={item.notes}
                          onChange={(e) => updateRepairItem(item.id, "notes", e.target.value)}
                          placeholder="Any additional notes or special requirements..."
                          className="min-h-[60px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Total Cost Summary */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">Total Estimated Repair Cost:</span>
                      <span className="text-xl font-bold text-blue-600">
                        ${totalCost.toLocaleString("en-AU")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {essentialRepairsRequired === "no" && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-green-700 mb-2">
                    No Essential Repairs Required
                  </h3>
                  <p className="text-green-600">
                    Property is in good condition with adequate maintenance level.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Depreciation Calculator Tab */}
          <TabsContent value="depreciation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Depreciation Rate Calculator
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Calculate depreciation rate and remaining useful life of the property
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Property Type</Label>
                    <Select
                      value={depreciationData.propertyType}
                      onValueChange={(value) => setDepreciationData(prev => ({ ...prev, propertyType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Property Age (Years)</Label>
                    <Input
                      type="number"
                      value={depreciationData.propertyAge}
                      onChange={(e) => setDepreciationData(prev => ({ 
                        ...prev, 
                        propertyAge: parseInt(e.target.value) || 0 
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Current Condition</Label>
                    <Select
                      value={depreciationData.currentCondition}
                      onValueChange={(value) => setDepreciationData(prev => ({ ...prev, currentCondition: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Total Economic Life (Years)</Label>
                    <Input
                      type="number"
                      value={depreciationData.totalEconomicLife}
                      onChange={(e) => setDepreciationData(prev => ({ 
                        ...prev, 
                        totalEconomicLife: parseInt(e.target.value) || 50 
                      }))}
                    />
                  </div>
                </div>

                <Button onClick={calculateDepreciation} className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Depreciation
                </Button>

                {/* Depreciation Results */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {depreciationData.effectiveAge}
                    </div>
                    <div className="text-sm text-muted-foreground">Effective Age (Years)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {depreciationData.remainingLife}
                    </div>
                    <div className="text-sm text-muted-foreground">Remaining Useful Life</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {depreciationData.depreciationRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">Depreciation Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Valuation Impact Tab */}
          <TabsContent value="impact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" />
                  Impact on Property Valuation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <div className="space-y-2">
                      <p className="font-medium">Standard Valuation Impact Comment:</p>
                      <p className="italic">"{standardValuationComment}"</p>
                    </div>
                  </AlertDescription>
                </Alert>

                {essentialRepairsRequired === "yes" && totalCost > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Repair Cost Impact Analysis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-600">
                            -${totalCost.toLocaleString("en-AU")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Estimated Repair Costs
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-600">
                            {depreciationData.depreciationRate}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Depreciation Rate
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <h5 className="font-medium text-amber-800 mb-2">Valuation Adjustments:</h5>
                      <ul className="space-y-1 text-sm text-amber-700">
                        <li>• Repair costs deducted from comparable sales analysis</li>
                        <li>• Depreciation rate factored into income approach calculations</li>
                        <li>• Overall condition reflected in market value assessment</li>
                        <li>• Timeline for repairs considered in marketability analysis</li>
                      </ul>
                    </div>
                  </div>
                )}

                {essentialRepairsRequired === "no" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-2">Property in Good Condition:</h5>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• No adjustments required for immediate repairs</li>
                      <li>• Standard depreciation rates applied</li>
                      <li>• Property suitable for immediate use or rental</li>
                      <li>• Market value reflects current condition</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}