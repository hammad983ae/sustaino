/*
 * Occupation Database™ - Comprehensive Employment Risk Assessment
 * © 2024 Powered™. All Rights Reserved.
 * Patent Pending - Advanced Employment Analytics System™
 */

export interface OccupationData {
  id: string;
  title: string;
  category: string;
  avgSalary: {
    entry: number;
    mid: number;
    senior: number;
    executive: number;
  };
  stabilityScore: number; // 1-10 (10 = very stable)
  threatLevel: number; // 1-10 (10 = high threat)
  growthProjection: number; // % growth over 5 years
  automationRisk: number; // 1-10 (10 = high risk)
  requiredEducation: string;
  skillsRequired: string[];
  industryTrends: {
    current: string;
    future: string;
    disruptors: string[];
  };
  careerAlternatives: {
    similar: string[];
    advancement: string[];
    pivot: string[];
  };
  jobSecurity: {
    economicRecessionImpact: number; // 1-10 (10 = highly impacted)
    demandTrend: 'increasing' | 'stable' | 'declining';
    replacementDifficulty: number; // 1-10 (10 = very difficult to replace)
    marketSaturation: number; // 1-10 (10 = oversaturated)
  };
  financialMetrics: {
    defaultIncome: number;
    incomeVariability: number; // 1-10 (10 = highly variable)
    bonusPotential: number; // % of base salary
    benefitsValue: number; // $ value of typical benefits
  };
}

export const occupationDatabase: OccupationData[] = [
  // FINANCIAL SERVICES
  {
    id: 'mortgage-broker',
    title: 'Mortgage Broker',
    category: 'Financial Services',
    avgSalary: { entry: 55000, mid: 85000, senior: 120000, executive: 180000 },
    stabilityScore: 7,
    threatLevel: 4,
    growthProjection: 8.5,
    automationRisk: 3,
    requiredEducation: 'Certificate IV in Finance and Mortgage Broking',
    skillsRequired: ['Financial Analysis', 'Customer Service', 'Regulatory Knowledge', 'Negotiation', 'Risk Assessment'],
    industryTrends: {
      current: 'Digital transformation and regulatory tightening',
      future: 'AI-assisted underwriting, embedded finance',
      disruptors: ['Fintech platforms', 'Direct bank lending', 'AI underwriting']
    },
    careerAlternatives: {
      similar: ['Financial Advisor', 'Bank Lending Manager', 'Insurance Broker'],
      advancement: ['Finance Director', 'Lending Executive', 'Financial Services CEO'],
      pivot: ['Real Estate Agent', 'Investment Advisor', 'Business Consultant']
    },
    jobSecurity: {
      economicRecessionImpact: 7,
      demandTrend: 'increasing',
      replacementDifficulty: 6,
      marketSaturation: 5
    },
    financialMetrics: {
      defaultIncome: 85000,
      incomeVariability: 7,
      bonusPotential: 45,
      benefitsValue: 12000
    }
  },
  {
    id: 'financial-advisor',
    title: 'Financial Advisor',
    category: 'Financial Services',
    avgSalary: { entry: 60000, mid: 95000, senior: 150000, executive: 250000 },
    stabilityScore: 6,
    threatLevel: 5,
    growthProjection: 12.5,
    automationRisk: 4,
    requiredEducation: 'Bachelor in Finance/Economics + CFP certification',
    skillsRequired: ['Investment Knowledge', 'Client Relations', 'Portfolio Management', 'Risk Analysis', 'Communication'],
    industryTrends: {
      current: 'Fee-based advisory services, robo-advisor integration',
      future: 'Hybrid human-AI advisory, ESG investing focus',
      disruptors: ['Robo-advisors', 'Direct investment platforms', 'AI portfolio management']
    },
    careerAlternatives: {
      similar: ['Investment Manager', 'Wealth Manager', 'Insurance Advisor'],
      advancement: ['Portfolio Manager', 'Investment Director', 'Wealth Management Executive'],
      pivot: ['Corporate Finance', 'Risk Management', 'Financial Planning']
    },
    jobSecurity: {
      economicRecessionImpact: 6,
      demandTrend: 'increasing',
      replacementDifficulty: 7,
      marketSaturation: 4
    },
    financialMetrics: {
      defaultIncome: 95000,
      incomeVariability: 8,
      bonusPotential: 55,
      benefitsValue: 15000
    }
  },
  {
    id: 'bank-manager',
    title: 'Bank Manager',
    category: 'Financial Services',
    avgSalary: { entry: 75000, mid: 110000, senior: 160000, executive: 280000 },
    stabilityScore: 8,
    threatLevel: 3,
    growthProjection: 3.2,
    automationRisk: 2,
    requiredEducation: 'Bachelor in Business/Finance + Banking qualifications',
    skillsRequired: ['Leadership', 'Risk Management', 'Customer Relations', 'Banking Operations', 'Compliance'],
    industryTrends: {
      current: 'Digital banking transformation, branch consolidation',
      future: 'Open banking, cryptocurrency integration, AI customer service',
      disruptors: ['Digital banks', 'Cryptocurrency platforms', 'Fintech solutions']
    },
    careerAlternatives: {
      similar: ['Credit Union Manager', 'Investment Manager', 'Corporate Banking'],
      advancement: ['Regional Director', 'Chief Risk Officer', 'Bank Executive'],
      pivot: ['Financial Services Consulting', 'Fintech Leadership', 'Corporate Finance']
    },
    jobSecurity: {
      economicRecessionImpact: 5,
      demandTrend: 'stable',
      replacementDifficulty: 8,
      marketSaturation: 6
    },
    financialMetrics: {
      defaultIncome: 110000,
      incomeVariability: 4,
      bonusPotential: 25,
      benefitsValue: 18000
    }
  },

  // REAL ESTATE
  {
    id: 'real-estate-agent',
    title: 'Real Estate Agent',
    category: 'Real Estate',
    avgSalary: { entry: 45000, mid: 75000, senior: 120000, executive: 200000 },
    stabilityScore: 5,
    threatLevel: 6,
    growthProjection: 6.8,
    automationRisk: 5,
    requiredEducation: 'Real Estate License + CPD requirements',
    skillsRequired: ['Sales', 'Market Analysis', 'Negotiation', 'Customer Service', 'Marketing'],
    industryTrends: {
      current: 'PropTech adoption, virtual tours, digital marketing',
      future: 'AI-powered property matching, blockchain transactions, VR/AR viewing',
      disruptors: ['Online real estate platforms', 'iBuyers', 'AI property valuation']
    },
    careerAlternatives: {
      similar: ['Property Manager', 'Mortgage Broker', 'Property Developer'],
      advancement: ['Real Estate Principal', 'Property Investment Manager', 'Real Estate Executive'],
      pivot: ['Sales Manager', 'Business Development', 'Marketing Manager']
    },
    jobSecurity: {
      economicRecessionImpact: 8,
      demandTrend: 'stable',
      replacementDifficulty: 4,
      marketSaturation: 7
    },
    financialMetrics: {
      defaultIncome: 75000,
      incomeVariability: 9,
      bonusPotential: 80,
      benefitsValue: 8000
    }
  },
  {
    id: 'property-valuer',
    title: 'Property Valuer',
    category: 'Real Estate',
    avgSalary: { entry: 65000, mid: 95000, senior: 130000, executive: 180000 },
    stabilityScore: 7,
    threatLevel: 4,
    growthProjection: 5.5,
    automationRisk: 6,
    requiredEducation: 'Bachelor in Property/Valuation + API certification',
    skillsRequired: ['Property Analysis', 'Market Research', 'Report Writing', 'Regulatory Knowledge', 'Technology'],
    industryTrends: {
      current: 'Automated valuation models, data analytics integration',
      future: 'AI-enhanced valuations, IoT property data, predictive analytics',
      disruptors: ['AVM platforms', 'Big data analytics', 'Machine learning models']
    },
    careerAlternatives: {
      similar: ['Property Analyst', 'Real Estate Consultant', 'Asset Manager'],
      advancement: ['Valuation Director', 'Property Fund Manager', 'Real Estate Executive'],
      pivot: ['Property Development', 'Investment Analysis', 'Risk Assessment']
    },
    jobSecurity: {
      economicRecessionImpact: 6,
      demandTrend: 'stable',
      replacementDifficulty: 7,
      marketSaturation: 5
    },
    financialMetrics: {
      defaultIncome: 95000,
      incomeVariability: 5,
      bonusPotential: 20,
      benefitsValue: 14000
    }
  },

  // TECHNOLOGY
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Technology',
    avgSalary: { entry: 75000, mid: 110000, senior: 150000, executive: 250000 },
    stabilityScore: 9,
    threatLevel: 2,
    growthProjection: 22.8,
    automationRisk: 3,
    requiredEducation: 'Bachelor in Computer Science/Engineering',
    skillsRequired: ['Programming', 'Problem Solving', 'System Design', 'Testing', 'Collaboration'],
    industryTrends: {
      current: 'Cloud computing, AI/ML integration, DevOps practices',
      future: 'Quantum computing, edge computing, sustainable tech',
      disruptors: ['AI code generation', 'Low-code platforms', 'Quantum computing']
    },
    careerAlternatives: {
      similar: ['Data Scientist', 'DevOps Engineer', 'Product Manager'],
      advancement: ['Senior Architect', 'Engineering Director', 'CTO'],
      pivot: ['Technical Consulting', 'Product Management', 'Startup Founder']
    },
    jobSecurity: {
      economicRecessionImpact: 3,
      demandTrend: 'increasing',
      replacementDifficulty: 9,
      marketSaturation: 3
    },
    financialMetrics: {
      defaultIncome: 110000,
      incomeVariability: 6,
      bonusPotential: 30,
      benefitsValue: 20000
    }
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Technology',
    avgSalary: { entry: 85000, mid: 125000, senior: 170000, executive: 280000 },
    stabilityScore: 9,
    threatLevel: 2,
    growthProjection: 31.4,
    automationRisk: 3,
    requiredEducation: 'Master in Data Science/Statistics/Computer Science',
    skillsRequired: ['Machine Learning', 'Statistics', 'Programming', 'Data Visualization', 'Business Acumen'],
    industryTrends: {
      current: 'MLOps, explainable AI, real-time analytics',
      future: 'AutoML, quantum ML, neuromorphic computing',
      disruptors: ['AutoML platforms', 'Citizen data scientists', 'AI democratization']
    },
    careerAlternatives: {
      similar: ['ML Engineer', 'Research Scientist', 'Analytics Manager'],
      advancement: ['Chief Data Officer', 'AI Director', 'VP of Analytics'],
      pivot: ['Product Management', 'Strategy Consulting', 'Academic Research']
    },
    jobSecurity: {
      economicRecessionImpact: 3,
      demandTrend: 'increasing',
      replacementDifficulty: 9,
      marketSaturation: 2
    },
    financialMetrics: {
      defaultIncome: 125000,
      incomeVariability: 7,
      bonusPotential: 40,
      benefitsValue: 22000
    }
  },

  // HEALTHCARE
  {
    id: 'registered-nurse',
    title: 'Registered Nurse',
    category: 'Healthcare',
    avgSalary: { entry: 65000, mid: 80000, senior: 100000, executive: 130000 },
    stabilityScore: 9,
    threatLevel: 1,
    growthProjection: 9.2,
    automationRisk: 2,
    requiredEducation: 'Bachelor of Nursing + AHPRA registration',
    skillsRequired: ['Patient Care', 'Medical Knowledge', 'Communication', 'Critical Thinking', 'Technology'],
    industryTrends: {
      current: 'Telehealth, electronic health records, aging population',
      future: 'AI-assisted diagnosis, robotic surgery support, personalized medicine',
      disruptors: ['Telemedicine platforms', 'AI diagnostics', 'Remote monitoring']
    },
    careerAlternatives: {
      similar: ['Nurse Practitioner', 'Clinical Specialist', 'Health Educator'],
      advancement: ['Nurse Manager', 'Director of Nursing', 'Healthcare Executive'],
      pivot: ['Healthcare Consulting', 'Medical Sales', 'Health Technology']
    },
    jobSecurity: {
      economicRecessionImpact: 2,
      demandTrend: 'increasing',
      replacementDifficulty: 9,
      marketSaturation: 2
    },
    financialMetrics: {
      defaultIncome: 80000,
      incomeVariability: 3,
      bonusPotential: 10,
      benefitsValue: 16000
    }
  },

  // EDUCATION
  {
    id: 'teacher',
    title: 'Teacher',
    category: 'Education',
    avgSalary: { entry: 65000, mid: 80000, senior: 105000, executive: 130000 },
    stabilityScore: 8,
    threatLevel: 3,
    growthProjection: 4.1,
    automationRisk: 4,
    requiredEducation: 'Bachelor in Education + Teaching qualification',
    skillsRequired: ['Teaching', 'Curriculum Development', 'Classroom Management', 'Communication', 'Technology'],
    industryTrends: {
      current: 'Online learning, digital tools, personalized learning',
      future: 'AI tutoring, VR classrooms, adaptive learning systems',
      disruptors: ['Online education platforms', 'AI tutors', 'Microlearning apps']
    },
    careerAlternatives: {
      similar: ['Education Coordinator', 'Curriculum Designer', 'Training Manager'],
      advancement: ['Principal', 'Education Director', 'Superintendent'],
      pivot: ['Corporate Training', 'Instructional Design', 'Educational Technology']
    },
    jobSecurity: {
      economicRecessionImpact: 4,
      demandTrend: 'stable',
      replacementDifficulty: 7,
      marketSaturation: 6
    },
    financialMetrics: {
      defaultIncome: 80000,
      incomeVariability: 2,
      bonusPotential: 5,
      benefitsValue: 18000
    }
  },

  // TRADES
  {
    id: 'electrician',
    title: 'Electrician',
    category: 'Trades',
    avgSalary: { entry: 55000, mid: 75000, senior: 95000, executive: 120000 },
    stabilityScore: 8,
    threatLevel: 2,
    growthProjection: 8.4,
    automationRisk: 3,
    requiredEducation: 'Certificate III in Electrotechnology Electrician',
    skillsRequired: ['Electrical Systems', 'Problem Solving', 'Safety Protocols', 'Technical Reading', 'Customer Service'],
    industryTrends: {
      current: 'Solar installation, smart home technology, renewable energy',
      future: 'EV charging infrastructure, smart grids, IoT integration',
      disruptors: ['Modular electrical systems', 'AI diagnostics', 'Remote monitoring']
    },
    careerAlternatives: {
      similar: ['Electrical Technician', 'Maintenance Electrician', 'Industrial Electrician'],
      advancement: ['Electrical Contractor', 'Project Manager', 'Electrical Engineer'],
      pivot: ['Renewable Energy Specialist', 'Building Inspector', 'Technical Sales']
    },
    jobSecurity: {
      economicRecessionImpact: 5,
      demandTrend: 'increasing',
      replacementDifficulty: 8,
      marketSaturation: 4
    },
    financialMetrics: {
      defaultIncome: 75000,
      incomeVariability: 6,
      bonusPotential: 15,
      benefitsValue: 12000
    }
  },

  // RETAIL
  {
    id: 'retail-manager',
    title: 'Retail Manager',
    category: 'Retail',
    avgSalary: { entry: 50000, mid: 65000, senior: 85000, executive: 120000 },
    stabilityScore: 5,
    threatLevel: 7,
    growthProjection: 1.3,
    automationRisk: 6,
    requiredEducation: 'Certificate IV in Retail Management or Bachelor in Business',
    skillsRequired: ['Team Leadership', 'Customer Service', 'Inventory Management', 'Sales', 'Problem Solving'],
    industryTrends: {
      current: 'Omnichannel retail, digital integration, sustainability focus',
      future: 'Autonomous stores, AR shopping, personalized experiences',
      disruptors: ['E-commerce platforms', 'Automated checkout', 'Direct-to-consumer brands']
    },
    careerAlternatives: {
      similar: ['Store Manager', 'Sales Manager', 'Operations Manager'],
      advancement: ['Regional Manager', 'Retail Director', 'VP of Operations'],
      pivot: ['E-commerce Manager', 'Supply Chain', 'Customer Experience']
    },
    jobSecurity: {
      economicRecessionImpact: 8,
      demandTrend: 'declining',
      replacementDifficulty: 5,
      marketSaturation: 8
    },
    financialMetrics: {
      defaultIncome: 65000,
      incomeVariability: 7,
      bonusPotential: 20,
      benefitsValue: 10000
    }
  },

  // HOSPITALITY
  {
    id: 'hotel-manager',
    title: 'Hotel Manager',
    category: 'Hospitality',
    avgSalary: { entry: 55000, mid: 75000, senior: 110000, executive: 160000 },
    stabilityScore: 6,
    threatLevel: 5,
    growthProjection: 6.1,
    automationRisk: 4,
    requiredEducation: 'Bachelor in Hospitality Management',
    skillsRequired: ['Leadership', 'Customer Service', 'Operations Management', 'Financial Management', 'Problem Solving'],
    industryTrends: {
      current: 'Contactless services, sustainability initiatives, experience personalization',
      future: 'AI concierge services, smart rooms, predictive maintenance',
      disruptors: ['Sharing economy platforms', 'Automation technologies', 'Virtual experiences']
    },
    careerAlternatives: {
      similar: ['Restaurant Manager', 'Event Manager', 'Resort Manager'],
      advancement: ['Regional Director', 'VP of Operations', 'Hospitality Executive'],
      pivot: ['Property Management', 'Customer Experience', 'Business Operations']
    },
    jobSecurity: {
      economicRecessionImpact: 7,
      demandTrend: 'stable',
      replacementDifficulty: 6,
      marketSaturation: 5
    },
    financialMetrics: {
      defaultIncome: 75000,
      incomeVariability: 8,
      bonusPotential: 25,
      benefitsValue: 12000
    }
  }
];

export const getOccupationByCategory = (category: string): OccupationData[] => {
  return occupationDatabase.filter(occupation => occupation.category === category);
};

export const getOccupationById = (id: string): OccupationData | undefined => {
  return occupationDatabase.find(occupation => occupation.id === id);
};

export const getOccupationCategories = (): string[] => {
  return [...new Set(occupationDatabase.map(occupation => occupation.category))];
};

export const calculateEmploymentRisk = (occupation: OccupationData): {
  overallRisk: number;
  riskFactors: string[];
  recommendations: string[];
} => {
  const riskFactors: string[] = [];
  const recommendations: string[] = [];
  
  let riskScore = 0;
  
  // Stability assessment
  if (occupation.stabilityScore < 5) {
    riskScore += 2;
    riskFactors.push('Low job stability');
    recommendations.push('Consider skill diversification');
  }
  
  // Automation risk
  if (occupation.automationRisk > 6) {
    riskScore += 3;
    riskFactors.push('High automation risk');
    recommendations.push('Develop AI-complementary skills');
  }
  
  // Market saturation
  if (occupation.jobSecurity.marketSaturation > 7) {
    riskScore += 2;
    riskFactors.push('Market oversaturation');
    recommendations.push('Consider specialization or pivot');
  }
  
  // Economic sensitivity
  if (occupation.jobSecurity.economicRecessionImpact > 7) {
    riskScore += 2;
    riskFactors.push('High recession sensitivity');
    recommendations.push('Build diverse income streams');
  }
  
  // Growth projection
  if (occupation.growthProjection < 0) {
    riskScore += 3;
    riskFactors.push('Declining industry growth');
    recommendations.push('Plan career transition');
  }
  
  return {
    overallRisk: Math.min(10, riskScore),
    riskFactors,
    recommendations
  };
};