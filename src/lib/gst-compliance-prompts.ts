export interface GSTPromptConfig {
  propertyType: string;
  transactionType: string;
  conditions: string[];
  gstStatus: 'applicable' | 'not-applicable' | 'conditional';
  prompts: {
    include: string[];
    exclude: string[];
    conditional: string[];
  };
  complianceChecks: string[];
  documentation: string[];
}

export const GST_COMPLIANCE_PROMPTS: GSTPromptConfig[] = [
  // Residential Property
  {
    propertyType: 'residential',
    transactionType: 'new_sale',
    conditions: ['New residential property', 'Supplier GST registered'],
    gstStatus: 'applicable',
    prompts: {
      include: [
        'Include GST at 10% on the sale price',
        'GST withholding may apply at settlement',
        'Supplier liable for GST on taxable supply'
      ],
      exclude: [],
      conditional: [
        'IF margin scheme eligible: Consider margin scheme application',
        'IF contract price > $750k: GST withholding mandatory'
      ]
    },
    complianceChecks: [
      'Verify supplier GST registration status',
      'Check if margin scheme agreement exists',
      'Confirm settlement GST withholding requirements'
    ],
    documentation: [
      'Valid tax invoice required',
      'Contract must specify GST treatment',
      'Settlement statement showing GST breakdown'
    ]
  },
  {
    propertyType: 'residential',
    transactionType: 'existing_sale',
    conditions: ['Existing residential property'],
    gstStatus: 'not-applicable',
    prompts: {
      include: [],
      exclude: [
        'No GST applies to existing residential property sales',
        'Input taxed supply - no GST liability',
        'No GST credits available for related expenses'
      ],
      conditional: []
    },
    complianceChecks: [
      'Confirm property is existing (not new)',
      'Verify not sold as part of enterprise'
    ],
    documentation: [
      'Contract confirms GST-free status',
      'No tax invoice required'
    ]
  },
  {
    propertyType: 'residential',
    transactionType: 'rental',
    conditions: ['Residential rental property'],
    gstStatus: 'not-applicable',
    prompts: {
      include: [],
      exclude: [
        'Residential rent is input taxed - no GST',
        'Cannot claim GST credits on rental expenses',
        'No GST registration required for residential rent only'
      ],
      conditional: [
        'IF commercial accommodation: GST may apply to accommodation services',
        'IF short-term accommodation with services: Review GST treatment'
      ]
    },
    complianceChecks: [
      'Confirm purely residential use',
      'Check if additional services provided'
    ],
    documentation: [
      'Lease agreement',
      'Record of rental income'
    ]
  },
  // Commercial Property
  {
    propertyType: 'commercial',
    transactionType: 'sale',
    conditions: ['Commercial property sale', 'Supplier GST registered'],
    gstStatus: 'applicable',
    prompts: {
      include: [
        'Include GST at 10% on commercial property sale',
        'Taxable supply subject to GST',
        'GST credits available for related expenses'
      ],
      exclude: [],
      conditional: [
        'IF going concern sale: May be GST-free if all criteria met',
        'IF margin scheme applicable: GST on margin only'
      ]
    },
    complianceChecks: [
      'Verify supplier GST registration',
      'Check going concern criteria if applicable',
      'Confirm margin scheme eligibility'
    ],
    documentation: [
      'Tax invoice required',
      'Going concern certificate if applicable',
      'Margin scheme agreement if used'
    ]
  },
  {
    propertyType: 'commercial',
    transactionType: 'lease',
    conditions: ['Commercial property lease'],
    gstStatus: 'applicable',
    prompts: {
      include: [
        'Commercial rent subject to GST at 10%',
        'Landlord must be GST registered if over threshold',
        'Tenant can claim GST credits if GST registered'
      ],
      exclude: [],
      conditional: [
        'IF lease < $75k annually AND landlord not registered: No GST applies'
      ]
    },
    complianceChecks: [
      'Check landlord GST registration status',
      'Verify lease terms and amounts'
    ],
    documentation: [
      'Lease agreement specifying GST treatment',
      'Tax invoices for rental payments'
    ]
  },
  // Development Property
  {
    propertyType: 'development',
    transactionType: 'site_development',
    conditions: ['Development activity', 'Conducted as enterprise'],
    gstStatus: 'applicable',
    prompts: {
      include: [
        'Development activities subject to GST',
        'GST registration mandatory for development enterprise',
        'GST on all development sales and services'
      ],
      exclude: [],
      conditional: [
        'IF margin scheme eligible: Apply to reduce GST on land component',
        'IF change in use occurs: GST adjustment may be required'
      ]
    },
    complianceChecks: [
      'Confirm enterprise activity status',
      'Verify GST registration requirement',
      'Check creditable purpose of acquisitions'
    ],
    documentation: [
      'Development contracts showing GST',
      'Evidence of enterprise activity',
      'Records of all acquisitions and sales'
    ]
  },
  // Agricultural Property
  {
    propertyType: 'agricultural',
    transactionType: 'farmland_sale',
    conditions: ['Farmland sale'],
    gstStatus: 'conditional',
    prompts: {
      include: [],
      exclude: [],
      conditional: [
        'IF going concern farmland: GST-free supply',
        'IF not going concern: GST applies if supplier registered',
        'IF margin scheme used: GST on margin only'
      ]
    },
    complianceChecks: [
      'Determine if farmland going concern criteria met',
      'Check supplier GST registration status',
      'Verify margin scheme eligibility'
    ],
    documentation: [
      'Farmland going concern certificate if applicable',
      'Evidence of farming enterprise',
      'Margin scheme documentation'
    ]
  },
  // Change in Use Scenarios
  {
    propertyType: 'any',
    transactionType: 'change_in_use',
    conditions: ['Change in creditable purpose'],
    gstStatus: 'conditional',
    prompts: {
      include: [],
      exclude: [],
      conditional: [
        'IF original GST credits claimed: Increasing adjustment may apply',
        'IF use becomes more creditable: Decreasing adjustment possible',
        'Calculate adjustment based on remaining adjustment periods'
      ]
    },
    complianceChecks: [
      'Document original intended use',
      'Record actual use change',
      'Calculate remaining adjustment periods'
    ],
    documentation: [
      'Evidence of original intention',
      'Records of actual use',
      'Calculation of adjustment amounts'
    ]
  }
];

export const getGSTPrompts = (
  propertyType: string,
  transactionType: string,
  isNewProperty: boolean,
  supplierGSTRegistered: boolean,
  isGoingConcern: boolean = false,
  marginSchemeEligible: boolean = false
): GSTPromptConfig | null => {
  // Determine specific transaction type
  let specificTransactionType = transactionType;
  
  if (propertyType === 'residential' && transactionType === 'sale') {
    specificTransactionType = isNewProperty ? 'new_sale' : 'existing_sale';
  } else if (propertyType === 'agricultural' && transactionType === 'sale') {
    specificTransactionType = 'farmland_sale';
  } else if (propertyType === 'development') {
    specificTransactionType = 'site_development';
  }

  // Find matching configuration
  const config = GST_COMPLIANCE_PROMPTS.find(
    prompt => 
      (prompt.propertyType === propertyType || prompt.propertyType === 'any') &&
      prompt.transactionType === specificTransactionType
  );

  if (!config) return null;

  // Process conditional prompts
  const processedConfig = { ...config };
  const activePrompts = [...config.prompts.include];
  const excludePrompts = [...config.prompts.exclude];

  config.prompts.conditional.forEach(conditional => {
    if (conditional.includes('IF margin scheme') && marginSchemeEligible) {
      activePrompts.push(conditional.replace('IF margin scheme eligible: ', ''));
    }
    if (conditional.includes('IF going concern') && isGoingConcern) {
      activePrompts.push(conditional.replace('IF going concern sale: ', ''));
    }
    if (conditional.includes('IF contract price > $750k')) {
      // This would need property value to evaluate
      activePrompts.push(conditional);
    }
  });

  processedConfig.prompts.include = activePrompts;
  processedConfig.prompts.exclude = excludePrompts;

  return processedConfig;
};

export const generateGSTComplianceReport = (
  propertyType: string,
  transactionType: string,
  propertyValue: number,
  additionalContext: Record<string, any> = {}
): {
  gstStatus: string;
  gstAmount: number;
  complianceActions: string[];
  warnings: string[];
  recommendations: string[];
} => {
  const prompts = getGSTPrompts(
    propertyType,
    transactionType,
    additionalContext.isNewProperty || false,
    additionalContext.supplierGSTRegistered || false,
    additionalContext.isGoingConcern || false,
    additionalContext.marginSchemeEligible || false
  );

  if (!prompts) {
    return {
      gstStatus: 'requires-assessment',
      gstAmount: 0,
      complianceActions: ['Seek professional GST advice for this transaction type'],
      warnings: ['GST treatment unclear - professional assessment required'],
      recommendations: ['Consult ATO or tax professional before proceeding']
    };
  }

  let gstAmount = 0;
  if (prompts.gstStatus === 'applicable') {
    gstAmount = propertyValue * 0.1; // 10% GST
    if (additionalContext.marginSchemeEligible && additionalContext.marginAmount) {
      gstAmount = additionalContext.marginAmount * 0.1;
    }
  }

  return {
    gstStatus: prompts.gstStatus,
    gstAmount,
    complianceActions: prompts.complianceChecks,
    warnings: prompts.prompts.exclude,
    recommendations: prompts.prompts.include
  };
};

export default GST_COMPLIANCE_PROMPTS;