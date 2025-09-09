import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Star, TrendingUp, Zap, Droplets, Wind } from "lucide-react";

interface NABERSData {
  energyScore: number;
  waterScore: number;
  wasteScore: number;
  ieqScore: number;
  waterEfficiency: string;
  ieqSelection: string;
}

interface GreenStarData {
  pointsAchieved: number;
  maxPoints: number;
}

interface NaTHERSData {
  healthSafetyScore: number;
  operationalScore: number;
  environmentalScore: number;
}

export default function SustainabilityRatingCalculator() {
  const [nabersData, setNabersData] = useState<NABERSData>({
    energyScore: 0,
    waterScore: 0,
    wasteScore: 0,
    ieqScore: 0,
    waterEfficiency: '',
    ieqSelection: ''
  });

  const [greenStarData, setGreenStarData] = useState<GreenStarData>({
    pointsAchieved: 0,
    maxPoints: 100
  });

  const [nathersData, setNathersData] = useState<NaTHERSData>({
    healthSafetyScore: 0,
    operationalScore: 0,
    environmentalScore: 0
  });

  // NABERS Rating Calculation
  const calculateNABERSScore = (): number => {
    const { energyScore, waterScore, wasteScore, ieqScore } = nabersData;
    return (energyScore * 0.4) + (waterScore * 0.3) + (wasteScore * 0.2) + (ieqScore * 0.1);
  };

  const getNABERSStarRating = (score: number): string => {
    if (score >= 90) return "6 Stars";
    if (score >= 75) return "5 Stars";
    if (score >= 60) return "4 Stars";
    if (score >= 45) return "3 Stars";
    if (score >= 30) return "2 Stars";
    if (score >= 15) return "1 Star";
    return "Below 1 Star";
  };

  // Green Star Rating Calculation
  const calculateGreenStarPercentage = (): number => {
    const { pointsAchieved, maxPoints } = greenStarData;
    return maxPoints > 0 ? (pointsAchieved / maxPoints) * 100 : 0;
  };

  const getGreenStarRating = (percentage: number): string => {
    if (percentage >= 75) return "6 Stars";
    if (percentage >= 60) return "5 Stars";
    if (percentage >= 50) return "4 Stars";
    return "Below 4 Stars";
  };

  // NaTHERS Rating Calculation
  const calculateNaTHERSScore = (): number => {
    const { healthSafetyScore, operationalScore, environmentalScore } = nathersData;
    return (healthSafetyScore * 0.4) + (operationalScore * 0.3) + (environmentalScore * 0.3);
  };

  const getNaTHERSRating = (score: number): string => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 55) return "Fair";
    return "Needs Improvement";
  };

  const nabersScore = calculateNABERSScore();
  const greenStarPercentage = calculateGreenStarPercentage();
  const nathersScore = calculateNaTHERSScore();

  const handleNabersChange = (field: keyof NABERSData, value: string | number) => {
    setNabersData(prev => ({ ...prev, [field]: value }));
  };

  const handleGreenStarChange = (field: keyof GreenStarData, value: number) => {
    setGreenStarData(prev => ({ ...prev, [field]: value }));
  };

  const handleNathersChange = (field: keyof NaTHERSData, value: number) => {
    setNathersData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-blue-600" />
            Automated Sustainability Rating Calculator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Calculate NABERS, Green Star, and NaTHERS ratings using automated formulas
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="nabers" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="nabers" className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                NABERS
              </TabsTrigger>
              <TabsTrigger value="greenstar" className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Green Star
              </TabsTrigger>
              <TabsTrigger value="nathers" className="flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                NaTHERS
              </TabsTrigger>
            </TabsList>

            {/* NABERS Tab */}
            <TabsContent value="nabers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">NABERS Rating Calculator</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    National Australian Built Environment Rating System
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Formula Display */}
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Formula:</h4>
                    <p className="text-sm font-mono">
                      Total Score = (Energy × 0.4) + (Water × 0.3) + (Waste × 0.2) + (IEQ × 0.1)
                    </p>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="energy-score">Energy Score (0-100)</Label>
                      <Input
                        id="energy-score"
                        type="number"
                        min="0"
                        max="100"
                        value={nabersData.energyScore}
                        onChange={(e) => handleNabersChange('energyScore', Number(e.target.value))}
                        placeholder="Enter energy efficiency score"
                      />
                    </div>
                    <div>
                      <Label htmlFor="water-score">Water Score (0-100)</Label>
                      <Input
                        id="water-score"
                        type="number"
                        min="0"
                        max="100"
                        value={nabersData.waterScore}
                        onChange={(e) => handleNabersChange('waterScore', Number(e.target.value))}
                        placeholder="Enter water efficiency score"
                      />
                    </div>
                    <div>
                      <Label htmlFor="waste-score">Waste Management Score (0-100)</Label>
                      <Input
                        id="waste-score"
                        type="number"
                        min="0"
                        max="100"
                        value={nabersData.wasteScore}
                        onChange={(e) => handleNabersChange('wasteScore', Number(e.target.value))}
                        placeholder="Percentage diverted from landfill"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ieq-score">Indoor Environment Score (0-100)</Label>
                      <Input
                        id="ieq-score"
                        type="number"
                        min="0"
                        max="100"
                        value={nabersData.ieqScore}
                        onChange={(e) => handleNabersChange('ieqScore', Number(e.target.value))}
                        placeholder="Indoor air quality metrics"
                      />
                    </div>
                  </div>

                  {/* Additional NABERS Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="water-efficiency">NABERS Water Efficiency</Label>
                      <Select onValueChange={(value) => handleNabersChange('waterEfficiency', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select water efficiency rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6-star">6 Star - Excellent</SelectItem>
                          <SelectItem value="5-star">5 Star - Very Good</SelectItem>
                          <SelectItem value="4-star">4 Star - Good</SelectItem>
                          <SelectItem value="3-star">3 Star - Average</SelectItem>
                          <SelectItem value="2-star">2 Star - Below Average</SelectItem>
                          <SelectItem value="1-star">1 Star - Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="ieq-selection">Indoor Environment Quality (IEQ)</Label>
                      <Select onValueChange={(value) => handleNabersChange('ieqSelection', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select IEQ assessment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="air-quality">Air Quality Assessment</SelectItem>
                          <SelectItem value="thermal-comfort">Thermal Comfort</SelectItem>
                          <SelectItem value="acoustic-comfort">Acoustic Comfort</SelectItem>
                          <SelectItem value="visual-comfort">Visual Comfort & Lighting</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive IEQ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">NABERS Rating Result</h4>
                      <Badge variant="outline" className="text-lg">
                        {getNABERSStarRating(nabersScore)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Total Score</div>
                        <div className="text-2xl font-bold">{nabersScore.toFixed(1)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Progress</div>
                        <Progress value={nabersScore} className="mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Green Star Tab */}
            <TabsContent value="greenstar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Green Star Rating Calculator</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Green Building Council of Australia rating system
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Formula Display */}
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Formula:</h4>
                    <p className="text-sm font-mono">
                      Percentage Score = (Points Achieved / Max Points) × 100
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="points-achieved">Points Achieved</Label>
                      <Input
                        id="points-achieved"
                        type="number"
                        min="0"
                        value={greenStarData.pointsAchieved}
                        onChange={(e) => handleGreenStarChange('pointsAchieved', Number(e.target.value))}
                        placeholder="Enter points achieved"
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-points">Maximum Possible Points</Label>
                      <Input
                        id="max-points"
                        type="number"
                        min="1"
                        value={greenStarData.maxPoints}
                        onChange={(e) => handleGreenStarChange('maxPoints', Number(e.target.value))}
                        placeholder="Enter maximum points"
                      />
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Green Star Rating Result</h4>
                      <Badge variant="outline" className="text-lg bg-green-100">
                        {getGreenStarRating(greenStarPercentage)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Percentage Score</div>
                        <div className="text-2xl font-bold">{greenStarPercentage.toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Progress</div>
                        <Progress value={greenStarPercentage} className="mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* NaTHERS Tab */}
            <TabsContent value="nathers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">NaTHERS Rating Calculator</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    National Thermal Performance Rating System
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Formula Display */}
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Formula:</h4>
                    <p className="text-sm font-mono">
                      Score = (Health & Safety × 0.4) + (Operational × 0.3) + (Environmental × 0.3)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="health-safety">Health & Safety Score (0-100)</Label>
                      <Input
                        id="health-safety"
                        type="number"
                        min="0"
                        max="100"
                        value={nathersData.healthSafetyScore}
                        onChange={(e) => handleNathersChange('healthSafetyScore', Number(e.target.value))}
                        placeholder="Incidents per period"
                      />
                    </div>
                    <div>
                      <Label htmlFor="operational">Operational Practices (0-100)</Label>
                      <Input
                        id="operational"
                        type="number"
                        min="0"
                        max="100"
                        value={nathersData.operationalScore}
                        onChange={(e) => handleNathersChange('operationalScore', Number(e.target.value))}
                        placeholder="Policy compliance levels"
                      />
                    </div>
                    <div>
                      <Label htmlFor="environmental">Environmental Management (0-100)</Label>
                      <Input
                        id="environmental"
                        type="number"
                        min="0"
                        max="100"
                        value={nathersData.environmentalScore}
                        onChange={(e) => handleNathersChange('environmentalScore', Number(e.target.value))}
                        placeholder="Implementation procedures"
                      />
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">NaTHERS Rating Result</h4>
                      <Badge variant="outline" className="text-lg bg-blue-100">
                        {getNaTHERSRating(nathersScore)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Total Score</div>
                        <div className="text-2xl font-bold">{nathersScore.toFixed(1)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Progress</div>
                        <Progress value={nathersScore} className="mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}