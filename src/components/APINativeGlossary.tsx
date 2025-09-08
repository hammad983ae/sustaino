import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const APINativeGlossary = () => {
  const glossaryTerms = [
    {
      term: "Crown Land",
      definition: "Land that is 'owned' by the Crown (generally a State or Territory). Crown Land may be unalienated or leased to a third party or may be 'dedicated' or 'reserved' for a particular purpose and may be under the control of a local Council. Different management regimes exist for Crown Land in each State and Territory."
    },
    {
      term: "Extinguishment",
      definition: "The permanent extinguishment of native title rights, either in the past or in accordance with the Native Title Act. Native title can be extinguished by a valid grant of tenure by the Commonwealth or a State or Territory or surrendered by agreement between the native title holders and the relevant Government party."
    },
    {
      term: "Future Act",
      definition: "An activity or proposal that may affect native title interests."
    },
    {
      term: "Grant of Tenure",
      definition: "In Australian law all land tenures (other than native title) are derived from the Crown by way of a grant of tenure. This 'creation' of a property interest is called a grant of tenure."
    },
    {
      term: "Indigenous Land Use Agreement (ILUA)",
      definition: "A type of contract between native title holders and third parties or the Government about matters affecting native title land. There are strict requirements for ILUAs and they must be registered with the National Native Title Tribunal."
    },
    {
      term: "Native Title",
      definition: "The recognition by Australian law of First Nations People's traditional rights and interests in land and waters held under their traditional law and custom."
    },
    {
      term: "Native Title Claim",
      definition: "A legal claim made by First Nations People for recognition of native title through the Federal Court."
    },
    {
      term: "Native Title Determination",
      definition: "A Court determination recognising the existence of native title, identifying the native title holders/people who hold it, setting out the exact nature of the rights and interests and the land in which they are held."
    },
    {
      term: "Native Title Due Diligence",
      definition: "Undertaking proper investigations prior to purchasing land or proceeding with any project to identify any native title issues that may arise, including in any surrounding land or waters and any required infrastructure corridors."
    },
    {
      term: "Native Title Holders",
      definition: "The group of First Nations People who collectively hold native title, even if their native title claim has not yet been determined. Prior to a native title determination, the native title holders form a native title claim group represented by nominated Applicant(s)."
    },
    {
      term: "National Native Title Tribunal (NNTT)",
      definition: "The National Native Title Tribunal is an independent body established under the Native Title Act to oversee the administration of native title."
    },
    {
      term: "Existing Stock SDA",
      definition: "SDA as defined in Part 1 section 6 of the National Disability Insurance Scheme (Specialist Disability Accommodation) Rules 2020."
    },
    {
      term: "Legacy Stock SDA", 
      definition: "SDA as defined in Part 1 section 7 of the National Disability Insurance Scheme (Specialist Disability Accommodation) Rules 2020."
    },
    {
      term: "Maximum Reasonable Rent Contribution (MRRC)",
      definition: "A payment by the SDA participant to the SDA provider that is in addition to the SDA payments approved in their NDIS Plan."
    },
    {
      term: "National Disability Insurance Agency (NDIA)",
      definition: "An independent statutory agency whose role is to implement the NDIS in supporting a better quality of life for hundreds of thousands of Australians with a significant and permanent disability, as well as their families and carers."
    },
    {
      term: "National Disability Insurance Scheme (NDIS)",
      definition: "An Australian Government scheme that provides funding to eligible people (NDIS Participants) with disability. The scheme entitles people with a permanent and significant disability who are under the age of 65 to funding for any reasonable and necessary support needs related to their disability."
    },
    {
      term: "New Build SDA",
      definition: "SDA as defined in Part 1 section 8 of the National Disability Insurance Scheme (Specialist Disability Accommodation) Rules 2020."
    },
    {
      term: "On-site Overnight Assistance (OOA)",
      definition: "An additional payment under the NDIS when an additional space is used by support staff to provide support services overnight to SDA participants living in the same dwelling that contains the OOA space or in a nearby dwelling."
    },
    {
      term: "SDA Participant",
      definition: "A NDIS participant who is approved for SDA."
    },
    {
      term: "SDA Payment",
      definition: "A payment from the NDIA to approved SDA providers."
    },
    {
      term: "SDA Provider",
      definition: "A registered manager of SDA."
    },
    {
      term: "Specialist Disability Accommodation (SDA)",
      definition: "A range of housing designed for NDIS participants with extreme functional impairment and/or very high support needs and enrolled with the NDIA."
    },
    {
      term: "Supported Independent Living Provider (SIL Provider)",
      definition: "A NDIS funded support organisation or person that provides help and/or supervision of daily tasks to help the NDIS participant to live as independently as possible, while building life skills."
    },
    {
      term: "Public Works",
      definition: "Buildings or structures (including roads, bridges, pipelines and major earthworks) that are constructed by or on behalf of the Commonwealth, a State or Territory Government or a Local Government (Council)."
    },
    {
      term: "Unlawful Future Act",
      definition: "A future act that occurs unlawfully without following the requirements of the Native Title Act."
    },
    // Valuation Procedures Terms
    {
      term: "Fixtures",
      definition: "Items that are generally regarded as part of real property, such as electric wiring to light points and power sockets, lighting systems, fire and smoke detectors, heating/air conditioning installations, lifts, domestic hot water systems, and firefighting installations."
    },
    {
      term: "Going Concern",
      definition: "A property operating as a business where trading figures are considered in the valuation process, requiring statement of trading figure sources and any adjustments made to those figures."
    },
    {
      term: "Highest and Best Use",
      definition: "The most profitable and legally permissible use of a property, particularly when different from the current use, requiring comment on alternative uses and their impact on value and marketability."
    },
    {
      term: "Marketing Period",
      definition: "The estimated time necessary to achieve the assessed Market Value under prevailing market conditions, typically preceding the date of valuation."
    },
    {
      term: "Non-Fixtures/Chattels",
      definition: "Moveable articles of property generally excluded from real property valuations, such as electric power distribution for plant and equipment, lifting equipment, IT cabling, and household furniture."
    },
    {
      term: "Value As If Complete",
      definition: "A valuation of a proposed building or project assuming completion at the date of valuation."
    },
    // Market Transaction Shortage Considerations Terms
    {
      term: "Market Intelligence",
      definition: "Information gathered from market participants including buyers, sellers, agents, researchers, and valuers to understand factors influencing the market and current market sentiment."
    },
    {
      term: "Market Uncertainty",
      definition: "Conditions where there is limited or unreliable market transaction data, requiring valuers to exercise additional professional judgment and potentially resulting in more subjective opinions of value."
    },
    {
      term: "Prior Transactions",
      definition: "Empirical historic data from previous market transactions that may provide a foundation for current valuation analysis, requiring adjustment for differences in market conditions between transaction and valuation dates."
    },
    {
      term: "Sensitivity Analysis",
      definition: "A valuation technique that indicates a range of values under different scenarios or assumptions, particularly useful during periods of market uncertainty."
    },
    {
      term: "Tenancy Risk",
      definition: "The risk assessment of tenant default, vacancy, or need for rental relief, particularly relevant during periods of economic uncertainty."
    },
    {
      term: "Unsettled Market Transactions",
      definition: "Transactions that have not yet settled or have failed to settle, which may provide evidence of market conditions and help establish upper ranges of value."
    },
    // Mortgage and Loan Security Terms
    {
      term: "Alternative Use Value",
      definition: "The value of a property for an alternative use to its current use, relevant when current use may not represent highest and best use for mortgage security purposes."
    },
    {
      term: "As If Complete",
      definition: "A valuation basis for properties under construction assuming the development is complete at the valuation date, commonly required for construction lending."
    },
    {
      term: "Insurance Replacement Cost",
      definition: "An estimate of the cost to replace a property with a building of equivalent utility using current materials, labor costs, and construction methods."
    },
    {
      term: "Loan to Value Ratio (LVR)",
      definition: "The ratio of the loan amount to the property value, used by lenders to assess lending risk and determine maximum loan amounts."
    },
    {
      term: "Mortgage Security",
      definition: "Property held as collateral security for a mortgage loan, where the lender has a legal interest in the property until the loan is repaid."
    },
    {
      term: "Special Assumption",
      definition: "An assumption that either assumes facts that differ from those existing at the valuation date or assumes a state of affairs that is contrary to fact at the valuation date."
    },
    {
      term: "Future Value",
      definition: "A forecast of the value of a property at a specified future date, often required for mortgage security purposes to assess potential value changes over the loan term."
    },
    {
      term: "Price",
      definition: "The amount actually paid or proposed to be paid for a property in a particular transaction, which may differ from market value due to special circumstances."
    },
    {
      term: "PropertyPRO",
      definition: "A standardized pro-forma valuation report format used in Australia for residential mortgage valuations, with specific risk rating requirements."
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader className="border-b border-border bg-muted/50">
          <CardTitle className="text-foreground text-xl font-semibold">
            Additional API Guidelines - Glossary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              The following definitions are sourced from API Guidance Papers including Native Title Matters 
              and Specialist Disability Accommodation, applicable to property valuation and assessment.
            </p>
            
            <div className="space-y-4">
              {glossaryTerms.map((item, index) => (
                <div key={index} className="border-l-4 border-primary/20 pl-4">
                  <dt className="font-semibold text-foreground text-sm mb-1">
                    {item.term}
                  </dt>
                  <dd className="text-sm text-muted-foreground">
                    {item.definition}
                  </dd>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 border border-border rounded-lg bg-muted/20">
              <p className="text-sm text-foreground">
                <strong>Important Note:</strong> Native title, SDA, market transaction shortage considerations, and mortgage security valuations are extremely complex areas of law and regulation. 
                This glossary provides basic definitions only. Professional legal advice from specialists should always be 
                sought when these issues are identified or suspected. For SDA valuations, current knowledge of NDIS 
                legislation and SDA Rules is essential. During periods of market uncertainty, additional professional 
                judgment and comprehensive risk analysis are required. Mortgage security valuations must comply with banking regulations and prudent lending standards.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APINativeGlossary;