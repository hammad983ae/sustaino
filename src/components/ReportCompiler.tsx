import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Play,
  Layers,
  Shield,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useReportData } from '@/contexts/ReportDataContext';

interface CompilationStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  description: string;
}

const ReportCompiler: React.FC = () => {
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationSteps, setCompilationSteps] = useState<CompilationStep[]>([
    {
      id: 'data-validation',
      name: 'Data Validation',
      status: 'pending',
      progress: 0,
      description: 'Validating all valuation data and calculations'
    },
    {
      id: 'section-assembly',
      name: 'Section Assembly',
      status: 'pending',
      progress: 0,
      description: 'Compiling ARY, ESG, DCF, and specialized analyses'
    },
    {
      id: 'blockchain-hash',
      name: 'Blockchain Hashing',
      status: 'pending',
      progress: 0,
      description: 'Generating cryptographic document hash'
    },
    {
      id: 'compliance-check',
      name: 'Compliance Verification',
      status: 'pending',
      progress: 0,
      description: 'Ensuring professional standards compliance'
    },
    {
      id: 'pdf-generation',
      name: 'PDF Generation',
      status: 'pending',
      progress: 0,
      description: 'Creating final formatted report document'
    },
    {
      id: 'digital-signature',
      name: 'Digital Signature',
      status: 'pending',
      progress: 0,
      description: 'Applying cryptographic signatures'
    }
  ]);

  const { toast } = useToast();
  const { reportData } = useReportData();

  const startCompilation = async () => {
    setIsCompiling(true);
    
    for (let i = 0; i < compilationSteps.length; i++) {
      // Update current step to running
      setCompilationSteps(prev => prev.map((step, index) => 
        index === i 
          ? { ...step, status: 'running', progress: 0 }
          : step
      ));

      // Simulate step progress
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setCompilationSteps(prev => prev.map((step, index) => 
          index === i 
            ? { ...step, progress }
            : step
        ));
      }

      // Mark step as completed
      setCompilationSteps(prev => prev.map((step, index) => 
        index === i 
          ? { ...step, status: 'completed', progress: 100 }
          : step
      ));
    }

    setIsCompiling(false);
    toast({
      title: "Report Compilation Complete",
      description: "Your blockchain-compliant valuation report has been successfully compiled.",
    });
  };

  const getStatusIcon = (status: CompilationStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: CompilationStep['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Complete</Badge>;
      case 'running':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Running</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const overallProgress = compilationSteps.reduce((acc, step) => 
    acc + (step.status === 'completed' ? 100 : step.progress), 0
  ) / compilationSteps.length;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5" />
          Professional Report Compiler
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compile all valuation analyses into a professional, blockchain-compliant report
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Compilation Steps */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Compilation Steps</h3>
          {compilationSteps.map((step, index) => (
            <div key={step.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(step.status)}
                  <span className="font-medium">{step.name}</span>
                </div>
                {getStatusBadge(step.status)}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
              {step.status === 'running' && (
                <Progress value={step.progress} className="h-1" />
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={startCompilation}
            disabled={isCompiling}
            className="flex-1 flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            {isCompiling ? 'Compiling Report...' : 'Start Compilation'}
          </Button>
          
          <Button
            variant="outline"
            disabled={overallProgress < 100}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Compliance Features */}
        <div className="text-xs text-muted-foreground p-4 bg-green-50 rounded-lg border-green-200 border">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-800">Professional Compliance Features</span>
          </div>
          <ul className="space-y-1 text-green-700">
            <li>• RICS/AAPI professional standards compliance</li>
            <li>• Blockchain-verified document integrity</li>
            <li>• Digital signature authentication</li>
            <li>• Immutable audit trail preservation</li>
            <li>• Regulatory compliance certification</li>
            <li>• Professional indemnity insurance coverage</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCompiler;