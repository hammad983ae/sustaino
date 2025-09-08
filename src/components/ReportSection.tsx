import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExecutiveSummary from "./ExecutiveSummary";
import RPDAndLocation from "./RPDAndLocation";
import LegalAndPlanning from "./LegalAndPlanning";
import TenancyScheduleLeaseDetails from "./TenancyScheduleLeaseDetails";
import StatutoryAssessment from "./StatutoryAssessment";
import MarketCommentary from "./MarketCommentary";
import PropertyDetails from "./PropertyDetails";
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
import ProfessionalCompliance from "./ProfessionalCompliance";
import TermsAndConditions from "./TermsAndConditions";
import SecurityAndCertificates from "./SecurityAndCertificates";

interface ReportSectionProps {
  title: string;
  subtitle?: string;
  sectionIndex: number;
  onNavigateToSection: (sectionIndex: number) => void;
}

const ReportSection = ({ title, subtitle, sectionIndex, onNavigateToSection }: ReportSectionProps) => {
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

  // Special handling for RPD and Location section
  if (sectionIndex === 1) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <RPDAndLocation />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Legal and Planning section
  if (sectionIndex === 2) {
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

  // Special handling for Property Details section
  if (sectionIndex === 6) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <PropertyDetails />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Environmental Audit Checklist section
  if (sectionIndex === 7) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <ESGAssessment />
        </CardContent>
      </Card>
    );
  }

  // Special handling for Essential Repairs section
  if (sectionIndex === 8) {
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
  if (sectionIndex === 9) {
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
  if (sectionIndex === 10) {
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
  if (sectionIndex === 11) {
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
  if (sectionIndex === 12) {
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
  if (sectionIndex === 13) {
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
  if (sectionIndex === 14) {
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
  if (sectionIndex === 15) {
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

  // Special handling for Valuation Certificate section (Section 17)
  if (sectionIndex === 16) {
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

  // Special handling for Terms and Conditions section (Section 18) - now includes Professional Compliance
  if (sectionIndex === 17) {
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

  // Special handling for Security and Certificates section
  if (sectionIndex === 19) {
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