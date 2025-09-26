import React from 'react';
import AddressConfirmation from '@/components/planning/AddressConfirmation';
import StatePlanningPortalLinks from '@/components/planning/StatePlanningPortalLinks';
import VicPlanReportExporter from '@/components/planning/VicPlanReportExporter';
import StateBasedMappingIntegration from '@/components/StateBasedMappingIntegration';
import AustralianPlanningPortalIntegration from '@/components/AustralianPlanningPortalIntegration';
import AustralianAPIIntegration from '@/components/planning/AustralianAPIIntegration';
import LASSIIntegration from '@/components/planning/LASSIIntegration';
import MapshareVicIntegration from '@/components/planning/MapshareVicIntegration';

interface PlanningIntegrationsProps {
  propertyAddress: string;
  addressData: any;
  planningData: any;
  onPlanningDataUpdate: (data: any) => void;
  onAddressConfirmed: (address: string) => void;
  onAddressChange: (address: string) => void;
}

export const PlanningIntegrations = ({
  propertyAddress,
  addressData,
  planningData,
  onPlanningDataUpdate,
  onAddressConfirmed,
  onAddressChange
}: PlanningIntegrationsProps) => {
  return (
    <>
      {/* Address Confirmation */}
      <AddressConfirmation 
        onAddressConfirmed={onAddressConfirmed}
        onAddressChange={onAddressChange}
      />

      {/* VicPlan Report Exporter */}
      <VicPlanReportExporter 
        onReportDownloaded={(reportData) => {
          console.log('VicPlan report downloaded:', reportData);
          onPlanningDataUpdate(reportData);
        }}
      />

      {/* LASSI Integration - Victorian Survey Data */}
      <LASSIIntegration 
        onDataUpdate={(data) => {
          console.log('LASSI data received:', data);
          const planningUpdate = {
            ...planningData,
            lassiData: data,
            lotNumber: data.landDescription?.lotNumber || planningData.lotNumber,
            planNumber: data.landDescription?.planReference || planningData.planNumber,
            lastUpdated: new Date().toISOString()
          };
          onPlanningDataUpdate(planningUpdate);
        }}
      />

      {/* Mapshare Victoria Integration - Live Planning Data */}
      <MapshareVicIntegration 
        onDataUpdate={(data) => {
          console.log('Mapshare Victoria data received:', data);
          // This will provide the most current/accurate planning data
          const planningUpdate = {
            ...planningData,
            ...data, // Mapshare data takes priority as it's official and current
            mapshareData: data,
            lastUpdated: new Date().toISOString()
          };
          onPlanningDataUpdate(planningUpdate);
        }}
      />

      {/* State Planning Portal Links */}
      <StatePlanningPortalLinks 
        selectedState={addressData.state} 
      />

      {/* State-Based Mapping Integration */}
      <StateBasedMappingIntegration 
        onPlanningDataUpdate={onPlanningDataUpdate} 
      />

      {/* Australian Planning Portal Integration */}
      <AustralianPlanningPortalIntegration
        propertyAddress={propertyAddress}
        onDataReceived={(data) => {
          console.log('Australian planning data received:', data);
          // Integrate with existing planning data
          if (data.length > 0) {
            const planningUpdate = {
              ...planningData,
              australianPortalData: data,
              lastUpdated: new Date().toISOString()
            };
            onPlanningDataUpdate(planningUpdate);
          }
        }}
      />

      {/* API Integration Documentation */}
      <AustralianAPIIntegration />
    </>
  );
};

export default PlanningIntegrations;