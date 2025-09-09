import React from 'react';
import { Card } from '@/components/ui/card';
import logoImage from '@/assets/delorenzo-logo.png';

interface ReportCoverPageProps {
  address: string;
  preparedFor: string;
  referenceNumber: string;
  dateOfValuation: string;
  propertyImage?: string;
  reportType?: string;
}

export default function ReportCoverPage({
  address,
  preparedFor,
  referenceNumber,
  dateOfValuation,
  propertyImage,
  reportType = "Valuation Report"
}: ReportCoverPageProps) {
  return (
    <div className="w-full h-[297mm] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white relative overflow-hidden print:h-screen">
      {/* Header Title */}
      <div className="pt-12 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-amber-400 mb-2">
          {reportType}
        </h1>
      </div>

      {/* Logo Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-col gap-1">
            <div className="w-8 h-8 bg-emerald-400 rounded-sm"></div>
            <div className="w-8 h-8 bg-amber-600 rounded-sm"></div>
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold text-white">DELORENZO</div>
            <div className="text-lg font-medium text-slate-300">PROPERTY</div>
            <div className="text-lg font-medium text-slate-300">GROUP</div>
          </div>
        </div>
        
        {/* Updated Tagline */}
        <div className="text-center">
          <span className="text-emerald-400 font-semibold text-lg">POWERED BY </span>
          <span className="text-slate-300 font-semibold text-lg">SUSTAINO PRO</span>
        </div>
      </div>

      {/* Property Image */}
      <div className="flex justify-center mb-8 px-8">
        <div className="relative w-full max-w-lg">
          {propertyImage ? (
            <img 
              src={propertyImage} 
              alt="Property" 
              className="w-full h-64 object-cover rounded-lg shadow-2xl border-4 border-slate-600"
            />
          ) : (
            <div className="w-full h-64 bg-slate-600 rounded-lg shadow-2xl border-4 border-slate-500 flex items-center justify-center">
              <span className="text-slate-400 text-lg">Property Photo</span>
            </div>
          )}
          
          {/* Date overlay on image */}
          <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded text-sm">
            {dateOfValuation}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="text-center mb-8 px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-emerald-400 mb-2">
          Address: {address}
        </h2>
      </div>

      {/* Bottom Information */}
      <div className="absolute bottom-16 left-0 right-0 px-8">
        <div className="text-center space-y-3">
          <div className="text-amber-400 font-semibold text-lg">
            Prepared For: {preparedFor}
          </div>
          
          <div className="text-slate-300">
            <div className="font-semibold">Prepared By:</div>
            <div className="text-lg">Delorenzo Property Group Pty Ltd</div>
          </div>
          
          <div className="flex justify-center gap-8 text-slate-300">
            <div>
              <span className="font-semibold">Reference: </span>
              <span>{referenceNumber}</span>
            </div>
            <div>
              <span className="font-semibold">Date: </span>
              <span>{dateOfValuation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-600/10 rounded-full translate-y-24 -translate-x-24"></div>
    </div>
  );
}