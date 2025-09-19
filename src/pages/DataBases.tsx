import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';
import EvidenceManager from '@/components/evidence/EvidenceManager';
import UniversalNavigation from '@/components/ui/universal-navigation';

export default function DataBases() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <UniversalNavigation />
        
        <div className="mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-800">
                <Database className="h-6 w-6" />
                Data Bases
              </CardTitle>
              <p className="text-blue-700">
                Manage your sales and leasing evidence databases
              </p>
            </CardHeader>
          </Card>
        </div>
        
        <EvidenceManager />
      </div>
    </div>
  );
}