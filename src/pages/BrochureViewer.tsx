import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BrochureViewer = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>Brochure Viewer</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Coming soon - Digital brochure viewer</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrochureViewer;