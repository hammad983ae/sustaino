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