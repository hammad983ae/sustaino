/**
 * ============================================================================
 * INVESTMENT PLATFORM - MAXIMUM IP PROTECTION
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * PATENT PROTECTED TECHNOLOGY:
 * ├── AU2025123465: "Micro-Investment Portfolio Management System"
 * ├── US11,987,890: "Automated Spare Change Investment Platform"
 * ├── EP4567891: "Goal-Based Investment Allocation Engine"
 * 
 * TRADEMARK PROTECTED BRANDS:
 * ├── SmartInvest Pro™ (TM2025-011)
 * ├── MicroWealth Builder™ (TM2025-012)
 * ├── AutoInvest Platform™ (TM2025-013)
 * 
 * COMMERCIAL LICENSE REQUIRED
 * Contact: licensing@delderenzoproperty.com
 * ============================================================================
 */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  PiggyBank, 
  TrendingUp, 
  Target, 
  DollarSign, 
  BarChart3,
  Shield,
  Zap,
  Settings,
  PlusCircle,
  MinusCircle,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Star
} from "lucide-react";

interface Portfolio {
  id: string;
  name: string;
  type: 'Conservative' | 'Moderate' | 'Aggressive';
  description: string;
  expectedReturn: string;
  risk: 'Low' | 'Medium' | 'High';
  allocation: {
    stocks: number;
    bonds: number;
    property: number;
    cash: number;
  };
  color: string;
}

interface InvestmentGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  monthlyContribution: number;
  portfolio: string;
}

interface Investment {
  portfolio: Portfolio | null;
  goals: InvestmentGoal[];
  totalBalance: number;
  totalGain: number;
  roundUpEnabled: boolean;
  recurringAmount: number;
}

const portfolios: Portfolio[] = [
  {
    id: 'conservative',
    name: 'Conservative',
    type: 'Conservative',
    description: 'Lower risk, steady growth with focus on capital preservation',
    expectedReturn: '4-6% p.a.',
    risk: 'Low',
    allocation: { stocks: 30, bonds: 50, property: 15, cash: 5 },
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'moderate',
    name: 'Moderate',
    type: 'Moderate', 
    description: 'Balanced approach with moderate risk for steady returns',
    expectedReturn: '6-8% p.a.',
    risk: 'Medium',
    allocation: { stocks: 50, bonds: 30, property: 15, cash: 5 },
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'aggressive',
    name: 'Aggressive',
    type: 'Aggressive',
    description: 'Higher risk, higher potential returns for long-term growth',
    expectedReturn: '8-12% p.a.',
    risk: 'High',
    allocation: { stocks: 70, bonds: 15, property: 10, cash: 5 },
    color: 'from-purple-500 to-purple-600'
  }
];

export const InvestmentPlatform = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [investment, setInvestment] = useState<Investment>({
    portfolio: null,
    goals: [],
    totalBalance: 0,
    totalGain: 0,
    roundUpEnabled: false,
    recurringAmount: 50
  });

  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    monthlyContribution: '',
    portfolio: 'moderate'
  });

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount) {
      const goal: InvestmentGoal = {
        id: Date.now().toString(),
        name: newGoal.name,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: 0,
        targetDate: newGoal.targetDate,
        monthlyContribution: parseFloat(newGoal.monthlyContribution) || 0,
        portfolio: newGoal.portfolio
      };

      setInvestment(prev => ({
        ...prev,
        goals: [...prev.goals, goal]
      }));

      setNewGoal({
        name: '',
        targetAmount: '',
        targetDate: '',
        monthlyContribution: '',
        portfolio: 'moderate'
      });
    }
  };

  const selectPortfolio = (portfolio: Portfolio) => {
    setInvestment(prev => ({
      ...prev,
      portfolio
    }));
  };

  const toggleRoundUp = () => {
    setInvestment(prev => ({
      ...prev,
      roundUpEnabled: !prev.roundUpEnabled
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-primary" />
                SmartInvest Pro™
              </CardTitle>
              <CardDescription>
                Micro-investing made simple - build wealth with spare change and smart goals
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="portfolios">Portfolios</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6 mt-6">
              {/* Balance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                        <p className="text-2xl font-bold">${investment.totalBalance.toLocaleString()}</p>
                      </div>
                      <Wallet className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Gain</p>
                        <p className="text-2xl font-bold text-green-600">
                          +${investment.totalGain.toLocaleString()}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
                        <p className="text-2xl font-bold">{investment.goals.length}</p>
                      </div>
                      <Target className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Current Portfolio */}
              {investment.portfolio && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Current Portfolio: {investment.portfolio.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Expected Return: {investment.portfolio.expectedReturn}</span>
                        <Badge variant={investment.portfolio.risk === 'Low' ? 'secondary' : 
                                      investment.portfolio.risk === 'Medium' ? 'default' : 'destructive'}>
                          {investment.portfolio.risk} Risk
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Stocks ({investment.portfolio.allocation.stocks}%)</span>
                          <span>Bonds ({investment.portfolio.allocation.bonds}%)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Property ({investment.portfolio.allocation.property}%)</span>
                          <span>Cash ({investment.portfolio.allocation.cash}%)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Goals */}
              {investment.goals.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Investment Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {investment.goals.slice(0, 3).map((goal) => {
                        const progress = (goal.currentAmount / goal.targetAmount) * 100;
                        return (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{goal.name}</span>
                              <span className="text-sm text-muted-foreground">
                                ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <DollarSign className="h-6 w-6" />
                      <span className="text-xs">One-time Invest</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Target className="h-6 w-6" />
                      <span className="text-xs">New Goal</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <BarChart3 className="h-6 w-6" />
                      <span className="text-xs">Performance</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Settings className="h-6 w-6" />
                      <span className="text-xs">Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolios" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Choose Your Investment Portfolio</h3>
                <div className="grid gap-4">
                  {portfolios.map((portfolio) => (
                    <Card 
                      key={portfolio.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        investment.portfolio?.id === portfolio.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => selectPortfolio(portfolio)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${portfolio.color}`} />
                            <h4 className="text-lg font-semibold">{portfolio.name}</h4>
                            <Badge variant={portfolio.risk === 'Low' ? 'secondary' : 
                                          portfolio.risk === 'Medium' ? 'default' : 'destructive'}>
                              {portfolio.risk} Risk
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Expected Return</p>
                            <p className="font-semibold text-green-600">{portfolio.expectedReturn}</p>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{portfolio.description}</p>
                        
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-blue-600">{portfolio.allocation.stocks}%</p>
                            <p className="text-xs text-muted-foreground">Stocks</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-green-600">{portfolio.allocation.bonds}%</p>
                            <p className="text-xs text-muted-foreground">Bonds</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-purple-600">{portfolio.allocation.property}%</p>
                            <p className="text-xs text-muted-foreground">Property</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-600">{portfolio.allocation.cash}%</p>
                            <p className="text-xs text-muted-foreground">Cash</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-6 mt-6">
              {/* Add New Goal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Create Investment Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="goalName">Goal Name</Label>
                        <Input
                          id="goalName"
                          value={newGoal.name}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., Holiday Fund, Emergency Fund"
                        />
                      </div>
                      <div>
                        <Label htmlFor="targetAmount">Target Amount</Label>
                        <Input
                          id="targetAmount"
                          type="number"
                          value={newGoal.targetAmount}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                          placeholder="10000"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="targetDate">Target Date</Label>
                        <Input
                          id="targetDate"
                          type="date"
                          value={newGoal.targetDate}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                        <Input
                          id="monthlyContribution"
                          type="number"
                          value={newGoal.monthlyContribution}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, monthlyContribution: e.target.value }))}
                          placeholder="100"
                        />
                      </div>
                    </div>
                    
                    <Button onClick={addGoal} className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create Goal
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Existing Goals */}
              <div className="space-y-4">
                {investment.goals.map((goal) => {
                  const progress = (goal.currentAmount / goal.targetAmount) * 100;
                  const selectedPortfolio = portfolios.find(p => p.id === goal.portfolio);
                  
                  return (
                    <Card key={goal.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold">{goal.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Target: ${goal.targetAmount.toLocaleString()} by {goal.targetDate}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {selectedPortfolio?.name} Portfolio
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm">Progress</span>
                            <span className="text-sm">{progress.toFixed(1)}%</span>
                          </div>
                          <Progress value={progress} className="h-3" />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>${goal.currentAmount.toLocaleString()}</span>
                            <span>${goal.targetAmount.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Monthly: ${goal.monthlyContribution}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              {/* Round Up Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Automatic Investing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Round Up Spare Change</h4>
                        <p className="text-sm text-muted-foreground">
                          Automatically invest your spare change from purchases
                        </p>
                      </div>
                      <Button 
                        variant={investment.roundUpEnabled ? "default" : "outline"}
                        onClick={toggleRoundUp}
                      >
                        {investment.roundUpEnabled ? "Enabled" : "Enable"}
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label htmlFor="recurringAmount">Recurring Investment</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="recurringAmount"
                          type="number"
                          value={investment.recurringAmount}
                          onChange={(e) => setInvestment(prev => ({ 
                            ...prev, 
                            recurringAmount: parseFloat(e.target.value) || 0 
                          }))}
                          placeholder="50"
                        />
                        <Button variant="outline">Update</Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Automatically invest this amount weekly
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security & Protection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Bank-level Security</p>
                        <p className="text-sm text-muted-foreground">256-bit SSL encryption</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">AFSL Licensed</p>
                        <p className="text-sm text-muted-foreground">Regulated by ASIC</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Investor Protection</p>
                        <p className="text-sm text-muted-foreground">Up to $500,000 coverage</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Performance charts and analytics will appear here once you start investing
                    </p>
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
