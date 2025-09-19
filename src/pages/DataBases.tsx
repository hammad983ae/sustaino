import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';
import EvidenceManager from '@/components/evidence/EvidenceManager';
import PageHeader from '@/components/PageHeader';

export default function DataBases() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <PageHeader 
        title="Data Bases"
        subtitle="Manage your sales and leasing evidence databases"
        icon={<Database className="h-6 w-6 text-white" />}
        gradient="from-blue-500 to-indigo-600"
      />
      
      <div className="container mx-auto px-4 py-8">        
        <EvidenceManager />
      </div>
    </div>
  );
}