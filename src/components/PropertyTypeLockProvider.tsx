import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PropertyTypeLockContextType {
  selectedPropertyType: string | null;
  isPropertyTypeLocked: boolean;
  lockPropertyType: (propertyType: string) => void;
  unlockPropertyType: () => void;
  getPropertyTypePrompt: () => string;
}

const PropertyTypeLockContext = createContext<PropertyTypeLockContextType | undefined>(undefined);

export const usePropertyTypeLock = () => {
  const context = useContext(PropertyTypeLockContext);
  if (!context) {
    throw new Error('usePropertyTypeLock must be used within a PropertyTypeLockProvider');
  }
  return context;
};

interface PropertyTypeLockProviderProps {
  children: ReactNode;
}

export const PropertyTypeLockProvider: React.FC<PropertyTypeLockProviderProps> = ({ children }) => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [isPropertyTypeLocked, setIsPropertyTypeLocked] = useState(false);

  const lockPropertyType = (propertyType: string) => {
    setSelectedPropertyType(propertyType);
    setIsPropertyTypeLocked(true);
  };

  const unlockPropertyType = () => {
    setSelectedPropertyType(null);
    setIsPropertyTypeLocked(false);
  };

  const getPropertyTypePrompt = () => {
    if (!selectedPropertyType) return 'Provide a detailed description of the property type';
    
    const prompts: Record<string, string> = {
      'childcare-centre': 'Provide a detailed description of the childcare centre including licensed capacity, age group facilities, indoor/outdoor play areas, kitchen facilities, and any specialized features',
      'hotel-motel': 'Provide a detailed description of the hotel/motel including number of rooms, star rating, facilities (restaurant, pool, conference), parking, and accommodation type',
      'carpark': 'Provide a detailed description of the carpark including number of spaces, access type (basement/at-grade/multi-level), security features, and parking space dimensions',
      'cinema': 'Provide a detailed description of the cinema including number of screens, seating capacity, audio/visual technology, concession facilities, and accessibility features',
      'service-station': 'Provide a detailed description of the service station including number of bowsers, fuel types, convenience store, car wash facilities, and site access',
      'licensed-venue': 'Provide a detailed description of the licensed venue including liquor license type, capacity, gaming facilities, kitchen/dining areas, and entertainment features',
      'healthcare-facility': 'Provide a detailed description of the healthcare facility including medical specialties, number of consulting rooms, diagnostic equipment, parking, and accessibility features',
      'workers-accommodation': 'Provide a detailed description of the workers accommodation including number of beds, room configurations, shared facilities, dining areas, and recreation facilities',
      'aged-care': 'Provide a detailed description of the aged care facility including bed capacity, care levels provided, specialized facilities, nursing stations, and outdoor areas',
      'student-accommodation': 'Provide a detailed description of the student accommodation including number of beds, room types, study areas, common facilities, and proximity to educational institutions',
      'data-centre': 'Provide a detailed description of the data centre including server capacity, power infrastructure, cooling systems, security features, and connectivity specifications',
      'self-storage': 'Provide a detailed description of the self storage facility including number of units, unit sizes, climate control, security systems, and access arrangements',
      'medical-centre': 'Provide a detailed description of the medical centre including number of consulting rooms, specialist facilities, diagnostic equipment, waiting areas, and parking provisions',
      'manufacturing': 'Provide a detailed description of the manufacturing facility including production capacity, specialized equipment, warehouse space, loading facilities, and industrial infrastructure',
      'residential': 'Provide a detailed description of the residential property including dwelling type, number of bedrooms/bathrooms, living areas, outdoor spaces, and notable features',
      'commercial': 'Provide a detailed description of the commercial property including tenancy arrangements, floor areas, fit-out level, parking, and building services',
      'industrial': 'Provide a detailed description of the industrial property including warehouse/office split, ceiling heights, loading facilities, power supply, and specialized features',
      'retail': 'Provide a detailed description of the retail property including shop front, trading area, storage, customer parking, and location within retail precinct',
      'agricultural': 'Provide a detailed description of the agricultural property including land area, soil types, water resources, infrastructure, carrying capacity, and productive use',
      'development-land': 'Provide a detailed description of the development land including zoning, development potential, site constraints, infrastructure availability, and planning approvals'
    };

    const key = selectedPropertyType.toLowerCase().replace(/\s+/g, '-');
    return prompts[key] || `Provide a detailed description of the ${selectedPropertyType.toLowerCase()} property including key features, facilities, and characteristics relevant to its valuation`;
  };

  const value: PropertyTypeLockContextType = {
    selectedPropertyType,
    isPropertyTypeLocked,
    lockPropertyType,
    unlockPropertyType,
    getPropertyTypePrompt,
  };

  return (
    <PropertyTypeLockContext.Provider value={value}>
      {children}
    </PropertyTypeLockContext.Provider>
  );
};