import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Briefcase, 
  FileText, 
  Calendar, 
  DollarSign, 
  Target, 
  Star,
  Gavel,
  Upload,
  Save
} from "lucide-react";

interface JobData {
  title: string;
  description: string;
  priority: string;
  estimatedValue: string;
  deadline: string;
  category: string;
  clientType: string;
  requirements: string;
  documents: string[];
}

const AuctionReadyJobCreator = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobData, setJobData] = useState<JobData>({
    title: "",
    description: "",
    priority: "medium",
    estimatedValue: "",
    deadline: "",
    category: "valuation",
    clientType: "investor",
    requirements: "",
    documents: []
  });

  const jobCategories = [
    { value: "valuation", label: "Platform Valuation", icon: DollarSign },
    { value: "auction", label: "Auction Preparation", icon: Gavel },
    { value: "due-diligence", label: "Due Diligence", icon: FileText },
    { value: "esg-assessment", label: "ESG Assessment", icon: Target },
    { value: "ip-analysis", label: "IP Portfolio Analysis", icon: Star },
    { value: "market-analysis", label: "Market Analysis", icon: Briefcase }
  ];

  const clientTypes = [
    { value: "investor", label: "Institutional Investor" },
    { value: "strategic-buyer", label: "Strategic Acquirer" },
    { value: "pe-firm", label: "Private Equity Firm" },
    { value: "jv-partner", label: "Joint Venture Partner" },
    { value: "family-office", label: "Family Office" },
    { value: "sovereign-fund", label: "Sovereign Wealth Fund" }
  ];

  const handleInputChange = (field: keyof JobData, value: string) => {
    setJobData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitJob = async () => {
    if (!jobData.title || !jobData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in the required fields (title and description)",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create property for the job if it doesn't exist
      const { data: propertyData, error: propertyError } = await supabase
        .rpc('upsert_property_for_job', {
          address_text: 'Comprehensive Platform Ecosystem',
          property_type_text: 'digital_asset'
        });

      if (propertyError) throw propertyError;

      // Create the job
      const { data: jobResult, error: jobError } = await supabase
        .rpc('create_valuation_job', {
          job_data: {
            job_title: jobData.title,
            client_name: `${jobData.clientType} Client`,
            client_email: 'investor@example.com',
            job_type: jobData.category,
            property_address: 'Comprehensive Platform Ecosystem',
            property_id: propertyData,
            priority: jobData.priority,
            estimated_hours: 40.0,
            due_date: jobData.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            client_type: jobData.clientType,
            notes: `${jobData.description}\n\nRequirements: ${jobData.requirements}\nEstimated Value: ${jobData.estimatedValue}`
          }
        });

      if (jobError) throw jobError;

      // Create report entry
      const { error: reportError } = await supabase
        .rpc('create_report', {
          report_data: {
            property_id: propertyData,
            title: `${jobData.title} - Analysis Report`,
            report_type: jobData.category,
            status: 'in_progress',
            current_section: 'executive_summary',
            progress: 10,
            sections_data: {
              job_id: jobResult,
              category: jobData.category,
              client_type: jobData.clientType,
              estimated_value: jobData.estimatedValue,
              requirements: jobData.requirements
            }
          }
        });

      if (reportError) throw reportError;

      toast({
        title: "Job Created Successfully",
        description: `Job "${jobData.title}" has been created and saved to the WorkHub`,
      });

      // Reset form
      setJobData({
        title: "",
        description: "",
        priority: "medium",
        estimatedValue: "",
        deadline: "",
        category: "valuation",
        clientType: "investor",
        requirements: "",
        documents: []
      });

    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error Creating Job",
        description: "There was an error creating the job. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = jobCategories.find(cat => cat.value === jobData.category);
  const IconComponent = selectedCategory?.icon || Briefcase;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gavel className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold">
                Auction-Ready Job Creator
              </CardTitle>
              <CardDescription className="text-lg">
                Create jobs for platform analysis, valuation, and auction preparation
              </CardDescription>
            </div>
          </div>
          
          <div className="flex justify-center gap-3">
            <Badge className="bg-green-600 text-white">
              <Star className="h-4 w-4 mr-1" />
              Investor Grade
            </Badge>
            <Badge className="bg-blue-600 text-white">
              <FileText className="h-4 w-4 mr-1" />
              Documentation Ready
            </Badge>
            <Badge className="bg-purple-600 text-white">
              <Save className="h-4 w-4 mr-1" />
              Auto-Save to WorkHub
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconComponent className="h-6 w-6 text-primary" />
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={jobData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Complete Platform Valuation for Strategic Acquisition"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Job Category</Label>
              <Select value={jobData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {jobCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <category.icon className="h-4 w-4" />
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={jobData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Detailed description of the job requirements, scope, and deliverables..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={jobData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={jobData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-secondary" />
              Client & Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientType">Client Type</Label>
              <Select value={jobData.clientType} onValueChange={(value) => handleInputChange('clientType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {clientTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedValue">Estimated Transaction Value</Label>
              <Input
                id="estimatedValue"
                value={jobData.estimatedValue}
                onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                placeholder="e.g., $50B - $75B"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Specific Requirements</Label>
              <Textarea
                id="requirements"
                value={jobData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                placeholder="Specific requirements, compliance needs, documentation standards..."
                rows={4}
              />
            </div>

            <div className="p-4 bg-secondary/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="h-4 w-4 text-secondary" />
                <span className="font-medium">Document Requirements</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Financial projections and models</li>
                <li>• IP portfolio documentation</li>
                <li>• Technology architecture review</li>
                <li>• Market analysis reports</li>
                <li>• ESG impact assessments</li>
                <li>• Legal and compliance documentation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center gap-4">
            <Button 
              onClick={handleSubmitJob}
              disabled={isSubmitting}
              size="lg"
              className="px-8"
            >
              {isSubmitting ? (
                <>Creating Job...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Job & Save to WorkHub
                </>
              )}
            </Button>
            
            <Button variant="outline" size="lg" className="px-8">
              <FileText className="h-4 w-4 mr-2" />
              Preview Report Template
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-bold text-lg text-green-800 mb-2">
              Comprehensive Platform Analysis Ready
            </h3>
            <p className="text-green-700 mb-4">
              Jobs created here will automatically generate comprehensive analysis reports 
              including valuation models, sensitivity analysis, ESG impact assessments, 
              and auction-ready documentation packages.
            </p>
            <div className="flex justify-center gap-2">
              <Badge className="bg-green-600 text-white">$46.1B Base Case Valuation</Badge>
              <Badge className="bg-blue-600 text-white">8 Platform Components</Badge>
              <Badge className="bg-purple-600 text-white">20+ Patents Protected</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuctionReadyJobCreator;