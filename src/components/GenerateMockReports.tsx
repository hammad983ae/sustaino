import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, CheckCircle, Play, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import ISFVPlatform from './ISFVPlatform';

// PAF Demo Properties
const pafDemoProperties = [
  {
    name: "Childcare Centre - Melbourne CBD",
    address: "123 Collins Street, Melbourne VIC 3000",
    type: "Childcare",
    reportType: "Long Form",
    features: "150 child capacity, outdoor play areas, commercial kitchen"
  },
  {
    name: "Apple Orchard - Yarra Valley",
    address: "456 Orchard Road, Healesville VIC 3777",
    type: "Agricultural",
    reportType: "Sustino Pro",
    features: "50 hectares, irrigation system, processing facility"
  },
  {
    name: "Healthcare Clinic - Box Hill",
    address: "789 Whitehorse Road, Box Hill VIC 3128",
    type: "Healthcare",
    reportType: "Short Form",
    features: "Medical suites, parking, specialist equipment"
  },
  {
    name: "Development Site - Doncaster",
    address: "321 Manningham Road, Doncaster VIC 3108",
    type: "Development",
    reportType: "Long Form",
    features: "2.5 hectares, residential zoning, planning permits"
  },
  {
    name: "Office Complex - South Yarra",
    address: "555 Toorak Road, South Yarra VIC 3141",
    type: "Office",
    reportType: "Sustino Pro",
    features: "Grade A office, 15 floors, premium fitout"
  }
];

// ICV Demo Properties
const icvDemoProperties = [
  {
    name: "Retail Shopping Centre - Chadstone",
    address: "1341 Dandenong Road, Chadstone VIC 3148",
    type: "Retail",
    reportType: "Insurance Valuation",
    features: "Major shopping centre, 200+ stores, entertainment precinct"
  },
  {
    name: "Industrial Warehouse - Dandenong",
    address: "88 Princes Highway, Dandenong VIC 3175",
    type: "Industrial",
    reportType: "Commercial Valuation",
    features: "Distribution centre, high clearance, loading docks"
  },
  {
    name: "Mixed Use Development - Richmond",
    address: "77 Swan Street, Richmond VIC 3121",
    type: "Mixed Use",
    reportType: "Insurance Valuation",
    features: "Retail ground floor, residential apartments, basement parking"
  },
  {
    name: "Healthcare Hospital - Fitzroy",
    address: "250 Gertrude Street, Fitzroy VIC 3065",
    type: "Healthcare",
    reportType: "Commercial Valuation",
    features: "Private hospital, 150 beds, surgical suites, ICU"
  },
  {
    name: "Office Tower - Melbourne CBD",
    address: "101 Collins Street, Melbourne VIC 3000",
    type: "Office",
    reportType: "Insurance Valuation",
    features: "Premium Grade A tower, 40 floors, harbour views"
  }
];

export default function GenerateMockReports() {
  const [pafSelectedProperty, setPafSelectedProperty] = useState("");
  const [pafCustomAddress, setPafCustomAddress] = useState("");
  const [pafStatus, setPafStatus] = useState("Idle");
  const [pafLoading, setPafLoading] = useState(false);

  const [icvSelectedProperty, setIcvSelectedProperty] = useState("");
  const [icvCustomAddress, setIcvCustomAddress] = useState("");
  const [icvStatus, setIcvStatus] = useState("Idle");
  const [icvLoading, setIcvLoading] = useState(false);

  const handlePafAutomation = async () => {
    if (!pafSelectedProperty && !pafCustomAddress.trim()) {
      toast.error("Please select a demo property or enter a custom address");
      return;
    }

    setPafLoading(true);
    setPafStatus("Running automation...");

    // Simulate automation process
    setTimeout(() => {
      setPafStatus("Processing property details...");
    }, 1000);

    setTimeout(() => {
      setPafStatus("Generating PAF report...");
    }, 2000);

    setTimeout(() => {
      setPafStatus("Complete");
      setPafLoading(false);
      toast.success("PAF automation completed successfully!");
    }, 3500);
  };

  const handlePafContradictionCheck = () => {
    if (pafStatus !== "Complete") {
      toast.error("Please run full automation first");
      return;
    }

    toast.success("PAF contradiction check passed - no issues detected");
  };

  const handleIcvAutomation = async () => {
    if (!icvSelectedProperty && !icvCustomAddress.trim()) {
      toast.error("Please select a demo property or enter a custom address");
      return;
    }

    setIcvLoading(true);
    setIcvStatus("Running automation...");

    // Simulate automation process
    setTimeout(() => {
      setIcvStatus("Calculating insurance values...");
    }, 1000);

    setTimeout(() => {
      setIcvStatus("Generating ICV report...");
    }, 2000);

    setTimeout(() => {
      setIcvStatus("Complete");
      setIcvLoading(false);
      toast.success("ICV automation completed successfully!");
    }, 3500);
  };

  const handleIcvContradictionCheck = () => {
    if (icvStatus !== "Complete") {
      toast.error("Please run full automation first");
      return;
    }

    toast.success("ICV contradiction check passed - no issues detected");
  };

  const clearPafData = () => {
    setPafSelectedProperty("");
    setPafCustomAddress("");
    setPafStatus("Idle");
    toast.info("PAF data cleared");
  };

  const clearIcvData = () => {
    setIcvSelectedProperty("");
    setIcvCustomAddress("");
    setIcvStatus("Idle");
    toast.info("ICV data cleared");
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Client Demo Platform</h1>
        <p className="text-muted-foreground">
          Comprehensive demonstration of our property valuation workflows with automated contradiction checking across ISFV, PAF, and ICV reports.
        </p>
      </div>

      {/* ISFV Section */}
      <div className="space-y-6">
        <div className="border-l-4 border-emerald-500 pl-4">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">Instant Short Form Valuation (ISFV)</h2>
          <p className="text-muted-foreground">Professional property valuation with integrated automation, Domain API, and risk analysis</p>
        </div>
        
        <ISFVPlatform />

        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800">ISFV Demo Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-emerald-700">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Select a demo property from the dropdown in the Automation Control Center</li>
              <li>Click "Run Full Automation" to trigger the automated valuation process</li>
              <li>Use "Run Contradiction Check" to validate report consistency for compliance</li>
              <li>Explore the different tabs to see automated content in each section</li>
              <li>Perfect for demonstrating rapid, automated property valuations with quality control</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* PAF Section */}
      <div className="space-y-6">
        <div className="border-l-4 border-blue-500 pl-4">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Property Assessment Forms (PAF)</h2>
          <p className="text-muted-foreground">Comprehensive property assessment with mixed asset types and report formats</p>
        </div>

        <Card className="bg-white border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Play className="h-5 w-5" />
              PAF Automation Control Center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="paf-demo-property">Demo Property</Label>
                <Select value={pafSelectedProperty} onValueChange={setPafSelectedProperty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select demo property..." />
                  </SelectTrigger>
                  <SelectContent>
                    {pafDemoProperties.map((property, index) => (
                      <SelectItem key={index} value={property.name}>
                        <div className="text-left">
                          <div className="font-medium">{property.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {property.type} • {property.reportType}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {pafSelectedProperty && (
                  <div className="text-xs text-muted-foreground p-2 bg-blue-50 rounded">
                    {pafDemoProperties.find(p => p.name === pafSelectedProperty)?.features}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="paf-custom-address">Property Address</Label>
                <Input
                  id="paf-custom-address"
                  value={pafCustomAddress}
                  onChange={(e) => setPafCustomAddress(e.target.value)}
                  placeholder="Or enter custom address..."
                  disabled={!!pafSelectedProperty}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handlePafAutomation}
                disabled={pafLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {pafLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Full Automation
                  </>
                )}
              </Button>

              <Button 
                variant="outline" 
                onClick={handlePafContradictionCheck}
                disabled={pafStatus !== "Complete"}
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Run Contradiction Check
              </Button>

              <Button variant="ghost" onClick={clearPafData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-sm">Status:</span>
              <span className={`text-sm ${pafStatus === "Complete" ? "text-green-600" : "text-blue-600"}`}>
                {pafStatus}
              </span>
              {pafStatus === "Complete" && <CheckCircle className="h-4 w-4 text-green-600" />}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">PAF Demo Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Choose from diverse property types including childcare, healthcare, development sites, and agricultural assets</li>
              <li>Experience different report formats: Long Form, Short Form, and Sustino Pro reports</li>
              <li>Run full automation to see comprehensive property assessment workflows</li>
              <li>Validate data consistency with integrated contradiction checking</li>
              <li>Ideal for demonstrating versatile assessment capabilities across asset classes</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* ICV Section */}
      <div className="space-y-6">
        <div className="border-l-4 border-purple-500 pl-4">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">Insurance & Commercial Valuations (ICV)</h2>
          <p className="text-muted-foreground">Specialized insurance and commercial valuations for complex asset portfolios</p>
        </div>

        <Card className="bg-white border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Play className="h-5 w-5" />
              ICV Automation Control Center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="icv-demo-property">Demo Property</Label>
                <Select value={icvSelectedProperty} onValueChange={setIcvSelectedProperty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select demo property..." />
                  </SelectTrigger>
                  <SelectContent>
                    {icvDemoProperties.map((property, index) => (
                      <SelectItem key={index} value={property.name}>
                        <div className="text-left">
                          <div className="font-medium">{property.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {property.type} • {property.reportType}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {icvSelectedProperty && (
                  <div className="text-xs text-muted-foreground p-2 bg-purple-50 rounded">
                    {icvDemoProperties.find(p => p.name === icvSelectedProperty)?.features}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="icv-custom-address">Property Address</Label>
                <Input
                  id="icv-custom-address"
                  value={icvCustomAddress}
                  onChange={(e) => setIcvCustomAddress(e.target.value)}
                  placeholder="Or enter custom address..."
                  disabled={!!icvSelectedProperty}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleIcvAutomation}
                disabled={icvLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {icvLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Full Automation
                  </>
                )}
              </Button>

              <Button 
                variant="outline" 
                onClick={handleIcvContradictionCheck}
                disabled={icvStatus !== "Complete"}
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Run Contradiction Check
              </Button>

              <Button variant="ghost" onClick={clearIcvData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-sm">Status:</span>
              <span className={`text-sm ${icvStatus === "Complete" ? "text-green-600" : "text-purple-600"}`}>
                {icvStatus}
              </span>
              {icvStatus === "Complete" && <CheckCircle className="h-4 w-4 text-green-600" />}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">ICV Demo Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-purple-700">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Explore commercial and insurance valuations for retail, industrial, and mixed-use properties</li>
              <li>Experience specialized workflows for healthcare facilities and office towers</li>
              <li>See automated insurance value calculations and commercial assessment processes</li>
              <li>Validate complex valuation scenarios with contradiction checking</li>
              <li>Perfect for showcasing advanced commercial and insurance valuation capabilities</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Overall Demo Summary */}
      <Card className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">Complete Demo Platform Overview</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">ISFV</div>
              <p className="text-sm">Rapid property valuations with Domain API integration</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">PAF</div>
              <p className="text-sm">Comprehensive assessments across diverse asset classes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">ICV</div>
              <p className="text-sm">Specialized insurance and commercial valuations</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white/70 rounded-lg">
            <p className="text-sm text-center font-medium">
              All platforms feature automated contradiction checking, ensuring report consistency and compliance across all valuation types.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}