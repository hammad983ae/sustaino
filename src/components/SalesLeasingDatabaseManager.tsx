import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Database, 
  Download, 
  Upload, 
  Search, 
  TrendingUp, 
  Home, 
  DollarSign,
  Calendar,
  MapPin,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

interface ExtractionJob {
  id: string;
  job_type: string;
  status: string;
  source_type: string;
  source_identifier: string;
  records_successful: number;
  records_failed: number;
  created_at: string;
  completed_at?: string;
}

interface SalesData {
  id: string;
  property_address: string;
  sale_date: string;
  sale_price: number;
  property_type: string;
  bedrooms?: number;
  bathrooms?: number;
  data_source: string;
  data_quality_score: number;
}

interface LeasingData {
  id: string;
  property_address: string;
  rental_amount: number;
  rental_period: string;
  lease_start_date: string;
  property_type: string;
  bedrooms?: number;
  bathrooms?: number;
  data_source: string;
}

export const SalesLeasingDatabaseManager = () => {
  const { toast } = useToast();
  const [extractionUrl, setExtractionUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionJobs, setExtractionJobs] = useState<ExtractionJob[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [leasingData, setLeasingData] = useState<LeasingData[]>([]);
  const [suburb, setSuburb] = useState('');
  const [state, setState] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  });

  useEffect(() => {
    loadExtractionJobs();
    loadSalesData();
    loadLeasingData();
  }, []);

  const loadExtractionJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('data_extraction_jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setExtractionJobs(data || []);
    } catch (error) {
      console.error('Error loading extraction jobs:', error);
    }
  };

  const loadSalesData = async () => {
    try {
      const { data, error } = await supabase
        .from('sales_evidence')
        .select('*')
        .order('sale_date', { ascending: false })
        .limit(50);

      if (error) throw error;
      setSalesData(data || []);
    } catch (error) {
      console.error('Error loading sales data:', error);
    }
  };

  const loadLeasingData = async () => {
    try {
      const { data, error } = await supabase
        .from('leasing_evidence')
        .select('*')
        .order('lease_start_date', { ascending: false })
        .limit(50);

      if (error) throw error;
      setLeasingData(data || []);
    } catch (error) {
      console.error('Error loading leasing data:', error);
    }
  };

  const extractFromUrl = async (url: string, extractionType: string) => {
    try {
      setIsExtracting(true);
      
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error('User not authenticated');
      }

      const response = await supabase.functions.invoke('property-data-extractor', {
        body: {
          url,
          extractionType,
          userId: userData.user.id
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const result = response.data;
      
      if (result.success) {
        toast({
          title: "Data Extraction Successful",
          description: `Extracted data from ${result.source}`,
          variant: "default"
        });
        
        // Refresh data
        await Promise.all([
          loadExtractionJobs(),
          loadSalesData(),
          loadLeasingData()
        ]);
      } else {
        throw new Error(result.error || 'Extraction failed');
      }
    } catch (error) {
      console.error('Extraction error:', error);
      toast({
        title: "Extraction Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const extractFromRPData = async () => {
    if (!suburb || !state) {
      toast({
        title: "Missing Information",
        description: "Please enter both suburb and state",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsExtracting(true);
      
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error('User not authenticated');
      }

      const response = await supabase.functions.invoke('property-data-extractor', {
        body: {
          suburb,
          state,
          extractionType: 'rpdata',
          userId: userData.user.id
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const result = response.data;
      
      if (result.success) {
        toast({
          title: "RP Data Extraction Successful",
          description: `Extracted data for ${suburb}, ${state}`,
          variant: "default"
        });
        
        await Promise.all([
          loadExtractionJobs(),
          loadSalesData(),
          loadLeasingData()
        ]);
      } else {
        throw new Error(result.error || 'RP Data extraction failed');
      }
    } catch (error) {
      console.error('RP Data extraction error:', error);
      toast({
        title: "RP Data Extraction Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const processBulkUrls = async () => {
    const urls = bulkUrls.split('\n').filter(url => url.trim());
    if (urls.length === 0) return;

    setIsExtracting(true);
    let successCount = 0;
    let failCount = 0;

    for (const url of urls) {
      try {
        const trimmedUrl = url.trim();
        let extractionType = 'domain';
        
        if (trimmedUrl.includes('realestate.com.au')) {
          extractionType = 'realestate';
        }

        await extractFromUrl(trimmedUrl, extractionType);
        successCount++;
        
        // Add delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Failed to extract from ${url}:`, error);
        failCount++;
      }
    }

    setIsExtracting(false);
    toast({
      title: "Bulk Extraction Complete",
      description: `${successCount} successful, ${failCount} failed`,
      variant: successCount > 0 ? "default" : "destructive"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'processing':
        return <Badge variant="default" className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Database className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Sales & Leasing Database Manager</h1>
      </div>

      <Tabs defaultValue="extract" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="extract">Extract Data</TabsTrigger>
          <TabsTrigger value="sales">Sales Evidence</TabsTrigger>
          <TabsTrigger value="leasing">Leasing Evidence</TabsTrigger>
          <TabsTrigger value="jobs">Extraction Jobs</TabsTrigger>
          <TabsTrigger value="search">Search & Filter</TabsTrigger>
        </TabsList>

        <TabsContent value="extract" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* URL Extraction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  URL Extraction
                </CardTitle>
                <CardDescription>
                  Extract data from Domain.com.au or RealEstate.com.au listings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Paste property listing URL here..."
                  value={extractionUrl}
                  onChange={(e) => setExtractionUrl(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => extractFromUrl(extractionUrl, 'domain')}
                    disabled={!extractionUrl || isExtracting}
                    className="flex-1"
                  >
                    Extract from Domain
                  </Button>
                  <Button
                    onClick={() => extractFromUrl(extractionUrl, 'realestate')}
                    disabled={!extractionUrl || isExtracting}
                    variant="outline"
                    className="flex-1"
                  >
                    Extract from RealEstate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* RP Data Extraction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  RP Data Integration
                </CardTitle>
                <CardDescription>
                  Extract historical sales data for suburbs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Suburb"
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                  />
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger>
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NSW">NSW</SelectItem>
                      <SelectItem value="VIC">VIC</SelectItem>
                      <SelectItem value="QLD">QLD</SelectItem>
                      <SelectItem value="WA">WA</SelectItem>
                      <SelectItem value="SA">SA</SelectItem>
                      <SelectItem value="TAS">TAS</SelectItem>
                      <SelectItem value="ACT">ACT</SelectItem>
                      <SelectItem value="NT">NT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={extractFromRPData}
                  disabled={!suburb || !state || isExtracting}
                  className="w-full"
                >
                  Extract RP Data
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bulk URL Processing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Bulk URL Processing
              </CardTitle>
              <CardDescription>
                Process multiple property listing URLs at once (one per line)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste multiple URLs here, one per line..."
                value={bulkUrls}
                onChange={(e) => setBulkUrls(e.target.value)}
                rows={6}
              />
              <Button
                onClick={processBulkUrls}
                disabled={!bulkUrls.trim() || isExtracting}
                className="w-full"
              >
                Process Bulk URLs
              </Button>
            </CardContent>
          </Card>

          {isExtracting && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span className="text-sm font-medium">Extracting data...</span>
                </div>
                <Progress value={undefined} className="w-full" />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Sales Evidence ({salesData.length} records)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.slice(0, 10).map((sale) => (
                  <div key={sale.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{sale.property_address}</h4>
                        <p className="text-2xl font-bold text-green-600">{formatPrice(sale.sale_price)}</p>
                      </div>
                      <Badge variant="outline">{sale.data_source}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(sale.sale_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        {sale.property_type}
                      </div>
                      {sale.bedrooms && (
                        <div>{sale.bedrooms} bed, {sale.bathrooms} bath</div>
                      )}
                      <div>Quality: {sale.data_quality_score}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leasing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Leasing Evidence ({leasingData.length} records)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leasingData.slice(0, 10).map((lease) => (
                  <div key={lease.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{lease.property_address}</h4>
                        <p className="text-xl font-bold text-blue-600">
                          {formatPrice(lease.rental_amount)} / {lease.rental_period}
                        </p>
                      </div>
                      <Badge variant="outline">{lease.data_source}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(lease.lease_start_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        {lease.property_type}
                      </div>
                      {lease.bedrooms && (
                        <div>{lease.bedrooms} bed, {lease.bathrooms} bath</div>
                      )}
                      <div>Rental {lease.rental_period}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Extraction Jobs History</CardTitle>
              <CardDescription>Track all data extraction operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {extractionJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold capitalize">{job.job_type} Extraction</h4>
                        <p className="text-sm text-muted-foreground">{job.source_identifier}</p>
                      </div>
                      {getStatusBadge(job.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>Records: {job.records_successful}</div>
                      <div>Failed: {job.records_failed}</div>
                      <div>Started: {new Date(job.created_at).toLocaleString()}</div>
                      {job.completed_at && (
                        <div>Completed: {new Date(job.completed_at).toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search & Filter Database
              </CardTitle>
              <CardDescription>
                Filter sales and leasing data by various criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <Select 
                  value={searchFilters.propertyType} 
                  onValueChange={(value) => setSearchFilters(prev => ({ ...prev, propertyType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Unit">Unit</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input
                  placeholder="Min Price"
                  value={searchFilters.minPrice}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                />
                
                <Input
                  placeholder="Max Price"
                  value={searchFilters.maxPrice}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                />
                
                <Select 
                  value={searchFilters.bedrooms} 
                  onValueChange={(value) => setSearchFilters(prev => ({ ...prev, bedrooms: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full mb-4">
                Apply Filters
              </Button>
              
              <div className="text-center text-muted-foreground">
                Search functionality will filter the database results shown above
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};