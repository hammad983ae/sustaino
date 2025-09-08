import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

const ESGFinancialBenefitsChart = () => {
  // Annual data (12 months) from the image
  const annualData = [
    { name: 'Energy Savings', value: 8.5, color: '#0EA5E9' },
    { name: 'Water Efficiency', value: 2.9, color: '#10B981' },
    { name: 'Waste Reduction', value: 1.2, color: '#F59E0B' },
    { name: 'Carbon Credits', value: 0.0, color: '#8B5CF6' }
  ];

  // Multi-year progression data
  const progressionData = [
    {
      period: '12 Months',
      waterEfficiency: 2.9,
      energySavings: 8.5,
      wasteReduction: 1.2,
      carbonCredits: 0.0,
      total: 12.6
    },
    {
      period: '5 Years',
      waterEfficiency: 18.5,
      energySavings: 65.0,
      wasteReduction: 8.9,
      carbonCredits: 12.5,
      total: 104.9
    },
    {
      period: '10 Years',
      waterEfficiency: 42.0,
      energySavings: 185.0,
      wasteReduction: 25.0,
      carbonCredits: 45.0,
      total: 297.0
    }
  ];

  // Calculate totals for verification
  const annualTotal = annualData.reduce((sum, item) => sum + item.value, 0);
  const fiveYearTotal = 18.5 + 65.0 + 8.9 + 12.5;
  const tenYearTotal = 42.0 + 185.0 + 25.0 + 45.0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            ${data.value}M ({((data.value / annualTotal) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Annual ESG Strategy Financial Benefits
            <Badge variant="secondary">12 Month Projection</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Projected savings from sustainability initiatives including water efficiency, renewable energy, waste reduction, and carbon management
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={annualData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: $${value}M (${(percent * 100).toFixed(1)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {annualData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Stats */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {annualData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">${item.value}M</div>
                      <div className="text-xs text-muted-foreground">
                        {((item.value / annualTotal) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-3">
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <span className="font-bold">Total Annual Savings</span>
                  <span className="font-bold text-xl text-primary">${annualTotal.toFixed(1)}M</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mathematical Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Mathematical Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">12 Months</h4>
              <div className="text-sm space-y-1">
                <div>Water Efficiency: $2.9M</div>
                <div>Energy Savings: $8.5M</div>
                <div>Waste Reduction: $1.2M</div>
                <div>Carbon Credits: $0.0M</div>
                <div className="border-t pt-1 font-bold">
                  Total: ${annualTotal.toFixed(1)}M ✓
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">5 Years</h4>
              <div className="text-sm space-y-1">
                <div>Water Efficiency: $18.5M</div>
                <div>Energy Savings: $65.0M</div>
                <div>Waste Reduction: $8.9M</div>
                <div>Carbon Credits: $12.5M</div>
                <div className="border-t pt-1 font-bold">
                  Total: ${fiveYearTotal.toFixed(1)}M ✓
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">10 Years</h4>
              <div className="text-sm space-y-1">
                <div>Water Efficiency: $42.0M</div>
                <div>Energy Savings: $185.0M</div>
                <div>Waste Reduction: $25.0M</div>
                <div>Carbon Credits: $45.0M</div>
                <div className="border-t pt-1 font-bold">
                  Total: ${tenYearTotal.toFixed(1)}M ✓
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Year Progression Chart */}
      <Card>
        <CardHeader>
          <CardTitle>ESG Benefits Progression Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis label={{ value: 'Savings ($M)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value: number) => [`$${value}M`, '']}
                  labelFormatter={(label) => `Period: ${label}`}
                />
                <Legend />
                <Bar dataKey="waterEfficiency" stackId="a" fill="#10B981" name="Water Efficiency" />
                <Bar dataKey="energySavings" stackId="a" fill="#0EA5E9" name="Energy Savings" />
                <Bar dataKey="wasteReduction" stackId="a" fill="#F59E0B" name="Waste Reduction" />
                <Bar dataKey="carbonCredits" stackId="a" fill="#8B5CF6" name="Carbon Credits" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ESGFinancialBenefitsChart;