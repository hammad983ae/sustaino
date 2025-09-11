import React from 'react';
import { useBranding } from '@/contexts/BrandingContext';

interface BrandedHeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  className?: string;
}

export default function BrandedHeader({ 
  title, 
  subtitle, 
  showLogo = true, 
  className = "" 
}: BrandedHeaderProps) {
  const { branding, loading } = useBranding();

  if (loading) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="h-12 w-12 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-6 w-48 animate-pulse rounded bg-muted" />
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  const displayTitle = title || `${branding?.company_name || 'Property Valuation'} Platform`;
  const displaySubtitle = subtitle || 'Professional property analysis and valuation services';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {showLogo && branding?.logo_url && (
        <img 
          src={branding.logo_url} 
          alt={`${branding.company_name} Logo`}
          className="h-12 w-auto"
        />
      )}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{displayTitle}</h1>
        <p className="text-muted-foreground">{displaySubtitle}</p>
      </div>
    </div>
  );
}