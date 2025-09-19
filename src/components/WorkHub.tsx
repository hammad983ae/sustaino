import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  Calendar, 
  MapPin, 
  DollarSign, 
  TrendingUp,
  Building,
  Download,
  Eye,
  Archive,
  Filter,
  ArrowLeft,
  Home,
  Plus
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";

interface Valuation {
  id: string;
  property_address: string;
  estimated_value: number;
  valuation_type: string;
  valuation_date: string;
  status: string;
  methodology: string;
  confidence_score: number;
  created_at: string;
}

interface Report {
  id: string;
  title: string;
  property_address: string;
  report_type: string;
  status: string;
  generated_date: string;
  sustainability_score: number;
  file_path: string;
  created_at: string;
}

interface CostaPortfolioAnalysis {
  id: string;
  title: string;
  analysis_data: any;
  created_at: string;
  updated_at: string;
}

interface Job {
  id: string;
  job_number: string;
  job_title: string;
  job_description?: string;
  property_address?: string;
  priority?: string;
  status: string;
  job_type: string;
  due_date?: string;
  created_at: string;
}

export default function WorkHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [valuations, setValuations] = useState<Valuation[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [costaAnalyses, setCostaAnalyses] = useState<CostaPortfolioAnalysis[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Email dialog state
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailType, setEmailType] = useState<'view' | 'export'>('view');
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null);
  const [emailLoading, setEmailLoading] = useState(false);

  useEffect(() => {
    fetchAllWork();
  }, []);

  const fetchAllWork = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to view your work",
          variant: "destructive"
        });
        return;
      }

      // Fetch valuations
      const { data: valuationsData, error: valuationsError } = await supabase
        .from('valuations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (valuationsError) throw valuationsError;

      // Fetch reports
      const { data: reportsData, error: reportsError } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (reportsError) throw reportsError;

      // Fetch Costa portfolio analyses
      const { data: costaData, error: costaError } = await supabase
        .from('esg_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (costaError) throw costaError;

      // Fetch jobs
      const { data: jobsData, error: jobsError } = await supabase
        .from('valuation_jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (jobsError) throw jobsError;

  // Transform data to match expected interface  
  const transformedValuations = (valuationsData || []).map(val => ({
    ...val,
    property_address: 'Property Address (ID: ' + val.property_id + ')', // Display property ID until joined
    estimated_value: val.market_value || 0,
    confidence_score: 85,
    notes: val.assumptions || ''
  }));
      
      setValuations(transformedValuations);
      setReports((reportsData || []).map(r => ({
        ...r,
        property_address: 'TBD',
        generated_date: r.created_at,
        sustainability_score: 0,
        file_path: r.pdf_file_path || ''
      })));
      setCostaAnalyses((costaData || []) as any);
      setJobs((jobsData || []) as any);
    } catch (error) {
      console.error('Error fetching work:', error);
      toast({
        title: "Error loading work",
        description: "Failed to load your completed work",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEmailAction = (analysis: any, type: 'view' | 'export', analysisType: 'valuation' | 'report' | 'costa') => {
    console.log('Email action triggered:', { analysis, type, analysisType });
    setSelectedAnalysis({ ...analysis, analysisType });
    setEmailType(type);
    setEmailDialogOpen(true);
  };

  const sendAnalysisEmail = React.useCallback(async () => {
    console.log('sendAnalysisEmail called', { emailAddress, selectedAnalysis });
    
    if (!emailAddress.trim()) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    setEmailLoading(true);
    try {
      console.log('Invoking send-analysis function...');
      const { error } = await supabase.functions.invoke('send-analysis', {
        body: {
          to: emailAddress,
          subject: `${emailType === 'view' ? 'View' : 'Export'} - ${selectedAnalysis?.title || selectedAnalysis?.property_address || 'Analysis'}`,
          type: emailType,
          analysisData: selectedAnalysis,
          analysisType: selectedAnalysis?.analysisType
        }
      });

      if (error) throw error;

      toast({
        title: `${emailType === 'view' ? 'Analysis' : 'Export'} sent successfully`,
        description: `The ${emailType === 'view' ? 'analysis details' : 'export'} has been sent to ${emailAddress}`,
      });

      setEmailDialogOpen(false);
      setEmailAddress('');
      setSelectedAnalysis(null);
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Email failed",
        description: "Failed to send the analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setEmailLoading(false);
    }
  }, [emailAddress, emailType, selectedAnalysis, toast, setEmailLoading, setEmailDialogOpen, setEmailAddress, setSelectedAnalysis]);

  const filteredValuations = valuations.filter(item =>
    item.property_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.methodology.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReports = reports.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.property_address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCostaAnalyses = costaAnalyses.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = jobs.filter(item =>
    (item.job_title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.job_number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.property_address || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Archive className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
          <p className="text-muted-foreground">Loading your work...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Work Hub</h1>
            <p className="text-muted-foreground">Manage all your completed valuations, reports, and analyses</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate('/property-assessment-form')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Job (PAF)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/comprehensive-valuation')}
            className="flex items-center gap-2"
          >
            <Building className="h-4 w-4" />
            Quick Valuation
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your work..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Valuations</p>
                <p className="text-2xl font-bold">{valuations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Costa Analyses</p>
                <p className="text-2xl font-bold">{costaAnalyses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Portfolio Value</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(valuations.reduce((sum, v) => sum + (v.estimated_value || 0), 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="valuations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="valuations">Property Valuations ({valuations.length})</TabsTrigger>
          <TabsTrigger value="reports">Reports ({reports.length})</TabsTrigger>
          <TabsTrigger value="jobs">Jobs ({jobs.length})</TabsTrigger>
          <TabsTrigger value="costa">Costa's Operations ({costaAnalyses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="valuations" className="mt-6">
          <div className="space-y-4">
            {filteredValuations.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No valuations found</h3>
                  <p className="text-muted-foreground">Start by creating your first property valuation</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredValuations.map((valuation) => (
                  <Card key={valuation.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold">{valuation.property_address}</h3>
                            <Badge className={getStatusColor(valuation.status)}>
                              {valuation.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Estimated Value</p>
                              <p className="font-medium">{formatCurrency(valuation.estimated_value)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Type</p>
                              <p className="font-medium">{valuation.valuation_type}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Confidence</p>
                              <p className="font-medium">{valuation.confidence_score}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Date</p>
                              <p className="font-medium">{formatDate(valuation.valuation_date)}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEmailAction(valuation, 'view', 'valuation')}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEmailAction(valuation, 'export', 'valuation')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="space-y-4">
            {filteredReports.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No reports found</h3>
                  <p className="text-muted-foreground">Generate your first property report</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredReports.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold">{report.title}</h3>
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Property</p>
                              <p className="font-medium">{report.property_address}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Type</p>
                              <p className="font-medium">{report.report_type}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Sustainability Score</p>
                              <p className="font-medium">{report.sustainability_score || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Generated</p>
                              <p className="font-medium">{formatDate(report.generated_date)}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEmailAction(report, 'view', 'report')}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEmailAction(report, 'export', 'report')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="mt-6">
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                  <p className="text-muted-foreground">Create a job from the Document Upload step</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold">{job.job_title}</h3>
                            <Badge className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Job Number</p>
                              <p className="font-medium">{job.job_number}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Type</p>
                              <p className="font-medium">{job.job_type}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Due</p>
                              <p className="font-medium">{job.due_date ? formatDate(job.due_date) : '—'}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Created</p>
                              <p className="font-medium">{formatDate(job.created_at)}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {job.property_address || ''}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="costa" className="mt-6">
          <div className="space-y-6">
            {/* Global Operations Portfolio Section - Now properly secured under Costa's Operations */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary flash-text" />
                  <span className="flash-text">Global Operations Portfolio</span>
                  <Badge variant="outline" className="ml-auto">Restricted Access</Badge>
                </CardTitle>
                <p className="text-muted-foreground">
                  Comprehensive portfolio overview with profit information and operational metrics
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Button 
                    onClick={() => navigate('/costa-group-portfolio')}
                    className="flex items-center gap-2"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Portfolio Analysis
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/costa-group-valuations')}
                    className="flex items-center gap-2"
                  >
                    <DollarSign className="h-4 w-4" />
                    Valuations
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/costa-group-reports')}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Reports
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <p className="text-muted-foreground">Total Locations</p>
                    <p className="text-2xl font-bold text-primary flash-text">25+</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <p className="text-muted-foreground">Portfolio Value</p>
                    <p className="text-2xl font-bold text-primary flash-text">$2.8B</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <p className="text-muted-foreground">Annual Production</p>
                    <p className="text-2xl font-bold text-primary flash-text">125K</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <p className="text-muted-foreground">Water Usage</p>
                    <p className="text-2xl font-bold text-primary flash-text">890ML</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Existing Costa Analyses Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Saved Analyses</h3>
              {filteredCostaAnalyses.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No Costa analyses found</h3>
                    <p className="text-muted-foreground">Create your first Costa Group portfolio analysis</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {filteredCostaAnalyses.map((analysis) => (
                    <Card key={analysis.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="h-4 w-4 text-muted-foreground" />
                              <h3 className="font-semibold">{analysis.title}</h3>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Created</p>
                                <p className="font-medium">{formatDate(analysis.created_at)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Last Updated</p>
                                <p className="font-medium">{formatDate(analysis.updated_at)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Analysis Data</p>
                                <p className="font-medium">
                                  {analysis.analysis_data?.locationCount || 0} locations
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEmailAction(analysis, 'view', 'costa')}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEmailAction(analysis, 'export', 'costa')}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {emailType === 'view' ? 'Email Analysis Details' : 'Email Export'}
            </DialogTitle>
            <DialogDescription>
              {emailType === 'view' 
                ? 'Send analysis details to your email for review'
                : 'Export and send comprehensive analysis data to your email'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Enter email address"
                className="col-span-3"
              />
            </div>
            
            {selectedAnalysis && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Analysis</Label>
                <div className="col-span-3 text-sm text-muted-foreground">
                  {selectedAnalysis.title || selectedAnalysis.property_address || 'Analysis Data'}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendAnalysisEmail} disabled={emailLoading}>
              {emailLoading ? 'Sending...' : `Send ${emailType === 'view' ? 'Analysis' : 'Export'}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}