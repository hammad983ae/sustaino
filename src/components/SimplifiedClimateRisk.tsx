import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CloudRain, 
  Flame, 
  Wind, 
  Thermometer, 
  Droplets,
  AlertTriangle,
  TrendingUp,
  MapPin
} from 'lucide-react';

const SimplifiedClimateRisk = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const riskFactors = [
    {
      name: 'Flood Risk',
      icon: CloudRain,
      level: 'Medium',
      score: 65,
      color: 'warning',
      description: 'Moderate flood risk based on historical data and topography'
    },
    {
      name: 'Bushfire Risk',
      icon: Flame,
      level: 'Low',
      score: 25,
      color: 'success',
      description: 'Low bushfire risk due to urban location and fire management'
    },
    {
      name: 'Cyclone Risk',
      icon: Wind,
      level: 'Very Low',
      score: 10,
      color: 'success',
      description: 'Minimal cyclone risk for this geographic region'
    },
    {
      name: 'Extreme Heat',
      icon: Thermometer,
      level: 'High',
      score: 80,
      color: 'destructive',
      description: 'High heat risk with increasing temperature trends'
    },
    {
      name: 'Drought Risk',
      icon: Droplets,
      level: 'Medium',
      score: 55,
      color: 'warning',
      description: 'Moderate drought risk affecting water security'
    }
  ];

  const overallRiskScore = Math.round(riskFactors.reduce((acc, factor) => acc + factor.score, 0) / riskFactors.length);

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-destructive';
    if (score >= 60) return 'text-warning';
    if (score >= 40) return 'text-info';
    return 'text-success';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'Very High';
    if (score >= 60) return 'High';
    if (score >= 40) return 'Medium';
    if (score >= 20) return 'Low';
    return 'Very Low';
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-warning" />
            Climate Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Comprehensive climate risk analysis for property evaluation including flood, bushfire, 
            cyclone, extreme heat, and drought risks.
          </p>
          
          {!showResults && (
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing}
              className="w-full sm:w-auto"
            >
              {isAnalyzing ? 'Analyzing Climate Risks...' : 'Start Climate Risk Analysis'}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="font-medium">Analyzing climate risk factors...</span>
              </div>
              <Progress value={66} className="w-full" />
              <div className="text-sm text-muted-foreground space-y-1">
                <div>✓ Processing geographic location data</div>
                <div>✓ Analyzing historical weather patterns</div>
                <div className="opacity-50">• Calculating risk probabilities</div>
                <div className="opacity-50">• Generating risk assessment report</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {showResults && (
        <div className="space-y-6 animate-fade-in">
          {/* Overall Risk Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Overall Climate Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-4xl font-bold ${getRiskColor(overallRiskScore)}`}>
                    {overallRiskScore}/100
                  </div>
                  <div className="text-lg font-medium text-muted-foreground">
                    {getRiskLevel(overallRiskScore)} Risk
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={overallRiskScore >= 60 ? 'destructive' : overallRiskScore >= 40 ? 'secondary' : 'default'}>
                    {getRiskLevel(overallRiskScore)}
                  </Badge>
                </div>
              </div>
              <Progress value={overallRiskScore} className="mt-4" />
            </CardContent>
          </Card>

          {/* Individual Risk Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {riskFactors.map((factor, index) => (
              <Card key={index} className="hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <factor.icon className="h-4 w-4" />
                    {factor.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-bold ${getRiskColor(factor.score)}`}>
                        {factor.score}/100
                      </span>
                      <Badge variant={factor.score >= 60 ? 'destructive' : factor.score >= 40 ? 'secondary' : 'default'}>
                        {factor.level}
                      </Badge>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {factor.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Risk Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Risk Assessment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Risk Factors</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Extreme heat poses the highest risk (80/100)</li>
                      <li>• Flood risk is moderate and manageable (65/100)</li>
                      <li>• Bushfire and cyclone risks are minimal</li>
                      <li>• Drought conditions may affect water security</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Consider heat mitigation measures</li>
                      <li>• Install flood-resistant features if applicable</li>
                      <li>• Implement water conservation systems</li>
                      <li>• Regular maintenance of cooling systems</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium">Climate Risk Impact</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        This property has a <strong>{getRiskLevel(overallRiskScore).toLowerCase()}</strong> overall 
                        climate risk profile. The main concerns are extreme heat and moderate flood risk. 
                        Consider these factors for insurance, maintenance planning, and future property value considerations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={() => setShowResults(false)}>
              Run New Analysis
            </Button>
            <Button variant="outline">
              Export Report
            </Button>
            <Button variant="outline">
              View Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimplifiedClimateRisk;