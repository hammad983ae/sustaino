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
    { title: "Property Details", automated: true, description: "Auto-populated from address analysis with property type focus", propertyTypes: [propertyType] },
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
    case "residential":
      return [
        ...baseSections,
        { title: "Legal and Planning", automated: true, description: "Zoning and development potential", propertyTypes: ["residential"] },
        { title: "Residential Market Commentary", automated: true, description: "Local residential market trends", propertyTypes: ["residential"] },
        { title: "Comparable Sales Analysis", automated: true, description: "Recent sales comparisons and adjustments", propertyTypes: ["residential"] },
        { title: "Residential Sales Evidence", component: "SalesEvidenceResidential", propertyTypes: ["residential"] },
        { title: "Rental Analysis", automated: true, description: "Rental yields and investment performance", propertyTypes: ["residential"] },
        { title: "Residential Valuation Analysis", component: "ValuationAnalysisResidential", propertyTypes: ["residential"] },
        { title: "Property Condition Assessment", automated: true, description: "Building condition and maintenance requirements", propertyTypes: ["residential"] },
        { title: "Investment Performance Analysis", automated: true, description: "ROI, cash flow, and growth projections", propertyTypes: ["residential"] },
        ...commonEndSections
      ];

    case "build-to-rent":
      return [
        ...baseSections,
        { title: "Legal and Planning", automated: true, description: "BTR zoning and development compliance", propertyTypes: ["build-to-rent"] },
        { title: "BTR Market Commentary", automated: true, description: "Build-to-rent market trends and analysis", propertyTypes: ["build-to-rent"] },
        { title: "BTR Development Analysis", automated: true, description: "Development costs and feasibility", propertyTypes: ["build-to-rent"] },
        { title: "BTR Sales Evidence", component: "SalesEvidenceResidential", propertyTypes: ["build-to-rent"] },
        { title: "BTR Leasing Evidence", component: "LeasingEvidenceResidential", propertyTypes: ["build-to-rent"] },
        { title: "Income Capitalisation Analysis", automated: true, description: "Rental income and yield analysis", propertyTypes: ["build-to-rent"] },
        { title: "BTR Valuation Analysis", component: "ValuationAnalysisResidential", propertyTypes: ["build-to-rent"] },
        { title: "Tenant Management Analysis", automated: true, description: "Operational efficiency and tenant retention", propertyTypes: ["build-to-rent"] },
        ...commonEndSections
      ];

    case "commercial":
      return [
        ...baseSections,
        { title: "Legal and Planning", component: "PlanningDataIntegration", description: "Zoning, permits, and compliance analysis with VicPlan integration", propertyTypes: ["commercial"] },
        { title: "Tenancy Schedule/Lease Details", component: "TenancyScheduleLeaseDetails", propertyTypes: ["commercial"] },
        { title: "Commercial Market Commentary", automated: true, description: "Local commercial market trends and analysis", propertyTypes: ["commercial"] },
        { title: "Commercial Sales Evidence", component: "SalesEvidenceCommercial", propertyTypes: ["commercial"] },
        { title: "Commercial Leasing Evidence", component: "LeasingEvidenceCommercial", propertyTypes: ["commercial"] },
        { title: "Income Capitalisation Analysis", automated: true, description: "NOI, cap rates, and yield analysis", propertyTypes: ["commercial"] },
        { title: "Commercial Valuation Analysis", component: "ValuationAnalysisCommercial", propertyTypes: ["commercial"] },
        { title: "Tenant Covenant Assessment", automated: true, description: "Credit analysis and lease security", propertyTypes: ["commercial"] },
        { title: "WALE and Portfolio Analysis", automated: true, description: "Weighted Average Lease Expiry analysis", propertyTypes: ["commercial"] },
        ...commonEndSections
      ];

    case "industrial":
      return [
        ...baseSections,
        { title: "Legal and Planning", automated: true, description: "Industrial zoning and environmental compliance", propertyTypes: ["industrial"] },
        { title: "Industrial Market Commentary", automated: true, description: "Industrial market trends and logistics analysis", propertyTypes: ["industrial"] },
        { title: "Operational Analysis", automated: true, description: "Functional layout and operational efficiency", propertyTypes: ["industrial"] },
        { title: "Industrial Sales Evidence", component: "SalesEvidenceCommercial", propertyTypes: ["industrial"] },
        { title: "Industrial Leasing Evidence", component: "LeasingEvidenceCommercial", propertyTypes: ["industrial"] },
        { title: "Income Capitalisation Analysis", automated: true, description: "Industrial rental yields and cap rates", propertyTypes: ["industrial"] },
        { title: "Industrial Valuation Analysis", component: "ValuationAnalysisCommercial", propertyTypes: ["industrial"] },
        { title: "Environmental Assessment", automated: true, description: "Environmental risks and contamination analysis", propertyTypes: ["industrial"] },
        ...commonEndSections
      ];

    case "retail":
      return [
        ...baseSections,
        { title: "Legal and Planning", automated: true, description: "Retail zoning and trading permits", propertyTypes: ["retail"] },
        { title: "Retail Market Commentary", automated: true, description: "Retail market trends and consumer analysis", propertyTypes: ["retail"] },
        { title: "Trade Area Analysis", automated: true, description: "Demographics and competition analysis", propertyTypes: ["retail"] },
        { title: "Retail Sales Evidence", component: "SalesEvidenceCommercial", propertyTypes: ["retail"] },
        { title: "Retail Leasing Evidence", component: "LeasingEvidenceCommercial", propertyTypes: ["retail"] },
        { title: "Income Capitalisation Analysis", automated: true, description: "Retail rents and turnover analysis", propertyTypes: ["retail"] },
        { title: "Retail Valuation Analysis", component: "ValuationAnalysisCommercial", propertyTypes: ["retail"] },
        { title: "Anchor Tenant Analysis", automated: true, description: "Key tenant impact and covenant assessment", propertyTypes: ["retail"] },
        ...commonEndSections
      ];

    case "development-land":
      return [
        ...baseSections,
        { title: "Legal and Planning", automated: true, description: "Development approvals and planning permits", propertyTypes: ["development-land"] },
        { title: "Development Market Commentary", automated: true, description: "Development market trends and feasibility", propertyTypes: ["development-land"] },
        { title: "Highest and Best Use Analysis", automated: true, description: "Optimal development potential analysis", propertyTypes: ["development-land"] },
        { title: "Development Sales Evidence", component: "SalesEvidenceDevelopment", propertyTypes: ["development-land"] },
        { title: "Feasibility Analysis", automated: true, description: "Development costs and profit margins", propertyTypes: ["development-land"] },
        { title: "Development Valuation Analysis", component: "ValuationAnalysisCommercial", propertyTypes: ["development-land"] },
        { title: "Planning Constraints", automated: true, description: "Zoning limitations and development controls", propertyTypes: ["development-land"] },
        { title: "Infrastructure Assessment", automated: true, description: "Services availability and upgrade requirements", propertyTypes: ["development-land"] },
        ...commonEndSections
      ];

    case "agricultural":
      return [
        ...baseSections,
        { title: "Legal and Planning", automated: true, description: "Agricultural zoning and water rights", propertyTypes: ["agricultural"] },
        { title: "Agricultural Market Commentary", automated: true, description: "Commodity markets and rural trends", propertyTypes: ["agricultural"] },
        { title: "Land Productivity Analysis", automated: true, description: "Soil quality, climate, and carrying capacity", propertyTypes: ["agricultural"] },
        { title: "Agricultural Sales Evidence", component: "SalesEvidenceAgricultural", propertyTypes: ["agricultural"] },
        { title: "Water Rights Assessment", automated: true, description: "Water allocations and irrigation analysis", propertyTypes: ["agricultural"] },
        { title: "Agricultural Valuation Analysis", component: "ValuationAnalysisAgricultural", propertyTypes: ["agricultural"] },
        { title: "Carbon Farming Assessment", component: "CarbonFarmProjects", propertyTypes: ["agricultural"] },
        { title: "Commodity Price Analysis", automated: true, description: "Market prices and production forecasts", propertyTypes: ["agricultural"] },
        { title: "Environmental Constraints", automated: true, description: "Climate risks and sustainability factors", propertyTypes: ["agricultural"] },
        ...commonEndSections
      ];

    case "specialised":
      return [
        ...baseSections,
        { title: "Legal and Planning", automated: true, description: "Specialized use permits and compliance", propertyTypes: ["specialised"] },
        { title: "Specialised Market Commentary", automated: true, description: "Industry-specific market analysis", propertyTypes: ["specialised"] },
        { title: "Operational Performance Analysis", automated: true, description: "Revenue, occupancy, and efficiency metrics", propertyTypes: ["specialised"] },
        { title: "Specialised Sales Evidence", component: "SalesEvidenceSpecialised", propertyTypes: ["specialised"] },
        { title: "Replacement Cost Analysis", automated: true, description: "Depreciated replacement cost methodology", propertyTypes: ["specialised"] },
        { title: "Specialised Valuation Analysis", component: "ValuationAnalysisSpecialised", propertyTypes: ["specialised"] },
        { title: "Industry Benchmarking", automated: true, description: "Comparison with industry standards", propertyTypes: ["specialised"] },
        { title: "Operational Risk Assessment", automated: true, description: "Business and operational risk factors", propertyTypes: ["specialised"] },
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

// Filter sections based on property type to hide irrelevant sections
export const filterSectionsByPropertyType = (sections: ReportSectionConfig[], selectedPropertyType: string): ReportSectionConfig[] => {
  return sections.filter(section => {
    // If section doesn't specify property types, include it (universal sections)
    if (!section.propertyTypes) return true;
    
    // Include section if it's for the selected property type
    return section.propertyTypes.includes(selectedPropertyType);
  });
};

export const getAutomatedAnalysisDescription = (propertyType: string): string => {
  const baseDescription = "This automated analysis incorporates retrospective valuation requirements, ";
  
  switch (propertyType) {
    case "residential":
      return baseDescription + "residential market trends, comparable sales analysis, and local area factors for accurate residential valuations.";
    case "build-to-rent":
      return baseDescription + "BTR market data, development costs, and rental income analysis for build-to-rent property valuations.";
    case "commercial":
      return baseDescription + "commercial market data, income analysis, and tenant assessments to provide comprehensive commercial property insights.";
    case "industrial":
      return baseDescription + "industrial market trends, operational efficiency, and environmental factors for industrial property analysis.";
    case "retail":
      return baseDescription + "retail market data, trade area analysis, and consumer trends for retail property valuations.";
    case "development-land":
      return baseDescription + "development feasibility, planning constraints, and highest and best use analysis for land valuations.";
    case "agricultural":
      return baseDescription + "agricultural commodity data, land productivity metrics, and rural market factors for specialized rural property analysis.";
    case "specialised":
      return baseDescription + "specialized asset data, replacement cost analysis, and industry-specific factors for unique property valuations.";
    default:
      return baseDescription + "comprehensive market data and property-specific factors for accurate valuation analysis.";
  }
};