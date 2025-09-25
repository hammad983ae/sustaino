import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useReportData } from '@/contexts/ReportDataContext';
import { 
  User, 
  Building, 
  DollarSign, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Target,
  Calculator
} from 'lucide-react';

interface ClientFinancialSummaryProps {
  showFullDetails?: boolean;
  purpose?: 'valuation' | 'risk-assessment' | 'report-summary';
}

const ClientFinancialSummary: React.FC<ClientFinancialSummaryProps> = ({ 
  showFullDetails = true, 
  purpose = 'valuation' 
}) => {
  const { reportData } = useReportData();

  // Extract financial data from various sources
  const financialData = reportData?.accountingFinancials;
  const clientData = reportData?.reportConfig;
  const propertyData = reportData?.propertyDetails;

  // Calculate aggregated financial metrics
  const calculateFinancialProfile = () => {
    if (!financialData) return null;

    const creditScore = financialData.creditAssessment?.score || 0;
    const revenue = financialData.accountingSoftware?.revenue || 0;
    const profitMargin = financialData.accountingSoftware?.profitMargin || 0;
    
    // Calculate overall financial strength score
    const creditStrength = creditScore >= 750 ? 10 : creditScore >= 700 ? 8 : creditScore >= 650 ? 6 : 4;
    const revenueStrength = revenue >= 200000 ? 10 : revenue >= 100000 ? 8 : revenue >= 50000 ? 6 : 4;
    const profitabilityStrength = profitMargin >= 20 ? 10 : profitMargin >= 15 ? 8 : profitMargin >= 10 ? 6 : 4;
    
    const overallScore = (creditStrength + revenueStrength + profitabilityStrength) / 3;
    
    return {
      creditScore,
      revenue,
      profitMargin,
      creditStrength,
      revenueStrength,
      profitabilityStrength,
      overallScore,
      riskLevel: overallScore >= 8 ? 'Low' : overallScore >= 6 ? 'Medium' : 'High'
    };
  };

  const financialProfile = calculateFinancialProfile();

  // Risk implications for valuation
  const getRiskImplications = () => {
    if (!financialProfile) return [];

    const implications = [];
    
    if (financialProfile.creditScore < 650) {
      implications.push({
        type: 'High Risk',
        factor: 'Credit Score',
        impact: 'May affect loan serviceability and increase LMI premium',
        recommendation: 'Consider credit improvement strategies'
      });
    }

    if (financialProfile.revenue < 50000) {
      implications.push({
        type: 'Medium Risk',
        factor: 'Income Level',
        impact: 'Limited borrowing capacity may affect property acquisition',
        recommendation: 'Explore income diversification options'
      });
    }

    if (financialProfile.profitMargin < 10) {
      implications.push({
        type: 'Medium Risk',
        factor: 'Profitability',
        impact: 'Low profit margins may indicate financial stress',
        recommendation: 'Review expense management and revenue optimization'
      });
    }

    if (financialProfile.overallScore >= 8) {
      implications.push({
        type: 'Low Risk',
        factor: 'Strong Financial Position',
        impact: 'Excellent creditworthiness supports favorable lending terms',
        recommendation: 'Maintain current financial management practices'
      });
    }

    return implications;
  };

  const riskImplications = getRiskImplications();

  // Valuation impact summary
  const getValuationImpact = () => {
    if (!financialProfile) return null;

    const baseImpact = {
      lendingCapacity: financialProfile.overallScore >= 8 ? 'Excellent' : 
                      financialProfile.overallScore >= 6 ? 'Good' : 'Limited',
      lmiRequired: financialProfile.creditScore >= 700 ? 'Standard' : 'Premium rates likely',
      riskPremium: financialProfile.riskLevel === 'Low' ? '0-5%' : 
                   financialProfile.riskLevel === 'Medium' ? '5-15%' : '15%+',
      marketPosition: financialProfile.overallScore >= 8 ? 'Strong buyer' : 
                      financialProfile.overallScore >= 6 ? 'Qualified buyer' : 'Challenged buyer'
    };

    return baseImpact;
  };

  const valuationImpact = getValuationImpact();

  if (!financialData && !clientData) {
    return (
      <Card className="border-amber-200 bg-amber-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <AlertTriangle className="h-5 w-5" />
            Client Financial Data Required
          </CardTitle>
          <CardDescription>
            Complete the Accounting & Financials section to generate comprehensive risk and valuation insights
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Client Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Client Financial Profile
            {purpose === 'valuation' && <Badge variant="outline">Valuation Context</Badge>}
            {purpose === 'risk-assessment' && <Badge variant="outline">Risk Assessment</Badge>}
          </CardTitle>
          <CardDescription>
            Integrated financial assessment from Professional Financial Assessment Tool™
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Credit Assessment */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Credit Profile</span>
              </div>
              {financialProfile && (
                <>
                  <div className="text-2xl font-bold text-primary">
                    {financialProfile.creditScore}
                  </div>
                  <Badge variant={financialProfile.creditScore >= 750 ? "default" : 
                               financialProfile.creditScore >= 650 ? "secondary" : "destructive"}>
                    {financialData?.creditAssessment?.rating || 'Assessed'}
                  </Badge>
                  <Progress value={financialProfile.creditStrength * 10} className="h-2" />
                </>
              )}
            </div>

            {/* Revenue Profile */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">Annual Revenue</span>
              </div>
              {financialProfile && (
                <>
                  <div className="text-xl font-bold text-primary">
                    ${financialProfile.revenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Profit Margin: {financialProfile.profitMargin.toFixed(1)}%
                  </div>
                  <Progress value={financialProfile.revenueStrength * 10} className="h-2" />
                </>
              )}
            </div>

            {/* Risk Level */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span className="font-medium">Risk Level</span>
              </div>
              {financialProfile && (
                <>
                  <Badge variant={financialProfile.riskLevel === 'Low' ? "default" : 
                               financialProfile.riskLevel === 'Medium' ? "secondary" : "destructive"}
                         className="text-lg px-3 py-1">
                    {financialProfile.riskLevel}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Overall Score: {financialProfile.overallScore.toFixed(1)}/10
                  </div>
                  <Progress value={financialProfile.overallScore * 10} className="h-2" />
                </>
              )}
            </div>

            {/* Market Position */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">Market Position</span>
              </div>
              {valuationImpact && (
                <>
                  <div className="text-sm font-medium text-primary">
                    {valuationImpact.marketPosition}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Lending: {valuationImpact.lendingCapacity}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Risk Premium: {valuationImpact.riskPremium}
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Implications */}
      {showFullDetails && riskImplications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Financial Risk Implications for {purpose === 'valuation' ? 'Valuation' : 'Assessment'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskImplications.map((implication, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="mt-1">
                    {implication.type === 'Low Risk' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : implication.type === 'Medium Risk' ? (
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={implication.type === 'Low Risk' ? "default" : 
                                   implication.type === 'Medium Risk' ? "secondary" : "destructive"}>
                        {implication.type}
                      </Badge>
                      <span className="font-medium">{implication.factor}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{implication.impact}</p>
                    <p className="text-sm font-medium text-primary">{implication.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Valuation Context */}
      {purpose === 'valuation' && valuationImpact && showFullDetails && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Calculator className="h-5 w-5" />
              Valuation Considerations
            </CardTitle>
            <CardDescription>
              How client financial profile impacts property valuation and lending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Lending Capacity:</span>
                  <span className="ml-2 text-primary">{valuationImpact.lendingCapacity}</span>
                </div>
                <div>
                  <span className="font-medium">LMI Requirements:</span>
                  <span className="ml-2 text-primary">{valuationImpact.lmiRequired}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Risk Premium:</span>
                  <span className="ml-2 text-primary">{valuationImpact.riskPremium}</span>
                </div>
                <div>
                  <span className="font-medium">Buyer Strength:</span>
                  <span className="ml-2 text-primary">{valuationImpact.marketPosition}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Sources */}
      <Card className="border-muted-foreground/20">
        <CardContent className="pt-4">
          <div className="text-xs text-muted-foreground">
            <strong>Data Sources:</strong> Professional Financial Assessment Tool™, 
            {financialData?.accountingSoftware?.platform && ` ${financialData.accountingSoftware.platform},`}
            {financialData?.creditAssessment && ' Credit Assessment,'} 
            {financialData?.governmentData?.atoConnected && ' ATO Integration,'} 
            {financialData?.bankingData?.connected && ' Banking Data'}
            <div className="mt-1">
              <strong>Last Updated:</strong> {financialData?.accountingSoftware?.lastSync ? 
                new Date(financialData.accountingSoftware.lastSync).toLocaleDateString() : 'Not available'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientFinancialSummary;