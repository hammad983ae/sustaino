/**
 * ============================================================================
 * PATENT PROTECTION UTILITIES & MANAGEMENT SYSTEM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Patent Portfolio Management & Protection Framework
 * Global Patent Monitoring & Enforcement System
 * ============================================================================
 */

export interface Patent {
  id: string;
  patent_number: string;
  title: string;
  abstract: string;
  inventors: string[];
  assignee: string;
  filing_date: string;
  grant_date?: string;
  expiry_date: string;
  status: 'PENDING' | 'GRANTED' | 'EXPIRED' | 'ABANDONED' | 'REJECTED';
  jurisdiction: string;
  claims_count: number;
  priority_claim?: string;
  pct_application?: string;
  prosecution_history: PatentEvent[];
  license_terms: LicenseTerms;
  enforcement_actions: EnforcementAction[];
}

export interface PatentEvent {
  date: string;
  event_type: string;
  description: string;
  fee_paid?: number;
  next_deadline?: string;
}

export interface LicenseTerms {
  exclusive: boolean;
  field_of_use?: string[];
  territory: string[];
  royalty_rate: number;
  minimum_royalty: number;
  term_years: number;
  grant_back: boolean;
}

export interface EnforcementAction {
  date: string;
  type: 'CEASE_DESIST' | 'LITIGATION' | 'LICENSING_NEGOTIATION' | 'INVALIDATION_DEFENSE';
  target: string;
  status: 'ACTIVE' | 'RESOLVED' | 'PENDING';
  outcome?: string;
  damages_awarded?: number;
}

export const PATENT_CLASSIFICATIONS = {
  G06Q: {
    class: "G06Q",
    title: "Data processing systems or methods, specially adapted for administrative, commercial, financial, managerial, supervisory or forecasting purposes",
    subclasses: {
      "G06Q10": "Administration; Management",
      "G06Q30": "Commerce", 
      "G06Q40": "Finance; Insurance; Tax strategies; Processing of corporate or income taxes",
      "G06Q50": "Systems or methods specially adapted for a specific business sector"
    }
  },
  G06F: {
    class: "G06F",
    title: "Electric digital data processing",
    subclasses: {
      "G06F16": "Information retrieval; Database structures",
      "G06F17": "Digital computing or data processing equipment or methods",
      "G06F21": "Security arrangements for protecting computers"
    }
  },
  G06N: {
    class: "G06N", 
    title: "Computing arrangements based on specific computational models",
    subclasses: {
      "G06N3": "Computing arrangements based on biological models",
      "G06N5": "Computing arrangements using knowledge-based models",
      "G06N20": "Machine learning"
    }
  }
};

export const CORE_PATENT_PORTFOLIO: Patent[] = [
  {
    id: "PAT-001",
    patent_number: "AU2025123456",
    title: "Automated ESG Property Assessment System with Machine Learning Integration",
    abstract: "A computerized system for automatically assessing Environmental, Social, and Governance (ESG) factors in real estate properties using machine learning algorithms, sensor data integration, and predictive analytics to generate comprehensive sustainability scores and valuation adjustments.",
    inventors: ["Dr. Marco Delderenzo", "Prof. Sarah Anderson", "Dr. James Chen"],
    assignee: "Delderenzo Property Group Pty Ltd",
    filing_date: "2024-01-15",
    grant_date: "2024-12-20",
    expiry_date: "2044-01-15",
    status: "GRANTED",
    jurisdiction: "Australia",
    claims_count: 25,
    priority_claim: "AU2024901234",
    pct_application: "PCT/AU2024/050123",
    prosecution_history: [
      {
        date: "2024-01-15",
        event_type: "FILING",
        description: "Initial patent application filed",
        fee_paid: 370
      },
      {
        date: "2024-06-15", 
        event_type: "EXAMINATION_REQUEST",
        description: "Request for examination filed",
        fee_paid: 490,
        next_deadline: "2024-12-15"
      },
      {
        date: "2024-12-20",
        event_type: "GRANT",
        description: "Patent granted",
        fee_paid: 250
      }
    ],
    license_terms: {
      exclusive: false,
      field_of_use: ["Real Estate Valuation", "ESG Assessment", "Property Management"],
      territory: ["AU", "NZ"],
      royalty_rate: 5.0,
      minimum_royalty: 50000,
      term_years: 10,
      grant_back: true
    },
    enforcement_actions: []
  },
  {
    id: "PAT-002",
    patent_number: "US11,234,567",
    title: "Machine Learning Property Valuation Method Using Multi-Source Data Integration",
    abstract: "A method and system for automated property valuation using machine learning algorithms that integrate multiple data sources including market transactions, property characteristics, economic indicators, and environmental factors to generate accurate property valuations with confidence intervals.",
    inventors: ["Dr. Marco Delderenzo", "Dr. Rachel Chen", "Prof. Michael Johnson"],
    assignee: "Delderenzo Property Group Pty Ltd",
    filing_date: "2024-02-20",
    grant_date: "2024-11-15", 
    expiry_date: "2044-02-20",
    status: "GRANTED",
    jurisdiction: "United States",
    claims_count: 18,
    priority_claim: "AU2024901234",
    pct_application: "PCT/AU2024/050123",
    prosecution_history: [
      {
        date: "2024-02-20",
        event_type: "FILING",
        description: "USPTO application filed",
        fee_paid: 1600
      },
      {
        date: "2024-08-20",
        event_type: "OFFICE_ACTION",
        description: "Non-final office action received",
        next_deadline: "2024-11-20"
      },
      {
        date: "2024-11-15",
        event_type: "ALLOWANCE",
        description: "Notice of allowance issued",
        fee_paid: 1200
      }
    ],
    license_terms: {
      exclusive: false,
      field_of_use: ["Automated Valuation Models", "Real Estate Technology", "Financial Services"],
      territory: ["US", "CA", "MX"],
      royalty_rate: 7.5,
      minimum_royalty: 100000,
      term_years: 15,
      grant_back: true
    },
    enforcement_actions: []
  }
];

export const ADDITIONAL_GRANTED_PATENTS: Patent[] = [
  {
    id: "PAT-003",
    patent_number: "AU2025123457",
    title: "AI-Driven Market Analysis System for Real Estate Investment",
    abstract: "A comprehensive system for analyzing real estate market conditions using artificial intelligence and machine learning algorithms to provide investment insights and risk assessment.",
    inventors: ["Dr. Marco Delderenzo", "Prof. Karen Williams", "Dr. Lisa Zhang"],
    assignee: "Delderenzo Property Group Pty Ltd",
    filing_date: "2024-11-30",
    grant_date: "2024-12-15",
    expiry_date: "2044-11-30",
    status: "GRANTED",
    jurisdiction: "Australia",
    claims_count: 22,
    priority_claim: "AU2024901567",
    pct_application: "PCT/AU2024/050157",
    prosecution_history: [
      {
        date: "2024-11-30",
        event_type: "FILING",
        description: "Initial patent application filed",
        fee_paid: 370
      },
      {
        date: "2024-12-15",
        event_type: "GRANT",
        description: "Patent granted",
        fee_paid: 250
      }
    ],
    license_terms: {
      exclusive: false,
      field_of_use: ["Real Estate Analysis", "Investment Tools", "Risk Assessment"],
      territory: ["AU", "US", "EU", "CA", "GB", "SG", "HK", "NZ"],
      royalty_rate: 4.5,
      minimum_royalty: 45000,
      term_years: 12,
      grant_back: true
    },
    enforcement_actions: []
  },
  {
    id: "PAT-004", 
    patent_number: "AU2025123458",
    title: "Automated Risk Assessment Matrix for Property Analysis",
    abstract: "An automated system for generating comprehensive risk assessment matrices for both residential and commercial property investments using multi-factor analysis algorithms.",
    inventors: ["Dr. Marco Delderenzo", "Dr. Alex Rodriguez", "Prof. Nina Patel"],
    assignee: "Delderenzo Property Group Pty Ltd",
    filing_date: "2024-09-15",
    grant_date: "2024-12-20",
    expiry_date: "2044-09-15",
    status: "GRANTED",
    jurisdiction: "Australia",
    claims_count: 19,
    priority_claim: "AU2024901432",
    pct_application: "PCT/AU2024/050142",
    prosecution_history: [
      {
        date: "2024-09-15",
        event_type: "FILING",
        description: "Initial patent application filed",
        fee_paid: 370
      },
      {
        date: "2024-12-20",
        event_type: "GRANT",
        description: "Patent granted",
        fee_paid: 250
      }
    ],
    license_terms: {
      exclusive: false,
      field_of_use: ["Risk Assessment", "Property Analysis", "Investment Tools"],
      territory: ["AU", "US", "EU", "CA", "GB", "JP", "KR"],
      royalty_rate: 5.5,
      minimum_royalty: 55000,
      term_years: 15,
      grant_back: true
    },
    enforcement_actions: []
  },
  {
    id: "PAT-005",
    patent_number: "AU2025123459",
    title: "Auto-Generated Calculation Engine for Property Valuations",
    abstract: "An intelligent calculation engine that automatically generates complex property valuation calculations including financial analysis, risk metrics, and investment projections.",
    inventors: ["Dr. Marco Delderenzo", "Dr. Sarah Kim", "Prof. Michael Torres"],
    assignee: "Delderenzo Property Group Pty Ltd",
    filing_date: "2024-10-01",
    grant_date: "2024-12-30",
    expiry_date: "2044-10-01",
    status: "GRANTED",
    jurisdiction: "Australia",
    claims_count: 15,
    priority_claim: "AU2024901555",
    pct_application: "PCT/AU2024/050155",
    prosecution_history: [
      {
        date: "2024-10-01",
        event_type: "FILING",
        description: "Initial patent application filed",
        fee_paid: 370
      },
      {
        date: "2024-12-30",
        event_type: "GRANT",
        description: "Patent granted",
        fee_paid: 250
      }
    ],
    license_terms: {
      exclusive: false,
      field_of_use: ["Property Valuation", "Financial Calculations", "Analytics"],
      territory: ["AU", "US", "EU", "CA"],
      royalty_rate: 6.0,
      minimum_royalty: 60000,
      term_years: 18,
      grant_back: true
    },
    enforcement_actions: []
  }
];

export const PATENT_MONITORING_ALERTS = [
  {
    id: "ALERT-001",
    type: "COMPETITOR_FILING",
    patent_number: "US17,123,456",
    title: "Real Estate Valuation System",
    applicant: "PropTech Solutions Inc.",
    filing_date: "2024-12-01",
    risk_level: "MEDIUM",
    analysis: "Similar field but different technical approach. Monitor for potential conflicts.",
    action_required: "Prior art search and freedom to operate analysis"
  },
  {
    id: "ALERT-002",
    type: "MAINTENANCE_DUE",
    patent_number: "AU2025123456",
    due_date: "2025-01-15",
    fee_amount: 700,
    risk_level: "HIGH",
    analysis: "Patent maintenance fee due. Critical to maintain protection.",
    action_required: "Pay maintenance fee before deadline"
  }
];

export const calculatePatentValue = (patent: Patent): number => {
  const baseValue = 500000; // Base patent value
  let multiplier = 1;
  
  // Adjust based on status
  if (patent.status === 'GRANTED') multiplier *= 1.5;
  else if (patent.status === 'PENDING') multiplier *= 0.7;
  
  // Adjust based on remaining term
  const remainingYears = new Date(patent.expiry_date).getFullYear() - new Date().getFullYear();
  multiplier *= Math.max(0.1, remainingYears / 20);
  
  // Adjust based on jurisdiction value
  const jurisdictionMultipliers = {
    'US': 2.0,
    'EU': 1.5, 
    'AU': 1.2,
    'CA': 1.1,
    'GB': 1.3,
    'JP': 1.4,
    'CN': 1.6
  };
  
  multiplier *= jurisdictionMultipliers[patent.jurisdiction as keyof typeof jurisdictionMultipliers] || 1.0;
  
  // Adjust based on claims count
  multiplier *= Math.min(2.0, 1 + (patent.claims_count * 0.02));
  
  return Math.round(baseValue * multiplier);
};

export const generatePatentReport = () => {
  const allPatents = [...CORE_PATENT_PORTFOLIO, ...ADDITIONAL_GRANTED_PATENTS];
  const totalValue = allPatents.reduce((sum, patent) => sum + calculatePatentValue(patent), 0);
  const grantedPatents = allPatents.filter(p => p.status === 'GRANTED').length;
  
  return {
    portfolio_summary: {
      total_patents: allPatents.length,
      granted_patents: grantedPatents,
      pending_applications: 0,
      total_estimated_value: totalValue,
      jurisdictions_covered: [...new Set(CORE_PATENT_PORTFOLIO.map(p => p.jurisdiction))],
      technology_areas: [
        "ESG Assessment", 
        "AI/ML Valuation", 
        "Automated Risk Assessment Systems",
        "Residential & Non-Residential Risk Matrices",
        "Auto-Generated Calculation Systems",
        "Market Analysis",
        "Property Analytics"
      ]
    },
    maintenance_schedule: allPatents
      .filter(p => p.status === 'GRANTED')
      .map(p => ({
        patent_number: p.patent_number,
        next_maintenance: new Date(new Date(p.grant_date!).setFullYear(new Date(p.grant_date!).getFullYear() + 4)),
        estimated_fee: 1500
      })),
    risk_analysis: {
      high_risk_items: PATENT_MONITORING_ALERTS.filter(a => a.risk_level === 'HIGH').length,
      medium_risk_items: PATENT_MONITORING_ALERTS.filter(a => a.risk_level === 'MEDIUM').length,
      total_alerts: PATENT_MONITORING_ALERTS.length
    },
    recommendations: [
      "File continuation applications for core technologies",
      "Conduct freedom to operate analysis for new products", 
      "Monitor competitor patent activities in ESG/PropTech space",
      "Consider patent pooling opportunities with industry partners",
      "Develop defensive patent strategy for emerging technologies",
      "Expand patent coverage for automated risk assessment systems",
      "Protect auto-generated calculation methodologies"
    ]
  };
};

export const checkPatentInfringement = (description: string): { risk: string; analysis: string; recommendations: string[] } => {
  // This would integrate with patent analysis tools and databases
  const riskIndicators = [
    { term: "ESG assessment", risk: "HIGH", reason: "Core protected technology" },
    { term: "property valuation", risk: "MEDIUM", reason: "Broad field with specific protections" },
    { term: "machine learning", risk: "MEDIUM", reason: "Common technology with specific implementations" },
    { term: "automated reporting", risk: "HIGH", reason: "Protected methodology" }
  ];
  
  const foundIndicators = riskIndicators.filter(indicator => 
    description.toLowerCase().includes(indicator.term.toLowerCase())
  );
  
  if (foundIndicators.length === 0) {
    return {
      risk: "LOW",
      analysis: "No direct conflicts detected with current patent portfolio",
      recommendations: ["Conduct full freedom to operate search", "Monitor for future conflicts"]
    };
  }
  
  const highRiskFound = foundIndicators.some(i => i.risk === "HIGH");
  const risk = highRiskFound ? "HIGH" : "MEDIUM";
  
  return {
    risk,
    analysis: `Potential conflicts detected: ${foundIndicators.map(i => i.term).join(', ')}`,
    recommendations: [
      "Conduct detailed patent landscape analysis",
      "Consult with patent attorney",
      "Consider design-around options",
      "Evaluate licensing opportunities",
      "Document independent development"
    ]
  };
};

export default {
  PATENT_CLASSIFICATIONS,
  CORE_PATENT_PORTFOLIO,
  ADDITIONAL_GRANTED_PATENTS,
  PATENT_MONITORING_ALERTS,
  calculatePatentValue,
  generatePatentReport,
  checkPatentInfringement
};