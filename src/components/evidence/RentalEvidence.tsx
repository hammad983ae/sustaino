import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeasingEvidenceCommercial from './LeasingEvidenceCommercial';
import LeasingEvidenceResidential from './LeasingEvidenceResidential';
import LeasingEvidenceAgricultural from './LeasingEvidenceAgricultural';
import LeasingEvidenceSpecialised from './LeasingEvidenceSpecialised';

export default function RentalEvidence() {
  const [propertyType] = useState('commercial');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rental Evidence Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={propertyType || 'commercial'} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
            <TabsTrigger value="residential">Residential</TabsTrigger>
            <TabsTrigger value="agricultural">Agricultural</TabsTrigger>
            <TabsTrigger value="specialised">Specialised</TabsTrigger>
          </TabsList>
          
          <TabsContent value="commercial">
            <LeasingEvidenceCommercial />
          </TabsContent>
          
          <TabsContent value="residential">
            <LeasingEvidenceResidential />
          </TabsContent>
          
          <TabsContent value="agricultural">
            <LeasingEvidenceAgricultural />
          </TabsContent>
          
          <TabsContent value="specialised">
            <LeasingEvidenceSpecialised />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}