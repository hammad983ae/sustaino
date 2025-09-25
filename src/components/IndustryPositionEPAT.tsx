/*
 * Industry & Position-Based EPAT™ System
 * © 2024 Powered™. All Rights Reserved.
 * Patent Pending - Advanced Industry-Specific Performance Assessment™
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, Users, TrendingUp, Target, Calculator, Briefcase, 
  PieChart, BarChart3, Award, Shield, Clock, DollarSign, Zap
} from 'lucide-react';

interface KPI {
  name: string;
  description: string;
  unit: string;
  benchmark: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
  };
  weight: number;
  isInverse?: boolean; // lower is better (e.g., time to complete)
}

interface Position {
  title: string;
  level: 'entry' | 'mid' | 'senior' | 'executive';
  kpis: KPI[];
}

interface Industry {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  positions: Position[];
  industryMetrics: {
    averageRevenue: number;
    growthRate: number;
    employmentStability: number;
    automationRisk: number;
  };
}

const INDUSTRIES: Industry[] = [
  {
    name: 'Real Estate & Property',
    description: 'Property sales, management, and development',
    icon: Building2,
    industryMetrics: {
      averageRevenue: 850000,
      growthRate: 6.5,
      employmentStability: 7.2,
      automationRisk: 4.5
    },
    positions: [
      {
        title: 'Real Estate Agent',
        level: 'mid',
        kpis: [
          {
            name: 'Sales Volume',
            description: 'Total property sales value per quarter',
            unit: '$',
            benchmark: { excellent: 5000000, good: 3000000, average: 1500000, poor: 500000 },
            weight: 0.25
          },
          {
            name: 'Conversion Rate',
            description: 'Leads converted to sales',
            unit: '%',
            benchmark: { excellent: 15, good: 10, average: 6, poor: 3 },
            weight: 0.20
          },
          {
            name: 'Days on Market',
            description: 'Average time to sell properties',
            unit: 'days',
            benchmark: { excellent: 25, good: 35, average: 50, poor: 80 },
            weight: 0.15,
            isInverse: true
          },
          {
            name: 'Client Satisfaction',
            description: 'Average client satisfaction rating',
            unit: '/10',
            benchmark: { excellent: 9.5, good: 8.5, average: 7.5, poor: 6.0 },
            weight: 0.20
          },
          {
            name: 'Repeat Business',
            description: 'Percentage of repeat/referral clients',
            unit: '%',
            benchmark: { excellent: 40, good: 25, average: 15, poor: 8 },
            weight: 0.15
          },
          {
            name: 'Discounted Advertised Price',
            description: 'Average percentage below advertised price properties sell for',
            unit: '%',
            benchmark: { excellent: 2, good: 5, average: 8, poor: 12 },
            weight: 0.05,
            isInverse: true
          }
        ]
      },
      {
        title: 'Property Manager',
        level: 'mid',
        kpis: [
          {
            name: 'Portfolio Value',
            description: 'Total value of managed properties',
            unit: '$',
            benchmark: { excellent: 50000000, good: 25000000, average: 10000000, poor: 3000000 },
            weight: 0.20
          },
          {
            name: 'Occupancy Rate',
            description: 'Average occupancy across portfolio',
            unit: '%',
            benchmark: { excellent: 98, good: 95, average: 90, poor: 85 },
            weight: 0.25
          },
          {
            name: 'Tenant Retention',
            description: 'Annual tenant retention rate',
            unit: '%',
            benchmark: { excellent: 90, good: 80, average: 70, poor: 60 },
            weight: 0.20
          },
          {
            name: 'Maintenance Response',
            description: 'Average response time to maintenance requests',
            unit: 'hours',
            benchmark: { excellent: 4, good: 8, average: 24, poor: 48 },
            weight: 0.15,
            isInverse: true
          },
          {
            name: 'Net Operating Income',
            description: 'NOI improvement year-over-year',
            unit: '%',
            benchmark: { excellent: 8, good: 5, average: 2, poor: -1 },
            weight: 0.20
          }
        ]
      },
      {
        title: 'Property Valuer',
        level: 'senior',
        kpis: [
          {
            name: 'Valuation Accuracy',
            description: 'Accuracy within 5% of market sale price',
            unit: '%',
            benchmark: { excellent: 95, good: 90, average: 85, poor: 75 },
            weight: 0.30
          },
          {
            name: 'Turnaround Time',
            description: 'Average days to complete valuation',
            unit: 'days',
            benchmark: { excellent: 3, good: 5, average: 7, poor: 10 },
            weight: 0.20,
            isInverse: true
          },
          {
            name: 'Client Retention',
            description: 'Annual client retention rate',
            unit: '%',
            benchmark: { excellent: 90, good: 80, average: 70, poor: 60 },
            weight: 0.20
          },
          {
            name: 'Compliance Score',
            description: 'Regulatory compliance rating',
            unit: '%',
            benchmark: { excellent: 100, good: 95, average: 90, poor: 85 },
            weight: 0.15
          },
          {
            name: 'Revenue per Valuation',
            description: 'Average revenue per completed valuation',
            unit: '$',
            benchmark: { excellent: 800, good: 600, average: 450, poor: 300 },
            weight: 0.15
          }
        ]
      }
    ]
  },
  {
    name: 'Mortgage & Finance',
    description: 'Mortgage lending, financial services, and credit assessment',
    icon: Calculator,
    industryMetrics: {
      averageRevenue: 1200000,
      growthRate: 4.2,
      employmentStability: 8.1,
      automationRisk: 6.8
    },
    positions: [
      {
        title: 'Mortgage Broker',
        level: 'mid',
        kpis: [
          {
            name: 'Loan Volume',
            description: 'Total loan value processed monthly',
            unit: '$',
            benchmark: { excellent: 8000000, good: 5000000, average: 2500000, poor: 1000000 },
            weight: 0.25
          },
          {
            name: 'Approval Rate',
            description: 'Percentage of applications approved',
            unit: '%',
            benchmark: { excellent: 85, good: 75, average: 65, poor: 50 },
            weight: 0.20
          },
          {
            name: 'Processing Time',
            description: 'Average days from application to settlement',
            unit: 'days',
            benchmark: { excellent: 21, good: 30, average: 45, poor: 60 },
            weight: 0.20,
            isInverse: true
          },
          {
            name: 'Default Rate',
            description: 'Percentage of loans that default',
            unit: '%',
            benchmark: { excellent: 0.5, good: 1.2, average: 2.5, poor: 4.0 },
            weight: 0.20,
            isInverse: true
          },
          {
            name: 'Client Satisfaction',
            description: 'Average client satisfaction score',
            unit: '/10',
            benchmark: { excellent: 9.2, good: 8.5, average: 7.8, poor: 6.5 },
            weight: 0.15
          }
        ]
      },
      {
        title: 'Credit Analyst',
        level: 'mid',
        kpis: [
          {
            name: 'Applications Processed',
            description: 'Number of credit applications processed daily',
            unit: 'count',
            benchmark: { excellent: 25, good: 18, average: 12, poor: 8 },
            weight: 0.20
          },
          {
            name: 'Risk Assessment Accuracy',
            description: 'Accuracy of risk predictions vs actual outcomes',
            unit: '%',
            benchmark: { excellent: 92, good: 88, average: 82, poor: 75 },
            weight: 0.30
          },
          {
            name: 'Turnaround Time',
            description: 'Average hours to complete credit assessment',
            unit: 'hours',
            benchmark: { excellent: 2, good: 4, average: 8, poor: 16 },
            weight: 0.25,
            isInverse: true
          },
          {
            name: 'Compliance Score',
            description: 'Regulatory compliance rating',
            unit: '%',
            benchmark: { excellent: 100, good: 98, average: 95, poor: 90 },
            weight: 0.15
          },
          {
            name: 'False Positive Rate',
            description: 'Percentage of good applications incorrectly flagged',
            unit: '%',
            benchmark: { excellent: 2, good: 5, average: 10, poor: 15 },
            weight: 0.10,
            isInverse: true
          }
        ]
      }
    ]
  },
  {
    name: 'Construction & Development',
    description: 'Property development, construction management, and project delivery',
    icon: Building2,
    industryMetrics: {
      averageRevenue: 2100000,
      growthRate: 5.8,
      employmentStability: 6.5,
      automationRisk: 3.2
    },
    positions: [
      {
        title: 'Project Manager',
        level: 'senior',
        kpis: [
          {
            name: 'On-Time Delivery',
            description: 'Percentage of projects completed on schedule',
            unit: '%',
            benchmark: { excellent: 95, good: 85, average: 75, poor: 60 },
            weight: 0.25
          },
          {
            name: 'Budget Adherence',
            description: 'Percentage of projects within budget',
            unit: '%',
            benchmark: { excellent: 98, good: 92, average: 85, poor: 75 },
            weight: 0.25
          },
          {
            name: 'Safety Record',
            description: 'Days without workplace incidents',
            unit: 'days',
            benchmark: { excellent: 365, good: 250, average: 150, poor: 75 },
            weight: 0.20
          },
          {
            name: 'Quality Score',
            description: 'Average project quality rating',
            unit: '/10',
            benchmark: { excellent: 9.5, good: 8.5, average: 7.5, poor: 6.5 },
            weight: 0.15
          },
          {
            name: 'Client Satisfaction',
            description: 'Average client satisfaction rating',
            unit: '/10',
            benchmark: { excellent: 9.0, good: 8.0, average: 7.0, poor: 6.0 },
            weight: 0.15
          }
        ]
      },
      {
        title: 'Site Manager',
        level: 'mid',
        kpis: [
          {
            name: 'Daily Productivity',
            description: 'Percentage of planned work completed daily',
            unit: '%',
            benchmark: { excellent: 105, good: 95, average: 85, poor: 75 },
            weight: 0.25
          },
          {
            name: 'Safety Incidents',
            description: 'Safety incidents per month',
            unit: 'count',
            benchmark: { excellent: 0, good: 0.5, average: 1.5, poor: 3 },
            weight: 0.30,
            isInverse: true
          },
          {
            name: 'Material Waste',
            description: 'Percentage of material waste',
            unit: '%',
            benchmark: { excellent: 2, good: 5, average: 8, poor: 12 },
            weight: 0.20,
            isInverse: true
          },
          {
            name: 'Team Efficiency',
            description: 'Labor hours vs planned hours',
            unit: '%',
            benchmark: { excellent: 95, good: 90, average: 85, poor: 80 },
            weight: 0.15
          },
          {
            name: 'Quality Inspections',
            description: 'Percentage of work passing first inspection',
            unit: '%',
            benchmark: { excellent: 95, good: 88, average: 80, poor: 70 },
            weight: 0.10
          }
        ]
      }
    ]
  },
  {
    name: 'Professional Services',
    description: 'Legal, accounting, consulting, and advisory services',
    icon: Briefcase,
    industryMetrics: {
      averageRevenue: 950000,
      growthRate: 3.8,
      employmentStability: 8.7,
      automationRisk: 5.5
    },
    positions: [
      {
        title: 'Senior Accountant',
        level: 'senior',
        kpis: [
          {
            name: 'Client Portfolio Value',
            description: 'Total value of managed client accounts',
            unit: '$',
            benchmark: { excellent: 2000000, good: 1200000, average: 700000, poor: 300000 },
            weight: 0.20
          },
          {
            name: 'Accuracy Rate',
            description: 'Percentage of error-free financial reports',
            unit: '%',
            benchmark: { excellent: 99, good: 97, average: 94, poor: 90 },
            weight: 0.25
          },
          {
            name: 'Compliance Score',
            description: 'Regulatory compliance rating',
            unit: '%',
            benchmark: { excellent: 100, good: 98, average: 95, poor: 90 },
            weight: 0.25
          },
          {
            name: 'Client Retention',
            description: 'Annual client retention rate',
            unit: '%',
            benchmark: { excellent: 95, good: 85, average: 75, poor: 65 },
            weight: 0.15
          },
          {
            name: 'Billable Hours',
            description: 'Billable hours per month',
            unit: 'hours',
            benchmark: { excellent: 160, good: 140, average: 120, poor: 100 },
            weight: 0.15
          }
        ]
      },
      {
        title: 'Property Lawyer',
        level: 'senior',
        kpis: [
          {
            name: 'Case Success Rate',
            description: 'Percentage of successful case outcomes',
            unit: '%',
            benchmark: { excellent: 92, good: 85, average: 78, poor: 70 },
            weight: 0.30
          },
          {
            name: 'Settlement Time',
            description: 'Average days to complete property settlement',
            unit: 'days',
            benchmark: { excellent: 28, good: 35, average: 45, poor: 60 },
            weight: 0.20,
            isInverse: true
          },
          {
            name: 'Client Satisfaction',
            description: 'Average client satisfaction rating',
            unit: '/10',
            benchmark: { excellent: 9.2, good: 8.5, average: 7.8, poor: 7.0 },
            weight: 0.20
          },
          {
            name: 'Billable Hours',
            description: 'Billable hours per month',
            unit: 'hours',
            benchmark: { excellent: 170, good: 150, average: 130, poor: 110 },
            weight: 0.15
          },
          {
            name: 'Revenue per Hour',
            description: 'Average revenue per billable hour',
            unit: '$',
            benchmark: { excellent: 450, good: 350, average: 280, poor: 220 },
            weight: 0.15
          }
        ]
      }
    ]
  },
  {
    name: 'Technology & PropTech',
    description: 'Property technology, software development, and digital solutions',
    icon: Zap,
    industryMetrics: {
      averageRevenue: 1800000,
      growthRate: 12.5,
      employmentStability: 7.8,
      automationRisk: 2.1
    },
    positions: [
      {
        title: 'PropTech Developer',
        level: 'mid',
        kpis: [
          {
            name: 'Code Quality Score',
            description: 'Automated code quality assessment',
            unit: '/10',
            benchmark: { excellent: 9.5, good: 8.5, average: 7.5, poor: 6.5 },
            weight: 0.25
          },
          {
            name: 'Feature Delivery',
            description: 'Features delivered per sprint',
            unit: 'count',
            benchmark: { excellent: 8, good: 6, average: 4, poor: 2 },
            weight: 0.20
          },
          {
            name: 'Bug Rate',
            description: 'Bugs per 1000 lines of code',
            unit: 'count',
            benchmark: { excellent: 2, good: 5, average: 10, poor: 20 },
            weight: 0.20,
            isInverse: true
          },
          {
            name: 'System Uptime',
            description: 'Percentage of system availability',
            unit: '%',
            benchmark: { excellent: 99.9, good: 99.5, average: 99.0, poor: 98.0 },
            weight: 0.20
          },
          {
            name: 'User Adoption',
            description: 'Monthly active users of developed features',
            unit: 'count',
            benchmark: { excellent: 10000, good: 5000, average: 2000, poor: 500 },
            weight: 0.15
          }
        ]
      },
      {
        title: 'Data Analyst',
        level: 'mid',
        kpis: [
          {
            name: 'Report Accuracy',
            description: 'Percentage of error-free analytical reports',
            unit: '%',
            benchmark: { excellent: 98, good: 95, average: 90, poor: 85 },
            weight: 0.25
          },
          {
            name: 'Insight Generation',
            description: 'Actionable insights generated per month',
            unit: 'count',
            benchmark: { excellent: 15, good: 10, average: 6, poor: 3 },
            weight: 0.25
          },
          {
            name: 'Query Performance',
            description: 'Average database query response time',
            unit: 'seconds',
            benchmark: { excellent: 2, good: 5, average: 10, poor: 20 },
            weight: 0.20,
            isInverse: true
          },
          {
            name: 'Stakeholder Satisfaction',
            description: 'Average stakeholder satisfaction rating',
            unit: '/10',
            benchmark: { excellent: 9.0, good: 8.0, average: 7.0, poor: 6.0 },
            weight: 0.15
          },
          {
            name: 'Process Improvement',
            description: 'Percentage improvement in business processes',
            unit: '%',
            benchmark: { excellent: 20, good: 12, average: 6, poor: 2 },
            weight: 0.15
          }
        ]
      }
    ]
  }
];

interface EmployeeAssessment {
  industry: string;
  position: string;
  employeeName: string;
  experience: number;
  salary: number;
  kpiScores: { [key: string]: number };
}

export const IndustryPositionEPAT: React.FC = () => {
  const [assessment, setAssessment] = useState<EmployeeAssessment>({
    industry: '',
    position: '',
    employeeName: '',
    experience: 0,
    salary: 0,
    kpiScores: {}
  });

  const selectedIndustry = INDUSTRIES.find(i => i.name === assessment.industry);
  const selectedPosition = selectedIndustry?.positions.find(p => p.title === assessment.position);

  const calculateKPIRating = (value: number, kpi: KPI) => {
    const { excellent, good, average, poor } = kpi.benchmark;
    
    if (kpi.isInverse) {
      if (value <= excellent) return { rating: 'Excellent', score: 95, color: 'bg-green-500' };
      if (value <= good) return { rating: 'Good', score: 80, color: 'bg-blue-500' };
      if (value <= average) return { rating: 'Average', score: 65, color: 'bg-yellow-500' };
      return { rating: 'Needs Improvement', score: 40, color: 'bg-red-500' };
    } else {
      if (value >= excellent) return { rating: 'Excellent', score: 95, color: 'bg-green-500' };
      if (value >= good) return { rating: 'Good', score: 80, color: 'bg-blue-500' };
      if (value >= average) return { rating: 'Average', score: 65, color: 'bg-yellow-500' };
      return { rating: 'Needs Improvement', score: 40, color: 'bg-red-500' };
    }
  };

  const calculateOverallScore = () => {
    if (!selectedPosition) return 0;
    
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    selectedPosition.kpis.forEach(kpi => {
      const value = assessment.kpiScores[kpi.name];
      if (value !== undefined) {
        const rating = calculateKPIRating(value, kpi);
        totalWeightedScore += rating.score * kpi.weight;
        totalWeight += kpi.weight;
      }
    });
    
    return totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 0;
  };

  const generateRecommendations = () => {
    if (!selectedPosition) return [];
    
    const recommendations: string[] = [];
    const overallScore = calculateOverallScore();
    
    if (overallScore < 70) {
      recommendations.push('Focus on improving underperforming KPIs to reach industry standards');
    }
    
    selectedPosition.kpis.forEach(kpi => {
      const value = assessment.kpiScores[kpi.name];
      if (value !== undefined) {
        const rating = calculateKPIRating(value, kpi);
        if (rating.score < 65 && kpi.weight > 0.15) {
          recommendations.push(`Prioritize improvement in ${kpi.name} - high impact area`);
        }
      }
    });
    
    if (selectedIndustry && selectedIndustry.industryMetrics.automationRisk > 6) {
      recommendations.push('Consider developing skills in areas less susceptible to automation');
    }
    
    return recommendations;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Industry & Position-Based EPAT™ System
            <Badge variant="outline" className="text-xs">© 2024 Powered™</Badge>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Comprehensive performance assessment with industry-specific KPIs and benchmarks
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="industry-selection" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="industry-selection">Industry & Position</TabsTrigger>
              <TabsTrigger value="kpi-assessment">KPI Assessment</TabsTrigger>
              <TabsTrigger value="performance-analysis">Performance Analysis</TabsTrigger>
              <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
            </TabsList>

            <TabsContent value="industry-selection" className="space-y-6">
              {/* Employee Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Employee Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Employee Name</Label>
                      <Input
                        value={assessment.employeeName}
                        onChange={(e) => setAssessment(prev => ({ ...prev, employeeName: e.target.value }))}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <Label>Years of Experience</Label>
                      <Input
                        type="number"
                        value={assessment.experience}
                        onChange={(e) => setAssessment(prev => ({ ...prev, experience: Number(e.target.value) }))}
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <Label>Annual Salary ($)</Label>
                      <Input
                        type="number"
                        value={assessment.salary}
                        onChange={(e) => setAssessment(prev => ({ ...prev, salary: Number(e.target.value) }))}
                        placeholder="75000"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Industry Selection */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Industry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {INDUSTRIES.map(industry => {
                        const Icon = industry.icon;
                        return (
                          <div
                            key={industry.name}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              assessment.industry === industry.name 
                                ? 'border-primary bg-primary/5' 
                                : 'hover:border-primary/50'
                            }`}
                            onClick={() => setAssessment(prev => ({ 
                              ...prev, 
                              industry: industry.name, 
                              position: '',
                              kpiScores: {} 
                            }))}
                          >
                            <div className="flex items-start gap-3">
                              <Icon className="h-5 w-5 mt-1" />
                              <div className="space-y-2 flex-1">
                                <h4 className="font-medium">{industry.name}</h4>
                                <p className="text-sm text-muted-foreground">{industry.description}</p>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <span className="text-muted-foreground">Avg Revenue: </span>
                                    <span className="font-medium">${(industry.industryMetrics.averageRevenue / 1000).toFixed(0)}k</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Growth: </span>
                                    <span className="font-medium text-green-600">+{industry.industryMetrics.growthRate}%</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Stability: </span>
                                    <span className="font-medium">{industry.industryMetrics.employmentStability}/10</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Auto Risk: </span>
                                    <span className={`font-medium ${industry.industryMetrics.automationRisk > 6 ? 'text-red-600' : 'text-green-600'}`}>
                                      {industry.industryMetrics.automationRisk}/10
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Position Selection */}
                {selectedIndustry && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Select Position</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedIndustry.positions.map(position => (
                          <div
                            key={position.title}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              assessment.position === position.title 
                                ? 'border-primary bg-primary/5' 
                                : 'hover:border-primary/50'
                            }`}
                            onClick={() => setAssessment(prev => ({ 
                              ...prev, 
                              position: position.title,
                              kpiScores: {} 
                            }))}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{position.title}</h4>
                                <Badge variant="secondary" className="text-xs capitalize">
                                  {position.level}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {position.kpis.length} Key Performance Indicators
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {position.kpis.slice(0, 3).map(kpi => (
                                  <Badge key={kpi.name} variant="outline" className="text-xs">
                                    {kpi.name}
                                  </Badge>
                                ))}
                                {position.kpis.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{position.kpis.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="kpi-assessment" className="space-y-6">
              {selectedPosition ? (
                <Card>
                  <CardHeader>
                    <CardTitle>KPI Assessment for {selectedPosition.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      Enter current performance metrics for each KPI
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedPosition.kpis.map(kpi => (
                        <div key={kpi.name} className="space-y-4">
                          <div>
                            <Label className="text-base font-medium">{kpi.name}</Label>
                            <p className="text-sm text-muted-foreground">{kpi.description}</p>
                            <div className="text-xs text-muted-foreground mt-1">
                              Weight: {(kpi.weight * 100).toFixed(0)}% | Unit: {kpi.unit}
                            </div>
                          </div>
                          
                          <div>
                            <Input
                              type="number"
                              step="0.01"
                              value={assessment.kpiScores[kpi.name] || ''}
                              onChange={(e) => setAssessment(prev => ({
                                ...prev,
                                kpiScores: {
                                  ...prev.kpiScores,
                                  [kpi.name]: Number(e.target.value)
                                }
                              }))}
                              placeholder={`Enter ${kpi.name.toLowerCase()}`}
                            />
                          </div>
                          
                          {assessment.kpiScores[kpi.name] !== undefined && (
                            <div className="space-y-2">
                              {(() => {
                                const rating = calculateKPIRating(assessment.kpiScores[kpi.name], kpi);
                                return (
                                  <>
                                    <div className="flex justify-between items-center">
                                      <Badge variant="outline" className={`${rating.color} text-white`}>
                                        {rating.rating}
                                      </Badge>
                                      <span className="text-sm font-medium">Score: {rating.score}%</span>
                                    </div>
                                    <Progress value={rating.score} className="h-2" />
                                  </>
                                );
                              })()}
                            </div>
                          )}
                          
                          <div className="text-xs space-y-1">
                            <div className="font-medium">Benchmarks:</div>
                            <div className="grid grid-cols-2 gap-1">
                              <div>Excellent: {kpi.benchmark.excellent}{kpi.unit}</div>
                              <div>Good: {kpi.benchmark.good}{kpi.unit}</div>
                              <div>Average: {kpi.benchmark.average}{kpi.unit}</div>
                              <div>Poor: {kpi.benchmark.poor}{kpi.unit}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select Industry and Position</h3>
                    <p className="text-muted-foreground">
                      Please select an industry and position to begin KPI assessment
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="performance-analysis" className="space-y-6">
              {selectedPosition && Object.keys(assessment.kpiScores).length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Overall Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Overall Performance Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-4">
                        <div className="text-4xl font-bold">{calculateOverallScore()}%</div>
                        <Badge 
                          variant={calculateOverallScore() >= 80 ? "default" : calculateOverallScore() >= 65 ? "secondary" : "destructive"}
                          className="text-lg px-4 py-2"
                        >
                          {calculateOverallScore() >= 80 ? "Excellent" : calculateOverallScore() >= 65 ? "Good" : "Needs Improvement"}
                        </Badge>
                        <Progress value={calculateOverallScore()} className="h-3" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {generateRecommendations().map((recommendation, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm">{recommendation}</p>
                          </div>
                        ))}
                        {generateRecommendations().length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            Excellent performance across all metrics. Keep up the great work!
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detailed KPI Breakdown */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Detailed KPI Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedPosition.kpis.map(kpi => {
                          const value = assessment.kpiScores[kpi.name];
                          if (value === undefined) return null;
                          
                          const rating = calculateKPIRating(value, kpi);
                          return (
                            <div key={kpi.name} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium">{kpi.name}</h4>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className={`${rating.color} text-white`}>
                                      {rating.rating}
                                    </Badge>
                                    <span className="text-sm font-medium">{rating.score}%</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                                  <span>Weight: {(kpi.weight * 100).toFixed(0)}%</span>
                                  <span>Current: {value}{kpi.unit}</span>
                                </div>
                                <Progress value={rating.score} className="h-2" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Complete KPI Assessment</h3>
                    <p className="text-muted-foreground">
                      Enter KPI values to see detailed performance analysis
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="benchmarks" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {INDUSTRIES.map(industry => {
                  const Icon = industry.icon;
                  return (
                    <Card key={industry.name}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Icon className="h-5 w-5" />
                          {industry.name} - Industry Benchmarks
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {industry.description}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {industry.positions.map(position => (
                            <div key={position.title} className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-lg">{position.title}</h4>
                                <Badge variant="secondary" className="capitalize">
                                  {position.level} Level
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {position.kpis.map(kpi => (
                                  <div key={kpi.name} className="p-4 border rounded-lg">
                                    <div className="space-y-3">
                                      <div>
                                        <h5 className="font-medium">{kpi.name}</h5>
                                        <p className="text-xs text-muted-foreground">{kpi.description}</p>
                                        <div className="text-xs text-muted-foreground mt-1">
                                          Weight: {(kpi.weight * 100).toFixed(0)}% | Unit: {kpi.unit}
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                          <div className="flex justify-between">
                                            <span className="text-green-600">Excellent:</span>
                                            <span className="font-medium">{kpi.benchmark.excellent}{kpi.unit}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-blue-600">Good:</span>
                                            <span className="font-medium">{kpi.benchmark.good}{kpi.unit}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-yellow-600">Average:</span>
                                            <span className="font-medium">{kpi.benchmark.average}{kpi.unit}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-red-600">Poor:</span>
                                            <span className="font-medium">{kpi.benchmark.poor}{kpi.unit}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};