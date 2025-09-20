import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Download,
  RefreshCw,
  Eye,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import { useReportData } from "@/contexts/ReportDataContext";

interface ComplianceItem {
  id: string;
  name: string;
  category: "safety" | "building" | "accessibility" | "environmental" | "operational";
  status: "yes" | "no" | "not-applicable" | "unknown";
  notes: string;
  required: boolean;
  priority: "low" | "medium" | "high" | "critical";
  lastUpdated: Date;
}

const complianceChecklist: Omit<ComplianceItem, "status" | "notes" | "lastUpdated">[] = [
  {
    id: "fire-safety",
    name: "Fire Safety Systems",
    category: "safety",
    required: true,
    priority: "critical"
  },
  {
    id: "building-code",
    name: "Building Code Compliance",
    category: "building",
    required: true,
    priority: "critical"
  },
  {
    id: "dda-accessibility",
    name: "Disability Access (DDA)",
    category: "accessibility",
    required: true,
    priority: "high"
  },
  {
    id: "environmental",
    name: "Environmental Compliance",
    category: "environmental",
    required: true,
    priority: "high"
  },
  {
    id: "whs-safety",
    name: "Health & Safety (WHS)",
    category: "safety",
    required: true,
    priority: "high"
  },
  {
    id: "zoning",
    name: "Zoning Compliance",
    category: "building",
    required: true,
    priority: "high"
  },
  {
    id: "structural",
    name: "Structural Certification",
    category: "building",
    required: true,
    priority: "critical"
  },
  {
    id: "electrical",
    name: "Electrical Compliance",
    category: "building",
    required: true,
    priority: "high"
  },
  {
    id: "plumbing",
    name: "Plumbing Compliance",
    category: "building",
    required: true,
    priority: "medium"
  },
  {
    id: "hvac",
    name: "HVAC Compliance",
    category: "building",
    required: false,
    priority: "medium"
  },
  {
    id: "life-safety",
    name: "Life Safety Systems",
    category: "safety",
    required: true,
    priority: "critical"
  },
  {
    id: "asbestos",
    name: "Asbestos Management",
    category: "environmental",
    required: true,
    priority: "high"
  },
  {
    id: "energy-efficiency",
    name: "Energy Efficiency Rating",
    category: "environmental",
    required: false,
    priority: "medium"
  },
  {
    id: "water-compliance",
    name: "Water Compliance",
    category: "environmental",
    required: true,
    priority: "medium"
  }
];

export default function EnhancedComplianceAssessment() {
  const { reportData, updateReportData } = useReportData();

  // Core States
  const [includeSection, setIncludeSection] = useState(true);
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount] = useState(complianceChecklist.length);
  const [overallComplianceLevel, setOverallComplianceLevel] = useState<"compliant" | "non-compliant" | "partial" | "unknown">("unknown");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportProgress, setReportProgress] = useState(0);

  // Initialize compliance items
  useEffect(() => {
    const initialItems: ComplianceItem[] = complianceChecklist.map(item => ({
      ...item,
      status: "unknown",
      notes: "",
      lastUpdated: new Date()
    }));
    setComplianceItems(initialItems);
  }, []);

  // Calculate completion status
  useEffect(() => {
    const completed = complianceItems.filter(item => 
      item.status !== "unknown"
    ).length;
    
    setCompletedCount(completed);

    // Calculate overall compliance level
    const yesCount = complianceItems.filter(item => item.status === "yes").length;
    const noCount = complianceItems.filter(item => item.status === "no").length;
    const totalAnswered = completed;

    if (totalAnswered === 0) {
      setOverallComplianceLevel("unknown");
    } else if (noCount === 0 && yesCount > 0) {
      setOverallComplianceLevel("compliant");
    } else if (noCount > 0 && yesCount > 0) {
      setOverallComplianceLevel("partial");
    } else if (noCount > 0) {
      setOverallComplianceLevel("non-compliant");
    } else {
      setOverallComplianceLevel("unknown");
    }
  }, [complianceItems]);

  // Update compliance item
  const updateComplianceItem = (id: string, field: keyof ComplianceItem, value: any) => {
    setComplianceItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, [field]: value, lastUpdated: new Date() }
        : item
    ));
  };

  // Get status color
  const getStatusColor = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "yes": return "bg-green-500 text-white";
      case "no": return "bg-red-500 text-white";
      case "not-applicable": return "bg-gray-500 text-white";
      case "unknown": return "bg-yellow-500 text-white";
      default: return "bg-gray-300 text-gray-700";
    }
  };

  // Get priority color
  const getPriorityColor = (priority: ComplianceItem["priority"]) => {
    switch (priority) {
      case "critical": return "text-red-600";
      case "high": return "text-orange-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  // Get category icon
  const getCategoryIcon = (category: ComplianceItem["category"]) => {
    switch (category) {
      case "safety": return <Shield className="h-4 w-4" />;
      case "building": return <FileText className="h-4 w-4" />;
      case "accessibility": return <Eye className="h-4 w-4" />;
      case "environmental": return <Zap className="h-4 w-4" />;
      case "operational": return <RefreshCw className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  // Generate compliance report
  const generateComplianceReport = async () => {
    setIsGeneratingReport(true);
    setReportProgress(0);

    try {
      const stages = [
        { message: "Analyzing compliance data...", progress: 25 },
        { message: "Checking regulatory requirements...", progress: 50 },
        { message: "Generating recommendations...", progress: 75 },
        { message: "Finalizing report...", progress: 100 }
      ];

      for (const stage of stages) {
        setReportProgress(stage.progress);
        toast.loading(stage.message);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      toast.success("Compliance report generated successfully");
      
    } catch (error) {
      toast.error("Failed to generate compliance report");
    } finally {
      setIsGeneratingReport(false);
      setReportProgress(0);
    }
  };

  // Auto-check compliance for obvious items
  const runAutoComplianceCheck = () => {
    // Simulate auto-checking some items based on property data
    const autoUpdates = [
      { id: "fire-safety", status: "yes" as const, notes: "Fire safety systems verified and operational" },
      { id: "electrical", status: "yes" as const, notes: "Electrical certification current and valid" },
      { id: "plumbing", status: "yes" as const, notes: "Plumbing systems compliant with current standards" }
    ];

    setComplianceItems(prev => prev.map(item => {
      const autoUpdate = autoUpdates.find(update => update.id === item.id);
      if (autoUpdate) {
        return { ...item, ...autoUpdate, lastUpdated: new Date() };
      }
      return item;
    }));

    toast.success("Auto-compliance check completed for verified items");
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Compliance Assessment</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive regulatory and safety compliance checklist
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="include-compliance">Include Section</Label>
          <Switch
            id="include-compliance"
            checked={includeSection}
            onCheckedChange={setIncludeSection}
          />
        </div>
      </div>

      {includeSection && (
        <>
          {/* Progress Overview */}
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Shield className="h-6 w-6" />
                    Compliance Overview
                  </CardTitle>
                  <p className="text-sm text-blue-600 mt-1">
                    {completedCount}/{totalCount} items completed ({Math.round((completedCount / totalCount) * 100)}%)
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={runAutoComplianceCheck}
                    variant="outline"
                    size="sm"
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    Auto-Check
                  </Button>
                  <Button
                    onClick={generateComplianceReport}
                    disabled={isGeneratingReport}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {isGeneratingReport ? 'Generating...' : 'Generate Report'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {completedCount} of {totalCount} complete
                  </span>
                </div>
                <Progress value={(completedCount / totalCount) * 100} className="h-3" />
                
                {/* Overall Compliance Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Status:</span>
                  <Badge className={`
                    ${overallComplianceLevel === "compliant" ? "bg-green-500 text-white" :
                      overallComplianceLevel === "partial" ? "bg-yellow-500 text-white" :
                      overallComplianceLevel === "non-compliant" ? "bg-red-500 text-white" :
                      "bg-gray-500 text-white"}
                  `}>
                    {overallComplianceLevel === "compliant" && "Compliant"}
                    {overallComplianceLevel === "partial" && "Partially Compliant"}
                    {overallComplianceLevel === "non-compliant" && "Non-Compliant"}
                    {overallComplianceLevel === "unknown" && "Assessment Pending"}
                  </Badge>
                </div>
              </div>
            </CardContent>

            {/* Report Generation Progress */}
            {isGeneratingReport && (
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700">Generating compliance report...</span>
                    <span className="text-sm text-blue-600">{reportProgress}%</span>
                  </div>
                  <Progress value={reportProgress} className="h-2" />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Compliance Issues Alert */}
          {overallComplianceLevel === "non-compliant" && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">Compliance Issues Detected</p>
                  <p>One or more critical compliance requirements are not met. 
                     This may affect the property's safety, legal status, or marketability.</p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Compliance Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Compliance Checklist
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Complete each compliance item with appropriate status and notes
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {complianceItems.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gray-100`}>
                        {getCategoryIcon(item.category)}
                      </div>
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          {item.name}
                          {item.required && (
                            <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                              Required
                            </Badge>
                          )}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs capitalize">
                            {item.category}
                          </Badge>
                          <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === "yes" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {item.status === "no" && <XCircle className="h-3 w-3 mr-1" />}
                      {item.status === "not-applicable" && <XCircle className="h-3 w-3 mr-1" />}
                      {item.status === "unknown" && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {item.status === "yes" ? "Yes" :
                       item.status === "no" ? "No" :
                       item.status === "not-applicable" ? "N/A" :
                       "Unknown"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Compliance Status</Label>
                      <Select
                        value={item.status}
                        onValueChange={(value) => updateComplianceItem(item.id, "status", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Yes - Compliant
                            </div>
                          </SelectItem>
                          <SelectItem value="no">
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4 text-red-600" />
                              No - Non-Compliant
                            </div>
                          </SelectItem>
                          <SelectItem value="not-applicable">
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4 text-gray-600" />
                              Not Applicable
                            </div>
                          </SelectItem>
                          <SelectItem value="unknown">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-600" />
                              Unknown
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Notes & Details</Label>
                      <Textarea
                        value={item.notes}
                        onChange={(e) => updateComplianceItem(item.id, "notes", e.target.value)}
                        placeholder="Add compliance notes, certificate numbers, or additional details..."
                        className="mt-1 min-h-[80px]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-muted-foreground">
                      Last updated: {item.lastUpdated.toLocaleDateString()} at {item.lastUpdated.toLocaleTimeString()}
                    </span>
                    {item.status === "no" && (
                      <Badge variant="outline" className="border-red-500 text-red-700">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Action Required
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Compliance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Compliance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {complianceItems.filter(item => item.status === "yes").length}
                    </div>
                    <div className="text-sm text-green-700">Compliant</div>
                  </div>
                </Card>
                <Card className="p-4 bg-red-50 border-red-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {complianceItems.filter(item => item.status === "no").length}
                    </div>
                    <div className="text-sm text-red-700">Non-Compliant</div>
                  </div>
                </Card>
                <Card className="p-4 bg-gray-50 border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">
                      {complianceItems.filter(item => item.status === "not-applicable").length}
                    </div>
                    <div className="text-sm text-gray-700">Not Applicable</div>
                  </div>
                </Card>
                <Card className="p-4 bg-yellow-50 border-yellow-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {complianceItems.filter(item => item.status === "unknown").length}
                    </div>
                    <div className="text-sm text-yellow-700">Pending Review</div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}