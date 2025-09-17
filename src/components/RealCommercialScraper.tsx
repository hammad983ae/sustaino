import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Download, Database, Target, Zap, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ScrapingStats {
  total_found: number;
  total_saved: number;
  errors: string[];
  summary: {
    for_sale: number;
    sold: number;
    for_lease: number;
    leased: number;
  };
}

export const RealCommercialScraper = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ScrapingStats | null>(null);
  
  // Bulk scraping form state
  const [location, setLocation] = useState("australia");
  const [maxPages, setMaxPages] = useState(10);
  const [selectedListingTypes, setSelectedListingTypes] = useState<string[]>([
    "for-sale", "sold", "for-lease", "leased"
  ]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  
  // Single property form state
  const [singlePropertyUrl, setSinglePropertyUrl] = useState("");

  const listingTypes = [
    { id: "for-sale", label: "For Sale", description: "Currently listed for sale" },
    { id: "sold", label: "Sold", description: "Recently sold properties" },
    { id: "for-lease", label: "For Lease", description: "Currently available for lease" },
    { id: "leased", label: "Leased", description: "Recently leased properties" }
  ];

  const propertyTypes = [
    "office", "retail", "warehouse", "industrial", "medical", 
    "hotel", "development", "investment", "land", "showroom"
  ];

  const australianLocations = [
    "australia", "sydney-nsw", "melbourne-vic", "brisbane-qld", 
    "perth-wa", "adelaide-sa", "canberra-act", "hobart-tas", "darwin-nt"
  ];

  const handleBulkScrape = async () => {
    if (selectedListingTypes.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one listing type",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setResults(null);

    try {
      const response = await supabase.functions.invoke('realcommercial-scraper', {
        body: {
          operation: "bulk_scrape",
          location,
          property_types: selectedPropertyTypes,
          listing_types: selectedListingTypes,
          max_pages: maxPages
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const data = response.data;
      setResults(data);
      setProgress(100);

      toast({
        title: "Bulk Scraping Complete! 🚀",
        description: `Found ${data.total_found} properties, saved ${data.total_saved} to database`,
      });

    } catch (error) {
      console.error("Bulk scraping error:", error);
      toast({
        title: "Scraping Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSinglePropertyScrape = async () => {
    if (!singlePropertyUrl.includes("realcommercial.com.au")) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid RealCommercial.com.au property URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);

    try {
      const response = await supabase.functions.invoke('realcommercial-scraper', {
        body: {
          operation: "single_property",
          url: singlePropertyUrl
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      setProgress(100);
      toast({
        title: "Property Scraped! ✅",
        description: `Successfully scraped: ${response.data.property.address}`,
      });

      setSinglePropertyUrl("");

    } catch (error) {
      console.error("Single property scraping error:", error);
      toast({
        title: "Scraping Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleListingTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedListingTypes([...selectedListingTypes, typeId]);
    } else {
      setSelectedListingTypes(selectedListingTypes.filter(id => id !== typeId));
    }
  };

  const handlePropertyTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedPropertyTypes([...selectedPropertyTypes, typeId]);
    } else {
      setSelectedPropertyTypes(selectedPropertyTypes.filter(id => id !== typeId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Target className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Commercial Property Data Scraper
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          World-class web scraper designed to dominate RP Data. Automatically extract sales, leases, 
          and property data at scale from Australia's largest commercial property platform.
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Database className="h-3 w-3 mr-1" />
            Auto-Database Save
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Zap className="h-3 w-3 mr-1" />
            AI-Enhanced Extraction
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <TrendingUp className="h-3 w-3 mr-1" />
            Commercial Focus
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      {isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scraping in progress...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {results && (
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Download className="h-5 w-5" />
              Scraping Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{results.total_found}</div>
                <div className="text-sm text-muted-foreground">Properties Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{results.total_saved}</div>
                <div className="text-sm text-muted-foreground">Saved to Database</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((results.total_saved / Math.max(results.total_found, 1)) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{results.errors.length}</div>
                <div className="text-sm text-muted-foreground">Errors</div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h4 className="font-semibold">Breakdown by Type:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Badge variant="outline">For Sale: {results.summary.for_sale}</Badge>
                <Badge variant="outline">Sold: {results.summary.sold}</Badge>
                <Badge variant="outline">For Lease: {results.summary.for_lease}</Badge>
                <Badge variant="outline">Leased: {results.summary.leased}</Badge>
              </div>
            </div>

            {results.errors.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 text-orange-600 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">Errors Encountered:</span>
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {results.errors.map((error, index) => (
                    <div key={index} className="text-sm text-orange-700 bg-orange-50 p-2 rounded">
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Main Scraping Interface */}
      <Tabs defaultValue="bulk" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bulk">Bulk Scraping</TabsTrigger>
          <TabsTrigger value="single">Single Property</TabsTrigger>
        </TabsList>

        {/* Bulk Scraping Tab */}
        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Property Scraping</CardTitle>
              <CardDescription>
                Scrape thousands of properties from commercial property websites automatically. 
                Configure your search parameters below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location Selection */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {australianLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc.replace("-", " - ").toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Listing Types */}
              <div className="space-y-3">
                <Label>Listing Types to Scrape</Label>
                <div className="grid grid-cols-2 gap-3">
                  {listingTypes.map((type) => (
                    <div key={type.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={selectedListingTypes.includes(type.id)}
                        onCheckedChange={(checked) => 
                          handleListingTypeChange(type.id, checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={type.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type.label}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Types */}
              <div className="space-y-3">
                <Label>Property Types (Optional - leave empty for all types)</Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {propertyTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={selectedPropertyTypes.includes(type)}
                        onCheckedChange={(checked) => 
                          handlePropertyTypeChange(type, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={type}
                        className="text-sm capitalize cursor-pointer"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Max Pages */}
              <div className="space-y-2">
                <Label htmlFor="maxPages">Maximum Pages to Scrape</Label>
                <Input
                  id="maxPages"
                  type="number"
                  min="1"
                  max="100"
                  value={maxPages}
                  onChange={(e) => setMaxPages(parseInt(e.target.value) || 10)}
                  className="w-32"
                />
                <p className="text-xs text-muted-foreground">
                  Each page contains ~20-30 properties. Recommended: 10-50 pages.
                </p>
              </div>

              <Button 
                onClick={handleBulkScrape} 
                disabled={isLoading || selectedListingTypes.length === 0}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>Scraping {selectedListingTypes.length} Listing Types...</>
                ) : (
                  <>🚀 Start Bulk Scraping</>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Single Property Tab */}
        <TabsContent value="single">
          <Card>
            <CardHeader>
              <CardTitle>Single Property Scraping</CardTitle>
              <CardDescription>
                Extract detailed data from a specific commercial property listing URL.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="propertyUrl">Property URL</Label>
                <Input
                  id="propertyUrl"
                  type="url"
                  placeholder="https://www.realcommercial.com.au/property/..."
                  value={singlePropertyUrl}
                  onChange={(e) => setSinglePropertyUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Paste any commercial property listing URL for detailed extraction.
                </p>
              </div>

              <Button 
                onClick={handleSinglePropertyScrape} 
                disabled={isLoading || !singlePropertyUrl.includes("realcommercial.com.au")}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Extracting Property Data..." : "🎯 Scrape Property"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Performance Stats */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Why This Scraper Beats RP Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Commercial Focus</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">Real-Time</div>
              <div className="text-sm text-muted-foreground">Fresh Data</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">AI-Enhanced</div>
              <div className="text-sm text-muted-foreground">Smart Extraction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};