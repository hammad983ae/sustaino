import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  MapPin, 
  Camera, 
  Brain, 
  FileText, 
  CheckCircle, 
  Clock,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';

export const ISFVWorkflowDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const automationSteps = [
    {
      id: 'input',
      title: 'Address Input',
      description: 'Enter property address',
      icon: MapPin,
      status: 'completed',
      time: '0.5s',
      data: '123 Collins Street, Melbourne VIC 3000'
    },
    {
      id: 'data-fetch',
      title: 'Data Aggregation',
      description: 'Fetching property data from multiple sources',
      icon: Brain,
      status: 'completed', 
      time: '2.3s',
      data: 'CoreLogic, Domain, RP Data, Council records'
    },
    {
      id: 'aerial-capture',
      title: 'Aerial Photography',
      description: 'Capturing high-resolution aerial imagery',
      icon: Camera,
      status: 'completed',
      time: '1.8s',
      data: '4K aerial photos captured from 8 angles'
    },
    {
      id: 'ai-analysis',
      title: 'AI Analysis',
      description: 'ML-powered property assessment',
      icon: Zap,
      status: 'completed',
      time: '3.2s',
      data: 'Computer vision, market analysis, risk assessment'
    },
    {
      id: 'valuation',
      title: 'Instant Valuation',
      description: 'Generating ISFV report',
      icon: Target,
      status: 'completed',
      time: '1.1s',
      data: '$1,250,000 ± 5% confidence'
    },
    {
      id: 'professional',
      title: 'Professional Review',
      description: 'Valuer verification and sign-off',
      icon: CheckCircle,
      status: 'pending',
      time: '15 min',
      data: 'Awaiting licensed valuer approval'
    }
  ];

  const runDemo = () => {
    setIsRunning(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= automationSteps.length - 2) {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const progressPercentage = ((currentStep + 1) / automationSteps.length) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          <h3 className="text-2xl font-bold text-primary">ISFV Automation Workflow</h3>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Instant Statutory Form Valuation powered by AI and automation. Complete property valuation in under 10 seconds.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Button onClick={runDemo} disabled={isRunning} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
            {isRunning ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Running Automation...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Run ISFV Demo
              </>
            )}
          </Button>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
            Total Time: ~9 seconds
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Automation Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="grid gap-4">
          {automationSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStep;
            const isCurrent = index === currentStep && isRunning;
            
            return (
              <Card key={step.id} className={`transition-all duration-500 ${
                isActive ? 'border-primary shadow-md' : 'border-muted'
              } ${isCurrent ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      isActive ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                    } ${isCurrent ? 'animate-pulse' : ''}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{step.title}</h4>
                        {isActive && !isCurrent && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {isCurrent && (
                          <Clock className="h-4 w-4 text-yellow-500 animate-spin" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {isActive && (
                        <p className="text-xs mt-1 text-primary font-medium">{step.data}</p>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <Badge variant={isActive ? 'default' : 'secondary'} className="text-xs">
                        {step.time}
                      </Badge>
                      {step.status === 'pending' && !isActive && (
                        <p className="text-xs text-muted-foreground mt-1">Waiting</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {currentStep >= automationSteps.length - 2 && (
          <Card className="mt-6 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Target className="h-5 w-5" />
                ISFV Report Generated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Valuation Result</h4>
                  <p className="text-2xl font-bold text-green-700">$1,250,000</p>
                  <p className="text-sm text-muted-foreground">95% confidence interval: ±5%</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Next Steps</h4>
                  <div className="space-y-1 text-sm">
                    <p>• Professional valuer review required</p>
                    <p>• Digital signature and certification</p>
                    <p>• Final report delivery to client</p>
                  </div>
                </div>
              </div>
              <Button className="mt-4 w-full" variant="outline">
                <ArrowRight className="h-4 w-4 mr-2" />
                Continue to Professional Tab
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};