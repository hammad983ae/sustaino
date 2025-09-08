import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const PreviousSalesHistoryAndCurrentSale = () => {
  const [includePreviousSales, setIncludePreviousSales] = useState(true);
  const [includeCurrentSale, setIncludeCurrentSale] = useState(true);
  
  // Previous Sales History state
  const [lastSaleDate, setLastSaleDate] = useState<Date>();
  const [lastSalePrice, setLastSalePrice] = useState("");
  const [saleMethod, setSaleMethod] = useState("");
  const [saleHistoryNotes, setSaleHistoryNotes] = useState("");
  
  // Current/Proposed Sale Transaction state
  const [transactionType, setTransactionType] = useState("");
  const [transactionPrice, setTransactionPrice] = useState("");
  const [marketingPeriod, setMarketingPeriod] = useState("");
  const [settlementPeriod, setSettlementPeriod] = useState("");
  const [transactionComments, setTransactionComments] = useState("");

  return (
    <div className="space-y-6">
      {/* Previous Sale History Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Previous Sale History</CardTitle>
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
        </CardHeader>
        {includePreviousSales && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <CardTitle className="text-lg">Current/Proposed Sale Transaction</CardTitle>
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
        </CardHeader>
        {includeCurrentSale && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="transaction-price">Transaction Price</Label>
                <Input
                  id="transaction-price"
                  type="number"
                  placeholder="$0"
                  value={transactionPrice}
                  onChange={(e) => setTransactionPrice(e.target.value)}
                />
              </div>

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
          <CardTitle className="text-lg">Transaction Analysis Summary</CardTitle>
          <p className="text-sm text-muted-foreground">Overall assessment of sales history and current transaction</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="market-trends">Market Trends</Label>
              <Textarea
                id="market-trends"
                placeholder="Analysis of market trends between sales..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price-variation">Price Variation Analysis</Label>
              <Textarea
                id="price-variation"
                placeholder="Analysis of price changes and factors..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transaction-reliability">Transaction Reliability</Label>
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

            <div className="space-y-2">
              <Label htmlFor="valuation-impact">Valuation Impact</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="overall-comments">Overall Comments</Label>
            <Textarea
              id="overall-comments"
              placeholder="Summary of sales history analysis and impact on valuation..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviousSalesHistoryAndCurrentSale;