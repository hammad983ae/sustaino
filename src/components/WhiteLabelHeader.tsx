import React from 'react';
import logoImage from '@/assets/delorenzo-logo.png';

interface WhiteLabelHeaderProps {
  className?: string;
}

export default function WhiteLabelHeader({ className = "" }: WhiteLabelHeaderProps) {
  return (
    <div className={`flex items-center justify-center p-6 bg-background border-b ${className}`}>
      <div className="max-w-md">
        <img 
          src={logoImage} 
          alt="Delorenzo Property Group"
          className="w-full h-auto max-h-24 object-contain"
        />
      </div>
    </div>
  );
}