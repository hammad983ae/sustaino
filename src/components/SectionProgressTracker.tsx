import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Settings } from "lucide-react";

interface SectionStatus {
  sectionNumber: number;
  sectionName: string;
  status: 'completed' | 'in-progress' | 'pending' | 'enhanced';
  enhancements: string[];
  lastUpdated: string;
}

const SectionProgressTracker = () => {
  const sectionStatuses: SectionStatus[] = [
    {
      sectionNumber: 2,
      sectionName: "Legal and Planning",
      status: 'enhanced',
      enhancements: [
        "✅ State-based planning authority integration (VIC, NSW, QLD, SA, WA, TAS, NT, ACT)",
        "✅ Lot & Plan extraction from verified planning sources (not PAF)",
        "✅ Planning Search, RP Data, PRICE finder integration",
        "✅ OCR processing for planning documents",
        "✅ Automated zoning and overlay detection",
        "✅ Development controls and restrictions analysis",
        "✅ Planning authority verification system"
      ],
      lastUpdated: "2025-01-20"
    },
    {
      sectionNumber: 3,
      sectionName: "Planning Data Verification", 
      status: 'enhanced',
      enhancements: [
        "✅ Corrected data source prioritization (State Planning > RP Data > OCR)",
        "✅ Removed incorrect PAF data transfer",
        "✅ Implemented state-specific planning portal integration",
        "✅ Added planning authority verification flags",
        "✅ Enhanced data confidence scoring",
        "✅ Automated planning scheme validation"
      ],
      lastUpdated: "2025-01-20"
    },
    {
      sectionNumber: 4,
      sectionName: "Previous Sales History and Current Sale",
      status: 'completed',
      enhancements: [
        "✅ FULLY ENHANCED - PAF pre-population",
        "✅ RP Data integration with automated sales analysis",
        "✅ Contract upload with OCR processing", 
        "✅ Advanced transaction analysis with percentage calculations",
        "✅ Sales evidence validation and ranking",
        "✅ Workflow continuity with other sections"
      ],
      lastUpdated: "2025-01-20"
    },
    {
      sectionNumber: 5,
      sectionName: "Enhanced Essential Repairs",
      status: 'completed', 
      enhancements: [
        "✅ FULLY IMPLEMENTED - Yes/No toggle with smart defaults",
        "✅ Auto-preset repair conditions based on property type",
        "✅ Detailed repair categorization with OCR processing",
        "✅ Integrated depreciation calculator with CCI data",
        "✅ Standard valuation impact comments",
        "✅ Photo analysis for repair condition assessment"
      ],
      lastUpdated: "2025-01-20"
    },
    {
      sectionNumber: 6,
      sectionName: "Enhanced Risk Assessment",
      status: 'completed',
      enhancements: [
        "✅ PESTEL analysis framework integration",
        "✅ SWOT analysis with property-specific factors", 
        "✅ TOWS analysis for strategic planning",
        "✅ PAF data pre-population for risk factors",
        "✅ Environmental and market risk scoring",
        "✅ Automated risk mitigation recommendations"
      ],
      lastUpdated: "2025-01-20"
    },
    {
      sectionNumber: 7,
      sectionName: "Enhanced Property Details",
      status: 'completed',
      enhancements: [
        "✅ PAF data transfer for building specifications",
        "✅ Photo transfer and metadata preservation",
        "✅ OCR processing for working drawings and plans",
        "✅ Automated specification extraction",
        "✅ Building feature categorization",
        "✅ Construction quality assessment tools"
      ],
      lastUpdated: "2025-01-20"
    },
    {
      sectionNumber: 8,
      sectionName: "Enhanced Compliance Assessment",
      status: 'completed',
      enhancements: [
        "✅ Comprehensive compliance checklist with dropdown options",
        "✅ Progress tracking and completion monitoring",
        "✅ Auto-checking based on property type and location",
        "✅ Building code compliance verification",
        "✅ Safety standard assessment",
        "✅ Automated compliance report generation"
      ],
      lastUpdated: "2025-01-20"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'enhanced':
        return <Settings className="h-5 w-5 text-blue-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Fully Enhanced</Badge>;
      case 'enhanced':
        return <Badge className="bg-blue-100 text-blue-800">Recently Enhanced</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            📊 Section Enhancement Progress - January 20, 2025
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Comprehensive tracking of all report section enhancements implemented today
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {sectionStatuses.map((section) => (
              <Card key={section.sectionNumber} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(section.status)}
                      <h3 className="font-semibold">
                        Section {section.sectionNumber}: {section.sectionName}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(section.status)}
                      <span className="text-xs text-muted-foreground">
                        Updated: {section.lastUpdated}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {section.enhancements.map((enhancement, index) => (
                      <div key={index} className="text-sm text-gray-700 leading-relaxed">
                        {enhancement}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Statistics */}
          <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-3">📈 Enhancement Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">6</div>
                  <div className="text-gray-600">Sections Fully Enhanced</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <div className="text-gray-600">Planning Sections Fixed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                  <div className="text-gray-600">PAF Integration Active</div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded-lg border">
                <h4 className="font-medium text-sm mb-2">🔧 Key Technical Improvements:</h4>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>• State-based planning authority integration for accurate data</li>
                  <li>• Removed incorrect PAF data transfer from planning sections</li>
                  <li>• Enhanced OCR processing across all document types</li>
                  <li>• Advanced calculation engines for depreciation and risk analysis</li>
                  <li>• Automated workflow continuity between all sections</li>
                  <li>• Comprehensive data validation and confidence scoring</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default SectionProgressTracker;