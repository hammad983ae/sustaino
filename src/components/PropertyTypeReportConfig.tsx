// Configuration for property-type specific report sections
export interface ReportSectionConfig {
  title: string;
  subtitle?: string;
  component?: string;
  automated?: boolean;
  description?: string;
  required?: boolean;
  propertyTypes?: string[];
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
        { title: "Executive Summary and Contents", required: true, automated: true },
        { title: "RPD and Location", required: true, automated: true },
        { title: "Legal and Planning", required: true, automated: true },
        { title: "Tenancy Schedule/Lease Details", required: false, automated: false },
        { title: "Statutory Assessment", required: true, automated: true },
        { title: "Market Commentary", required: true, automated: true },
        { title: "Property Details", required: true, automated: true },
        { title: "Plant and Equipment", required: false, automated: false },
        { title: "Rent Determination", required: false, automated: false },
        { title: "ESG Assessment and Audit", required: true, automated: true },
        { title: "Essential Repairs", required: false, automated: false },
        { title: "Risk Assessment & Market Indicators", required: true, automated: true },
        { title: "Previous Sales History and Current Sale", required: true, automated: true },
        { title: "Sales Evidence", subtitle: "Commercial, Residential and Agricultural", required: true, automated: true },
        { title: "Leasing Evidence", subtitle: "Commercial, Residential and Agricultural", required: true, automated: true },
        { title: "Valuation Analysis and Rationale", required: true, automated: true },
        { title: "Marketability and Mortgage Security", required: true, automated: true },
        { title: "Sustaino Pro Additional Analysis and Features", required: false, automated: true },
        { title: "Valuation Certificate", required: true, automated: true },
        { title: "Additional Comments & Strategic Recommendations", required: false, automated: false },
        { title: "Qualifications, Disclaimers, Terms and Conditions", required: true, automated: true },
        { title: "Annexures", required: false, automated: false },
        { title: "Security and Certificates", required: true, automated: true }
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