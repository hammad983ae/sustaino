import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Missing Fields analysis function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reportData, reportSections } = await req.json();
    console.log('Analyzing report for missing fields:', { reportData, reportSections });
    
    // Analyze each section for completeness
    const sectionAnalysis = reportSections.map((section: any, index: number) => {
      const sectionData = reportData[section.key] || {};
      const missingFields = [];
      const extractedFields = [];
      
      // Define expected fields per section type
      const expectedFields = getExpectedFieldsForSection(section.key, section.title);
      
      // Check which fields are missing or incomplete
      expectedFields.forEach(field => {
        const value = sectionData[field.key];
        const isEmpty = !value || (typeof value === 'string' && value.trim() === '') || 
                       (Array.isArray(value) && value.length === 0);
        
        if (isEmpty) {
          missingFields.push({
            key: field.key,
            label: field.label,
            type: field.type,
            required: field.required,
            suggestion: field.suggestion
          });
        } else {
          extractedFields.push({
            key: field.key,
            label: field.label,
            value: value
          });
        }
      });
      
      const completionRate = expectedFields.length > 0 
        ? Math.round((extractedFields.length / expectedFields.length) * 100)
        : 100;
      
      return {
        sectionIndex: index,
        sectionKey: section.key,
        sectionTitle: section.title,
        completionRate,
        totalFields: expectedFields.length,
        completedFieldsCount: extractedFields.length,
        missingFieldsCount: missingFields.length,
        missingFields,
        extractedFields,
        isIncluded: true, // Default to included
        priority: missingFields.filter(f => f.required).length > 0 ? 'high' : 'medium'
      };
    });
    
    // Calculate overall report completion
    const overallCompletion = sectionAnalysis.length > 0
      ? Math.round(sectionAnalysis.reduce((sum, section) => sum + section.completionRate, 0) / sectionAnalysis.length)
      : 0;
    
    console.log('Missing fields analysis completed');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: {
          overallCompletion,
          totalSections: sectionAnalysis.length,
          sectionsWithMissingFields: sectionAnalysis.filter(s => s.missingFieldsCount > 0).length,
          sectionAnalysis,
          recommendations: generateRecommendations(sectionAnalysis),
          timestamp: new Date().toISOString()
        },
        message: 'Missing fields analysis completed successfully'
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in missing-fields function:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Failed to analyze missing fields',
        message: error.message
      }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function getExpectedFieldsForSection(sectionKey: string, sectionTitle: string) {
  // Define expected fields for each section type
  const fieldMappings: { [key: string]: any[] } = {
    propertyDetails: [
      { key: 'address', label: 'Property Address', type: 'text', required: true, suggestion: 'Enter the full property address' },
      { key: 'propertyType', label: 'Property Type', type: 'select', required: true, suggestion: 'Select property type (Residential/Commercial/etc.)' },
      { key: 'landArea', label: 'Land Area', type: 'number', required: false, suggestion: 'Enter land area in square meters' },
      { key: 'buildingArea', label: 'Building Area', type: 'number', required: false, suggestion: 'Enter building area in square meters' }
    ],
    legalAndPlanning: [
      { key: 'lga', label: 'Local Government Area', type: 'text', required: true, suggestion: 'Enter the LGA name' },
      { key: 'zoning', label: 'Zoning', type: 'text', required: true, suggestion: 'Enter the zoning classification' },
      { key: 'currentUse', label: 'Current Use', type: 'text', required: false, suggestion: 'Describe current property use' },
      { key: 'permissibleUse', label: 'Permissible Use', type: 'text', required: false, suggestion: 'List permitted uses under current zoning' },
      { key: 'overlays', label: 'Planning Overlays', type: 'text', required: false, suggestion: 'List any planning overlays that apply' }
    ],
    salesEvidence: [
      { key: 'salePrice', label: 'Sale Price', type: 'number', required: true, suggestion: 'Enter the sale price' },
      { key: 'saleDate', label: 'Sale Date', type: 'date', required: true, suggestion: 'Enter the settlement date' },
      { key: 'propertyAddress', label: 'Comparable Property Address', type: 'text', required: true, suggestion: 'Enter comparable property address' }
    ],
    leasingEvidence: [
      { key: 'rentAmount', label: 'Rental Amount', type: 'number', required: true, suggestion: 'Enter weekly/monthly rent' },
      { key: 'leaseStartDate', label: 'Lease Start Date', type: 'date', required: true, suggestion: 'Enter lease commencement date' },
      { key: 'leaseDuration', label: 'Lease Duration', type: 'number', required: false, suggestion: 'Enter lease term in months' }
    ],
    marketCommentary: [
      { key: 'marketTrends', label: 'Market Trends', type: 'textarea', required: false, suggestion: 'Describe current market conditions and trends' },
      { key: 'priceMovements', label: 'Price Movements', type: 'textarea', required: false, suggestion: 'Analyze recent price movements in the area' }
    ],
    valuationAnalysis: [
      { key: 'valuationMethod', label: 'Valuation Method', type: 'select', required: true, suggestion: 'Select primary valuation approach' },
      { key: 'estimatedValue', label: 'Estimated Value', type: 'number', required: true, suggestion: 'Enter the final estimated value' },
      { key: 'confidenceLevel', label: 'Confidence Level', type: 'select', required: false, suggestion: 'Rate confidence in the valuation' }
    ]
  };
  
  return fieldMappings[sectionKey] || [
    { key: 'content', label: 'Section Content', type: 'textarea', required: false, suggestion: 'Add relevant content for this section' }
  ];
}

function generateRecommendations(sectionAnalysis: any[]) {
  const recommendations = [];
  
  // High priority recommendations
  const incompleteSections = sectionAnalysis.filter(s => s.completionRate < 50);
  if (incompleteSections.length > 0) {
    recommendations.push({
      type: 'urgent',
      title: 'Complete Critical Sections',
      description: `${incompleteSections.length} sections need immediate attention with less than 50% completion.`,
      sections: incompleteSections.map(s => s.sectionTitle)
    });
  }
  
  // Required fields missing
  const sectionsWithRequiredFields = sectionAnalysis.filter(s => 
    s.missingFields.some((f: any) => f.required)
  );
  if (sectionsWithRequiredFields.length > 0) {
    recommendations.push({
      type: 'required',
      title: 'Missing Required Fields',
      description: 'Some sections are missing required information that must be completed.',
      sections: sectionsWithRequiredFields.map(s => s.sectionTitle)
    });
  }
  
  // Quality improvement suggestions
  const lowQualitySections = sectionAnalysis.filter(s => s.completionRate >= 50 && s.completionRate < 80);
  if (lowQualitySections.length > 0) {
    recommendations.push({
      type: 'improvement',
      title: 'Quality Enhancement Opportunities',
      description: 'These sections could benefit from additional information to improve report quality.',
      sections: lowQualitySections.map(s => s.sectionTitle)
    });
  }
  
  return recommendations;
}