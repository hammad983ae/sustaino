/**
 * ============================================================================
 * ESG ASSESSMENT INTEGRATOR
 * Extracts ESG data from PAF into Section 13 ESG Assessment Summary
 * ============================================================================
 */

import React, { useEffect, useRef } from 'react';
import { useReportData } from '@/contexts/ReportDataContext';
import { useProperty } from '@/contexts/PropertyContext';

const ESGAssessmentIntegrator: React.FC = () => {
  const { reportData, updateReportData } = useReportData();
  const { addressData } = useProperty();
  const hasProcessed = useRef(false);

  useEffect(() => {
    console.log('ESGAssessmentIntegrator: Processing PAF ESG data extraction');
    
    // Only process once when we have the required data and haven't processed yet
    if ((reportData.reportConfig || reportData.propertyDetails) && !hasProcessed.current) {
      extractESGDataFromPAF();
      hasProcessed.current = true;
    }
  }, [reportData.reportConfig, reportData.propertyDetails]); // Remove addressData dependency

  const extractESGDataFromPAF = () => {
    const esgData: any = {
      status: 'supplied',
      extractedFrom: 'PAF Data Integration',
      
      // Property Assessment Form data (exactly as shown in PAF)
      propertyName: reportData.propertyDetails?.propertyName || 
                   addressData.propertyAddress || 
                   'Property name to be confirmed',
      
      location: addressData.propertyAddress || 
                reportData.locationData?.propertyAddress || 
                'Location to be confirmed',
      
      propertyType: reportData.reportConfig?.propertyType || 
                    reportData.propertyDetails?.propertyType || 
                    'Property type to be confirmed',
      
      yearBuilt: reportData.propertyDetails?.yearBuilt || 
                 reportData.propertyDetails?.constructionYear || 
                 '2025', // Default as shown in PAF
      
      squareMetres: reportData.propertyDetails?.buildingArea || 
                    reportData.propertyDetails?.floorArea || 
                    '0',
      
      // Energy Efficiency (from PAF Environmental Assessment)
      actualEnergyUse: reportData.environmentalAssessment?.energyUse || '0',
      benchmarkEnergyUse: reportData.environmentalAssessment?.benchmarkEnergyUse || '0',
      
      // Water Conservation
      waterEfficientFixtures: reportData.environmentalAssessment?.waterEfficiency || 'Assessment required',
      
      // Sustainability data from PAF
      sustainabilityRating: reportData.environmentalAssessment?.sustainability || 'To be assessed',
      epaData: reportData.environmentalAssessment?.epaData || 'EPA data extraction required',
      contamination: reportData.environmentalAssessment?.contamination || 'Assessment required',
      
      // ESG scoring based on available data
      environmentalScore: calculateEnvironmentalScore(),
      socialScore: calculateSocialScore(),
      governanceScore: calculateGovernanceScore(),
      
      // Integration flags
      extractedFromPAF: true,
      integrationDate: new Date().toISOString(),
      dataCompleteness: assessDataCompleteness()
    };

    console.log('Extracted ESG data from PAF:', esgData);
    updateReportData('environmentalAssessment', esgData);
  };

  const calculateEnvironmentalScore = (): number => {
    let score = 50; // Base score
    
    // Adjust based on available environmental data
    if (reportData.environmentalAssessment?.sustainability === 'High') score += 20;
    if (reportData.environmentalAssessment?.contamination === 'Low' || reportData.environmentalAssessment?.contamination === 'None') score += 15;
    if (reportData.environmentalAssessment?.epaData && reportData.environmentalAssessment.epaData !== 'EPA data extraction required') score += 10;
    
    return Math.min(score, 100);
  };

  const calculateSocialScore = (): number => {
    let score = 50; // Base score
    
    // Adjust based on location and accessibility
    if (reportData.legalAndPlanning?.accessibility === 'High') score += 15;
    if (reportData.locationData?.proximityToServices === 'High') score += 10;
    if (reportData.propertyDetails?.communityFacilities) score += 10;
    
    return Math.min(score, 100);
  };

  const calculateGovernanceScore = (): number => {
    let score = 50; // Base score
    
    // Adjust based on compliance and planning
    if (reportData.legalAndPlanning?.compliance === 'Compliant') score += 20;
    if (reportData.statutoryAssessment?.permits === 'Current') score += 15;
    if (reportData.legalAndPlanning?.zoning && reportData.legalAndPlanning.zoning !== 'Investigation Required') score += 10;
    
    return Math.min(score, 100);
  };

  const assessDataCompleteness = (): string => {
    const requiredFields = [
      reportData.propertyDetails?.propertyName,
      reportData.locationData?.propertyAddress,
      reportData.reportConfig?.propertyType,
      reportData.environmentalAssessment?.sustainability
    ];
    
    const completedFields = requiredFields.filter(field => field && field !== 'Investigation Required').length;
    const completionRate = (completedFields / requiredFields.length) * 100;
    
    if (completionRate >= 80) return 'High';
    if (completionRate >= 60) return 'Medium';
    return 'Low';
  };

  // This component doesn't render anything - it's logic only
  return null;
};

export default ESGAssessmentIntegrator;