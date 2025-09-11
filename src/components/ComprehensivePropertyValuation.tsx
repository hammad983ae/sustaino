import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, FileText, Calculator, TrendingUp, Home, ArrowLeft } from "lucide-react";
import PropertyDetails from "./PropertyDetails";
import ValuationAnalysis from "./ValuationAnalysis";
import SalesEvidence from "./SalesEvidence";
import MarketCommentary from "./MarketCommentary";
import ValuationCertificate from "./ValuationCertificate";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

const steps = [
  { id: "property", title: "Property Details", icon: Home, description: "Basic property information" },
  { id: "analysis", title: "Valuation Analysis", icon: Calculator, description: "Detailed valuation methods" },
  { id: "evidence", title: "Sales Evidence", icon: TrendingUp, description: "Comparable sales data" },
  { id: "market", title: "Market Commentary", icon: FileText, description: "Market conditions and factors" },
  { id: "certificate", title: "Valuation Certificate", icon: CheckCircle, description: "Final valuation report" }
];

interface CompletedSections {
  property: boolean;
  analysis: boolean;
  evidence: boolean;
  market: boolean;
  certificate: boolean;
}

export default function ComprehensivePropertyValuation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("property");
  const [completedSections, setCompletedSections] = useState<CompletedSections>({
    property: false,
    analysis: false,
    evidence: false,
    market: false,
    certificate: false
  });
  const [valuationData, setValuationData] = useState({
    propertyAddress: "",
    propertyType: "",
    estimatedValue: 0,
    methodology: "",
    confidenceScore: 0,
    notes: ""
  });
  const { toast } = useToast();

  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep);
  const progress = (Object.values(completedSections).filter(Boolean).length / steps.length) * 100;

  const markSectionComplete = (sectionId: string) => {
    setCompletedSections(prev => ({ ...prev, [sectionId]: true }));
  };

  const handleNextStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const saveValuation = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to save the valuation",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('valuations')
        .insert({
          property_id: '', // Will need to be set based on selected property
          market_value: valuationData.estimatedValue,
          valuation_type: "comprehensive",
          valuation_purpose: "market_valuation",
          methodology: valuationData.methodology,
          assumptions: valuationData.notes, // Map notes to assumptions field
          status: "completed",
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Valuation saved successfully",
        description: "Your comprehensive valuation has been saved to the database"
      });
    } catch (error) {
      console.error('Error saving valuation:', error);
      toast({
        title: "Error saving valuation",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 max-w-7xl">
        {/* Back to Dashboard */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Comprehensive Property Valuation</h1>
          <p className="text-muted-foreground">Complete professional property valuation workflow</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Valuation Progress</CardTitle>
              <Badge variant="secondary">{Math.round(progress)}% Complete</Badge>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
        </Card>

        {/* Steps Navigation */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = completedSections[step.id as keyof CompletedSections];
                const isCurrent = currentStep === step.id;
                
                return (
                  <Button
                    key={step.id}
                    variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
                    className="flex-1 min-w-[200px] h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div className="flex items-center gap-2">
                      <StepIcon className="h-5 w-5" />
                      {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{step.title}</div>
                      <div className="text-xs opacity-70">{step.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
          <TabsContent value="property" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PropertyDetails />
                <div className="flex justify-between mt-6">
                  <Button variant="outline" disabled>Previous</Button>
                  <Button onClick={() => {
                    markSectionComplete("property");
                    handleNextStep();
                  }}>
                    Continue to Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Valuation Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ValuationAnalysis />
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevStep}>Previous</Button>
                  <Button onClick={() => {
                    markSectionComplete("analysis");
                    handleNextStep();
                  }}>
                    Continue to Evidence
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evidence" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Sales Evidence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SalesEvidence />
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevStep}>Previous</Button>
                  <Button onClick={() => {
                    markSectionComplete("evidence");
                    handleNextStep();
                  }}>
                    Continue to Market Commentary
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Market Commentary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MarketCommentary />
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevStep}>Previous</Button>
                  <Button onClick={() => {
                    markSectionComplete("market");
                    handleNextStep();
                  }}>
                    Generate Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificate" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Valuation Certificate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ValuationCertificate />
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevStep}>Previous</Button>
                  <Button onClick={() => {
                    markSectionComplete("certificate");
                    saveValuation();
                  }} className="bg-green-600 hover:bg-green-700">
                    Complete & Save Valuation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}