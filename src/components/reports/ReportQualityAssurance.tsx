/*
 * Report Quality Assurance - Integrated contradiction checking and amendment
 * © 2024 Powered™. All Rights Reserved.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContradictionChecker } from './ContradictionChecker';
import { ContradictionAmender } from './ContradictionAmender';
import { Shield, FileCheck, AlertTriangle, CheckCircle } from 'lucide-react';

interface ReportQualityAssuranceProps {
  reportData: any;
  reportType: string;
  onReportUpdated?: (updatedData: any) => void;
  onQualityCheck?: (passed: boolean, issues: number) => void;
}

export const ReportQualityAssurance: React.FC<ReportQualityAssuranceProps> = ({
  reportData,
  reportType,
  onReportUpdated,
  onQualityCheck
}) => {
  const [contradictions, setContradictions] = useState<any[]>([]);
  const [amendments, setAmendments] = useState<any[]>([]);
  const [qualityScore, setQualityScore] = useState<number | null>(null);

  const handleContradictionsFound = (foundContradictions: any[]) => {
    setContradictions(foundContradictions);
    calculateQualityScore(foundContradictions, amendments);
  };

  const handleAmendmentsSaved = (savedAmendments: any[]) => {
    setAmendments(savedAmendments);
    calculateQualityScore(contradictions, savedAmendments);
  };

  const calculateQualityScore = (contras: any[], amends: any[]) => {
    const totalIssues = contras.length;
    const resolvedIssues = amends.length;
    const criticalIssues = contras.filter(c => c.severity === 'critical').length;
    
    let score = 100;
    
    // Deduct points for unresolved issues
    score -= (totalIssues - resolvedIssues) * 10;
    
    // Deduct extra points for critical issues
    score -= criticalIssues * 20;
    
    // Bonus for amendments (shows attention to detail)
    score += Math.min(resolvedIssues * 5, 20);
    
    const finalScore = Math.max(0, Math.min(100, score));
    setQualityScore(finalScore);
    
    const passed = finalScore >= 80 && criticalIssues === 0;
    onQualityCheck?.(passed, totalIssues - resolvedIssues);
  };

  const getQualityScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getQualityScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Acceptable';
    return 'Needs Improvement';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Report Quality Assurance
          {qualityScore !== null && (
            <Badge variant="outline" className={getQualityScoreColor(qualityScore)}>
              {qualityScore}/100 - {getQualityScoreLabel(qualityScore)}
            </Badge>
          )}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            {contradictions.length} issues
          </div>
          <div className="flex items-center gap-1">
            <FileCheck className="h-4 w-4" />
            {amendments.length} amendments
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            Report Type: {reportType}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="checker" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="checker" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Contradiction Checker
              {contradictions.length > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {contradictions.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="amender" className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              Amendment Center
              {amendments.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {amendments.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="checker" className="space-y-4">
            <ContradictionChecker
              reportData={reportData}
              reportType={reportType}
              onContradictionsFound={handleContradictionsFound}
              onAmendReport={onReportUpdated}
            />
          </TabsContent>
          
          <TabsContent value="amender" className="space-y-4">
            <ContradictionAmender
              reportData={reportData}
              contradictions={contradictions}
              onAmendmentSaved={handleAmendmentsSaved}
              onReportUpdated={onReportUpdated}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};