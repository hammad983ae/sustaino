import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, TrendingUp, BarChart3, Globe } from "lucide-react";

export default function MarketCommentaryMildura() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Market Commentary - 320 Deakin Avenue, Mildura
              <Lock className="h-4 w-4 text-primary" />
            </CardTitle>
            <Badge variant="secondary">Data Locked</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="national" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="national">National Trends</TabsTrigger>
              <TabsTrigger value="mildura">Mildura-Specific</TabsTrigger>
              <TabsTrigger value="regional">Regional Areas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="national" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    National Trends
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Recovery Status</h4>
                      <p className="text-sm text-muted-foreground">
                        Recovery and stabilization continue, with occupancy rates averaging 65-75%.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Average Room Rate (ARR)</h4>
                      <p className="text-2xl font-bold text-primary">$150 - $200</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Yields</h4>
                      <p className="text-2xl font-bold text-primary">8-10%</p>
                      <p className="text-sm text-muted-foreground">Recent sales supporting current valuations</p>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Recent Transactions</h4>
                    <p className="text-sm">
                      High-quality regional motels are trading in the $2 million to $10 million range at yields of 7-9%.
                      Example: A regional motel sold for $3.5 million at an 8% yield.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="mildura" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Mildura-Specific Sector Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Room Rate</h4>
                      <p className="text-2xl font-bold text-primary">$120 - $150</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Average Turnover per Room</h4>
                      <p className="text-2xl font-bold text-primary">$25,000 - $40,000</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Yield</h4>
                      <p className="text-2xl font-bold text-primary">8-9%</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Market Activity</h4>
                      <p className="text-sm text-muted-foreground">
                        Stable demand from tourism, agriculture, and regional industry.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="regional" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Major Regional Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Analysis of major regional areas and their market performance will be detailed here.
                  </p>
                  <div className="p-4 bg-muted/20 border border-muted rounded-lg">
                    <p className="text-sm italic">
                      Additional regional market data and analysis to be included based on comprehensive market research.
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
}