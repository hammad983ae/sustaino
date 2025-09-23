import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Database, FileText, Globe, Download, RefreshCw, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

interface SalesEvidence {
  id: string;
  property_address: string;
  sale_price: number;
  sale_date: string;
  data_source?: string;
  created_at: string;
  data_quality_score?: number;
  bedrooms?: number;
  bathrooms?: number;
  building_area?: number;
  land_area?: number;
  property_type?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  comparable_rating?: number;
}

interface RentalEvidence {
  id: string;
  property_address: string;
  rental_amount: number;
  lease_start_date: string;
  source?: string;
  created_at: string;
  data_quality_score?: number;
  bedrooms?: number;
  bathrooms?: number;
  building_area?: number;
  land_area?: number;
  property_type?: string;
}

interface EvidenceFile {
  id: string;
  file_name: string;
  evidence_type: string;
  extracted_data: any;
  source_url?: string;
  created_at: string;
  file_size?: number;
  extraction_status: string;
}

const DataStorageViewer = () => {
  const { toast } = useToast();
  const [salesData, setSalesData] = useState<SalesEvidence[]>([]);
  const [rentalData, setRentalData] = useState<RentalEvidence[]>([]);
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      // Load sales evidence
      const { data: sales, error: salesError } = await supabase
        .from('sales_evidence')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (salesError) throw salesError;

      // Load rental evidence
      const { data: rentals, error: rentalError } = await supabase
        .from('leasing_evidence')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (rentalError) throw rentalError;

      // Load evidence files
      const { data: files, error: filesError } = await supabase
        .from('evidence_files')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (filesError) throw filesError;

      setSalesData(sales || []);
      setRentalData(rentals || []);
      setEvidenceFiles(files || []);

      toast({
        title: "Data Loaded",
        description: `Found ${sales?.length || 0} sales, ${rentals?.length || 0} rentals, ${files?.length || 0} files`,
      });
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load stored data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredSales = salesData.filter(item => 
    item.property_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.data_source?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRentals = rentalData.filter(item => 
    item.property_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.source?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFiles = evidenceFiles.filter(item => 
    item.file_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.evidence_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU');
  };

  const exportData = (data: any[], type: string) => {
    const csv = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_data_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Database className="w-6 h-6" />
            Web Data & Document Storage Viewer
          </CardTitle>
          <p className="text-muted-foreground">
            View and manage data extracted from web scraping and document uploads
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search addresses, sources, or file names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={loadData} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{salesData.length}</div>
                    <div className="text-sm text-muted-foreground">Sales Records</div>
                  </div>
                  <Globe className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{rentalData.length}</div>
                    <div className="text-sm text-muted-foreground">Rental Records</div>
                  </div>
                  <Globe className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{evidenceFiles.length}</div>
                    <div className="text-sm text-muted-foreground">Document Files</div>
                  </div>
                  <FileText className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales">Sales Evidence</TabsTrigger>
          <TabsTrigger value="rentals">Rental Evidence</TabsTrigger>
          <TabsTrigger value="files">Document Files</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Sales Evidence ({filteredSales.length})</h3>
            <Button 
              onClick={() => exportData(filteredSales, 'sales')}
              variant="outline"
              size="sm"
              disabled={filteredSales.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
          
          <div className="space-y-3">
            {filteredSales.map((sale) => (
              <Card key={sale.id}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="font-semibold">{sale.property_address}</div>
                      <div className="text-sm text-muted-foreground">{sale.property_type}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-green-600">{formatCurrency(sale.sale_price)}</div>
                      <div className="text-sm text-muted-foreground">Sale Date: {formatDate(sale.sale_date)}</div>
                    </div>
                    <div>
                      <div className="text-sm">
                        {sale.bedrooms && `${sale.bedrooms} bed`}
                        {sale.bathrooms && ` • ${sale.bathrooms} bath`}
                        {sale.building_area && ` • ${sale.building_area}m²`}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Source: {sale.data_source}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {sale.data_quality_score && (
                        <Badge variant="secondary">
                          {sale.data_quality_score}% quality
                        </Badge>
                      )}
                      <div className="text-xs text-muted-foreground">
                        Added: {formatDate(sale.created_at)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredSales.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Globe className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Sales Data Found</h3>
                  <p className="text-muted-foreground">
                    Use the Web Data Upload Interface to extract sales data from property websites
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="rentals" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Rental Evidence ({filteredRentals.length})</h3>
            <Button 
              onClick={() => exportData(filteredRentals, 'rentals')}
              variant="outline"
              size="sm"
              disabled={filteredRentals.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
          
          <div className="space-y-3">
            {filteredRentals.map((rental) => (
              <Card key={rental.id}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="font-semibold">{rental.property_address}</div>
                      <div className="text-sm text-muted-foreground">{rental.property_type}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-600">{formatCurrency(rental.rental_amount)}/week</div>
                      <div className="text-sm text-muted-foreground">Lease Date: {formatDate(rental.lease_start_date)}</div>
                    </div>
                    <div>
                      <div className="text-sm">
                        {rental.bedrooms && `${rental.bedrooms} bed`}
                        {rental.bathrooms && ` • ${rental.bathrooms} bath`}
                        {rental.building_area && ` • ${rental.building_area}m²`}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Source: {rental.source}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {rental.data_quality_score && (
                        <Badge variant="secondary">
                          {rental.data_quality_score}% quality
                        </Badge>
                      )}
                      <div className="text-xs text-muted-foreground">
                        Added: {formatDate(rental.created_at)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredRentals.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Globe className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Rental Data Found</h3>
                  <p className="text-muted-foreground">
                    Use the Web Data Upload Interface to extract rental data from property websites
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Document Files ({filteredFiles.length})</h3>
            <Button 
              onClick={() => exportData(filteredFiles, 'files')}
              variant="outline"
              size="sm"
              disabled={filteredFiles.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
          
          <div className="space-y-3">
            {filteredFiles.map((file) => (
              <Card key={file.id}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="font-semibold">{file.file_name}</div>
                      <div className="text-sm text-muted-foreground">{file.evidence_type}</div>
                    </div>
                    <div>
                      <Badge variant={file.extraction_status === 'completed' ? 'default' : 'secondary'}>
                        {file.extraction_status}
                      </Badge>
                      {file.file_size && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {(file.file_size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      )}
                    </div>
                    <div>
                      {file.source_url && (
                        <div className="text-sm text-muted-foreground">
                          Source: {new URL(file.source_url).hostname}
                        </div>
                      )}
                      {file.extracted_data && (
                        <div className="text-sm text-green-600">
                          Data extracted: {Object.keys(file.extracted_data).length} fields
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Uploaded: {formatDate(file.created_at)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredFiles.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Document Files Found</h3>
                  <p className="text-muted-foreground">
                    Upload PDF documents through the Web Data Upload Interface to see them here
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataStorageViewer;