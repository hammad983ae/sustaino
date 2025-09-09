import React from 'react';
import logoImage from '@/assets/delorenzo-logo.png';

interface StandardReportCoverProps {
  reportType?: string;
  propertyAddress?: string;
  propertyPhoto?: string;
  preparedFor?: string;
  referenceNumber?: string;
  date?: string;
}

export default function StandardReportCover({
  reportType = "Valuation Report",
  propertyAddress = "148-150 Pine Avenue Mildura, VIC, 3500, Australia",
  propertyPhoto = "/lovable-uploads/5589536a-07bd-4bc8-9b46-483992b7b7cc.png",
  preparedFor = "XXX",
  referenceNumber = "DPG-2024-001",
  date = "27/05/2024"
}: StandardReportCoverProps) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-8" 
         style={{ backgroundColor: '#1e3a5f' }}>
      
      {/* Report Type */}
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        {reportType}
      </h1>

      {/* Logo */}
      <div className="mb-8">
        <img 
          src={logoImage} 
          alt="Delorenzo Property Group"
          className="h-24 w-auto object-contain"
        />
      </div>

      {/* Property Address - Gold Color */}
      <h2 className="text-2xl font-semibold mb-8 text-center px-4"
          style={{ color: '#b8956a' }}>
        Address: {propertyAddress}
      </h2>

      {/* Property Photo */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
        <img 
          src={propertyPhoto}
          alt="Property"
          className="w-96 h-64 object-cover"
        />
      </div>

      {/* Powered By Sustaino Pro */}
      <div className="mb-8">
        <p className="text-lg font-medium text-center"
           style={{ color: '#7cb342' }}>
          Powered By Sustaino Pro
        </p>
      </div>

      {/* Report Details */}
      <div className="text-center space-y-2 text-white">
        <p className="text-lg">
          <span style={{ color: '#7cb342' }}>Prepared For:</span> {preparedFor}
        </p>
        <p className="text-lg">
          <span style={{ color: '#7cb342' }}>Prepared By:</span> Delorenzo Property Group Pty Ltd
        </p>
        <p className="text-lg">
          <span style={{ color: '#7cb342' }}>Reference:</span> {referenceNumber}
        </p>
        <p className="text-lg">
          <span style={{ color: '#7cb342' }}>Date:</span> {date}
        </p>
      </div>
    </div>
  );
}