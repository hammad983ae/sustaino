/**
 * ============================================================================
 * PROPRIETARY REPORT GENERATION SYSTEM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Report templates, generation algorithms, and content frameworks are
 * proprietary intellectual property. Commercial use requires licensing.
 * ============================================================================
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExecutiveSummary from "./ExecutiveSummary";
import RPDAndLocation from "./RPDAndLocation";
import LegalAndPlanning from "./LegalAndPlanning";
import TenancyScheduleLeaseDetails from "./TenancyScheduleLeaseDetails";
import StatutoryAssessment from "./StatutoryAssessment";
import MarketCommentary from "./MarketCommentary";
import EnhancedPropertyDetails from "./PropertyDetails";
import EssentialRepairs from "./EssentialRepairs";
import RiskAssessmentMarketIndicators from "./RiskAssessmentMarketIndicators";
import MarketabilityAndMortgageSecurity from "./MarketabilityAndMortgageSecurity";
import PreviousSalesHistoryAndCurrentSale from "./PreviousSalesHistoryAndCurrentSale";
import { SalesEvidence, LeasingEvidence } from "./evidence";
import ComprehensiveESGAssessment from "./ComprehensiveESGAssessment";
import ComprehensiveClimateRiskAssessment from "./ComprehensiveClimateRiskAssessment";
import ValuationAnalysis from "./ValuationAnalysis";
import EnvironmentalAudit from "./EnvironmentalAudit";
import SustainoProAnalysis from "./SustainoProAnalysis";
import ValuationCertificate from "./ValuationCertificate";
import TermsAndConditions from "./TermsAndConditions";
import ComprehensiveESGClimateAssessmentForm from "./ComprehensiveESGClimateAssessmentForm";
import EconomicGeographicalCatchmentAnalysis from './EconomicGeographicalCatchmentAnalysis';
import CertificationAndSecurity from "./CertificationAndSecurity";
import { CompleteReportCreator } from "./CompleteReportCreator";
import { DocumentPrefillUploader } from "./DocumentPrefillUploader";
import { useReportData } from "@/contexts/ReportDataContext";

import MarketTransactionAnalysis from "./MarketTransactionAnalysis";

interface ReportSectionProps {
  title: string;
  subtitle?: string;
  sectionIndex: number;
  onNavigateToSection: (sectionIndex: number) => void;
}

const ReportSection = ({ title, subtitle, sectionIndex, onNavigateToSection }: ReportSectionProps) => {
  const { reportData, updateReportData } = useReportData();
  // Special handling for Executive Summary section
  if (sectionIndex === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <ExecutiveSummary onNavigateToSection={onNavigateToSection} />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Document Upload & Prefill section
  if (sectionIndex === 1) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </CardHeader>
          <CardContent className="space-y-6">
            <CompleteReportCreator 
              onReportCreated={(jobId) => {
                console.log('Complete report created with job ID:', jobId);
                updateReportData('currentJobId', jobId);
              }}
            />
            
            {reportData.currentJobId && (
              <DocumentPrefillUploader 
                jobId={reportData.currentJobId}
                onPrefillComplete={(extractedData) => {
                  console.log('Additional data extracted:', extractedData);
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Special handling for RPD and Location section (moved to section 2)
  if (sectionIndex === 2) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">RPD and Location</CardTitle>
          <p className="text-sm text-muted-foreground">Real Property Description and Location Details</p>
        </CardHeader>
        <CardContent>
          <RPDAndLocation />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Legal and Planning section (moved to section 3)
  if (sectionIndex === 3) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <LegalAndPlanning />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Tenancy Schedule/Lease Details section
  if (sectionIndex === 3) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <TenancyScheduleLeaseDetails />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Statutory Assessment section
  if (sectionIndex === 4) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <StatutoryAssessment />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Market Commentary section
  if (sectionIndex === 5) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <MarketCommentary />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Property Details section
  if (sectionIndex === 6) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <EnhancedPropertyDetails />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Essential Repairs section
  if (sectionIndex === 7) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <EssentialRepairs />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Risk Assessment & Market Indicators section
  if (sectionIndex === 8) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <RiskAssessmentMarketIndicators />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Previous Sales History and Current Sale section
  if (sectionIndex === 9) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <PreviousSalesHistoryAndCurrentSale />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Sales Evidence section
  if (sectionIndex === 10) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <SalesEvidence />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Leasing Evidence section
  if (sectionIndex === 11) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <LeasingEvidence />
        </CardContent>
      </Card>
    );
  }

  // Special handling for ESG Assessment Summary section 
  if (sectionIndex === 12) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">ESG Assessment Summary</CardTitle>
          <p className="text-sm text-muted-foreground">Comprehensive Environmental, Social, Governance and Climate Risk Assessment</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <ComprehensiveESGClimateAssessmentForm />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Economic, Geographical and Catchment Area Analysis section
  if (sectionIndex === 13) {
    return <EconomicGeographicalCatchmentAnalysis />;
  }

  // Special handling for Valuation Analysis section (moved to section 14)
  if (sectionIndex === 14) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <ValuationAnalysis />
        </CardContent>
      </Card>
    );
  }

  // Environmental Audit section removed - consolidated into ESG and Climate Assessment

  // Special handling for Marketability and Mortgage Security section
  if (sectionIndex === 15) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <MarketabilityAndMortgageSecurity />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Sustaino Pro Additional Analysis and Features section
  if (sectionIndex === 16) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <SustainoProAnalysis />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Valuation Certificate section
  if (sectionIndex === 17) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <ValuationCertificate />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Terms and Conditions section
  if (sectionIndex === 18) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <TermsAndConditions />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Annexures section  
  if (sectionIndex === 19) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
            <p>Annexures content will be added here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Special handling for Market Transaction Analysis section
  if (sectionIndex === 20) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <MarketTransactionAnalysis />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Certification and Security section
  if (sectionIndex === 21) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <CertificationAndSecurity />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
          <p>Content will be added here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSection;