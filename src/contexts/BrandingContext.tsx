import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PartnerBranding {
  partner_code: string;
  company_name: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  features: any;
}

interface BrandingContextType {
  branding: PartnerBranding | null;
  loading: boolean;
  refreshBranding: () => Promise<void>;
}

const BrandingContext = React.createContext<BrandingContextType>({
  branding: null,
  loading: true,
  refreshBranding: async () => {},
});

export const useBranding = () => {
  const context = React.useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
};

export const BrandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branding, setBranding] = useState<PartnerBranding | null>(null);
  const [loading, setLoading] = useState(true);

  const getBranding = async () => {
    try {
      // Get domain from current URL
      const currentDomain = window.location.hostname;
      
      // Call the partner branding function
      const { data, error } = await supabase.rpc('get_partner_branding', { 
        domain_name: currentDomain 
      });

      if (error) {
        console.error('Error fetching branding:', error);
        // Set default branding
        setBranding({
          partner_code: 'default',
          company_name: 'Property Valuation Platform',
          logo_url: null,
          primary_color: '#0F766E',
          secondary_color: '#F0FDFA',
          features: {}
        });
      } else if (data && data.length > 0) {
        setBranding(data[0]);
      } else {
        // Default branding
        setBranding({
          partner_code: 'default',
          company_name: 'Property Valuation Platform',
          logo_url: null,
          primary_color: '#0F766E',
          secondary_color: '#F0FDFA',
          features: {}
        });
      }
    } catch (error) {
      console.error('Error in getBranding:', error);
      setBranding({
        partner_code: 'default',
        company_name: 'Property Valuation Platform',
        logo_url: null,
        primary_color: '#0F766E',
        secondary_color: '#F0FDFA',
        features: {}
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshBranding = async () => {
    setLoading(true);
    await getBranding();
  };

  useEffect(() => {
    getBranding();
  }, []);

  // Apply CSS custom properties for theming
  useEffect(() => {
    if (branding) {
      const root = document.documentElement;
      root.style.setProperty('--partner-primary', branding.primary_color);
      root.style.setProperty('--partner-secondary', branding.secondary_color);
    }
  }, [branding]);

  return (
    <BrandingContext.Provider value={{ branding, loading, refreshBranding }}>
      {children}
    </BrandingContext.Provider>
  );
};