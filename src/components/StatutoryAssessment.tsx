import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

const StatutoryAssessment = () => {
  const [assessmentDate, setAssessmentDate] = useState<Date>();

  return (
    <div className="space-y-6">
      {/* Header with Include Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          <div>
            <h2 className="text-xl font-semibold">Statutory Assessment</h2>
            <p className="text-sm text-muted-foreground">Statutory valuation and assessment details</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="include-statutory" className="text-sm">Include</Label>
          <Switch id="include-statutory" defaultChecked />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* First Row - Current Statutory Value and Assessment Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="current-statutory-value">Current Statutory Value</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="current-statutory-value" 
                    placeholder="0" 
                    className="pl-9" 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="assessment-date">Assessment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full mt-1 justify-start text-left font-normal",
                        !assessmentDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {assessmentDate ? format(assessmentDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={assessmentDate}
                      onSelect={setAssessmentDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Second Row - Land Value and Capital Improved Value */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="land-value">Land Value</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="land-value" 
                    placeholder="0" 
                    className="pl-9" 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="capital-improved-value">Capital Improved Value</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="capital-improved-value" 
                    placeholder="0" 
                    className="pl-9" 
                  />
                </div>
              </div>
            </div>

            {/* Third Row - Annual Rates and Assessing Authority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="annual-rates">Annual Rates</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="annual-rates" 
                    placeholder="0" 
                    className="pl-9" 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="assessing-authority">Assessing Authority</Label>
                <Input 
                  id="assessing-authority" 
                  placeholder="Local Government Authority" 
                  className="mt-1" 
                />
              </div>
            </div>

            {/* Fourth Row - Land Tax and Windfall Tax */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="land-tax">Land Tax</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="land-tax" 
                    placeholder="0" 
                    className="pl-9" 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="windfall-tax">Windfall Tax (Victoria Only)</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="windfall-tax" 
                    placeholder="0" 
                    className="pl-9" 
                  />
                </div>
              </div>
            </div>

            {/* Fifth Row - Stamp Duty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stamp-duty">Stamp Duty</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="stamp-duty" 
                    placeholder="0" 
                    className="pl-9" 
                  />
                </div>
              </div>
              <div></div>
            </div>

            {/* Assessment Notes */}
            <div>
              <Label htmlFor="assessment-notes">Assessment Notes</Label>
              <Textarea 
                id="assessment-notes"
                placeholder="Additional statutory assessment information..."
                className="mt-1 h-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatutoryAssessment;