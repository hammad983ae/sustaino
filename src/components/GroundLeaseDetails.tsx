import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Building, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface GroundLeaseDetailsProps {
  isVisible: boolean;
  data: any;
  onChange: (data: any) => void;
}

const GroundLeaseDetails: React.FC<GroundLeaseDetailsProps> = ({ isVisible, data, onChange }) => {
  const [includeGroundLease, setIncludeGroundLease] = useState(false);
  const [leaseCommencementDate, setLeaseCommencementDate] = useState<Date>();
  const [leaseExpiryDate, setLeaseExpiryDate] = useState<Date>();
  const [nextReviewDate, setNextReviewDate] = useState<Date>();

  if (!isVisible) return null;

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-purple-200/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg text-purple-800">
          <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
            <Building className="h-5 w-5" />
          </div>
          Tenancy Schedule/Lease Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Ground Lease Toggle */}
        <div className="flex items-center justify-between p-4 bg-orange-50/50 rounded-lg border border-orange-200/50">
          <div className="flex items-center gap-3">
            <Building className="h-5 w-5 text-orange-600" />
            <div>
              <Label className="text-sm font-medium text-orange-800">Ground Lease</Label>
              <p className="text-xs text-orange-600">Include ground lease details in valuation</p>
            </div>
          </div>
          <Switch 
            checked={includeGroundLease} 
            onCheckedChange={setIncludeGroundLease}
            className="data-[state=checked]:bg-orange-500"
          />
        </div>

        {includeGroundLease && (
          <div className="space-y-6 p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
            {/* Lease Type and Term */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lease-type" className="text-sm font-medium">Lease Type</Label>
                <Select>
                  <SelectTrigger className="mt-1 bg-white border-gray-300">
                    <SelectValue placeholder="Select lease type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                    <SelectItem value="ground">Ground Lease</SelectItem>
                    <SelectItem value="commercial">Commercial Lease</SelectItem>
                    <SelectItem value="residential">Residential Lease</SelectItem>
                    <SelectItem value="retail">Retail Lease</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="lease-term" className="text-sm font-medium">Lease Term (Years)</Label>
                <Input 
                  id="lease-term"
                  type="number"
                  placeholder="Enter lease term"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Annual Ground Rent and Review Period */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="annual-ground-rent" className="text-sm font-medium">Annual Ground Rent ($)</Label>
                <Input 
                  id="annual-ground-rent"
                  type="number"
                  placeholder="Enter annual ground rent"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="review-period" className="text-sm font-medium">Review Period (Years)</Label>
                <Input 
                  id="review-period"
                  type="number"
                  placeholder="Enter review period"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Lease Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium">Lease Commencement Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1 bg-white",
                        !leaseCommencementDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {leaseCommencementDate ? format(leaseCommencementDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border shadow-lg z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={leaseCommencementDate}
                      onSelect={setLeaseCommencementDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Lease Expiry Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1 bg-white",
                        !leaseExpiryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {leaseExpiryDate ? format(leaseExpiryDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border shadow-lg z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={leaseExpiryDate}
                      onSelect={setLeaseExpiryDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-sm font-medium">Next Review Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1 bg-white",
                        !nextReviewDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {nextReviewDate ? format(nextReviewDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border shadow-lg z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={nextReviewDate}
                      onSelect={setNextReviewDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Review Method */}
            <div>
              <Label className="text-sm font-medium">Review Method</Label>
              <Select>
                <SelectTrigger className="mt-1 bg-white border-gray-300">
                  <SelectValue placeholder="Select review method" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  <SelectItem value="market">Market Review</SelectItem>
                  <SelectItem value="cpi">CPI Review</SelectItem>
                  <SelectItem value="fixed">Fixed Percentage</SelectItem>
                  <SelectItem value="combination">Combination</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lease Options */}
            <div>
              <Label className="text-sm font-medium">Lease Options</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="option-renew" className="rounded" />
                  <Label htmlFor="option-renew" className="text-sm">Option to Renew</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="option-purchase" className="rounded" />
                  <Label htmlFor="option-purchase" className="text-sm">Option to Purchase</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="surrender-clause" className="rounded" />
                  <Label htmlFor="surrender-clause" className="text-sm">Surrender Clause</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="break-clause" className="rounded" />
                  <Label htmlFor="break-clause" className="text-sm">Break Clause</Label>
                </div>
              </div>
            </div>

            {/* Permitted Use */}
            <div>
              <Label htmlFor="permitted-use" className="text-sm font-medium">Permitted Use</Label>
              <Textarea 
                id="permitted-use"
                placeholder="Describe the permitted use under the lease..."
                className="mt-1 bg-white"
                rows={3}
              />
            </div>

            {/* Restrictions & Covenants */}
            <div>
              <Label htmlFor="restrictions-covenants" className="text-sm font-medium">Restrictions & Covenants</Label>
              <Textarea 
                id="restrictions-covenants"
                placeholder="Detail any restrictions and covenants..."
                className="mt-1 bg-white"
                rows={3}
              />
            </div>

            {/* Impact on Valuation */}
            <div>
              <Label htmlFor="impact-valuation" className="text-sm font-medium">Impact on Valuation</Label>
              <Textarea 
                id="impact-valuation"
                placeholder="Explain how the ground lease impacts the valuation..."
                className="mt-1 bg-white"
                rows={3}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroundLeaseDetails;