import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Cpu, 
  Shield, 
  Zap, 
  Globe, 
  Database, 
  Brain, 
  Lock, 
  TrendingUp,
  Code,
  FileCode,
  Layers,
  GitBranch,
  Star,
  Award,
  CheckCircle,
  Play
} from 'lucide-react';

const SustanoProEcosystemDemo = () => {
  const codebaseStats = [
    { component: "Core Engine", lines: "847,230", language: "TypeScript/React", coverage: 94 },
    { component: "AI Modules", lines: "234,567", language: "Python/TensorFlow", coverage: 91 },
    { component: "Blockchain Layer", lines: "156,789", language: "Solidity/Web3", coverage: 96 },
    { component: "API Gateway", lines: "89,456", language: "Node.js/Express", coverage: 89 },
    { component: "Database Schemas", lines: "45,678", language: "PostgreSQL/SQL", coverage: 92 }
  ];

  const ipAssets = [
    { type: "Patents Filed", count: "47", status: "Active", value: "$12.4M" },
    { type: "Trademarks", count: "23", status: "Protected", value: "$3.8M" },
    { type: "Trade Secrets", count: "156", status: "Secured", value: "$28.7M" },
    { type: "Copyrights", count: "89", status: "Registered", value: "$5.2M" }
  ];

  const ecosystemFunctions = [
    {
      name: "SustanoVal™ Engine",
      description: "AI-powered property valuation with 98.7% accuracy",
      metrics: { accuracy: 98.7, speed: "0.3s", predictions: "2.1M+" },
      status: "Active"
    },
    {
      name: "ESG Climate Assessment",
      description: "Comprehensive environmental impact analysis",
      metrics: { coverage: 95.4, factors: "847", assessments: "45K+" },
      status: "Active"
    },
    {
      name: "Blockchain Validation",
      description: "Immutable property transaction records",
      metrics: { uptime: 99.9, transactions: "156K+", validators: "2,347" },
      status: "Active"
    },
    {
      name: "AI Market Intelligence",
      description: "Real-time market analysis and predictions",
      metrics: { markets: 247, accuracy: 94.2, updates: "Real-time" },
      status: "Active"
    }
  ];

  const architectureStack = [
    { layer: "Frontend", tech: "React 18, TypeScript, Tailwind CSS", performance: 98 },
    { layer: "Backend", tech: "Node.js, Express, Supabase", performance: 95 },
    { layer: "AI/ML", tech: "TensorFlow, PyTorch, OpenAI GPT", performance: 94 },
    { layer: "Blockchain", tech: "Ethereum, Polygon, Web3.js", performance: 97 },
    { layer: "Database", tech: "PostgreSQL, Redis, Vector DB", performance: 96 },
    { layer: "Infrastructure", tech: "AWS, Docker, Kubernetes", performance: 99 }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-500" />
          Sustaino Pro Ecosystem Demo
        </CardTitle>
        <p className="text-muted-foreground">
          Revolutionary AI-powered property intelligence platform with comprehensive digital asset capabilities
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="functions" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="functions" className="text-xs">Core Functions</TabsTrigger>
            <TabsTrigger value="codebase" className="text-xs">Codebase</TabsTrigger>
            <TabsTrigger value="ip" className="text-xs">IP Portfolio</TabsTrigger>
            <TabsTrigger value="architecture" className="text-xs">Architecture</TabsTrigger>
          </TabsList>
          
          <TabsContent value="functions" className="space-y-4">
            <div className="grid gap-3">
              {ecosystemFunctions.map((func, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        {func.name}
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          {func.status}
                        </Badge>
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{func.description}</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Play className="h-3 w-3 mr-1" />
                      Demo
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {Object.entries(func.metrics).map(([key, value]) => (
                      <div key={key} className="p-2 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground capitalize">{key}</p>
                        <p className="font-bold text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Platform Valuation: $64.57M AUD
              </h4>
              <p className="text-xs text-muted-foreground">
                Based on proprietary IP, active user base, and market positioning
              </p>
            </div>
          </TabsContent>

          <TabsContent value="codebase" className="space-y-4">
            <div className="grid gap-3">
              {codebaseStats.map((stat, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-sm">{stat.component}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">{stat.language}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Lines of Code: {stat.lines}</span>
                      <span>Test Coverage: {stat.coverage}%</span>
                    </div>
                    <Progress value={stat.coverage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <FileCode className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <p className="font-bold text-lg">1.37M+</p>
                <p className="text-xs text-muted-foreground">Total Lines of Code</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <GitBranch className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="font-bold text-lg">2,847</p>
                <p className="text-xs text-muted-foreground">Git Commits</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ip" className="space-y-4">
            <div className="grid gap-3">
              {ipAssets.map((asset, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                        <Lock className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{asset.type}</p>
                        <p className="text-xs text-muted-foreground">Status: {asset.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{asset.count}</p>
                      <p className="text-xs text-muted-foreground">{asset.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-500" />
                Total IP Portfolio Value: $50.1M AUD
              </h4>
              <p className="text-xs text-muted-foreground">
                Comprehensive intellectual property protection across all core technologies
              </p>
            </div>
          </TabsContent>

          <TabsContent value="architecture" className="space-y-4">
            <div className="grid gap-3">
              {architectureStack.map((layer, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-emerald-500" />
                      <span className="font-medium text-sm">{layer.layer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs">{layer.performance}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{layer.tech}</p>
                  <Progress value={layer.performance} className="h-2" />
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <Database className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="font-bold text-sm">99.9%</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                <p className="font-bold text-sm">&lt;300ms</p>
                <p className="text-xs text-muted-foreground">Response Time</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="font-bold text-sm">SOC2</p>
                <p className="text-xs text-muted-foreground">Certified</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SustanoProEcosystemDemo;