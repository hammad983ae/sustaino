// Configuration for property-type specific report sections
export interface ReportSectionConfig {
  title: string;
  subtitle?: string;
  component?: string;
  automated?: boolean;
  description?: string;
}

export const getPropertyTypeReportSections = (propertyType: string): ReportSectionConfig[] => {
  const baseSections: ReportSectionConfig[] = [
    { title: "Executive Summary and Contents", automated: true, description: "AI-generated summary based on analysis" },
    { title: "Property Details", automated: true, description: "Auto-populated from address analysis" },
    { title: "Retrospective Valuations", subtitle: "Historical date valuation analysis (ANZVGP 101)", component: "RetrospectiveValuations", description: "Comprehensive retrospective valuation framework complying with ANZVGP 101 and IVS 2025 standards" },
  ];

  const commonEndSections: ReportSectionConfig[] = [
    { title: "Sustaino Pro ESG Analysis", subtitle: "Environmental, Social & Governance Assessment", component: "SustainoProAnalysis" },
    { title: "Risk Assessment & Market Indicators", automated: true },
    { title: "Climate Risk Assessment", subtitle: "Climate Risk Analysis & Valuation Impact", component: "ClimateRiskAssessment", description: "Comprehensive climate risk evaluation with property value impact analysis" },
    { title: "Marketability and Mortgage Security", automated: true },
    { title: "Valuation Certificate", component: "ValuationCertificate" },
    { title: "Property Compliance & Certifications", component: "PropertyComplianceAndCertifications" },
    { title: "Terms and Conditions", component: "TermsAndConditions" }
  ];

  switch (propertyType) {
    case "commercial":
      return [
        ...baseSections,
        { title: "Legal and Planning", component: "PlanningDataIntegration", description: "Zoning, permits, and compliance analysis with VicPlan integration" },
        { title: "Tenancy Schedule/Lease Details", component: "TenancyScheduleLeaseDetails" },
        { title: "Commercial Market Commentary", automated: true, description: "Local commercial market trends and analysis" },
        { title: "Commercial Sales Evidence", component: "SalesEvidenceCommercial" },
        { title: "Commercial Leasing Evidence", component: "LeasingEvidenceCommercial" },
        { title: "Income Capitalisation Analysis", automated: true, description: "NOI, cap rates, and yield analysis" },
        { title: "Commercial Valuation Analysis", component: "ValuationAnalysisCommercial" },
        { title: "Tenant Covenant Assessment", automated: true, description: "Credit analysis and lease security" },
        { title: "WALE and Portfolio Analysis", automated: true, description: "Weighted Average Lease Expiry analysis" },
        ...commonEndSections
      ];

    case "residential":
      return [
        ...baseSections,
        { title: "Legal and Planning", automated: true, description: "Zoning and development potential" },
        { title: "Residential Market Commentary", automated: true, description: "Local residential market trends" },
        { title: "Comparable Sales Analysis", automated: true, description: "Recent sales comparisons and adjustments" },
        { title: "Residential Sales Evidence", component: "SalesEvidenceResidential" },
        { title: "Rental Analysis", automated: true, description: "Rental yields and investment performance" },
        { title: "Residential Valuation Analysis", component: "ValuationAnalysisResidential" },
        { title: "Property Condition Assessment", automated: true, description: "Building condition and maintenance requirements" },
        { title: "Investment Performance Analysis", automated: true, description: "ROI, cash flow, and growth projections" },
        ...commonEndSections
      ];

    case "agricultural":
      return [
        ...baseSections,
        { title: "Legal and Planning", automated: true, description: "Agricultural zoning and water rights" },
        { title: "Agricultural Market Commentary", automated: true, description: "Commodity markets and rural trends" },
        { title: "Land Productivity Analysis", automated: true, description: "Soil quality, climate, and carrying capacity" },
        { title: "Agricultural Sales Evidence", component: "SalesEvidenceAgricultural" },
        { title: "Water Rights Assessment", automated: true, description: "Water allocations and irrigation analysis" },
        { title: "Agricultural Valuation Analysis", component: "ValuationAnalysisAgricultural" },
        { title: "Carbon Farming Assessment", component: "CarbonFarmProjects" },
        { title: "Commodity Price Analysis", automated: true, description: "Market prices and production forecasts" },
        { title: "Environmental Constraints", automated: true, description: "Climate risks and sustainability factors" },
        ...commonEndSections
      ];

    case "specialised":
      return [
        ...baseSections,
        { title: "Legal and Planning", automated: true, description: "Specialized use permits and compliance" },
        { title: "Specialised Market Commentary", automated: true, description: "Industry-specific market analysis" },
        { title: "Operational Performance Analysis", automated: true, description: "Revenue, occupancy, and efficiency metrics" },
        { title: "Specialised Sales Evidence", component: "SalesEvidenceSpecialised" },
        { title: "Replacement Cost Analysis", automated: true, description: "Depreciated replacement cost methodology" },
        { title: "Specialised Valuation Analysis", component: "ValuationAnalysisSpecialised" },
        { title: "Industry Benchmarking", automated: true, description: "Comparison with industry standards" },
        { title: "Operational Risk Assessment", automated: true, description: "Business and operational risk factors" },
        ...commonEndSections
      ];

    default:
      return [
        { title: "Executive Summary and Contents" },
        { title: "RPD and Location" },
        { title: "Legal and Planning" },
        { title: "Tenancy Schedule/Lease Details" },
        { title: "Statutory Assessment" },
        { title: "Market Commentary" },
        { title: "Property Details" },
        { title: "Plant and Equipment" },
        { title: "Rent Determination" },
        { title: "ESG Assessment and Audit" },
        { title: "Essential Repairs" },
        { title: "Risk Assessment & Market Indicators" },
        { title: "Climate Risk Assessment", subtitle: "Climate Risk Analysis & Valuation Impact", component: "ClimateRiskAssessment" },
        { title: "Previous Sales History and Current Sale" },
        { title: "Sales Evidence", subtitle: "Commercial, Residential and Agricultural" },
        { title: "Leasing Evidence", subtitle: "Commercial, Residential and Agricultural" },
        { title: "Valuation Analysis and Rationale" },
        { title: "Marketability and Mortgage Security" },
        { title: "Sustaino Pro Additional Analysis and Features" },
        { title: "Valuation Certificate" },
        { title: "Qualifications, Disclaimers, Terms and Conditions" },
        { title: "Annexures" },
        { title: "Security and Certificates" }
      ];
  }
};

export const getAutomatedAnalysisDescription = (propertyType: string): string => {
  const baseDescription = "This automated analysis incorporates retrospective valuation requirements, ";
  
  switch (propertyType) {
    case "commercial":
      return baseDescription + "commercial market data, income analysis, and tenant assessments to provide comprehensive commercial property insights.";
    case "residential":
      return baseDescription + "residential market trends, comparable sales analysis, and local area factors for accurate residential valuations.";
    case "agricultural":
      return baseDescription + "agricultural commodity data, land productivity metrics, and rural market factors for specialized rural property analysis.";
    case "specialised":
      return baseDescription + "specialized asset data, replacement cost analysis, and industry-specific factors for unique property valuations.";
    default:
      return baseDescription + "comprehensive market data and property-specific factors for accurate valuation analysis.";
  }
};