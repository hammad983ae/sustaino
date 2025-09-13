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

  // Auto-populate address from context
  useEffect(() => {
    const fullAddress = propertyAddress || getFormattedAddress();
    if (fullAddress && fullAddress !== searchAddress) {
      setSearchAddress(fullAddress);
    }
    
    // Auto-select state if available
    if (addressData.state && addressData.state !== selectedState) {
      setSelectedState(addressData.state.toLowerCase());
    }
  }, [addressData, propertyAddress, getFormattedAddress]);

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
          // This could trigger the planning data search
        }}
        onAddressChange={(address) => {
          console.log('Address updated:', address);
        }}
      />
      
      {/* State-Based Mapping Integration */}
      <StateBasedMappingIntegration onPlanningDataUpdate={onDataFetched} />
    </div>
  );
};

export default PlanningDataIntegration;