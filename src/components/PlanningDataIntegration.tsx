import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, MapPin, Search, ExternalLink, Loader2, Map } from "lucide-react";
import { useProperty } from "@/contexts/PropertyContext";
import StateBasedMappingIntegration from "./StateBasedMappingIntegration";
import AddressConfirmation from "./planning/AddressConfirmation";
import StatePlanningPortalLinks from "./planning/StatePlanningPortalLinks";
import VicPlanReportExporter from "./planning/VicPlanReportExporter";

interface PlanningDataIntegrationProps {
  propertyAddress?: string;
  onDataFetched?: (data: any) => void;
}

const PlanningDataIntegration = ({ propertyAddress = "", onDataFetched }: PlanningDataIntegrationProps) => {
  const { addressData, getFormattedAddress } = useProperty();
  const [selectedState, setSelectedState] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [planningData, setPlanningData] = useState(null);
  const [searchStep, setSearchStep] = useState(1);

  // Auto-populate address from context and clear data when address changes
  useEffect(() => {
    const fullAddress = propertyAddress || getFormattedAddress();
    
    // If address has changed, clear old data and update search address
    if (fullAddress && fullAddress !== searchAddress) {
      console.log('Address changed to:', fullAddress, 'clearing old planning data');
      setSearchAddress(fullAddress);
      setPlanningData(null); // Clear old planning data
      setSearchStep(1); // Reset search step
      setSelectedState(''); // Reset state to force fresh selection
      
      // Clear ALL localStorage data for fresh start
      if (typeof Storage !== 'undefined') {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.includes('planning') || key.includes('mapping') || key.includes('vicplan') || key.includes('property')) {
            localStorage.removeItem(key);
          }
        });
      }
      
      // Dispatch event to notify other components
      setTimeout(() => {
        const event = new CustomEvent('addressChanged', { detail: { address: fullAddress } });
        window.dispatchEvent(event);
      }, 100);
    }
    
    // Auto-select state if available
    if (addressData.state && addressData.state !== selectedState) {
      setSelectedState(addressData.state.toLowerCase());
    }
  }, [addressData, propertyAddress, getFormattedAddress, searchAddress, selectedState]);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    if (state === "vic" && searchAddress) {
      // Auto-trigger VicPlan search when Victoria is selected and address is available
      handleVicPlanSearch();
    }
  };

  const handleVicPlanSearch = async () => {
    if (!searchAddress) return;
    
    setIsSearching(true);
    setSearchStep(2);
    
    try {
      // Simulate API call to VicPlan
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockPlanningData = {
        zoning: "Commercial 1 Zone (C1Z)",
        overlays: ["Development Contributions Plan Overlay", "Special Building Overlay"],
        permitRequired: true,
        heightRestriction: "15m maximum",
        landUse: "Commercial uses, Retail premises, Office premises",
        developmentPotential: "Medium - Subject to overlays",
        planningScheme: "Bayside Planning Scheme",
        mapReference: "vicplan.vic.gov.au/planning/PS327856",
        lastUpdated: new Date().toLocaleDateString()
      };
      
      setPlanningData(mockPlanningData);
      onDataFetched?.(mockPlanningData);
    } catch (error) {
      console.error("Error fetching planning data:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const openVicPlan = () => {
    window.open("https://mapshare.vic.gov.au/vicplan/", "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Address Confirmation */}
      <AddressConfirmation 
        onAddressConfirmed={(address) => {
          console.log('Address confirmed for planning search:', address);
          // Clear old planning data when address is confirmed
          setPlanningData(null);
          setSearchStep(1);
          // Trigger fresh planning data search
        }}
        onAddressChange={(address) => {
          console.log('Address updated:', address);
          // Clear old planning data when address changes
          setPlanningData(null);
          setSearchStep(1);
        }}
      />
      
      {/* VicPlan Report Exporter */}
      <VicPlanReportExporter 
        onReportDownloaded={(reportData) => {
          console.log('VicPlan report downloaded:', reportData);
          onDataFetched?.(reportData);
        }}
      />
      
      {/* State Planning Portal Links */}
      <StatePlanningPortalLinks 
        selectedState={addressData.state} 
        className="mb-6"
      />
      
      {/* State-Based Mapping Integration - Pass address to ensure updates */}
      <StateBasedMappingIntegration 
        key={searchAddress} // Force re-render when address changes
        onPlanningDataUpdate={onDataFetched} 
      />
    </div>
  );
};

export default PlanningDataIntegration;