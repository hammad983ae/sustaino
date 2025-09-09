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
import FormDataSaver from "./FormDataSaver";
import ExecutiveSummary from "./ExecutiveSummary";
import RPDAndLocation from "./RPDAndLocation";
import LegalAndPlanning from "./LegalAndPlanning";
import TenancyScheduleLeaseDetails from "./TenancyScheduleLeaseDetails";
import StatutoryAssessment from "./StatutoryAssessment";
import MarketCommentary from "./MarketCommentary";
import PropertyDetails from "./PropertyDetails";
import PlantAndEquipment from "./PlantAndEquipment";
import RentDetermination from "./RentDetermination";
import ESGAssessment from "./ESGAssessment";
import EssentialRepairs from "./EssentialRepairs";
import RiskAssessmentMarketIndicators from "./RiskAssessmentMarketIndicators";
import MarketabilityAndMortgageSecurity from "./MarketabilityAndMortgageSecurity";
import PreviousSalesHistoryAndCurrentSale from "./PreviousSalesHistoryAndCurrentSale";
import SalesEvidence from "./SalesEvidence";
import LeasingEvidence from "./LeasingEvidence";
import ValuationAnalysis from "./ValuationAnalysis";
import SustainoProAnalysis from "./SustainoProAnalysis";
import ValuationCertificate from "./ValuationCertificate";
import TermsAndConditions from "./TermsAndConditions";
import SecurityAndCertificates from "./SecurityAndCertificates";
import RetrospectiveValuations from "./RetrospectiveValuations";
import PropertyComplianceAndCertifications from "./PropertyComplianceAndCertifications";

interface ReportSectionProps {
  title: string;
  subtitle?: string;
  sectionIndex: number;
  onNavigateToSection: (sectionIndex: number) => void;
  reportData?: any;
  onDataChange?: (data: any) => void;
}

const ReportSection = ({ title, subtitle, sectionIndex, onNavigateToSection, reportData, onDataChange }: ReportSectionProps) => {
  // Special handling for Executive Summary section
  if (sectionIndex === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="executiveSummary" reportData={reportData} onDataChange={onDataChange}>
            <ExecutiveSummary onNavigateToSection={onNavigateToSection} />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Special handling for RPD and Location section
  if (sectionIndex === 1) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="rpdAndLocation" reportData={reportData} onDataChange={onDataChange}>
            <RPDAndLocation />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Legal and Planning section is now section 2
  if (sectionIndex === 2) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="legalAndPlanning" reportData={reportData} onDataChange={onDataChange}>
            <LegalAndPlanning />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Tenancy Schedule/Lease Details section is now section 3
  if (sectionIndex === 3) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="tenancySchedule" reportData={reportData} onDataChange={onDataChange}>
            <TenancyScheduleLeaseDetails />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Statutory Assessment section is now section 4
  if (sectionIndex === 4) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="statutoryAssessment" reportData={reportData} onDataChange={onDataChange}>
            <StatutoryAssessment />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Market Commentary section is now section 5  
  if (sectionIndex === 5) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="marketCommentary" reportData={reportData} onDataChange={onDataChange}>
            <MarketCommentary />
          </FormDataSaver>
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
          <FormDataSaver sectionKey="propertyDetails" reportData={reportData} onDataChange={onDataChange}>
            <PropertyDetails />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Special handling for Plant and Equipment section
  if (sectionIndex === 7) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="plantAndEquipment" reportData={reportData} onDataChange={onDataChange}>
            <PlantAndEquipment />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Special handling for Rent Determination section
  if (sectionIndex === 8) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="rentDetermination" reportData={reportData} onDataChange={onDataChange}>
            <RentDetermination />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Special handling for ESG Assessment section
  if (sectionIndex === 9) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="esgAssessment" reportData={reportData} onDataChange={onDataChange}>
            <ESGAssessment />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Special handling for Essential Repairs section
  if (sectionIndex === 10) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="essentialRepairs" reportData={reportData} onDataChange={onDataChange}>
            <EssentialRepairs />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Special handling for Risk Assessment & Market Indicators section
  if (sectionIndex === 11) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="riskAssessment" reportData={reportData} onDataChange={onDataChange}>
            <RiskAssessmentMarketIndicators />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Special handling for Previous Sales History and Current Sale section
  if (sectionIndex === 12) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="previousSalesHistory" reportData={reportData} onDataChange={onDataChange}>
            <PreviousSalesHistoryAndCurrentSale />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Special handling for Sales Evidence section
  if (sectionIndex === 13) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <FormDataSaver sectionKey="salesEvidence" reportData={reportData} onDataChange={onDataChange}>
            <SalesEvidence />
          </FormDataSaver>
        </CardContent>
      </Card>
    );
  }

  // Special handling for Sales Evidence section
  if (sectionIndex === 14) {
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
  if (sectionIndex === 15) {
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

  // Special handling for Valuation Analysis section
  if (sectionIndex === 16) {
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

  // Special handling for Marketability and Mortgage Security section
  if (sectionIndex === 17) {
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
  if (sectionIndex === 18) {
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
  if (sectionIndex === 19) {
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

  // Special handling for Property Compliance & Certifications section
  if (sectionIndex === 20) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <PropertyComplianceAndCertifications />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Terms and Conditions section
  if (sectionIndex === 21) {
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
  if (sectionIndex === 22) {
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

  // Special handling for Security and Certificates section
  if (sectionIndex === 23) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <SecurityAndCertificates />
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