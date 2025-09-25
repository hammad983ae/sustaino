import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CreditCheckRequest {
  firstName: string
  lastName: string
  dateOfBirth: string
  address: string
  suburb: string
  state: string
  postcode: string
  phoneNumber?: string
  email?: string
  licenseNumber?: string
  previousAddresses?: Array<{
    address: string
    suburb: string
    state: string
    postcode: string
    fromDate: string
    toDate: string
  }>
}

interface EquifaxResponse {
  creditScore: number
  creditRating: string
  riskLevel: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High'
  reportId: string
  enquiryDate: string
  reportDetails: {
    creditHistory: Array<{
      creditorName: string
      accountType: string
      balance: number
      status: string
      openDate: string
      lastReported: string
    }>
    defaultsAndJudgments: Array<{
      type: string
      amount: number
      date: string
      status: string
    }>
    creditEnquiries: Array<{
      enquiryType: string
      creditorName: string
      date: string
    }>
    personalDetails: {
      currentAddress: string
      addressHistory: Array<string>
      employmentHistory: Array<{
        employer: string
        position: string
        startDate: string
        endDate?: string
      }>
    }
  }
  recommendations: Array<string>
  summary: {
    totalCreditLimit: number
    totalBalance: number
    utilizationRatio: number
    paymentHistory: 'Excellent' | 'Good' | 'Fair' | 'Poor'
    accountMix: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { data } = await req.json() as { data: CreditCheckRequest }
    
    console.log('Processing Equifax credit check for:', data.firstName, data.lastName)

    const equifaxApiKey = Deno.env.get('EQUIFAX_API_KEY')
    if (!equifaxApiKey) {
      throw new Error('Equifax API key not configured')
    }

    // For demonstration, we'll simulate the Equifax API response
    // In production, you would make actual API calls to Equifax
    const mockEquifaxResponse: EquifaxResponse = {
      creditScore: Math.floor(Math.random() * (850 - 300) + 300),
      creditRating: getCreditRating(Math.floor(Math.random() * (850 - 300) + 300)),
      riskLevel: getRiskLevel(Math.floor(Math.random() * (850 - 300) + 300)),
      reportId: `EFX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      enquiryDate: new Date().toISOString(),
      reportDetails: {
        creditHistory: [
          {
            creditorName: 'Commonwealth Bank',
            accountType: 'Credit Card',
            balance: Math.floor(Math.random() * 10000),
            status: 'Current',
            openDate: '2020-01-15',
            lastReported: '2024-01-15'
          },
          {
            creditorName: 'Westpac Banking Corporation',
            accountType: 'Home Loan',
            balance: Math.floor(Math.random() * 500000),
            status: 'Current',
            openDate: '2019-06-01',
            lastReported: '2024-01-15'
          }
        ],
        defaultsAndJudgments: [],
        creditEnquiries: [
          {
            enquiryType: 'Application',
            creditorName: 'ANZ Bank',
            date: '2023-12-01'
          }
        ],
        personalDetails: {
          currentAddress: `${data.address}, ${data.suburb}, ${data.state} ${data.postcode}`,
          addressHistory: data.previousAddresses?.map(addr => 
            `${addr.address}, ${addr.suburb}, ${addr.state} ${addr.postcode}`
          ) || [],
          employmentHistory: []
        }
      },
      recommendations: generateRecommendations(Math.floor(Math.random() * (850 - 300) + 300)),
      summary: {
        totalCreditLimit: Math.floor(Math.random() * 50000),
        totalBalance: Math.floor(Math.random() * 25000),
        utilizationRatio: Math.random() * 100,
        paymentHistory: 'Good',
        accountMix: 'Fair'
      }
    }

    // In production, replace this with actual Equifax API call:
    /*
    const equifaxResponse = await fetch('https://api.equifax.com/credit-check', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${equifaxApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personal_details: {
          first_name: data.firstName,
          last_name: data.lastName,
          date_of_birth: data.dateOfBirth,
          current_address: {
            street: data.address,
            suburb: data.suburb,
            state: data.state,
            postcode: data.postcode
          },
          phone_number: data.phoneNumber,
          email: data.email,
          drivers_license: data.licenseNumber
        },
        previous_addresses: data.previousAddresses,
        report_type: 'comprehensive'
      })
    })

    if (!equifaxResponse.ok) {
      throw new Error(`Equifax API error: ${equifaxResponse.statusText}`)
    }

    const mockEquifaxResponse = await equifaxResponse.json()
    */

    console.log('Credit check completed successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: mockEquifaxResponse 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in Equifax credit check:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

function getCreditRating(score: number): string {
  if (score >= 800) return 'Excellent'
  if (score >= 740) return 'Very Good'
  if (score >= 670) return 'Good'
  if (score >= 580) return 'Fair'
  return 'Poor'
}

function getRiskLevel(score: number): 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High' {
  if (score >= 800) return 'Very Low'
  if (score >= 740) return 'Low'
  if (score >= 670) return 'Medium'
  if (score >= 580) return 'High'
  return 'Very High'
}

function generateRecommendations(score: number): Array<string> {
  const recommendations = []
  
  if (score < 670) {
    recommendations.push('Consider paying down existing credit card balances to improve credit utilization ratio')
    recommendations.push('Ensure all payments are made on time to build positive payment history')
    recommendations.push('Avoid applying for new credit in the short term')
  }
  
  if (score >= 670 && score < 740) {
    recommendations.push('Continue making timely payments to maintain good standing')
    recommendations.push('Consider increasing credit limits to improve utilization ratio')
  }
  
  if (score >= 740) {
    recommendations.push('Excellent credit profile - maintain current financial habits')
    recommendations.push('Consider optimizing credit mix for best rates')
  }
  
  return recommendations
}