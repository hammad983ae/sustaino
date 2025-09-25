import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, TrendingUp, Award, Users, Target, Brain, Clock, DollarSign } from 'lucide-react';

interface EmployeeMetrics {
  // Core Performance Metrics
  productivity: number; // Tasks completed vs assigned
  quality: number; // Error rate, rework required
  efficiency: number; // Time to complete tasks
  reliability: number; // Meeting deadlines, attendance
  
  // Soft Skills & Leadership
  communication: number; // Client feedback, team collaboration
  leadership: number; // Mentoring, leading projects
  innovation: number; // Process improvements, new ideas
  adaptability: number; // Learning new skills, handling change
  
  // Business Impact
  revenueGeneration: number; // Direct revenue contribution
  clientSatisfaction: number; // Client feedback scores
  teamCollaboration: number; // Peer reviews, cross-functional work
  professionalDevelopment: number; // Certifications, training completed
  
  // Industry-Specific Metrics
  technicalSkills: number; // Job-specific competencies
  marketKnowledge: number; // Industry expertise
  compliance: number; // Regulatory adherence
  riskManagement: number; // Error prevention, risk mitigation
}

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  yearsExperience: number;
  salary: number;
  metrics: EmployeeMetrics;
  overallScore?: number;
  valueRank?: number;
}

interface JobCategory {
  name: string;
  roles: string[];
  weightings: {
    [key in keyof EmployeeMetrics]: number;
  };
}

const JOB_CATEGORIES: JobCategory[] = [
  {
    name: 'Property Valuation',
    roles: ['Senior Valuer', 'Junior Valuer', 'Valuation Assistant', 'Review Valuer'],
    weightings: {
      productivity: 0.15,
      quality: 0.20,
      efficiency: 0.15,
      reliability: 0.10,
      communication: 0.10,
      leadership: 0.05,
      innovation: 0.05,
      adaptability: 0.05,
      revenueGeneration: 0.10,
      clientSatisfaction: 0.15,
      teamCollaboration: 0.05,
      professionalDevelopment: 0.10,
      technicalSkills: 0.20,
      marketKnowledge: 0.15,
      compliance: 0.15,
      riskManagement: 0.15,
    }
  },
  {
    name: 'Mortgage & Finance',
    roles: ['Mortgage Broker', 'Loan Officer', 'Credit Analyst', 'Finance Manager'],
    weightings: {
      productivity: 0.20,
      quality: 0.15,
      efficiency: 0.15,
      reliability: 0.15,
      communication: 0.15,
      leadership: 0.05,
      innovation: 0.05,
      adaptability: 0.05,
      revenueGeneration: 0.25,
      clientSatisfaction: 0.20,
      teamCollaboration: 0.05,
      professionalDevelopment: 0.08,
      technicalSkills: 0.12,
      marketKnowledge: 0.10,
      compliance: 0.20,
      riskManagement: 0.18,
    }
  },
  {
    name: 'Real Estate',
    roles: ['Sales Agent', 'Property Manager', 'Leasing Consultant', 'Real Estate Manager'],
    weightings: {
      productivity: 0.18,
      quality: 0.12,
      efficiency: 0.12,
      reliability: 0.10,
      communication: 0.20,
      leadership: 0.08,
      innovation: 0.05,
      adaptability: 0.08,
      revenueGeneration: 0.30,
      clientSatisfaction: 0.25,
      teamCollaboration: 0.08,
      professionalDevelopment: 0.05,
      technicalSkills: 0.10,
      marketKnowledge: 0.20,
      compliance: 0.10,
      riskManagement: 0.08,
    }
  },
  {
    name: 'Development & Construction',
    roles: ['Project Manager', 'Site Manager', 'Development Manager', 'Construction Supervisor'],
    weightings: {
      productivity: 0.20,
      quality: 0.18,
      efficiency: 0.15,
      reliability: 0.15,
      communication: 0.12,
      leadership: 0.15,
      innovation: 0.10,
      adaptability: 0.08,
      revenueGeneration: 0.12,
      clientSatisfaction: 0.10,
      teamCollaboration: 0.15,
      professionalDevelopment: 0.08,
      technicalSkills: 0.25,
      marketKnowledge: 0.10,
      compliance: 0.18,
      riskManagement: 0.20,
    }
  },
  {
    name: 'Professional Services',
    roles: ['Accountant', 'Lawyer', 'Consultant', 'Business Analyst', 'Project Coordinator'],
    weightings: {
      productivity: 0.15,
      quality: 0.20,
      efficiency: 0.15,
      reliability: 0.12,
      communication: 0.15,
      leadership: 0.08,
      innovation: 0.08,
      adaptability: 0.10,
      revenueGeneration: 0.15,
      clientSatisfaction: 0.18,
      teamCollaboration: 0.12,
      professionalDevelopment: 0.15,
      technicalSkills: 0.18,
      marketKnowledge: 0.12,
      compliance: 0.15,
      riskManagement: 0.12,
    }
  },
  {
    name: 'Technology & Innovation',
    roles: ['Software Developer', 'IT Manager', 'Data Analyst', 'Systems Administrator'],
    weightings: {
      productivity: 0.20,
      quality: 0.25,
      efficiency: 0.18,
      reliability: 0.15,
      communication: 0.10,
      leadership: 0.08,
      innovation: 0.20,
      adaptability: 0.15,
      revenueGeneration: 0.08,
      clientSatisfaction: 0.10,
      teamCollaboration: 0.15,
      professionalDevelopment: 0.18,
      technicalSkills: 0.30,
      marketKnowledge: 0.05,
      compliance: 0.10,
      riskManagement: 0.15,
    }
  }
];

const BENCHMARK_SCORES = {
  excellent: 9,
  good: 7,
  average: 5,
  poor: 3
};

export const EmployeePerformancePlatform: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(JOB_CATEGORIES[0]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: '',
    role: '',
    department: '',
    yearsExperience: 0,
    salary: 0,
    metrics: {
      productivity: 5,
      quality: 5,
      efficiency: 5,
      reliability: 5,
      communication: 5,
      leadership: 5,
      innovation: 5,
      adaptability: 5,
      revenueGeneration: 5,
      clientSatisfaction: 5,
      teamCollaboration: 5,
      professionalDevelopment: 5,
      technicalSkills: 5,
      marketKnowledge: 5,
      compliance: 5,
      riskManagement: 5,
    }
  });

  // Calculate weighted score for an employee based on their role
  const calculateEmployeeScore = (employee: Employee): number => {
    const category = JOB_CATEGORIES.find(cat => 
      cat.roles.includes(employee.role)
    ) || JOB_CATEGORIES[4]; // Default to Professional Services

    let totalScore = 0;
    let totalWeight = 0;

    Object.entries(category.weightings).forEach(([metric, weight]) => {
      const score = employee.metrics[metric as keyof EmployeeMetrics];
      totalScore += score * weight;
      totalWeight += weight;
    });

    return totalScore / totalWeight;
  };

  // Calculate value score (performance vs cost)
  const calculateValueScore = (employee: Employee): number => {
    const performanceScore = calculateEmployeeScore(employee);
    const salaryNormalized = Math.min(employee.salary / 200000, 2); // Normalize salary (cap at 200k for calculation)
    const experienceBonus = Math.min(employee.yearsExperience / 20, 1) * 0.2; // Experience bonus up to 20%
    
    // Value = Performance / Cost, with experience bonus
    return (performanceScore * (1 + experienceBonus)) / (salaryNormalized + 1);
  };

  // Advanced algorithm to determine most valuable employees
  const calculateEmployeeRankings = () => {
    const rankedEmployees = employees.map(employee => {
      const overallScore = calculateEmployeeScore(employee);
      const valueScore = calculateValueScore(employee);
      
      return {
        ...employee,
        overallScore,
        valueScore,
        // Composite score considering multiple factors
        compositeScore: (overallScore * 0.7) + (valueScore * 0.3)
      };
    }).sort((a, b) => b.compositeScore - a.compositeScore);

    return rankedEmployees.map((employee, index) => ({
      ...employee,
      valueRank: index + 1
    }));
  };

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.role && newEmployee.metrics) {
      const employee: Employee = {
        id: Date.now().toString(),
        name: newEmployee.name!,
        role: newEmployee.role!,
        department: newEmployee.department || 'General',
        yearsExperience: newEmployee.yearsExperience || 0,
        salary: newEmployee.salary || 50000,
        metrics: newEmployee.metrics
      };
      
      setEmployees(prev => [...prev, employee]);
      setNewEmployee({
        name: '',
        role: '',
        department: '',
        yearsExperience: 0,
        salary: 0,
        metrics: {
          productivity: 5,
          quality: 5,
          efficiency: 5,
          reliability: 5,
          communication: 5,
          leadership: 5,
          innovation: 5,
          adaptability: 5,
          revenueGeneration: 5,
          clientSatisfaction: 5,
          teamCollaboration: 5,
          professionalDevelopment: 5,
          technicalSkills: 5,
          marketKnowledge: 5,
          compliance: 5,
          riskManagement: 5,
        }
      });
    }
  };

  const rankedEmployees = calculateEmployeeRankings();

  const getPerformanceColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-blue-600 bg-blue-50';
    if (score >= 4) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getPerformanceLabel = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Employee Performance & Value Assessment Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="assessment" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="assessment">Performance Assessment</TabsTrigger>
              <TabsTrigger value="rankings">Employee Rankings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
              <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
            </TabsList>

            <TabsContent value="assessment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Employee Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Employee Name</Label>
                      <Input
                        value={newEmployee.name || ''}
                        onChange={(e) => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Select 
                        value={newEmployee.role || ''} 
                        onValueChange={(value) => setNewEmployee(prev => ({ ...prev, role: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {JOB_CATEGORIES.flatMap(category => 
                            category.roles.map(role => (
                              <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Department</Label>
                      <Input
                        value={newEmployee.department || ''}
                        onChange={(e) => setNewEmployee(prev => ({ ...prev, department: e.target.value }))}
                        placeholder="Property Services"
                      />
                    </div>
                    <div>
                      <Label>Years Experience</Label>
                      <Input
                        type="number"
                        value={newEmployee.yearsExperience || ''}
                        onChange={(e) => setNewEmployee(prev => ({ ...prev, yearsExperience: Number(e.target.value) }))}
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <Label>Annual Salary ($)</Label>
                      <Input
                        type="number"
                        value={newEmployee.salary || ''}
                        onChange={(e) => setNewEmployee(prev => ({ ...prev, salary: Number(e.target.value) }))}
                        placeholder="75000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                    {/* Core Performance Metrics */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Core Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {['productivity', 'quality', 'efficiency', 'reliability'].map((metric) => (
                          <div key={metric}>
                            <Label className="capitalize">{metric}: {newEmployee.metrics?.[metric as keyof EmployeeMetrics]}/10</Label>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={newEmployee.metrics?.[metric as keyof EmployeeMetrics] || 5}
                              onChange={(e) => setNewEmployee(prev => ({
                                ...prev,
                                metrics: {
                                  ...prev.metrics!,
                                  [metric]: Number(e.target.value)
                                }
                              }))}
                              className="w-full"
                            />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Soft Skills & Leadership */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Soft Skills & Leadership
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {['communication', 'leadership', 'innovation', 'adaptability'].map((metric) => (
                          <div key={metric}>
                            <Label className="capitalize">{metric}: {newEmployee.metrics?.[metric as keyof EmployeeMetrics]}/10</Label>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={newEmployee.metrics?.[metric as keyof EmployeeMetrics] || 5}
                              onChange={(e) => setNewEmployee(prev => ({
                                ...prev,
                                metrics: {
                                  ...prev.metrics!,
                                  [metric]: Number(e.target.value)
                                }
                              }))}
                              className="w-full"
                            />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Business Impact */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Business Impact
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {['revenueGeneration', 'clientSatisfaction', 'teamCollaboration', 'professionalDevelopment'].map((metric) => (
                          <div key={metric}>
                            <Label className="capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}: {newEmployee.metrics?.[metric as keyof EmployeeMetrics]}/10</Label>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={newEmployee.metrics?.[metric as keyof EmployeeMetrics] || 5}
                              onChange={(e) => setNewEmployee(prev => ({
                                ...prev,
                                metrics: {
                                  ...prev.metrics!,
                                  [metric]: Number(e.target.value)
                                }
                              }))}
                              className="w-full"
                            />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Industry-Specific */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Industry-Specific
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {['technicalSkills', 'marketKnowledge', 'compliance', 'riskManagement'].map((metric) => (
                          <div key={metric}>
                            <Label className="capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}: {newEmployee.metrics?.[metric as keyof EmployeeMetrics]}/10</Label>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={newEmployee.metrics?.[metric as keyof EmployeeMetrics] || 5}
                              onChange={(e) => setNewEmployee(prev => ({
                                ...prev,
                                metrics: {
                                  ...prev.metrics!,
                                  [metric]: Number(e.target.value)
                                }
                              }))}
                              className="w-full"
                            />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  <Button onClick={addEmployee} className="w-full">
                    Add Employee Assessment
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rankings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Top Performing Employees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {rankedEmployees.length === 0 ? (
                    <p className="text-muted-foreground">No employees assessed yet. Add employees in the Assessment tab.</p>
                  ) : (
                    <div className="space-y-4">
                      {rankedEmployees.slice(0, 10).map((employee, index) => (
                        <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-medium">{employee.name}</h3>
                              <p className="text-sm text-muted-foreground">{employee.role} • {employee.department}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-medium">Performance: {employee.overallScore?.toFixed(1)}/10</div>
                              <div className="text-sm text-muted-foreground">Value Score: {(employee as any).valueScore?.toFixed(2)}</div>
                            </div>
                            <Badge className={getPerformanceColor(employee.overallScore || 0)}>
                              {getPerformanceLabel(employee.overallScore || 0)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Total Employees</span>
                        <span className="font-medium">{employees.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>High Performers (8+)</span>
                        <span className="font-medium text-green-600">
                          {rankedEmployees.filter(e => e.overallScore! >= 8).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Score</span>
                        <span className="font-medium">
                          {rankedEmployees.length > 0 ? 
                            (rankedEmployees.reduce((sum, e) => sum + e.overallScore!, 0) / rankedEmployees.length).toFixed(1) 
                            : '0'}/10
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Department Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Array.from(new Set(employees.map(e => e.department))).map(dept => {
                      const deptEmployees = employees.filter(e => e.department === dept);
                      const avgScore = deptEmployees.reduce((sum, e) => sum + calculateEmployeeScore(e), 0) / deptEmployees.length;
                      return (
                        <div key={dept} className="flex justify-between items-center py-2">
                          <span className="text-sm">{dept}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{avgScore.toFixed(1)}</span>
                            <div className="w-16">
                              <Progress value={avgScore * 10} className="h-2" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Value Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Most Valuable</span>
                        <span className="font-medium text-blue-600">
                          {rankedEmployees[0]?.name || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Highest ROI</span>
                        <span className="font-medium">
                          {rankedEmployees[0] ? (rankedEmployees[0] as any).valueScore?.toFixed(2) : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Salary</span>
                        <span className="font-medium">
                          ${employees.length > 0 ? 
                            Math.round(employees.reduce((sum, e) => sum + e.salary, 0) / employees.length).toLocaleString() 
                            : '0'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="benchmarks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Industry Benchmarks & Role Weightings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {JOB_CATEGORIES.map((category) => (
                      <Card key={category.name}>
                        <CardHeader>
                          <CardTitle className="text-base">{category.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground mb-3">Roles: {category.roles.join(', ')}</p>
                            <div className="space-y-1">
                              {Object.entries(category.weightings)
                                .sort(([,a], [,b]) => b - a)
                                .slice(0, 6)
                                .map(([metric, weight]) => (
                                <div key={metric} className="flex justify-between text-sm">
                                  <span className="capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                                  <span className="font-medium">{(weight * 100).toFixed(0)}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};