import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, Shield, Users, DollarSign } from 'lucide-react';

interface PerformanceMetrics {
  mortgageLending: {
    loanVolume: number;
    defaultRate: number;
    processingTime: number;
    customerSatisfaction: number;
    complianceScore: number;
  };
  valuation: {
    accuracyRate: number;
    turnaroundTime: number;
    marketKnowledge: number;
    clientRetention: number;
    professionalStanding: number;
    underValuedProperties: number;
    overValuedProperties: number;
  };
  estateAgents: {
    salesVolume: number;
    daysOnMarket: number;
    listingAccuracy: number;
    clientSatisfaction: number;
    marketShare: number;
    discountedAdvertisedPrice: number;
    overQuoted: number;
  };
  developers: {
    projectCompletionRate: number;
    budgetAdherence: number;
    timelineCompliance: number;
    qualityScore: number;
    sustainabilityRating: number;
  };
}

const INDUSTRY_BENCHMARKS = {
  mortgageLending: {
    excellent: { loanVolume: 50000000, defaultRate: 1, processingTime: 14, customerSatisfaction: 9, complianceScore: 95 },
    good: { loanVolume: 25000000, defaultRate: 2.5, processingTime: 21, customerSatisfaction: 8, complianceScore: 85 },
    average: { loanVolume: 10000000, defaultRate: 4, processingTime: 30, customerSatisfaction: 7, complianceScore: 75 },
  },
  valuation: {
    excellent: { accuracyRate: 98, turnaroundTime: 3, marketKnowledge: 9, clientRetention: 95, professionalStanding: 9, underValuedProperties: 2, overValuedProperties: 2 },
    good: { accuracyRate: 95, turnaroundTime: 5, marketKnowledge: 8, clientRetention: 85, professionalStanding: 8, underValuedProperties: 5, overValuedProperties: 5 },
    average: { accuracyRate: 92, turnaroundTime: 7, marketKnowledge: 7, clientRetention: 75, professionalStanding: 7, underValuedProperties: 8, overValuedProperties: 8 },
  },
  estateAgents: {
    excellent: { salesVolume: 20000000, daysOnMarket: 25, listingAccuracy: 98, clientSatisfaction: 9, marketShare: 15, discountedAdvertisedPrice: 2, overQuoted: 3 },
    good: { salesVolume: 10000000, daysOnMarket: 35, listingAccuracy: 95, clientSatisfaction: 8, marketShare: 10, discountedAdvertisedPrice: 5, overQuoted: 7 },
    average: { salesVolume: 5000000, daysOnMarket: 50, listingAccuracy: 90, clientSatisfaction: 7, marketShare: 5, discountedAdvertisedPrice: 8, overQuoted: 12 },
  },
  developers: {
    excellent: { projectCompletionRate: 98, budgetAdherence: 95, timelineCompliance: 95, qualityScore: 9, sustainabilityRating: 9 },
    good: { projectCompletionRate: 92, budgetAdherence: 90, timelineCompliance: 88, qualityScore: 8, sustainabilityRating: 7 },
    average: { projectCompletionRate: 85, budgetAdherence: 80, timelineCompliance: 75, qualityScore: 7, sustainabilityRating: 6 },
  },
};

export const PerformanceRatingSystem: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    mortgageLending: { loanVolume: 0, defaultRate: 0, processingTime: 0, customerSatisfaction: 0, complianceScore: 0 },
    valuation: { accuracyRate: 0, turnaroundTime: 0, marketKnowledge: 0, clientRetention: 0, professionalStanding: 0, underValuedProperties: 0, overValuedProperties: 0 },
    estateAgents: { salesVolume: 0, daysOnMarket: 0, listingAccuracy: 0, clientSatisfaction: 0, marketShare: 0, discountedAdvertisedPrice: 0, overQuoted: 0 },
    developers: { projectCompletionRate: 0, budgetAdherence: 0, timelineCompliance: 0, qualityScore: 0, sustainabilityRating: 0 },
  });

  const calculateRating = (value: number, benchmarks: any, field: string, inverse: boolean = false) => {
    const excellent = benchmarks.excellent[field];
    const good = benchmarks.good[field];
    const average = benchmarks.average[field];

    if (inverse) {
      if (value <= excellent) return { rating: 'Excellent', score: 95, color: 'bg-green-500' };
      if (value <= good) return { rating: 'Good', score: 80, color: 'bg-blue-500' };
      if (value <= average) return { rating: 'Average', score: 65, color: 'bg-yellow-500' };
      return { rating: 'Below Average', score: 40, color: 'bg-red-500' };
    } else {
      if (value >= excellent) return { rating: 'Excellent', score: 95, color: 'bg-green-500' };
      if (value >= good) return { rating: 'Good', score: 80, color: 'bg-blue-500' };
      if (value >= average) return { rating: 'Average', score: 65, color: 'bg-yellow-500' };
      return { rating: 'Below Average', score: 40, color: 'bg-red-500' };
    }
  };

  const calculateOverallScore = (categoryMetrics: any, benchmarks: any, inverseFields: string[] = []) => {
    const scores = Object.entries(categoryMetrics).map(([field, value]) => {
      const isInverse = inverseFields.includes(field);
      return calculateRating(value as number, benchmarks, field, isInverse).score;
    });
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  const MetricCard = ({ title, value, benchmark, field, inverse = false }: any) => {
    const rating = calculateRating(value, benchmark, field, inverse);
    return (
      <div className="p-4 border rounded-lg space-y-2">
        <div className="flex justify-between items-center">
          <Label className="font-medium">{title}</Label>
          <Badge variant="outline" className={`${rating.color} text-white`}>
            {rating.rating}
          </Badge>
        </div>
        <Progress value={rating.score} className="h-2" />
        <div className="text-sm text-muted-foreground">
          Current: {typeof value === 'number' ? value.toLocaleString() : value} | Score: {rating.score}%
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Rating System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mortgage" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="mortgage" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Mortgage
              </TabsTrigger>
              <TabsTrigger value="valuation" className="flex items-center gap-1">
                <Calculator className="h-3 w-3" />
                Valuation
              </TabsTrigger>
              <TabsTrigger value="estate" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                Estate Agents
              </TabsTrigger>
              <TabsTrigger value="developers" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Developers
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Financial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mortgage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Mortgage Lending Performance
                    <Badge variant="outline">
                      Overall Score: {calculateOverallScore(metrics.mortgageLending, INDUSTRY_BENCHMARKS.mortgageLending, ['defaultRate', 'processingTime'])}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Loan Volume ($)</Label>
                      <Input
                        type="number"
                        value={metrics.mortgageLending.loanVolume}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          mortgageLending: { ...prev.mortgageLending, loanVolume: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Default Rate (%)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={metrics.mortgageLending.defaultRate}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          mortgageLending: { ...prev.mortgageLending, defaultRate: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Processing Time (days)</Label>
                      <Input
                        type="number"
                        value={metrics.mortgageLending.processingTime}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          mortgageLending: { ...prev.mortgageLending, processingTime: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Customer Satisfaction (1-10)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={metrics.mortgageLending.customerSatisfaction}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          mortgageLending: { ...prev.mortgageLending, customerSatisfaction: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Compliance Score (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={metrics.mortgageLending.complianceScore}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          mortgageLending: { ...prev.mortgageLending, complianceScore: Number(e.target.value) }
                        }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <MetricCard
                      title="Loan Volume"
                      value={metrics.mortgageLending.loanVolume}
                      benchmark={INDUSTRY_BENCHMARKS.mortgageLending}
                      field="loanVolume"
                    />
                    <MetricCard
                      title="Default Rate"
                      value={metrics.mortgageLending.defaultRate}
                      benchmark={INDUSTRY_BENCHMARKS.mortgageLending}
                      field="defaultRate"
                      inverse={true}
                    />
                    <MetricCard
                      title="Processing Time"
                      value={metrics.mortgageLending.processingTime}
                      benchmark={INDUSTRY_BENCHMARKS.mortgageLending}
                      field="processingTime"
                      inverse={true}
                    />
                    <MetricCard
                      title="Customer Satisfaction"
                      value={metrics.mortgageLending.customerSatisfaction}
                      benchmark={INDUSTRY_BENCHMARKS.mortgageLending}
                      field="customerSatisfaction"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="valuation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Valuation Performance
                    <Badge variant="outline">
                      Overall Score: {calculateOverallScore(metrics.valuation, INDUSTRY_BENCHMARKS.valuation, ['turnaroundTime', 'underValuedProperties', 'overValuedProperties'])}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Accuracy Rate (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={metrics.valuation.accuracyRate}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          valuation: { ...prev.valuation, accuracyRate: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Turnaround Time (days)</Label>
                      <Input
                        type="number"
                        value={metrics.valuation.turnaroundTime}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          valuation: { ...prev.valuation, turnaroundTime: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Market Knowledge (1-10)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={metrics.valuation.marketKnowledge}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          valuation: { ...prev.valuation, marketKnowledge: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Client Retention (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={metrics.valuation.clientRetention}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          valuation: { ...prev.valuation, clientRetention: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Professional Standing (1-10)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={metrics.valuation.professionalStanding}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          valuation: { ...prev.valuation, professionalStanding: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Under Valued Properties (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={metrics.valuation.underValuedProperties}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          valuation: { ...prev.valuation, underValuedProperties: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Over Valued Properties (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={metrics.valuation.overValuedProperties}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          valuation: { ...prev.valuation, overValuedProperties: Number(e.target.value) }
                        }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <MetricCard
                      title="Accuracy Rate"
                      value={metrics.valuation.accuracyRate}
                      benchmark={INDUSTRY_BENCHMARKS.valuation}
                      field="accuracyRate"
                    />
                    <MetricCard
                      title="Turnaround Time"
                      value={metrics.valuation.turnaroundTime}
                      benchmark={INDUSTRY_BENCHMARKS.valuation}
                      field="turnaroundTime"
                      inverse={true}
                    />
                    <MetricCard
                      title="Market Knowledge"
                      value={metrics.valuation.marketKnowledge}
                      benchmark={INDUSTRY_BENCHMARKS.valuation}
                      field="marketKnowledge"
                    />
                    <MetricCard
                      title="Client Retention"
                      value={metrics.valuation.clientRetention}
                      benchmark={INDUSTRY_BENCHMARKS.valuation}
                      field="clientRetention"
                    />
                    <MetricCard
                      title="Professional Standing"
                      value={metrics.valuation.professionalStanding}
                      benchmark={INDUSTRY_BENCHMARKS.valuation}
                      field="professionalStanding"
                    />
                    <MetricCard
                      title="Under Valued Properties"
                      value={metrics.valuation.underValuedProperties}
                      benchmark={INDUSTRY_BENCHMARKS.valuation}
                      field="underValuedProperties"
                      inverse={true}
                    />
                    <MetricCard
                      title="Over Valued Properties"
                      value={metrics.valuation.overValuedProperties}
                      benchmark={INDUSTRY_BENCHMARKS.valuation}
                      field="overValuedProperties"
                      inverse={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estate" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Estate Agent Performance
                    <Badge variant="outline">
                      Overall Score: {calculateOverallScore(metrics.estateAgents, INDUSTRY_BENCHMARKS.estateAgents, ['daysOnMarket', 'discountedAdvertisedPrice', 'overQuoted'])}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Sales Volume ($)</Label>
                      <Input
                        type="number"
                        value={metrics.estateAgents.salesVolume}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          estateAgents: { ...prev.estateAgents, salesVolume: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Average Days on Market</Label>
                      <Input
                        type="number"
                        value={metrics.estateAgents.daysOnMarket}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          estateAgents: { ...prev.estateAgents, daysOnMarket: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Listing Accuracy (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={metrics.estateAgents.listingAccuracy}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          estateAgents: { ...prev.estateAgents, listingAccuracy: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Client Satisfaction (1-10)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={metrics.estateAgents.clientSatisfaction}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          estateAgents: { ...prev.estateAgents, clientSatisfaction: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Market Share (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={metrics.estateAgents.marketShare}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          estateAgents: { ...prev.estateAgents, marketShare: Number(e.target.value) }
                        }))}
                      />
                     </div>
                     <div>
                       <Label>Discounted Advertised Price (%)</Label>
                       <Input
                         type="number"
                         step="0.1"
                         min="0"
                         value={metrics.estateAgents.discountedAdvertisedPrice}
                         onChange={(e) => setMetrics(prev => ({
                           ...prev,
                           estateAgents: { ...prev.estateAgents, discountedAdvertisedPrice: Number(e.target.value) }
                         }))}
                       />
                     </div>
                     <div>
                       <Label>Over Quoted (%)</Label>
                       <Input
                         type="number"
                         step="0.1"
                         min="0"
                         value={metrics.estateAgents.overQuoted}
                         onChange={(e) => setMetrics(prev => ({
                           ...prev,
                           estateAgents: { ...prev.estateAgents, overQuoted: Number(e.target.value) }
                         }))}
                       />
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <MetricCard
                      title="Sales Volume"
                      value={metrics.estateAgents.salesVolume}
                      benchmark={INDUSTRY_BENCHMARKS.estateAgents}
                      field="salesVolume"
                    />
                    <MetricCard
                      title="Days on Market"
                      value={metrics.estateAgents.daysOnMarket}
                      benchmark={INDUSTRY_BENCHMARKS.estateAgents}
                      field="daysOnMarket"
                      inverse={true}
                    />
                    <MetricCard
                      title="Listing Accuracy"
                      value={metrics.estateAgents.listingAccuracy}
                      benchmark={INDUSTRY_BENCHMARKS.estateAgents}
                      field="listingAccuracy"
                    />
                     <MetricCard
                       title="Client Satisfaction"
                       value={metrics.estateAgents.clientSatisfaction}
                       benchmark={INDUSTRY_BENCHMARKS.estateAgents}
                       field="clientSatisfaction"
                     />
                     <MetricCard
                       title="Market Share"
                       value={metrics.estateAgents.marketShare}
                       benchmark={INDUSTRY_BENCHMARKS.estateAgents}
                       field="marketShare"
                     />
                     <MetricCard
                       title="Discounted Advertised Price"
                       value={metrics.estateAgents.discountedAdvertisedPrice}
                       benchmark={INDUSTRY_BENCHMARKS.estateAgents}
                       field="discountedAdvertisedPrice"
                       inverse={true}
                     />
                     <MetricCard
                       title="Over Quoted"
                       value={metrics.estateAgents.overQuoted}
                       benchmark={INDUSTRY_BENCHMARKS.estateAgents}
                       field="overQuoted"
                       inverse={true}
                     />
                   </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="developers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Developer & Large Business Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Project Completion Rate (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={metrics.developers.projectCompletionRate}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          developers: { ...prev.developers, projectCompletionRate: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Budget Adherence (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={metrics.developers.budgetAdherence}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          developers: { ...prev.developers, budgetAdherence: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Timeline Compliance (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={metrics.developers.timelineCompliance}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          developers: { ...prev.developers, timelineCompliance: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Quality Score (1-10)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={metrics.developers.qualityScore}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          developers: { ...prev.developers, qualityScore: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Sustainability Rating (1-10)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={metrics.developers.sustainabilityRating}
                        onChange={(e) => setMetrics(prev => ({
                          ...prev,
                          developers: { ...prev.developers, sustainabilityRating: Number(e.target.value) }
                        }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <MetricCard
                      title="Project Completion"
                      value={metrics.developers.projectCompletionRate}
                      benchmark={INDUSTRY_BENCHMARKS.developers}
                      field="projectCompletionRate"
                    />
                    <MetricCard
                      title="Budget Adherence"
                      value={metrics.developers.budgetAdherence}
                      benchmark={INDUSTRY_BENCHMARKS.developers}
                      field="budgetAdherence"
                    />
                    <MetricCard
                      title="Timeline Compliance"
                      value={metrics.developers.timelineCompliance}
                      benchmark={INDUSTRY_BENCHMARKS.developers}
                      field="timelineCompliance"
                    />
                    <MetricCard
                      title="Quality Score"
                      value={metrics.developers.qualityScore}
                      benchmark={INDUSTRY_BENCHMARKS.developers}
                      field="qualityScore"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => {
              setMetrics({
                mortgageLending: { loanVolume: 0, defaultRate: 0, processingTime: 0, customerSatisfaction: 0, complianceScore: 0 },
                valuation: { accuracyRate: 0, turnaroundTime: 0, marketKnowledge: 0, clientRetention: 0, professionalStanding: 0, underValuedProperties: 0, overValuedProperties: 0 },
                estateAgents: { salesVolume: 0, daysOnMarket: 0, listingAccuracy: 0, clientSatisfaction: 0, marketShare: 0, discountedAdvertisedPrice: 0, overQuoted: 0 },
                developers: { projectCompletionRate: 0, budgetAdherence: 0, timelineCompliance: 0, qualityScore: 0, sustainabilityRating: 0 },
              });
            }}>
              Reset All
            </Button>
            <Button>Generate Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};