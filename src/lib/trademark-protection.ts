/**
 * ============================================================================
 * TRADEMARK PROTECTION & BRAND MANAGEMENT SYSTEM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Global Trademark Portfolio Management & Brand Protection Framework
 * Multi-Jurisdictional Registration & Enforcement System
 * ============================================================================
 */

export interface Trademark {
  id: string;
  mark: string;
  registration_number?: string;
  application_number?: string;
  status: 'PENDING' | 'REGISTERED' | 'OPPOSED' | 'CANCELLED' | 'EXPIRED' | 'RENEWED';
  filing_date: string;
  registration_date?: string;
  renewal_date?: string;
  expiry_date: string;
  jurisdiction: string;
  classes: TrademarkClass[];
  goods_services: string[];
  owner: string;
  agent?: TrademarkAgent;
  opposition_periods: OppositionPeriod[];
  enforcement_actions: TrademarkEnforcement[];
  watch_services: WatchService[];
  licensing_agreements: TrademarkLicense[];
}

export interface TrademarkClass {
  class_number: number;
  description: string;
  goods_services: string[];
  status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
}

export interface TrademarkAgent {
  name: string;
  firm: string;
  registration_number: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface OppositionPeriod {
  start_date: string;
  end_date: string;
  status: 'OPEN' | 'CLOSED' | 'EXTENDED';
  oppositions_filed: Opposition[];
}

export interface Opposition {
  id: string;
  opponent: string;
  grounds: string[];
  filing_date: string;
  status: 'PENDING' | 'RESOLVED' | 'WITHDRAWN';
  outcome?: string;
}

export interface TrademarkEnforcement {
  id: string;
  type: 'INFRINGEMENT' | 'COUNTERFEITING' | 'CYBERSQUATTING' | 'PASSING_OFF';
  target: string;
  jurisdiction: string;
  action_taken: string;
  status: 'INITIATED' | 'IN_PROGRESS' | 'RESOLVED' | 'ABANDONED';
  outcome?: string;
  damages_recovered?: number;
  date_initiated: string;
  date_resolved?: string;
}

export interface WatchService {
  id: string;
  mark: string;
  jurisdiction: string[];
  watch_type: 'IDENTICAL' | 'SIMILAR' | 'PHONETIC' | 'TRANSLATION';
  classes: number[];
  alerts: WatchAlert[];
  active: boolean;
  cost_per_month: number;
}

export interface WatchAlert {
  id: string;
  date: string;
  mark_detected: string;
  applicant: string;
  application_number: string;
  classes: number[];
  similarity_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  action_required: boolean;
  notes?: string;
}

export interface TrademarkLicense {
  id: string;
  licensee: string;
  territory: string[];
  classes: number[];
  exclusive: boolean;
  royalty_rate: number;
  minimum_royalty: number;
  term_start: string;
  term_end: string;
  quality_control: QualityControlTerms;
  termination_events: string[];
}

export interface QualityControlTerms {
  standards_required: string[];
  inspection_rights: boolean;
  approval_required: string[];
  trademark_usage_guidelines: string;
}

export const MADRID_PROTOCOL_COUNTRIES = [
  "AU", "US", "EU", "GB", "CA", "JP", "KR", "CN", "SG", "HK", "NZ", "CH", "NO", "SE", "DK", "FI",
  "FR", "DE", "IT", "ES", "NL", "BE", "AT", "IE", "PT", "GR", "CY", "MT", "LU", "EE", "LV", "LT",
  "PL", "CZ", "SK", "HU", "SI", "HR", "BG", "RO", "MX", "BR", "AR", "CL", "CO", "PE", "UY", "EC",
  "BO", "PY", "CR", "PA", "GT", "SV", "HN", "NI", "DO", "CU", "JM", "TT", "BB", "BZ", "SR", "GY"
];

export const TRADEMARK_CLASSES = {
  9: {
    number: 9,
    title: "Scientific, research, navigation, surveying, photographic, cinematographic, audiovisual, optical, weighing, measuring, signalling, detecting, testing, inspecting, life-saving and teaching apparatus and instruments",
    relevant_goods: [
      "Computer software for property assessment",
      "Mobile applications for real estate analysis", 
      "Electronic databases containing property information",
      "Computer programs for ESG assessment",
      "Software for automated valuation models",
      "Digital platforms for property management"
    ]
  },
  35: {
    number: 35,
    title: "Advertising; business management; business administration; office functions",
    relevant_services: [
      "Business consulting services in the field of real estate",
      "Property management services",
      "Real estate appraisal and valuation services",
      "Market research and analysis services",
      "Database management services",
      "Business intelligence and analytics services"
    ]
  },
  42: {
    number: 42,
    title: "Scientific and technological services and research and design relating thereto; industrial analysis, industrial research and industrial design services",
    relevant_services: [
      "Software as a service (SaaS) featuring property assessment tools",
      "Platform as a service (PaaS) for real estate applications",
      "Technical consulting services in the field of property technology",
      "Research and development of ESG assessment methodologies",
      "Design and development of computer software",
      "Cloud computing services for real estate data"
    ]
  },
  36: {
    number: 36,
    title: "Insurance; financial affairs; monetary affairs; real estate affairs",
    relevant_services: [
      "Real estate valuation services",
      "Property investment consulting",
      "Mortgage and lending services",
      "Insurance services for real estate",
      "Financial analysis and reporting",
      "Investment advisory services"
    ]
  }
};

export const CORE_TRADEMARK_PORTFOLIO: Trademark[] = [
  {
    id: "TM-001",
    mark: "Property Assessment Platform™",
    registration_number: "2234567",
    application_number: "2034567",
    status: "REGISTERED",
    filing_date: "2024-01-15",
    registration_date: "2024-08-20",
    renewal_date: "2034-08-20",
    expiry_date: "2034-08-20",
    jurisdiction: "AU",
    classes: [
      {
        class_number: 9,
        description: "Computer software for property assessment and valuation",
        goods_services: ["Computer software", "Mobile applications", "Electronic databases"],
        status: "ACCEPTED"
      },
      {
        class_number: 35, 
        description: "Business consulting services in real estate",
        goods_services: ["Business consulting", "Property management", "Market research"],
        status: "ACCEPTED"
      },
      {
        class_number: 42,
        description: "Software as a service for property assessment",
        goods_services: ["SaaS platforms", "Technical consulting", "Software development"],
        status: "ACCEPTED"
      }
    ],
    goods_services: [
      "Computer software for property assessment and automated valuation",
      "Business consulting services in the field of real estate and property management",
      "Software as a service (SaaS) featuring property assessment and ESG evaluation tools"
    ],
    owner: "Delderenzo Property Group Pty Ltd",
    agent: {
      name: "Sarah Chen",
      firm: "IP Specialists Australia",
      registration_number: "12345",
      contact: {
        email: "s.chen@ipspecialists.com.au",
        phone: "+61 2 9876 5432",
        address: "Level 20, IP House, 123 Trademark Street, Sydney NSW 2000"
      }
    },
    opposition_periods: [
      {
        start_date: "2024-08-27",
        end_date: "2024-10-27",
        status: "CLOSED",
        oppositions_filed: []
      }
    ],
    enforcement_actions: [],
    watch_services: [
      {
        id: "WATCH-001",
        mark: "Property Assessment Platform",
        jurisdiction: ["AU", "US", "EU", "CA", "GB", "NZ"],
        watch_type: "SIMILAR",
        classes: [9, 35, 42],
        alerts: [],
        active: true,
        cost_per_month: 500
      }
    ],
    licensing_agreements: []
  },
  {
    id: "TM-002",
    mark: "DeLorenzoAI™",
    registration_number: "2234568",
    application_number: "2034568", 
    status: "REGISTERED",
    filing_date: "2024-02-01",
    registration_date: "2024-09-15",
    renewal_date: "2034-09-15",
    expiry_date: "2034-09-15",
    jurisdiction: "US",
    classes: [
      {
        class_number: 9,
        description: "Artificial intelligence software for property analysis",
        goods_services: ["AI software", "Machine learning platforms", "Predictive analytics tools"],
        status: "ACCEPTED"
      },
      {
        class_number: 42,
        description: "Artificial intelligence as a service",
        goods_services: ["AI consulting", "Machine learning services", "Data analytics"],
        status: "ACCEPTED"
      }
    ],
    goods_services: [
      "Artificial intelligence software for automated property valuation and market analysis",
      "Artificial intelligence as a service (AIaaS) featuring machine learning for real estate"
    ],
    owner: "Delderenzo Property Group Pty Ltd",
    agent: {
      name: "Michael Johnson",
      firm: "Johnson & Associates Patent & Trademark Attorneys",
      registration_number: "USPTO-54321",
      contact: {
        email: "m.johnson@johnsonpatents.com",
        phone: "+1 212 555 0123",
        address: "Suite 4500, Empire State Building, New York, NY 10118"
      }
    },
    opposition_periods: [
      {
        start_date: "2024-09-22",
        end_date: "2024-11-22", 
        status: "CLOSED",
        oppositions_filed: []
      }
    ],
    enforcement_actions: [],
    watch_services: [
      {
        id: "WATCH-002",
        mark: "DeLorenzoAI",
        jurisdiction: ["US", "CA", "MX", "EU", "GB"],
        watch_type: "IDENTICAL",
        classes: [9, 42],
        alerts: [
          {
            id: "ALERT-001",
            date: "2024-12-15",
            mark_detected: "DeLorenzo AI Solutions",
            applicant: "Tech Innovations LLC",
            application_number: "US17/123,456",
            classes: [9, 42],
            similarity_score: 0.85,
            risk_level: "HIGH",
            action_required: true,
            notes: "Potential confusion with our DeLorenzoAI mark. Recommend filing opposition."
          }
        ],
        active: true,
        cost_per_month: 750
      }
    ],
    licensing_agreements: []
  }
];

export const PENDING_TRADEMARK_APPLICATIONS = [
  {
    id: "TM-PEND-001",
    mark: "Climate Impact Valuator™",
    application_number: "2134567",
    status: "PENDING",
    filing_date: "2024-11-01",
    expected_registration: "2025-06-01",
    jurisdiction: "EU",
    classes: [9, 35, 42],
    estimated_cost: 15000,
    Madrid_protocol: true,
    designated_countries: ["DE", "FR", "IT", "ES", "NL", "BE", "AT", "IE", "PT", "GR"]
  },
  {
    id: "TM-PEND-002",
    mark: "Sustainability Scorer™", 
    application_number: "2134568",
    status: "PENDING",
    filing_date: "2024-12-01",
    expected_registration: "2025-07-01",
    jurisdiction: "MADRID",
    classes: [9, 35, 42],
    estimated_cost: 25000,
    Madrid_protocol: true,
    designated_countries: ["AU", "US", "EU", "CA", "GB", "JP", "SG", "HK", "NZ", "CH"]
  }
];

export const calculateTrademarkValue = (trademark: Trademark): number => {
  let baseValue = 100000; // Base trademark value
  let multiplier = 1;
  
  // Adjust based on status
  if (trademark.status === 'REGISTERED') multiplier *= 2.0;
  else if (trademark.status === 'PENDING') multiplier *= 0.5;
  
  // Adjust based on jurisdiction
  const jurisdictionValues = {
    'US': 3.0,
    'EU': 2.5,
    'AU': 1.5,
    'CA': 1.3,
    'GB': 1.8,
    'JP': 2.0,
    'CN': 2.2,
    'MADRID': 4.0
  };
  
  multiplier *= jurisdictionValues[trademark.jurisdiction as keyof typeof jurisdictionValues] || 1.0;
  
  // Adjust based on number of classes
  multiplier *= Math.min(3.0, 1 + (trademark.classes.length * 0.3));
  
  // Adjust based on age (established marks are more valuable)
  if (trademark.registration_date) {
    const ageYears = (new Date().getTime() - new Date(trademark.registration_date).getTime()) / (1000 * 60 * 60 * 24 * 365);
    multiplier *= Math.min(2.0, 1 + (ageYears * 0.1));
  }
  
  return Math.round(baseValue * multiplier);
};

export const generateTrademarkReport = () => {
  const totalValue = CORE_TRADEMARK_PORTFOLIO.reduce((sum, tm) => sum + calculateTrademarkValue(tm), 0);
  const registeredMarks = CORE_TRADEMARK_PORTFOLIO.filter(tm => tm.status === 'REGISTERED').length;
  const pendingMarks = PENDING_TRADEMARK_APPLICATIONS.length;
  
  const renewalSchedule = CORE_TRADEMARK_PORTFOLIO
    .filter(tm => tm.status === 'REGISTERED' && tm.renewal_date)
    .map(tm => ({
      mark: tm.mark,
      renewal_date: tm.renewal_date!,
      jurisdiction: tm.jurisdiction,
      estimated_cost: getTrademarkRenewalCost(tm.jurisdiction, tm.classes.length)
    }))
    .sort((a, b) => new Date(a.renewal_date).getTime() - new Date(b.renewal_date).getTime());
  
  return {
    portfolio_summary: {
      total_marks: CORE_TRADEMARK_PORTFOLIO.length,
      registered_marks: registeredMarks,
      pending_applications: pendingMarks,
      total_estimated_value: totalValue,
      jurisdictions_covered: [...new Set(CORE_TRADEMARK_PORTFOLIO.map(tm => tm.jurisdiction))],
      classes_covered: [...new Set(CORE_TRADEMARK_PORTFOLIO.flatMap(tm => tm.classes.map(c => c.class_number)))]
    },
    renewal_schedule: renewalSchedule,
    watch_alerts: CORE_TRADEMARK_PORTFOLIO
      .flatMap(tm => tm.watch_services)
      .flatMap(ws => ws.alerts)
      .filter(alert => alert.action_required),
    enforcement_summary: {
      active_cases: CORE_TRADEMARK_PORTFOLIO
        .flatMap(tm => tm.enforcement_actions)
        .filter(ea => ea.status === 'IN_PROGRESS').length,
      total_damages_recovered: CORE_TRADEMARK_PORTFOLIO
        .flatMap(tm => tm.enforcement_actions)
        .reduce((sum, ea) => sum + (ea.damages_recovered || 0), 0)
    },
    recommendations: [
      "File Madrid Protocol applications for global expansion",
      "Implement comprehensive watch services for all key marks",
      "Review and update trademark usage guidelines",
      "Consider filing in additional jurisdictions for key markets",
      "Develop brand protection strategy for digital channels"
    ]
  };
};

const getTrademarkRenewalCost = (jurisdiction: string, classCount: number): number => {
  const baseCosts = {
    'AU': 400,
    'US': 500,
    'EU': 850,
    'CA': 330,
    'GB': 200,
    'JP': 600,
    'CN': 300
  };
  
  const baseCost = baseCosts[jurisdiction as keyof typeof baseCosts] || 500;
  return baseCost + (classCount - 1) * (baseCost * 0.3);
};

export const checkTrademarkConflict = (proposedMark: string, classes: number[], jurisdiction: string) => {
  // This would integrate with trademark search databases
  const conflicts = CORE_TRADEMARK_PORTFOLIO.filter(tm => {
    const markSimilarity = calculateMarkSimilarity(proposedMark, tm.mark);
    const classOverlap = tm.classes.some(c => classes.includes(c.class_number));
    const jurisdictionConflict = tm.jurisdiction === jurisdiction || tm.jurisdiction === 'MADRID';
    
    return markSimilarity > 0.7 && classOverlap && jurisdictionConflict;
  });
  
  if (conflicts.length === 0) {
    return {
      risk: "LOW",
      conflicts: [],
      recommendations: ["Conduct comprehensive trademark search", "Consider filing application"]
    };
  }
  
  return {
    risk: conflicts.length > 0 ? "HIGH" : "MEDIUM",
    conflicts: conflicts.map(c => ({
      mark: c.mark,
      registration: c.registration_number,
      classes: c.classes.map(cl => cl.class_number),
      similarity: calculateMarkSimilarity(proposedMark, c.mark)
    })),
    recommendations: [
      "Consult with trademark attorney",
      "Consider alternative mark options",
      "Evaluate coexistence possibilities",
      "Review different classes or jurisdictions"
    ]
  };
};

const calculateMarkSimilarity = (mark1: string, mark2: string): number => {
  // Simple similarity calculation - in practice would use sophisticated algorithms
  const clean1 = mark1.toLowerCase().replace(/[™®©]/g, '').trim();
  const clean2 = mark2.toLowerCase().replace(/[™®©]/g, '').trim();
  
  if (clean1 === clean2) return 1.0;
  if (clean1.includes(clean2) || clean2.includes(clean1)) return 0.8;
  
  // Simple Levenshtein distance calculation
  const distance = levenshteinDistance(clean1, clean2);
  const maxLength = Math.max(clean1.length, clean2.length);
  return 1 - (distance / maxLength);
};

const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  
  return matrix[str2.length][str1.length];
};

export default {
  MADRID_PROTOCOL_COUNTRIES,
  TRADEMARK_CLASSES,
  CORE_TRADEMARK_PORTFOLIO,
  PENDING_TRADEMARK_APPLICATIONS,
  calculateTrademarkValue,
  generateTrademarkReport,
  checkTrademarkConflict
};