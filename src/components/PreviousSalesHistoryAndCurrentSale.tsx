import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Upload, Database, Calculator, TrendingUp, FileText, RefreshCw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PreviousSalesHistoryAndCurrentSale = () => {
  const { toast } = useToast();
  const [includePreviousSales, setIncludePreviousSales] = useState(true);
  const [includeCurrentSale, setIncludeCurrentSale] = useState(true);
  
  // PAF Integration & Auto-population
  const [pafDataLoading, setPafDataLoading] = useState(false);
  const [rpDataLoading, setRpDataLoading] = useState(false);
  const [pafDataAvailable, setPafDataAvailable] = useState(false);
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [contractUploaded, setContractUploaded] = useState(false);
  
  // Previous Sales History state
  const [lastSaleDate, setLastSaleDate] = useState<Date>();
  const [lastSalePrice, setLastSalePrice] = useState("");
  const [saleMethod, setSaleMethod] = useState("");
  const [saleHistoryNotes, setSaleHistoryNotes] = useState("");
  
  // Enhanced analytics
  const [priceIncrease, setPriceIncrease] = useState<number | null>(null);
  const [annualizedReturn, setAnnualizedReturn] = useState<number | null>(null);
  const [marketComparison, setMarketComparison] = useState<string>("");
  
  // Current/Proposed Sale Transaction state
  const [transactionType, setTransactionType] = useState("");
  const [transactionPrice, setTransactionPrice] = useState("");
  const [marketingPeriod, setMarketingPeriod] = useState("");
  const [settlementPeriod, setSettlementPeriod] = useState("");
  const [transactionComments, setTransactionComments] = useState("");
  const [currentTransactionDate, setCurrentTransactionDate] = useState<Date>();
  const [currentSaleMethod, setCurrentSaleMethod] = useState("");
  
  // Transaction Analysis dates
  const [transactionDate, setTransactionDate] = useState<Date>();
  const [valuationDate, setValuationDate] = useState<Date>();
  
  // Transaction Analysis Summary state
  const [includeTransactionAnalysis, setIncludeTransactionAnalysis] = useState(true);
  const [includeTransactionDate, setIncludeTransactionDate] = useState(true);
  const [includeValuationDate, setIncludeValuationDate] = useState(true);
  const [includeMarketTrends, setIncludeMarketTrends] = useState(true);
  const [includePriceVariation, setIncludePriceVariation] = useState(true);
  const [includeTransactionReliability, setIncludeTransactionReliability] = useState(true);
  const [includeValuationImpact, setIncludeValuationImpact] = useState(true);
  const [includeOverallComments, setIncludeOverallComments] = useState(true);

  // Auto-populate from PAF/RP Data
  const fetchPAFData = async () => {
    setPafDataLoading(true);
    try {
      // Simulate PAF integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPafDataAvailable(true);
      toast({
        title: "PAF Data Retrieved",
        description: "Previous sales history populated from Property and Floorplan database",
      });
    } catch (error) {
      toast({
        title: "PAF Integration Error",
        description: "Unable to retrieve property data",
        variant: "destructive",
      });
    } finally {
      setPafDataLoading(false);
    }
  };

  const fetchRPData = async () => {
    setRpDataLoading(true);
    try {
      // Simulate RP Data integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLastSaleDate(new Date('2021-03-15'));
      setLastSalePrice("1250000");
      setSaleMethod("private-treaty");
      toast({
        title: "RP Data Retrieved",
        description: "Sales history populated from RP Data",
      });
    } catch (error) {
      toast({
        title: "RP Data Error",
        description: "Unable to retrieve RP Data",
        variant: "destructive",
      });
    } finally {
      setRpDataLoading(false);
    }
  };

  // OCR Contract Processing
  const processContractOCR = async (file: File) => {
    setOcrProcessing(true);
    try {
      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      setTransactionPrice("1450000");
      setCurrentTransactionDate(new Date());
      setMarketingPeriod("4 weeks");
      setSettlementPeriod("45 days");
      setContractUploaded(true);
      
      toast({
        title: "Contract Processed",
        description: "Sale details extracted via OCR",
      });
    } catch (error) {
      toast({
        title: "OCR Processing Error",
        description: "Unable to process contract",
        variant: "destructive",
      });
    } finally {
      setOcrProcessing(false);
    }
  };

  // Calculate analytics
  useEffect(() => {
    if (lastSalePrice && transactionPrice && lastSaleDate && currentTransactionDate) {
      const previousPrice = parseFloat(lastSalePrice);
      const currentPrice = parseFloat(transactionPrice);
      const yearsDiff = (currentTransactionDate.getTime() - lastSaleDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      
      if (previousPrice > 0 && currentPrice > 0 && yearsDiff > 0) {
        const increase = ((currentPrice - previousPrice) / previousPrice) * 100;
        const annualized = Math.pow(currentPrice / previousPrice, 1 / yearsDiff) - 1;
        
        setPriceIncrease(increase);
        setAnnualizedReturn(annualized * 100);
      }
    }
  }, [lastSalePrice, transactionPrice, lastSaleDate, currentTransactionDate]);

  return (
    <div className="space-y-6">
      {/* Previous Sale History Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              Previous Sale History
              {pafDataAvailable && <Badge variant="secondary">PAF Data</Badge>}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-previous-sales">Include</Label>
              <Switch
                id="include-previous-sales"
                checked={includePreviousSales}
                onCheckedChange={setIncludePreviousSales}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Historical sales information for the property</p>
          
          {/* Data Integration Controls */}
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchPAFData}
              disabled={pafDataLoading}
            >
              {pafDataLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Database className="h-4 w-4 mr-2" />
              )}
              Load PAF Data
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchRPData}
              disabled={rpDataLoading}
            >
              {rpDataLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Database className="h-4 w-4 mr-2" />
              )}
              Load RP Data
            </Button>
          </div>
          
          {(pafDataLoading || rpDataLoading) && (
            <div className="mt-2">
              <Progress value={pafDataLoading ? 60 : 80} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {pafDataLoading ? "Retrieving PAF data..." : "Loading RP Data..."}
              </p>
            </div>
          )}
        </CardHeader>
        {includePreviousSales && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="last-sale-date">Last Sale Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !lastSaleDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {lastSaleDate ? format(lastSaleDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={lastSaleDate}
                      onSelect={setLastSaleDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="last-sale-price">Last Sale Price</Label>
                <Input
                  id="last-sale-price"
                  type="number"
                  placeholder="$0"
                  value={lastSalePrice}
                  onChange={(e) => setLastSalePrice(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sale-method">Sale Method</Label>
              <Select value={saleMethod} onValueChange={setSaleMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private-treaty">Private Treaty</SelectItem>
                  <SelectItem value="auction">Auction</SelectItem>
                  <SelectItem value="tender">Tender</SelectItem>
                  <SelectItem value="expression-of-interest">Expression of Interest</SelectItem>
                  <SelectItem value="off-market">Off Market</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sale-history-notes">Sale History Notes</Label>
              <Textarea
                id="sale-history-notes"
                placeholder="Additional information about previous sales..."
                rows={4}
                value={saleHistoryNotes}
                onChange={(e) => setSaleHistoryNotes(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Supporting Documents</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-8">
                <div className="text-center space-y-2">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Upload contracts of sale and other documents</p>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Current/Proposed Sale Transaction Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              Current/Proposed Sale Transaction
              {contractUploaded && <Badge variant="secondary">Contract Processed</Badge>}
              {ocrProcessing && <Badge variant="outline">Processing OCR...</Badge>}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-current-sale">Include</Label>
              <Switch
                id="include-current-sale"
                checked={includeCurrentSale}
                onCheckedChange={setIncludeCurrentSale}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Details of current or proposed sale</p>
          
          {/* Contract Upload Section */}
          {includeCurrentSale && (
            <div className="mt-4 p-4 border border-dashed rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Contract of Sale Required</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Upload contract for automatic data extraction via OCR
              </p>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(e) => e.target.files?.[0] && processContractOCR(e.target.files[0])}
                className="text-sm"
              />
              {ocrProcessing && (
                <div className="mt-2">
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Processing contract...</p>
                </div>
              )}
            </div>
          )}
        </CardHeader>
        {includeCurrentSale && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transaction-type">Transaction Type</Label>
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">Sale</SelectItem>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="refinance">Refinance</SelectItem>
                    <SelectItem value="mortgage-security">Mortgage Security</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="family-law">Family Law</SelectItem>
                    <SelectItem value="probate">Probate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-transaction-date">Date of Transaction</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !currentTransactionDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentTransactionDate ? format(currentTransactionDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentTransactionDate}
                      onSelect={setCurrentTransactionDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transaction-price">Transaction Price</Label>
                <Input
                  id="transaction-price"
                  type="number"
                  placeholder="$0"
                  value={transactionPrice}
                  onChange={(e) => setTransactionPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="marketing-period">Marketing Period</Label>
                <Input
                  id="marketing-period"
                  placeholder="e.g. 6 weeks"
                  value={marketingPeriod}
                  onChange={(e) => setMarketingPeriod(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="settlement-period">Settlement Period</Label>
                <Input
                  id="settlement-period"
                  placeholder="e.g. 30 days"
                  value={settlementPeriod}
                  onChange={(e) => setSettlementPeriod(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-sale-method">Sale Method</Label>
                <Select value={currentSaleMethod} onValueChange={setCurrentSaleMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private-treaty">Private Treaty</SelectItem>
                    <SelectItem value="auction">Auction</SelectItem>
                    <SelectItem value="tender">Tender</SelectItem>
                    <SelectItem value="expression-of-interest">Expression of Interest</SelectItem>
                    <SelectItem value="off-market">Off Market</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transaction-comments">Transaction Comments</Label>
              <Textarea
                id="transaction-comments"
                placeholder="Additional transaction details..."
                rows={4}
                value={transactionComments}
                onChange={(e) => setTransactionComments(e.target.value)}
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Transaction Analysis Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Transaction Analysis Summary</CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-transaction-analysis">Include</Label>
              <Switch
                id="include-transaction-analysis"
                checked={includeTransactionAnalysis}
                onCheckedChange={setIncludeTransactionAnalysis}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Overall assessment of sales history and current transaction</p>
        </CardHeader>
        {includeTransactionAnalysis && (
          <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {includeTransactionDate && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="transaction-date">Date of Transaction</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="include-transaction-date" className="text-xs">Include</Label>
                    <Switch
                      id="include-transaction-date"
                      checked={includeTransactionDate}
                      onCheckedChange={setIncludeTransactionDate}
                    />
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !transactionDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {transactionDate ? format(transactionDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={transactionDate}
                      onSelect={setTransactionDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {includeValuationDate && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="valuation-date">Date of Valuation</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="include-valuation-date" className="text-xs">Include</Label>
                    <Switch
                      id="include-valuation-date"
                      checked={includeValuationDate}
                      onCheckedChange={setIncludeValuationDate}
                    />
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !valuationDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {valuationDate ? format(valuationDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={valuationDate}
                      onSelect={setValuationDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {includeMarketTrends && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="market-trends">Market Trends</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="include-market-trends" className="text-xs">Include</Label>
                    <Switch
                      id="include-market-trends"
                      checked={includeMarketTrends}
                      onCheckedChange={setIncludeMarketTrends}
                    />
                  </div>
                </div>
                <Textarea
                  id="market-trends"
                  placeholder="Analysis of market trends between sales..."
                  rows={3}
                />
              </div>
            )}

            {includePriceVariation && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="price-variation">Price Variation Analysis</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="include-price-variation" className="text-xs">Include</Label>
                    <Switch
                      id="include-price-variation"
                      checked={includePriceVariation}
                      onCheckedChange={setIncludePriceVariation}
                    />
                  </div>
                </div>
                <Textarea
                  id="price-variation"
                  placeholder="Analysis of price changes and factors..."
                  rows={3}
                />
              </div>
            )}

            {includeTransactionReliability && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="transaction-reliability">Transaction Reliability</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="include-transaction-reliability" className="text-xs">Include</Label>
                    <Switch
                      id="include-transaction-reliability"
                      checked={includeTransactionReliability}
                      onCheckedChange={setIncludeTransactionReliability}
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reliability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High - Arms length transaction</SelectItem>
                    <SelectItem value="medium">Medium - Some constraints</SelectItem>
                    <SelectItem value="low">Low - Special circumstances</SelectItem>
                    <SelectItem value="na">N/A - No recent sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {includeValuationImpact && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="valuation-impact">Valuation Impact</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="include-valuation-impact" className="text-xs">Include</Label>
                    <Switch
                      id="include-valuation-impact"
                      checked={includeValuationImpact}
                      onCheckedChange={setIncludeValuationImpact}
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select impact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive - Supports valuation</SelectItem>
                    <SelectItem value="neutral">Neutral - Limited impact</SelectItem>
                    <SelectItem value="negative">Negative - Requires adjustment</SelectItem>
                    <SelectItem value="inconclusive">Inconclusive - Insufficient data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {includeOverallComments && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="overall-comments">Overall Comments</Label>
                <div className="flex items-center gap-2">
                  <Label htmlFor="include-overall-comments" className="text-xs">Include</Label>
                  <Switch
                    id="include-overall-comments"
                    checked={includeOverallComments}
                    onCheckedChange={setIncludeOverallComments}
                  />
                </div>
              </div>
              <Textarea
                id="overall-comments"
                placeholder="Summary of sales history analysis and impact on valuation..."
                rows={4}
              />
            </div>
          )}

          {/* Enhanced Analytics Section */}
          {priceIncrease !== null && annualizedReturn !== null && (
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-4 w-4" />
                <span className="font-medium">Performance Analytics</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {priceIncrease > 0 ? '+' : ''}{priceIncrease.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Total Price Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {annualizedReturn > 0 ? '+' : ''}{annualizedReturn.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Annualized Return</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <Badge variant={priceIncrease > 5 ? "default" : "secondary"}>
                      {priceIncrease > 5 ? "Outperforming" : "Market Rate"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Market Comparison</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        )}
      </Card>
    </div>
  );
};

export default PreviousSalesHistoryAndCurrentSale;