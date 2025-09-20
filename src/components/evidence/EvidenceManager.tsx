import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Database, FileText, TrendingUp } from 'lucide-react';
import SalesEvidence from './SalesEvidence';
import RentalEvidence from './RentalEvidence';
import { WebDataUploader } from '../WebDataUploader';
import AltDataParser from './AltDataParser';

export default function EvidenceManager() {
  const [salesCount, setSalesCount] = useState(0);
  const [rentalCount, setRentalCount] = useState(0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Evidence Management Hub
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Sales Evidence
              <Badge variant="secondary">{salesCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="rental" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Rental Evidence
              <Badge variant="secondary">{rentalCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="import">
              Import Data
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="mt-6">
            <SalesEvidence />
          </TabsContent>
          
          <TabsContent value="rental" className="mt-6">
            <RentalEvidence />
          </TabsContent>
          
          <TabsContent value="import" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Import Evidence from External Sources</h3>
              <WebDataUploader />
              <AltDataParser />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}