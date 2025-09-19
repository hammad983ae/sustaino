import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, TrendingDown, Building, DollarSign, FileText } from "lucide-react";

interface RiskAssessmentEngineProps {
  siteData: any;
}

const RiskAssessmentEngine: React.FC<RiskAssessmentEngineProps> = ({ siteData }) => {
  const [riskScores, setRiskScores] = useState({
    market: 25,
    regulatory: 35,
    environmental: 15,
    financial: 30,
    construction: 40,
    overall: 29
  });

  const getRiskLevel = (score: number) => {
    if (score <= 20) return { level: 'Low', color: 'text-green-600', variant: 'default' as const };
    if (score <= 40) return { level: 'Medium', color: 'text-yellow-600', variant: 'secondary' as const };
    return { level: 'High', color: 'text-red-600', variant: 'destructive' as const };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Comprehensive Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="market">Market Risk</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(riskScores).filter(([key]) => key !== 'overall').map(([key, score]) => {
                const risk = getRiskLevel(score);
                return (
                  <div key={key} className="text-center p-4 border rounded">
                    <div className="text-lg font-semibold capitalize mb-2">{key} Risk</div>
                    <div className={`text-2xl font-bold ${risk.color} mb-2`}>{score}%</div>
                    <Badge variant={risk.variant}>{risk.level} Risk</Badge>
                    <Progress value={score} className="mt-2 h-2" />
                  </div>
                );
              })}
            </div>
            
            <Card className="bg-primary/5">
              <CardContent className="text-center p-6">
                <h3 className="text-2xl font-bold mb-2">Overall Risk Score</h3>
                <div className={`text-4xl font-bold ${getRiskLevel(riskScores.overall).color} mb-2`}>
                  {riskScores.overall}%
                </div>
                <Badge variant={getRiskLevel(riskScores.overall).variant} className="text-lg px-4 py-2">
                  {getRiskLevel(riskScores.overall).level} Risk Development
                </Badge>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Demand Volatility</span>
                <Badge variant="secondary">Medium</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Price Fluctuation</span>
                <Badge variant="default">Low</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Competition Risk</span>
                <Badge variant="destructive">High</Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="regulatory" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Planning Approval Risk</span>
                <Badge variant="secondary">Medium</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Zoning Changes</span>
                <Badge variant="default">Low</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Building Code Updates</span>
                <Badge variant="secondary">Medium</Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="environmental" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Contamination Risk</span>
                <Badge variant="default">Low</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Flood Risk</span>
                <Badge variant="default">Low</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Climate Change Impact</span>
                <Badge variant="secondary">Medium</Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RiskAssessmentEngine;