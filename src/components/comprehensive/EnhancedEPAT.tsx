/*
 * Enhanced EPAT™ - Comprehensive Employment Performance Assessment Tool
 * © 2024 Powered™. All Rights Reserved.
 * Patent Pending - Advanced Employment Analytics & Risk Assessment System™
 */

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, TrendingUp, AlertTriangle, Target, Brain, DollarSign, 
  Shield, Clock, Award, Zap, TrendingDown, Search, BarChart3
} from 'lucide-react';
import { occupationDatabase, getOccupationCategories, getOccupationByCategory, calculateEmploymentRisk, type OccupationData } from './OccupationDatabase';

interface EmployeeAssessment {
  selectedOccupation: string;
  yearsExperience: number;
  currentSalary: number;
  performanceRating: number;
  skillsGap: number;
}

export const EnhancedEPAT: React.FC = () => {
  const [assessment, setAssessment] = useState<EmployeeAssessment>({
    selectedOccupation: '',
    yearsExperience: 0,
    currentSalary: 0,
    performanceRating: 5,
    skillsGap: 5
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const categories = getOccupationCategories();
  
  const filteredOccupations = useMemo(() => {
    let occupations = occupationDatabase;
    
    if (selectedCategory) {
      occupations = getOccupationByCategory(selectedCategory);
    }
    
    if (searchTerm) {
      occupations = occupations.filter(occ => 
        occ.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        occ.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return occupations;
  }, [selectedCategory, searchTerm]);
  
  const currentOccupation = occupationDatabase.find(occ => occ.id === assessment.selectedOccupation);
  
  const employmentRisk = currentOccupation ? calculateEmploymentRisk(currentOccupation) : null;
  
  const calculateSalaryBenchmark = (occupation: OccupationData, experience: number): number => {
    if (experience < 2) return occupation.avgSalary.entry;
    if (experience < 8) return occupation.avgSalary.mid;
    if (experience < 15) return occupation.avgSalary.senior;
    return occupation.avgSalary.executive;
  };
  
  const generateRecommendations = (occupation: OccupationData, assessment: EmployeeAssessment) => {
    const recommendations: string[] = [];
    const expectedSalary = calculateSalaryBenchmark(occupation, assessment.yearsExperience);
    
    if (assessment.currentSalary < expectedSalary * 0.8) {
      recommendations.push('Salary is below market rate - consider negotiation or job change');
    }
    
    if (occupation.automationRisk > 6) {
      recommendations.push('High automation risk - focus on developing AI-complementary skills');
    }
    
    if (occupation.growthProjection < 5) {
      recommendations.push('Limited growth prospects - consider skill diversification');
    }
    
    if (assessment.skillsGap > 6) {
      recommendations.push('Significant skills gap identified - prioritize training and development');
    }
    
    if (occupation.jobSecurity.economicRecessionImpact > 7) {
      recommendations.push('High economic sensitivity - build financial reserves and diverse skills');
    }
    
    return recommendations;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Enhanced EPAT™ - Comprehensive Employment Analysis
            <Badge variant="outline" className="text-xs">© 2024 Powered™</Badge>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Advanced employment risk assessment with comprehensive occupation database
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="occupation-search" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="occupation-search">Occupation Search</TabsTrigger>
              <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
              <TabsTrigger value="career-paths">Career Paths</TabsTrigger>
              <TabsTrigger value="market-insights">Market Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="occupation-search" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Search & Filter */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Search Occupations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Search by title</Label>
                      <Input
                        placeholder="e.g., Software Engineer"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label>Filter by category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="All categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All categories</SelectItem>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-4">
                      <Label>Current Assessment</Label>
                      <Select value={assessment.selectedOccupation} onValueChange={(value) => 
                        setAssessment(prev => ({ ...prev, selectedOccupation: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select occupation" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredOccupations.map(occ => (
                            <SelectItem key={occ.id} value={occ.id}>
                              {occ.title} - {occ.category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Occupation Results */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Occupation Database ({filteredOccupations.length} results)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {filteredOccupations.map(occupation => (
                        <div 
                          key={occupation.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            assessment.selectedOccupation === occupation.id 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => setAssessment(prev => ({ ...prev, selectedOccupation: occupation.id }))}
                        >
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium">{occupation.title}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {occupation.category}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <div className="text-muted-foreground">Avg Salary</div>
                                <div className="font-medium">${occupation.avgSalary.mid.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Growth</div>
                                <div className={`font-medium ${occupation.growthProjection >= 5 ? 'text-green-600' : 'text-red-600'}`}>
                                  {occupation.growthProjection >= 0 ? '+' : ''}{occupation.growthProjection}%
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Stability</span>
                                <span>{occupation.stabilityScore}/10</span>
                              </div>
                              <Progress value={occupation.stabilityScore * 10} className="h-1" />
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Automation Risk</span>
                                <span className={occupation.automationRisk > 6 ? 'text-red-600' : 'text-green-600'}>
                                  {occupation.automationRisk}/10
                                </span>
                              </div>
                              <Progress 
                                value={occupation.automationRisk * 10} 
                                className="h-1"
                                style={{
                                  background: occupation.automationRisk > 6 ? 'rgb(239 68 68 / 0.2)' : 'rgb(34 197 94 / 0.2)'
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Assessment Input */}
              {currentOccupation && (
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Assessment for {currentOccupation.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Years Experience</Label>
                        <Input
                          type="number"
                          value={assessment.yearsExperience}
                          onChange={(e) => setAssessment(prev => ({ 
                            ...prev, 
                            yearsExperience: Number(e.target.value) 
                          }))}
                        />
                      </div>
                      <div>
                        <Label>Current Salary ($)</Label>
                        <Input
                          type="number"
                          value={assessment.currentSalary}
                          onChange={(e) => setAssessment(prev => ({ 
                            ...prev, 
                            currentSalary: Number(e.target.value) 
                          }))}
                        />
                      </div>
                      <div>
                        <Label>Performance Rating (1-10)</Label>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={assessment.performanceRating}
                          onChange={(e) => setAssessment(prev => ({ 
                            ...prev, 
                            performanceRating: Number(e.target.value) 
                          }))}
                        />
                      </div>
                      <div>
                        <Label>Skills Gap (1-10)</Label>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={assessment.skillsGap}
                          onChange={(e) => setAssessment(prev => ({ 
                            ...prev, 
                            skillsGap: Number(e.target.value) 
                          }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="risk-analysis" className="space-y-6">
              {currentOccupation && employmentRisk ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Risk Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Employment Risk Assessment™
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">
                          {employmentRisk.overallRisk}/10
                        </div>
                        <Badge 
                          variant={employmentRisk.overallRisk > 6 ? "destructive" : employmentRisk.overallRisk > 3 ? "default" : "secondary"}
                          className="text-sm"
                        >
                          {employmentRisk.overallRisk > 6 ? "High Risk" : employmentRisk.overallRisk > 3 ? "Medium Risk" : "Low Risk"}
                        </Badge>
                      </div>
                      
                      <Progress value={employmentRisk.overallRisk * 10} className="h-3" />
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Risk Factors:</h4>
                        {employmentRisk.riskFactors.map((factor, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                            {factor}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detailed Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Detailed Risk Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Job Stability</span>
                            <span>{currentOccupation.stabilityScore}/10</span>
                          </div>
                          <Progress value={currentOccupation.stabilityScore * 10} />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Automation Risk</span>
                            <span className="text-red-600">{currentOccupation.automationRisk}/10</span>
                          </div>
                          <Progress value={currentOccupation.automationRisk * 10} />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Market Saturation</span>
                            <span>{currentOccupation.jobSecurity.marketSaturation}/10</span>
                          </div>
                          <Progress value={currentOccupation.jobSecurity.marketSaturation * 10} />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Economic Sensitivity</span>
                            <span className="text-orange-600">{currentOccupation.jobSecurity.economicRecessionImpact}/10</span>
                          </div>
                          <Progress value={currentOccupation.jobSecurity.economicRecessionImpact * 10} />
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Growth Projection</div>
                            <div className={`text-lg font-bold ${currentOccupation.growthProjection >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {currentOccupation.growthProjection >= 0 ? '+' : ''}{currentOccupation.growthProjection}%
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Demand Trend</div>
                            <Badge 
                              variant={currentOccupation.jobSecurity.demandTrend === 'increasing' ? 'default' : 
                                      currentOccupation.jobSecurity.demandTrend === 'stable' ? 'secondary' : 'destructive'}
                            >
                              {currentOccupation.jobSecurity.demandTrend}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Risk Mitigation Recommendations™
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">General Recommendations:</h4>
                          <div className="space-y-2">
                            {employmentRisk.recommendations.map((rec, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm">
                                <Target className="h-3 w-3 text-blue-500 mt-0.5" />
                                {rec}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Personalized Recommendations:</h4>
                          <div className="space-y-2">
                            {generateRecommendations(currentOccupation, assessment).map((rec, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm">
                                <Zap className="h-3 w-3 text-yellow-500 mt-0.5" />
                                {rec}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select an occupation to view risk analysis</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="career-paths" className="space-y-6">
              {currentOccupation ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Similar Roles */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Similar Roles</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        Roles with transferable skills
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentOccupation.careerAlternatives.similar.map((role, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{role}</div>
                            <Badge variant="outline" className="mt-1 text-xs">
                              Easy Transition
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Advancement Paths */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Career Advancement</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        Leadership and senior positions
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentOccupation.careerAlternatives.advancement.map((role, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{role}</div>
                            <Badge variant="default" className="mt-1 text-xs">
                              Advancement
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Career Pivot */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Career Pivot Options</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        Alternative career directions
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentOccupation.careerAlternatives.pivot.map((role, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">{role}</div>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              Pivot Opportunity
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills Requirements */}
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Required Skills & Development Path
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Current Role Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {currentOccupation.skillsRequired.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Future Skills Needed:</h4>
                          <div className="space-y-2 text-sm">
                            {currentOccupation.industryTrends.disruptors.map((disruptor, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <TrendingUp className="h-3 w-3 text-blue-500" />
                                Adapt to: {disruptor}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select an occupation to view career paths</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="market-insights" className="space-y-6">
              {currentOccupation ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Salary Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Salary Benchmarking
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 border rounded">
                          <div className="text-sm text-muted-foreground">Entry Level</div>
                          <div className="text-lg font-bold">${currentOccupation.avgSalary.entry.toLocaleString()}</div>
                        </div>
                        <div className="text-center p-3 border rounded">
                          <div className="text-sm text-muted-foreground">Mid Level</div>
                          <div className="text-lg font-bold">${currentOccupation.avgSalary.mid.toLocaleString()}</div>
                        </div>
                        <div className="text-center p-3 border rounded">
                          <div className="text-sm text-muted-foreground">Senior Level</div>
                          <div className="text-lg font-bold">${currentOccupation.avgSalary.senior.toLocaleString()}</div>
                        </div>
                        <div className="text-center p-3 border rounded">
                          <div className="text-sm text-muted-foreground">Executive</div>
                          <div className="text-lg font-bold">${currentOccupation.avgSalary.executive.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      {assessment.currentSalary > 0 && (
                        <div className="pt-4 border-t">
                          <div className="text-sm text-muted-foreground">Your Position:</div>
                          <div className="text-lg font-bold">
                            ${assessment.currentSalary.toLocaleString()}
                          </div>
                          <div className="text-sm">
                            {(() => {
                              const expected = calculateSalaryBenchmark(currentOccupation, assessment.yearsExperience);
                              const variance = ((assessment.currentSalary - expected) / expected) * 100;
                              return (
                                <span className={variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                                  {variance >= 0 ? '+' : ''}{variance.toFixed(1)}% vs benchmark
                                </span>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Industry Trends */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Industry Trends & Outlook
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Current Trends:</h4>
                        <p className="text-sm text-muted-foreground">
                          {currentOccupation.industryTrends.current}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Future Outlook:</h4>
                        <p className="text-sm text-muted-foreground">
                          {currentOccupation.industryTrends.future}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Key Disruptors:</h4>
                        <div className="space-y-1">
                          {currentOccupation.industryTrends.disruptors.map((disruptor, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <AlertTriangle className="h-3 w-3 text-orange-500" />
                              {disruptor}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Financial Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Financial Risk Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Income Variability</div>
                          <div className="flex items-center gap-2">
                            <Progress value={currentOccupation.financialMetrics.incomeVariability * 10} className="flex-1" />
                            <span className="text-sm">{currentOccupation.financialMetrics.incomeVariability}/10</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">Bonus Potential</div>
                          <div className="text-lg font-bold">
                            {currentOccupation.financialMetrics.bonusPotential}%
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">Benefits Value</div>
                          <div className="text-lg font-bold">
                            ${currentOccupation.financialMetrics.benefitsValue.toLocaleString()}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">Default Income</div>
                          <div className="text-lg font-bold">
                            ${currentOccupation.financialMetrics.defaultIncome.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Education & Requirements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Requirements & Qualifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Required Education:</div>
                        <div className="font-medium">{currentOccupation.requiredEducation}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">Replacement Difficulty:</div>
                        <div className="flex items-center gap-2">
                          <Progress value={currentOccupation.jobSecurity.replacementDifficulty * 10} className="flex-1" />
                          <span className="text-sm">{currentOccupation.jobSecurity.replacementDifficulty}/10</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select an occupation to view market insights</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};