import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VicPlanRequest {
  address: string;
  propertyType: string;
  analysisType?: 'basic' | 'comprehensive';
}

interface VicPlanResponse {
  zoning: {
    zone: string;
    description: string;
    permittedUses: string[];
    restrictions: string[];
  };
  overlays: Array<{
    type: string;
    description: string;
    requirements: string[];
  }>;
  planningData: {
    municipalityName: string;
    planningScheme: string;
    lastUpdated: string;
  };
  developmentPotential: {
    maxHeight: string;
    plotRatio: string;
    setbacks: Record<string, string>;
  };
  constraints: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address, propertyType, analysisType = 'comprehensive' }: VicPlanRequest = await req.json();

    console.log('VicPlan Integration request:', { address, propertyType, analysisType });

    // Note: This is a mock implementation. In production, you would integrate with actual VicPlan API
    // For now, providing realistic data based on Victorian planning schemes
    
    let vicPlanData: VicPlanResponse;

    // Mock data based on address - in production, this would be real API calls
    if (address.toLowerCase().includes('mildura')) {
      vicPlanData = {
        zoning: {
          zone: "Commercial 1 Zone (C1Z)",
          description: "To implement the Municipal Planning Strategy and the Planning Policy Framework. To create vibrant mixed use commercial centres for retail, office, business, entertainment and community uses. To provide for residential uses at densities complementary to the role and scale of the commercial centre.",
          permittedUses: [
            "Accommodation (other than Corrective institution)",
            "Adult education centre",
            "Amusement parlour",
            "Art and craft centre",
            "Cinema based entertainment facility",
            "Commercial accommodation",
            "Community care accommodation",
            "Convenience restaurant",
            "Convenience shop",
            "Display home",
            "Dwelling (other than Caretaker's house)",
            "Exhibition centre",
            "Food and drink premises",
            "Function centre",
            "Funeral parlour",
            "Gaming machine venue",
            "Hotel",
            "Market",
            "Medical centre",
            "Office",
            "Place of assembly",
            "Railway",
            "Restricted place of assembly",
            "Retail premises",
            "Shop",
            "Tavern",
            "Trade supplies",
            "Tramway"
          ],
          restrictions: [
            "Must not adversely affect the amenity of the neighbourhood",
            "Buildings and works must be designed to minimise overlooking",
            "Car parking must be provided in accordance with Clause 52.06"
          ]
        },
        overlays: [
          {
            type: "Heritage Overlay (HO)",
            description: "To conserve and enhance heritage places of natural or cultural significance",
            requirements: [
              "Planning permit required for most buildings and works",
              "Conservation management plan may be required",
              "Heritage impact assessment required for significant alterations"
            ]
          },
          {
            type: "Design and Development Overlay (DDO)",
            description: "To identify areas which are affected by specific requirements relating to the design and built form of new development",
            requirements: [
              "Buildings must not exceed 12 metres in height",
              "Minimum setbacks: Front 3m, Side 1.5m, Rear 6m",
              "Landscaping requirements apply to front setback"
            ]
          }
        ],
        planningData: {
          municipalityName: "Mildura Rural City Council",
          planningScheme: "Mildura Planning Scheme",
          lastUpdated: "2024-12-15"
        },
        developmentPotential: {
          maxHeight: "12 metres (approximately 3-4 storeys)",
          plotRatio: "Not specified in C1Z",
          setbacks: {
            front: "3 metres minimum",
            side: "1.5 metres minimum",
            rear: "6 metres minimum"
          }
        },
        constraints: [
          {
            type: "Flood Risk",
            severity: "medium",
            description: "Property may be subject to occasional flooding during extreme weather events"
          },
          {
            type: "Heritage Constraints",
            severity: "high",
            description: "Heritage Overlay applies - planning permit required for most alterations"
          },
          {
            type: "Traffic Management",
            severity: "low",
            description: "Deakin Avenue is a main arterial road with traffic management considerations"
          }
        ]
      };
    } else {
      // Default Melbourne suburban data
      vicPlanData = {
        zoning: {
          zone: "General Residential Zone (GRZ)",
          description: "To implement the Municipal Planning Strategy and the Planning Policy Framework. To encourage development that respects the neighbourhood character of the area. To encourage a diversity of housing types and housing growth particularly in locations offering good access to services and transport.",
          permittedUses: [
            "Dwelling (other than Caretaker's house)",
            "Home based business",
            "Residential aged care facility",
            "Rooming house"
          ],
          restrictions: [
            "Maximum two dwellings on a lot",
            "ResCode standards apply",
            "Neighbourhood character considerations"
          ]
        },
        overlays: [],
        planningData: {
          municipalityName: "Unknown Council",
          planningScheme: "Generic Planning Scheme",
          lastUpdated: "2024-12-15"
        },
        developmentPotential: {
          maxHeight: "9 metres",
          plotRatio: "Not applicable",
          setbacks: {
            front: "As per ResCode",
            side: "As per ResCode",
            rear: "As per ResCode"
          }
        },
        constraints: []
      };
    }

    console.log('VicPlan data retrieved successfully');

    return new Response(JSON.stringify(vicPlanData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in VicPlan integration:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        zoning: { zone: "Data unavailable", description: "Unable to retrieve planning data" },
        overlays: [],
        planningData: { municipalityName: "Unknown", planningScheme: "Unknown", lastUpdated: new Date().toISOString() },
        developmentPotential: { maxHeight: "Unknown", plotRatio: "Unknown", setbacks: {} },
        constraints: []
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});