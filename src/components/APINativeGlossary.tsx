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
      term: "Past Act",
      definition: "An act that may have invalidly affected native title but has been validated under the provisions of the Native Title Act."
    },
    {
      term: "Prescribed Body Corporate (PBC)",
      definition: "A corporation governed by the Native Title Act and related legislation that acts as agent or trustee for the native title holders and manages all native title matters after a native title determination has been made."
    },
    {
      term: "Public Works",
      definition: "Buildings or structures (including roads, bridges, pipelines and major earthworks) that are constructed by or on behalf of the Commonwealth, a State or Territory Government or a Local Government (Council)."
    },
    {
      term: "Unlawful Future Act",
      definition: "A future act that occurs unlawfully without following the requirements of the Native Title Act."
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader className="border-b border-border bg-muted/50">
          <CardTitle className="text-foreground text-xl font-semibold">
            Additional API Guidelines - Native Title Glossary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              The following definitions are sourced from API Guidance Paper on Native Title Matters and are applicable 
              to property valuation and assessment where native title considerations may arise.
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
                <strong>Important Note:</strong> Native title is an extremely complex area of law. This glossary provides 
                basic definitions only. Professional legal advice from specialists in native title law should always be 
                sought when native title issues are identified or suspected.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APINativeGlossary;