import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, RefreshCw, Download, Filter, Calendar, MapPin, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SalesEvidence {
  id: string;
  property_address: string;
  sale_price: number;
  sale_date: string;
  property_type: string;
  suburb: string;
  state: string;
  postcode: string;
  data_source: string;
  bedrooms?: number;
  bathrooms?: number;
  car_spaces?: number;
  building_area?: number;
  land_area?: number;
  notes?: string;
  created_at: string;
}

interface RentalEvidence {
  id: string;
  property_address: string;
  rental_amount: number;
  lease_start_date: string;
  property_type: string;
  suburb: string;
  state: string;
  postcode: string;
  bedrooms?: number;
  bathrooms?: number;
  car_spaces?: number;
  building_area?: number;
  land_area?: number;
  source?: string;
  notes: string;
  created_at: string;
}

export const ScrapedDataViewer = () => {
  const { toast } = useToast();
  const [salesData, setSalesData] = useState<SalesEvidence[]>([]);
  const [rentalData, setRentalData] = useState<RentalEvidence[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterSuburb, setFilterSuburb] = useState("");
  const [filterPropertyType, setFilterPropertyType] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");

  const loadScrapedData = async () => {
    setIsLoading(true);
    try {
      // Load sales evidence
      const { data: sales, error: salesError } = await supabase
        .from('sales_evidence')
        .select('*')
        .contains('notes', 'Auto-scraped from RealCommercial.com.au')
        .order('created_at', { ascending: false })
        .limit(100);

      if (salesError) throw salesError;

      // Load rental evidence
      const { data: rentals, error: rentalError } = await supabase
        .from('leasing_evidence')
        .select('*')
        .contains('notes', 'Auto-scraped from RealCommercial.com.au')
        .order('created_at', { ascending: false })
        .limit(100);

      if (rentalError) throw rentalError;

      setSalesData(sales || []);
      setRentalData(rentals || []);

      toast({
        title: "Data Loaded",
        description: `Found ${(sales?.length || 0)} sales and ${(rentals?.length || 0)} rental records`,
      });

    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error Loading Data",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadScrapedData();
  }, []);

  const filteredSalesData = salesData.filter(item => {
    return (
      (!filterSuburb || item.suburb?.toLowerCase().includes(filterSuburb.toLowerCase())) &&
      (filterPropertyType === "all" || !filterPropertyType || item.property_type === filterPropertyType)
    );
  });

  const filteredRentalData = rentalData.filter(item => {
    return (
      (!filterSuburb || item.suburb?.toLowerCase().includes(filterSuburb.toLowerCase())) &&
      (filterPropertyType === "all" || !filterPropertyType || item.property_type === filterPropertyType)
    );
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU');
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast({
        title: "No Data",
        description: "No data available to export",
        variant: "destructive",
      });
      return;
    }

    const headers = Object.keys(data[0]).join(',');
    const csvContent = [
      headers,
      ...data.map(row => 
        Object.values(row).map(value => 
          typeof value === 'string' && value.includes(',') ? `"${value}"` : value
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Scraped Property Data</h2>
          <p className="text-muted-foreground">
            View and manage data extracted from commercial property websites
          </p>
        </div>
        <Button onClick={loadScrapedData} disabled={isLoading} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sales Records</p>
                <p className="text-2xl font-bold text-green-600">{salesData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rental Records</p>
                <p className="text-2xl font-bold text-blue-600">{rentalData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                <p className="text-2xl font-bold text-purple-600">{salesData.length + rentalData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="suburb-filter">Suburb</Label>
              <Input
                id="suburb-filter"
                placeholder="Enter suburb name"
                value={filterSuburb}
                onChange={(e) => setFilterSuburb(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-type-filter">Property Type</Label>
              <Select value={filterPropertyType} onValueChange={setFilterPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="All property types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="showroom">Showroom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sort-by">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at">Date Added</SelectItem>
                  <SelectItem value="sale_price">Sale Price</SelectItem>
                  <SelectItem value="rental_amount">Rental Amount</SelectItem>
                  <SelectItem value="suburb">Suburb</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Tables */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sales">
            Sales Data ({filteredSalesData.length})
          </TabsTrigger>
          <TabsTrigger value="rentals">
            Rental Data ({filteredRentalData.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sales Evidence</CardTitle>
                  <CardDescription>
                    Property sales data scraped from commercial property websites
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => exportToCSV(filteredSalesData, 'sales_evidence')}
                  variant="outline"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Address</TableHead>
                      <TableHead>Sale Price</TableHead>
                      <TableHead>Sale Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSalesData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.property_address}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {formatCurrency(item.sale_price)}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(item.sale_date)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {item.property_type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.suburb}, {item.state} {item.postcode}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {item.bedrooms && `${item.bedrooms}bed`}
                            {item.bathrooms && ` ${item.bathrooms}bath`}
                            {item.car_spaces && ` ${item.car_spaces}car`}
                            {item.building_area && ` ${item.building_area}m²`}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={item.data_source} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredSalesData.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No sales data found. Try running the scraper first.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rentals">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Rental Evidence</CardTitle>
                  <CardDescription>
                    Property rental data scraped from commercial property websites
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => exportToCSV(filteredRentalData, 'rental_evidence')}
                  variant="outline"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Address</TableHead>
                      <TableHead>Rental Amount</TableHead>
                      <TableHead>Lease Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRentalData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.property_address}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {formatCurrency(item.rental_amount)}/month
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(item.lease_start_date)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {item.property_type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.suburb}, {item.state} {item.postcode}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {item.bedrooms && `${item.bedrooms}bed`}
                            {item.bathrooms && ` ${item.bathrooms}bath`}
                            {item.car_spaces && ` ${item.car_spaces}car`}
                            {item.building_area && ` ${item.building_area}m²`}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={item.source} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredRentalData.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No rental data found. Try running the scraper first.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};